import React from "react";
import { CompletePlan, UserSubscription, PaywallReason, CreditActionType } from "../types";
import { ArrowLeft, Send, Sparkles, Bot, User, Loader2, AlertCircle } from "lucide-react";
import AccionesDocumento from "./AccionesDocumento";
import { CREDIT_COSTS } from "../utils/planManager";
import { savePlaneacion, isSupabaseConfigured } from "../utils/supabaseClient";

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
  const [chatMessage, setChatMessage] = React.useState("");
  const [chatHistory, setChatHistory] = React.useState<Array<{ sender: "user" | "assistant"; text: string }>>([
    {
      sender: "assistant",
      text: "¡Hola! Soy tu asistente de Gemini. ¿Deseas hacer algún cambio o ajuste en esta planeación? Solo escríbelo aquí y yo me encargaré de reescribir la planeación manteniendo toda la rigurosidad pedagógica de la NEM."
    }
  ]);
  const [isModifying, setIsModifying] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

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

      savePlaneacion(payloadDB as any).catch(err => console.error(err));
    }
  }, [planData]);

  const {
    nivel, docenteName, escuelaName, cct, grupo, grado, campoFormativo, disciplina, contenido, pda, ejesArticuladores, metodologia, situacionProblema, bapSelected = [], plan, duracionSemanas, duracionSesion,
  } = planData;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || isModifying) return;
    
    const userCredits = subscription?.credits ?? 0;
    const requiredCredits = CREDIT_COSTS["modificar_planeacion"]; 

    if (userCredits < requiredCredits) {
      if (onTriggerPaywall) onTriggerPaywall({ type: "credits", action: "modificar_planeacion", required: requiredCredits, current: userCredits });
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
        body: JSON.stringify({ plan, instruction: userText, nivel, campoFormativo, disciplina, grado, contenido, pda, ejesArticuladores, metodologia, situacionProblema, docenteName, escuelaName, cct, grupo, duracionSemanas, duracionSesion }),
      });

      if (!response.ok) throw new Error("Ocurrió un error al modificar la planeación.");
      const data = await response.json();
      
      if (data.success && data.plan) {
        if (onUpdatePlan) onUpdatePlan({ ...planData, plan: data.plan });
        setChatHistory(prev => [...prev, { sender: "assistant", text: `¡Listo! He modificado la planeación con éxito según tu solicitud.` }]);
      } else throw new Error("No se pudo obtener el plan modificado.");
    } catch (err: any) {
      setErrorMsg(err.message);
      setChatHistory(prev => [...prev, { sender: "assistant", text: `Lo siento, ocurrió un error: ${err.message}` }]);
    } finally {
      setIsModifying(false);
    }
  };

  return (
    <div className="space-y-6 relative animate-fade-in">
      {/* BARRA SUPERIOR */}
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
          <button onClick={onBack} className="px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-slate-700 hover:text-mex-maroon hover:bg-slate-100 transition flex items-center gap-1.5 cursor-pointer mr-1">
            <ArrowLeft className="w-4 h-4" /><span>Volver al Panel</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mt-6">
        
        {/* DOCUMENTO PRINCIPAL */}
        <div id="documento-resultado" className="lg:col-span-2 bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm font-sans text-slate-900 print:border-none print:p-0 print:shadow-none print:rounded-none printable-document">
          
          {/* ENCABEZADO ESCOLAR */}
          <div className="text-center border-b-2 border-slate-900 pb-4 mb-6">
            <h1 className="font-black text-lg tracking-wider text-slate-950 uppercase mb-1">Planeación Didáctica</h1>
            <h2 className="text-sm font-extrabold text-mex-maroon uppercase mb-0.5">{escuelaName}</h2>
            <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">C.C.T. {cct}</span>
          </div>

          {/* FICHA TÉCNICA */}
          <div className="border border-slate-300 text-xs mb-8 overflow-hidden rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-300">
              <div className="p-3.5 border-r border-slate-300 bg-slate-50">
                <span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block mb-0.5">DOCENTE:</span>
                <span className="font-black text-slate-950 text-sm uppercase">{docenteName}</span>
              </div>
              <div className="p-3.5 bg-slate-50 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block mb-0.5">FECHA / DURACIÓN ESTIMADA:</span>
                  <span className="font-bold text-slate-950 text-xs">{duracionSemanas || "2 semanas"}</span>
                </div>
                {duracionSesion && (
                  <div className="text-right border-l pl-4 border-slate-300">
                    <span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block mb-0.5">SESIÓN DE CLASE:</span>
                    <span className="font-bold text-slate-950 text-xs">{duracionSesion}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-300 bg-white">
              <div className="p-3.5 border-r border-slate-300"><span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block mb-0.5">CAMPO FORMATIVO:</span><span className="font-bold text-slate-950">{campoFormativo}</span></div>
              <div className="p-3.5 border-r border-slate-300"><span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block mb-0.5">DISCIPLINA:</span><span className="font-bold text-slate-950">{disciplina}</span></div>
              <div className="p-3.5"><span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block mb-0.5">GRADO Y GRUPO:</span><span className="font-bold text-slate-950">{grado} - "{grupo}"</span></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-300 bg-slate-50">
              <div className="p-3.5 border-r border-slate-300"><span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block mb-0.5">PRODUCTO FINAL:</span><span className="font-black text-mex-maroon">{plan.producto}</span></div>
              <div className="p-3.5"><span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block mb-0.5">METODOLOGÍA NEM:</span><span className="font-bold text-slate-950">{metodologia}</span></div>
            </div>
            <div className="p-4 border-b border-slate-300 bg-white">
              <span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block mb-1">SITUACIÓN-PROBLEMA:</span>
              <span className="text-slate-800 italic mt-0.5 block leading-relaxed text-[13px]">"{situacionProblema}"</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-300 bg-slate-50">
              <div className="p-4 border-r border-slate-300"><span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block mb-1">CONTENIDO:</span><span className="font-bold text-slate-900 mt-0.5 block text-[13px]">{contenido}</span></div>
              <div className="p-4"><span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block mb-1">PDA:</span><span className="font-bold text-slate-900 mt-0.5 block text-[13px]">{pda}</span></div>
            </div>
            <div className="p-4 bg-white">
              <span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block mb-2">EJES ARTICULADORES TRANSVERSALES:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {ejesArticuladores.map((eje, i) => <span key={i} className="bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded shadow-sm">{eje}</span>)}
              </div>
            </div>
            {bapSelected && bapSelected.length > 0 && (
              <div className="p-4 bg-white border-t border-slate-300">
                <span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block mb-2">BAP / APTITUDES SOBRESALIENTES:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {bapSelected.map((bap, i) => <span key={i} className="bg-red-50 text-red-800 border border-red-200 text-[10px] font-bold px-2.5 py-1 rounded shadow-sm">{bap}</span>)}
                </div>
              </div>
            )}
          </div>

          {/* SECUENCIA DIDÁCTICA DETALLADA (DISEÑO RECONSTRUIDO SEGÚN LA IMAGEN) */}
          <div className="space-y-8 mt-10">
            {plan.fases.map((fase, fIndex) => (
              <div key={fIndex} className="border-2 border-[#1e293b] rounded-lg overflow-hidden shadow-sm page-break-inside-avoid mb-6">
                
                {/* Encabezado de Fase */}
                <div className="bg-[#1e293b] text-white p-3 font-bold text-xs uppercase tracking-wider flex items-center justify-between">
                  <span>{fase.nombre}</span>
                  <span className="text-[10px] bg-slate-500/50 text-slate-100 font-bold px-2.5 py-1 rounded tracking-wider">
                    {nivel?.toLowerCase() === 'preescolar' ? 'ESTRUCTURA DIDÁCTICA' : 'FASE METODOLÓGICA'}
                  </span>
                </div>

                <div className="divide-y border-t border-slate-200 bg-white">
                  {fase.sesiones.map((sesion, sIndex) => (
                    <div key={sIndex} className="p-5 sm:p-6">
                      
                      {/* Cabecera de Sesión */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                        <h4 className="font-black text-sm text-[#0f172a] uppercase tracking-wide flex-1 mt-1">
                          Sesión {sesion.numero}: {sesion.titulo}
                        </h4>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <span className="font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200 text-[11px]">
                            Duración: {sesion.duracion}
                          </span>
                        </div>
                      </div>

                      {/* Tres Columnas de Actividades */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm">
                          <span className="font-black text-[10px] text-[#1d4ed8] tracking-wider uppercase block border-b border-blue-100 pb-2 mb-3">
                            ACTIVIDADES DE INICIO<br/>(MOTIVACIÓN Y SABERES)
                          </span>
                          <p className="text-slate-700 leading-relaxed font-normal whitespace-pre-line text-[13px]">{sesion.inicio}</p>
                        </div>
                        <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm">
                          <span className="font-black text-[10px] text-[#047857] tracking-wider uppercase block border-b border-emerald-100 pb-2 mb-3">
                            ACTIVIDADES DE DESARROLLO<br/>(ACCIÓN E INDAGACIÓN)
                          </span>
                          <p className="text-slate-700 leading-relaxed font-normal whitespace-pre-line text-[13px]">{sesion.desarrollo}</p>
                        </div>
                        <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm">
                          <span className="font-black text-[10px] text-[#c2410c] tracking-wider uppercase block border-b border-orange-100 pb-2 mb-3">
                            ACTIVIDADES DE CIERRE<br/>(SÍNTESIS Y EVALUACIÓN)
                          </span>
                          <p className="text-slate-700 leading-relaxed font-normal whitespace-pre-line text-[13px]">{sesion.cierre}</p>
                        </div>
                      </div>

                      {/* Recursos y Materiales */}
                      <div className="bg-[#f8fafc] border border-slate-200 rounded-lg p-4 mt-5">
                        <span className="font-bold text-slate-700 text-[10px] block uppercase tracking-wider mb-2.5">RECURSOS Y MATERIALES REQUERIDOS:</span>
                        <div className="flex flex-wrap gap-2">
                          {sesion.materiales.map((mat, i) => (
                            <span key={i} className="bg-white border border-slate-200 text-slate-700 text-[11px] font-medium px-3 py-1.5 rounded-md shadow-sm">
                              {mat}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Evaluación Formativa Integrada */}
                      {sesion.evaluacionSesion && (
                        <div className="bg-[#fff7ed] border border-[#ffedd5] rounded-lg p-4 mt-4">
                          <span className="font-black text-[#c2410c] text-[10px] block uppercase tracking-wider mb-2">EVALUACIÓN FORMATIVA INTEGRADA EN ESTA SESIÓN:</span>
                          <p className="text-slate-800 font-medium text-[13px] italic leading-relaxed whitespace-pre-line">{sesion.evaluacionSesion}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* EVALUACIÓN FORMATIVA GENERAL */}
          <div className="space-y-4 mt-10 page-break-inside-avoid">
            <h3 className="text-xs font-black uppercase text-slate-950 tracking-widest border-b-2 border-slate-950 pb-1 flex items-center gap-2">
              <span>III. Estrategia de Evaluación Formativa</span>
            </h3>
            <div className="border border-slate-300 rounded-lg p-5 bg-slate-50 text-xs shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                <div>
                  <span className="font-bold text-slate-500 text-[10px] tracking-wider uppercase block mb-2">Técnicas Sugeridas:</span>
                  <div className="flex flex-wrap gap-2">
                    {plan.evaluacionFormativa.tecnicas.map((tec, i) => <span key={i} className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-md font-bold shadow-sm">{tec}</span>)}
                  </div>
                </div>
                <div>
                  <span className="font-bold text-slate-500 text-[10px] tracking-wider uppercase block mb-2">Instrumentos Recomendados:</span>
                  <div className="flex flex-wrap gap-2 items-center">
                    {plan.evaluacionFormativa.instrumentos.map((ins, i) => (
                      <div key={i} className="bg-white border border-slate-200 text-slate-800 px-3 py-1.5 rounded-md font-bold text-xs shadow-sm">
                        <span>{ins}</span>
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-2 block italic">* Crea y personaliza estos instrumentos desde el menú principal.</span>
                </div>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <span className="font-bold text-slate-500 text-[10px] tracking-wider uppercase block mb-1">Descripción:</span>
                <p className="text-slate-800 leading-relaxed font-normal bg-white p-4 rounded-lg border border-slate-200">{plan.evaluacionFormativa.descripcion}</p>
              </div>
            </div>
          </div>

          {/* DUA */}
          <div className="space-y-4 mt-8 page-break-inside-avoid">
            <h3 className="text-xs font-black uppercase text-slate-950 tracking-widest border-b-2 border-slate-950 pb-1 flex items-center gap-2">
              <span>IV. Ajustes Razonables / DUA</span>
            </h3>
            <div className="border border-slate-300 rounded-lg p-5 bg-slate-50 text-xs leading-relaxed text-slate-800 font-normal shadow-sm">
              <p className="whitespace-pre-line">{plan.sugerenciasAdecuacion}</p>
            </div>
          </div>

          {/* FIRMAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 pt-8 border-t-2 border-slate-900 text-xs text-center page-break-inside-avoid">
            <div className="flex flex-col items-center">
              <div className="w-56 border-b-2 border-slate-900 mb-2 mt-8" />
              <span className="font-black text-slate-900 uppercase block">{docenteName}</span>
              <span className="text-slate-500 font-bold block text-[9px] uppercase mt-1">Profesor(a) Titular</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-56 border-b-2 border-slate-900 mb-2 mt-8" />
              <span className="font-black text-slate-900 uppercase block">{((nivel || "").toLowerCase() === "preescolar" || (nivel || "").toLowerCase() === "primaria") ? "Dirección de la Escuela" : "Coordinación Académica"}</span>
              <span className="text-slate-500 font-bold block text-[9px] uppercase mt-1">{((nivel || "").toLowerCase() === "preescolar" || (nivel || "").toLowerCase() === "primaria") ? "Autorizado / Visto Bueno" : "Visto Bueno (Vo. Bo.) Dirección"}</span>
            </div>
          </div>
        </div>

        {/* ASISTENTE CHAT (Se oculta al imprimir) */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[650px] sticky top-6 print:hidden">
          <div className="bg-slate-900 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-mex-maroon/20 rounded-xl flex items-center justify-center border border-white/10">
                <Bot className="w-5 h-5 text-mex-gold" />
              </div>
              <div>
                <h4 className="font-black text-sm tracking-wider uppercase flex items-center gap-1.5">
                  <span>Asistente</span>
                  <Sparkles className="w-3.5 h-3.5 text-mex-gold animate-pulse" />
                </h4>
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Gemini Inteligencia Artificial</span>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50 flex flex-col">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${msg.sender === "user" ? "bg-mex-maroon text-white rounded-tr-none self-end shadow-sm" : "bg-white text-slate-800 border border-slate-200 rounded-tl-none self-start shadow-sm"}`}>
                <div className="flex items-center gap-1.5 mb-2 opacity-70">
                  {msg.sender === "user" ? <><User className="w-3.5 h-3.5" /><span className="text-[10px] font-bold uppercase tracking-wider">Tú (Docente)</span></> : <><Bot className="w-3.5 h-3.5" /><span className="text-[10px] font-bold uppercase tracking-wider">Gemini NEM</span></>}
                </div>
                <p className="whitespace-pre-wrap font-medium text-[13px]">{msg.text}</p>
              </div>
            ))}
            {isModifying && (
              <div className="bg-white text-slate-800 border border-slate-200 rounded-2xl rounded-tl-none p-4 text-xs self-start shadow-sm flex items-center gap-3 max-w-[85%]">
                <Loader2 className="w-5 h-5 text-mex-maroon animate-spin" />
                <span className="font-bold text-slate-600">Rediseñando planeación...</span>
              </div>
            )}
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-950 p-4 rounded-xl text-[11px] font-semibold flex items-start gap-2 max-w-[85%]">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200 flex gap-2">
            <input type="text" value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} disabled={isModifying} placeholder="Ej: Haz la sesión 2 más dinámica..." className="flex-1 bg-slate-50 px-4 py-3 rounded-xl text-sm border border-slate-300 focus:outline-none focus:border-mex-maroon focus:ring-1 focus:ring-mex-maroon transition" />
            <button type="submit" disabled={!chatMessage.trim() || isModifying} className="bg-mex-maroon hover:bg-mex-maroon/90 text-white p-3 rounded-xl transition flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-50"><Send className="w-5 h-5" /></button>
          </form>
        </div>
      </div>

      <style>{`
        @media print {
          /* 1. RESET AGRESIVO PARA REPARAR EL BUG DE LA HOJA EN BLANCO EN CHROME/REACT */
          html, body, #root {
            height: auto !important;
            min-height: 100% !important;
            overflow: visible !important;
            position: static !important;
          }
          
          /* Quitar restricciones de altura y scroll a todos los contenedores padre */
          body * {
            max-height: none !important;
            overflow-y: visible !important;
          }

          body {
            background-color: white !important;
            color: black !important;
            font-size: 11px !important;
          }

          /* 2. OCULTAR INTERFAZ INNECESARIA */
          header, footer, nav, aside, .print\\:hidden, .no-print {
            display: none !important;
          }

          /* 3. GARANTIZAR QUE EL DOCUMENTO OCUPE TODA LA PÁGINA (Col-span fix) */
          #documento-resultado {
            grid-column: 1 / -1 !important; 
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }

          .page-break-inside-avoid { 
            page-break-inside: avoid !important; 
          }
        }
      `}</style>
    </div>
  );
}