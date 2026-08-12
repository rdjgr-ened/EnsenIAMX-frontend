import React from "react";
import { GeneratedWorksheet } from "../types";
import { FileText, Printer, X, Loader2, Sparkles, AlertCircle, Download } from "lucide-react";

interface HojaDeTrabajoModalProps {
  isOpen: boolean;
  onClose: () => void;
  worksheet: GeneratedWorksheet | null;
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
  meta: {
    escuelaName: string;
    cct: string;
    docenteName: string;
    grado: string;
    grupo: string;
    campoFormativo: string;
    disciplina: string;
    pda: string;
    sesionNumero: number;
    sesionTitulo: string;
  };
}

export default function HojaDeTrabajoModal({
  isOpen,
  onClose,
  worksheet,
  isLoading,
  error,
  onRetry,
  meta,
}: HojaDeTrabajoModalProps) {
  if (!isOpen) return null;

  const buildHtmlDoc = () => {
    if (!worksheet) return "";

    const renderLines = (count: number = 3) => {
      let linesHtml = "";
      for (let i = 0; i < count; i++) {
        linesHtml += `<div style="border-bottom: 1px dashed #94a3b8; height: 22px; margin-top: 4px;"></div>`;
      }
      return linesHtml;
    };

    return `<!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset='utf-8'>
        <title>${worksheet.titulo}</title>
        <style>
          @page { size: letter; margin: 1.5cm; }
          body { font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; margin: 20px; color: #0f172a; line-height: 1.4; }
          .header-box { border: 2px solid #0f172a; padding: 12px; margin-bottom: 16px; border-radius: 4px; background-color: #f8fafc; }
          .header-title { text-align: center; font-size: 16pt; font-weight: bold; color: #6a1b31; text-transform: uppercase; margin-bottom: 4px; }
          .header-sub { text-align: center; font-size: 11pt; font-weight: bold; color: #334e68; margin-bottom: 12px; }
          table.meta-table { width: 100%; border-collapse: collapse; margin-top: 8px; border: 1px solid #0f172a; font-size: 9.5pt; }
          table.meta-table td { border: 1px solid #0f172a; padding: 6px 8px; }
          .label { font-weight: bold; color: #475569; text-transform: uppercase; font-size: 8pt; display: block; }
          .val { font-weight: bold; color: #0f172a; }
          .instructions-box { border: 1px solid #cbd5e1; background-color: #f1f5f9; padding: 10px; border-radius: 4px; margin-bottom: 16px; font-size: 10pt; font-style: italic; }
          .section-title { font-size: 12pt; font-weight: bold; color: #6a1b31; text-transform: uppercase; border-bottom: 2px solid #6a1b31; padding-bottom: 2px; margin-top: 18px; margin-bottom: 8px; page-break-after: avoid; }
          .section-instr { font-size: 9.5pt; color: #475569; font-weight: bold; margin-bottom: 10px; }
          .exercise-card { border: 1px solid #cbd5e1; padding: 10px; margin-bottom: 12px; border-radius: 4px; background-color: #ffffff; page-break-inside: avoid; }
          .ex-num { font-weight: bold; color: #6a1b31; }
          .ex-text { font-size: 10.5pt; color: #0f172a; font-weight: bold; margin-bottom: 6px; }
          .aux-text { background-color: #f8fafc; border-left: 3px solid #334e68; padding: 8px; margin: 6px 0; font-size: 9.5pt; color: #334e68; }
          .ticket-box { border: 2px dashed #6a1b31; background-color: #fffaf5; padding: 12px; border-radius: 6px; margin-top: 20px; page-break-inside: avoid; }
          .ticket-title { font-weight: bold; color: #9a3412; font-size: 11pt; text-transform: uppercase; margin-bottom: 4px; }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header-box">
          <div class="header-title">${worksheet.titulo}</div>
          <div class="header-sub">Sesión ${meta.sesionNumero}: ${meta.sesionTitulo} | ${meta.disciplina}</div>
          
          <table class="meta-table">
            <tr>
              <td style="width: 50%;"><span class="label">Escuela:</span> <span class="val">${meta.escuelaName} (C.C.T. ${meta.cct})</span></td>
              <td style="width: 50%;"><span class="label">Docente:</span> <span class="val">${meta.docenteName}</span></td>
            </tr>
            <tr>
              <td><span class="label">Nombre del Alumno(a):</span> <span class="val">_______________________________________________</span></td>
              <td><span class="label">Grado y Grupo:</span> <span class="val">${meta.grado} - Grupo "${meta.grupo}"</span></td>
            </tr>
            <tr>
              <td><span class="label">Fecha de Aplicación:</span> <span class="val">____ / ____ / 2026</span></td>
              <td><span class="label">Campo Formativo:</span> <span class="val">${meta.campoFormativo}</span></td>
            </tr>
            <tr>
              <td colspan="2"><span class="label">PDA (Proceso de Aprendizaje):</span> <span class="val">${meta.pda}</span></td>
            </tr>
          </table>
        </div>

        <div class="instructions-box">
          <strong>Instrucciones Generales:</strong> ${worksheet.instruccionesGenerales}
        </div>

        <!-- SECCIÓN I: INICIO -->
        <div class="section-title">${worksheet.seccionInicio.titulo}</div>
        <div class="section-instr">${worksheet.seccionInicio.instrucciones}</div>
        ${worksheet.seccionInicio.ejercicios.map(ex => `
          <div class="exercise-card">
            <div class="ex-text"><span class="ex-num">${ex.numero}.</span> ${ex.preguntaOInstruccion}</div>
            ${renderLines(ex.lineasDeRespuesta || 3)}
          </div>
        `).join('')}

        <!-- SECCIÓN II: DESARROLLO -->
        <div class="section-title">${worksheet.seccionDesarrollo.titulo}</div>
        <div class="section-instr">${worksheet.seccionDesarrollo.instrucciones}</div>
        ${worksheet.seccionDesarrollo.ejercicios.map(ex => `
          <div class="exercise-card">
            <div class="ex-text"><span class="ex-num">${ex.numero}.</span> ${ex.preguntaOInstruccion}</div>
            ${ex.textoOAuxiliar ? `<div class="aux-text">${ex.textoOAuxiliar}</div>` : ''}
            ${renderLines(ex.lineasDeRespuesta || 4)}
          </div>
        `).join('')}

        <!-- SECCIÓN III: CIERRE -->
        <div class="section-title">${worksheet.seccionCierre.titulo}</div>
        <div class="section-instr">${worksheet.seccionCierre.instrucciones}</div>
        ${worksheet.seccionCierre.ejercicios.map(ex => `
          <div class="exercise-card">
            <div class="ex-text"><span class="ex-num">${ex.numero}.</span> ${ex.preguntaOInstruccion}</div>
            ${renderLines(ex.lineasDeRespuesta || 3)}
          </div>
        `).join('')}

        <!-- TICKET DE SALIDA -->
        ${worksheet.ticketDeSalida ? `
          <div class="ticket-box">
            <div class="ticket-title">🎟️ Ticket de Salida (Reto de Cierre)</div>
            <div style="font-size: 10pt; font-weight: bold; color: #1e293b; margin-bottom: 6px;">${worksheet.ticketDeSalida}</div>
            ${renderLines(3)}
          </div>
        ` : ''}
      </body>
      </html>
    `;
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(buildHtmlDoc());
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    } else {
      window.print();
    }
  };

  const handleDownloadDocx = () => {
    if (!worksheet) return;
    const htmlContent = buildHtmlDoc();
    const blob = new Blob(['\ufeff' + htmlContent], {
      type: 'application/msword'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Hoja_de_Trabajo_Sesion_${meta.sesionNumero}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 z-50 animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h2 className="font-black text-sm sm:text-base uppercase tracking-wider flex items-center gap-2">
                <span>Hoja de Trabajo de Clase</span>
              </h2>
              <p className="text-xs text-slate-300 font-medium">
                Sesión {meta.sesionNumero}: {meta.sesionTitulo}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
            {worksheet && !isLoading && (
              <>
                <button
                  type="button"
                  onClick={handleDownloadDocx}
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                  title="Descargar para Microsoft Word"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar .doc</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                  title="Imprimir hoja de trabajo"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir</span>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto grow space-y-6 bg-slate-50">
          {isLoading && (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                <Sparkles className="w-5 h-5 text-amber-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">Gemini está diseñando la Hoja de Trabajo...</h3>
                <p className="text-xs text-slate-500 font-medium max-w-md mt-1">
                  Generando ejercicios pedagógicos alineados al PDA y las actividades de la Sesión {meta.sesionNumero}.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-rose-700">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>Error al generar la hoja de trabajo</span>
              </div>
              <p className="text-xs">{error}</p>
              {onRetry && (
                <button
                  type="button"
                  onClick={onRetry}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase rounded-xl transition cursor-pointer"
                >
                  Reintentar con Gemini
                </button>
              )}
            </div>
          )}

          {worksheet && !isLoading && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-6 text-slate-900 text-xs">
              {/* Encabezado Escolar / Matriz */}
              <div className="border-2 border-slate-900 rounded-xl p-4 bg-slate-50/50 space-y-3">
                <div className="text-center">
                  <h1 className="font-black text-base text-mex-maroon uppercase tracking-wide">{worksheet.titulo}</h1>
                  <h2 className="font-bold text-slate-700 text-xs mt-0.5">
                    Sesión {meta.sesionNumero}: {meta.sesionTitulo} | {meta.disciplina}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-300">
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <span className="font-bold text-slate-500 block uppercase text-[9px]">Escuela:</span>
                    <span className="font-bold text-slate-900">{meta.escuelaName} (C.C.T. {meta.cct})</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <span className="font-bold text-slate-500 block uppercase text-[9px]">Docente:</span>
                    <span className="font-bold text-slate-900">{meta.docenteName}</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <span className="font-bold text-slate-500 block uppercase text-[9px]">Alumno(a):</span>
                    <span className="font-medium text-slate-400">______________________________________</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <span className="font-bold text-slate-500 block uppercase text-[9px]">Grado y Grupo / Fecha:</span>
                    <span className="font-bold text-slate-900">{meta.grado} - Grupo "{meta.grupo}" | ____/____/2026</span>
                  </div>
                </div>

                <div className="p-2 bg-white rounded border border-slate-200 text-[11px]">
                  <span className="font-bold text-slate-500 block uppercase text-[9px]">Proceso de Desarrollo (PDA):</span>
                  <span className="font-bold text-slate-900">{meta.pda}</span>
                </div>
              </div>

              {/* Instrucciones Generales */}
              <div className="bg-amber-50/60 border border-amber-200 p-3.5 rounded-xl text-slate-800 text-xs font-medium">
                <span className="font-black uppercase text-amber-900 block text-[10px] tracking-wider mb-0.5">
                  📌 Instrucciones Generales:
                </span>
                <p className="leading-relaxed">{worksheet.instruccionesGenerales}</p>
              </div>

              {/* SECCIÓN I: INICIO */}
              <div className="space-y-3">
                <h3 className="font-black text-xs uppercase text-mex-maroon tracking-wider border-b-2 border-mex-maroon pb-1">
                  {worksheet.seccionInicio.titulo}
                </h3>
                <p className="text-slate-600 font-semibold text-[11px] italic">
                  {worksheet.seccionInicio.instrucciones}
                </p>
                <div className="space-y-3">
                  {worksheet.seccionInicio.ejercicios.map((ex, idx) => (
                    <div key={idx} className="p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 space-y-2">
                      <p className="font-bold text-slate-900 leading-snug">
                        <span className="text-mex-maroon font-black">{ex.numero}.</span> {ex.preguntaOInstruccion}
                      </p>
                      <div className="space-y-2 pt-1">
                        {Array.from({ length: ex.lineasDeRespuesta || 3 }).map((_, lIdx) => (
                          <div key={lIdx} className="border-b border-dashed border-slate-300 h-5" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECCIÓN II: DESARROLLO */}
              <div className="space-y-3 pt-2">
                <h3 className="font-black text-xs uppercase text-mex-maroon tracking-wider border-b-2 border-mex-maroon pb-1">
                  {worksheet.seccionDesarrollo.titulo}
                </h3>
                <p className="text-slate-600 font-semibold text-[11px] italic">
                  {worksheet.seccionDesarrollo.instrucciones}
                </p>
                <div className="space-y-3">
                  {worksheet.seccionDesarrollo.ejercicios.map((ex, idx) => (
                    <div key={idx} className="p-3.5 border border-slate-200 rounded-xl bg-white space-y-2">
                      <p className="font-bold text-slate-900 leading-snug">
                        <span className="text-mex-maroon font-black">{ex.numero}.</span> {ex.preguntaOInstruccion}
                      </p>
                      {ex.textoOAuxiliar && (
                        <div className="p-3 bg-slate-100 border-l-4 border-slate-700 rounded-r-lg text-slate-800 text-xs italic font-medium">
                          {ex.textoOAuxiliar}
                        </div>
                      )}
                      <div className="space-y-2 pt-1">
                        {Array.from({ length: ex.lineasDeRespuesta || 4 }).map((_, lIdx) => (
                          <div key={lIdx} className="border-b border-dashed border-slate-300 h-5" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECCIÓN III: CIERRE */}
              <div className="space-y-3 pt-2">
                <h3 className="font-black text-xs uppercase text-mex-maroon tracking-wider border-b-2 border-mex-maroon pb-1">
                  {worksheet.seccionCierre.titulo}
                </h3>
                <p className="text-slate-600 font-semibold text-[11px] italic">
                  {worksheet.seccionCierre.instrucciones}
                </p>
                <div className="space-y-3">
                  {worksheet.seccionCierre.ejercicios.map((ex, idx) => (
                    <div key={idx} className="p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 space-y-2">
                      <p className="font-bold text-slate-900 leading-snug">
                        <span className="text-mex-maroon font-black">{ex.numero}.</span> {ex.preguntaOInstruccion}
                      </p>
                      <div className="space-y-2 pt-1">
                        {Array.from({ length: ex.lineasDeRespuesta || 3 }).map((_, lIdx) => (
                          <div key={lIdx} className="border-b border-dashed border-slate-300 h-5" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TICKET DE SALIDA */}
              {worksheet.ticketDeSalida && (
                <div className="p-4 border-2 border-dashed border-amber-500 bg-amber-50/40 rounded-xl space-y-2">
                  <span className="font-black uppercase text-amber-900 text-xs tracking-wider flex items-center gap-1.5">
                    <span>🎟️ Ticket de Salida (Entregar al finalizar la clase)</span>
                  </span>
                  <p className="font-bold text-slate-900">{worksheet.ticketDeSalida}</p>
                  <div className="space-y-2 pt-1">
                    <div className="border-b border-dashed border-slate-400 h-5" />
                    <div className="border-b border-dashed border-slate-400 h-5" />
                    <div className="border-b border-dashed border-slate-400 h-5" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}