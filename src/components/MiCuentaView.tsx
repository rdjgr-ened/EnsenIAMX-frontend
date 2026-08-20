import React, { useState } from "react";
import { 
  User, 
  Mail, 
  School, 
  Coins, 
  Crown, 
  Gem, 
  Zap, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle,
  Edit3,
  Save,
  X,
  Loader2
} from "lucide-react";
import { UserSubscription, PaywallReason } from "../types";
import { PLAN_CONFIGS } from "../utils/planManager";

interface MiCuentaViewProps {
  userProfile: {
    id?: string;
    docenteName: string;
    escuelaName: string;
    cct: string;
    email: string;
    escuelas?: Array<{ escuelaName: string; cct: string }>;
  } | null;
  subscription: UserSubscription;
  onUpdateProfile?: (updated: {
    docenteName: string;
    escuelaName: string;
    cct: string;
    email: string;
    escuelas?: Array<{ escuelaName: string; cct: string }>;
  }) => void;
  onTriggerPaywall: (reason: PaywallReason) => void;
  onBack: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToTerms?: () => void;
}

export default function MiCuentaView({
  userProfile,
  subscription,
  onUpdateProfile,
  onTriggerPaywall,
  onBack,
  onNavigateToPrivacy,
  onNavigateToTerms
}: MiCuentaViewProps) {
  // Conversión explícita a minúsculas para prevenir discrepancias ("Platino" vs "platino")[cite: 3]
  const currentPlan = (subscription?.plan || "gratuito").toLowerCase();
  const planConfig = PLAN_CONFIGS[currentPlan] || PLAN_CONFIGS.gratuito;
  const isPremium = currentPlan !== "gratuito";

  // Estados del Perfil
  const [isEditing, setIsEditing] = useState(false);
  const [docenteName, setDocenteName] = useState(userProfile?.docenteName || "Docente");
  const [escuelaName, setEscuelaName] = useState(userProfile?.escuelaName || "");
  const [cct, setCct] = useState(userProfile?.cct || "");
  const [email, setEmail] = useState(userProfile?.email || "docente@enseniamx.app");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Estados de Pago
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateProfile) {
      onUpdateProfile({
        docenteName,
        escuelaName,
        cct,
        email,
        escuelas: userProfile?.escuelas || []
      });
    }
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDirectPayment = async () => {
    const userId = userProfile?.id || (subscription as any)?.userId;

    if (!userId) {
      onTriggerPaywall({
        type: "feature",
        featureName: "Gestión de Planes y Suscripción",
        requiredPlan: isPremium ? "platino" : "oro",
        message: "Personaliza tu plan, amplía tu cuota mensual de créditos o cambia tu ciclo de facturación."
      });
      return;
    }

    setIsProcessingPayment(true);
    setPaymentError(null);

    try {
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          planName: 'Plan Platino',
          price: 149
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.init_point) {
        throw new Error(data.error || 'No se pudo generar la orden de pago.');
      }

      window.location.href = data.init_point;
    } catch (err: any) {
      console.error('Error al procesar el pago:', err);
      setPaymentError(err.message || 'Ocurrió un error al conectar con Mercado Pago.');
      setIsProcessingPayment(false);
    }
  };

  const maxQuota = planConfig.creditsPerMonth || 20;
  
  // Soporte dual para 'creditos_disponibles' (Supabase) y 'credits'[cite: 3]
  const userCredits = (subscription as any)?.creditos_disponibles ?? subscription?.credits ?? 0;
  const creditPercent = Math.min(100, Math.round((userCredits / maxQuota) * 100));

  const planBadgeIcon = () => {
    switch (currentPlan) {
      case "platino":
        return <Gem className="w-5 h-5 text-cyan-400" />;
      case "oro":
        return <Crown className="w-5 h-5 text-amber-400" />;
      case "basico":
        return <Zap className="w-5 h-5 text-emerald-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3.5">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer shrink-0"
            title="Volver al panel"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <User className="w-6 h-6 text-mex-maroon" />
              <span>Mi Cuenta Docente</span>
            </h1>
            <p className="text-slate-500 text-xs mt-0.5">
              Administra tu perfil, información institucional, estado de suscripción y saldo de créditos.
            </p>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>¡Datos de tu cuenta docente actualizados correctamente!</span>
        </div>
      )}

      {paymentError && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-fade-in">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{paymentError}</span>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Columna Izquierda: Perfil del Docente */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-mex-maroon" />
                <span>Perfil del Docente</span>
              </h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs text-mex-maroon hover:text-red-900 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Editar</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Cancelar</span>
                </button>
              )}
            </div>

            {!isEditing ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-mex-maroon to-red-900 text-white flex items-center justify-center font-black text-xl shadow-inner shrink-0">
                    {docenteName.charAt(0).toUpperCase() || "D"}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-base leading-snug">
                      {docenteName}
                    </h4>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mt-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Docente Verificado
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>Correo Electrónico</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800 break-all">
                    {email}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                    <School className="w-3.5 h-3.5 text-slate-500" />
                    <span>Plantel Principal y CCT</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    {escuelaName || "Centro Escolar no configurado"}
                  </p>
                  <p className="text-xs text-slate-500 font-semibold">
                    CCT: {cct || "Sin CCT registrada"}
                  </p>
                </div>

                {userProfile?.escuelas && userProfile.escuelas.length > 0 && (
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                    <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                      Otros Centros de Trabajo ({userProfile.escuelas.length})
                    </div>
                    <div className="space-y-1 text-xs text-slate-700">
                      {userProfile.escuelas.map((esc, i) => (
                        <div key={i} className="flex justify-between items-center py-0.5 border-b border-slate-200/50 last:border-none">
                          <span className="font-semibold">{esc.escuelaName}</span>
                          <span className="text-[11px] text-slate-500 font-mono">{esc.cct}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nombre Completo del Docente
                  </label>
                  <input
                    type="text"
                    required
                    value={docenteName}
                    onChange={(e) => setDocenteName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-mex-maroon/20 focus:border-mex-maroon bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-mex-maroon/20 focus:border-mex-maroon bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nombre de la Escuela
                  </label>
                  <input
                    type="text"
                    value={escuelaName}
                    onChange={(e) => setEscuelaName(e.target.value)}
                    placeholder="Ej. Secundaria Federal No. 1"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-mex-maroon/20 focus:border-mex-maroon bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Clave de Centro de Trabajo (CCT)
                  </label>
                  <input
                    type="text"
                    value={cct}
                    onChange={(e) => setCct(e.target.value)}
                    placeholder="Ej. 15DES0023K"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-mex-maroon/20 focus:border-mex-maroon bg-white font-mono"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg font-bold transition cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs bg-mex-maroon hover:bg-red-900 text-white rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Guardar Cambios</span>
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Tus datos institucionales están protegidos bajo estricta confidencialidad.</span>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Estado de Membresía y Pago */}
        <div className="lg:col-span-7 space-y-6">

          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 w-72 h-72 bg-mex-gold/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <span className="text-[10px] text-mex-gold uppercase font-black tracking-widest block mb-1">
                    Estado de la Membresía
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-xl border border-white/15">
                      {planBadgeIcon()}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white tracking-tight capitalize">
                        {planConfig.name}
                      </h3>
                      <p className="text-xs text-slate-300 font-medium">
                        {isPremium 
                          ? `Ciclo ${subscription?.billingCycle || 'mensual'} • Renovación activa`
                          : "Periodo de evaluación inicial"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="self-start sm:self-auto">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-black uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Cuenta Activa
                  </span>
                </div>
              </div>

              {/* Barra de Créditos */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-mex-gold" />
                    <span className="font-extrabold text-sm text-white">Créditos Restantes</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-mex-gold">
                      {userCredits}
                    </span>
                    <span className="text-xs text-slate-400 font-bold ml-1">
                      / {maxQuota} mes
                    </span>
                  </div>
                </div>

                <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden p-0.5">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      userCredits > 10
                        ? "bg-gradient-to-r from-mex-gold to-amber-300"
                        : "bg-gradient-to-r from-red-500 to-rose-400"
                    }`}
                    style={{ width: `${Math.max(5, creditPercent)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1">
                  <span>Historial guardado: <strong>{planConfig.historyLabel}</strong></span>
                  <span>Bitácoras: <strong>{planConfig.bitacoraLimit === Infinity ? "Ilimitadas" : planConfig.bitacoraLimit}</strong></span>
                </div>
              </div>

              {/* Botón de Mercado Pago */}
              <div className="pt-2">
                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={handleDirectPayment}
                  className="w-full bg-gradient-to-r from-mex-gold to-amber-400 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Conectando con Mercado Pago...</span>
                    </>
                  ) : (
                    <>
                      <Crown className="w-4 h-4" />
                      <span>{isPremium ? "Gestionar o Cambiar de Plan" : "Actualizar a Plan Premium"}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-1 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cobro seguro y protegido con <strong>Mercado Pago</strong></span>
              </div>

            </div>
          </div>

          {/* Características del Plan */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h4 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Funcionalidades Desbloqueadas en tu Cuenta</span>
            </h4>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900">Diseño Didáctico NEM:</span>
                  <span className="text-slate-600 ml-1">Generación de secuencias completas para fases 2 a 6.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition">
                {planConfig.allowGroups ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className={`font-bold ${planConfig.allowGroups ? "text-slate-900" : "text-slate-400"}`}>
                    Administración de Grupos y Alumnos:
                  </span>
                  <span className="text-slate-500 ml-1">
                    {planConfig.allowGroups ? "Disponible" : "Requiere Plan Básico o superior"}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition">
                {planConfig.allowBitacora ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className={`font-bold ${planConfig.allowBitacora ? "text-slate-900" : "text-slate-400"}`}>
                    Bitácora de Incidencias Escolares:
                  </span>
                  <span className="text-slate-500 ml-1">
                    {planConfig.allowBitacora ? `Disponible (${planConfig.bitacoraLimit === Infinity ? "Ilimitadas" : `hasta ${planConfig.bitacoraLimit}`})` : "Requiere Plan Básico o superior"}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition">
                {planConfig.allowClassTracking ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className={`font-bold ${planConfig.allowClassTracking ? "text-slate-900" : "text-slate-400"}`}>
                    Seguimiento de Clases por Proyecto:
                  </span>
                  <span className="text-slate-500 ml-1">
                    {planConfig.allowClassTracking ? "Disponible" : "Requiere Plan Oro o Platino"}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition">
                {planConfig.allowEvaluationFormat ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className={`font-bold ${planConfig.allowEvaluationFormat ? "text-slate-900" : "text-slate-400"}`}>
                    Formato de Evaluación Continua (Google Sheets / Excel):
                  </span>
                  <span className="text-slate-500 ml-1">
                    {planConfig.allowEvaluationFormat ? "Disponible" : "Exclusivo de Plan Platino"}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}