import React, { useState } from "react";
import { 
  X, Check, Sparkles, Shield, Zap, Crown, Gem,
  AlertCircle, Coins, Calendar,
  CreditCard, Loader2, ShieldCheck, ArrowLeft, ExternalLink
} from "lucide-react";
import { PlanTier, BillingCycle, PaywallReason, UserSubscription } from "../types";
import { PLAN_CONFIGS, CREDIT_ACTIONS_INFO, upgradeUserPlan } from "../utils/planManager";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: PaywallReason | null;
  currentSubscription: UserSubscription;
  onSubscriptionChange?: (newSub: UserSubscription) => void;
  onSelectPlan?: (plan: PlanTier, cycle?: BillingCycle) => void;
}

export default function PaywallModal({
  isOpen,
  onClose,
  reason = { type: "manual_upgrade" },
  currentSubscription,
  onSubscriptionChange,
  onSelectPlan,
}: PaywallModalProps) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(currentSubscription.billingCycle || "mensual");
  const [loadingItem, setLoadingItem] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [activeCheckoutUrl, setActiveCheckoutUrl] = useState<string | null>(null);
  const [activePlanSelected, setActivePlanSelected] = useState<PlanTier | null>(null);

  if (!isOpen) return null;

  const getUserProfile = () => {
    try {
      const saved = localStorage.getItem("nem_secundaria_profile");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not read profile for checkout:", e);
    }
    return {
      docenteName: "Docente",
      email: "docente@enseniamx.app",
    };
  };

  const handleCheckoutPlan = async (plan: PlanTier) => {
    if (plan === "gratuito") {
      if (onSelectPlan) {
        onSelectPlan(plan, "mensual");
      } else if (onSubscriptionChange) {
        const updated = upgradeUserPlan(plan, "mensual", currentSubscription);
        onSubscriptionChange(updated);
      }
      onClose();
      return;
    }

    const profile = getUserProfile();
    const itemId = `plan_${plan}_${billingCycle}`;
    setLoadingItem(itemId);
    setCheckoutError(null);

    const userId = profile.id || `user_${(profile.email || "docente").replace(/[^a-zA-Z0-9]/g, "_")}`;

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan,
          billingCycle: billingCycle,
          userId: userId,
          userEmail: profile.email || "docente@enseniamx.app",
        }),
      });

      const data = await response.json();

      if (data.success && (data.initPoint || data.sandboxInitPoint)) {
        const targetUrl = data.initPoint || data.sandboxInitPoint;
        setActiveCheckoutUrl(targetUrl);
        setActivePlanSelected(plan);
        setLoadingItem(null);

        const checkoutWindow = window.open(targetUrl, "_blank");
        if (!checkoutWindow) {
          window.location.href = targetUrl;
        }
      } else {
        throw new Error(data.error || "No se pudo iniciar el checkout de Mercado Pago.");
      }
    } catch (err: any) {
      console.error("Error al iniciar checkout:", err);
      setCheckoutError(err.message || "Error al conectar con la pasarela de pagos.");
      setLoadingItem(null);
    }
  };

  const handleResetCheckout = () => {
    setActiveCheckoutUrl(null);
    setActivePlanSelected(null);
    setLoadingItem(null);
    setCheckoutError(null);
  };

  const getReasonBanner = () => {
    if (!reason || reason.type === "manual_upgrade") {
      return (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3.5 mb-5 text-emerald-950">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-extrabold text-sm text-emerald-900">
              Planes de Suscripción EnseñIA MX
            </h4>
            <p className="text-xs text-emerald-800/90 leading-relaxed font-medium">
              Elige el plan ideal para tu labor docente en la Nueva Escuela Mexicana con pago 100% seguro a través de Mercado Pago.
            </p>
          </div>
        </div>
      );
    }

    if (reason.type === "credits") {
      const actionLabel = CREDIT_ACTIONS_INFO[reason.action]?.label || "esta acción";
      return (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-center gap-3.5 mb-5 text-amber-950">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Coins className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-extrabold text-sm text-amber-900 flex items-center gap-2">
              <span>Créditos Insuficientes para {actionLabel}</span>
              <span className="text-[11px] font-black bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                Saldo: {reason.current} / Requiere: {reason.required}
              </span>
            </h4>
            <p className="text-xs text-amber-900/90 mt-0.5 leading-relaxed font-medium">
              Necesitas <strong className="text-amber-950 font-black">{reason.required} créditos</strong> para ejecutar esta función. Tu saldo actual es de <strong className="text-amber-950 font-black">{reason.current} créditos</strong>. Suscríbete a un plan superior para obtener más créditos mensuales.
            </p>
          </div>
        </div>
      );
    }

    if (reason.type === "feature") {
      const planName = PLAN_CONFIGS[reason.requiredPlan]?.name || "superior";
      return (
        <div className="bg-purple-50 border-2 border-purple-300 rounded-2xl p-4 flex items-center gap-3.5 mb-5 text-purple-950">
          <div className="w-10 h-10 rounded-xl bg-purple-700 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Crown className="w-5 h-5 text-amber-300" />
          </div>
          <div className="flex-1">
            <h4 className="font-extrabold text-sm text-purple-950">
              Función Exclusiva: {reason.featureName}
            </h4>
            <p className="text-xs text-purple-900 mt-0.5 leading-relaxed font-medium">
              {reason.message || `Esta función está disponible únicamente en el ${planName} (o superior).`}
            </p>
          </div>
        </div>
      );
    }

    if (reason.type === "limit") {
      return (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 flex items-center gap-3.5 mb-5 text-rose-950">
          <div className="w-10 h-10 rounded-xl bg-rose-700 text-white flex items-center justify-center shrink-0 shadow-sm">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-extrabold text-sm text-rose-950">
              Límite de Registros Alcanzado ({reason.currentCount} / {reason.maxAllowed})
            </h4>
            <p className="text-xs text-rose-900 mt-0.5 leading-relaxed font-medium">
              {reason.message}
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderPrice = (tier: PlanTier) => {
    if (tier === "gratuito") {
      return { price: "$0", period: "Gratis siempre", note: "20 créditos de bienvenida" };
    }
    if (tier === "basico") {
      if (billingCycle === "mensual") return { price: "$49", period: "MXN / mes", note: "Facturación mensual" };
      if (billingCycle === "trimestral") return { price: "$147", period: "MXN / 3 meses", note: "$49 MXN / mes" };
      return { price: "$588", period: "MXN / año", note: "$49 MXN / mes" };
    }
    if (tier === "oro") {
      if (billingCycle === "mensual") return { price: "$99", period: "MXN / mes", note: "Facturación mensual" };
      if (billingCycle === "trimestral") return { price: "$249", period: "MXN / 3 meses", note: "Ahorra ~16% ($83/mes)" };
      return { price: "$799", period: "MXN / año", note: "Ahorra ~33% ($66/mes)" };
    }
    if (tier === "platino") {
      if (billingCycle === "mensual") return { price: "$149", period: "MXN / mes", note: "Facturación mensual" };
      if (billingCycle === "trimestral") return { price: "$399", period: "MXN / 3 meses", note: "Ahorra ~11% ($133/mes)" };
      return { price: "$999", period: "MXN / año", note: "Ahorra ~44% ($83/mes)" };
    }
    return { price: "$0", period: "", note: "" };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8 max-h-[94vh] overflow-y-auto relative">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          title="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {getReasonBanner()}

        {activeCheckoutUrl && (
          <div className="mb-6 p-4.5 rounded-2xl bg-blue-50 border-2 border-blue-300 text-blue-950 shadow-sm animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-blue-900 flex items-center gap-2">
                    <span>Pasarela de Pago de Mercado Pago Abierta</span>
                    <span className="bg-blue-200 text-blue-900 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                      Plan {activePlanSelected ? PLAN_CONFIGS[activePlanSelected]?.name : ""}
                    </span>
                  </h4>
                  <p className="text-xs text-blue-800/90 mt-0.5">
                    Se abrió la pestaña segura de pago. Si deseas cambiar de plan o escoger otra forma, puedes regresar aquí cuando quieras.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleResetCheckout}
                  className="px-3.5 py-2 rounded-xl text-xs font-black bg-white hover:bg-blue-100 text-blue-800 border border-blue-200 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Elegir otro plan</span>
                </button>
                <a
                  href={activeCheckoutUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Reabrir pago</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {checkoutError && (
          <div className="mb-5 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2.5 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{checkoutError}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
              <Crown className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Planes de Suscripción Docente</h3>
              <p className="text-xs text-slate-500 font-medium">Elige el plan que mejor se adapte a tus necesidades de planeación</p>
            </div>
          </div>

          <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setBillingCycle("mensual")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer ${
                billingCycle === "mensual"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Mensual
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("trimestral")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer relative ${
                billingCycle === "trimestral"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Trimestral
              <span className="ml-1 text-[9px] font-black bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full">
                -16%
              </span>
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("anual")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer relative ${
                billingCycle === "anual"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Anual
              <span className="ml-1 text-[9px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full">
                -44%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-6">
          
          {/* PRUEBA GRATUITA */}
          <div className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
            currentSubscription.plan === "gratuito"
              ? "border-slate-400 bg-slate-50/70 ring-2 ring-slate-400 shadow-sm"
              : "border-slate-200 bg-white hover:border-slate-300"
          }`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                  <Zap className="w-5 h-5" />
                </div>
                {currentSubscription.plan === "gratuito" && (
                  <span className="text-[10px] font-black bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Plan Activo
                  </span>
                )}
              </div>

              <h4 className="font-black text-slate-900 text-base">Prueba Gratuita</h4>
              <p className="text-slate-500 text-[11px] font-medium mt-1 leading-snug">
                Ideal para explorar la plataforma.
              </p>

              <div className="mt-4 pb-4 border-b border-slate-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900">$0</span>
                  <span className="text-[11px] font-semibold text-slate-500">MXN</span>
                </div>
              </div>

              <ul className="space-y-2.5 my-4 text-xs">
                <li className="flex items-start gap-2 text-slate-700">
                  <Coins className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span className="font-bold">20 créditos</span> de bienvenida
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span>Historial: <strong>7 días</strong></span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Diseño de planeaciones NEM</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              disabled={currentSubscription.plan === "gratuito"}
              onClick={() => handleCheckoutPlan("gratuito")}
              className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                currentSubscription.plan === "gratuito"
                  ? "bg-slate-200 text-slate-500 cursor-default"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              }`}
            >
              {currentSubscription.plan === "gratuito" ? "Plan Actual" : "Activar Gratis"}
            </button>
          </div>

          {/* PLAN BÁSICO */}
          <div className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
            currentSubscription.plan === "basico"
              ? "border-blue-500 bg-blue-50/30 ring-2 ring-blue-500 shadow-md"
              : "border-slate-200 bg-white hover:border-blue-300"
          }`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
                  <Shield className="w-5 h-5" />
                </div>
                {currentSubscription.plan === "basico" && (
                  <span className="text-[10px] font-black bg-blue-600 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Plan Activo
                  </span>
                )}
              </div>

              <h4 className="font-black text-slate-900 text-base">Plan Básico</h4>
              <p className="text-slate-500 text-[11px] font-medium mt-1 leading-snug">
                Para docentes que gestionan planeaciones y grupos.
              </p>

              <div className="mt-4 pb-4 border-b border-slate-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900">{renderPrice("basico").price}</span>
                  <span className="text-[11px] font-semibold text-slate-500">{renderPrice("basico").period}</span>
                </div>
              </div>

              <ul className="space-y-2.5 my-4 text-xs">
                <li className="flex items-start gap-2 text-slate-800 font-bold">
                  <Coins className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>50 créditos al mes</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span>Historial: <strong>30 días</strong></span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Registrar grupos y alumnos</strong></span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              disabled={loadingItem === `plan_basico_${billingCycle}`}
              onClick={() => handleCheckoutPlan("basico")}
              className="w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
            >
              {loadingItem === `plan_basico_${billingCycle}` ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Conectando Mercado Pago...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Suscribirme {renderPrice("basico").price}</span>
                </>
              )}
            </button>
          </div>

          {/* PLAN ORO */}
          <div className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
            currentSubscription.plan === "oro"
              ? "border-amber-500 bg-amber-50/40 ring-2 ring-amber-500 shadow-md"
              : "border-slate-200 bg-white hover:border-amber-400 shadow-sm"
          }`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                  <Crown className="w-5 h-5" />
                </div>
                {currentSubscription.plan === "oro" && (
                  <span className="text-[10px] font-black bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Plan Activo
                  </span>
                )}
              </div>

              <h4 className="font-black text-slate-900 text-base">Plan Oro</h4>
              <p className="text-slate-500 text-[11px] font-medium mt-1 leading-snug">
                Seguimiento continuo y mayor volumen de créditos.
              </p>

              <div className="mt-4 pb-4 border-b border-slate-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900">{renderPrice("oro").price}</span>
                  <span className="text-[11px] font-semibold text-slate-500">{renderPrice("oro").period}</span>
                </div>
              </div>

              <ul className="space-y-2.5 my-4 text-xs">
                <li className="flex items-start gap-2 text-slate-900 font-black">
                  <Coins className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>100 créditos cada mes</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span>Historial: <strong>3 meses</strong></span>
                </li>
                <li className="flex items-start gap-2 text-emerald-800 font-bold">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Seguimiento de clases de proyectos</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              disabled={loadingItem === `plan_oro_${billingCycle}`}
              onClick={() => handleCheckoutPlan("oro")}
              className="w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition bg-amber-500 hover:bg-amber-600 text-slate-950 cursor-pointer shadow-md flex items-center justify-center gap-1.5"
            >
              {loadingItem === `plan_oro_${billingCycle}` ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Conectando Mercado Pago...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Suscribirme {renderPrice("oro").price}</span>
                </>
              )}
            </button>
          </div>

          {/* PLAN PLATINO */}
          <div className={`rounded-2xl p-5 border-2 flex flex-col justify-between transition-all relative ${
            currentSubscription.plan === "platino"
              ? "border-purple-600 bg-purple-50/40 ring-2 ring-purple-600 shadow-lg"
              : "border-purple-300 bg-white hover:border-purple-500 shadow-sm"
          }`}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-700 text-white font-black text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1">
              <Gem className="w-3 h-3 text-amber-300" />
              <span>Recomendado</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3 mt-1">
                <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center text-purple-800">
                  <Gem className="w-5 h-5" />
                </div>
                {currentSubscription.plan === "platino" && (
                  <span className="text-[10px] font-black bg-purple-700 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Plan Activo
                  </span>
                )}
              </div>

              <h4 className="font-black text-slate-900 text-base">Plan Platino</h4>
              <p className="text-slate-500 text-[11px] font-medium mt-1 leading-snug">
                Evaluación continua, rúbricas y sin límites.
              </p>

              <div className="mt-4 pb-4 border-b border-slate-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900">{renderPrice("platino").price}</span>
                  <span className="text-[11px] font-semibold text-slate-500">{renderPrice("platino").period}</span>
                </div>
              </div>

              <ul className="space-y-2.5 my-4 text-xs">
                <li className="flex items-start gap-2 text-purple-950 font-black">
                  <Coins className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>300 créditos cada mes</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span>Historial: <strong>12 meses (1 año)</strong></span>
                </li>
                <li className="flex items-start gap-2 text-purple-900 font-bold">
                  <Check className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span>Formato de Evaluación Continua</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              disabled={loadingItem === `plan_platino_${billingCycle}`}
              onClick={() => handleCheckoutPlan("platino")}
              className="w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition bg-purple-700 hover:bg-purple-800 text-white cursor-pointer shadow-md flex items-center justify-center gap-1.5"
            >
              {loadingItem === `plan_platino_${billingCycle}` ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Conectando Mercado Pago...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Suscribirme {renderPrice("platino").price}</span>
                </>
              )}
            </button>
          </div>

        </div>

        <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              Pagos procesados de forma 100% segura por <strong>Mercado Pago</strong> (Tarjetas de débito/crédito, transferencias SPEI y OXXO).
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0 font-extrabold text-[11px] text-slate-600">
            <span>🔒 Cifrado SSL 256-bit</span>
            <span>⚡ Activación Inmediata</span>
          </div>
        </div>

      </div>
    </div>
  );
}