import type { NextApiRequest, NextApiResponse } from 'next';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  // Recibimos el plan y ciclo, NO EL PRECIO. El backend decide el precio.
  const { userId, planId, billingCycle } = req.body;

  // 1. Diccionario de precios seguro (Hardcoded en el backend para evitar hackeos)
  const PRICING = {
    basico: { mensual: 49, trimestral: 147, anual: 588, credits: 50 },
    oro: { mensual: 99, trimestral: 249, anual: 799, credits: 100 },
    platino: { mensual: 149, trimestral: 399, anual: 999, credits: 300 }
  };

  const plan = PRICING[planId] || PRICING.platino;
  const cycle = billingCycle || 'mensual';
  const price = plan[cycle];

  try {
    const preference = new Preference(client);
    const host = req.headers.host || 'tu-dominio.com';
    const protocol = host.includes('localhost') ? 'http' : 'https';

    const result = await preference.create({
      body: {
        items: [
          {
            title: `EnseñIA MX - Plan ${planId.toUpperCase()} (${cycle})`,
            quantity: 1,
            unit_price: Number(price),
            currency_id: 'MXN',
          },
        ],
        external_reference: userId, // ID Oficial de Supabase
        metadata: {
          user_id: userId,
          plan_id: planId,
          credits: plan.credits,
          billing_cycle: cycle
        },
        notification_url: `${protocol}://${host}/api/mercadopago-webhook`, // Asegúrate de que este nombre coincida con tu archivo webhook
        back_urls: {
          success: `${protocol}://${host}/payment-success`,
          failure: `${protocol}://${host}/?payment=failure`,
        },
        auto_return: 'approved',
      },
    });

    return res.status(200).json({ initPoint: result.init_point });
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    return res.status(500).json({ error: error.message });
  }
}