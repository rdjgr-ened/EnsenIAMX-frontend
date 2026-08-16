import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import PlaneacionForm from "./components/PlaneacionForm";
import PlaneacionPreview from "./components/PlaneacionPreview";
import HistorySidebar from "./components/HistorySidebar";
import LoginScreen from "./components/LoginScreen";
import DashboardHub from "./components/DashboardHub";
import SugerirContenidosView from "./components/SugerirContenidosView";
import CrearContenidoView from "./components/CrearContenidoView";
import CrearProgramaAnaliticoView from "./components/CrearProgramaAnaliticoView";
import FormatoEvaluacionView from "./components/FormatoEvaluacionView";
import BitacoraIncidenciaView from "./components/BitacoraIncidenciaView";
import OrganizadorEscolarView from "./components/OrganizadorEscolarView";
import CrearExamenView from "./components/CrearExamenView";
import PoliticaPrivacidadView from "./components/PoliticaPrivacidadView";
import TerminosCondicionesView from "./components/TerminosCondicionesView";
import MiCuentaView from "./components/MiCuentaView";
import PaywallModal from "./components/PaywallModal";
import PaymentSuccessView from "./components/PaymentSuccessView";
import { CompletePlan, UserSubscription, PaywallReason, CreditActionType, PlanTier } from "./types";
import { 
  getInitialSubscription, 
  loadUserSubscription,
  saveSubscriptionToStorage, 
  deductCreditsFromState, 
  updateUserPlan, 
  CREDIT_COSTS, 
  PLANS_CONFIG 
} from "./utils/planManager";
import {
  getPlaneaciones as fetchSupabasePlaneaciones,
  savePlaneacion as saveSupabasePlaneacion,
  getProfile as fetchSupabaseProfile,
  upsertProfile as saveSupabaseProfile,
  isSupabaseConfigured
} from "./utils/supabaseClient";
import { Sparkles, FileText, CheckCircle, LogOut, FolderKanban, Coins, Crown, Gem, Zap, User } from "lucide-react";
const logoImg = "https://i.imgur.com/tv95RC0.png";

const normalizePath = (path: string): string => {
  const p = path.toLowerCase().replace(/\/$/, "");
  if (p === "/politica-de-privacidad" || p === "/privacidad" || (typeof window !== "undefined" && window.location.hash === "#politica-de-privacidad")) {
    return "/politica-de-privacidad";
  }
  if (p === "/terminos-y-condiciones" || p === "/terminos" || (typeof window !== "undefined" && window.location.hash === "#terminos-y-condiciones")) {
    return "/terminos-y-condiciones";
  }
  if (
    p === "/payment-success" || 
    p === "/pago-exitoso" || 
    (typeof window !== "undefined" && (window.location.search.includes("collection_status") || window.location.search.includes("payment_id") || window.location.hash === "#payment-success"))
  ) {
    return "/payment-success";
  }
  return "/";
};

