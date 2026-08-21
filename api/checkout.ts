import type { NextApiRequest, NextApiResponse } from 'next';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '' 
});

interface PlanDetails {
  mensual: number;
  trimestral: number;
  anual: number;
  credits: number;
}

const PLAN_PRICES: Record<string, PlanDetails> = {
  basico: { mensual: 49, trimestral: 129, anual: 499, credits: 50 },
  oro: { mensual: 99, trimestral: 249, anual: 799, credits: 100 },
  platino: { mensual: 149, trimestral: 399, anual: 999, credits: 300 },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { userId, planId, billingCycle = 'mensual', userEmail } = req.body;

  if (!userId || !planId) {
    return res.status(400).json({ error: 'Faltan parámetros obligatorios (userId, planId)' });
  }

  const planKey = String(planId).toLowerCase();
  const planConfig = PLAN_PRICES[planKey];

  if (!planConfig) {
    return res.status(400).json({ error: `El plan '${planId}' no es válido.` });
  }

  const cycleKey = (billingCycle as 'mensual' | 'trimestral' | 'anual') || 'mensual';
  const unitPrice = planConfig[cycleKey] || planConfig.mensual;
  const credits = planConfig.credits;

  try {
    const preference = new Preference(client);
    const host = req.headers.host || 'localhost';
    const protocol = host.includes('localhost') ? 'http' : 'https';

    const result = await preference.create({
      body: {
        items: [
          {
            title: `EnseñIA MX - Plan ${String(planId).toUpperCase()} (${billingCycle})`,
            quantity: 1,
            unit_price: Number(unitPrice),
            currency_id: 'MXN',
          },
        ],
        external_reference: userId,
        metadata: {
          user_id: userId,
          plan_id: planId,
          billing_cycle: billingCycle,
          credits: credits,
          user_email: userEmail || '',
        },
        notification_url: `${protocol}://${host}/api/webhook`,
        back_urls: {
          success: `${protocol}://${host}/dashboard?payment=success`,
          failure: `${protocol}://${host}/dashboard?payment=failure`,
        },
        auto_return: 'approved',
      },
    });

    return res.status(200).json({ 
      success: true, 
      initPoint: result.init_point,
      sandboxInitPoint: result.sandbox_init_point 
    });
  } catch (error: any) {
    console.error('Error al crear preferencia de Mercado Pago:', error);
    return res.status(500).json({ error: error.message || 'Error interno del servidor' });
  }
}