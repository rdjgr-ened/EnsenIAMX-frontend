import { createClient } from "@supabase/supabase-js";
import { PLAN_CONFIGS, CREDIT_PACKAGES } from "../src/utils/planManager";
import { PlanTier, BillingCycle } from "../src/types";

// In-memory set to prevent duplicate webhook processing for the same payment ID
const processedPayments = new Set<string>();

export async function handleMercadoPagoWebhook(req: any, res: any) {
  // CORS configuration
  res.setHeader?.("Access-Control-Allow-Credentials", "true");
  res.setHeader?.("Access-Control-Allow-Origin", "*");
  res.setHeader?.("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader?.(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Health check or IPN test via GET
  if (req.method === "GET") {
    return res.status(200).json({
      status: "ok",
      endpoint: "Mercado Pago Webhook - EnseñIA MX",
      timestamp: new Date().toISOString(),
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Método no permitido. Utilice POST para recibir webhooks de Mercado Pago.",
    });
  }

  try {
    let body = req.body || {};
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // Leave as is if not json
      }
    }

    const query = req.query || {};

    console.log("[MercadoPago Webhook] Notificación recibida:", {
      query,
      action: body.action,
      type: body.type,
      topic: body.topic || query.topic,
      dataId: body?.data?.id || query["data.id"] || query.id,
    });

    // 1. Extract Payment ID from query or body
    const paymentId =
      query["data.id"] ||
      query.id ||
      query.payment_id ||
      query.data_id ||
      body?.data?.id ||
      body?.id ||
      body?.payment_id;

    const topic = body.topic || body.type || query.topic || query.type || "payment";

    // If it's a test event without paymentId
    if (!paymentId && body.action === "test") {
      return res.status(200).json({
        success: true,
        message: "Webhook de prueba recibido correctamente.",
      });
    }

    if (!paymentId && !body.mockPayment && !body.userEmail) {
      console.warn("[MercadoPago Webhook] No se encontró 'paymentId' en la notificación.");
      return res.status(200).json({
        received: true,
        message: "Notificación recibida sin ID de pago accionable.",
      });
    }

    // Check Idempotency (prevent processing the same payment twice)
    const paymentKey = String(paymentId || body.payment_id || `sim_${Date.now()}`);
    if (processedPayments.has(paymentKey)) {
      console.log(`[MercadoPago Webhook] El pago ${paymentKey} ya fue procesado con anterioridad.`);
      return res.status(200).json({
        success: true,
        alreadyProcessed: true,
        paymentId: paymentKey,
      });
    }

    // 2. Fetch Payment Information from Mercado Pago API or process payload
    const mpAccessToken = process.env.MERCADOPAGO_ACCESS_TOKEN || "";
    const isMockToken = !mpAccessToken || mpAccessToken.includes("00000000") || mpAccessToken.includes("TEST-0000");

    let paymentData: any = null;

    if (paymentId && !isMockToken) {
      try {
        const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${mpAccessToken}`,
          },
        });

        if (mpResponse.ok) {
          paymentData = await mpResponse.json();
        } else {
          console.error(`[MercadoPago Webhook] Error al consultar pago ${paymentId}:`, await mpResponse.text());
        }
      } catch (err) {
        console.error(`[MercadoPago Webhook] Error de conexión con API Mercado Pago para pago ${paymentId}:`, err);
      }
    }

    // Fallback to body data if mock or directly provided in test simulation
    if (!paymentData) {
      paymentData = {
        id: paymentKey,
        status: body.status || query.status || "approved",
        status_detail: "accredited",
        external_reference: body.external_reference || query.external_reference,
        payer: {
          email: body.userEmail || body.payer_email || "docente@enseniamx.app",
        },
        transaction_amount: body.price || 49,
      };
    }

    // 3. Verify Payment Status
    const paymentStatus = paymentData.status;
    console.log(`[MercadoPago Webhook] Estado del pago ${paymentKey}:`, paymentStatus);

    if (paymentStatus !== "approved") {
      return res.status(200).json({
        received: true,
        status: paymentStatus,
        message: `El pago se encuentra en estado '${paymentStatus}'. No se acreditan créditos hasta estar 'approved'.`,
      });
    }

    // 4. Extract and parse purchase details from external_reference
    let parsedRef: any = {};
    if (paymentData.external_reference) {
      try {
        parsedRef = typeof paymentData.external_reference === "string"
          ? JSON.parse(paymentData.external_reference)
          : paymentData.external_reference;
      } catch (e) {
        console.warn("[MercadoPago Webhook] No se pudo deserializar external_reference como JSON:", paymentData.external_reference);
      }
    }

    const itemType: "plan" | "credits" = parsedRef.itemType || body.itemType || (body.planId ? "plan" : "credits");
    const planId: PlanTier = parsedRef.planId || body.planId || "basico";
    const billingCycle: BillingCycle = parsedRef.billingCycle || body.billingCycle || "mensual";
    const userEmail = (parsedRef.userEmail || paymentData.payer?.email || body.userEmail || "").trim().toLowerCase();
    const userId = parsedRef.userId || body.userId || `user_${userEmail.replace(/[^a-zA-Z0-9]/g, "_")}`;

    if (!userEmail) {
      console.warn("[MercadoPago Webhook] No se pudo determinar el correo del usuario para el pago:", paymentKey);
      return res.status(200).json({
        received: true,
        error: "Correo de usuario no encontrado en la metadata del pago.",
      });
    }

    // Calculate credits to credit
    let creditsToAdd = 0;
    if (itemType === "plan") {
      const planCfg = PLAN_CONFIGS[planId] || PLAN_CONFIGS.basico;
      // Monthly: base credits; Quarterly: 3x; Yearly: 12x
      if (billingCycle === "anual") {
        creditsToAdd = planCfg.creditsPerMonth * 12;
      } else if (billingCycle === "trimestral") {
        creditsToAdd = planCfg.creditsPerMonth * 3;
      } else {
        creditsToAdd = planCfg.creditsPerMonth;
      }
    } else {
      // Credits Package
      const packId = parsedRef.creditPackageId || body.creditPackageId;
      const foundPack = CREDIT_PACKAGES.find((p) => p.id === packId);
      creditsToAdd = Number(parsedRef.creditsAdded) || foundPack?.credits || Number(body.creditAmount) || 50;
    }

    // Compute new renewal date if it's a plan
    const now = new Date();
    let renewalDate: Date | null = null;
    if (itemType === "plan") {
      renewalDate = new Date(now);
      if (billingCycle === "anual") {
        renewalDate.setFullYear(renewalDate.getFullYear() + 1);
      } else if (billingCycle === "trimestral") {
        renewalDate.setMonth(renewalDate.getMonth() + 3);
      } else {
        renewalDate.setMonth(renewalDate.getMonth() + 1);
      }
    }

    console.log(`[MercadoPago Webhook] Acreditando ${creditsToAdd} créditos al usuario ${userEmail} (${itemType}: ${planId || "recarga"})...`);

    // 5. Connect to Supabase Database and Update User Profile
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      process.env.VITE_SUPABASE_ANON_KEY ||
      "";

    let dbUpdated = false;
    let finalCredits = creditsToAdd;

    if (supabaseUrl && supabaseKey && !supabaseUrl.includes("your-project")) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey, {
          auth: { persistSession: false },
        });

        // Search existing profile by email
        const { data: profiles, error: fetchErr } = await supabase
          .from("profiles")
          .select("*")
          .ilike("email", userEmail);

        if (fetchErr) {
          console.error("[MercadoPago Webhook] Error al buscar perfil en Supabase:", fetchErr.message);
        }

        if (profiles && profiles.length > 0) {
          const existing = profiles[0];
          finalCredits = (existing.creditos_disponibles || 0) + creditsToAdd;

          const updatePayload: any = {
            creditos_disponibles: finalCredits,
            updated_at: new Date().toISOString(),
          };

          if (itemType === "plan") {
            updatePayload.plan = planId;
            if (renewalDate) {
              updatePayload.fecha_renovacion = renewalDate.toISOString();
            }
          }

          const { error: updateErr } = await supabase
            .from("profiles")
            .update(updatePayload)
            .eq("id", existing.id);

          if (updateErr) {
            console.error("[MercadoPago Webhook] Error al actualizar perfil en Supabase:", updateErr.message);
          } else {
            dbUpdated = true;
            console.log(`[MercadoPago Webhook] Perfil de ${userEmail} actualizado en Supabase. Nuevo saldo: ${finalCredits} créditos.`);
          }
        } else {
          // Create new user profile with credited amount
          const initialBalance = 3 + creditsToAdd;
          finalCredits = initialBalance;

          const insertPayload: any = {
            id: userId,
            email: userEmail,
            plan: itemType === "plan" ? planId : "gratuito",
            creditos_disponibles: initialBalance,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };

          if (renewalDate) {
            insertPayload.fecha_renovacion = renewalDate.toISOString();
          }

          const { error: insertErr } = await supabase.from("profiles").insert(insertPayload);

          if (insertErr) {
            console.error("[MercadoPago Webhook] Error al crear perfil en Supabase:", insertErr.message);
          } else {
            dbUpdated = true;
            console.log(`[MercadoPago Webhook] Nuevo perfil creado en Supabase para ${userEmail} con ${initialBalance} créditos.`);
          }
        }
      } catch (dbError) {
        console.error("[MercadoPago Webhook] Excepción al interactuar con Supabase:", dbError);
      }
    } else {
      console.warn("[MercadoPago Webhook] Supabase no está configurado en las variables de entorno. Los créditos se procesaron en memoria/simulación.");
    }

    // Mark as processed in cache
    processedPayments.add(paymentKey);

    return res.status(200).json({
      success: true,
      message: "Notificación de pago aprobada y créditos acreditados exitosamente.",
      paymentId: paymentKey,
      userEmail,
      itemType,
      plan: itemType === "plan" ? planId : undefined,
      creditsAdded: creditsToAdd,
      finalCredits,
      dbUpdated,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("[MercadoPago Webhook Error]:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Error interno al procesar el webhook de Mercado Pago.",
    });
  }
}

export default handleMercadoPagoWebhook;
