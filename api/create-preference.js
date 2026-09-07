import { MercadoPagoConfig, PreApproval } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

// Conexión segura a Supabase desde el servidor
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAdmin = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  // 1. Solo recibimos datos inofensivos (Sin correos, sin Base64)
  const { userId, planId, billingCycle } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Falta el ID del usuario' });
  }

  try {
    // 2. EL ARREGLO DE RAÍZ: El servidor busca el email directamente en la base de datos
    const { data: profile, error: dbError } = await supabaseAdmin
      .from('profiles')
      .select('email')
      .eq('id', userId)
      .single();

    const userEmail = profile?.email || 'docente@enseniamx.app';

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

    const preapproval = new PreApproval(client);
    const host = req.headers.host || 'enseniamx.com';
    const cleanHost = host.includes('localhost') ? 'enseniamx.com' : host;

    // 4. Creamos la suscripción en Mercado Pago
    const result = await preapproval.create({
      body: {
        reason: `Plan ${planId.toUpperCase()} ${cycle}`, 
        auto_recurring: {
          frequency: frequency,
          frequency_type: 'months',
          transaction_amount: Number(price),
          currency_id: 'MXN'
        },
        back_url: `https://${cleanHost}/payment-success`,
        payer_email: userEmail,
        external_reference: `${userId}_${planId}_${cycle}_${plan.credits}`,
        status: 'pending'
      }
    });

    return res.status(200).json({ success: true, initPoint: result.init_point });
  } catch (error) {
    console.error('Error interno del servidor:', error);
    return res.status(500).json({ error: error.message || 'Error en pasarela de pago' });
  }
}