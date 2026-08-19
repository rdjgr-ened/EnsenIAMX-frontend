import React, { useState } from "react";
import { CompletePlan, GeneratedInstrument, GeneratedWorksheet, UserSubscription, PaywallReason, CreditActionType } from "../types";
import { ArrowLeft, Send, Sparkles, Bot, User, Loader2, AlertCircle, Plus, FileText, Coins, BookOpen, Layers, CheckCircle2, FileSpreadsheet, RefreshCw, Award } from "lucide-react";
import InstrumentoEvaluacionModal from "./InstrumentoEvaluacionModal";
import HojaDeTrabajoModal from "./HojaDeTrabajoModal";
import AccionesDocumento from "./AccionesDocumento";
import { CREDIT_COSTS } from "../utils/planManager";
import { saveRecursoGenerado, isSupabaseConfigured } from "../utils/supabaseClient";

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
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ sender: "user" | "assistant"; text: string }>>([
    {
      sender: "assistant",
      text: "¡Hola! Soy tu copiloto Gemini. ¿Deseas hacer algún cambio en esta planeación? Escríbelo aquí (ej. 'Agrega más actividades dinámicas en la sesión 1', 'Adapta el proyecto para enfoque DUA') y me encargaré de reescribirla."
    }
  ]);
  const [isModifying, setIsModifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Instrument Generation State
  const [isInstrumentModalOpen, setIsInstrumentModalOpen] = useState(false);
  const [selectedInstrumentName, setSelectedInstrumentName] = useState("");
  const [instrumentData, setInstrumentData] = useState<GeneratedInstrument | null>(null);
  const [isGeneratingInstrument, setIsGeneratingInstrument] = useState(false);
  const [instrumentError, setInstrumentError] = useState<string | null>(null);
  const [customInstrumentName, setCustomInstrumentName] = useState("");

  // Worksheet Generation State
  const [isWorksheetModalOpen, setIsWorksheetModalOpen] = useState(false);
  const [worksheetData, setWorksheetData] = useState<GeneratedWorksheet | null>(null);
  const [isGeneratingWorksheet, setIsGeneratingWorksheet] = useState(false);
  const [worksheetError, setWorksheetError] = useState<string | null>(null);
  const [activeWorksheetSessionMeta, setActiveWorksheetSessionMeta] = useState<{
    faseNombre: string;
    sesionNumero: number;
    sesionTitulo: string;
    sesionObj?: any;
  }>({
    faseNombre: "",
    sesionNumero: 1,
    sesionTitulo: "",
  });

  const {
    nivel,
    docenteName,
    escuelaName,
    cct,
    grupo,
    grado,
    campoFormativo,
    disciplina,
    contenido,
    pda,
    ejesArticuladores = [],
    metodologia,
    situacionProblema,
    bapSelected = [],
    plan,
    duracionSemanas,
    duracionSesion,
  } = planData;

  const handleGenerateInstrument = async (insName: string) => {
    if (!insName.trim()) return;

    const userCredits = subscription?.credits ?? 0;
    const requiredCredits = CREDIT_COSTS["instrumento_evaluacion"] || 5;

    if (userCredits < requiredCredits) {
      if (onTriggerPaywall) {
        onTriggerPaywall({
          type: "credits",
          action: "instrumento_evaluacion",
          required: requiredCredits,
          current: userCredits,
        });
      }
      return;
    }

    if (onDeductCredits && !onDeductCredits("instrumento_evaluacion")) return;

    setSelectedInstrumentName(insName);
    setIsInstrumentModalOpen(true);
    setIsGeneratingInstrument(true);
    setInstrumentError(null);
    setInstrumentData(null);

    try {
      const response = await fetch("/api/generate-instrument", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instrumentName: insName,
          escuelaName,
          cct,
          docenteName,
          grado,
          grupo,
          campoFormativo,
          disciplina,
          contenido,
          pda,
          producto: plan?.producto,
          situacionProblema,
          proposito: plan?.proposito,
          nivel,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error || "Error al diseñar el instrumento.");
      }

      const data = await response.json();
      if (data.success && data.instrument) {
        setInstrumentData(data.instrument);

        if (isSupabaseConfigured) {
          const userProfileStr = localStorage.getItem("nem_secundaria_profile");
          const userEmail = userProfileStr ? JSON.parse(userProfileStr)?.email : null;
          const userId = userEmail ? `user_${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}` : 'anonymous_user';

          saveRecursoGenerado({
            id: `ins_${Date.now()}`,
            user_id: userId,
            tipo_recurso: "instrumento_evaluacion",
            contenido_json: data.instrument
          }).catch(err => console.warn("Error guardando instrumento:", err));
        }
      } else {
        throw new Error("No se recibieron datos del instrumento.");
      }
    } catch (err: any) {
      console.error(err);
      setInstrumentError(err.message || "Error al conectar con Gemini.");
    } finally {
      setIsGeneratingInstrument(false);
    }
  };

  const handleGenerateWorksheet = async (faseNombre: string, sesion: any) => {
    const userCredits = subscription?.credits ?? 0;
    const requiredCredits = CREDIT_COSTS["hoja_trabajo"] || 5;

    if (userCredits < requiredCredits) {
      if (onTriggerPaywall) {
        onTriggerPaywall({
          type: "credits",
          action: "hoja_trabajo",
          required: requiredCredits,
          current: userCredits,
        });
      }
      return;
    }

    if (onDeductCredits && !onDeductCredits("hoja_trabajo")) return;

    setActiveWorksheetSessionMeta({
      faseNombre,
      sesionNumero: sesion.numero,
      sesionTitulo: sesion.titulo,
      sesionObj: sesion,
    });
    setIsWorksheetModalOpen(true);
    setIsGeneratingWorksheet(true);
    setWorksheetError(null);
    setWorksheetData(null);

    try {
      const response = await fetch("/api/generate-worksheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sesionNumero: sesion.numero,
          sesionTitulo: sesion.titulo,
          sesionInicio: sesion.inicio,
          sesionDesarrollo: sesion.desarrollo,
          sesionCierre: sesion.cierre,
          sesionMateriales: sesion.materiales,
          faseNombre,
          escuelaName,
          cct,
          docenteName,
          grado,
          grupo,
          campoFormativo,
          disciplina,
          contenido,
          pda,
          nivel,
        }),
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
            id: `ws_${Date.now()}`,
            user_id: userId,
            tipo_recurso: "hoja_de_trabajo",
            contenido_json: data.worksheet
          }).catch(err => console.warn("Error guardando hoja de trabajo:", err));
        }
      } else {
        throw new Error("No se recibieron datos de la hoja de trabajo.");
      }
    } catch (err: any) {
      console.error(err);
      setWorksheetError(err.message || "Error al conectar con Gemini.");
    } finally {
      setIsGeneratingWorksheet(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || isModifying) return;

    const userCredits = subscription?.credits ?? 0;
    const requiredCredits = CREDIT_COSTS["modificar_planeacion"] || 5;

    if (userCredits < requiredCredits) {
      if (onTriggerPaywall) {
        onTriggerPaywall({
          type: "credits",
          action: "modificar_planeacion",
          required: requiredCredits,
          current: userCredits,
        });
      }
      return;
    }

    if (onDeductCredits && !onDeductCredits("modificar_planeacion")) return;

    const userText = chatMessage.trim();
    setChatMessage("");
    setChatHistory(prev => [...prev, { sender: "user", text: userText }]);
    setIsModifying(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/modify-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan,
          instruction: userText,
          nivel,
          campoFormativo,
          disciplina,
          grado,
          contenido,
          pda,
          ejesArticuladores,
          metodologia,
          situacionProblema,
          docenteName,
          escuelaName,
          cct,
          grupo,
          duracionSemanas,
          duracionSesion,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Error al modificar la planeación.");
      }

      const data = await response.json();
      if (data.success && data.plan) {
        const updatedPlan: CompletePlan = { ...planData, plan: data.plan };
        if (onUpdatePlan) onUpdatePlan(updatedPlan);

        setChatHistory(prev => [
          ...prev,
          {
            sender: "assistant",
            text: `¡Listo! He modificado la planeación adecuadamente a tu solicitud: "${userText}".`
          }
        ]);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Error al comunicar con Gemini.");
    } finally {
      setIsModifying(false);
    }
  };

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Documento Principal */}
        <div
          id="documento-resultado"
          className="lg:col-span-2 bg-white p-8 sm:p-12 rounded-2xl border-2 border-slate-900 shadow-[6px_6px_0px_0px_rgba(106,27,49,0.15)] font-sans text-slate-900 printable-document"
        >
          {/* Encabezado Escolar */}
          <div className="text-center border-b-2 border-slate-900 pb-4 mb-6">
            <h1 className="font-black text-lg tracking-wider text-slate-950 uppercase mb-1">Planeación Didáctica NEM</h1>
            <h2 className="text-sm font-extrabold text-mex-maroon uppercase mb-0.5">{escuelaName}</h2>
            <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">C.C.T. {cct}</span>
          </div>

          {/* Matriz Curricular */}
          <div className="border-2 border-slate-900 text-xs mb-6 overflow-hidden rounded">
            <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-slate-900">
              <div className="p-3 border-r-2 border-slate-900 bg-slate-50">
                <span className="font-bold text-slate-600 uppercase text-[9px] block">DOCENTE:</span>
                <span className="font-black text-slate-950 text-xs uppercase">{docenteName}</span>
              </div>
              <div className="p-3 bg-slate-50 flex justify-between">
                <div>
                  <span className="font-bold text-slate-600 uppercase text-[9px] block">DURACIÓN ESTIMADA:</span>
                  <span className="font-bold text-slate-950 text-xs">{duracionSemanas || "2 semanas"}</span>
                </div>
                {duracionSesion && (
                  <div>
                    <span className="font-bold text-slate-600 uppercase text-[9px] block">SESIÓN:</span>
                    <span className="font-bold text-slate-950 text-xs">{duracionSesion}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-b-2 border-slate-900">
              <div className="p-3 border-r-2 border-slate-900">
                <span className="font-bold text-slate-600 uppercase text-[9px] block">NIVEL:</span>
                <span className="font-extrabold text-slate-900 text-xs">{nivel}</span>
              </div>
              <div className="p-3 border-r-2 border-slate-900">
                <span className="font-bold text-slate-600 uppercase text-[9px] block">GRADO Y GRUPO:</span>
                <span className="font-extrabold text-slate-900 text-xs">{grado} - "{grupo}"</span>
              </div>
              <div className="p-3 bg-mex-maroon/5">
                <span className="font-bold text-mex-maroon uppercase text-[9px] block">METODOLOGÍA:</span>
                <span className="font-black text-mex-maroon text-xs">{metodologia}</span>
              </div>
            </div>

            <div className="p-3 border-b-2 border-slate-900">
              <span className="font-bold text-slate-600 uppercase text-[9px] block mb-1">CAMPO FORMATIVO Y DISCIPLINA:</span>
              <span className="font-black text-slate-900 text-xs uppercase">{campoFormativo} — {disciplina}</span>
            </div>

            <div className="p-3 border-b-2 border-slate-900 bg-amber-50/40">
              <span className="font-bold text-slate-700 uppercase text-[9px] block mb-1">CONTENIDO CURRICULAR:</span>
              <p className="font-bold text-slate-950 text-xs leading-relaxed">{contenido}</p>
            </div>

            <div className="p-3 border-b-2 border-slate-900 bg-emerald-50/40">
              <span className="font-bold text-emerald-900 uppercase text-[9px] block mb-1">PROCESO DE DESARROLLO DE APRENDIZAJE (PDA):</span>
              <p className="font-extrabold text-slate-950 text-xs leading-relaxed">{pda}</p>
            </div>

            <div className="p-3 border-b-2 border-slate-900">
              <span className="font-bold text-slate-600 uppercase text-[9px] block mb-1">EJES ARTICULADORES:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {Array.isArray(ejesArticuladores) && ejesArticuladores.map((eje, i) => (
                  <span key={i} className="px-2 py-0.5 bg-slate-100 border border-slate-300 text-slate-800 text-[10px] font-extrabold rounded">
                    {eje}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3">
              <span className="font-bold text-slate-600 uppercase text-[9px] block mb-1">SITUACIÓN PROBLEMA:</span>
              <p className="font-medium text-slate-800 text-xs leading-relaxed">{situacionProblema}</p>
            </div>
          </div>

          {/* Propósito y Producto */}
          {plan && (
            <div className="mb-8 p-4 bg-slate-50 border-2 border-slate-900 rounded space-y-3">
              {plan.proposito && (
                <div>
                  <span className="font-black text-xs text-mex-maroon uppercase tracking-wider block mb-1">PROPÓSITO GENERAL DEL PROYECTO:</span>
                  <p className="text-xs font-semibold text-slate-800 leading-relaxed">{plan.proposito}</p>
                </div>
              )}
              {plan.producto && (
                <div className="pt-2 border-t border-slate-200">
                  <span className="font-black text-xs text-slate-900 uppercase tracking-wider block mb-1">PRODUCTO FINAL / EVIDENCIA INTEGRADORA:</span>
                  <p className="text-xs font-bold text-slate-950 leading-relaxed">{plan.producto}</p>
                </div>
              )}
            </div>
          )}

          {/* Secuencia Didáctica por Fases */}
          {plan?.fases && (
            <div className="space-y-8">
              <h3 className="font-black text-sm uppercase tracking-wider text-slate-900 pb-2 border-b-2 border-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-mex-maroon" />
                <span>Secuencia Didáctica de Actividades</span>
              </h3>

              {plan.fases.map((fase, fIdx) => (
                <div key={fIdx} className="space-y-4">
                  <div className="p-3 bg-slate-900 text-white rounded flex items-center justify-between">
                    <span className="font-black text-xs uppercase tracking-wider">{fase.nombre}</span>
                    <span className="text-[10px] text-mex-gold font-bold">{fase.sesiones?.length || 0} Sesiones</span>
                  </div>

                  <div className="space-y-4 pl-2">
                    {fase.sesiones?.map((sesion, sIdx) => (
                      <div key={sIdx} className="p-4 border-2 border-slate-200 hover:border-slate-400 rounded-lg space-y-3 bg-white">
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="font-extrabold text-xs text-mex-maroon uppercase">
                            Sesión {sesion.numero}: {sesion.titulo}
                          </span>
                          <button
                            onClick={() => handleGenerateWorksheet(fase.nombre, sesion)}
                            className="px-2.5 py-1 bg-mex-maroon/10 hover:bg-mex-maroon/20 text-mex-maroon font-bold text-[10px] rounded border border-mex-maroon/20 flex items-center gap-1 transition"
                          >
                            <FileSpreadsheet className="w-3 h-3" />
                            <span>Generar Hoja de Trabajo (5 cr)</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-2 text-xs">
                          <div>
                            <span className="font-bold text-slate-700 uppercase text-[10px] block">Inicio:</span>
                            <p className="text-slate-800 leading-relaxed">{sesion.inicio}</p>
                          </div>
                          <div>
                            <span className="font-bold text-slate-700 uppercase text-[10px] block">Desarrollo:</span>
                            <p className="text-slate-800 leading-relaxed">{sesion.desarrollo}</p>
                          </div>
                          <div>
                            <span className="font-bold text-slate-700 uppercase text-[10px] block">Cierre:</span>
                            <p className="text-slate-800 leading-relaxed">{sesion.cierre}</p>
                          </div>
                        </div>

                        {sesion.materiales && (
                          <div className="pt-2 border-t border-slate-100 text-[11px]">
                            <span className="font-bold text-slate-600 uppercase text-[9px] block">Recursos y Materiales:</span>
                            <p className="text-slate-600">{sesion.materiales}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Generador de Instrumentos de Evaluación */}
          <div className="mt-10 pt-6 border-t-2 border-slate-900 space-y-4">
            <h4 className="font-black text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-mex-maroon" />
              <span>Generar Instrumentos de Evaluación Asociados</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {["Rúbrica Analítica", "Lista de Cotejo", "Escala Estimativa"].map((instName) => (
                <button
                  key={instName}
                  onClick={() => handleGenerateInstrument(instName)}
                  className="p-3 bg-slate-50 hover:bg-mex-maroon/5 border border-slate-300 hover:border-mex-maroon/30 rounded font-bold text-xs text-slate-800 transition text-left flex items-center justify-between"
                >
                  <span>{instName}</span>
                  <Coins className="w-3.5 h-3.5 text-mex-gold" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Barra Lateral Copiloto IA Gemini */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border-2 border-slate-900 shadow-sm space-y-4 sticky top-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <Sparkles className="w-5 h-5 text-mex-maroon" />
            <h3 className="font-black text-xs text-slate-900 uppercase tracking-wider">Copiloto IA Gemini</h3>
          </div>

          <div className="h-64 overflow-y-auto space-y-3 p-3 bg-slate-50 rounded border border-slate-200 text-xs">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`p-2.5 rounded ${msg.sender === "user" ? "bg-slate-900 text-white ml-4" : "bg-white border text-slate-800 mr-4"}`}>
                <span className="font-bold text-[9px] uppercase block mb-1 opacity-70">
                  {msg.sender === "user" ? "Tú" : "Gemini"}
                </span>
                <p className="leading-normal">{msg.text}</p>
              </div>
            ))}
            {isModifying && (
              <div className="p-2 bg-amber-50 text-amber-800 rounded text-center font-bold flex items-center justify-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Reescribiendo planeación...</span>
              </div>
            )}
          </div>

          {errorMsg && <div className="p-2 bg-red-50 text-red-700 text-[11px] rounded font-semibold">{errorMsg}</div>}

          <form onSubmit={handleSendMessage} className="space-y-2">
            <textarea
              rows={3}
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Solicita modificaciones (ej. 'Amplía la sesión 2', 'Añade actividades lúdicas')..."
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded text-xs outline-none focus:border-mex-maroon"
            />
            <button
              type="submit"
              disabled={isModifying || !chatMessage.trim()}
              className="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-extrabold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Modificar Planeación (5 cr)</span>
            </button>
          </form>
        </div>
      </div>

      {/* Modales */}
      {isInstrumentModalOpen && (
        <InstrumentoEvaluacionModal
          isOpen={isInstrumentModalOpen}
          onClose={() => setIsInstrumentModalOpen(false)}
          instrumentData={instrumentData}
          isLoading={isGeneratingInstrument}
          error={instrumentError}
          instrumentName={selectedInstrumentName}
          planData={planData}
        />
      )}

      {isWorksheetModalOpen && (
        <HojaDeTrabajoModal
          isOpen={isWorksheetModalOpen}
          onClose={() => setIsWorksheetModalOpen(false)}
          worksheetData={worksheetData}
          isLoading={isGeneratingWorksheet}
          error={worksheetError}
          sessionMeta={activeWorksheetSessionMeta}
          planData={planData}
        />
      )}
    </div>
  );
}