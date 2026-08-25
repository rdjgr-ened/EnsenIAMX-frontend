import React, { useEffect } from "react";
import { GeneratedWorksheet } from "../types";
import { FileText, X, Loader2, Sparkles, AlertCircle } from "lucide-react";
import AccionesDocumento from "./AccionesDocumento";

interface HojaDeTrabajoModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  worksheet?: GeneratedWorksheet | null;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  meta?: {
    escuelaName?: string;
    cct?: string;
    docenteName?: string;
    grado?: string;
    grupo?: string;
    campoFormativo?: string;
    disciplina?: string;
    pda?: string;
    sesionNumero?: number;
    sesionTitulo?: string;
  };
}

export default function HojaDeTrabajoModal(props: HojaDeTrabajoModalProps) {
  const isOpen = props.isOpen ?? false;
  const safeOnClose = props.onClose || (() => {});
  const worksheet = props.worksheet || null;
  const isLoading = props.isLoading ?? false;
  const error = props.error || null;
  const safeOnRetry = props.onRetry || (() => {});
  const meta = props.meta || {
    escuelaName: "", cct: "", docenteName: "", grado: "", grupo: "", campoFormativo: "", disciplina: "", pda: "", sesionNumero: 1, sesionTitulo: ""
  };

  useEffect(() => {
    if (isOpen) window.scrollTo(0, 0);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="w-full min-h-screen bg-slate-50 pb-16 print:bg-white print:pb-0">
      
      {/* HEADER DE LA PÁGINA INDEPENDIENTE */}
      <div className="bg-slate-900 p-4 sm:p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-blue-300" />
          </div>
          <div>
            <h2 className="font-black text-base sm:text-lg uppercase tracking-wider flex items-center gap-2">
              <span>Hoja de Trabajo de Clase</span>
            </h2>
            <p className="text-sm text-slate-300 font-medium">
              Sesión {meta.sesionNumero}: {meta.sesionTitulo}
            </p>
          </div>
        </div>
        <button onClick={() => safeOnClose()} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition cursor-pointer font-bold text-sm flex items-center gap-2">
          <X className="w-5 h-5" /><span>Cerrar y volver</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 mt-8 print:max-w-none print:px-0 print:mt-0">
        
        {isLoading && (
          <div className="py-32 flex flex-col items-center justify-center text-center space-y-4">
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto" />
            <h3 className="font-black text-slate-900 text-lg">Gemini está diseñando la Hoja de Trabajo...</h3>
          </div>
        )}

        {error && (
          <div className="p-6 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 space-y-3 mt-8">
            <AlertCircle className="w-6 h-6 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
            <button onClick={() => safeOnRetry()} className="px-6 py-3 bg-rose-600 text-white font-bold text-sm uppercase rounded-xl">Reintentar</button>
          </div>
        )}

        {worksheet && !isLoading && (
          <div className="space-y-6">
            <div className="print:hidden">
              <AccionesDocumento
                targetId="hoja-trabajo-resultado"
                tipoRecurso="Hoja_De_Trabajo"
                customSuffix={`Sesion_${meta.sesionNumero}_${(meta.disciplina || '').replace(/[^a-zA-Z0-9]/g, '_')}`}
                title={<span className="font-black text-slate-800 text-sm">{worksheet.titulo}</span>}
              />
            </div>

            <div id="hoja-trabajo-resultado" className="bg-white p-6 sm:p-12 rounded-2xl border border-slate-300 shadow-sm space-y-8 text-slate-900 text-xs printable-document print:border-none print:shadow-none print:p-0">
              
              {/* Encabezado */}
              <div className="border-2 border-slate-900 rounded-xl p-5 bg-slate-50/50 space-y-4">
                <div className="text-center">
                  <h1 className="font-black text-lg text-mex-maroon uppercase tracking-wide">{worksheet.titulo}</h1>
                  <h2 className="font-bold text-slate-700 text-sm mt-1">Sesión {meta.sesionNumero}: {meta.sesionTitulo} | {meta.disciplina}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-3 border-t border-slate-300">
                  <div className="p-2.5 bg-white rounded border border-slate-200">
                    <span className="font-bold text-slate-500 block uppercase text-[10px] mb-0.5">Escuela:</span>
                    <span className="font-black text-slate-900 text-sm">{meta.escuelaName} (C.C.T. {meta.cct})</span>
                  </div>
                  <div className="p-2.5 bg-white rounded border border-slate-200">
                    <span className="font-bold text-slate-500 block uppercase text-[10px] mb-0.5">Docente:</span>
                    <span className="font-black text-slate-900 text-sm">{meta.docenteName}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded border border-slate-200">
                    <span className="font-bold text-slate-500 block uppercase text-[10px] mb-0.5">Alumno(a):</span>
                    <span className="font-medium text-slate-400 block pt-1 border-b border-slate-400"></span>
                  </div>
                  <div className="p-2.5 bg-white rounded border border-slate-200">
                    <span className="font-bold text-slate-500 block uppercase text-[10px] mb-0.5">Grado y Grupo / Fecha:</span>
                    <span className="font-black text-slate-900 text-sm">{meta.grado} - Grupo "{meta.grupo}" | ____/____/2026</span>
                  </div>
                </div>
                <div className="p-3 bg-white rounded border border-slate-200 text-xs">
                  <span className="font-bold text-slate-500 block uppercase text-[10px] mb-1">Proceso de Desarrollo (PDA):</span>
                  <span className="font-bold text-slate-900">{meta.pda}</span>
                </div>
              </div>

              {/* Instrucciones */}
              <div className="bg-amber-50/60 border border-amber-200 p-4 rounded-xl text-slate-800 text-sm font-medium">
                <span className="font-black uppercase text-amber-900 block text-xs tracking-wider mb-1">📌 Instrucciones Generales:</span>
                <p className="leading-relaxed">{worksheet.instruccionesGenerales}</p>
              </div>

              {/* SECCIÓN I: INICIO */}
              <div className="space-y-4">
                <h3 className="font-black text-sm uppercase text-mex-maroon tracking-wider border-b-2 border-mex-maroon pb-1">{worksheet.seccionInicio.titulo}</h3>
                <p className="text-slate-600 font-semibold text-xs italic">{worksheet.seccionInicio.instrucciones}</p>
                <div className="space-y-4">
                  {worksheet.seccionInicio.ejercicios.map((ex, idx) => (
                    <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3 break-inside-avoid">
                      <p className="font-bold text-slate-900 text-sm leading-snug"><span className="text-mex-maroon font-black">{ex.numero}.</span> {ex.preguntaOInstruccion}</p>
                      <div className="space-y-3 pt-2">
                        {Array.from({ length: ex.lineasDeRespuesta || 3 }).map((_, lIdx) => (
                          <div key={lIdx} className="border-b border-dashed border-slate-300 h-6" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECCIÓN II: DESARROLLO */}
              <div className="space-y-4 pt-4">
                <h3 className="font-black text-sm uppercase text-mex-maroon tracking-wider border-b-2 border-mex-maroon pb-1">{worksheet.seccionDesarrollo.titulo}</h3>
                <p className="text-slate-600 font-semibold text-xs italic">{worksheet.seccionDesarrollo.instrucciones}</p>
                <div className="space-y-4">
                  {worksheet.seccionDesarrollo.ejercicios.map((ex, idx) => (
                    <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-white space-y-3 break-inside-avoid">
                      <p className="font-bold text-slate-900 text-sm leading-snug"><span className="text-mex-maroon font-black">{ex.numero}.</span> {ex.preguntaOInstruccion}</p>
                      {ex.textoOAuxiliar && <div className="p-3 bg-slate-100 border-l-4 border-slate-700 rounded-r-lg text-slate-800 text-xs italic font-medium">{ex.textoOAuxiliar}</div>}
                      <div className="space-y-3 pt-2">
                        {Array.from({ length: ex.lineasDeRespuesta || 4 }).map((_, lIdx) => (
                          <div key={lIdx} className="border-b border-dashed border-slate-300 h-6" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECCIÓN III: CIERRE */}
              <div className="space-y-4 pt-4">
                <h3 className="font-black text-sm uppercase text-mex-maroon tracking-wider border-b-2 border-mex-maroon pb-1">{worksheet.seccionCierre.titulo}</h3>
                <p className="text-slate-600 font-semibold text-xs italic">{worksheet.seccionCierre.instrucciones}</p>
                <div className="space-y-4">
                  {worksheet.seccionCierre.ejercicios.map((ex, idx) => (
                    <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3 break-inside-avoid">
                      <p className="font-bold text-slate-900 text-sm leading-snug"><span className="text-mex-maroon font-black">{ex.numero}.</span> {ex.preguntaOInstruccion}</p>
                      <div className="space-y-3 pt-2">
                        {Array.from({ length: ex.lineasDeRespuesta || 3 }).map((_, lIdx) => (
                          <div key={lIdx} className="border-b border-dashed border-slate-300 h-6" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TICKET DE SALIDA */}
              {worksheet.ticketDeSalida && (
                <div className="p-5 border-2 border-dashed border-amber-500 bg-amber-50/40 rounded-xl space-y-3 break-inside-avoid">
                  <span className="font-black uppercase text-amber-900 text-sm tracking-wider flex items-center gap-1.5">🎟️ Ticket de Salida (Entregar al finalizar la clase)</span>
                  <p className="font-bold text-slate-900 text-sm">{worksheet.ticketDeSalida}</p>
                  <div className="space-y-3 pt-2">
                    <div className="border-b border-dashed border-slate-400 h-6" /><div className="border-b border-dashed border-slate-400 h-6" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}