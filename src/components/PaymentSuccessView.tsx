import React, { useEffect, useState } from "react";
import { 
  CheckCircle2, 
  Sparkles, 
  Coins, 
  Crown, 
  Gem, 
  Shield, 
  ArrowRight, 
  Download, 
  Receipt, 
  FileText, 
  Home, 
  User, 
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { UserSubscription, PlanTier, BillingCycle } from "../types";
import { PLAN_CONFIGS, upgradeUserPlan, addExtraCredits, saveUserSubscription } from "../utils/planManager";
import { isSupabaseConfigured, upsertProfile } from "../utils/supabaseClient";

interface PaymentSuccessViewProps {
  onGoToDashboard: () => void;
  onGoToDiseno: () => void;
  onGoToAccount: () => void;
  currentSubscription: UserSubscription;
  onSubscriptionUpdate: (newSub: UserSubscription) => void;
}

export default function PaymentSuccessView({
  onGoToDashboard,
  onGoToDiseno,
  onGoToAccount,
  currentSubscription,
  onSubscriptionUpdate,
}: PaymentSuccessViewProps) {
  const [paymentDetails, setPaymentDetails] = useState<{
    status: string;
    paymentId: string;
    preferenceId: string;
    itemType: "plan" | "credits";
    planId?: PlanTier;
    billingCycle?: BillingCycle;
    creditsAdded: number;
    price: number;
    processed: boolean;
    isDemo?: boolean;
  }>({
    status: "approved",
    paymentId: "",
    preferenceId: "",
    itemType: "plan",
    creditsAdded: 0,
    price: 0,
    processed: false,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      // Las suscripciones a veces regresan como 'authorized' o 'pending' inicialmente
      const status = urlParams.get("collection_status") || urlParams.get("status") || "approved";
      
      // En Suscripciones (PreApproval) MP envía preapproval_id. En pagos únicos envía payment_id
      const paymentId = urlParams.get("preapproval_id") || urlParams.get("payment_id") || urlParams.get("collection_id") || `MP_${Date.now().toString().slice(-6)}`;
      const preferenceId = urlParams.get("preference_id") || "";
      const isDemo = urlParams.get("is_demo") === "true";
      const externalRefRaw = urlParams.get("external_reference");

      let itemType: "plan" | "credits" = urlParams.get("type") === "credits" ? "credits" : "plan";
      let planId: PlanTier = (urlParams.get("plan") as PlanTier) || "platino";
      let billingCycle: BillingCycle = (urlParams.get("cycle") as BillingCycle) || "mensual";
      let creditsAdded = 0;

      // 1. DESEMPAQUETAR LOS DATOS SEGUROS
      if (externalRefRaw) {
        if (externalRefRaw.includes('_')) {
          // A) NUEVO SISTEMA (Suscripciones PreApproval): "userId_planId_cycle_credits"
          const parts = externalRefRaw.split('_');
          planId = (parts[1] as PlanTier) || planId;
          billingCycle = (parts[2] as BillingCycle) || billingCycle;
          creditsAdded = Number(parts[3]) || 0;
        } else {
          // B) SISTEMA VIEJO (Respaldo)
          try {
            const refData = JSON.parse(decodeURIComponent(externalRefRaw));
            itemType = refData.itemType || itemType;
            planId = refData.planId || planId;
            billingCycle = refData.billingCycle || billingCycle;
            creditsAdded = Number(refData.creditsAdded) || 0;
          } catch (e) {
            console.warn("No es un JSON, asumiendo formato plano");
          }
        }
      }

      // 2. OBTENER CRÉDITOS SI FALTAN
      if (!creditsAdded) {
        creditsAdded = itemType === "credits" ? 80 : (PLAN_CONFIGS[planId]?.credits || 300);
      }

      // 3. CALCULAR EL PRECIO MOSTRADO EN PANTALLA
      const PRICING: any = {
        basico: { mensual: 49, trimestral: 147, anual: 588 },
        oro: { mensual: 99, trimestral: 249, anual: 799 },
        platino: { mensual: 149, trimestral: 399, anual: 999 }
      };
      const price = PRICING[planId]?.[billingCycle] || 149;

      // CANDADO DE SEGURIDAD ESTRICTO: Evita el exploit de F5 (recargar página)
      const processedKey = `mp_processed_${paymentId}`;
      const alreadyProcessed = sessionStorage.getItem(processedKey) === "true";

      if (!alreadyProcessed && (status === "approved" || status === "authorized" || status === "pending" || isDemo)) {
        sessionStorage.setItem(processedKey, "true");
        
        let updatedSub = { ...currentSubscription };

        if (itemType === "plan" && planId && PLAN_CONFIGS[planId]) {
          updatedSub = {
            ...currentSubscription,
            plan: planId,
            billingCycle: billingCycle,
            credits: creditsAdded
          };
        } else if (itemType === "credits") {
          updatedSub = addExtraCredits(currentSubscription, creditsAdded);
        }

        onSubscriptionUpdate(updatedSub);
        saveUserSubscription(updatedSub);
      }

      setPaymentDetails({
        status,
        paymentId,
        preferenceId,
        itemType,
        planId,
        billingCycle,
        creditsAdded,
        price,
        processed: true,
        isDemo,
      });
    } catch (err) {
      console.error("Error processing payment return:", err);
    } finally {
      setIsLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const planConfig = paymentDetails.planId ? PLAN_CONFIGS[paymentDetails.planId] : null;

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="max-w-2xl w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
        
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -mr-20 -mt-20 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Animated Success Badge */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-xl mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>

            <span className="text-[11px] font-black tracking-widest uppercase bg-white/20 backdrop-blur-xs px-3.5 py-1 rounded-full text-emerald-100 mb-2">
              Pago Confirmado con Mercado Pago
            </span>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {paymentDetails.itemType === "plan" 
                ? `¡Suscripción al ${planConfig?.name || "Plan Platino"} Activa!` 
                : `¡Recarga de ${paymentDetails.creditsAdded} Créditos Exitosa!`}
            </h1>

            <p className="text-emerald-100/90 text-xs sm:text-sm mt-1.5 max-w-lg">
              Tu suscripción recurrente ha sido procesada de manera segura. Tu cuenta ha sido actualizada con los nuevos créditos y beneficios.
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">

          {/* Mercado Pago Badge & Receipt Summary */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-slate-500" />
                <span className="font-extrabold text-xs text-slate-700 uppercase tracking-wider">
                  Detalles de tu Suscripción
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                Aprobado
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 font-bold block">Concepto:</span>
                <span className="font-extrabold text-slate-900">
                  {paymentDetails.itemType === "plan"
                    ? `${planConfig?.name} (${paymentDetails.billingCycle?.toUpperCase()})`
                    : `Paquete de ${paymentDetails.creditsAdded} Créditos EnseñIA MX`}
                </span>
              </div>

              <div>
                <span className="text-slate-400 font-bold block">Primer Pago:</span>
                <span className="font-black text-slate-900 text-sm">
                  ${paymentDetails.price} MXN
                </span>
              </div>

              <div>
                <span className="text-slate-400 font-bold block">ID de Autorización:</span>
                <span className="font-mono text-slate-700 font-semibold break-all">
                  {paymentDetails.paymentId || "MP-TX-ONLINE"}
                </span>
              </div>

              <div>
                <span className="text-slate-400 font-bold block">Fecha de Activación:</span>
                <span className="text-slate-700 font-semibold">
                  {new Date().toLocaleDateString("es-MX", { 
                    year: "numeric", 
                    month: "long", 
                    day: "numeric" 
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* New Balance & Current Subscription Highlight */}
          <div className="bg-gradient-to-br from-mex-maroon/5 via-amber-50 to-white rounded-2xl border border-mex-gold/40 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-mex-gold to-amber-400 text-slate-950 flex items-center justify-center font-black shadow-sm shrink-0">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-900">
                  Saldo Actualizado en tu Cuenta
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {currentSubscription.credits} Créditos Disponibles
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  Nivel de cuenta: <strong className="text-mex-maroon uppercase">{PLAN_CONFIGS[currentSubscription.plan]?.name || currentSubscription.plan}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={onGoToAccount}
              className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-black transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-xs"
            >
              <User className="w-3.5 h-3.5 text-mex-maroon" />
              <span>Ver Mi Cuenta</span>
            </button>
          </div>

          {/* Action Navigation Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={onGoToDiseno}
              className="w-full py-3.5 px-5 bg-gradient-to-r from-mex-maroon to-red-900 hover:from-red-900 hover:to-red-950 text-white font-black rounded-xl text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-mex-gold" />
              <span>Diseñar un Proyecto NEM</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => window.location.href = "/"}
              className="w-full py-3.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-black rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Home className="w-4 h-4 text-slate-600" />
              <span>Ir al Panel Principal</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}