import { PlanTier, BillingCycle, CheckoutRequest } from "../src/types";
import { PLAN_CONFIGS, CREDIT_PACKAGES, getPlanPrice, getPlanPeriodLabel } from "../src/utils/planManager";

export async function handleCheckout(req: any, res: any) {
  // CORS configuration
  res.setHeader?.("Access-Control-Allow-Credentials", "true");
  res.setHeader?.("Access-Control-Allow-Origin", "*");
  res.setHeader?.("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader?.(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Método no permitido. Utilice POST para generar la preferencia de pago.",
    });
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({
          success: false,
          error: "El cuerpo de la petición no es un JSON válido.",
        });
      }
    }

    const {
      itemType = "plan",
      planId,
      billingCycle = "mensual",
      creditPackageId,
      creditAmount,
      price: customPrice,
      title: customTitle,
      userEmail = "docente@enseniamx.app",
      userName = "Docente EnseñIA MX",
      userId = "usr_default",
      returnUrl,
    } = (body || {}) as CheckoutRequest;

    let itemTitle = "Suscripción EnseñIA MX";
    let itemDescription = "Herramientas de Inteligencia Artificial para la Nueva Escuela Mexicana";
    let unitPrice = 49;
    let itemId = "plan_basico_mensual";
    let creditsIncluded = 50;

    // 1. Resolve Plan Purchase
    if (itemType === "plan") {
      const selectedPlan = (planId as PlanTier) || "basico";
      const planCfg = PLAN_CONFIGS[selectedPlan] || PLAN_CONFIGS.basico;
      const cycle = (billingCycle as BillingCycle) || "mensual";
      
      unitPrice = getPlanPrice(selectedPlan, cycle);
      creditsIncluded = planCfg.creditsPerMonth;
      const periodLabel = getPlanPeriodLabel(cycle);

      itemId = `plan_${selectedPlan}_${cycle}`;
      itemTitle = `EnseñIA MX - ${planCfg.name} (${cycle.toUpperCase()})`;
      itemDescription = `Acceso al ${planCfg.name} con ${creditsIncluded} créditos cada mes. Facturación por ${periodLabel}.`;
    } 
    // 2. Resolve Credit Pack Purchase
    else if (itemType === "credits") {
      const pack = CREDIT_PACKAGES.find((p) => p.id === creditPackageId);
      if (pack) {
        itemId = pack.id;
        itemTitle = `EnseñIA MX - ${pack.name} (+${pack.credits} Créditos)`;
        itemDescription = `${pack.description} (${pack.credits} créditos adicionales sin vigencia de expiración).`;
        unitPrice = pack.price;
        creditsIncluded = pack.credits;
      } else {
        unitPrice = Number(customPrice) || 29;
        creditsIncluded = Number(creditAmount) || 30;
        itemId = `custom_credits_${creditsIncluded}`;
        itemTitle = customTitle || `Recarga de ${creditsIncluded} Créditos EnseñIA MX`;
        itemDescription = `Recarga especial de ${creditsIncluded} créditos para generación de planeaciones y exámenes.`;
      }
    }

    // Determine Base Application URL for Callbacks
    const protocol = req.headers?.["x-forwarded-proto"] || "http";
    const host = req.headers?.host || "localhost:3000";
    const baseAppUrl = (process.env.APP_URL || `${protocol}://${host}`).replace(/\/+$/, "");

    // External Reference to recognize and fulfill the payment
    const externalReferenceData = {
      userId,
      userEmail,
      itemType,
      planId: itemType === "plan" ? planId : undefined,
      billingCycle: itemType === "plan" ? billingCycle : undefined,
      creditPackageId: itemType === "credits" ? (creditPackageId || itemId) : undefined,
      creditsAdded: creditsIncluded,
      price: unitPrice,
      createdAt: new Date().toISOString(),
      timestamp: Date.now(),
    };
    const externalReferenceString = JSON.stringify(externalReferenceData);

    const mpAccessToken = process.env.MERCADOPAGO_ACCESS_TOKEN || "";
    const isMockToken = !mpAccessToken || mpAccessToken.includes("00000000") || mpAccessToken.includes("TEST-0000");

    // 3. Real Mercado Pago API Call if Access Token is configured
    if (!isMockToken) {
      const preferencePayload = {
        items: [
          {
            id: itemId,
            title: itemTitle,
            description: itemDescription,
            quantity: 1,
            currency_id: "MXN",
            unit_price: unitPrice,
            category_id: "services",
          },
        ],
        payer: {
          name: userName,
          email: userEmail,
        },
        notification_url: `${baseAppUrl}/api/mercadopago-webhook`,
        external_reference: externalReferenceString,
        statement_descriptor: "ENSENIA MX",
        expires: false,
        payment_methods: {
          excluded_payment_types: [],
          installments: 12,
        },
        metadata: externalReferenceData,
      };

      const mpResponse = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${mpAccessToken}`,
        },
        body: JSON.stringify(preferencePayload),
      });

      const mpData = await mpResponse.json();

      if (!mpResponse.ok || !mpData.id) {
        console.error("[MercadoPago API Error]:", mpData);
        return res.status(500).json({
          success: false,
          error: mpData.message || "Error al crear la preferencia de pago en Mercado Pago.",
          details: mpData,
        });
      }

      return res.status(200).json({
        success: true,
        preferenceId: mpData.id,
        initPoint: mpData.init_point,
        sandboxInitPoint: mpData.sandbox_init_point || mpData.init_point,
        externalReference: externalReferenceString,
        item: {
          title: itemTitle,
          price: unitPrice,
          credits: creditsIncluded,
        },
      });
    }

    // 4. Simulated / Demo Mode for instant testing without token
    console.log("[MercadoPago Demo Mode] Generando preferencia de prueba para:", itemTitle, `$${unitPrice} MXN`);
    const mockPrefId = `pref_mock_${Date.now()}`;
    const encodedRef = encodeURIComponent(externalReferenceString);
    const mockPaymentId = `MP_PAY_${Date.now()}`;

    const mockInitPoint = `${baseAppUrl}/payment-success?collection_status=approved&status=approved&payment_id=${mockPaymentId}&preference_id=${mockPrefId}&external_reference=${encodedRef}&is_demo=true`;

    return res.status(200).json({
      success: true,
      isMockDemo: true,
      preferenceId: mockPrefId,
      initPoint: mockInitPoint,
      sandboxInitPoint: mockInitPoint,
      externalReference: externalReferenceString,
      item: {
        title: itemTitle,
        price: unitPrice,
        credits: creditsIncluded,
      },
      message: "Preferencia generada en modo de prueba (Mercado Pago Sandbox).",
    });
  } catch (error: any) {
    console.error("[Checkout Server Error]:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Ocurrió un error inesperado al procesar la solicitud de pago.",
    });
  }
}

export default handleCheckout;
