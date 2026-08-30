import React, { useState } from "react";
import { 
  GraduationCap, ArrowLeft, Sparkles, Plus, Trash2, 
  RefreshCw, FileText, CheckCircle2, 
  BookOpen, AlertCircle, Award, Layers, Minus, ListOrdered, Coins
} from "lucide-react";
import { GeneratedExam, UserSubscription, PaywallReason, CreditActionType } from "../types";
import { CREDIT_COSTS } from "../utils/planManager";
import { saveRecursoGenerado, isSupabaseConfigured } from "../utils/supabaseClient";
import { getOficialContenidos, getOficialPdas } from "../data/nemCurriculumService";
import AccionesDocumento from "./AccionesDocumento";

interface CrearExamenViewProps {
  initialExam?: any;
  onBack?: () => void;
  escuelaName?: string;
  cct?: string;
  docenteName?: string;
  escuelas?: Array<{ escuelaName: string; cct: string }>;
  subscription?: UserSubscription;
  onDeductCredits?: (action: CreditActionType) => boolean;
  onTriggerPaywall?: (reason: PaywallReason) => void;
}

interface ContenidoEvaluadoItem {
  id: string;
  contenido: string;
  pda: string;
}

const NIVELES = ["Secundaria", "Primaria", "Preescolar"];

const GRADOS_POR_NIVEL: Record<string, string[]> = {
  "Secundaria": ["1º de Secundaria", "2º de Secundaria", "3º de Secundaria"],
  "Primaria": [
    "1º de Primaria", 
    "2º de Primaria", 
    "3º de Primaria", 
    "4º de Primaria", 
    "5º de Primaria", 
    "6º de Primaria"
  ],
  "Preescolar": ["1º de Preescolar", "2º de Preescolar", "3º de Preescolar"],
};

const DISCIPLINAS_POR_NIVEL: Record<string, Array<{ id: string; name: string; campo: string }>> = {
  "Secundaria": [
    { id: "Español", name: "Español (Lenguajes)", campo: "Lenguajes" },
    { id: "Matemáticas", name: "Matemáticas", campo: "Saberes y Pensamiento Científico" },
    { id: "Inglés", name: "Inglés (Lengua Extranjera)", campo: "Lenguajes" },
    { id: "Biología", name: "Biología (1º Grado)", campo: "Saberes y Pensamiento Científico" },
    { id: "Física", name: "Física (2º Grado)", campo: "Saberes y Pensamiento Científico" },
    { id: "Química", name: "Química (3º Grado)", campo: "Saberes y Pensamiento Científico" },
    { id: "Geografía", name: "Geografía (1º Grado)", campo: "Ética, Naturaleza y Sociedades" },
    { id: "Historia", name: "Historia", campo: "Ética, Naturaleza y Sociedades" },
    { id: "Formación Cívica y Ética", name: "Formación Cívica y Ética", campo: "Ética, Naturaleza y Sociedades" },
    { id: "Tecnología", name: "Tecnología", campo: "De lo Humano y lo Comunitario" },
    { id: "Artes", name: "Artes (Música, Danza, Teatro, Visuales)", campo: "Lenguajes" },
    { id: "Tutoría y Educación Socioemocional", name: "Tutoría y Socioemocional", campo: "De lo Humano y lo Comunitario" },
    { id: "Educación Física", name: "Educación Física", campo: "De lo Humano y lo Comunitario" },
  ],
  "Primaria": [
    { id: "Lenguajes (Español)", name: "Lenguajes (Español y Comprensión)", campo: "Lenguajes" },
    { id: "Saberes y Pensamiento Científico (Matemáticas)", name: "Matemáticas y Cálculo", campo: "Saberes y Pensamiento Científico" },
    { id: "Ciencias Naturales y Entorno", name: "Ciencias Naturales y Conocimiento del Medio", campo: "Saberes y Pensamiento Científico" },
    { id: "Ética, Naturaleza y Sociedades (Historia y Geografía)", name: "Historia, Geografía y Civismo", campo: "Ética, Naturaleza y Sociedades" },
    { id: "De lo Humano y lo Comunitario", name: "Educación Socioemocional y Vida Saludable", campo: "De lo Humano y lo Comunitario" },
    { id: "Educación Física", name: "Educación Física", campo: "De lo Humano y lo Comunitario" },
  ],
  "Preescolar": [
    { id: "Lenguajes", name: "Lenguajes (Comunicación Oral y Escrita)", campo: "Lenguajes" },
    { id: "Saberes y Pensamiento Científico", name: "Saberes y Pensamiento Científico (Números y Naturaleza)", campo: "Saberes y Pensamiento Científico" },
    { id: "Ética, Naturaleza y Sociedades", name: "Ética, Naturaleza y Sociedades (Cultura y Convivencia)", campo: "Ética, Naturaleza y Sociedades" },
    { id: "De lo Humano y lo Comunitario", name: "De lo Humano y lo Comunitario (Emociones y Motricidad)", campo: "De lo Humano y lo Comunitario" },
  ],
};