export default function App() {
  const [plans, setPlans] = useState<CompletePlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<CompletePlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // URL & Independent Page Routing State
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return normalizePath(window.location.pathname);
    }
    return "/";
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    const normalized = normalizePath(path);
    if (typeof window !== "undefined" && window.location.pathname !== normalized) {
      window.history.pushState(null, "", normalized);
    }
    setCurrentPath(normalized);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBackFromLegal = () => {
    if (typeof window !== "undefined" && window.history.length > 1 && (window.location.pathname === "/politica-de-privacidad" || window.location.pathname === "/terminos-y-condiciones")) {
      window.history.back();
    } else {
      navigateTo("/");
    }
  };

  // Public Landing / Login State
  const [publicView, setPublicView] = useState<"landing" | "login">("landing");
  const [loginInitialMode, setLoginInitialMode] = useState<"login" | "register">("login");

  // Subscription & Paywall State
  const [subscription, setSubscription] = useState<UserSubscription>(() => loadUserSubscription());
  const [isPaywallOpen, setIsPaywallOpen] = useState<boolean>(false);
  const [paywallReason, setPaywallReason] = useState<PaywallReason | null>(null);

  const handleTriggerPaywall = (reason: PaywallReason) => {
    setPaywallReason(reason);
    setIsPaywallOpen(true);
  };

  const handleDeductCredits = (action: CreditActionType): boolean => {
    const result = deductCreditsFromState(subscription, action);
    if (result.success && result.newSubscription) {
      setSubscription(result.newSubscription);
      return true;
    } else {
      handleTriggerPaywall({
        type: "credits",
        action,
        required: CREDIT_COSTS[action],
        current: subscription.credits,
      });
      return false;
    }
  };

  const handleSelectPlanTier = (plan: PlanTier, cycle?: "mensual" | "trimestral" | "anual") => {
    const updated = updateUserPlan(subscription, plan, cycle);
    setSubscription(updated);
    setIsPaywallOpen(false);
  };

  const [userProfile, setUserProfile] = useState<{
    docenteName: string;
    escuelaName: string;
    cct: string;
    email: string;
    escuelas?: Array<{ escuelaName: string; cct: string }>;
  } | null>(() => {
    const saved = localStorage.getItem("nem_secundaria_profile");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [activeTab, setActiveTab] = useState<"hub" | "diseno" | "sugerir" | "crear" | "programa" | "evaluacion" | "bitacora" | "organizador" | "examen" | "cuenta">("hub");
  const [organizadorTab, setOrganizadorTab] = useState<"planeaciones" | "grupos" | "bitacora" | "seguimiento" | "evaluacion">("planeaciones");
  const [prefilledData, setPrefilledData] = useState<any | null>(null);

  const handleLogin = (profile: {
    docenteName: string;
    escuelaName: string;
    cct: string;
    email: string;
    escuelas?: Array<{ escuelaName: string; cct: string }>;
  }) => {
    localStorage.setItem("nem_secundaria_profile", JSON.stringify(profile));
    setUserProfile(profile);
    setActiveTab("hub");
    setPrefilledData(null);
  };

  const handleUpdateProfile = (profile: {
    docenteName: string;
    escuelaName: string;
    cct: string;
    email: string;
    escuelas?: Array<{ escuelaName: string; cct: string }>;
  }) => {
    localStorage.setItem("nem_secundaria_profile", JSON.stringify(profile));
    setUserProfile(profile);
  };

  const handleLogout = () => {
    localStorage.removeItem("nem_secundaria_profile");
    setUserProfile(null);
    setPublicView("landing");
    setActiveTab("hub");
    setPrefilledData(null);
    setCurrentPlan(null);
  };

  // Load plans from localStorage and Supabase on mount
  useEffect(() => {
    const savedPlans = localStorage.getItem("nem_secundaria_plans");
    if (savedPlans) {
      try {
        setPlans(JSON.parse(savedPlans));
      } catch (e) {
        console.error("Error parsing saved plans:", e);
      }
    }

    if (isSupabaseConfigured) {
      const userProfileStr = localStorage.getItem("nem_secundaria_profile");
      const userEmail = userProfileStr ? JSON.parse(userProfileStr)?.email : null;
      const userId = userEmail ? `user_${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}` : 'anonymous_user';

      fetchSupabasePlaneaciones(userId).then(dbPlans => {
        if (dbPlans && dbPlans.length > 0) {
          const mappedPlans: CompletePlan[] = dbPlans.map(p => {
            if (p.contenido_json && p.contenido_json.plan) {
              return { ...p.contenido_json, id: p.id };
            }
            return {
              id: p.id,
              createdAt: p.created_at || new Date().toISOString(),
              docenteName: "Docente",
              escuelaName: "Escuela",
              cct: "CCT",
              grupo: "A",
              grado: "1º",
              campoFormativo: p.campo_formativo,
              pda: p.pda,
              metodologia: "Aprendizaje Basado en Proyectos",
              situacionProblema: p.titulo,
              plan: p.contenido_json
            };
          });
          setPlans(prev => {
            const existingIds = new Set(prev.map(pl => pl.id));
            const newOnes = mappedPlans.filter(pl => !existingIds.has(pl.id));
            const merged = [...newOnes, ...prev];
            localStorage.setItem("nem_secundaria_plans", JSON.stringify(merged));
            return merged;
          });
        }
      }).catch(err => console.warn("Supabase planeaciones load error:", err));
    }
  }, []);

  // Save plans to localStorage on change and sync to Supabase
  const savePlansToStorage = (updatedPlans: CompletePlan[]) => {
    setPlans(updatedPlans);
    localStorage.setItem("nem_secundaria_plans", JSON.stringify(updatedPlans));

    if (isSupabaseConfigured && updatedPlans.length > 0) {
      const latestPlan = updatedPlans[0];
      const userProfileStr = localStorage.getItem("nem_secundaria_profile");
      const userEmail = userProfileStr ? JSON.parse(userProfileStr)?.email : null;
      const userId = userEmail ? `user_${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}` : 'anonymous_user';

      saveSupabasePlaneacion({
        id: latestPlan.id,
        user_id: userId,
        titulo: latestPlan.situacionProblema || latestPlan.contenido || "Planeación NEM",
        campo_formativo: latestPlan.campoFormativo || "Lenguajes",
        pda: latestPlan.pda || "",
        contenido_json: latestPlan
      }).catch(err => console.warn("Error guardando planeación en Supabase:", err));
    }
  };

  const handleFormSubmit = async (formData: any) => {
    const requiredCredits = CREDIT_COSTS["disenar_planeacion"]; // 10
    if (subscription.credits < requiredCredits) {
      handleTriggerPaywall({
        type: "credits",
        action: "disenar_planeacion",
        required: requiredCredits,
        current: subscription.credits,
      });
      return;
    }

    const deducted = handleDeductCredits("disenar_planeacion");
    if (!deducted) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Error al procesar la planeación en el servidor.");
      }

      const data = await response.json();
      if (data.success && data.plan) {
        const newCompletePlan: CompletePlan = {
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          nivel: formData.nivel,
          docenteName: formData.docenteName,
          escuelaName: formData.escuelaName,
          cct: formData.cct,
          grupo: formData.grupo,
          grado: formData.grado,
          duracionSemanas: formData.duracionSemanas,
          duracionSesion: formData.duracionSesion,
          campoFormativo: formData.campoFormativo,
          disciplina: formData.disciplina,
          contenido: formData.contenido,
          pda: formData.pda,
          ejesArticuladores: formData.ejesArticuladores,
          metodologia: formData.metodologia,
          situacionProblema: formData.situacionProblema,
          bapSelected: formData.bapSelected,
          plan: data.plan,
        };

        const updatedPlans = [newCompletePlan, ...plans];
        savePlansToStorage(updatedPlans);
        setCurrentPlan(newCompletePlan);
      } else {
        throw new Error("No se recibió el formato del plan esperado.");
      }
    } catch (error: any) {
      console.error("Error generating plan:", error);
      alert(`Error de Generación: ${error.message || "No se pudo conectar con el servidor."}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePlan = (id: string) => {
    const updatedPlans = plans.filter((p) => p.id !== id);
    savePlansToStorage(updatedPlans);
    if (currentPlan && currentPlan.id === id) {
      setCurrentPlan(null);
    }
  };

  const handleSelectPlan = (plan: CompletePlan) => {
    setCurrentPlan(plan);
  };

  const currentPlanConfig = PLANS_CONFIG[subscription.plan] || PLANS_CONFIG.gratuito;

  const renderActiveView = () => {
    switch (activeTab) {
      case "hub":
        return (
          <DashboardHub
            onSelectFunction={(func, folder) => {
              if (folder) {
                setOrganizadorTab(folder);
              }
              setActiveTab(func);
              setPrefilledData(null);
            }}
            docenteName={userProfile?.docenteName || "Docente"}
            savedPlansCount={plans.length}
            subscription={subscription}
            onTriggerPaywall={handleTriggerPaywall}
          />
        );
      case "diseno":
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm print:hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-800 text-base mb-1 tracking-tight flex items-center gap-2">
                  <FileText className="w-5 h-5 text-mex-maroon" />
                  <span>Diseñar Nuevo Proyecto Didáctico</span>
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Completa los datos de tu planeación. Gemini diseñará la secuencia didáctica detallada alineada con tu problemática del contexto y los ejes transversales de la NEM.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveTab("hub");
                  setPrefilledData(null);
                }}
                className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition self-start sm:self-center shrink-0"
              >
                ← Volver al Panel
              </button>
            </div>
            <PlaneacionForm
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
              initialData={prefilledData}
              onBackToHub={() => {
                setActiveTab("hub");
                setPrefilledData(null);
              }}
            />
          </div>
        );
      case "sugerir":
        return (
          <SugerirContenidosView
            onUseContent={(data) => {
              setPrefilledData(data);
              setActiveTab("diseno");
            }}
            onBack={() => {
              setActiveTab("hub");
            }}
          />
        );
      case "crear":
        return (
          <CrearContenidoView
            onUseContent={(data) => {
              setPrefilledData(data);
              setActiveTab("diseno");
            }}
            onBack={() => {
              setActiveTab("hub");
            }}
          />
        );
      case "programa":
        return (
          <CrearProgramaAnaliticoView
            onUseContent={(data) => {
              setPrefilledData(data);
              setActiveTab("diseno");
            }}
            onBack={() => {
              setActiveTab("hub");
            }}
            escuelaName={userProfile?.escuelaName}
            cct={userProfile?.cct}
            docenteName={userProfile?.docenteName}
            subscription={subscription}
            onDeductCredits={handleDeductCredits}
            onTriggerPaywall={handleTriggerPaywall}
          />
        );
      case "evaluacion":
        return (
          <FormatoEvaluacionView
            onBack={() => {
              setActiveTab("hub");
            }}
            escuelaName={userProfile?.escuelaName || ""}
            cct={userProfile?.cct || ""}
            docenteName={userProfile?.docenteName || ""}
            subscription={subscription}
            onTriggerPaywall={handleTriggerPaywall}
          />
        );
      case "bitacora":
        return (
          <BitacoraIncidenciaView
            onBack={() => {
              setActiveTab("hub");
            }}
            escuelaName={userProfile?.escuelaName || ""}
            cct={userProfile?.cct || ""}
            docenteName={userProfile?.docenteName || ""}
            escuelas={userProfile?.escuelas}
            subscription={subscription}
            onTriggerPaywall={handleTriggerPaywall}
          />
        );
      case "organizador":
        return (
          <OrganizadorEscolarView
            initialTab={organizadorTab}
            plans={plans}
            onSelectPlan={(plan) => {
              setCurrentPlan(plan);
            }}
            onDeletePlan={handleDeletePlan}
            onBack={() => {
              setActiveTab("hub");
            }}
            onGoToBitacora={() => {
              setActiveTab("bitacora");
            }}
            onGoToDiseno={() => {
              setActiveTab("diseno");
              setPrefilledData(null);
            }}
            docenteName={userProfile?.docenteName || ""}
            escuelaName={userProfile?.escuelaName || ""}
            subscription={subscription}
            onTriggerPaywall={handleTriggerPaywall}
          />
        );
      case "examen":
        return (
          <CrearExamenView
            onBack={() => {
              setActiveTab("hub");
            }}
            escuelaName={userProfile?.escuelaName}
            cct={userProfile?.cct}
            docenteName={userProfile?.docenteName}
            escuelas={userProfile?.escuelas}
            subscription={subscription}
            onDeductCredits={handleDeductCredits}
            onTriggerPaywall={handleTriggerPaywall}
          />
        );
      case "cuenta":
        return (
          <MiCuentaView
            userProfile={userProfile}
            subscription={subscription}
            onUpdateProfile={handleUpdateProfile}
            onTriggerPaywall={handleTriggerPaywall}
            onBack={() => setActiveTab("hub")}
            onNavigateToPrivacy={() => navigateTo("/politica-de-privacidad")}
            onNavigateToTerms={() => navigateTo("/terminos-y-condiciones")}
          />
        );
      default:
        return null;
    }
  };

  // Payment Return & Legal Routing
  if (currentPath === "/payment-success") {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased pb-12 flex flex-col">
        {/* Encabezado Escolar */}
        <header className="bg-mex-maroon text-white py-3 sm:py-4 px-4 sm:px-8 shadow-md shrink-0 print:hidden relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div 
              onClick={() => {
                navigateTo("/");
                setActiveTab("hub");
              }}
              className="flex items-center gap-3.5 cursor-pointer hover:opacity-95 transition"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center p-1 shadow-sm overflow-hidden border border-mex-gold/40">
                <img src={logoImg} alt="EnseñIA MX Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h1 className="font-extrabold text-lg sm:text-xl tracking-tight">EnseñIA MX</h1>
                <p className="text-white/80 text-xs font-medium">Asistente Integral Docente</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-6">
          <PaymentSuccessView
            currentSubscription={subscription}
            onSubscriptionUpdate={(newSub) => {
              setSubscription(newSub);
              saveSubscriptionToStorage(newSub);
            }}
            onGoToDashboard={() => {
              navigateTo("/");
              setActiveTab("hub");
            }}
            onGoToDiseno={() => {
              navigateTo("/");
              setActiveTab("diseno");
              setPrefilledData(null);
            }}
            onGoToAccount={() => {
              navigateTo("/");
              setActiveTab("cuenta");
            }}
          />
        </main>
      </div>
    );
  }

  if (currentPath === "/politica-de-privacidad") {
    return <PoliticaPrivacidadView onBack={handleBackFromLegal} />;
  }

  if (currentPath === "/terminos-y-condiciones") {
    return <TerminosCondicionesView onBack={handleBackFromLegal} />;
  }

  if (!userProfile) {
    if (publicView === "landing") {
      return (
        <LandingPage
          onGoToLogin={() => {
            setLoginInitialMode("login");
            setPublicView("login");
          }}
          onGoToRegister={() => {
            setLoginInitialMode("register");
            setPublicView("login");
          }}
          onNavigateToPrivacy={() => navigateTo("/politica-de-privacidad")}
          onNavigateToTerms={() => navigateTo("/terminos-y-condiciones")}
        />
      );
    }
    return (
      <LoginScreen 
        onLogin={handleLogin} 
        initialMode={loginInitialMode}
        onBackToLanding={() => setPublicView("landing")}
        onNavigateToPrivacy={() => navigateTo("/politica-de-privacidad")}
        onNavigateToTerms={() => navigateTo("/terminos-y-condiciones")}
      />
    );
  }

  const isFullWidthView = true;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased pb-12 flex flex-col">
      {/* Encabezado Escolar e Institucional - Oculto al imprimir */}
      <header className="bg-mex-maroon text-white py-3 sm:py-4 px-4 sm:px-8 shadow-md shrink-0 print:hidden relative overflow-hidden">
        {/* Subtle geometric decoration */}
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-lg -mr-12 -mt-12 pointer-events-none rotate-45" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <div 
            onClick={() => {
              setActiveTab("hub");
              setCurrentPlan(null);
            }}
            className="flex items-center gap-3.5 cursor-pointer hover:opacity-95 transition"
            title="Ir al Panel Principal"
          >
            <div className="w-11 h-11 sm:w-13 sm:h-13 bg-white rounded-xl flex items-center justify-center p-1 shadow-sm overflow-hidden shrink-0 border border-mex-gold/40">
              <img
                src={logoImg}
                alt="EnseñIA MX Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="font-extrabold text-lg sm:text-xl tracking-tight">
                EnseñIA MX
              </h1>
              <p className="text-white/80 text-xs font-medium">
                Asistente Integral Docente
              </p>
            </div>
          </div>

          {/* Right Area: Plan Badge + Credits + Upgrade CTA + Mi Cuenta + Logout */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5">
            {/* 1. Plan Badge & Credits Indicator - Clickable to open Mi Cuenta */}
            <button
              type="button"
              onClick={() => {
                setActiveTab("cuenta");
                setCurrentPlan(null);
              }}
              className="flex items-center gap-2 bg-black/20 hover:bg-black/30 backdrop-blur-xs border border-white/15 px-3 py-1.5 rounded-xl transition cursor-pointer"
              title="Ver detalles de mi plan y créditos"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold">
                {subscription.plan === "platino" ? (
                  <Gem className="w-3.5 h-3.5 text-cyan-300" />
                ) : subscription.plan === "oro" ? (
                  <Crown className="w-3.5 h-3.5 text-amber-300" />
                ) : subscription.plan === "basico" ? (
                  <Zap className="w-3.5 h-3.5 text-emerald-300" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-slate-300" />
                )}
                <span className="text-white font-extrabold">{currentPlanConfig.name}</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-white/40"></span>
              <div className="flex items-center gap-1 text-xs font-black text-mex-gold">
                <Coins className="w-3.5 h-3.5" />
                <span>{subscription.credits} créditos</span>
              </div>
            </button>

            {/* 2. Upgrade Button */}
            <button
              type="button"
              onClick={() =>
                handleTriggerPaywall({
                  type: "feature",
                  featureName: "Planes y Créditos Pro",
                  requiredPlan: "oro",
                  message: "Explora nuestros planes para desbloquear créditos mensuales, historial extendido y todas las herramientas exclusivas.",
                })
              }
              className="text-xs bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black px-3 py-1.5 rounded-xl shadow-xs hover:shadow transition flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
              title="Mejorar plan o comprar créditos"
            >
              <Crown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mejorar Plan</span>
            </button>

            {/* 3. Mi Cuenta Button */}
            <button
              type="button"
              onClick={() => {
                setActiveTab("cuenta");
                setCurrentPlan(null);
              }}
              className={`text-xs px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === "cuenta" 
                  ? "bg-white text-mex-maroon shadow-xs font-extrabold" 
                  : "bg-white/10 hover:bg-white/20 border border-white/15 text-white"
              }`}
              title="Mi perfil y cuenta docente"
            >
              <User className="w-3.5 h-3.5 text-mex-gold" />
              <span>Mi Cuenta</span>
            </button>

            {/* 4. Logout */}
            <button
              onClick={handleLogout}
              className="text-xs bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 rounded-xl text-white font-bold transition flex items-center gap-1.5 hover:text-mex-gold hover:border-mex-gold/40 cursor-pointer"
              title="Cerrar sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal de la Aplicación */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 mt-8 w-full flex-1">
        
        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Lateral Izquierda (Acceso a Organizador Escolar) - Oculto al imprimir */}
          {!isFullWidthView && (
            <div className="lg:col-span-1 print:hidden">
              <HistorySidebar
                plans={plans}
                onSelectPlan={handleSelectPlan}
                onDeletePlan={handleDeletePlan}
                currentPlanId={currentPlan?.id}
                onOpenOrganizador={(folder) => {
                  setOrganizadorTab(folder || "planeaciones");
                  setActiveTab("organizador");
                  setCurrentPlan(null);
                }}
              />
            </div>
          )}

          {/* Columna Principal Derecha (Herramientas, Hub o Visualizador) */}
          <div className={isFullWidthView ? "lg:col-span-3" : "lg:col-span-2"}>
            {currentPlan ? (
              <PlaneacionPreview
                planData={currentPlan}
                onBack={() => setCurrentPlan(null)}
                onUpdatePlan={(updatedPlan) => {
                  setCurrentPlan(updatedPlan);
                  const updatedPlans = plans.map(p => p.id === updatedPlan.id ? updatedPlan : p);
                  savePlansToStorage(updatedPlans);
                }}
                subscription={subscription}
                onDeductCredits={handleDeductCredits}
                onTriggerPaywall={handleTriggerPaywall}
              />
            ) : (
              renderActiveView()
            )}
          </div>
        </div>
      </main>

      {/* Modal Global de Paywall / Selección de Planes */}
      <PaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        reason={paywallReason}
        currentSubscription={subscription}
        onSelectPlan={handleSelectPlanTier}
      />

      {/* Footer Bar - Oculto al imprimir */}
      <footer className="mt-auto py-3.5 bg-slate-100 border-t border-slate-200 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 print:hidden text-center sm:text-left">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight">
          EnseñIA MX v2026.1 • Asistente Integral Docente
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button 
            type="button"
            onClick={() => {
              setPublicView("landing");
              setUserProfile(null);
              navigateTo("/");
            }} 
            className="text-[10px] text-mex-maroon hover:underline font-bold transition cursor-pointer"
          >
            Página de Inicio (Landing)
          </button>
          <a
            href="/politica-de-privacidad"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("/politica-de-privacidad");
            }}
            className="text-[10px] text-slate-500 hover:text-mex-maroon font-semibold transition cursor-pointer"
          >
            Aviso de Privacidad
          </a>
          <a
            href="/terminos-y-condiciones"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("/terminos-y-condiciones");
            }}
            className="text-[10px] text-slate-500 hover:text-mex-maroon font-semibold transition cursor-pointer"
          >
            Términos y Condiciones
          </a>
        </div>
      </footer>
    </div>
  );
}
