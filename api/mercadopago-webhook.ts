import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAdmin = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY);

const mpClient = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const paymentId = req.query['data.id'] || req.query.id || req.body?.data?.id;
    const type = req.query.type || req.query.topic || req.body?.type;

    if (type === 'payment' && paymentId) {
      const payment = new Payment(mpClient);
      const paymentData = await payment.get({ id: paymentId });

      if (paymentData.status === 'approved') {
        const userId = paymentData.external_reference || paymentData.metadata?.user_id;

        if (userId) {
          // Lectura directa desde metadatos
          const planNombre = paymentData.metadata?.plan_id || 'platino';
          const creditosAAsignar = Number(paymentData.metadata?.credits || 300);
          const cycle = paymentData.metadata?.billing_cycle || 'mensual';

          // Calcular fechas exactas
          const now = new Date();
          let planEndDate = new Date();
          let nextRechargeDate = new Date();

          if (cycle === 'anual') {
            planEndDate.setFullYear(now.getFullYear() + 1);
            nextRechargeDate.setMonth(now.getMonth() + 1);
          } else if (cycle === 'trimestral') {
            planEndDate.setMonth(now.getMonth() + 3);
            nextRechargeDate.setMonth(now.getMonth() + 1);
          } else {
            planEndDate.setMonth(now.getMonth() + 1);
            nextRechargeDate = planEndDate;
          }

          // Actualización segura en Supabase con FECHAS
          const { error } = await supabaseAdmin
            .from('profiles')
            .update({
              plan: planNombre,
              creditos_disponibles: creditosAAsignar,
              billing_cycle: cycle,
              plan_end_date: planEndDate.toISOString(),
              next_recharge_date: nextRechargeDate.toISOString(),
              updated_at: now.toISOString()
            })
            .eq('id', userId);

          if (error) {
            console.error('Error FATAL actualizando Supabase:', error);
          } else {
            console.log(`✅ Pago único ${planNombre} (${cycle}) activado para ${userId}. Expira: ${planEndDate.toISOString()}`);
          }
        }
      }
    }
    return res.status(200).send('OK');
  } catch (error) {
    console.error('Error interno procesando Webhook:', error);
    return res.status(200).send('OK');
  }
}