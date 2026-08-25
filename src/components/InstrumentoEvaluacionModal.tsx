import React from "react";
import { GeneratedInstrument, CompletePlan } from "../types";
import { X, Sparkles, Loader2, AlertCircle, FileText, CheckCircle2 } from "lucide-react";
import AccionesDocumento from "./AccionesDocumento";

interface InstrumentoEvaluacionModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  instrumentName?: string;
  instrumentData?: GeneratedInstrument | null;
  isLoading?: boolean;
  error?: string | null;
  planData?: Partial<CompletePlan>;
  onRegenerate?: () => void;
}

export default function InstrumentoEvaluacionModal(props: InstrumentoEvaluacionModalProps) {
  const isOpen = props.isOpen ?? false;
  const safeOnClose = props.onClose || (() => {});
  const instrumentName = props.instrumentName || "";
  const instrumentData = props.instrumentData || null;
  const isLoading = props.isLoading ?? false;
  const error = props.error || null;
  const planData = props.planData || {};
  const safeOnRegenerate = props.onRegenerate || (() => {});

  const {
    escuelaName = "Escuela Secundaria General", cct = "10DES0000X", docenteName = "Docente", grado = "1º", grupo = "A", campoFormativo = "", disciplina = "", pda = "", plan = null,
  } = planData;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in print:static print:block print:p-0 print:bg-white print:opacity-100 print:animate-none">
      <div className="bg-white rounded-2xl border-2 border-slate-900 shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden print:max-w-none print:max-h-none print:h-auto print:block print:overflow-visible print:shadow-none print:border-none print:rounded-none">
        
        {/* Barra Superior */}
        <div className="bg-slate-900 p-4 text-white flex items-center justify-between gap-4 print:hidden shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-mex-maroon flex items-center justify-center border border-white/20">
              <Sparkles className="w-5 h-5 text-mex-gold" />
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-wider text-white">Diseño de Instrumento de Evaluación</h2>
              <p className="text-[11px] text-slate-300 font-medium">{instrumentName} • Basado en la Planeación</p>
            </div>
          </div>
          <button onClick={() => safeOnClose()} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-slate-50 print:p-0 print:overflow-visible print:block print:bg-white print:h-auto">
          
          {isLoading && (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
              <Loader2 className="w-16 h-16 text-mex-maroon animate-spin" />
              <h3 className="font-black text-slate-900 text-base uppercase">Gemini estructurando instrumento...</h3>
            </div>
          )}

          {error && !isLoading && (
            <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center space-y-3">
              <AlertCircle className="w-10 h-10 text-red-600 mx-auto" />
              <p className="text-xs text-red-700 max-w-lg mx-auto">{error}</p>
              <button onClick={() => safeOnRegenerate()} className="px-5 py-2 bg-red-700 text-white font-bold text-xs uppercase rounded-xl">Reintentar</button>
            </div>
          )}

          {instrumentData && !isLoading && (
            <div className="space-y-4">
              <div className="print:hidden">
                <AccionesDocumento
                  targetId="instrumento-evaluacion-resultado"
                  tipoRecurso="Instrumento_Evaluacion"
                  customSuffix={`${instrumentName.replace(/[^a-zA-Z0-9]/g, '_')}_${grado.replace(/[^a-zA-Z0-9]/g, '')}`}
                  title={<span className="font-black text-slate-800 text-xs sm:text-sm">{instrumentData.titulo}</span>}
                />
              </div>

              <div id="instrumento-evaluacion-resultado" className="bg-white p-6 sm:p-8 rounded-xl border-2 border-slate-900 shadow-sm font-sans text-slate-900 space-y-6 printable-document print:border-none print:shadow-none print:p-0">
                
                <div className="text-center border-b-2 border-slate-900 pb-4">
                  <h1 className="font-black text-base uppercase tracking-wider text-slate-950">{escuelaName}</h1>
                  <p className="font-extrabold text-mex-maroon text-xs uppercase">C.C.T. {cct} • Ciclo Escolar 2025-2026</p>
                  <div className="mt-3 inline-block bg-slate-900 text-white px-6 py-1.5 rounded-lg">
                    <h2 className="font-black text-xs uppercase tracking-widest text-mex-gold">{instrumentData.titulo}</h2>
                  </div>
                </div>

                <div className="border-2 border-slate-900 rounded p-3 bg-slate-50 text-xs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div><span className="font-bold text-slate-500 uppercase text-[9px] block">DOCENTE:</span><span className="font-black text-slate-900">{docenteName}</span></div>
                  <div><span className="font-bold text-slate-500 uppercase text-[9px] block">GRADO Y GRUPO:</span><span className="font-black text-slate-900">{grado} - "{grupo}"</span></div>
                  <div><span className="font-bold text-slate-500 uppercase text-[9px] block">CAMPO FORMATIVO:</span><span className="font-bold text-slate-900">{campoFormativo}</span></div>
                  <div><span className="font-bold text-slate-500 uppercase text-[9px] block">DISCIPLINA:</span><span className="font-bold text-slate-900">{disciplina}</span></div>
                  <div className="col-span-1 sm:col-span-2"><span className="font-bold text-slate-500 uppercase text-[9px] block">PRODUCTO A EVALUAR:</span><span className="font-black text-mex-maroon">{plan?.producto || "Evidencia"}</span></div>
                  <div className="col-span-1 sm:col-span-2"><span className="font-bold text-slate-500 uppercase text-[9px] block">ALUMNO(A):</span><span className="font-bold text-slate-400">__________________________________________</span></div>
                  <div className="col-span-1 sm:col-span-2 md:col-span-4"><span className="font-bold text-slate-500 uppercase text-[9px] block">PDA:</span><span className="font-medium text-slate-800">{pda}</span></div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs">
                  <span className="font-black text-amber-950 uppercase text-[10px] block mb-1">📌 INSTRUCCIONES:</span>
                  <p className="text-slate-700 font-medium leading-relaxed">{instrumentData.instrucciones}</p>
                </div>

                <div id="instrument-tables-container" className="space-y-4">
                  {instrumentData.criteriosRubrica && instrumentData.criteriosRubrica.length > 0 && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse border border-slate-900 text-xs">
                        <thead>
                          <tr className="bg-slate-900 text-white font-black text-[10px] uppercase">
                            <th className="border border-slate-900 p-2.5 w-1/4">Aspecto o Criterio</th>
                            <th className="border border-slate-900 p-2.5 w-1/6 bg-emerald-800 text-center">Sobresaliente (10-9)</th>
                            <th className="border border-slate-900 p-2.5 w-1/6 bg-blue-800 text-center">Satisfactorio (8-7)</th>
                            <th className="border border-slate-900 p-2.5 w-1/6 bg-amber-700 text-center">Básico (6)</th>
                            <th className="border border-slate-900 p-2.5 w-1/6 bg-rose-800 text-center">Requiere Apoyo (5)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {instrumentData.criteriosRubrica.map((crit, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"} style={{pageBreakInside: 'avoid'}}>
                              <td className="border border-slate-900 p-2.5 font-bold text-slate-900"><span className="block text-mex-maroon font-black text-[11px] mb-0.5">{crit.criterio}</span>{crit.ponderacion && <span className="text-[10px] text-slate-500">{crit.ponderacion}</span>}</td>
                              <td className="border border-slate-900 p-2 text-[10px] text-slate-700">{crit.sobresaliente}</td>
                              <td className="border border-slate-900 p-2 text-[10px] text-slate-700">{crit.satisfactorio}</td>
                              <td className="border border-slate-900 p-2 text-[10px] text-slate-700">{crit.basico}</td>
                              <td className="border border-slate-900 p-2 text-[10px] text-slate-700">{crit.requiereApoyo}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {instrumentData.itemsListaCotejo && instrumentData.itemsListaCotejo.length > 0 && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse border border-slate-900 text-xs">
                        <thead>
                          <tr className="bg-slate-900 text-white font-black text-[10px] uppercase">
                            <th className="border border-slate-900 p-2.5 w-10 text-center">N°</th>
                            <th className="border border-slate-900 p-2.5">Indicador de Logro / Criterio Observable</th>
                            <th className="border border-slate-900 p-2.5 w-16 text-center">CUMPLE</th>
                            <th className="border border-slate-900 p-2.5 w-20 text-center">NO CUMPLE</th>
                            <th className="border border-slate-900 p-2.5 w-1/3">Observaciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {instrumentData.itemsListaCotejo.map((item, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"} style={{pageBreakInside: 'avoid'}}>
                              <td className="border border-slate-900 p-2.5 text-center font-black text-slate-900">{item.num || idx + 1}</td>
                              <td className="border border-slate-900 p-2.5 font-bold text-slate-900">{item.indicador || item.criterio}</td>
                              <td className="border border-slate-900 p-2.5 text-center"><div className="w-4 h-4 border-2 border-slate-900 mx-auto rounded-xs"></div></td>
                              <td className="border border-slate-900 p-2.5 text-center"><div className="w-4 h-4 border-2 border-slate-900 mx-auto rounded-xs"></div></td>
                              <td className="border border-slate-900 p-2 text-[10px] text-slate-400 italic"></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {instrumentData.itemsEscalaEstimativa && instrumentData.itemsEscalaEstimativa.length > 0 && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse border border-slate-900 text-xs">
                        <thead>
                          <tr className="bg-slate-900 text-white font-black text-[10px] uppercase">
                            <th className="border border-slate-900 p-2.5 w-10 text-center">N°</th>
                            <th className="border border-slate-900 p-2.5">Rasgo / Desempeño a Valorar</th>
                            <th className="border border-slate-900 p-2 w-14 text-center">Siempre (4)</th>
                            <th className="border border-slate-900 p-2 w-14 text-center">Casi Siempre (3)</th>
                            <th className="border border-slate-900 p-2 w-14 text-center">A veces (2)</th>
                            <th className="border border-slate-900 p-2 w-14 text-center">Nunca (1)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {instrumentData.itemsEscalaEstimativa.map((item, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"} style={{pageBreakInside: 'avoid'}}>
                              <td className="border border-slate-900 p-2.5 text-center font-black text-slate-900">{item.num || idx + 1}</td>
                              <td className="border border-slate-900 p-2.5 font-bold text-slate-900">{item.aspecto}</td>
                              <td className="border border-slate-900 p-2 text-center"><div className="w-4 h-4 border border-slate-600 mx-auto rounded-xs"></div></td>
                              <td className="border border-slate-900 p-2 text-center"><div className="w-4 h-4 border border-slate-600 mx-auto rounded-xs"></div></td>
                              <td className="border border-slate-900 p-2 text-center"><div className="w-4 h-4 border border-slate-600 mx-auto rounded-xs"></div></td>
                              <td className="border border-slate-900 p-2 text-center"><div className="w-4 h-4 border border-slate-600 mx-auto rounded-xs"></div></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {instrumentData.guiaObservacion && instrumentData.guiaObservacion.length > 0 && (
                    <div className="space-y-4">
                      {instrumentData.guiaObservacion.map((item, idx) => (
                        <div key={idx} className="border-2 border-slate-900 rounded p-3 bg-slate-50/50 space-y-2 break-inside-avoid">
                          <div className="flex items-start gap-2">
                            <span className="bg-slate-900 text-white text-[10px] font-black px-2 py-0.5 rounded">Punto {item.num || idx + 1}</span>
                            <div>
                              <h4 className="font-bold text-slate-900 text-xs">{item.aspecto}</h4>
                              {item.focoAtencion && <p className="text-[11px] text-slate-600 font-medium italic mt-0.5">{item.focoAtencion}</p>}
                            </div>
                          </div>
                          <div className="border-b border-dashed border-slate-400 h-6"></div><div className="border-b border-dashed border-slate-400 h-6"></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-2 border-slate-900 rounded p-4 bg-slate-50 space-y-2 break-inside-avoid">
                  <span className="font-black text-slate-900 uppercase text-[10px] block">💬 RETROALIMENTACIÓN FORMATIVA Y ACUERDOS DE MEJORA:</span>
                  <p className="text-slate-700 italic text-[11px] font-medium leading-relaxed">{instrumentData.retroalimentacionFormativa}</p>
                </div>

                <div className="grid grid-cols-2 gap-12 pt-8 text-center text-xs break-inside-avoid">
                  <div><div className="border-t-2 border-slate-900 pt-1.5 font-black uppercase text-slate-900">{docenteName}</div><span className="text-[10px] text-slate-500 font-bold uppercase">Docente Evaluador(a)</span></div>
                  <div><div className="border-t-2 border-slate-900 pt-1.5 font-black uppercase text-slate-900">Firma de Conformidad</div><span className="text-[10px] text-slate-500 font-bold uppercase">Alumno(a) / Padre de Familia o Tutor</span></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}