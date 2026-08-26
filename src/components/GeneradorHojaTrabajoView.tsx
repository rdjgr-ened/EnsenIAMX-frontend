import React, { useState } from "react";
import { CompletePlan, GeneratedWorksheet, UserSubscription, PaywallReason, CreditActionType } from "../types";
import { ArrowLeft, Loader2, Sparkles, AlertCircle, FileText, BookOpen } from "lucide-react";
import AccionesDocumento from "./AccionesDocumento";
import { CREDIT_COSTS } from "../utils/planManager";
import { saveRecursoGenerado, isSupabaseConfigured } from "../utils/supabaseClient";

interface GeneradorHojaTrabajoProps {
  planeacionesGuardadas: CompletePlan[];
  onBack: () => void;
  subscription?: UserSubscription;
  onDeductCredits?: (action: CreditActionType) => boolean;
  onTriggerPaywall?: (reason: PaywallReason) => void;
}

export default function GeneradorHojaTrabajoView({
  planeacionesGuardadas, onBack, subscription, onDeductCredits, onTriggerPaywall
}: GeneradorHojaTrabajoProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [selectedSessionId, setSelectedSessionId] = useState<string>(""); 
  
  const [worksheetData, setWorksheetData] = useState<GeneratedWorksheet | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedPlan = planeacionesGuardadas.find(p => p.id === selectedPlanId);

  const availableSessions = selectedPlan ? selectedPlan.plan.fases.flatMap((fase, fIdx) => 
    fase.sesiones.map((sesion, sIdx) => ({
      id: `${fIdx}-${sIdx}`,
      faseNombre: fase.nombre,
      sesion: sesion
    }))
  ) : [];

  const handleGenerate = async () => {
    if (!selectedPlan || !selectedSessionId) return;

    const userCredits = subscription?.credits ?? 0;
    const requiredCredits = CREDIT_COSTS["hoja_trabajo"]; 

    if (userCredits < requiredCredits) {
      if (onTriggerPaywall) onTriggerPaywall({ type: "credits", action: "hoja_trabajo", required: requiredCredits, current: userCredits });
      return;
    }
    if (onDeductCredits && !onDeductCredits("hoja_trabajo")) return;

    const sessionMatch = availableSessions.find(s => s.id === selectedSessionId);
    if (!sessionMatch) return;

    setIsLoading(true);
    setError(null);
    setWorksheetData(null);

    try {
      const response = await fetch("/api/generate-worksheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          sesionNumero: sessionMatch.sesion.numero, 
          sesionTitulo: sessionMatch.sesion.titulo, 
          sesionInicio: sessionMatch.sesion.inicio, 
          sesionDesarrollo: sessionMatch.sesion.desarrollo, 
          sesionCierre: sessionMatch.sesion.cierre, 
          sesionMateriales: sessionMatch.sesion.materiales, 
          faseNombre: sessionMatch.faseNombre, 
          escuelaName: selectedPlan.escuelaName, 
          cct: selectedPlan.cct, 
          docenteName: selectedPlan.docenteName, 
          grado: selectedPlan.grado, 
          grupo: selectedPlan.grupo, 
          campoFormativo: selectedPlan.campoFormativo, 
          disciplina: selectedPlan.disciplina, 
          contenido: selectedPlan.contenido, 
          pda: selectedPlan.pda, 
          nivel: selectedPlan.nivel 
        }),
      });

      if (!response.ok) throw new Error("Error al generar la hoja de trabajo.");
      const data = await response.json();
      
      if (data.success && data.worksheet) {
        setWorksheetData(data.worksheet);
        if (isSupabaseConfigured) {
          const userProfileStr = localStorage.getItem("nem_secundaria_profile");
          const userProfile = userProfileStr ? JSON.parse(userProfileStr) : null;
          const userId = userProfile?.id || (userProfile?.email ? `user_${userProfile.email.replace(/[^a-zA-Z0-9]/g, '_')}` : 'anonymous_user');
          
          saveRecursoGenerado({ 
            id: `ws_${Date.now()}`, 
            user_id: userId, 
            tipo_recurso: "hoja_de_trabajo", 
            contenido_json: data.worksheet 
          }).catch(e => console.warn(e));
        }
      } else throw new Error("No se recibieron datos de la hoja de trabajo.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedSessionData = availableSessions.find(s => s.id === selectedSessionId);

  return (
    <div className="space-y-6 relative animate-fade-in">
      
      <div className="print:hidden bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="font-black text-slate-800 text-lg uppercase tracking-wider">Diseñar Hoja de Trabajo</h2>
              <p className="text-xs text-slate-500">Selecciona una planeación guardada para extraer el contexto.</p>
            </div>
          </div>
          <button onClick={onBack} className="px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-slate-700 hover:text-mex-maroon hover:bg-slate-100 transition flex items-center gap-1.5 cursor-pointer">
            <ArrowLeft className="w-4 h-4" /><span>Volver</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">1. Selecciona tu Planeación</label>
            <select
              value={selectedPlanId}
              onChange={(e) => { setSelectedPlanId(e.target.value); setSelectedSessionId(""); setWorksheetData(null); }}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg text-slate-800 text-sm font-medium outline-none"
            >
              <option value="">-- Elige una planeación del archivo --</option>
              {planeacionesGuardadas.map(p => (
                <option key={p.id} value={p.id}>{p.disciplina} ({p.grado}) - {String(p.contenido).substring(0, 50)}...</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">2. Selecciona la Sesión de Clase</label>
            <select
              value={selectedSessionId}
              onChange={(e) => { setSelectedSessionId(e.target.value); setWorksheetData(null); }}
              disabled={!selectedPlanId}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg text-slate-800 text-sm font-medium outline-none disabled:opacity-50"
            >
              <option value="">-- Elige una sesión específica --</option>
              {availableSessions.map(s => (
                <option key={s.id} value={s.id}>Sesión {s.sesion.numero}: {s.sesion.titulo}</option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={!selectedPlanId || !selectedSessionId || isLoading}
            className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            <span>{isLoading ? "Diseñando con Gemini..." : "Generar Hoja de Trabajo"}</span>
          </button>
        </div>
      </div>

      {worksheetData && selectedPlan && selectedSessionData && !isLoading && (
        <div className="space-y-6">
          <AccionesDocumento
            targetId="hoja-trabajo-resultado"
            tipoRecurso="Hoja_De_Trabajo"
            customSuffix={`Sesion_${selectedSessionData.sesion.numero}_${selectedPlan.disciplina}`}
            title={<span className="font-black text-slate-800 text-sm">{worksheetData.titulo}</span>}
          />

          <div id="hoja-trabajo-resultado" className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-300 shadow-sm space-y-8 text-slate-900 text-xs printable-document print:p-0 print:border-none print:shadow-none print:w-full">
            
            <div className="border-2 border-slate-900 rounded-xl p-5 bg-slate-50/50 space-y-4">
              <div className="text-center">
                <h1 className="font-black text-lg text-mex-maroon uppercase tracking-wide">{worksheetData.titulo}</h1>
                <h2 className="font-bold text-slate-700 text-sm mt-1">Sesión {selectedSessionData.sesion.numero}: {selectedSessionData.sesion.titulo} | {selectedPlan.disciplina}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-3 border-t border-slate-300">
                <div className="p-2.5 bg-white rounded border border-slate-200"><span className="font-bold text-slate-500 block uppercase text-[10px] mb-0.5">Escuela:</span><span className="font-black text-slate-900 text-sm">{selectedPlan.escuelaName} (C.C.T. {selectedPlan.cct})</span></div>
                <div className="p-2.5 bg-white rounded border border-slate-200"><span className="font-bold text-slate-500 block uppercase text-[10px] mb-0.5">Docente:</span><span className="font-black text-slate-900 text-sm">{selectedPlan.docenteName}</span></div>
                <div className="p-2.5 bg-white rounded border border-slate-200"><span className="font-bold text-slate-500 block uppercase text-[10px] mb-0.5">Alumno(a):</span><span className="block pt-1 border-b border-slate-400 mt-2"></span></div>
                <div className="p-2.5 bg-white rounded border border-slate-200"><span className="font-bold text-slate-500 block uppercase text-[10px] mb-0.5">Grado y Grupo / Fecha:</span><span className="font-black text-slate-900 text-sm">{selectedPlan.grado} - Grupo "{selectedPlan.grupo}" | ____/____/2026</span></div>
              </div>
              <div className="p-3 bg-white rounded border border-slate-200 text-xs"><span className="font-bold text-slate-500 block uppercase text-[10px] mb-1">PDA:</span><span className="font-bold text-slate-900">{selectedPlan.pda}</span></div>
            </div>

            <div className="bg-amber-50/60 border border-amber-200 p-4 rounded-xl text-slate-800 text-sm font-medium">
              <span className="font-black uppercase text-amber-900 block text-xs tracking-wider mb-1">📌 Instrucciones Generales:</span>
              <p className="leading-relaxed">{worksheetData.instruccionesGenerales}</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-black text-sm uppercase text-mex-maroon tracking-wider border-b-2 border-mex-maroon pb-1">{worksheetData.seccionInicio.titulo}</h3>
              <p className="text-slate-600 font-semibold text-xs italic">{worksheetData.seccionInicio.instrucciones}</p>
              <div className="space-y-4">
                {worksheetData.seccionInicio.ejercicios.map((ex, idx) => (
                  <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3 page-break-inside-avoid">
                    <p className="font-bold text-slate-900 text-sm leading-snug"><span className="text-mex-maroon font-black">{ex.numero}.</span> {ex.preguntaOInstruccion}</p>
                    <div className="space-y-3 pt-2">
                      {Array.from({ length: ex.lineasDeRespuesta || 3 }).map((_, lIdx) => <div key={lIdx} className="border-b border-dashed border-slate-300 h-6" />)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="font-black text-sm uppercase text-mex-maroon tracking-wider border-b-2 border-mex-maroon pb-1">{worksheetData.seccionDesarrollo.titulo}</h3>
              <p className="text-slate-600 font-semibold text-xs italic">{worksheetData.seccionDesarrollo.instrucciones}</p>
              <div className="space-y-4">
                {worksheetData.seccionDesarrollo.ejercicios.map((ex, idx) => (
                  <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-white space-y-3 page-break-inside-avoid">
                    <p className="font-bold text-slate-900 text-sm leading-snug"><span className="text-mex-maroon font-black">{ex.numero}.</span> {ex.preguntaOInstruccion}</p>
                    {ex.textoOAuxiliar && <div className="p-3 bg-slate-100 border-l-4 border-slate-700 rounded-r-lg text-slate-800 text-xs italic font-medium">{ex.textoOAuxiliar}</div>}
                    <div className="space-y-3 pt-2">
                      {Array.from({ length: ex.lineasDeRespuesta || 4 }).map((_, lIdx) => <div key={lIdx} className="border-b border-dashed border-slate-300 h-6" />)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="font-black text-sm uppercase text-mex-maroon tracking-wider border-b-2 border-mex-maroon pb-1">{worksheetData.seccionCierre.titulo}</h3>
              <p className="text-slate-600 font-semibold text-xs italic">{worksheetData.seccionCierre.instrucciones}</p>
              <div className="space-y-4">
                {worksheetData.seccionCierre.ejercicios.map((ex, idx) => (
                  <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3 page-break-inside-avoid">
                    <p className="font-bold text-slate-900 text-sm leading-snug"><span className="text-mex-maroon font-black">{ex.numero}.</span> {ex.preguntaOInstruccion}</p>
                    <div className="space-y-3 pt-2">
                      {Array.from({ length: ex.lineasDeRespuesta || 3 }).map((_, lIdx) => <div key={lIdx} className="border-b border-dashed border-slate-300 h-6" />)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {worksheetData.ticketDeSalida && (
              <div className="p-5 border-2 border-dashed border-amber-500 bg-amber-50/40 rounded-xl space-y-3 page-break-inside-avoid">
                <span className="font-black uppercase text-amber-900 text-sm tracking-wider flex items-center gap-1.5">🎟️ Ticket de Salida (Entregar al finalizar la clase)</span>
                <p className="font-bold text-slate-900 text-sm">{worksheetData.ticketDeSalida}</p>
                <div className="space-y-3 pt-2"><div className="border-b border-dashed border-slate-400 h-6" /><div className="border-b border-dashed border-slate-400 h-6" /></div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media print {
          /* 1. RESET DE RESTRICCIONES DE ALTURA Y SCROLL EN TAILWIND */
          html, body, #root {
            height: auto !important;
            min-height: 100vh !important;
            overflow: visible !important;
          }

          /* Forzamos a que cualquier contenedor padre (sidebar, main) permita expandirse */
          div[class*="h-screen"], div[class*="h-full"], div[class*="overflow"], main {
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
            position: static !important;
          }

          /* 2. OCULTAR LA INTERFAZ DE USUARIO */
          header, footer, nav, aside, .print\\:hidden, .no-print {
            display: none !important;
          }

          /* 3. ESTILOS BASE DEL DOCUMENTO */
          body {
            background-color: white !important;
            color: black !important;
            font-size: 11px !important;
          }

          /* 4. EXPANDIR EL CONTENEDOR DEL DOCUMENTO */
          #hoja-trabajo-resultado {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            grid-column: 1 / -1 !important; 
          }

          /* 5. REGLAS DE PAGINACIÓN CORRECTAS */
          .page-break-inside-avoid { 
            page-break-inside: avoid !important; 
            break-inside: avoid !important;
          }
        }
      `}</style>
    </div>
  );
}