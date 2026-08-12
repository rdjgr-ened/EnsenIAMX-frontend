import React, { useState, useEffect } from "react";
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
import { supabase } from "./lib/supabase";
import { cerrarSesion } from "./services/authService";
import { CompletePlan } from "./types";
import { FileText, LogOut, UserCheck } from "lucide-react";

const LOGO_IMG = "https://i.imgur.com/tv95RC0.png";
const STORAGE_PROFILE_KEY = "nem_secundaria_profile";
const STORAGE_PLANS_KEY = "nem_secundaria_plans";

interface UserProfile {
  docenteName: string;
  escuelaName: string;
  cct: string;
  email: string;
  escuelas?: Array<{ escuelaName: string; cct: string }>;
}

type ActiveTab = 
  | "hub" 
  | "diseno" 
  | "sugerir" 
  | "crear" 
  | "programa" 
  | "evaluacion" 
  | "bitacora" 
  | "organizador";

type OrganizadorTab = "planeaciones" | "grupos" | "bitacora" | "seguimiento" | "evaluacion";

export default function App() {
  // Estado para autenticación de Supabase
  const [usuarioSupabase, setUsuarioSupabase] = useState<any>(null);

  // Inicialización perezosa de planes desde localStorage
  const [plans, setPlans] = useState<CompletePlan[]>(() => {
    const savedPlans = localStorage.getItem(STORAGE_PLANS_KEY);
    if (savedPlans) {
      try {
        return JSON.parse(savedPlans);
      } catch (e) {
        console.error("Error parsing saved plans from localStorage:", e);
      }
    }
    return [];
  });

  const [currentPlan, setCurrentPlan] = useState<CompletePlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Inicialización perezosa del perfil de usuario
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(STORAGE_PROFILE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing saved profile from localStorage:", e);
        return null;
      }
    }
    return null;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>("hub");
  const [organizadorTab, setOrganizadorTab] = useState<OrganizadorTab>("planeaciones");
  const [prefilledData, setPrefilledData] = useState<Record<string, unknown> | null>(null);

  // Escuchar sesión activa de Supabase al cargar el componente
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUsuarioSupabase(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuarioSupabase(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = (profile: UserProfile) => {
    localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(profile));
    setUserProfile(profile);
    setActiveTab("hub");
    setPrefilledData(null);
  };

  const handleLogout = async () => {
    await cerrarSesion();
    localStorage.removeItem(STORAGE_PROFILE_KEY);
    setUserProfile(null);
    setActiveTab("hub");
    setPrefilledData(null);
    setCurrentPlan(null);
  };

  const savePlansToStorage = (updatedPlans: CompletePlan[]) => {
    setPlans(updatedPlans);
    localStorage.setItem(STORAGE_PLANS_KEY, JSON.stringify(updatedPlans));
  };

  const handleFormSubmit = async (formData: Record<string, any>) => {
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
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Error al procesar la planeación en el servidor.");
      }

      const data = await response.json();
      if (data.success && data.plan) {
        const newCompletePlan: CompletePlan = {
          id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
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
    } catch (error: unknown) {
      console.error("Error generating plan:", error);
      const errorMessage = error instanceof Error ? error.message : "No se pudo conectar con el servidor.";
      alert(`Error de Generación: ${errorMessage}`);
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

  if (!userProfile) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Determinar dinámicamente cuándo ocultar la columna lateral
  const isFullWidthView = activeTab === "hub" || activeTab === "organizador" || activeTab === "programa";

  const renderActiveView = () => {
    switch (activeTab) {
      case "hub":
        return (
          <DashboardHub
            onSelectFunction={(func: ActiveTab, folder?: OrganizadorTab) => {
              if (folder) {
                setOrganizadorTab(folder);
              }
              setActiveTab(func);
              setPrefilledData(null);
            }}
            docenteName={userProfile.docenteName}
            savedPlansCount={plans.length}
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
            onUseContent={(data: any) => {
              setPrefilledData(data);
              setActiveTab("diseno");
            }}
            onBack={() => setActiveTab("hub")}
          />
        );
      case "crear":
        return (
          <CrearContenidoView
            onUseContent={(data: any) => {
              setPrefilledData(data);
              setActiveTab("diseno");
            }}
            onBack={() => setActiveTab("hub")}
          />
        );
      case "programa":
        return (
          <CrearProgramaAnaliticoView
            onUseContent={(data: any) => {
              setPrefilledData(data);
              setActiveTab("diseno");
            }}
            onBack={() => setActiveTab("hub")}
            escuelaName={userProfile.escuelaName}
            cct={userProfile.cct}
            docenteName={userProfile.docenteName}
          />
        );
      case "evaluacion":
        return (
          <FormatoEvaluacionView
            onBack={() => setActiveTab("hub")}
            escuelaName={userProfile.escuelaName}
            cct={userProfile.cct}
            docenteName={userProfile.docenteName}
          />
        );
      case "bitacora":
        return (
          <BitacoraIncidenciaView
            onBack={() => setActiveTab("hub")}
            escuelaName={userProfile.escuelaName}
            cct={userProfile.cct}
            docenteName={userProfile.docenteName}
            escuelas={userProfile.escuelas}
          />
        );
      case "organizador":
        return (
          <OrganizadorEscolarView
            initialTab={organizadorTab}
            plans={plans}
            onSelectPlan={(plan) => setCurrentPlan(plan)}
            onDeletePlan={handleDeletePlan}
            onBack={() => setActiveTab("hub")}
            onGoToBitacora={() => setActiveTab("bitacora")}
            onGoToDiseno={() => {
              setActiveTab("diseno");
              setPrefilledData(null);
            }}
            docenteName={userProfile.docenteName}
            escuelaName={userProfile.escuelaName}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased pb-12 flex flex-col">
      <header className="bg-mex-maroon text-white py-4 px-4 sm:px-8 shadow-md shrink-0 print:hidden relative overflow-hidden">
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-lg -mr-12 -mt-12 pointer-events-none rotate-45" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl flex items-center justify-center p-1 shadow-sm overflow-hidden shrink-0 border border-mex-gold/40">
              <img
                src={LOGO_IMG}
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
          <div className="flex items-center gap-3">
            {usuarioSupabase && (
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded text-xs font-semibold">
                <UserCheck className="w-3.5 h-3.5 text-mex-gold" />
                <span className="hidden sm:inline max-w-[150px] truncate">{usuarioSupabase.email}</span>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="text-xs bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 rounded text-white font-bold transition flex items-center gap-2 hover:text-mex-gold hover:border-mex-gold/40 cursor-pointer"
              title="Cerrar sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 mt-8 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {!isFullWidthView && !currentPlan && (
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

          <div className={isFullWidthView || currentPlan ? "lg:col-span-3" : "lg:col-span-2"}>
            {currentPlan ? (
              <PlaneacionPreview
                planData={currentPlan}
                onBack={() => setCurrentPlan(null)}
                onUpdatePlan={(updatedPlan) => {
                  setCurrentPlan(updatedPlan);
                  const updatedPlans = plans.map((p) =>
                    p.id === updatedPlan.id ? updatedPlan : p
                  );
                  savePlansToStorage(updatedPlans);
                }}
              />
            ) : (
              renderActiveView()
            )}
          </div>
        </div>
      </main>

      <footer className="mt-auto py-3.5 bg-slate-100 border-t border-slate-200 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 print:hidden text-center sm:text-left">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight">
          EnseñIA MX v2026.1
        </p>
        <div className="flex gap-4">
          <span className="text-[10px] text-slate-400 hover:text-slate-600 cursor-pointer font-medium transition">
            Privacidad
          </span>
          <span className="text-[10px] text-slate-400 hover:text-slate-600 cursor-pointer font-medium transition">
            Manual de la NEM
          </span>
          <span className="text-[10px] text-slate-400 hover:text-slate-600 cursor-pointer font-medium transition">
            Soporte Técnico
          </span>
        </div>
      </footer>
    </div>
  );
}