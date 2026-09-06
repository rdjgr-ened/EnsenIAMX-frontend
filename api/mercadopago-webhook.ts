import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

// Cliente de Supabase con Service Role Key (salta RLS)
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAdmin = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY);

const mpClient = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const paymentId = req.query['data.id'] || req.query.id || req.body?.data?.id;
    const type = req.query.type || req.query.topic || req.body?.type;

    // Mercado Pago dispara un evento 'payment' cuando el cobro de la suscripción es exitoso
    if (type === 'payment' && paymentId) {
      const payment = new Payment(mpClient);
      const paymentData = await payment.get({ id: paymentId });

      if (paymentData.status === 'approved') {
        const externalRef = paymentData.external_reference || '';
        const metadata = paymentData.metadata || {};

        let userId, planNombre, cycle, creditosAAsignar;

        // 1. NUEVO SISTEMA (PreApproval): Desempaquetar los datos de la Suscripción
        if (externalRef.includes('|')) {
          const parts = externalRef.split('|');
          userId = parts[0];
          planNombre = parts[1];
          cycle = parts[2];
          creditosAAsignar = Number(parts[3]);
        } 
        // 2. SISTEMA VIEJO (Preference): Respaldo para pagos que se quedaron pendientes
        else {
          userId = externalRef || metadata.user_id;
          planNombre = metadata.plan_id || 'platino';
          cycle = metadata.billing_cycle || 'mensual';
          creditosAAsignar = Number(metadata.credits || 300);
        }

        if (userId) {
          // Calcular fechas exactas para el Robot (Cron Job) en Supabase
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

          // Inyectar en Supabase
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
            console.error('Error FATAL actualizando Supabase desde Webhook:', error);
          } else {
            console.log(`✅ Suscripción / Pago ${planNombre} (${cycle}) procesado para ${userId}`);
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