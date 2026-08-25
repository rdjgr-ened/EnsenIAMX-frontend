import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Cliente de Supabase con Service Role Key (salta RLS para escribir en DB)
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAdmin = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY || "");

const mpClient = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || ""
});

export default async function handler(req: any, res: any) {
  // 1. Validar que sea una petición POST
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    // 2. SEGURIDAD EXTREMA: Validación de Firma HMAC de Mercado Pago
    const signatureHeader = req.headers['x-signature'];
    const requestId = req.headers['x-request-id'];
    const webhookSecret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
    const paymentId = req.query?.['data.id'] || req.query?.id || req.body?.data?.id;
    const type = req.query?.type || req.query?.topic || req.body?.type;

    // Solo validamos firmas si el secreto está configurado y es un pago
    if (webhookSecret && signatureHeader && requestId && type === 'payment' && paymentId) {
      // Separar ts y v1 del header (ej: "ts=12345,v1=abcdef...")
      const parts = signatureHeader.split(',');
      let ts = '';
      let v1 = '';
      
      parts.forEach((part: string) => {
        const [key, value] = part.split('=');
        if (key.trim() === 'ts') ts = value;
        if (key.trim() === 'v1') v1 = value;
      });

      // Crear el manifiesto y hashearlo
      const manifest = `id:${paymentId};request-id:${requestId};ts:${ts};`;
      const computedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(manifest)
        .digest('hex');

      if (computedSignature !== v1) {
        console.error('🚨 ALERTA: Intento de fraude o firma de Webhook inválida.');
        return res.status(403).send('Forbidden: Invalid Signature');
      }
    }

    // 3. PROCESAMIENTO DEL PAGO (Solo llegamos aquí si es seguro)
    if (type === 'payment' && paymentId) {
      const payment = new Payment(mpClient);
      const paymentData = await payment.get({ id: paymentId });

      if (paymentData.status === 'approved') {
        const userId = paymentData.external_reference || paymentData.metadata?.user_id;

        if (userId) {
          const planNombre = paymentData.metadata?.plan_id || 'platino';
          const creditosAAsignar = Number(paymentData.metadata?.credits || 300);
          const cycle = paymentData.metadata?.billing_cycle || 'mensual';
          const itemType = paymentData.metadata?.item_type || 'plan';

          // Consultar saldo actual para NO sobrescribir
          const { data: profile } = await supabaseAdmin
            .from('profiles')
            .select('creditos_disponibles')
            .eq('id', userId)
            .single();

          const creditosActuales = profile?.creditos_disponibles || 0;
          
          // Si compra un plan, se reinicia al monto base. Si compra recarga, se le suman a los actuales.
          const nuevosCreditos = itemType === 'credits' 
            ? creditosActuales + creditosAAsignar 
            : creditosAAsignar;

          // Construimos el objeto de actualización
          const updatePayload: any = {
            creditos_disponibles: nuevosCreditos,
            updated_at: new Date().toISOString()
          };

          // Si es un plan, actualizamos también su estatus
          if (itemType === 'plan') {
            updatePayload.plan = planNombre;
            updatePayload.billing_cycle = cycle;
          }

          // Ejecutamos actualización
          const { error } = await supabaseAdmin
            .from('profiles')
            .update(updatePayload)
            .eq('id', userId);

          if (error) {
            console.error('❌ Error al actualizar Supabase desde Webhook:', error);
          } else {
            console.log(`✅ Pago procesado exitosamente. Usuario ${userId} es ahora ${planNombre} con ${nuevosCreditos} créditos.`);
          }
        }
      }
    }

    // Retornamos 200 OK para que MP deje de enviar alertas
    return res.status(200).send('OK');
  } catch (error) {
    console.error('⚠️ Error interno procesando Webhook MP:', error);
    // Mercado Pago necesita recibir un 200 incluso si fallamos internamente, 
    // de lo contrario reintentará la petición miles de veces y saturará el servidor.
    return res.status(200).send('Error internally, but acknowledged'); 
  }
}