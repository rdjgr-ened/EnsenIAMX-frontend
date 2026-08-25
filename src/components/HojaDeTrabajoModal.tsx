import React from "react";
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
    escuelaName: "",
    cct: "",
    docenteName: "",
    grado: "",
    grupo: "",
    campoFormativo: "",
    disciplina: "",
    pda: "",
    sesionNumero: 1,
    sesionTitulo: ""
  };

  if (!isOpen) return null;

  return (
    <div id="hoja-trabajo-modal-wrapper" className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 z-50 animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0 print:hidden">
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

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => safeOnClose()}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition cursor-pointer ml-1"
              title="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto grow space-y-6 bg-slate-50">
          {isLoading && (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                <Sparkles className="w-5 h-5 text-amber-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">Gemini está diseñando la Hoja de Trabajo...</h3>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  Adaptando ejercicios con base en la metodología activa de la sesión {meta.sesionNumero}
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-rose-700">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>Error al generar la hoja de trabajo</span>
              </div>
              <p className="text-xs">{error}</p>
              <button
                type="button"
                onClick={() => safeOnRetry()}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase rounded-xl transition cursor-pointer"
              >
                Reintentar con Gemini
              </button>
            </div>
          )}

          {worksheet && !isLoading && (
            <div className="space-y-4">
              <AccionesDocumento
                targetId="hoja-trabajo-resultado"
                tipoRecurso="Hoja_De_Trabajo"
                customSuffix={`Sesion_${meta.sesionNumero}_${(meta.disciplina || '').replace(/[^a-zA-Z0-9]/g, '_')}`}
                title={
                  <span className="flex items-center gap-1.5 font-black text-slate-800 text-xs sm:text-sm">
                    <span>{worksheet.titulo}</span>
                  </span>
                }
              />

              <div id="hoja-trabajo-resultado"
                className="bg-white p-8 rounded-2xl border border-slate-300 shadow-sm space-y-6 text-slate-900 text-xs printable-document"
              >
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
            </div>
          )}
        </div>
      </div>

      {/* CSS MAGICO DE IMPRESIÓN */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          /* 1. Ocultar la planeacion de fondo */
          #documento-resultado { display: none !important; }
          
          /* 2. Forzar al body a permitir paginación (anula el bloqueo de scroll del modal de React) */
          body, html {
            overflow: visible !important;
            height: auto !important;
          }
          
          /* 3. Destruir las ataduras del modal (fixed, flex, scroll) para convertirlo en documento normal */
          #hoja-trabajo-modal-wrapper, 
          #hoja-trabajo-modal-wrapper > div, 
          #hoja-trabajo-modal-wrapper .overflow-y-auto {
            position: static !important;
            display: block !important;
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}} />
    </div>
  );
}