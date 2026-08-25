import React from "react";
import { CompletePlan, GeneratedInstrument, GeneratedWorksheet, UserSubscription, PaywallReason, CreditActionType } from "../types";
import { ArrowLeft, Send, Sparkles, Bot, User, Loader2, AlertCircle, Plus, FileText, Coins } from "lucide-react";
import InstrumentoEvaluacionModal from "./InstrumentoEvaluacionModal";
import HojaDeTrabajoModal from "./HojaDeTrabajoModal";
import AccionesDocumento from "./AccionesDocumento";
import { CREDIT_COSTS } from "../utils/planManager";
import { saveRecursoGenerado, savePlaneacion, isSupabaseConfigured } from "../utils/supabaseClient";

interface PlaneacionPreviewProps {
  planData: CompletePlan;
  onBack: () => void;
  onUpdatePlan?: (updatedPlan: CompletePlan) => void;
  subscription?: UserSubscription;
  onDeductCredits?: (action: CreditActionType) => boolean;
  onTriggerPaywall?: (reason: PaywallReason) => void;
}

export default function PlaneacionPreview({ 
  planData, 
  onBack, 
  onUpdatePlan,
  subscription,
  onDeductCredits,
  onTriggerPaywall,
}: PlaneacionPreviewProps) {
  const [printBlocked, setPrintBlocked] = React.useState(false);
  const [chatMessage, setChatMessage] = React.useState("");
  const [chatHistory, setChatHistory] = React.useState<Array<{ sender: "user" | "assistant"; text: string }>>([
    {
      sender: "assistant",
      text: "¡Hola! Soy tu asistente de Gemini. ¿Deseas hacer algún cambio o ajuste en esta planeación? Solo escríbelo aquí y yo me encargaré de reescribir la planeación manteniendo toda la rigurosidad pedagógica de la NEM. (Ej. 'Agrega más actividades dinámicas en la sesión 1', 'Incluye materiales reciclados en los recursos', etc.)"
    }
  ]);
  const [isModifying, setIsModifying] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  // Instrument Generation State
  const [isInstrumentModalOpen, setIsInstrumentModalOpen] = React.useState(false);
  const [selectedInstrumentName, setSelectedInstrumentName] = React.useState("");
  const [instrumentData, setInstrumentData] = React.useState<GeneratedInstrument | null>(null);
  const [isGeneratingInstrument, setIsGeneratingInstrument] = React.useState(false);
  const [instrumentError, setInstrumentError] = React.useState<string | null>(null);
  const [customInstrumentName, setCustomInstrumentName] = React.useState("");
  const [showCustomInput, setShowCustomInput] = React.useState(false);

  // Worksheet Generation State
  const [isWorksheetModalOpen, setIsWorksheetModalOpen] = React.useState(false);
  const [worksheetData, setWorksheetData] = React.useState<GeneratedWorksheet | null>(null);
  const [isGeneratingWorksheet, setIsGeneratingWorksheet] = React.useState(false);
  const [worksheetError, setWorksheetError] = React.useState<string | null>(null);
  const [activeWorksheetSessionMeta, setActiveWorksheetSessionMeta] = React.useState<{
    faseNombre: string;
    sesionNumero: number;
    sesionTitulo: string;
    sesionObj?: any;
  }>({
    faseNombre: "",
    sesionNumero: 1,
    sesionTitulo: "",
  });

  React.useEffect(() => {
    if (isSupabaseConfigured && planData) {
      const userProfileStr = localStorage.getItem("nem_secundaria_profile");
      const userEmail = userProfileStr ? JSON.parse(userProfileStr)?.email : null;
      const userId = userEmail ? `user_${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}` : 'anonymous_user';

      const payloadDB = {
        id: planData.id || crypto.randomUUID(),
        user_id: userId,
        titulo: String(planData.situacionProblema || planData.contenido || "Planeación NEM").substring(0, 250),
        campo_formativo: String(planData.campoFormativo || "Lenguajes"),
        pda: String(planData.pda || ""),
        contenido_json: planData
      };

      savePlaneacion(payloadDB as any)
        .then(() => console.log("Planeación guardada con éxito en Supabase"))
        .catch(err => console.error("Error al autoguardar la planeación en BD:", err));
    }
  }, [planData]);

  const {
    nivel, docenteName, escuelaName, cct, grupo, grado, campoFormativo, disciplina, contenido, pda, ejesArticuladores, metodologia, situacionProblema, bapSelected = [], plan, createdAt, duracionSemanas, duracionSesion,
  } = planData;

  const handleGenerateInstrument = async (insName: string) => {
    if (!insName.trim()) return;

    const userCredits = subscription?.credits ?? 0;
    const requiredCredits = CREDIT_COSTS["instrumento_evaluacion"]; 

    if (userCredits < requiredCredits) {
      if (onTriggerPaywall) {
        onTriggerPaywall({ type: "credits", action: "instrumento_evaluacion", required: requiredCredits, current: userCredits });
      }
      return;
    }
    if (onDeductCredits) {
      const ok = onDeductCredits("instrumento_evaluacion");
      if (!ok) return;
    }

    setSelectedInstrumentName(insName);
    setIsInstrumentModalOpen(true);
    setIsGeneratingInstrument(true);
    setInstrumentError(null);
    setInstrumentData(null);

    try {
      const response = await fetch("/api/generate-instrument", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instrumentName: insName, escuelaName, cct, docenteName, grado, grupo, campoFormativo, disciplina, contenido, pda, producto: plan.producto, situacionProblema, proposito: plan.proposito, nivel }),
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error || "Error al diseñar el instrumento de evaluación.");
      }

      const data = await response.json();
      if (data.success && data.instrument) {
        setInstrumentData(data.instrument);

        if (isSupabaseConfigured) {
          const userProfileStr = localStorage.getItem("nem_secundaria_profile");
          const userEmail = userProfileStr ? JSON.parse(userProfileStr)?.email : null;
          const userId = userEmail ? `user_${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}` : 'anonymous_user';

          saveRecursoGenerado({
            id: `ins_${Date.now()}`, user_id: userId, tipo_recurso: "instrumento_evaluacion", contenido_json: data.instrument
          }).catch(err => console.warn("Error guardando instrumento en Supabase:", err));
        }
      } else {
        throw new Error("No se recibieron datos del instrumento.");
      }
    } catch (err: any) {
      setInstrumentError(err.message || "Ocurrió un error inesperado al conectar con Gemini.");
    } finally {
      setIsGeneratingInstrument(false);
    }
  };

  const handleGenerateWorksheet = async (faseNombre: string, sesion: any) => {
    const userCredits = subscription?.credits ?? 0;
    const requiredCredits = CREDIT_COSTS["hoja_trabajo"]; 

    if (userCredits < requiredCredits) {
      if (onTriggerPaywall) {
        onTriggerPaywall({ type: "credits", action: "hoja_trabajo", required: requiredCredits, current: userCredits });
      }
      return;
    }
    if (onDeductCredits) {
      const ok = onDeductCredits("hoja_trabajo");
      if (!ok) return;
    }

    setActiveWorksheetSessionMeta({ faseNombre, sesionNumero: sesion.numero, sesionTitulo: sesion.titulo, sesionObj: sesion });
    setIsWorksheetModalOpen(true);
    setIsGeneratingWorksheet(true);
    setWorksheetError(null);
    setWorksheetData(null);

    try {
      const response = await fetch("/api/generate-worksheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sesionNumero: sesion.numero, sesionTitulo: sesion.titulo, sesionInicio: sesion.inicio, sesionDesarrollo: sesion.desarrollo, sesionCierre: sesion.cierre, sesionMateriales: sesion.materiales, faseNombre, escuelaName, cct, docenteName, grado, grupo, campoFormativo, disciplina, contenido, pda, nivel }),
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error || "Error al generar la hoja de trabajo.");
      }

      const data = await response.json();
      if (data.success && data.worksheet) {
        setWorksheetData(data.worksheet);

        if (isSupabaseConfigured) {
          const userProfileStr = localStorage.getItem("nem_secundaria_profile");
          const userEmail = userProfileStr ? JSON.parse(userProfileStr)?.email : null;
          const userId = userEmail ? `user_${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}` : 'anonymous_user';

          saveRecursoGenerado({
            id: `ws_${Date.now()}`, user_id: userId, tipo_recurso: "hoja_de_trabajo", contenido_json: data.worksheet
          }).catch(err => console.warn("Error guardando hoja de trabajo en Supabase:", err));
        }
      } else {
        throw new Error("No se recibieron datos de la hoja de trabajo.");
      }
    } catch (err: any) {
      setWorksheetError(err.message || "Ocurrió un error inesperado al conectar con Gemini.");
    } finally {
      setIsGeneratingWorksheet(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || isModifying) return;

    const userCredits = subscription?.credits ?? 0;
    const requiredCredits = CREDIT_COSTS["modificar_planeacion"]; 

    if (userCredits < requiredCredits) {
      if (onTriggerPaywall) {
        onTriggerPaywall({ type: "credits", action: "modificar_planeacion", required: requiredCredits, current: userCredits });
      }
      return;
    }
    if (onDeductCredits) {
      const ok = onDeductCredits("modificar_planeacion");
      if (!ok) return;
    }

    const userText = chatMessage.trim();
    setChatMessage("");
    setChatHistory(prev => [...prev, { sender: "user", text: userText }]);
    setIsModifying(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/modify-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, instruction: userText, nivel, campoFormativo, disciplina, grado, contenido, pda, ejesArticuladores, metodologia, situacionProblema, docenteName, escuelaName, cct, grupo, duracionSemanas, duracionSesion }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Ocurrió un error al modificar la planeación.");
      }

      const data = await response.json();
      if (data.success && data.plan) {
        const updatedPlan: CompletePlan = { ...planData, plan: data.plan };
        if (onUpdatePlan) onUpdatePlan(updatedPlan);

        setChatHistory(prev => [...prev, { sender: "assistant", text: `¡Listo! He modificado la planeación con éxito según tu solicitud: "${userText}". Los cambios ya se reflejan en el visor.` }]);
      } else {
        throw new Error("No se pudo obtener el plan modificado.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error al comunicar con Gemini.");
      setChatHistory(prev => [...prev, { sender: "assistant", text: `Lo siento, ocurrió un error: ${err.message}.` }]);
    } finally {
      setIsModifying(false);
    }
  };

  // =========================================================================
  // ARQUITECTURA DE VISTAS INDEPENDIENTES:
  // Si abres el Instrumento o la Hoja, React destruye por completo el DOM de la
  // Planeación y lo reemplaza, garantizando que NO haya conflictos al imprimir.
  // =========================================================================

  if (isInstrumentModalOpen) {
    return (
      <InstrumentoEvaluacionModal
        isOpen={true}
        onClose={() => setIsInstrumentModalOpen(false)}
        instrumentName={selectedInstrumentName}
        instrumentData={instrumentData}
        isLoading={isGeneratingInstrument}
        error={instrumentError}
        planData={planData}
        onRegenerate={() => handleGenerateInstrument(selectedInstrumentName)}
      />
    );
  }

  if (isWorksheetModalOpen) {
    return (
      <HojaDeTrabajoModal
        isOpen={true}
        onClose={() => setIsWorksheetModalOpen(false)}
        worksheet={worksheetData}
        isLoading={isGeneratingWorksheet}
        error={worksheetError}
        onRetry={() => activeWorksheetSessionMeta.sesionObj && handleGenerateWorksheet(activeWorksheetSessionMeta.faseNombre, activeWorksheetSessionMeta.sesionObj)}
        meta={{ escuelaName, cct, docenteName, grado, grupo, campoFormativo, disciplina, pda, sesionNumero: activeWorksheetSessionMeta.sesionNumero, sesionTitulo: activeWorksheetSessionMeta.sesionTitulo }}
      />
    );
  }

  // =========================================================================
  // RENDERIZADO DE LA PLANEACIÓN PRINCIPAL
  // =========================================================================
  return (
    <div className="space-y-6">
      <AccionesDocumento
        targetId="documento-resultado"
        tipoRecurso="Planeacion"
        customSuffix={`${disciplina}_${grado}`}
        title={
          <span className="flex items-center gap-1.5 font-black text-slate-800">
            <span>Planeación NEM:</span>
            <span className="text-mex-maroon font-extrabold">{disciplina} ({grado})</span>
          </span>
        }
        extraActions={
          <button
            onClick={onBack}
            className="px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-slate-700 hover:text-mex-maroon hover:bg-slate-100 transition flex items-center gap-1.5 cursor-pointer mr-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Formulador</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mt-6">
        <div id="documento-resultado" className="lg:col-span-2 bg-white p-8 sm:p-12 rounded-2xl border-2 border-slate-900 shadow-[6px_6px_0px_0px_rgba(106,27,49,0.15)] font-sans text-slate-900 print:border-none print:p-0 print:shadow-none print:rounded-none printable-document">
          {/* Encabezado */}
          <div className="text-center border-b-2 border-slate-900 pb-4 mb-6">
            <h1 className="font-black text-lg tracking-wider text-slate-950 uppercase mb-1">Planeación Didáctica</h1>
            <h2 className="text-sm font-extrabold text-mex-maroon uppercase mb-0.5">{escuelaName}</h2>
            <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">C.C.T. {cct}</span>
          </div>

          <div className="border-2 border-slate-900 text-xs mb-6 overflow-hidden rounded">
            <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-slate-900">
              <div className="p-3 border-r-2 border-slate-900 bg-slate-50/50">
                <span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5">DOCENTE:</span>
                <span className="font-black text-slate-950 text-xs uppercase">{docenteName}</span>
              </div>
              <div className="p-3 bg-slate-50/50 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5">FECHA / DURACIÓN ESTIMADA:</span>
                  <span className="font-bold text-slate-950 text-xs">{planData.duracionSemanas || "2 semanas"}</span>
                </div>
                {planData.duracionSesion && (
                  <div className="text-right border-l pl-4 border-slate-300">
                    <span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5">SESIÓN DE CLASE:</span>
                    <span className="font-bold text-slate-950 text-xs">{planData.duracionSesion}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-b-2 border-slate-900">
              <div className="p-3 border-r-2 border-slate-900 bg-slate-50/50"><span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5">CAMPO FORMATIVO:</span><span className="font-bold text-slate-950">{campoFormativo}</span></div>
              <div className="p-3 border-r-2 border-slate-900 bg-slate-50/50"><span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5">DISCIPLINA:</span><span className="font-bold text-slate-950">{disciplina}</span></div>
              <div className="p-3 bg-slate-50/50"><span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5">GRADO Y GRUPO:</span><span className="font-bold text-slate-950">{grado} - Grupo "{grupo}"</span></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-slate-900">
              <div className="p-3 border-r-2 border-slate-900"><span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5">PRODUCTO FINAL SUGERIDO:</span><span className="font-bold text-slate-950 text-mex-maroon">{plan.producto}</span></div>
              <div className="p-3"><span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5">{(nivel || '').toLowerCase() === 'preescolar' ? 'MODALIDAD DE TRABAJO:' : 'METODOLOGÍA NEM:'}</span><span className="font-bold text-slate-950">{metodologia}</span></div>
            </div>

            <div className="p-3 border-b-2 border-slate-900 bg-slate-50/30">
              <span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5">SITUACIÓN-PROBLEMA DEL CONTEXTO:</span>
              <span className="text-slate-950 italic mt-0.5 block leading-relaxed">"{situacionProblema}"</span>
            </div>

            <div className="p-3 border-b-2 border-slate-900">
              <span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5">PROPÓSITO DEL PROYECTO:</span>
              <span className="text-slate-950 mt-0.5 block leading-relaxed font-medium">{plan.proposito}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-slate-900">
              <div className="p-3 border-r-2 border-slate-900"><span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5">CONTENIDO SINTÉTICO:</span><span className="font-bold text-slate-950 mt-0.5 block leading-normal">{contenido}</span></div>
              <div className="p-3"><span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5">PROCESO DE DESARROLLO DE APRENDIZAJE (PDA):</span><span className="font-bold text-slate-950 mt-0.5 block leading-normal">{pda}</span></div>
            </div>

            <div className="p-3 bg-slate-50/50">
              <span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-1.5">EJES ARTICULADORES TRANSVERSALES:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {ejesArticuladores.map((eje, i) => <span key={i} className="bg-mex-maroon/5 text-mex-maroon text-[9px] font-black px-2 py-0.5 rounded border border-mex-maroon/15 uppercase tracking-wide">{eje}</span>)}
              </div>
            </div>

            {bapSelected && bapSelected.length > 0 && (
              <div className="p-3 bg-slate-50/50 border-t-2 border-slate-900">
                <span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-1.5">BAP / APTITUDES SOBRESALIENTES EN EL GRUPO:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {bapSelected.map((bap, i) => <span key={i} className="bg-[#991b1b]/5 text-[#991b1b] text-[9px] font-black px-2 py-0.5 rounded border border-[#991b1b]/15 uppercase tracking-wide">{bap}</span>)}
                </div>
              </div>
            )}
          </div>

          {/* SECUENCIA DIDÁCTICA */}
          <div className="space-y-6 mt-8">
            <h3 className="text-xs font-black uppercase text-slate-950 tracking-widest border-b-2 border-slate-950 pb-1 flex items-center gap-2"><span>II. Secuencia de Aprendizaje</span></h3>
            {plan.fases.map((fase, fIndex) => (
              <div key={fIndex} className="border-2 border-slate-900 rounded overflow-hidden shadow-[4px_4px_0px_0px_rgba(106,27,49,0.15)] page-break-inside-avoid">
                <div className="bg-mex-maroon text-white p-3 font-bold text-xs uppercase tracking-wider flex items-center justify-between border-b-2 border-slate-900">
                  <span>{fase.nombre}</span>
                  <span className="text-[9px] bg-mex-gold text-slate-950 font-black px-2 py-0.5 rounded tracking-wider">{nivel?.toLowerCase() === 'preescolar' ? 'Estructura Didáctica' : 'Fase Metodológica'}</span>
                </div>
                <div className="divide-y-2 divide-slate-900">
                  {fase.sesiones.map((sesion, sIndex) => (
                    <div key={sIndex} className="p-4 sm:p-5 bg-white text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2 mb-3">
                        <span className="font-black text-xs text-slate-900 uppercase tracking-wide">Sesión {sesion.numero}: {sesion.titulo}</span>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-mex-maroon bg-mex-maroon/5 px-2.5 py-0.5 rounded border border-mex-maroon/15 text-[10px]">Duración: {sesion.duracion}</span>
                          <button type="button" onClick={() => handleGenerateWorksheet(fase.nombre, sesion)} className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition shadow-2xs cursor-pointer print:hidden">
                            <FileText className="w-3.5 h-3.5 text-blue-200" /><span>Crear hoja de trabajo</span>
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="border border-slate-300 rounded p-3 bg-slate-50/50"><span className="font-black text-[9px] text-mex-maroon tracking-wider uppercase block border-b border-mex-maroon/10 pb-1 mb-1.5">Actividades de Inicio</span><p className="text-slate-800 leading-relaxed font-normal whitespace-pre-line">{sesion.inicio}</p></div>
                        <div className="border border-slate-300 rounded p-3 bg-white"><span className="font-black text-[9px] text-emerald-800 tracking-wider uppercase block border-b border-emerald-100 pb-1 mb-1.5">Actividades de Desarrollo</span><p className="text-slate-800 leading-relaxed font-normal whitespace-pre-line">{sesion.desarrollo}</p></div>
                        <div className="border border-slate-300 rounded p-3 bg-slate-50/50"><span className="font-black text-[9px] text-[#b45309] tracking-wider uppercase block border-b border-amber-100/50 pb-1 mb-1.5">Actividades de Cierre</span><p className="text-slate-800 leading-relaxed font-normal whitespace-pre-line">{sesion.cierre}</p></div>
                      </div>
                      <div className="bg-slate-50 rounded p-2.5 border border-slate-200">
                        <span className="font-bold text-slate-700 text-[9px] block uppercase tracking-wider">RECURSOS Y MATERIALES REQUERIDOS:</span>
                        <div className="flex flex-wrap gap-1 mt-1.5">{sesion.materiales.map((mat, i) => <span key={i} className="bg-white border border-slate-300 text-slate-800 text-[9px] font-semibold px-2 py-0.5 rounded">{mat}</span>)}</div>
                      </div>
                      {sesion.evaluacionSesion && (
                        <div className="mt-2.5 bg-[#fffaf5] rounded p-2.5 border border-[#fed7aa]/40">
                          <span className="font-black text-amber-900 text-[9px] block uppercase tracking-wider">EVALUACIÓN FORMATIVA INTEGRADA EN ESTA SESIÓN:</span>
                          <p className="text-slate-800 font-medium text-xs mt-1 italic leading-relaxed whitespace-pre-line">{sesion.evaluacionSesion}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* EVALUACIÓN FORMATIVA */}
          <div className="space-y-4 mt-8 page-break-inside-avoid">
            <h3 className="text-xs font-black uppercase text-slate-950 tracking-widest border-b-2 border-slate-950 pb-1 flex items-center gap-2"><span>III. Estrategia de Evaluación Formativa</span></h3>
            <div className="border-2 border-slate-900 rounded p-5 bg-slate-50/20 text-xs shadow-[4px_4px_0px_0px_rgba(106,27,49,0.15)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="font-bold text-slate-700 text-[9px] tracking-wider uppercase block mb-1">Técnicas Sugeridas:</span>
                  <div className="flex flex-wrap gap-1">{plan.evaluacionFormativa.tecnicas.map((tec, i) => <span key={i} className="bg-white border border-slate-300 text-slate-800 px-2 py-0.5 rounded font-bold">{tec}</span>)}</div>
                </div>
                <div>
                  <span className="font-bold text-slate-700 text-[9px] tracking-wider uppercase block mb-1">Instrumentos Recomendados:</span>
                  <div className="flex flex-wrap gap-2 items-center">
                    {plan.evaluacionFormativa.instrumentos.map((ins, i) => (
                      <div key={i} className="bg-white border border-slate-300 text-slate-900 px-2.5 py-1 rounded-lg font-bold text-xs flex items-center gap-2 shadow-2xs">
                        <span>{ins}</span>
                        <button type="button" onClick={() => handleGenerateInstrument(ins)} className="px-2 py-0.5 bg-mex-maroon hover:bg-mex-maroon/90 text-white rounded font-black text-[10px] tracking-wider uppercase flex items-center gap-1 transition shadow-2xs print:hidden"><Sparkles className="w-3 h-3 text-mex-gold" /><span>Crear</span></button>
                      </div>
                    ))}
                    {!showCustomInput ? (
                      <button type="button" onClick={() => setShowCustomInput(true)} className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-lg text-xs font-bold flex items-center gap-1 transition print:hidden"><Plus className="w-3.5 h-3.5 text-mex-maroon" /><span>Crear otro...</span></button>
                    ) : (
                      <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-mex-maroon shadow-sm print:hidden">
                        <input type="text" placeholder="Ej. Guía" value={customInstrumentName} onChange={(e) => setCustomInstrumentName(e.target.value)} className="px-2 py-0.5 text-xs border border-slate-200 rounded text-slate-900 font-medium focus:outline-none w-36" />
                        <button type="button" onClick={() => { if (customInstrumentName.trim()) { handleGenerateInstrument(customInstrumentName.trim()); setCustomInstrumentName(""); setShowCustomInput(false); } }} disabled={!customInstrumentName.trim()} className="px-2.5 py-1 bg-mex-maroon text-white rounded font-black text-[10px] uppercase flex items-center gap-1"><Sparkles className="w-3 h-3 text-mex-gold" /><span>Generar</span></button>
                        <button type="button" onClick={() => setShowCustomInput(false)} className="text-slate-400 hover:text-slate-600 text-xs px-1 font-bold">✕</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <span className="font-bold text-slate-700 text-[9px] tracking-wider uppercase block mb-1">Descripción:</span>
                <p className="text-slate-800 leading-relaxed font-normal bg-white p-3 rounded border border-slate-200">{plan.evaluacionFormativa.descripcion}</p>
              </div>
            </div>
          </div>

          {/* DUA */}
          <div className="space-y-4 mt-8 page-break-inside-avoid">
            <h3 className="text-xs font-black uppercase text-slate-950 tracking-widest border-b-2 border-slate-950 pb-1 flex items-center gap-2"><span>IV. Ajustes Razonables / DUA</span></h3>
            <div className="border-2 border-slate-900 rounded p-5 bg-slate-50/20 text-xs leading-relaxed text-slate-800 font-normal shadow-[4px_4px_0px_0px_rgba(106,27,49,0.15)]">
              <p className="whitespace-pre-line">{plan.sugerenciasAdecuacion}</p>
            </div>
          </div>

          {/* FIRMAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 pt-8 border-t-2 border-slate-900 text-xs text-center page-break-inside-avoid">
            <div className="flex flex-col items-center"><div className="w-48 border-b-2 border-slate-900 mb-2 mt-8" /><span className="font-black text-slate-900 uppercase block">{docenteName}</span><span className="text-slate-500 font-bold block text-[9px] uppercase">Profesor(a) Titular</span></div>
            <div className="flex flex-col items-center"><div className="w-48 border-b-2 border-slate-900 mb-2 mt-8" /><span className="font-black text-slate-900 uppercase block">{((nivel || "").toLowerCase() === "preescolar" || (nivel || "").toLowerCase() === "primaria") ? "Dirección de la Escuela" : "Coordinación Académica"}</span><span className="text-slate-500 font-bold block text-[9px] uppercase">{((nivel || "").toLowerCase() === "preescolar" || (nivel || "").toLowerCase() === "primaria") ? "Autorizado / Visto Bueno" : "Visto Bueno (Vo. Bo.) Dirección"}</span></div>
          </div>
        </div>

        {/* Asistente Chat */}
        <div className="lg:col-span-1 bg-white border-2 border-slate-900 rounded shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] overflow-hidden flex flex-col h-[650px] sticky top-6 print:hidden">
          <div className="bg-slate-900 p-4 flex items-center justify-between text-white border-b-2 border-slate-900">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-mex-maroon/20 rounded-lg flex items-center justify-center border border-white/10"><Bot className="w-4 h-4 text-mex-gold" /></div>
              <div><h4 className="font-extrabold text-xs tracking-wider uppercase flex items-center gap-1.5"><span>Asistente</span><Sparkles className="w-3 h-3 text-mex-gold animate-pulse" /></h4></div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 flex flex-col">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${msg.sender === "user" ? "bg-mex-maroon text-white rounded-tr-none self-end" : "bg-white text-slate-800 border border-slate-200/80 rounded-tl-none self-start shadow-xs"}`}>
                <div className="flex items-center gap-1.5 mb-1 opacity-70">
                  {msg.sender === "user" ? <><User className="w-3 h-3" /><span className="text-[9px] font-bold uppercase tracking-wider">Tú</span></> : <><Bot className="w-3 h-3" /><span className="text-[9px] font-bold uppercase tracking-wider">Gemini</span></>}
                </div>
                <p className="whitespace-pre-wrap font-medium">{msg.text}</p>
              </div>
            ))}
            {isModifying && <div className="bg-white text-slate-800 border border-slate-200/80 rounded-2xl rounded-tl-none p-3.5 text-xs self-start shadow-xs flex items-center gap-2.5 max-w-[85%]"><Loader2 className="w-4 h-4 text-mex-maroon animate-spin" /><span className="font-semibold text-slate-500">Analizando...</span></div>}
          </div>
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t-2 border-slate-900 flex gap-2">
            <input type="text" value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} disabled={isModifying} placeholder="Escribe un cambio..." className="flex-1 bg-slate-50 px-3.5 py-2.5 rounded-xl text-xs border border-slate-300 focus:outline-none transition" />
            <button type="submit" disabled={!chatMessage.trim() || isModifying} className="bg-mex-maroon text-white p-2.5 rounded-xl transition flex items-center justify-center shrink-0 cursor-pointer"><Send className="w-4 h-4" /></button>
          </form>
        </div>
      </div>

      <style>{`
        @media print {
          body { background-color: white !important; color: black !important; font-size: 11px !important; }
          header, footer, nav, aside, .print\\:hidden, #google-link-banner, #planeacion-form, #history-sidebar { display: none !important; }
          
          /* EL TRUCO PARA EVITAR CORTE DE HOJAS EN EL DASHBOARD */
          html, body, #root, .h-screen, .min-h-screen, .overflow-y-auto, .overflow-hidden {
            height: auto !important; min-height: auto !important; overflow: visible !important; display: block !important; position: static !important;
          }

          #documento-resultado { border: none !important; padding: 0 !important; margin: 0 !important; box-shadow: none !important; width: 100% !important; }
          .page-break-inside-avoid { page-break-inside: avoid !important; }
        }
      `}</style>
    </div>
  );
}