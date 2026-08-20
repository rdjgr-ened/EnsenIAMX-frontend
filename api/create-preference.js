import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { userId, planName, price } = req.body;

  try {
    const preference = new Preference(client);
    const host = req.headers.host;
    const protocol = host.includes('localhost') ? 'http' : 'https';

    const result = await preference.create({
      body: {
        items: [
          {
            title: `EnseñIA MX - ${planName}`,
            quantity: 1,
            unit_price: Number(price),
            currency_id: 'MXN',
          },
        ],
        external_reference: userId, // ID del usuario de Supabase
        notification_url: `${protocol}://${host}/api/webhook`, // Endpoint automático en Vercel
        back_urls: {
          success: `${protocol}://${host}/dashboard?payment=success`,
          failure: `${protocol}://${host}/dashboard?payment=failure`,
        },
        auto_return: 'approved',
      },
    });

    return res.status(200).json({ init_point: result.init_point });
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    return res.status(500).json({ error: error.message });
  }
}