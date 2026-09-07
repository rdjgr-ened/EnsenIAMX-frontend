import { MercadoPagoConfig, PreApproval } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  // 1. Recibimos los datos reales y limpios del frontend
  const { userId, planId, billingCycle, userEmail } = req.body;

  // 2. Validamos que el correo venga correctamente
  if (!userId || !userEmail) {
    return res.status(400).json({ error: 'Faltan datos obligatorios del usuario' });
  }

  // 3. Diccionario de precios
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
    const host = req.headers.host || 'enseniamx.com';
    const cleanHost = host.includes('localhost') ? 'enseniamx.com' : host;

    // 4. PAYLOAD ESTRICTO (Aceptado 100% por Mercado Pago)
    const result = await preapproval.create({
      body: {
        reason: `Ensenia MX Plan ${planId.toUpperCase()} ${cycle}`, // Sin caracteres especiales
        auto_recurring: {
          frequency: frequency,
          frequency_type: 'months',
          transaction_amount: Number(price),
          currency_id: 'MXN'
        },
        back_url: `https://${cleanHost}/payment-success`,
        payer_email: userEmail, // Correo REAL del usuario
        external_reference: `${userId}_${planId}_${cycle}` // Separador seguro
      }
    });

    return res.status(200).json({ success: true, initPoint: result.init_point });
  } catch (error) {
    console.error('Error interno del servidor API Mercado Pago:', error);
    return res.status(500).json({ error: error.message || 'Error en pasarela de pago' });
  }
}