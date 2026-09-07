import { MercadoPagoConfig, PreApproval } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  // 1. Extraemos el userEmail que ya envía tu PaywallModal
  const { userId, planId, billingCycle, userEmail } = req.body;

  const PRICING = {
    basico: { mensual: 49, trimestral: 147, anual: 588, credits: 50 },
    oro: { mensual: 99, trimestral: 249, anual: 799, credits: 100 },
    platino: { mensual: 149, trimestral: 399, anual: 999, credits: 300 }
  };

  const plan = PRICING[planId] || PRICING.platino;
  const cycle = billingCycle || 'mensual';
  const price = plan[cycle];

  let frequency = 1;
  if (cycle === 'trimestral') frequency = 3;
  if (cycle === 'anual') frequency = 12;

  try {
    const preapproval = new PreApproval(client);
    const host = req.headers.host || 'tu-dominio.com';
    const protocol = host.includes('localhost') ? 'http' : 'https';

    const result = await preapproval.create({
      body: {
        // 2. Quitamos la "Ñ" para evitar que MP rechace el payload
        reason: `Ensenia MX - Plan ${planId.toUpperCase()} (${cycle})`,
        auto_recurring: {
          frequency: frequency,
          frequency_type: 'months',
          transaction_amount: Number(price),
          currency_id: 'MXN'
        },
        back_url: `${protocol}://${host}/payment-success`,
        // 3. El email es OBLIGATORIO para crear Suscripciones
        payer_email: userEmail || 'docente@enseniamx.app',
        // 4. Cambiamos el "|" por "_" para burlar el Firewall (WAF)
        external_reference: `${userId}_${planId}_${cycle}_${plan.credits}`,
        status: 'pending'
      }
    });

    return res.status(200).json({ success: true, initPoint: result.init_point });
  } catch (error) {
    console.error('Error al crear suscripción:', error);
    return res.status(500).json({ error: error.message || 'Error en pasarela de pago' });
  }
}