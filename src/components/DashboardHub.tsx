import React, { useState } from "react";
import { 
  Sparkles, 
  FileText, 
  PenTool, 
  ArrowRight, 
  ArrowLeft,
  Layers, 
  FileSpreadsheet, 
  ShieldAlert, 
  BookOpen, 
  Calculator, 
  FolderKanban, 
  Users, 
  ClipboardList, 
  BookCheck,
  GraduationCap,
  Lock,
  Coins,
  Crown,
  Gem,
  Shield,
  User,
  CreditCard
} from "lucide-react";
import { UserSubscription, PaywallReason, PlanTier } from "../types";

interface DashboardHubProps {
  onSelectFunction?: (
    // ¡AQUÍ ESTÁ LA NUEVA OPCIÓN "proyectos_aula"!
    fn: "diseno" | "sugerir" | "crear" | "programa" | "evaluacion" | "bitacora" | "organizador" | "examen" | "cuenta" | "generar_hoja" | "generar_instrumento" | "proyectos_aula",
    folder?: "planeaciones" | "hojas" | "instrumentos" | "programas" | "examenes" | "grupos" | "bitacora" | "evaluacion"
  ) => void;
  savedPlansCount?: number;
  docenteName?: string;
  subscription?: UserSubscription;
  onTriggerPaywall?: (reason: PaywallReason) => void;
}

type CategoryId = "organizador" | "plano" | "programa" | "evaluacion" | "gestion" | null;

