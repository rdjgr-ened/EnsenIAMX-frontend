import React, { useEffect } from "react";
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

  // UX: Al abrirse como página independiente, nos aseguramos de estar hasta arriba
  useEffect(() => {
    if (isOpen) {
      window.scrollTo(0, 0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    // ESTRUCTURA DE PÁGINA NORMAL (Sin "fixed", sin "inset-0", sin bloqueos)
    <div className="w-full min-h-screen bg-slate-50 pb-16 animate-fade-in print:bg-white print:pb-0 print:m-0">
      
      {/* HEADER DE LA PÁGINA INDEPENDIENTE (Oculto al imprimir) */}
      <div className="bg-slate-900 p-4 sm:p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-mex-maroon flex items-center justify-center border border-white/20 shrink-0">
            <Sparkles className="w-6 h-6 text-mex-gold" />
          </div>
          <div>
            <h2 className="font-black text-base sm:text-lg uppercase tracking-wider flex items-center gap-2">
              <span>Diseño de Instrumento de Evaluación</span>
            </h2>
            <p className="text-sm text-slate-300 font-medium">
              {instrumentName} • Basado en el PDA de la Planeación
            </p>
          </div>
        </div>

        <button
          onClick={() => safeOnClose()}
          className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition cursor-pointer font-bold text-sm flex items-center gap-2"
          title="Regresar a la planeación"
        >
          <X className="w-5 h-5" />
          <span>Cerrar y volver</span>
        </button>
      </div>

      {/* CONTENEDOR PRINCIPAL QUE FLUYE NATURALMENTE */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 mt-8 print:max-w-none print:px-0 print:mt-0">
        
        {isLoading && (
          <div className="py-32 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-slate-200 border-t-mex-maroon animate-spin"></div>
              <Sparkles className="w-8 h-8 text-mex-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-lg uppercase tracking-wider">
                Gemini está estructurando el instrumento...
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto mt-2">
                Diseñando la matriz de criterios para "{instrumentName}" con total coherencia al PDA, producto y metodología NEM.
              </p>
            </div>
          </div>
        )}

        {error && !isLoading && (
          <div className="p-8 bg-red-50 border border-red-200 rounded-2xl text-center space-y-4 mt-8">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto" />
            <h3 className="font-black text-red-900 text-lg uppercase">Ocurrió un error al generar el instrumento</h3>
            <p className="text-sm text-red-700 max-w-lg mx-auto">{error}</p>
            <button
              onClick={() => safeOnRegenerate()}
              className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition cursor-pointer"
            >
              Reintentar Generación
            </button>
          </div>
        )}

        {instrumentData && !isLoading && (
          <div className="space-y-6">
            <div className="print:hidden">
              <AccionesDocumento
                targetId="instrumento-evaluacion-resultado"
                tipoRecurso="Instrumento_Evaluacion"
                customSuffix={`${instrumentName.replace(/[^a-zA-Z0-9]/g, '_')}_${grado.replace(/[^a-zA-Z0-9]/g, '')}`}
                title={
                  <span className="font-black text-slate-800 text-sm">
                    {instrumentData.titulo}
                  </span>
                }
              />
            </div>

            <div id="instrumento-evaluacion-resultado"
              className="bg-white p-6 sm:p-12 rounded-2xl border-2 border-slate-900 shadow-sm font-sans text-slate-900 space-y-8 printable-document print:border-none print:shadow-none print:p-0"
            >
              {/* Encabezado del Instrumento */}
              <div className="text-center border-b-2 border-slate-900 pb-5">
                <h1 className="font-black text-xl uppercase tracking-wider text-slate-950">{escuelaName}</h1>
                <p className="font-extrabold text-mex-maroon text-sm uppercase mt-1">
                  C.C.T. {cct} • Ciclo Escolar 2025-2026
                </p>
                <div className="mt-4 inline-block bg-slate-900 text-white px-8 py-2 rounded-lg">
                  <h2 className="font-black text-sm uppercase tracking-widest text-mex-gold">
                    {instrumentData.titulo}
                  </h2>
                </div>
              </div>

              {/* Ficha de Datos / Contexto Curricular */}
              <div className="border-2 border-slate-900 rounded-xl p-4 bg-slate-50 text-xs sm:text-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="font-bold text-slate-500 uppercase text-[10px] block mb-0.5">DOCENTE EVALUADOR:</span>
                  <span className="font-black text-slate-900">{docenteName}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-500 uppercase text-[10px] block mb-0.5">GRADO Y GRUPO:</span>
                  <span className="font-black text-slate-900">{grado} - Grupo "{grupo}"</span>
                </div>
                <div>
                  <span className="font-bold text-slate-500 uppercase text-[10px] block mb-0.5">CAMPO FORMATIVO:</span>
                  <span className="font-bold text-slate-900">{campoFormativo}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-500 uppercase text-[10px] block mb-0.5">DISCIPLINA / ASIGNATURA:</span>
                  <span className="font-bold text-slate-900">{disciplina}</span>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <span className="font-bold text-slate-500 uppercase text-[10px] block mb-0.5">PRODUCTO CENTRAL A EVALUAR:</span>
                  <span className="font-black text-mex-maroon">{plan?.producto || "Evidencia de aprendizaje"}</span>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <span className="font-bold text-slate-500 uppercase text-[10px] block mb-0.5">ALUMNO(A) EVALUADO:</span>
                  <span className="font-bold text-slate-400 block pt-2 border-b border-slate-400"></span>
                </div>
                <div className="col-span-1 sm:col-span-2 md:col-span-4">
                  <span className="font-bold text-slate-500 uppercase text-[10px] block mb-0.5">PROCESO DE DESARROLLO DE APRENDIZAJE (PDA):</span>
                  <span className="font-medium text-slate-800">{pda}</span>
                </div>
              </div>

              {/* Instrucciones */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm">
                <span className="font-black text-amber-950 uppercase text-xs block mb-1.5">
                  📌 INSTRUCCIONES DE APLICACIÓN:
                </span>
                <p className="text-slate-700 font-medium leading-relaxed">{instrumentData.instrucciones}</p>
              </div>

              {/* TABLAS SEGÚN TIPO DE INSTRUMENTO */}
              <div id="instrument-tables-container" className="space-y-6">
                {/* TIPO: RÚBRICA */}
                {instrumentData.criteriosRubrica && instrumentData.criteriosRubrica.length > 0 && (
                  <div className="overflow-x-auto rounded-xl border border-slate-900">
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
                          <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"} style={{pageBreakInside: 'avoid'}}>
                            <td className="border border-slate-900 p-3 font-bold text-slate-900">
                              <span className="block text-mex-maroon font-black mb-1">
                                {crit.criterio}
                              </span>
                              {crit.ponderacion && (
                                <span className="text-xs text-slate-500 font-semibold">{crit.ponderacion}</span>
                              )}
                            </td>
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

                {/* TIPO: LISTA DE COTEJO */}
                {instrumentData.itemsListaCotejo && instrumentData.itemsListaCotejo.length > 0 && (
                  <div className="overflow-x-auto rounded-xl border border-slate-900">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-slate-900 text-white font-black text-[11px] uppercase">
                          <th className="border border-slate-900 p-3 w-12 text-center">N°</th>
                          <th className="border border-slate-900 p-3">Indicador de Logro / Criterio Observable</th>
                          <th className="border border-slate-900 p-3 w-20 text-center">CUMPLE</th>
                          <th className="border border-slate-900 p-3 w-24 text-center">NO CUMPLE</th>
                          <th className="border border-slate-900 p-3 w-1/3">Observaciones / Evidencia</th>
                        </tr>
                      </thead>
                      <tbody>
                        {instrumentData.itemsListaCotejo.map((item, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"} style={{pageBreakInside: 'avoid'}}>
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

                {/* TIPO: ESCALA ESTIMATIVA */}
                {instrumentData.itemsEscalaEstimativa && instrumentData.itemsEscalaEstimativa.length > 0 && (
                  <div className="overflow-x-auto rounded-xl border border-slate-900">
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
                          <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"} style={{pageBreakInside: 'avoid'}}>
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

                {/* TIPO: GUÍA DE OBSERVACIÓN */}
                {instrumentData.guiaObservacion && instrumentData.guiaObservacion.length > 0 && (
                  <div className="space-y-4">
                    {instrumentData.guiaObservacion.map((item, idx) => (
                      <div key={idx} className="border-2 border-slate-900 rounded-xl p-4 bg-slate-50/50 space-y-3 break-inside-avoid">
                        <div className="flex items-start gap-3">
                          <span className="bg-slate-900 text-white text-xs font-black px-2.5 py-1 rounded">
                            Punto {item.num || idx + 1}
                          </span>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{item.aspecto}</h4>
                            {item.focoAtencion && (
                              <p className="text-xs text-slate-600 font-medium italic mt-1">
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
              <div className="border-2 border-slate-900 rounded-xl p-5 bg-slate-50 space-y-3 break-inside-avoid">
                <span className="font-black text-slate-900 uppercase text-xs block">
                  💬 RETROALIMENTACIÓN FORMATIVA Y ACUERDOS DE MEJORA:
                </span>
                <p className="text-slate-700 italic text-sm font-medium leading-relaxed">
                  {instrumentData.retroalimentacionFormativa}
                </p>
                <div className="border-b border-dashed border-slate-400 h-6"></div>
                <div className="border-b border-dashed border-slate-400 h-6"></div>
              </div>

              {/* Firmas Institucionales */}
              <div className="grid grid-cols-2 gap-16 pt-12 text-center text-sm break-inside-avoid">
                <div>
                  <div className="border-t-2 border-slate-900 pt-2 font-black uppercase text-slate-900">
                    {docenteName}
                  </div>
                  <span className="text-xs text-slate-500 font-bold uppercase">Docente Evaluador(a)</span>
                </div>
                <div>
                  <div className="border-t-2 border-slate-900 pt-2 font-black uppercase text-slate-900">
                    Firma de Conformidad
                  </div>
                  <span className="text-xs text-slate-500 font-bold uppercase">Alumno(a) / Padre de Familia o Tutor</span>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* 
         * ESTE CSS GLOBAL SE ACTIVA CUANDO SE ABRE EL INSTRUMENTO.
         * AL SER AHORA UNA PÁGINA INDEPENDIENTE, CHROME YA NO TIENE EXCUSAS
         * Y PAGINARÁ LIBREMENTE TODO EL CONTENIDO.
         */
        @media print {
          /* 1. Ocultamos la planeación de fondo por completo */
          #documento-resultado { display: none !important; }
          
          /* 2. Normalizamos la estructura principal de la app */
          html, body, #root { 
            height: auto !important; 
            overflow: visible !important; 
            background-color: white !important; 
          }
          
          /* 3. Evitamos el bug de Chrome de la opacidad 0 */
          * { 
            animation: none !important; 
            transition: none !important; 
          }
        }
      `}} />
    </div>
  );
}