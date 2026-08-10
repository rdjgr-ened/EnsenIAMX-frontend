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
import { CompletePlan } from "./types";
import { Sparkles, FileText, CheckCircle, LogOut, FolderKanban } from "lucide-react";
const logoImg = "https://i.imgur.com/tv95RC0.png";

export default function App() {
  const [plans, setPlans] = useState<CompletePlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<CompletePlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const [activeTab, setActiveTab] = useState<"hub" | "diseno" | "sugerir" | "crear" | "programa" | "evaluacion" | "bitacora" | "organizador">("hub");
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

  const handleLogout = () => {
    localStorage.removeItem("nem_secundaria_profile");
    setUserProfile(null);
    setActiveTab("hub");
    setPrefilledData(null);
    setCurrentPlan(null);
  };

  // Load plans from localStorage on mount
  useEffect(() => {
    const savedPlans = localStorage.getItem("nem_secundaria_plans");
    if (savedPlans) {
      try {
        setPlans(JSON.parse(savedPlans));
      } catch (e) {
        console.error("Error parsing saved plans:", e);
      }
    }
  }, []);

  // Save plans to localStorage on change
  const savePlansToStorage = (updatedPlans: CompletePlan[]) => {
    setPlans(updatedPlans);
    localStorage.setItem("nem_secundaria_plans", JSON.stringify(updatedPlans));
  };

  const handleFormSubmit = async (formData: any) => {
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
            escuelaName={userProfile.escuelaName}
            cct={userProfile.cct}
            docenteName={userProfile.docenteName}
          />
        );
      case "evaluacion":
        return (
          <FormatoEvaluacionView
            onBack={() => {
              setActiveTab("hub");
            }}
            escuelaName={userProfile.escuelaName}
            cct={userProfile.cct}
            docenteName={userProfile.docenteName}
          />
        );
      case "bitacora":
        return (
          <BitacoraIncidenciaView
            onBack={() => {
              setActiveTab("hub");
            }}
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
            docenteName={userProfile.docenteName}
            escuelaName={userProfile.escuelaName}
          />
        );
      default:
        return null;
    }
  };

  if (!userProfile) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const isFullWidthView = true;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased pb-12 flex flex-col">
      {/* Encabezado Escolar e Institucional - Oculto al imprimir */}
      <header className="bg-mex-maroon text-white py-4 px-4 sm:px-8 shadow-md shrink-0 print:hidden relative overflow-hidden">
        {/* Subtle geometric decoration */}
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-lg -mr-12 -mt-12 pointer-events-none rotate-45" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl flex items-center justify-center p-1 shadow-sm overflow-hidden shrink-0 border border-mex-gold/40">
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
          <div className="flex items-center gap-3">
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

      {/* Contenido Principal de la Aplicación */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 mt-8 w-full">
        
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
              />
            ) : (
              renderActiveView()
            )}
          </div>
        </div>
      </main>

      {/* Footer Bar - Oculto al imprimir */}
      <footer className="mt-auto py-3.5 bg-slate-100 border-t border-slate-200 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 print:hidden text-center sm:text-left">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight">
          EnseñIA MX v2026.1
        </p>
        <div className="flex gap-4">
          <span className="text-[10px] text-slate-400 hover:text-slate-600 cursor-pointer font-medium transition">Privacidad</span>
          <span className="text-[10px] text-slate-400 hover:text-slate-600 cursor-pointer font-medium transition">Manual de la NEM</span>
          <span className="text-[10px] text-slate-400 hover:text-slate-600 cursor-pointer font-medium transition">Soporte Técnico</span>
        </div>
      </footer>
    </div>
  );
}
