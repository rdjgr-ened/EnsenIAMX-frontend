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

  if (!isOpen) return null;

  const {
    escuelaName = "Escuela Secundaria General",
    cct = "10DES0000X",
    docenteName = "Docente",
    grado = "1º",
    grupo = "A",
    campoFormativo = "",
    disciplina = "",
    contenido = "",
    pda = "",
    plan = null,
  } = planData;

  return (
    <div id="instrumento-modal-wrapper" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in print:absolute print:inset-auto print:top-0 print:left-0 print:block print:w-full print:bg-transparent print:p-0 print:m-0 print:opacity-100 print:animate-none">
      <div className="bg-white rounded-2xl border-2 border-slate-900 shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden print:max-w-none print:w-full print:max-h-none print:h-auto print:shadow-none print:border-none print:rounded-none print:overflow-visible print:block">
        
        {/* Barra Superior - Oculta en impresión */}
        <div className="bg-slate-900 p-4 text-white flex items-center justify-between gap-4 print:hidden shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-mex-maroon flex items-center justify-center border border-white/20">
              <Sparkles className="w-5 h-5 text-mex-gold" />
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                <span>Diseño de Instrumento de Evaluación Formativa</span>
              </h2>
              <p className="text-[11px] text-slate-300 font-medium">
                {instrumentName} • Basado en el PDA y Producto de la Planeación
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => safeOnClose()}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
              title="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contenido Principal con Scroll */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-slate-50 print:p-0 print:bg-white print:overflow-visible print:block print:h-auto">
          
          {/* Estado de Carga */}
          {isLoading && (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-mex-maroon animate-spin"></div>
                <Sparkles className="w-6 h-6 text-mex-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base uppercase tracking-wider">
                  Gemini está estructurando el instrumento...
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                  Diseñando la matriz de criterios para "{instrumentName}" con total coherencia al PDA, producto y metodología NEM.
                </p>
              </div>
            </div>
          )}

          {/* Estado de Error */}
          {error && !isLoading && (
            <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center space-y-3">
              <AlertCircle className="w-10 h-10 text-red-600 mx-auto" />
              <h3 className="font-black text-red-900 text-sm uppercase">Ocurrió un error al generar el instrumento</h3>
              <p className="text-xs text-red-700 max-w-lg mx-auto">{error}</p>
              <button
                onClick={() => safeOnRegenerate()}
                className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
              >
                Reintentar Generación
              </button>
            </div>
          )}

          {/* Instrumento Generado - Listo para ver e imprimir */}
          {instrumentData && !isLoading && (
            <div className="space-y-4">
              <div className="print:hidden">
                <AccionesDocumento
                  targetId="instrumento-evaluacion-resultado"
                  tipoRecurso="Instrumento_Evaluacion"
                  customSuffix={`${instrumentName.replace(/[^a-zA-Z0-9]/g, '_')}_${grado.replace(/[^a-zA-Z0-9]/g, '')}`}
                  title={
                    <span className="flex items-center gap-1.5 font-black text-slate-800 text-xs sm:text-sm">
                      <span>{instrumentData.titulo}</span>
                    </span>
                  }
                />
              </div>

              <div id="instrumento-evaluacion-resultado"
                className="bg-white p-6 sm:p-8 rounded-xl border-2 border-slate-900 shadow-sm font-sans text-slate-900 space-y-6 printable-document print:border-none print:shadow-none print:p-0"
              >
                {/* Encabezado del Instrumento */}
                <div className="text-center border-b-2 border-slate-900 pb-4">
                  <h1 className="font-black text-base uppercase tracking-wider text-slate-950">{escuelaName}</h1>
                  <p className="font-extrabold text-mex-maroon text-xs uppercase">
                    C.C.T. {cct} • Ciclo Escolar 2025-2026
                  </p>
                  <div className="mt-3 inline-block bg-slate-900 text-white px-6 py-1.5 rounded-lg">
                    <h2 className="font-black text-xs uppercase tracking-widest text-mex-gold">
                      {instrumentData.titulo}
                    </h2>
                  </div>
                </div>

                {/* Ficha de Datos / Contexto Curricular */}
                <div className="border-2 border-slate-900 rounded p-3 bg-slate-50 text-xs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <span className="font-bold text-slate-500 uppercase text-[9px] block">DOCENTE EVALUADOR:</span>
                    <span className="font-black text-slate-900">{docenteName}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 uppercase text-[9px] block">GRADO Y GRUPO:</span>
                    <span className="font-black text-slate-900">{grado} - Grupo "{grupo}"</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 uppercase text-[9px] block">CAMPO FORMATIVO:</span>
                    <span className="font-bold text-slate-900">{campoFormativo}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 uppercase text-[9px] block">DISCIPLINA / ASIGNATURA:</span>
                    <span className="font-bold text-slate-900">{disciplina}</span>
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <span className="font-bold text-slate-500 uppercase text-[9px] block">PRODUCTO CENTRAL A EVALUAR:</span>
                    <span className="font-black text-mex-maroon">{plan?.producto || "Evidencia de aprendizaje"}</span>
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <span className="font-bold text-slate-500 uppercase text-[9px] block">ALUMNO(A) EVALUADO:</span>
                    <span className="font-bold text-slate-400">__________________________________________</span>
                  </div>
                  <div className="col-span-1 sm:col-span-2 md:col-span-4">
                    <span className="font-bold text-slate-500 uppercase text-[9px] block">PROCESO DE DESARROLLO DE APRENDIZAJE (PDA):</span>
                    <span className="font-medium text-slate-800">{pda}</span>
                  </div>
                </div>

                {/* Instrucciones */}
                <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs">
                  <span className="font-black text-amber-950 uppercase text-[10px] block mb-1">
                    📌 INSTRUCCIONES DE APLICACIÓN:
                  </span>
                  <p className="text-slate-700 font-medium leading-relaxed">{instrumentData.instrucciones}</p>
                </div>

                {/* TABLAS SEGÚN TIPO DE INSTRUMENTO */}
                <div id="instrument-tables-container" className="space-y-4">
                  {/* TIPO: RÚBRICA */}
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
                            <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                              <td className="border border-slate-900 p-2.5 font-bold text-slate-900">
                                <span className="block text-mex-maroon font-black text-[11px] mb-0.5">
                                  {crit.criterio}
                                </span>
                                {crit.ponderacion && (
                                  <span className="text-[10px] text-slate-500 font-semibold">{crit.ponderacion}</span>
                                )}
                              </td>
                              <td className="border border-slate-900 p-2 text-[10px] text-slate-700 leading-tight">
                                {crit.sobresaliente}
                              </td>
                              <td className="border border-slate-900 p-2 text-[10px] text-slate-700 leading-tight">
                                {crit.satisfactorio}
                              </td>
                              <td className="border border-slate-900 p-2 text-[10px] text-slate-700 leading-tight">
                                {crit.basico}
                              </td>
                              <td className="border border-slate-900 p-2 text-[10px] text-slate-700 leading-tight">
                                {crit.requiereApoyo}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* TIPO: LISTA DE COTEJO */}
                  {instrumentData.itemsListaCotejo && instrumentData.itemsListaCotejo.length > 0 && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse border border-slate-900 text-xs">
                        <thead>
                          <tr className="bg-slate-900 text-white font-black text-[10px] uppercase">
                            <th className="border border-slate-900 p-2.5 w-10 text-center">N°</th>
                            <th className="border border-slate-900 p-2.5">Indicador de Logro / Criterio Observable</th>
                            <th className="border border-slate-900 p-2.5 w-16 text-center">CUMPLE</th>
                            <th className="border border-slate-900 p-2.5 w-20 text-center">NO CUMPLE</th>
                            <th className="border border-slate-900 p-2.5 w-1/3">Observaciones / Evidencia</th>
                          </tr>
                        </thead>
                        <tbody>
                          {instrumentData.itemsListaCotejo.map((item, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                              <td className="border border-slate-900 p-2.5 text-center font-black text-slate-900">
                                {item.num || idx + 1}
                              </td>
                              <td className="border border-slate-900 p-2.5 font-bold text-slate-900">
                                {item.indicador || item.criterio}
                              </td>
                              <td className="border border-slate-900 p-2.5 text-center">
                                <div className="w-4 h-4 border-2 border-slate-900 mx-auto rounded-xs"></div>
                              </td>
                              <td className="border border-slate-900 p-2.5 text-center">
                                <div className="w-4 h-4 border-2 border-slate-900 mx-auto rounded-xs"></div>
                              </td>
                              <td className="border border-slate-900 p-2 text-[10px] text-slate-400 italic">
                                Espacio para observaciones del docente...
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* TIPO: ESCALA ESTIMATIVA */}
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
                            <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                              <td className="border border-slate-900 p-2.5 text-center font-black text-slate-900">
                                {item.num || idx + 1}
                              </td>
                              <td className="border border-slate-900 p-2.5 font-bold text-slate-900">
                                {item.aspecto}
                              </td>
                              <td className="border border-slate-900 p-2 text-center">
                                <div className="w-4 h-4 border border-slate-600 mx-auto rounded-xs"></div>
                              </td>
                              <td className="border border-slate-900 p-2 text-center">
                                <div className="w-4 h-4 border border-slate-600 mx-auto rounded-xs"></div>
                              </td>
                              <td className="border border-slate-900 p-2 text-center">
                                <div className="w-4 h-4 border border-slate-600 mx-auto rounded-xs"></div>
                              </td>
                              <td className="border border-slate-900 p-2 text-center">
                                <div className="w-4 h-4 border border-slate-600 mx-auto rounded-xs"></div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* TIPO: GUÍA DE OBSERVACIÓN */}
                  {instrumentData.guiaObservacion && instrumentData.guiaObservacion.length > 0 && (
                    <div className="space-y-4">
                      {instrumentData.guiaObservacion.map((item, idx) => (
                        <div key={idx} className="border-2 border-slate-900 rounded p-3 bg-slate-50/50 space-y-2">
                          <div className="flex items-start gap-2">
                            <span className="bg-slate-900 text-white text-[10px] font-black px-2 py-0.5 rounded">
                              Punto {item.num || idx + 1}
                            </span>
                            <div>
                              <h4 className="font-bold text-slate-900 text-xs">{item.aspecto}</h4>
                              {item.focoAtencion && (
                                <p className="text-[11px] text-slate-600 font-medium italic mt-0.5">
                                  Foco de atención: {item.focoAtencion}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="border-b border-dashed border-slate-400 h-6"></div>
                          <div className="border-b border-dashed border-slate-400 h-6"></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Retroalimentación Formativa y Sugerencias de Mejora */}
                <div className="border-2 border-slate-900 rounded p-4 bg-slate-50 space-y-2">
                  <span className="font-black text-slate-900 uppercase text-[10px] block">
                    💬 RETROALIMENTACIÓN FORMATIVA Y ACUERDOS DE MEJORA:
                  </span>
                  <p className="text-slate-700 italic text-[11px] font-medium leading-relaxed">
                    {instrumentData.retroalimentacionFormativa}
                  </p>
                  <div className="border-b border-dashed border-slate-400 h-6"></div>
                  <div className="border-b border-dashed border-slate-400 h-6"></div>
                </div>

                {/* Firmas Institucionales */}
                <div className="grid grid-cols-2 gap-12 pt-8 text-center text-xs">
                  <div>
                    <div className="border-t-2 border-slate-900 pt-1.5 font-black uppercase text-slate-900">
                      {docenteName}
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Docente Evaluador(a)</span>
                  </div>
                  <div>
                    <div className="border-t-2 border-slate-900 pt-1.5 font-black uppercase text-slate-900">
                      Firma de Conformidad
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Alumno(a) / Padre de Familia o Tutor</span>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          /* 1. Ocultar documento de fondo (Planeacion) para que no ocupe hojas extras */
          #documento-resultado { display: none !important; }
          
          /* 2. Forzar que Chrome permita alturas ilimitadas */
          html, body, #root { height: auto !important; overflow: visible !important; }
          
          /* 3. MATAR LA ANIMACIÓN FADE-IN que causa la hoja blanca */
          * { animation: none !important; transition: none !important; opacity: 1 !important; color: black !important; }
        }
      `}} />
    </div>
  );
}