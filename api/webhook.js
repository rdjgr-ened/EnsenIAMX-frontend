import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

// Cliente con permisos de administrador para actualizar Supabase sin restricciones RLS
const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Cliente de Mercado Pago con Token de Producción
const mpClient = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN 
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    // Obtener ID de la transacción y tipo de evento enviada por Mercado Pago
    const paymentId = req.query['data.id'] || req.query.id || req.body?.data?.id;
    const type = req.query.type || req.query.topic || req.body?.type;

    if (type === 'payment' && paymentId) {
      // Consulta directa del estado real del pago
      const payment = new Payment(mpClient);
      const paymentData = await payment.get({ id: paymentId });

      if (paymentData.status === 'approved') {
        const userId = paymentData.external_reference;

        if (userId) {
          const itemTitle = paymentData.additional_info?.items?.[0]?.title || '';
          const titleLower = itemTitle.toLowerCase();
          
          let planNombre = 'platino';
          let creditosAAsignar = 300;

          if (titleLower.includes('básico') || titleLower.includes('basico')) {
            planNombre = 'basico';
            creditosAAsignar = 50;
          } else if (titleLower.includes('oro')) {
            planNombre = 'oro';
            creditosAAsignar = 100;
          } else if (titleLower.includes('platino')) {
            planNombre = 'platino';
            creditosAAsignar = 300;
          }

          // Actualización directa en la base de datos de Supabase
          const { error } = await supabaseAdmin
            .from('profiles')
            .update({
              plan: planNombre,
              creditos_disponibles: creditosAAsignar,
              updated_at: new Date().toISOString()
            })
            .eq('id', userId);

          if (error) {
            console.error('Error al actualizar Supabase:', error);
          }
        }
      }
    }

    // Responder siempre con 200 OK para confirmar recepción a Mercado Pago
    return res.status(200).send('OK');
  } catch (error) {
    console.error('Error interno procesando Webhook:', error);
    return res.status(200).send('OK');
  }
}