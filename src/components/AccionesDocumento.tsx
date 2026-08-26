import React, { useState } from "react";
import { Printer, Download, Loader2, CheckCircle2, FileText, Sparkles } from "lucide-react";
import { exportElementToPdf, printDocument, getStandardPdfFilename } from "../utils/pdfExport";

export interface AccionesDocumentoProps {
  targetRef?: React.RefObject<HTMLElement | null>;
  targetId?: string;
  tipoRecurso: string;
  customSuffix?: string;
  customFileName?: string;
  orientation?: "portrait" | "landscape";
  title?: React.ReactNode;
  children?: React.ReactNode;
  extraActions?: React.ReactNode;
  variant?: "maroon" | "emerald" | "slate" | "minimal";
  onBeforeExport?: () => void;
  onAfterExport?: (success: boolean) => void;
  onBeforePrint?: () => void;
}

export default function AccionesDocumento({
  targetRef,
  targetId = "documento-resultado",
  tipoRecurso,
  customSuffix,
  customFileName,
  orientation = "portrait",
  title,
  children,
  extraActions,
  variant = "maroon",
  onBeforeExport,
  onAfterExport,
  onBeforePrint,
}: AccionesDocumentoProps) {
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const calculatedFilename = customFileName || getStandardPdfFilename(tipoRecurso, customSuffix);

  const handlePrint = () => {
    if (onBeforePrint) onBeforePrint();
    printDocument();
  };

  const handleDownloadPdf = () => {
    setIsExporting(true);
    
    // El setTimeout evita el "Blank Page Error" permitiendo a React commitear el DOM
    // antes de que window.print() pause la ejecución del navegador.
    setTimeout(() => {
      try {
        window.print();
        
        if (onAfterExport) onAfterExport(true);
        setExportSuccess(true);
        setTimeout(() => setExportSuccess(false), 4000);
      } catch (err: any) {
        console.error("Error al generar PDF:", err);
        setErrorMessage(err.message || "Error al exportar.");
        if (onAfterExport) onAfterExport(false);
      } finally {
        setIsExporting(false);
      }
    }, 150);
  };

  const getButtonStyles = () => {
    switch (variant) {
      case "emerald":
        return {
          primaryBtn: "bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm shadow-emerald-700/20",
          secondaryBtn: "bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs",
          badge: "bg-emerald-50 text-emerald-800 border border-emerald-200",
        };
      case "slate":
        return {
          primaryBtn: "bg-slate-800 hover:bg-slate-900 text-white shadow-sm shadow-slate-800/20",
          secondaryBtn: "bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-xs",
          badge: "bg-slate-100 text-slate-700 border border-slate-200",
        };
      case "minimal":
        return {
          primaryBtn: "bg-slate-900 hover:bg-black text-white",
          secondaryBtn: "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200",
          badge: "bg-slate-50 text-slate-600 border border-slate-200",
        };
      case "maroon":
      default:
        return {
          primaryBtn: "bg-mex-maroon hover:bg-mex-maroon/90 text-white shadow-sm shadow-mex-maroon/20",
          secondaryBtn: "bg-white hover:bg-mex-gold/10 text-mex-maroon border border-mex-gold/40 shadow-xs",
          badge: "bg-mex-gold/15 text-mex-maroon border border-mex-gold/30",
        };
    }
  };

  const styles = getButtonStyles();

  return (
    <div className="no-print print:hidden bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 shadow-sm mb-5 transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {title ? (
            <div className="flex items-center gap-2 pr-2">
              <FileText className="w-4 h-4 text-mex-maroon shrink-0" />
              <div className="text-xs font-black text-slate-900 uppercase tracking-wide">
                {title}
              </div>
            </div>
          ) : null}
          {children}
        </div>

        <div className="flex flex-wrap items-center gap-2 self-end md:self-center">
          {extraActions}

          <button
            type="button"
            onClick={handlePrint}
            title="Imprimir documento o guardar como PDF mediante el diálogo del navegador"
            className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer active:scale-95 ${styles.secondaryBtn}`}
          >
            <Printer className="w-4 h-4 text-mex-maroon shrink-0" />
            <span>Imprimir</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExporting}
            title={`Descargar archivo PDF directo: ${calculatedFilename}`}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${styles.primaryBtn}`}
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-mex-gold shrink-0" />
                <span>Generando PDF...</span>
              </>
            ) : exportSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>¡Listo!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-mex-gold shrink-0" />
                <span>Descargar PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {exportSuccess && (
        <div className="mt-2.5 pt-2 border-t border-emerald-100 flex items-center justify-between text-[11px] text-emerald-800 font-bold animate-fade-in">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Documento exportado exitosamente: <code className="bg-emerald-50 px-1.5 py-0.5 rounded text-emerald-950 font-mono text-[10px]">{calculatedFilename}</code>
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold uppercase">Formato NEM Oficial SEP</span>
        </div>
      )}

      {errorMessage && (
        <div className="mt-2.5 pt-2 border-t border-rose-100 text-[11px] text-rose-700 font-bold animate-fade-in flex items-center justify-between">
          <span>⚠️ {errorMessage}</span>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-[10px] text-rose-500 hover:text-rose-700 underline cursor-pointer"
          >
            Descartar
          </button>
        </div>
      )}
    </div>
  );
}