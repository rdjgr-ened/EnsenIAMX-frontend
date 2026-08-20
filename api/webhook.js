import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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
        const userId = paymentData.external_reference;

        // Actualizar el perfil en Supabase
        const { error } = await supabaseAdmin
          .from('profiles')
          .update({
            plan: 'Platino',
            credits: 20,
            updated_at: new Date().toISOString()
          })
          .eq('id', userId);

        if (error) console.error('Error al actualizar Supabase:', error);
      }
    }

    return res.status(200).send('OK');
  } catch (error) {
    console.error('Error en Webhook:', error);
    return res.status(200).send('OK'); // Responder 200 siempre a Mercado Pago
  }
}