function calcularGradoAnterior(nivel: string, grado: string): string {
  if (grado === "1º de Secundaria") return "6º de Primaria";
  if (grado === "2º de Secundaria") return "1º de Secundaria";
  if (grado === "3º de Secundaria") return "2º de Secundaria";
  if (grado === "1º de Primaria") return "3º de Preescolar";
  if (grado === "2º de Primaria") return "1º de Primaria";
  if (grado === "3º de Primaria") return "2º de Primaria";
  if (grado === "4º de Primaria") return "3º de Primaria";
  if (grado === "5º de Primaria") return "4º de Primaria";
  if (grado === "6º de Primaria") return "5º de Primaria";
  if (grado === "1º de Preescolar") return "Desarrollo y Saberes Iniciales del Infante";
  if (grado === "2º de Preescolar") return "1º de Preescolar";
  if (grado === "3º de Preescolar") return "2º de Preescolar";
  return "Grado Inmediato Anterior";
}

export default function CrearExamenView(props: CrearExamenViewProps) {
  const safeOnBack = props.onBack || (() => {});
  const safeDocenteName = props.docenteName || "Docente";

  const escuelasList = (props.escuelas && props.escuelas.length > 0)
    ? props.escuelas
    : [{ escuelaName: props.escuelaName || "Escuela Secundaria", cct: props.cct || "C.C.T." }];

  const [selectedEscuelaIndex, setSelectedEscuelaIndex] = useState<number>(0);
  const activeEscuela = escuelasList[selectedEscuelaIndex] || escuelasList[0];
  const safeEscuelaName = activeEscuela.escuelaName || props.escuelaName || "Escuela Secundaria";
  const safeCct = activeEscuela.cct || props.cct || "C.C.T.";

  // Form State
  const [nivel, setNivel] = useState<string>("Secundaria");
  const [grado, setGrado] = useState<string>("1º de Secundaria");
  const [disciplina, setDisciplina] = useState<string>("Matemáticas");
  const [campoFormativo, setCampoFormativo] = useState<string>("Saberes y Pensamiento Científico");
  const [grupo, setGrupo] = useState<string>("A");
  const [tipoExamen, setTipoExamen] = useState<"diagnostico" | "parcial" | "trimestral">("diagnostico");
  const [periodoTrimestre, setPeriodoTrimestre] = useState<string>("Trimestre 1");
  const [numReactivos, setNumReactivos] = useState<number>(10);
  const [tipoPreguntas, setTipoPreguntas] = useState<"opcion_multiple" | "pregunta_abierta" | "ambas">("opcion_multiple");

  // Dynamic Content list for Parcial and Trimestral
  const [contenidos, setContenidos] = useState<ContenidoEvaluadoItem[]>([
    {
      id: "cont-1",
      contenido: "",
      pda: "",
    },
  ]);

  // Generation & Result State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [exam, setExam] = useState<GeneratedExam | null>(props.initialExam || null);
  React.useEffect(() => {
    if (props.initialExam) {
      setExam(props.initialExam);
      setActiveTab("alumno");
    }
  }, [props.initialExam]);
  const [activeTab, setActiveTab] = useState<"alumno" | "docente" | "especificaciones">("alumno");

  // Handle Nivel Change
  const handleNivelChange = (newNivel: string) => {
    setNivel(newNivel);
    const newGrados = GRADOS_POR_NIVEL[newNivel] || [];
    if (newGrados.length > 0) setGrado(newGrados[0]);
    const newDisciplinas = DISCIPLINAS_POR_NIVEL[newNivel] || [];
    if (newDisciplinas.length > 0) {
      setDisciplina(newDisciplinas[0].id);
      setCampoFormativo(newDisciplinas[0].campo);
    }
  };

  // Handle Disciplina Change
  const handleDisciplinaChange = (discId: string) => {
    setDisciplina(discId);
    const found = (DISCIPLINAS_POR_NIVEL[nivel] || []).find(d => d.id === discId);
    if (found) {
      setCampoFormativo(found.campo);
    }
  };

  // Add Content Row
  const handleAddContenido = () => {
    setContenidos(prev => [
      ...prev,
      {
        id: "cont-" + Date.now(),
        contenido: "",
        pda: "",
      },
    ]);
  };

  // Remove Content Row
  const handleRemoveContenido = (id: string) => {
    if (contenidos.length <= 1) return;
    setContenidos(prev => prev.filter(c => c.id !== id));
  };

  // Update Content Row
  const handleUpdateContenido = (id: string, field: "contenido" | "pda", value: string) => {
    setContenidos(prev => prev.map(c => (c.id === id ? { ...c, [field]: value } : c)));
  };

  // Generate Exam
  const handleGenerateExam = async () => {
    const userCredits = props.subscription?.credits ?? 0;
    const requiredCredits = CREDIT_COSTS["disenar_examenes"];

    if (userCredits < requiredCredits) {
      if (props.onTriggerPaywall) {
        props.onTriggerPaywall({
          type: "credits",
          action: "disenar_examenes",
          required: requiredCredits,
          current: userCredits,
        });
      }
      return;
    }

    if (props.onDeductCredits) {
      const ok = props.onDeductCredits("disenar_examenes");
      if (!ok) return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const gradoAnterior = calcularGradoAnterior(nivel, grado);
      const payload = {
        nivel,
        grado,
        disciplina,
        campoFormativo,
        tipoExamen,
        periodoTrimestre: tipoExamen === "trimestral" ? periodoTrimestre : (tipoExamen === "parcial" ? "Evaluación Parcial" : "Diagnóstico Inicial"),
        contenidosSeleccionados: (tipoExamen !== "diagnostico") ? contenidos.filter(c => c.contenido.trim() || c.pda.trim()) : [],
        gradoAnterior,
        numReactivos,
        tipoPreguntas,
        escuelaName: safeEscuelaName,
        cct: safeCct,
        docenteName: safeDocenteName,
        grupo,
      };

      const response = await fetch("/api/generate-exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Ocurrió un error al generar el examen.");
      }

      const data = await response.json();
      if (data.success && data.exam) {
        setExam(data.exam);
        setActiveTab("alumno");

        if (isSupabaseConfigured) {
          const userProfileStr = localStorage.getItem("nem_secundaria_profile");
          const userProfile = userProfileStr ? JSON.parse(userProfileStr) : null;
          const userId = userProfile?.id;
          if (!userId) return;

          saveRecursoGenerado({
            id: `exam_${Date.now()}`,
            user_id: userId,
            tipo_recurso: "examen",
            contenido_json: data.exam
          }).catch(err => console.warn("Error guardando examen en Supabase:", err));
        }
      } else {
        throw new Error("Respuesta inválida del generador de exámenes.");
      }
    } catch (err: any) {
      console.error("Error creating exam:", err);
      setError(err.message || "Error al conectar con el servidor para generar el examen.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-700 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-700/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Generador de Exámenes
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Crea exámenes diagnósticos, parciales o trimestrales con reactivos estructurados y clave pedagógica.
            </p>
          </div>
        </div>

        <button
          onClick={safeOnBack}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-2 cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Panel
        </button>
      </div>

      {/* Main View: Config Form OR Exam Display */}
      {!exam ? (
        <div className="max-w-3xl mx-auto space-y-6 print:hidden">
          {/* Main Column: Configuration Form */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white text-xs flex items-center justify-center font-black">
                  1
                </span>
                Configuración del Examen y Nivel Educativo
              </h3>
            </div>

            {/* School Switcher: Available ONLY if user has more than 1 registered school */}
            {escuelasList.length > 1 && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 block">
                    Institución Educativa
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    Tienes {escuelasList.length} instituciones registradas en tu perfil
                  </span>
                </div>
                <select
                  value={selectedEscuelaIndex}
                  onChange={e => setSelectedEscuelaIndex(Number(e.target.value))}
                  className="w-full sm:w-auto px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                >
                  {escuelasList.map((esc, idx) => (
                    <option key={idx} value={idx}>
                      {esc.escuelaName} ({esc.cct})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* 1. Nivel Selection */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                Nivel Educativo
              </label>
              <div className="grid grid-cols-3 gap-3">
                {NIVELES.map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => handleNivelChange(n)}
                    className={`py-3 px-4 rounded-xl font-extrabold text-xs transition border text-center cursor-pointer ${
                      nivel === n
                        ? "bg-emerald-700 text-white border-emerald-700 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Grado & Grupo & Disciplina */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  Grado
                </label>
                <select
                  value={grado}
                  onChange={e => setGrado(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  {(GRADOS_POR_NIVEL[nivel] || []).map(g => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  Grupo
                </label>
                <input
                  type="text"
                  value={grupo}
                  onChange={e => setGrupo(e.target.value)}
                  placeholder="Ej. A, B, 1"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  Disciplina / Asignatura
                </label>
                <select
                  value={disciplina}
                  onChange={e => handleDisciplinaChange(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none truncate"
                >
                  {(DISCIPLINAS_POR_NIVEL[nivel] || []).map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3. Tipo de Examen Selection */}
            <div className="border-t border-slate-100 pt-5">
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                Tipo de Examen
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  onClick={() => setTipoExamen("diagnostico")}
                  className={`p-4 rounded-xl border-2 transition cursor-pointer flex flex-col justify-between ${
                    tipoExamen === "diagnostico"
                      ? "border-emerald-600 bg-emerald-50/50 shadow-sm"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-slate-900">Diagnóstico Inicial</span>
                      {tipoExamen === "diagnostico" && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium mt-1">
                      Evalúa automáticamente los contenidos y PDA esenciales del <strong>{calcularGradoAnterior(nivel, grado)}</strong>.
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => setTipoExamen("parcial")}
                  className={`p-4 rounded-xl border-2 transition cursor-pointer flex flex-col justify-between ${
                    tipoExamen === "parcial"
                      ? "border-emerald-600 bg-emerald-50/50 shadow-sm"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-slate-900">Examen Parcial</span>
                      {tipoExamen === "parcial" && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium mt-1">
                      Corte formativo durante el periodo. Permite añadir múltiples contenidos a evaluar.
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => setTipoExamen("trimestral")}
                  className={`p-4 rounded-xl border-2 transition cursor-pointer flex flex-col justify-between ${
                    tipoExamen === "trimestral"
                      ? "border-emerald-600 bg-emerald-50/50 shadow-sm"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-slate-900">Examen Trimestral</span>
                      {tipoExamen === "trimestral" && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium mt-1">
                      Evaluación integradora de cierre de periodo (Trimestre I, II o III).
                    </p>
                  </div>
                </div>
              </div>

              {/* Sub-selector for Trimestre */}
              {tipoExamen === "trimestral" && (
                <div className="mt-3 bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-3">
                  <span className="text-xs font-extrabold text-slate-700 uppercase">Periodo Trimestral:</span>
                  <div className="flex gap-2">
                    {["Trimestre 1", "Trimestre 2", "Trimestre 3"].map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setPeriodoTrimestre(t)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                          periodoTrimestre === t
                            ? "bg-emerald-700 text-white"
                            : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 4. Diagnóstico Info Badge OR Contenidos Selector */}
            {tipoExamen === "diagnostico" ? (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-900 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-black uppercase tracking-wide">
                    Evaluación de Diagnóstico con Alcance Curricular Inmediato
                  </p>
                  <p className="text-amber-800">
                    Al seleccionar <strong>Examen Diagnóstico</strong> para <strong>{grado}</strong> ({disciplina}), 
                    la IA abarcará los contenidos esenciales y aprendizajes previos de <strong>{calcularGradoAnterior(nivel, grado)}</strong>, 
                    permitiendo diagnosticar el punto de partida real del grupo.
                  </p>
                </div>
              </div>
            ) : (
              /* Dynamic Contenidos Section for Parcial and Trimestral */
              <div className="border-t border-slate-100 pt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                      Contenidos Sintéticos y PDA a Evaluar ({contenidos.length})
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Puedes evaluar uno o varios contenidos simultáneamente en este examen.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddContenido}
                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar Contenido
                  </button>
                </div>

                <div className="space-y-3">
                  {(() => {
                    const officialContenidosList = getOficialContenidos(nivel, grado, campoFormativo, disciplina);
                    return contenidos.map((item, index) => {
                      const matchingPdas = getOficialPdas(nivel, grado, campoFormativo, disciplina, item.contenido);
                      return (
                        <div key={item.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 relative group">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                                Contenido #{index + 1}
                              </span>
                              {officialContenidosList.length > 0 && (
                                <span className="text-[10px] text-slate-500 font-semibold">
                                  ({officialContenidosList.length} contenidos oficiales disponibles)
                                </span>
                              )}
                            </div>
                            {contenidos.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveContenido(item.id)}
                                className="text-slate-400 hover:text-rose-600 transition p-1 cursor-pointer"
                                title="Eliminar este contenido"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>

                          <div className="space-y-3">
                            {/* Selector oficial de Contenido */}
                            {officialContenidosList.length > 0 && (
                              <div>
                                <label className="block text-[10px] font-black text-slate-600 uppercase mb-1">
                                  Seleccionar del Catálogo Oficial NEM ({disciplina})
                                </label>
                                <select
                                  value={item.contenido}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    handleUpdateContenido(item.id, "contenido", val);
                                    if (val) {
                                      const pdasForVal = getOficialPdas(nivel, grado, campoFormativo, disciplina, val);
                                      if (pdasForVal.length > 0) {
                                        handleUpdateContenido(item.id, "pda", pdasForVal[0]);
                                      }
                                    }
                                  }}
                                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                >
                                  <option value="">-- Elige un contenido oficial o escribe abajo --</option>
                                  {officialContenidosList.map((c) => (
                                    <option key={c.id} value={c.contenido}>
                                      {c.contenido}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}

                            <div>
                              <label className="block text-[10px] font-black text-slate-600 uppercase mb-1">
                                Contenido Sintético / Tema (Texto)
                              </label>
                              <input
                                type="text"
                                value={item.contenido}
                                onChange={e => handleUpdateContenido(item.id, "contenido", e.target.value)}
                                placeholder="Ej. Expresión de fracciones como decimales y viceversa..."
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                              />
                            </div>

                            {/* Sugerencias de PDA si existen en catálogo */}
                            {matchingPdas.length > 1 && (
                              <div>
                                <label className="block text-[10px] font-black text-slate-600 uppercase mb-1">
                                  PDAs Oficiales Vinculados ({matchingPdas.length} disponibles)
                                </label>
                                <div className="space-y-1.5">
                                  {matchingPdas.map((pdaOpt, pdaIdx) => (
                                    <button
                                      key={pdaIdx}
                                      type="button"
                                      onClick={() => handleUpdateContenido(item.id, "pda", pdaOpt)}
                                      className={`w-full text-left p-2 rounded-lg text-[11px] border transition ${
                                        item.pda === pdaOpt
                                          ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold"
                                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 font-normal"
                                      }`}
                                    >
                                      <span className="font-bold text-emerald-800 mr-1.5">#{pdaIdx + 1}</span>
                                      {pdaOpt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div>
                              <label className="block text-[10px] font-black text-slate-600 uppercase mb-1">
                                Proceso de Desarrollo de Aprendizaje (PDA)
                              </label>
                              <textarea
                                rows={2}
                                value={item.pda}
                                onChange={e => handleUpdateContenido(item.id, "pda", e.target.value)}
                                placeholder="Ej. Usa diversas estrategias al convertir números fraccionarios a decimales y viceversa..."
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            )}

            {/* 5. Reactivos & Question Type Settings */}
            <div className="border-t border-slate-100 pt-5 space-y-4">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-emerald-600" />
                Estructura y Tipología de Reactivos
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                {/* Number of questions with +/- buttons */}
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                    Número de Reactivos
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setNumReactivos(prev => Math.max(5, prev - 5))}
                      disabled={numReactivos <= 5}
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-black text-lg flex items-center justify-center transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      title="Disminuir 5 reactivos"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={60}
                      step={5}
                      value={numReactivos}
                      onChange={e => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) setNumReactivos(Math.max(1, val));
                      }}
                      className="w-20 text-center py-2 bg-slate-50 border border-slate-200 rounded-xl font-black text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setNumReactivos(prev => prev + 5)}
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-black text-lg flex items-center justify-center transition cursor-pointer"
                      title="Aumentar 5 reactivos"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-slate-500 font-bold ml-1">
                      reactivos
                    </span>
                  </div>
                </div>

                {/* Question Type */}
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                    Formato de Preguntas
                  </label>
                  <div className="w-full px-3 py-2.5 bg-slate-100 border border-slate-200 rounded-xl font-bold text-xs text-slate-500 cursor-not-allowed flex items-center justify-between">
                    <span>Opción Múltiple (A, B, C, D)</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-rose-800 text-xs flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-black uppercase">Error al generar examen</p>
                  <p className="mt-0.5">{error}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="button"
                disabled={isLoading}
                onClick={handleGenerateExam}
                className="w-full py-4 bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 hover:from-emerald-800 hover:to-teal-900 text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-md shadow-emerald-800/20 hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Generando Examen...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-emerald-300" />
                    <span>Generar Examen</span>
                    <span className="text-[11px] font-bold bg-white/20 px-2 py-0.5 rounded-full text-emerald-100 flex items-center gap-1">
                      <Coins className="w-3 h-3 text-emerald-300" />
                      10 créditos
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Result View: Exam Presentation */
        <div className="space-y-6">
          {/* Action Toolbar with Standardized AccionesDocumento */}
          <AccionesDocumento
            targetId="documento-resultado"
            tipoRecurso="Examen"
            customSuffix={`${exam.disciplina}_${exam.grado}_${activeTab}`}
            variant="emerald"
            title={
              <span className="flex items-center gap-1.5 font-black text-slate-800">
                <span>{exam.titulo}</span>
                <span className="text-emerald-700 font-extrabold">({exam.grado})</span>
              </span>
            }
            extraActions={
              <button
                type="button"
                onClick={() => setExam(null)}
                className="px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-slate-700 hover:text-emerald-800 hover:bg-slate-100 transition flex items-center gap-1.5 cursor-pointer mr-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Nuevo Examen</span>
              </button>
            }
          >
            {/* View Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveTab("alumno")}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "alumno"
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Examen Alumno</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("docente")}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "docente"
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Clave Docente</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("especificaciones")}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "especificaciones"
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Tabla Especificaciones</span>
              </button>
            </div>
          </AccionesDocumento>

          {/* ESTILOS DE IMPRESIÓN PROFESIONALES (SIN PARCHES) */}
          <style>{`
            @media print {
              @page {
                size: letter;
                margin: 1.5cm 2cm; /* Márgenes correctos para que el documento no choque con los bordes */
              }
              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              /* Evita que los reactivos se partan a la mitad en el cambio de página */
              .break-inside-avoid {
                page-break-inside: avoid;
                break-inside: avoid;
              }
            }
          `}</style>

          {/* Printable Document Canvas */}
          <div
            id="documento-resultado"
            className="bg-white border border-slate-300 rounded-2xl p-6 sm:p-10 shadow-md max-w-4xl mx-auto print:border-none print:shadow-none print:p-0 print:m-0 printable-document"
          >
            {/* Header Box */}
            <div className="border-2 border-slate-800 rounded-xl p-5 mb-6 text-slate-900">
              <div className="text-center space-y-1">
                <h2 className="text-base sm:text-lg font-black uppercase tracking-tight">
                  {exam.escuelaName}
                </h2>
                <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  C.C.T. {exam.cct} • {exam.nivel}
                </div>
                <div className="text-sm font-black text-emerald-800 uppercase tracking-tight pt-1">
                  {exam.titulo} {exam.periodoTrimestre ? `• ${exam.periodoTrimestre}` : ""}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4 pt-3 border-t border-slate-300 text-xs">
                <div>
                  <span className="font-black text-slate-700">Docente:</span> {exam.docenteName}
                </div>
                <div>
                  <span className="font-black text-slate-700">Grado y Grupo:</span> {exam.grado} "{exam.grupo}"
                </div>
                <div>
                  <span className="font-black text-slate-700">Asignatura:</span> {exam.disciplina}
                </div>
                <div>
                  <span className="font-black text-slate-700">Fecha:</span> ______________________
                </div>
                <div className="sm:col-span-2 pt-1 border-t border-dotted border-slate-300 flex items-center justify-between">
                  <div className="w-full">
                    <span className="font-black text-slate-700">Nombre del Alumno(a):</span> __________________________________________________
                  </div>
                  <div className="shrink-0 font-black text-slate-800">
                    Aciertos: ___ / {exam.reactivos.length}
                  </div>
                </div>
              </div>
            </div>

            {/* TAB 1: ALUMNO EXAM */}
            {activeTab === "alumno" && (
              <div className="space-y-6">
                {exam.reactivos.map((reactivo: any, idx: number) => (
                  <div key={idx} className="space-y-3 pb-5 border-b border-slate-200 last:border-b-0 break-inside-avoid">
                    <div className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {reactivo.numero}
                      </span>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                          {reactivo.planteamiento}
                        </p>
                      </div>
                    </div>

                    {/* Multiple Choice Options - AHORA GARANTIZADAS */}
                    {reactivo.opciones && reactivo.opciones.length > 0 && (
                      <div className="ml-8 grid grid-cols-1 gap-2 mt-3">
                        {reactivo.opciones.map((opt: any) => (
                          <div key={opt.inciso} className="flex items-center gap-2.5 text-xs text-slate-800">
                            <span className="w-5 h-5 rounded-full border-2 border-slate-600 font-black text-[11px] flex items-center justify-center shrink-0">
                              {opt.inciso}
                            </span>
                            <span className="font-medium">{opt.texto}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* TAB 2: DOCENTE ANSWER KEY (SIMPLIFICADA) */}
            {activeTab === "docente" && (
              <div className="space-y-5">
                {exam.reactivos.map((reactivo: any, idx: number) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 break-inside-avoid">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-black text-xs flex items-center justify-center">
                          {reactivo.numero}
                        </span>
                        <span className="font-black text-xs text-slate-800 uppercase">
                          Reactivo #{reactivo.numero}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs font-bold text-slate-800">
                      {reactivo.planteamiento}
                    </p>

                    <div className="bg-white border border-emerald-200 rounded-lg p-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-emerald-800 uppercase text-[11px]">
                          Respuesta Correcta:
                        </span>
                        <span className="font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          {reactivo.respuestaCorrecta}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: TABLA DE ESPECIFICACIONES */}
            {activeTab === "especificaciones" && (
              <div className="space-y-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-1">
                  <h4 className="font-black text-slate-900 uppercase">
                    Tabla de Especificaciones y Mapeo Curricular (NEM)
                  </h4>
                  <p className="text-slate-600">
                    Alineación de cada reactivo con el nivel de profundidad cognitiva, contenido curricular y ponderación.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-black">
                        <th className="p-2.5">#</th>
                        <th className="p-2.5">Contenido Sintético</th>
                        <th className="p-2.5">PDA Evaluado</th>
                        <th className="p-2.5">Nivel Cognitivo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {(exam.tablaEspecificaciones || exam.reactivos.map((r: any) => ({
                        numero: r.numero,
                        contenido: r.contenidoEvaluado,
                        pda: r.pdaEvaluado || "Proceso de desarrollo curricular",
                        nivelCognitivo: "Comprensión / Aplicación"
                      }))).map((spec: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-2.5 font-bold">{spec.numero}</td>
                          <td className="p-2.5 font-medium max-w-xs">{spec.contenido}</td>
                          <td className="p-2.5 text-slate-600 max-w-xs">{spec.pda}</td>
                          <td className="p-2.5 font-semibold text-emerald-700">{spec.nivelCognitivo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}