export default function DashboardHub(props: DashboardHubProps) {
  const safeOnSelectFunction = props.onSelectFunction || (() => {});
  const safeSavedPlansCount = props.savedPlansCount ?? 0;
  const safeDocenteName = props.docenteName || "Docente";
  const userPlan: PlanTier = props.subscription?.plan || "gratuito";
  const safeTriggerPaywall = props.onTriggerPaywall || (() => {});

  const [selectedCategory, setSelectedCategory] = useState<CategoryId>(null);

  const handleFolderClick = (folder: "planeaciones" | "grupos" | "bitacora" | "seguimiento" | "evaluacion") => {
    const isPremium = userPlan === "basico" || userPlan === "oro" || userPlan === "platino";
    const isOroPlatino = userPlan === "oro" || userPlan === "platino";
    const isPlatino = userPlan === "platino";

    if (folder === "grupos" && !isPremium) {
      safeTriggerPaywall({
        type: "feature",
        featureName: "Registro y Administración de Grupos",
        requiredPlan: "basico",
        message: "Esta función requiere el Plan Básico o superior."
      });
      return;
    } else if (folder === "bitacora" && !isPremium) {
      safeTriggerPaywall({
        type: "feature",
        featureName: "Bitácora de Incidencias Escolares",
        requiredPlan: "basico",
        message: "Esta función requiere el Plan Básico o superior."
      });
      return;
    } else if (folder === "evaluacion" && !isPlatino) {
      safeTriggerPaywall({
        type: "feature",
        featureName: "Evaluación Continua del Trabajo en Clase",
        requiredPlan: "platino",
        message: "Esta función es exclusiva del Plan Platino."
      });
      return;
    }

    safeOnSelectFunction("organizador", folder);
  };

  const handleFunctionClick = (
    fn: "diseno" | "sugerir" | "crear" | "programa" | "evaluacion" | "bitacora" | "organizador" | "examen" | "generar_hoja" | "generar_instrumento" | "proyectos_aula"
  ) => {
    const isPremium = userPlan === "basico" || userPlan === "oro" || userPlan === "platino";
    const isPlatino = userPlan === "platino";

    if (fn === "evaluacion" && !isPlatino) {
      safeTriggerPaywall({
        type: "feature",
        featureName: "Formato de Evaluación (Google Sheets / Excel)",
        requiredPlan: "platino",
        message: "Esta función es exclusiva del Plan Platino."
      });
      return;
    } else if (fn === "bitacora" && !isPremium) {
      safeTriggerPaywall({
        type: "feature",
        featureName: "Bitácora de Incidencias Escolares",
        requiredPlan: "basico",
        message: "Esta función requiere el Plan Básico o superior."
      });
      return;
    }

    safeOnSelectFunction(fn);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-br from-mex-maroon to-[#1f2e3d] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-mex-gold/10 rounded-full blur-3xl -mr-16 -mb-16 pointer-events-none" />
        <div className="relative z-10">
          <h2 className="font-extrabold text-2xl sm:text-3xl tracking-tight">
            ¡Hola, {safeDocenteName}!
          </h2>
        </div>
      </div>

      {selectedCategory === null ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <button type="button" onClick={() => setSelectedCategory("organizador")} className="group text-left bg-white border-2 border-mex-maroon/20 hover:border-mex-maroon rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-mex-maroon/10 text-mex-maroon flex items-center justify-center group-hover:bg-mex-maroon group-hover:text-white transition-all">
                  <FolderKanban className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-slate-800 text-base uppercase tracking-wide group-hover:text-mex-maroon transition-colors">Organizador Escolar</h4>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed font-semibold">Acceso a tus carpetas digitales.</p>
                </div>
              </div>
              <div className="pt-5 border-t border-slate-100 mt-5 flex items-center justify-between text-mex-maroon font-extrabold text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Ver Carpetas</span><ArrowRight className="w-4 h-4" />
              </div>
            </button>

            <button type="button" onClick={() => setSelectedCategory("plano")} className="group text-left bg-white border-2 border-mex-maroon/20 hover:border-mex-maroon rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-mex-maroon/10 text-mex-maroon flex items-center justify-center group-hover:bg-mex-maroon group-hover:text-white transition-all">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-slate-800 text-base uppercase tracking-wide group-hover:text-mex-maroon transition-colors">Plano Didáctico</h4>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed font-semibold">Diseño y estructuración de proyectos didácticos por fases, hojas de trabajo e instrumentos.</p>
                </div>
              </div>
              <div className="pt-5 border-t border-slate-100 mt-5 flex items-center justify-between text-mex-maroon font-extrabold text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Explorar Funciones</span><ArrowRight className="w-4 h-4" />
              </div>
            </button>

            <button type="button" onClick={() => setSelectedCategory("programa")} className="group text-left bg-white border-2 border-amber-200 hover:border-amber-400 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-slate-800 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 transition-all">
                  <Layers className="w-6 h-6 text-mex-maroon group-hover:text-slate-950" />
                </div>
                <div>
                  <h4 className="font-black text-slate-800 text-base uppercase tracking-wide group-hover:text-amber-700 transition-colors">Programa Analítico</h4>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed font-semibold">Sugerencias de contenidos con IA, creación de contenidos/PDAs y ensamblado del programa.</p>
                </div>
              </div>
              <div className="pt-5 border-t border-slate-100 mt-5 flex items-center justify-between text-slate-800 font-extrabold text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Explorar Funciones</span><ArrowRight className="w-4 h-4" />
              </div>
            </button>

            <button type="button" onClick={() => setSelectedCategory("evaluacion")} className="group text-left bg-white border-2 border-emerald-200 hover:border-emerald-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-slate-800 text-base uppercase tracking-wide group-hover:text-emerald-700 transition-colors">Evaluación</h4>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed font-semibold">Generación de formatos de evaluación trimestrales, exámenes y suma automática continua.</p>
                </div>
              </div>
              <div className="pt-5 border-t border-slate-100 mt-5 flex items-center justify-between text-emerald-700 font-extrabold text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Explorar Funciones</span><ArrowRight className="w-4 h-4" />
              </div>
            </button>

            <button type="button" onClick={() => setSelectedCategory("gestion")} className="group text-left bg-white border-2 border-rose-200 hover:border-rose-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-rose-100 text-mex-maroon flex items-center justify-center group-hover:bg-mex-maroon group-hover:text-white transition-all">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-slate-800 text-base uppercase tracking-wide group-hover:text-mex-maroon transition-colors">Registro e Incidencias</h4>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed font-semibold">Bitácora de incidencias escolares y administración de grupos.</p>
                </div>
              </div>
              <div className="pt-5 border-t border-slate-100 mt-5 flex items-center justify-between text-mex-maroon font-extrabold text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Explorar Funciones</span><ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <button type="button" onClick={() => setSelectedCategory(null)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs uppercase tracking-wider transition cursor-pointer">
              <ArrowLeft className="w-4 h-4" /><span>Volver a Categorías</span>
            </button>
          </div>

          {selectedCategory === "organizador" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-mex-maroon text-white flex items-center justify-center">
                  <FolderKanban className="w-5 h-5 text-mex-gold" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg uppercase tracking-wider">Organizador Escolar</h3>
                  <p className="text-slate-500 text-xs font-medium">Selecciona una carpeta digital para ingresar directamente a su sección:</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                <div onClick={() => handleFolderClick("planeaciones")} className="group cursor-pointer bg-white border border-slate-200 hover:border-mex-maroon p-5 rounded-xl shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div><h4 className="font-extrabold text-slate-800 text-sm">1. Mis Planeaciones</h4><p className="text-slate-500 text-xs mt-1">Consulta, imprime y edita tus secuencias creadas.</p></div>
                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-mex-maroon text-xs font-black uppercase"><span>Abrir Carpeta</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
                </div>
                {/* ... (resto de botones del organizador igual) ... */}
                <div onClick={() => handleFolderClick("hojas")} className="group cursor-pointer bg-white border border-slate-200 hover:border-blue-600 p-5 rounded-xl shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div><h4 className="font-extrabold text-slate-800 text-sm">2. Mis Hojas de Trabajo</h4></div>
                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-blue-600 text-xs font-black uppercase"><span>Abrir Carpeta</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
                </div>
                <div onClick={() => handleFolderClick("instrumentos")} className="group cursor-pointer bg-white border border-slate-200 hover:border-emerald-600 p-5 rounded-xl shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div><h4 className="font-extrabold text-slate-800 text-sm">3. Mis Instrumentos de Eval.</h4></div>
                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-emerald-600 text-xs font-black uppercase"><span>Abrir Carpeta</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
                </div>
                <div onClick={() => handleFolderClick("programas")} className="group cursor-pointer bg-white border border-slate-200 hover:border-amber-600 p-5 rounded-xl shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div><h4 className="font-extrabold text-slate-800 text-sm">4. Mis Programas Analíticos</h4></div>
                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-amber-600 text-xs font-black uppercase"><span>Abrir Carpeta</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
                </div>
                <div onClick={() => handleFolderClick("examenes")} className="group cursor-pointer bg-white border border-slate-200 hover:border-purple-600 p-5 rounded-xl shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div><h4 className="font-extrabold text-slate-800 text-sm">5. Mis Exámenes</h4></div>
                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-purple-600 text-xs font-black uppercase"><span>Abrir Carpeta</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
                </div>
                <div onClick={() => handleFolderClick("grupos")} className="group cursor-pointer bg-white border border-slate-200 hover:border-indigo-600 p-5 rounded-xl shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div><h4 className="font-extrabold text-slate-800 text-sm">6. Mis Grupos</h4></div>
                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-indigo-600 text-xs font-black uppercase"><span>Abrir Carpeta</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
                </div>
                <div onClick={() => handleFolderClick("bitacora")} className="group cursor-pointer bg-white border border-slate-200 hover:border-rose-600 p-5 rounded-xl shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div><h4 className="font-extrabold text-slate-800 text-sm">7. Bitácora de Incidencias</h4></div>
                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-rose-600 text-xs font-black uppercase"><span>Abrir Carpeta</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
                </div>
                <div onClick={() => handleFolderClick("evaluacion")} className="group cursor-pointer bg-white border border-slate-200 hover:border-amber-600 p-5 rounded-xl shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div><h4 className="font-extrabold text-slate-800 text-sm">8. Evaluación Continua</h4></div>
                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-amber-600 text-xs font-black uppercase"><span>Abrir Carpeta</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
                </div>
              </div>
            </div>
          )}

          {selectedCategory === "plano" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-mex-maroon text-white flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-mex-gold" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg uppercase tracking-wider">Plano Didáctico</h3>
                  <p className="text-slate-500 text-xs font-medium">Herramientas de diseño de secuencias y recursos didácticos:</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
                <div onClick={() => handleFunctionClick("diseno")} className="group cursor-pointer bg-white border-2 border-mex-maroon/20 hover:border-mex-maroon rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                    <Coins className="w-3 h-3" /> 10 créditos
                  </div>
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-mex-maroon/10 text-mex-maroon flex items-center justify-center"><FileText className="w-5 h-5" /></div>
                    <h4 className="font-black text-slate-800 text-sm uppercase tracking-wide">Planeación Base NEM</h4>
                    <p className="text-slate-500 text-xs font-semibold">Crea una planeación paso a paso desde el currículo general oficial de la SEP.</p>
                  </div>
                  <div className="pt-5 border-t border-slate-100 mt-5 flex items-center justify-between text-mex-maroon font-extrabold text-xs uppercase">
                    <span>Iniciar</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* BOTÓN NUEVO: PROYECTOS DE AULA */}
                <div onClick={() => handleFunctionClick("proyectos_aula")} className="group cursor-pointer bg-white border-2 border-blue-600/20 hover:border-blue-600 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                    <Coins className="w-3 h-3" /> 10 créditos
                  </div>
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><BookOpen className="w-5 h-5" /></div>
                    <h4 className="font-black text-slate-800 text-sm uppercase tracking-wide">Libros SEP (Proyectos)</h4>
                    <p className="text-slate-500 text-xs font-semibold">Genera planeaciones exactas basándote en los libros de texto gratuitos de la SEP.</p>
                  </div>
                  <div className="pt-5 border-t border-slate-100 mt-5 flex items-center justify-between text-blue-600 font-extrabold text-xs uppercase">
                    <span>Explorar Libros</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div onClick={() => handleFunctionClick("generar_hoja")} className="group cursor-pointer bg-white border border-slate-200 hover:border-indigo-600 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                    <Coins className="w-3 h-3" /> 5 créditos
                  </div>
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center"><ClipboardList className="w-5 h-5" /></div>
                    <h4 className="font-black text-slate-800 text-sm uppercase tracking-wide">Hoja de Trabajo</h4>
                    <p className="text-slate-500 text-xs font-semibold">Genera ejercicios para imprimir basados en cualquier sesión de tus planeaciones.</p>
                  </div>
                  <div className="pt-5 border-t border-slate-100 mt-5 flex items-center justify-between text-indigo-600 font-extrabold text-xs uppercase">
                    <span>Crear Hoja</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div onClick={() => handleFunctionClick("generar_instrumento")} className="group cursor-pointer bg-white border border-slate-200 hover:border-emerald-600 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                    <Coins className="w-3 h-3" /> 5 créditos
                  </div>
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><BookCheck className="w-5 h-5" /></div>
                    <h4 className="font-black text-slate-800 text-sm uppercase tracking-wide">Instrumento Evaluador</h4>
                    <p className="text-slate-500 text-xs font-semibold">Diseña rúbricas o listas de cotejo alineadas a tus planeaciones.</p>
                  </div>
                  <div className="pt-5 border-t border-slate-100 mt-5 flex items-center justify-between text-emerald-600 font-extrabold text-xs uppercase">
                    <span>Crear Instrumento</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ... (El resto de las categorías programa, evaluacion y gestion quedan igual que en tu archivo original) ... */}
          {selectedCategory === "programa" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg uppercase tracking-wider">Programa Analítico</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                <div onClick={() => handleFunctionClick("sugerir")} className="group cursor-pointer bg-white border border-slate-200 hover:border-amber-400 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div className="space-y-3"><h4 className="font-black text-slate-800 text-sm uppercase tracking-wide">Sugerir Contenidos</h4></div>
                </div>
                <div onClick={() => handleFunctionClick("crear")} className="group cursor-pointer bg-white border border-slate-200 hover:border-mex-maroon/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div className="space-y-3"><h4 className="font-black text-slate-800 text-sm uppercase tracking-wide">Crear Contenido y PDA</h4></div>
                </div>
                <div onClick={() => handleFunctionClick("programa")} className="group cursor-pointer bg-white border border-slate-200 hover:border-mex-maroon/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div className="space-y-3"><h4 className="font-black text-slate-800 text-sm uppercase tracking-wide">Programa Analítico</h4></div>
                </div>
              </div>
            </div>
          )}

          {selectedCategory === "evaluacion" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg uppercase tracking-wider">Evaluación</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                <div onClick={() => handleFunctionClick("examen")} className="group cursor-pointer bg-white border-2 border-emerald-300 hover:border-emerald-600 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div className="space-y-3"><h4 className="font-black text-slate-800 text-sm uppercase tracking-wide">Crear Examen</h4></div>
                </div>
                <div onClick={() => handleFunctionClick("evaluacion")} className="group cursor-pointer bg-white border border-emerald-200 hover:border-emerald-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div className="space-y-3"><h4 className="font-black text-slate-800 text-sm uppercase tracking-wide">Formato de Evaluación</h4></div>
                </div>
                <div onClick={() => handleFolderClick("evaluacion")} className="group cursor-pointer bg-white border border-emerald-200 hover:border-emerald-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div className="space-y-3"><h4 className="font-black text-slate-800 text-sm uppercase tracking-wide">Evaluación Continua</h4></div>
                </div>
              </div>
            </div>
          )}

          {selectedCategory === "gestion" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg uppercase tracking-wider">Registro e Incidencias</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div onClick={() => handleFunctionClick("bitacora")} className="group cursor-pointer bg-white border border-rose-200 hover:border-mex-maroon rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div className="space-y-3"><h4 className="font-black text-slate-800 text-sm uppercase tracking-wide">Bitácora de Incidencias</h4></div>
                </div>
                <div onClick={() => handleFolderClick("grupos")} className="group cursor-pointer bg-white border border-slate-200 hover:border-blue-600 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div className="space-y-3"><h4 className="font-black text-slate-800 text-sm uppercase tracking-wide">Mis Grupos y Alumnos</h4></div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}