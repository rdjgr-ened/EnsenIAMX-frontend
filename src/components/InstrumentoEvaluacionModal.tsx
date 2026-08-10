import React from "react";
import { GeneratedInstrument, CompletePlan } from "../types";
import { Printer, Download, X, Sparkles, Loader2, AlertCircle, CheckCircle2, FileText } from "lucide-react";

interface InstrumentoEvaluacionModalProps {
  isOpen: boolean;
  onClose: () => void;
  instrumentName: string;
  instrumentData: GeneratedInstrument | null;
  isLoading: boolean;
  error: string | null;
  planData: CompletePlan;
  onRegenerate?: () => void;
}

export default function InstrumentoEvaluacionModal({
  isOpen,
  onClose,
  instrumentName,
  instrumentData,
  isLoading,
  error,
  planData,
  onRegenerate,
}: InstrumentoEvaluacionModalProps) {
  if (!isOpen) return null;

  const {
    escuelaName,
    cct,
    docenteName,
    grado,
    grupo,
    campoFormativo,
    disciplina,
    contenido,
    pda,
    plan,
  } = planData;

  const handlePrint = () => {
    try {
      window.print();
    } catch (e) {
      console.error("Print error:", e);
    }
  };

  const handleDownloadHtml = () => {
    if (!instrumentData) return;

    const htmlString = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${instrumentData.titulo.replace(/"/g, '&quot;')} - ${docenteName.replace(/"/g, '&quot;')}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @media print {
      body { padding: 0; background: white; }
      .no-print { display: none !important; }
      .print-area { border: none !important; box-shadow: none !important; padding: 0 !important; }
    }
  </style>
</head>
<body class="bg-slate-100 text-slate-900 p-6 font-sans">
  <div class="no-print max-w-4xl mx-auto mb-4 flex justify-between items-center bg-slate-900 text-white p-4 rounded-lg shadow">
    <span class="font-bold text-sm">Instrumento de Evaluación Formativa - ${instrumentName}</span>
    <button onclick="window.print()" class="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
      Imprimir / Guardar como PDF
    </button>
  </div>

  <div class="print-area max-w-4xl mx-auto bg-white p-8 rounded-lg border-2 border-slate-900 shadow-lg text-xs space-y-6">
    <!-- Encabezado Institucional -->
    <div class="text-center border-b-2 border-slate-900 pb-3">
      <h1 class="font-black text-base uppercase tracking-wider text-slate-950">${escuelaName}</h1>
      <p class="font-bold text-slate-600 text-[10px] uppercase">C.C.T. ${cct} | Ciclo Escolar 2025-2026</p>
      <h2 class="font-black text-sm uppercase text-slate-900 mt-2 bg-slate-100 py-1 border border-slate-300">
        ${instrumentData.titulo}
      </h2>
    </div>

    <!-- Matriz de Identificación -->
    <div class="border-2 border-slate-900 grid grid-cols-2 md:grid-cols-4 gap-2 p-2 bg-slate-50 font-medium">
      <div><span class="font-bold text-slate-600 block text-[9px] uppercase">Docente:</span> ${docenteName}</div>
      <div><span class="font-bold text-slate-600 block text-[9px] uppercase">Grado y Grupo:</span> ${grado} "${grupo}"</div>
      <div><span class="font-bold text-slate-600 block text-[9px] uppercase">Campo Formativo:</span> ${campoFormativo}</div>
      <div><span class="font-bold text-slate-600 block text-[9px] uppercase">Disciplina:</span> ${disciplina}</div>
      <div class="col-span-2"><span class="font-bold text-slate-600 block text-[9px] uppercase">Producto a Evaluar:</span> <strong>${plan.producto}</strong></div>
      <div class="col-span-2"><span class="font-bold text-slate-600 block text-[9px] uppercase">Alumno(a):</span> ____________________________________</div>
      <div class="col-span-4"><span class="font-bold text-slate-600 block text-[9px] uppercase">PDA:</span> ${pda}</div>
    </div>

    <!-- Instrucciones -->
    <div class="bg-amber-50/60 p-3 rounded border border-amber-200">
      <span class="font-black uppercase text-amber-900 text-[10px] block mb-0.5">Instrucciones de Evaluación:</span>
      <p class="text-slate-800 font-medium leading-relaxed">${instrumentData.instrucciones}</p>
    </div>

    <!-- Contenido del Instrumento -->
    ${document.getElementById("instrument-tables-container")?.innerHTML || ""}

    <!-- Retroalimentación -->
    <div class="border border-slate-400 p-3 rounded">
      <span class="font-black uppercase text-slate-900 text-[10px] block mb-1">Retroalimentación Formativa y Sugerencias de Mejora:</span>
      <p class="text-slate-700 italic mb-2">${instrumentData.retroalimentacionFormativa}</p>
      <div class="border-b border-dashed border-slate-400 h-6"></div>
      <div class="border-b border-dashed border-slate-400 h-6"></div>
    </div>

    <!-- Firmas -->
    <div class="grid grid-cols-2 gap-8 pt-8 text-center text-[10px]">
      <div>
        <div class="border-t border-slate-800 pt-1 font-bold uppercase">${docenteName}</div>
        <span class="text-slate-500">Docente Evaluador(a)</span>
      </div>
      <div>
        <div class="border-t border-slate-800 pt-1 font-bold uppercase">Firma de Conformidad</div>
        <span class="text-slate-500">Alumno(a) / Tutor</span>
      </div>
    </div>
  </div>

  <script>
    window.onload = function() {
      // Auto trigger print when opened directly
      setTimeout(function() { window.print(); }, 500);
    }
  </script>
</body>
</html>`;

    const blob = new Blob([htmlString], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Instrumento_${instrumentName.replace(/\s+/g, '_')}_${grado.replace(/\s+/g, '')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:p-0 print:static print:bg-white print:overflow-visible">
      <div className="bg-white rounded-2xl border-2 border-slate-900 shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden print:max-h-none print:shadow-none print:border-none print:rounded-none">
        
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
            {instrumentData && (
              <>
                <button
                  onClick={handleDownloadHtml}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition border border-slate-700"
                  title="Descargar archivo HTML listo para imprimir"
                >
                  <Download className="w-4 h-4 text-mex-gold" />
                  <span className="hidden sm:inline">Descargar HTML</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-mex-maroon hover:bg-mex-maroon/90 text-white rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir (PDF)</span>
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
              title="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contenido Principal con Scroll */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 print:p-0 print:overflow-visible">
          
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
              {onRegenerate && (
                <button
                  onClick={onRegenerate}
                  className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition"
                >
                  Reintentar Generación
                </button>
              )}
            </div>
          )}

          {/* Instrumento Generado - Listo para ver e imprimir */}
          {instrumentData && !isLoading && (
            <div id="print-instrument-area" className="bg-white p-6 sm:p-8 rounded-xl border-2 border-slate-900 shadow-sm font-sans text-slate-900 space-y-6 print:border-none print:p-0 print:shadow-none">
              
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
                  <span className="font-black text-slate-900">{campoFormativo}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-500 uppercase text-[9px] block">DISCIPLINA / ASIGNATURA:</span>
                  <span className="font-black text-slate-900">{disciplina}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="font-bold text-slate-500 uppercase text-[9px] block">PRODUCTO EVIDENCIA EVALUADA:</span>
                  <span className="font-black text-mex-maroon">{plan.producto}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="font-bold text-slate-500 uppercase text-[9px] block">NOMBRE DEL ALUMNO(A):</span>
                  <span className="font-bold text-slate-900 block border-b border-slate-400 mt-1 pb-0.5">
                    __________________________________________________
                  </span>
                </div>
                <div className="md:col-span-4 border-t border-slate-200 pt-2 mt-1">
                  <span className="font-bold text-slate-500 uppercase text-[9px] block">PROCESO DE DESARROLLO DE APRENDIZAJE (PDA):</span>
                  <p className="font-medium text-slate-800 text-[11px] leading-snug">{pda}</p>
                </div>
              </div>

              {/* Instrucciones */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3 text-xs">
                <span className="font-black uppercase text-amber-950 text-[10px] block mb-0.5">
                  📌 INSTRUCCIONES PARA LA EVALUACIÓN:
                </span>
                <p className="text-slate-800 font-medium leading-relaxed">{instrumentData.instrucciones}</p>
              </div>

              {/* TABLAS Y REACTIVOS SEGÚN EL TIPO DE INSTRUMENTO */}
              <div id="instrument-tables-container" className="space-y-6">
                
                {/* 1. RÚBRICA DE EVALUACIÓN */}
                {instrumentData.criteriosRubrica && instrumentData.criteriosRubrica.length > 0 && (
                  <div className="overflow-x-auto border-2 border-slate-900 rounded">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-900 text-white font-black text-[10px] uppercase tracking-wider">
                          <th className="p-2.5 border-r border-slate-700 w-1/5">CRITERIO / DIMENSIÓN</th>
                          <th className="p-2.5 border-r border-slate-700 bg-emerald-900/90 w-1/5 text-center">SOBRESALIENTE (10-9)</th>
                          <th className="p-2.5 border-r border-slate-700 bg-blue-900/90 w-1/5 text-center">SATISFACTORIO (8-7)</th>
                          <th className="p-2.5 border-r border-slate-700 bg-amber-900/90 w-1/5 text-center">BÁSICO (6)</th>
                          <th className="p-2.5 border-r border-slate-700 bg-rose-900/90 w-1/5 text-center">REQUIERE APOYO (5)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-300 font-normal">
                        {instrumentData.criteriosRubrica.map((row, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                            <td className="p-2.5 font-bold text-slate-900 border-r border-slate-300">
                              {row.criterio}
                              {row.ponderacion && (
                                <span className="block text-[9px] text-mex-maroon font-black uppercase mt-0.5">
                                  Ponderación: {row.ponderacion}
                                </span>
                              )}
                            </td>
                            <td className="p-2.5 border-r border-slate-300 text-[11px] leading-relaxed text-slate-800">
                              {row.sobresaliente}
                            </td>
                            <td className="p-2.5 border-r border-slate-300 text-[11px] leading-relaxed text-slate-800">
                              {row.satisfactorio}
                            </td>
                            <td className="p-2.5 border-r border-slate-300 text-[11px] leading-relaxed text-slate-800">
                              {row.basico}
                            </td>
                            <td className="p-2.5 text-[11px] leading-relaxed text-slate-800">
                              {row.requiereApoyo}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 2. LISTA DE COTEJO */}
                {instrumentData.itemsListaCotejo && instrumentData.itemsListaCotejo.length > 0 && (
                  <div className="overflow-x-auto border-2 border-slate-900 rounded">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-900 text-white font-black text-[10px] uppercase tracking-wider">
                          <th className="p-2.5 border-r border-slate-700 text-center w-10">N°</th>
                          <th className="p-2.5 border-r border-slate-700">INDICADOR / CRITERIO OBSERVABLE</th>
                          <th className="p-2.5 border-r border-slate-700 text-center w-20">CUMPLE (SÍ)</th>
                          <th className="p-2.5 border-r border-slate-700 text-center w-20">NO CUMPLE (NO)</th>
                          <th className="p-2.5 text-center w-1/3">OBSERVACIONES / EVIDENCIAS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-300 font-normal">
                        {instrumentData.itemsListaCotejo.map((item, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                            <td className="p-2.5 text-center font-bold text-slate-900 border-r border-slate-300">
                              {item.num || idx + 1}
                            </td>
                            <td className="p-2.5 border-r border-slate-300 text-slate-900 font-medium">
                              <span className="font-bold block text-mex-maroon text-[10px] uppercase">{item.criterio}</span>
                              <span className="text-[11px]">{item.indicador}</span>
                            </td>
                            <td className="p-2.5 text-center border-r border-slate-300 font-bold">
                              <div className="w-5 h-5 border border-slate-800 rounded mx-auto"></div>
                            </td>
                            <td className="p-2.5 text-center border-r border-slate-300 font-bold">
                              <div className="w-5 h-5 border border-slate-800 rounded mx-auto"></div>
                            </td>
                            <td className="p-2.5 text-slate-400 italic">
                              <div className="border-b border-dashed border-slate-300 h-5"></div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 3. ESCALA ESTIMATIVA */}
                {instrumentData.itemsEscalaEstimativa && instrumentData.itemsEscalaEstimativa.length > 0 && (
                  <div className="overflow-x-auto border-2 border-slate-900 rounded">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-900 text-white font-black text-[10px] uppercase tracking-wider">
                          <th className="p-2.5 border-r border-slate-700 text-center w-10">N°</th>
                          <th className="p-2.5 border-r border-slate-700">ASPECTO / CONDUCTA A ESTIMAR</th>
                          <th className="p-2.5 border-r border-slate-700 text-center w-24">EXCELENTE</th>
                          <th className="p-2.5 border-r border-slate-700 text-center w-24">SATISFACTORIO</th>
                          <th className="p-2.5 border-r border-slate-700 text-center w-24">BÁSICO</th>
                          <th className="p-2.5 text-center w-24">REQUIERE APOYO</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-300 font-normal">
                        {instrumentData.itemsEscalaEstimativa.map((item, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                            <td className="p-2.5 text-center font-bold text-slate-900 border-r border-slate-300">
                              {item.num || idx + 1}
                            </td>
                            <td className="p-2.5 border-r border-slate-300 text-slate-900 font-medium">
                              {item.aspecto}
                            </td>
                            <td className="p-2.5 text-center border-r border-slate-300">
                              <div className="w-5 h-5 border border-slate-800 rounded mx-auto"></div>
                            </td>
                            <td className="p-2.5 text-center border-r border-slate-300">
                              <div className="w-5 h-5 border border-slate-800 rounded mx-auto"></div>
                            </td>
                            <td className="p-2.5 text-center border-r border-slate-300">
                              <div className="w-5 h-5 border border-slate-800 rounded mx-auto"></div>
                            </td>
                            <td className="p-2.5 text-center">
                              <div className="w-5 h-5 border border-slate-800 rounded mx-auto"></div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 4. GUÍA DE OBSERVACIÓN */}
                {instrumentData.guiaObservacion && instrumentData.guiaObservacion.length > 0 && (
                  <div className="overflow-x-auto border-2 border-slate-900 rounded">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-900 text-white font-black text-[10px] uppercase tracking-wider">
                          <th className="p-2.5 border-r border-slate-700 text-center w-10">N°</th>
                          <th className="p-2.5 border-r border-slate-700 w-1/3">ASPECTO PEDAGÓGICO / FOCO DE ATENCIÓN</th>
                          <th className="p-2.5 text-center">REGISTRO QUALITATIVO DE OBSERVACIÓN</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-300 font-normal">
                        {instrumentData.guiaObservacion.map((item, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                            <td className="p-2.5 text-center font-bold text-slate-900 border-r border-slate-300">
                              {item.num || idx + 1}
                            </td>
                            <td className="p-2.5 border-r border-slate-300 text-slate-900 font-medium">
                              <span className="font-bold block text-mex-maroon text-[10px] uppercase">{item.aspecto}</span>
                              <span className="text-[11px] text-slate-700">{item.focoAtencion}</span>
                            </td>
                            <td className="p-2.5 space-y-2">
                              <div className="border-b border-dashed border-slate-300 h-5"></div>
                              <div className="border-b border-dashed border-slate-300 h-5"></div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 5. CUESTIONARIO O PRUEBA ESCRITA */}
                {instrumentData.preguntasCuestionario && instrumentData.preguntasCuestionario.length > 0 && (
                  <div className="space-y-4 border-2 border-slate-900 p-4 rounded bg-slate-50/30">
                    <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-2">
                      REACTIVOS Y PREGUNTAS DE EVALUACIÓN
                    </h3>
                    {instrumentData.preguntasCuestionario.map((q, idx) => (
                      <div key={idx} className="bg-white p-3 rounded border border-slate-300 space-y-2">
                        <p className="font-bold text-xs text-slate-900">
                          {q.num || idx + 1}. {q.pregunta}
                        </p>
                        {q.opciones && q.opciones.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4 pt-1">
                            {q.opciones.map((opt, oIdx) => (
                              <div key={oIdx} className="flex items-center gap-2 text-xs font-medium text-slate-800">
                                <div className="w-4 h-4 rounded-full border border-slate-800"></div>
                                <span>{opt}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="pl-4 pt-2 space-y-2">
                            <div className="border-b border-slate-400 h-5 w-full"></div>
                            <div className="border-b border-slate-400 h-5 w-full"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* RETROALIMENTACIÓN FORMATIVA */}
              <div className="border-2 border-slate-900 rounded p-4 bg-slate-50/50 text-xs space-y-2">
                <span className="font-black uppercase text-slate-950 text-[10px] block">
                  💡 RETROALIMENTACIÓN FORMATIVA Y OBSERVACIONES DEL DOCENTE (NEM):
                </span>
                <p className="text-slate-700 italic text-[11px]">{instrumentData.retroalimentacionFormativa}</p>
                <div className="pt-2 space-y-3">
                  <div className="border-b border-dashed border-slate-400 h-5"></div>
                  <div className="border-b border-dashed border-slate-400 h-5"></div>
                  <div className="border-b border-dashed border-slate-400 h-5"></div>
                </div>
              </div>

              {/* FIRMAS DE CONFORMIDAD */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t-2 border-slate-900 text-xs text-center">
                <div className="flex flex-col items-center">
                  <div className="w-48 border-b border-slate-900 mb-1" />
                  <span className="font-black text-slate-900 uppercase block">{docenteName}</span>
                  <span className="text-slate-500 font-bold block text-[9px] uppercase">Profesor(a) Evaluador(a)</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-48 border-b border-slate-900 mb-1" />
                  <span className="font-black text-slate-900 uppercase block">Firma de Conformidad</span>
                  <span className="text-slate-500 font-bold block text-[9px] uppercase">Alumno(a) / Padre de Familia / Tutor</span>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
