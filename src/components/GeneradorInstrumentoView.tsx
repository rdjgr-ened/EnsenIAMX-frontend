import React, { useState } from "react";
import { CompletePlan, GeneratedInstrument, UserSubscription, PaywallReason, CreditActionType } from "../types";
import { ArrowLeft, Loader2, Sparkles, AlertCircle } from "lucide-react";
import AccionesDocumento from "./AccionesDocumento";
import { CREDIT_COSTS } from "../utils/planManager";
import { saveRecursoGenerado, isSupabaseConfigured } from "../utils/supabaseClient";

interface GeneradorInstrumentoProps {
  planeacionesGuardadas: CompletePlan[];
  onBack: () => void;
  subscription?: UserSubscription;
  onDeductCredits?: (action: CreditActionType) => boolean;
  onTriggerPaywall?: (reason: PaywallReason) => void;
}

export default function GeneradorInstrumentoView({
  planeacionesGuardadas, onBack, subscription, onDeductCredits, onTriggerPaywall
}: GeneradorInstrumentoProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [selectedInstrument, setSelectedInstrument] = useState<string>("");
  const [customInstrument, setCustomInstrument] = useState<string>("");
  
  const [instrumentData, setInstrumentData] = useState<GeneratedInstrument | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedPlan = planeacionesGuardadas.find(p => p.id === selectedPlanId);
  const availableInstruments = selectedPlan?.plan?.evaluacionFormativa?.instrumentos || [];

  const handleGenerate = async () => {
    if (!selectedPlan) return;
    const instrumentName = selectedInstrument === "otro" ? customInstrument : selectedInstrument;
    if (!instrumentName.trim()) return;

    const userCredits = subscription?.credits ?? 0;
    const requiredCredits = CREDIT_COSTS["instrumento_evaluacion"]; 

    if (userCredits < requiredCredits) {
      if (onTriggerPaywall) onTriggerPaywall({ type: "credits", action: "instrumento_evaluacion", required: requiredCredits, current: userCredits });
      return;
    }
    if (onDeductCredits && !onDeductCredits("instrumento_evaluacion")) return;

    setIsLoading(true);
    setError(null);
    setInstrumentData(null);

    try {
      const response = await fetch("/api/generate-instrument", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          instrumentName, 
          escuelaName: selectedPlan.escuelaName, 
          cct: selectedPlan.cct, 
          docenteName: selectedPlan.docenteName, 
          grado: selectedPlan.grado, 
          grupo: selectedPlan.grupo, 
          campoFormativo: selectedPlan.campoFormativo, 
          disciplina: selectedPlan.disciplina, 
          contenido: selectedPlan.contenido, 
          pda: selectedPlan.pda, 
          producto: selectedPlan.plan.producto, 
          situacionProblema: selectedPlan.situacionProblema, 
          proposito: selectedPlan.plan.proposito, 
          nivel: selectedPlan.nivel 
        }),
      });

      if (!response.ok) throw new Error("Error al diseñar el instrumento de evaluación.");
      const data = await response.json();
      
      if (data.success && data.instrument) {
        setInstrumentData(data.instrument);
        if (isSupabaseConfigured) {
          const userProfileStr = localStorage.getItem("nem_secundaria_profile");
          const userEmail = userProfileStr ? JSON.parse(userProfileStr)?.email : null;
          const userId = userEmail ? `user_${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}` : 'anonymous_user';
          saveRecursoGenerado({ id: `ins_${Date.now()}`, user_id: userId, tipo_recurso: "instrumento_evaluacion", contenido_json: data.instrument }).catch(e => console.warn(e));
        }
      } else throw new Error("No se recibieron datos del instrumento.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 relative animate-fade-in">
      
      <div className="print:hidden bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-mex-maroon/10 flex items-center justify-center border border-mex-maroon/20">
              <Sparkles className="w-5 h-5 text-mex-maroon" />
            </div>
            <div>
              <h2 className="font-black text-slate-800 text-lg uppercase tracking-wider">Diseñar Instrumento de Evaluación</h2>
              <p className="text-xs text-slate-500">Genera rúbricas, listas de cotejo o guías basadas en tus planeaciones.</p>
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
              onChange={(e) => { setSelectedPlanId(e.target.value); setSelectedInstrument(""); setInstrumentData(null); }}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 rounded-lg text-slate-800 text-sm font-medium outline-none"
            >
              <option value="">-- Elige una planeación del archivo --</option>
              {planeacionesGuardadas.map(p => (
                <option key={p.id} value={p.id}>{p.disciplina} ({p.grado}) - {String(p.contenido).substring(0, 50)}...</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">2. Selecciona el Instrumento</label>
            <select
              value={selectedInstrument}
              onChange={(e) => { setSelectedInstrument(e.target.value); setInstrumentData(null); }}
              disabled={!selectedPlanId}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 rounded-lg text-slate-800 text-sm font-medium outline-none disabled:opacity-50"
            >
              <option value="">-- Elige un instrumento --</option>
              {availableInstruments.map((ins, i) => (
                <option key={i} value={ins}>{ins} (Recomendado)</option>
              ))}
              <option value="otro">Otro (Escribir personalizado)</option>
            </select>
          </div>
        </div>

        {selectedInstrument === "otro" && (
          <div>
            <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Escribe el nombre del instrumento</label>
            <input
              type="text"
              value={customInstrument}
              onChange={(e) => setCustomInstrument(e.target.value)}
              placeholder="Ej. Guía de coevaluación para debate"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-mex-maroon rounded-lg text-slate-800 text-sm outline-none"
            />
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={!selectedPlanId || !selectedInstrument || (selectedInstrument === "otro" && !customInstrument.trim()) || isLoading}
            className="w-full sm:w-auto px-8 py-3.5 bg-mex-maroon hover:bg-mex-maroon/90 disabled:bg-slate-300 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            <span>{isLoading ? "Diseñando con Gemini..." : "Generar Instrumento"}</span>
          </button>
        </div>
      </div>

      {instrumentData && selectedPlan && !isLoading && (
        <div className="space-y-6">
          <div className="print:hidden">
            <AccionesDocumento
              targetId="documento-resultado"
              tipoRecurso="Instrumento_Evaluacion"
              customSuffix={`${selectedInstrument}_${selectedPlan.grado}`}
              title={<span className="font-black text-slate-800 text-sm">{instrumentData.titulo}</span>}
            />
          </div>

          <div id="documento-resultado" className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm font-sans text-slate-900 printable-document print:border-none print:shadow-none print:p-0 print:rounded-none">
            
            <div className="text-center border-b-2 border-slate-900 pb-5 mb-6">
              <h1 className="font-black text-xl uppercase tracking-wider text-slate-950">{selectedPlan.escuelaName}</h1>
              <p className="font-extrabold text-mex-maroon text-sm uppercase mt-1">C.C.T. {selectedPlan.cct} • Ciclo Escolar 2025-2026</p>
              <div className="mt-4 inline-block bg-slate-900 text-white px-8 py-2 rounded-lg">
                <h2 className="font-black text-sm uppercase tracking-widest text-mex-gold">{instrumentData.titulo}</h2>
              </div>
            </div>

            <div className="border border-slate-300 text-xs sm:text-sm overflow-hidden rounded-lg shadow-sm mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-300">
                <div className="p-3.5 border-r border-slate-300 bg-slate-50"><span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block mb-0.5">DOCENTE:</span><span className="font-black text-slate-950 text-sm uppercase">{selectedPlan.docenteName}</span></div>
                <div className="p-3.5 bg-slate-50"><span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block mb-0.5">GRADO Y GRUPO:</span><span className="font-black text-slate-950 text-xs">{selectedPlan.grado} - "{selectedPlan.grupo}"</span></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-300 bg-white">
                <div className="p-3.5 border-r border-slate-300"><span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block mb-0.5">CAMPO FORMATIVO:</span><span className="font-bold text-slate-950">{selectedPlan.campoFormativo}</span></div>
                <div className="p-3.5"><span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block mb-0.5">DISCIPLINA:</span><span className="font-bold text-slate-950">{selectedPlan.disciplina}</span></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-300 bg-slate-50">
                <div className="p-3.5 border-r border-slate-300"><span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block mb-0.5">PRODUCTO A EVALUAR:</span><span className="font-black text-mex-maroon">{selectedPlan.plan?.producto || "Evidencia"}</span></div>
                <div className="p-3.5"><span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block mb-0.5">ALUMNO(A):</span><span className="block pt-2 border-b border-slate-400 mt-1"></span></div>
              </div>
              <div className="p-4 bg-white">
                <span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block mb-1">PDA:</span>
                <span className="font-medium text-slate-900 block leading-relaxed">{selectedPlan.pda}</span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm mb-8">
              <span className="font-black text-amber-950 uppercase text-xs block mb-1.5">📌 INSTRUCCIONES:</span>
              <p className="text-slate-700 font-medium leading-relaxed">{instrumentData.instrucciones}</p>
            </div>

            <div className="space-y-8">
              {instrumentData.criteriosRubrica && instrumentData.criteriosRubrica.length > 0 && (
                <div className="overflow-x-auto rounded-xl border border-slate-900 page-break-inside-avoid">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-900 text-white font-black text-[11px] uppercase">
                        <th className="border border-slate-900 p-3 w-1/4">Aspecto o Criterio</th>
                        <th className="border border-slate-900 p-3 w-1/6 bg-emerald-800 text-center">Sobresaliente (10-9)</th>
                        <th className="border border-slate-900 p-3 w-1/6 bg-blue-800 text-center">Satisfactorio (8-7)</th>
                        <th className="border border-slate-900 p-3 w-1/6 bg-amber-700 text-center">Básico (6)</th>
                        <th className="border border-slate-900 p-3 w-1/6 bg-rose-800 text-center">Requiere Apoyo (5)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {instrumentData.criteriosRubrica.map((crit, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                          <td className="border border-slate-900 p-3 font-bold text-slate-900"><span className="block text-mex-maroon font-black mb-1">{crit.criterio}</span>{crit.ponderacion && <span className="text-xs text-slate-500">{crit.ponderacion}</span>}</td>
                          <td className="border border-slate-900 p-3 text-slate-700">{crit.sobresaliente}</td>
                          <td className="border border-slate-900 p-3 text-slate-700">{crit.satisfactorio}</td>
                          <td className="border border-slate-900 p-3 text-slate-700">{crit.basico}</td>
                          <td className="border border-slate-900 p-3 text-slate-700">{crit.requiereApoyo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {instrumentData.itemsListaCotejo && instrumentData.itemsListaCotejo.length > 0 && (
                <div className="overflow-x-auto rounded-xl border border-slate-900 page-break-inside-avoid">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-900 text-white font-black text-[11px] uppercase">
                        <th className="border border-slate-900 p-3 w-12 text-center">N°</th>
                        <th className="border border-slate-900 p-3">Indicador de Logro / Criterio Observable</th>
                        <th className="border border-slate-900 p-3 w-20 text-center">CUMPLE</th>
                        <th className="border border-slate-900 p-3 w-24 text-center">NO CUMPLE</th>
                        <th className="border border-slate-900 p-3 w-1/3">Observaciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {instrumentData.itemsListaCotejo.map((item, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                          <td className="border border-slate-900 p-3 text-center font-black text-slate-900">{item.num || idx + 1}</td>
                          <td className="border border-slate-900 p-3 font-bold text-slate-900">{item.indicador || item.criterio}</td>
                          <td className="border border-slate-900 p-3 text-center"><div className="w-5 h-5 border-2 border-slate-900 mx-auto rounded-sm"></div></td>
                          <td className="border border-slate-900 p-3 text-center"><div className="w-5 h-5 border-2 border-slate-900 mx-auto rounded-sm"></div></td>
                          <td className="border border-slate-900 p-3 text-slate-400 italic"></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {instrumentData.itemsEscalaEstimativa && instrumentData.itemsEscalaEstimativa.length > 0 && (
                <div className="overflow-x-auto rounded-xl border border-slate-900 page-break-inside-avoid">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-900 text-white font-black text-[11px] uppercase">
                        <th className="border border-slate-900 p-3 w-12 text-center">N°</th>
                        <th className="border border-slate-900 p-3">Rasgo / Desempeño a Valorar</th>
                        <th className="border border-slate-900 p-3 w-20 text-center">Siempre (4)</th>
                        <th className="border border-slate-900 p-3 w-20 text-center">Casi Siempre (3)</th>
                        <th className="border border-slate-900 p-3 w-20 text-center">A veces (2)</th>
                        <th className="border border-slate-900 p-3 w-20 text-center">Nunca (1)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {instrumentData.itemsEscalaEstimativa.map((item, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                          <td className="border border-slate-900 p-3 text-center font-black text-slate-900">{item.num || idx + 1}</td>
                          <td className="border border-slate-900 p-3 font-bold text-slate-900">{item.aspecto}</td>
                          <td className="border border-slate-900 p-3 text-center"><div className="w-5 h-5 border-2 border-slate-900 mx-auto rounded-sm"></div></td>
                          <td className="border border-slate-900 p-3 text-center"><div className="w-5 h-5 border-2 border-slate-900 mx-auto rounded-sm"></div></td>
                          <td className="border border-slate-900 p-3 text-center"><div className="w-5 h-5 border-2 border-slate-900 mx-auto rounded-sm"></div></td>
                          <td className="border border-slate-900 p-3 text-center"><div className="w-5 h-5 border-2 border-slate-900 mx-auto rounded-sm"></div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {instrumentData.guiaObservacion && instrumentData.guiaObservacion.length > 0 && (
                <div className="space-y-4">
                  {instrumentData.guiaObservacion.map((item, idx) => (
                    <div key={idx} className="border border-slate-300 rounded-xl p-5 bg-slate-50/50 space-y-3 page-break-inside-avoid">
                      <div className="flex items-start gap-3">
                        <span className="bg-slate-900 text-white text-xs font-black px-3 py-1.5 rounded-lg">Punto {item.num || idx + 1}</span>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{item.aspecto}</h4>
                          {item.focoAtencion && <p className="text-xs text-slate-600 font-medium italic mt-1.5">{item.focoAtencion}</p>}
                        </div>
                      </div>
                      <div className="border-b border-dashed border-slate-400 h-8"></div><div className="border-b border-dashed border-slate-400 h-8"></div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border border-slate-300 rounded-xl p-5 bg-slate-50 space-y-3 mt-8 page-break-inside-avoid shadow-sm">
              <span className="font-black text-slate-900 uppercase text-xs block">💬 RETROALIMENTACIÓN FORMATIVA Y ACUERDOS DE MEJORA:</span>
              <p className="text-slate-700 italic text-sm font-medium leading-relaxed">{instrumentData.retroalimentacionFormativa}</p>
              <div className="border-b border-dashed border-slate-400 h-8 mt-4"></div>
              <div className="border-b border-dashed border-slate-400 h-8"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-16 mt-8 text-center text-sm page-break-inside-avoid">
              <div className="flex flex-col items-center">
                <div className="w-64 border-b-2 border-slate-900 pt-2 font-black uppercase text-slate-900 mb-2">{selectedPlan.docenteName}</div>
                <span className="text-xs text-slate-500 font-bold uppercase">Docente Evaluador(a)</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-64 border-b-2 border-slate-900 pt-2 font-black uppercase text-slate-900 mb-2">Firma de Conformidad</div>
                <span className="text-xs text-slate-500 font-bold uppercase">Alumno(a) / Padre de Familia o Tutor</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ESTE ES EL CSS QUE SÍ FUNCIONA EN LA PLANEACIÓN ORIGINAL */}
      <style>{`
        @media print {
          body { background-color: white !important; color: black !important; font-size: 11px !important; }
          header, footer, nav, aside, .print\\:hidden { display: none !important; }
          #documento-resultado { border: none !important; padding: 0 !important; margin: 0 !important; box-shadow: none !important; width: 100% !important; }
          .page-break-inside-avoid { page-break-inside: avoid !important; }
        }
      `}</style>
    </div>
  );
}