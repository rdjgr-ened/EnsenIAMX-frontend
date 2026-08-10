import React from "react";
import { CompletePlan, GeneratedInstrument, GeneratedWorksheet } from "../types";
import { Printer, ArrowLeft, Download, Send, Sparkles, Bot, User, Loader2, AlertCircle, Plus, FileText } from "lucide-react";
import InstrumentoEvaluacionModal from "./InstrumentoEvaluacionModal";
import HojaDeTrabajoModal from "./HojaDeTrabajoModal";

interface PlaneacionPreviewProps {
  planData: CompletePlan;
  onBack: () => void;
  onUpdatePlan?: (updatedPlan: CompletePlan) => void;
}

export default function PlaneacionPreview({ planData, onBack, onUpdatePlan }: PlaneacionPreviewProps) {
  const [printBlocked, setPrintBlocked] = React.useState(false);
  const [chatMessage, setChatMessage] = React.useState("");
  const [chatHistory, setChatHistory] = React.useState<Array<{ sender: "user" | "assistant"; text: string }>>([
    {
      sender: "assistant",
      text: "¡Hola! Soy tu asistente de Gemini. ¿Deseas hacer algún cambio o ajuste en esta planeación? Solo escríbelo aquí y yo me encargaré de reescribir la planeación manteniendo toda la rigurosidad pedagógica de la NEM. (Ej. 'Agrega más actividades dinámicas en la sesión 1', 'Incluye materiales reciclados en los recursos', etc.)"
    }
  ]);
  const [isModifying, setIsModifying] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  // Instrument Generation State
  const [isInstrumentModalOpen, setIsInstrumentModalOpen] = React.useState(false);
  const [selectedInstrumentName, setSelectedInstrumentName] = React.useState("");
  const [instrumentData, setInstrumentData] = React.useState<GeneratedInstrument | null>(null);
  const [isGeneratingInstrument, setIsGeneratingInstrument] = React.useState(false);
  const [instrumentError, setInstrumentError] = React.useState<string | null>(null);
  const [customInstrumentName, setCustomInstrumentName] = React.useState("");
  const [showCustomInput, setShowCustomInput] = React.useState(false);

  // Worksheet Generation State
  const [isWorksheetModalOpen, setIsWorksheetModalOpen] = React.useState(false);
  const [worksheetData, setWorksheetData] = React.useState<GeneratedWorksheet | null>(null);
  const [isGeneratingWorksheet, setIsGeneratingWorksheet] = React.useState(false);
  const [worksheetError, setWorksheetError] = React.useState<string | null>(null);
  const [activeWorksheetSessionMeta, setActiveWorksheetSessionMeta] = React.useState<{
    faseNombre: string;
    sesionNumero: number;
    sesionTitulo: string;
    sesionObj?: any;
  }>({
    faseNombre: "",
    sesionNumero: 1,
    sesionTitulo: "",
  });

  const {
    nivel,
    docenteName,
    escuelaName,
    cct,
    grupo,
    grado,
    campoFormativo,
    disciplina,
    contenido,
    pda,
    ejesArticuladores,
    metodologia,
    situacionProblema,
    bapSelected = [],
    plan,
    createdAt,
    duracionSemanas,
    duracionSesion,
  } = planData;

  const handleGenerateInstrument = async (insName: string) => {
    if (!insName.trim()) return;
    setSelectedInstrumentName(insName);
    setIsInstrumentModalOpen(true);
    setIsGeneratingInstrument(true);
    setInstrumentError(null);
    setInstrumentData(null);

    try {
      const response = await fetch("/api/generate-instrument", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instrumentName: insName,
          escuelaName,
          cct,
          docenteName,
          grado,
          grupo,
          campoFormativo,
          disciplina,
          contenido,
          pda,
          producto: plan.producto,
          situacionProblema,
          proposito: plan.proposito,
          nivel,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error || "Error al diseñar el instrumento de evaluación.");
      }

      const data = await response.json();
      if (data.success && data.instrument) {
        setInstrumentData(data.instrument);
      } else {
        throw new Error("No se recibieron datos del instrumento.");
      }
    } catch (err: any) {
      console.error(err);
      setInstrumentError(err.message || "Ocurrió un error inesperado al conectar con Gemini.");
    } finally {
      setIsGeneratingInstrument(false);
    }
  };

  const handleGenerateWorksheet = async (faseNombre: string, sesion: any) => {
    setActiveWorksheetSessionMeta({
      faseNombre,
      sesionNumero: sesion.numero,
      sesionTitulo: sesion.titulo,
      sesionObj: sesion,
    });
    setIsWorksheetModalOpen(true);
    setIsGeneratingWorksheet(true);
    setWorksheetError(null);
    setWorksheetData(null);

    try {
      const response = await fetch("/api/generate-worksheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sesionNumero: sesion.numero,
          sesionTitulo: sesion.titulo,
          sesionInicio: sesion.inicio,
          sesionDesarrollo: sesion.desarrollo,
          sesionCierre: sesion.cierre,
          sesionMateriales: sesion.materiales,
          faseNombre,
          escuelaName,
          cct,
          docenteName,
          grado,
          grupo,
          campoFormativo,
          disciplina,
          contenido,
          pda,
          nivel,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error || "Error al generar la hoja de trabajo.");
      }

      const data = await response.json();
      if (data.success && data.worksheet) {
        setWorksheetData(data.worksheet);
      } else {
        throw new Error("No se recibieron datos de la hoja de trabajo.");
      }
    } catch (err: any) {
      console.error(err);
      setWorksheetError(err.message || "Ocurrió un error inesperado al conectar con Gemini.");
    } finally {
      setIsGeneratingWorksheet(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || isModifying) return;

    const userText = chatMessage.trim();
    setChatMessage("");
    setChatHistory(prev => [...prev, { sender: "user", text: userText }]);
    setIsModifying(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/modify-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: plan,
          instruction: userText,
          nivel,
          campoFormativo,
          disciplina,
          grado,
          contenido,
          pda,
          ejesArticuladores,
          metodologia,
          situacionProblema,
          docenteName,
          escuelaName,
          cct,
          grupo,
          duracionSemanas,
          duracionSesion,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Ocurrió un error al modificar la planeación.");
      }

      const data = await response.json();
      if (data.success && data.plan) {
        const updatedPlan: CompletePlan = {
          ...planData,
          plan: data.plan,
        };
        
        if (onUpdatePlan) {
          onUpdatePlan(updatedPlan);
        }

        setChatHistory(prev => [
          ...prev,
          {
            sender: "assistant",
            text: `¡Listo! He modificado la planeación con éxito según tu solicitud: "${userText}". Los cambios ya se reflejan en el visor.`
          }
        ]);
      } else {
        throw new Error("No se pudo obtener el plan modificado.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Error al comunicar con Gemini.");
      setChatHistory(prev => [
        ...prev,
        {
          sender: "assistant",
          text: `Lo siento, ocurrió un error al intentar modificar la planeación: ${err.message || "Error desconocido"}. Por favor, vuelve a intentarlo.`
        }
      ]);
    } finally {
      setIsModifying(false);
    }
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch (e) {
      console.error("Manual printing failed:", e);
      setPrintBlocked(true);
    }
  };

  const handleDownloadHtml = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Planeación Didáctica NEM - ${docenteName.replace(/"/g, '&quot;')}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            'mex-maroon': '#334e68',
            'mex-gold': '#627d98',
          }
        }
      }
    }
  </script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    body {
      font-family: 'Inter', sans-serif;
    }
    @media print {
      body {
        background-color: white !important;
        color: black !important;
        font-size: 11px !important;
      }
      .no-print {
        display: none !important;
      }
      .page-break-inside-avoid {
        page-break-inside: avoid !important;
      }
      .shadow-custom {
        box-shadow: none !important;
      }
      .border-custom {
        border: none !important;
      }
    }
  </style>
</head>
<body class="bg-slate-50 p-4 sm:p-8 text-slate-900 font-sans">
  <div class="max-w-4xl mx-auto">
    <!-- Indicaciones para el docente -->
    <div class="no-print mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-950 text-xs font-semibold flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
      <div class="flex items-center gap-2.5">
        <span class="text-lg">📄</span>
        <span>Este archivo contiene tu planeación con formato listo para impresión. Abre este archivo en tu navegador e imprímelo o guárdalo como PDF.</span>
      </div>
      <button onclick="window.print()" class="w-full sm:w-auto px-4 py-2 bg-mex-maroon hover:bg-mex-maroon/90 text-white font-bold rounded uppercase tracking-wider text-[10px] transition shadow-sm">
        Imprimir / Guardar PDF
      </button>
    </div>

    <!-- Formato de Planeación -->
    <div class="bg-white p-8 sm:p-12 border-2 border-slate-900 rounded shadow-custom shadow-[6px_6px_0px_0px_rgba(106,27,49,0.15)] print:border-none print:shadow-none print:p-0">
      <!-- Encabezado -->
      <div class="text-center border-b-2 border-slate-900 pb-4 mb-6">
        <h1 class="font-black text-lg tracking-wider text-slate-950 uppercase mb-1">Planeación Didáctica</h1>
        <h2 class="text-sm font-extrabold text-mex-maroon uppercase mb-0.5">${escuelaName.replace(/"/g, '&quot;')}</h2>
        <span class="text-xs font-bold text-slate-600 tracking-wide uppercase">C.C.T. ${cct.replace(/"/g, '&quot;')}</span>
      </div>

      <!-- Tabla de Identificación Curricular -->
      <div class="border-2 border-slate-900 text-xs mb-6 overflow-hidden rounded animate-fade-in">
        <div class="grid grid-cols-1 md:grid-cols-2 border-b-2 border-slate-900" style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));">
          <div class="p-3 border-r-2 border-slate-900 bg-slate-50/50" style="border-right-width: 2px; border-color: #0f172a; padding: 12px;">
            <span class="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5" style="font-weight: 750; color: #475569; font-size: 9px; text-transform: uppercase; margin-bottom: 2px;">DOCENTE:</span>
            <span class="font-black text-slate-950 text-xs uppercase" style="font-weight: 900; color: #020617; font-size: 12px; text-transform: uppercase;">${docenteName.replace(/"/g, '&quot;')}</span>
          </div>
          <div class="p-3 bg-slate-50/50" style="padding: 12px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span class="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5" style="font-weight: 750; color: #475569; font-size: 9px; text-transform: uppercase; margin-bottom: 2px;">FECHA / DURACIÓN ESTIMADA:</span>
              <span class="font-bold text-slate-950 text-xs" style="font-weight: 700; color: #020617; font-size: 12px;">${(planData.duracionSemanas || "2 semanas").replace(/"/g, '&quot;')}</span>
            </div>
            \${planData.duracionSesion ? \`
            <div style="text-align: right; border-left: 1px solid #cbd5e1; padding-left: 16px;">
              <span class="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5" style="font-weight: 750; color: #475569; font-size: 9px; text-transform: uppercase; margin-bottom: 2px;">SESIÓN DE CLASE:</span>
              <span class="font-bold text-slate-950 text-xs" style="font-weight: 700; color: #020617; font-size: 12px;">\${planData.duracionSesion.replace(/"/g, '&quot;')}</span>
            </div>
            \` : ''}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 border-b-2 border-slate-900" style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-bottom-width: 2px; border-color: #0f172a;">
          <div class="p-3 border-r-2 border-slate-900 bg-slate-50/50" style="border-right-width: 2px; border-color: #0f172a; padding: 12px;">
            <span class="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5" style="font-weight: 750; color: #475569; font-size: 9px; text-transform: uppercase; margin-bottom: 2px;">CAMPO FORMATIVO:</span>
            <span class="font-bold text-slate-950" style="font-weight: 700; color: #020617;">${campoFormativo.replace(/"/g, '&quot;')}</span>
          </div>
          <div class="p-3 border-r-2 border-slate-900 bg-slate-50/50" style="border-right-width: 2px; border-color: #0f172a; padding: 12px;">
            <span class="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5" style="font-weight: 750; color: #475569; font-size: 9px; text-transform: uppercase; margin-bottom: 2px;">DISCIPLINA:</span>
            <span class="font-bold text-slate-950" style="font-weight: 700; color: #020617;">${disciplina.replace(/"/g, '&quot;')}</span>
          </div>
          <div class="p-3 bg-slate-50/50" style="padding: 12px;">
            <span class="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5" style="font-weight: 750; color: #475569; font-size: 9px; text-transform: uppercase; margin-bottom: 2px;">GRADO Y GRUPO:</span>
            <span class="font-bold text-slate-950" style="font-weight: 700; color: #020617;">${grado.replace(/"/g, '&quot;')} - Grupo "${grupo.replace(/"/g, '&quot;')}"</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 border-b-2 border-slate-900" style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); border-bottom-width: 2px; border-color: #0f172a;">
          <div class="p-3 border-r-2 border-slate-900" style="border-right-width: 2px; border-color: #0f172a; padding: 12px;">
            <span class="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5" style="font-weight: 750; color: #475569; font-size: 9px; text-transform: uppercase; margin-bottom: 2px;">PRODUCTO FINAL SUGERIDO:</span>
            <span class="font-bold text-slate-950 text-mex-maroon" style="font-weight: 700; color: #334e68;">${plan.producto.replace(/"/g, '&quot;')}</span>
          </div>
          <div class="p-3" style="padding: 12px;">
            <span class="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5" style="font-weight: 750; color: #475569; font-size: 9px; text-transform: uppercase; margin-bottom: 2px;">${(nivel || '').toLowerCase() === 'preescolar' ? 'MODALIDAD DE TRABAJO:' : 'METODOLOGÍA NEM:'}</span>
            <span class="font-bold text-slate-950" style="font-weight: 700; color: #020617;">${metodologia.replace(/"/g, '&quot;')}</span>
          </div>
        </div>

        <div class="p-3 border-b-2 border-slate-900 bg-slate-50/30" style="border-bottom-width: 2px; border-color: #0f172a; padding: 12px; background-color: rgba(248, 250, 252, 0.3);">
          <span class="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5" style="font-weight: 750; color: #475569; font-size: 9px; text-transform: uppercase; margin-bottom: 2px;">SITUACIÓN-PROBLEMA DEL CONTEXTO:</span>
          <span class="text-slate-950 italic mt-0.5 block leading-relaxed" style="color: #020617; font-style: italic; font-size: 11.5px; line-height: 1.625;">"${situacionProblema.replace(/"/g, '&quot;')}"</span>
        </div>

        <div class="p-3 border-b-2 border-slate-900" style="border-bottom-width: 2px; border-color: #0f172a; padding: 12px;">
          <span class="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5" style="font-weight: 750; color: #475569; font-size: 9px; text-transform: uppercase; margin-bottom: 2px;">PROPÓSITO DEL PROYECTO:</span>
          <span class="text-slate-950 mt-0.5 block leading-relaxed font-medium" style="color: #020617; line-height: 1.625; font-weight: 500;">${plan.proposito.replace(/"/g, '&quot;')}</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2" style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));">
          <div class="p-3 border-r-2 border-slate-900" style="border-right-width: 2px; border-color: #0f172a; padding: 12px;">
            <span class="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5" style="font-weight: 750; color: #475569; font-size: 9px; text-transform: uppercase; margin-bottom: 2px;">CONTENIDO SINTÉTICO:</span>
            <span class="font-bold text-slate-950 mt-0.5 block leading-normal" style="font-weight: 700; color: #020617;">${contenido.replace(/"/g, '&quot;')}</span>
          </div>
          <div class="p-3" style="padding: 12px;">
            <span class="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5" style="font-weight: 750; color: #475569; font-size: 9px; text-transform: uppercase; margin-bottom: 2px;">PROCESO DE DESARROLLO DE APRENDIZAJE (PDA):</span>
            <span class="font-bold text-slate-950 mt-0.5 block leading-normal" style="font-weight: 700; color: #020617;">${pda.replace(/"/g, '&quot;')}</span>
          </div>
        </div>

        <div class="p-3 bg-slate-50/50 border-t-2 border-slate-900" style="border-top-width: 2px; border-color: #0f172a; padding: 12px; background-color: rgba(248, 250, 252, 0.5);">
          <span class="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-1.5" style="font-weight: 750; color: #475569; font-size: 9px; text-transform: uppercase; margin-bottom: 6px;">EJES ARTICULADORES TRANSVERSALES:</span>
          <div class="flex flex-wrap gap-1.5 mt-1" style="display: flex; flex-wrap: wrap; gap: 6px;">
            ${ejesArticuladores.map(eje => `
              <span class="bg-[#334e68]/5 text-[#334e68] text-[9px] font-black px-2 py-0.5 rounded border border-[#334e68]/15 uppercase tracking-wide" style="background-color: rgba(51, 78, 104, 0.05); color: #334e68; font-size: 9px; font-weight: 900; padding: 2px 8px; border-radius: 4px; border: 1px solid rgba(51, 78, 104, 0.15); text-transform: uppercase; tracking-wider: 0.05em;">
                ${eje.replace(/"/g, '&quot;')}
              </span>
            `).join('')}
          </div>
        </div>
        \${bapSelected && bapSelected.length > 0 ? \`
        <div class="p-3 bg-slate-50/50 border-t-2 border-slate-900" style="border-top-width: 2px; border-color: #0f172a; padding: 12px; background-color: rgba(248, 250, 252, 0.5);">
          <span class="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-1.5" style="font-weight: 750; color: #475569; font-size: 9px; text-transform: uppercase; margin-bottom: 6px;">BAP / APTITUDES SOBRESALIENTES PRESENTES EN EL GRUPO:</span>
          <div class="flex flex-wrap gap-1.5 mt-1" style="display: flex; flex-wrap: wrap; gap: 6px;">
            \${bapSelected.map(bap => \`
              <span class="bg-[#991b1b]/5 text-[#991b1b] text-[9px] font-black px-2 py-0.5 rounded border border-[#991b1b]/15 uppercase tracking-wide" style="background-color: rgba(153, 27, 27, 0.05); color: #991b1b; font-size: 9px; font-weight: 900; padding: 2px 8px; border-radius: 4px; border: 1px solid rgba(153, 27, 27, 0.15); text-transform: uppercase; tracking-wider: 0.05em;">
                \${bap.replace(/"/g, '&quot;')}
              </span>
            \`).join('')}
          </div>
        </div>
        \` : ''}
      </div>

      <!-- Secuencia de Aprendizaje -->
      <div class="space-y-6 mt-8">
        <h3 class="text-xs font-black uppercase text-slate-950 tracking-widest border-b-2 border-slate-950 pb-1 flex items-center gap-2" style="font-weight: 900; font-size: 12px; text-transform: uppercase; border-bottom-width: 2px; border-color: #0f172a; padding-bottom: 4px; margin-bottom: 24px;">
          <span>II. Secuencia de Aprendizaje</span>
        </h3>

        ${plan.fases.map((fase) => `
          <div class="border-2 border-slate-900 rounded overflow-hidden shadow-[4px_4px_0px_0px_rgba(106,27,49,0.15)] page-break-inside-avoid mb-6" style="border-width: 2px; border-color: #0f172a; border-radius: 4px; overflow: hidden; margin-bottom: 24px;">
            <div class="bg-mex-maroon text-white p-3 font-bold text-xs uppercase tracking-wider flex items-center justify-between border-b-2 border-slate-900" style="display: flex; justify-content: space-between; align-items: center; background-color: #334e68; color: white; padding: 12px; font-weight: 700; font-size: 12px; text-transform: uppercase; border-bottom-width: 2px; border-color: #0f172a;">
              <span>${fase.nombre.replace(/"/g, '&quot;')}</span>
              <span class="text-[9px] bg-mex-gold text-white font-black px-2 py-0.5 rounded tracking-wider" style="font-size: 9px; background-color: #627d98; color: #ffffff; font-weight: 900; padding: 2px 8px; border-radius: 4px;">${(nivel || '').toLowerCase() === 'preescolar' ? 'Estructura Didáctica' : 'Fase Metodológica'}</span>
            </div>

            <div class="divide-y-2 divide-slate-900" style="border-top-width: 0px;">
              ${fase.sesiones.map((sesion) => `
                <div class="p-4 sm:p-5 bg-white text-xs border-b-2 border-slate-900 last:border-b-0" style="padding: 20px; background-color: white; font-size: 12px; border-bottom-width: 2px; border-color: #0f172a;">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2 mb-3" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 12px;">
                    <span class="font-black text-xs text-slate-900 uppercase tracking-wide" style="font-weight: 900; color: #0f172a; text-transform: uppercase;">
                      Sesión ${sesion.numero}: ${sesion.titulo.replace(/"/g, '&quot;')}
                    </span>
                    <span class="font-bold text-mex-maroon bg-mex-maroon/5 px-2.5 py-0.5 rounded border border-mex-maroon/15 text-[10px]" style="font-weight: 700; color: #334e68; background-color: rgba(51, 78, 104, 0.05); padding: 2px 10px; border-radius: 4px; border: 1px solid rgba(51, 78, 104, 0.15); font-size: 10px;">
                      Duración: ${sesion.duracion.replace(/"/g, '&quot;')}
                    </span>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3" style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-bottom: 12px;">
                    <div class="border border-slate-300 rounded p-3 bg-slate-50/50" style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 12px; background-color: rgba(248, 250, 252, 0.5);">
                      <span class="font-black text-[9px] text-mex-maroon tracking-wider uppercase block border-b border-mex-maroon/10 pb-1 mb-1.5" style="font-weight: 900; font-size: 9px; color: #334e68; text-transform: uppercase; border-bottom: 1px solid rgba(51, 78, 104, 0.1); padding-bottom: 4px; margin-bottom: 6px;">
                        Actividades de Inicio (Motivación y Saberes)
                      </span>
                      <p class="text-slate-800 leading-relaxed font-normal" style="color: #1e293b; font-weight: 400; line-height: 1.625; white-space: pre-wrap;">${sesion.inicio.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
                    </div>

                    <div class="border border-slate-300 rounded p-3 bg-white" style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 12px; background-color: white;">
                      <span class="font-black text-[9px] text-emerald-800 tracking-wider uppercase block border-b border-emerald-100 pb-1 mb-1.5" style="font-weight: 900; font-size: 9px; color: #065f46; text-transform: uppercase; border-bottom: 1px solid #d1fae5; padding-bottom: 4px; margin-bottom: 6px;">
                        Actividades de Desarrollo (Acción e Indagación)
                      </span>
                      <p class="text-slate-800 leading-relaxed font-normal" style="color: #1e293b; font-weight: 400; line-height: 1.625; white-space: pre-wrap;">${sesion.desarrollo.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
                    </div>

                    <div class="border border-slate-300 rounded p-3 bg-slate-50/50" style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 12px; background-color: rgba(248, 250, 252, 0.5);">
                      <span class="font-black text-[9px] text-[#b45309] tracking-wider uppercase block border-b border-amber-100/50 pb-1 mb-1.5" style="font-weight: 900; font-size: 9px; color: #b45309; text-transform: uppercase; border-bottom: 1px solid rgba(254, 243, 199, 0.5); padding-bottom: 4px; margin-bottom: 6px;">
                        Actividades de Cierre (Síntesis y Evaluación)
                      </span>
                      <p class="text-slate-800 leading-relaxed font-normal" style="color: #1e293b; font-weight: 400; line-height: 1.625; white-space: pre-wrap;">${sesion.cierre.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
                    </div>
                  </div>

                  <div class="bg-slate-50 rounded p-2.5 border border-slate-200" style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 10px; border-radius: 4px;">
                    <span class="font-bold text-slate-700 text-[9px] block uppercase tracking-wider" style="font-weight: 700; color: #475569; font-size: 9px; text-transform: uppercase;">RECURSOS Y MATERIALES REQUERIDOS:</span>
                    <div class="flex flex-wrap gap-1 mt-1.5" style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px;">
                      ${sesion.materiales.map(mat => `
                        <span class="bg-white border border-slate-300 text-slate-800 text-[9px] font-semibold px-2 py-0.5 rounded" style="background-color: white; border: 1px solid #cbd5e1; color: #1e293b; font-size: 9px; font-weight: 600; padding: 2px 8px; border-radius: 4px;">
                          ${mat.replace(/"/g, '&quot;')}
                        </span>
                      `).join('')}
                    </div>
                  </div>

                  ${sesion.evaluacionSesion ? `
                    <div class="mt-2.5 bg-[#fffaf5] rounded p-2.5 border border-[#fed7aa]/40" style="margin-top: 10px; background-color: #fffaf5; border: 1px solid rgba(254, 215, 170, 0.4); padding: 10px; border-radius: 4px;">
                      <span class="font-black text-amber-900 text-[9px] block uppercase tracking-wider" style="font-weight: 900; color: #78350f; font-size: 9px; text-transform: uppercase;">EVALUACIÓN FORMATIVA INTEGRADA EN ESTA SESIÓN:</span>
                      <p class="text-slate-800 font-medium text-xs mt-1 italic leading-relaxed" style="color: #1e293b; font-size: 12px; margin-top: 4px; font-style: italic; line-height: 1.625; white-space: pre-wrap;">${sesion.evaluacionSesion.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Estrategia de Evaluación Formativa -->
      <div class="space-y-4 mt-8 page-break-inside-avoid" style="margin-top: 32px;">
        <h3 class="text-xs font-black uppercase text-slate-950 tracking-widest border-b-2 border-slate-950 pb-1 flex items-center gap-2" style="font-weight: 900; font-size: 12px; text-transform: uppercase; border-bottom-width: 2px; border-color: #0f172a; padding-bottom: 4px; margin-bottom: 16px;">
          <span>III. Estrategia de Evaluación Formativa</span>
        </h3>
        <div class="border-2 border-slate-900 rounded p-5 bg-slate-50/20 text-xs shadow-[4px_4px_0px_0px_rgba(106,27,49,0.15)]" style="border-width: 2px; border-color: #0f172a; padding: 20px; border-radius: 4px; background-color: rgba(248, 250, 252, 0.2);">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; margin-bottom: 16px;">
            <div>
              <span class="font-bold text-slate-700 text-[9px] tracking-wider uppercase block mb-1" style="font-weight: 700; color: #475569; font-size: 9px; text-transform: uppercase; margin-bottom: 4px;">Técnicas de Evaluación Sugeridas:</span>
              <div class="flex flex-wrap gap-1" style="display: flex; flex-wrap: wrap; gap: 4px;">
                ${plan.evaluacionFormativa.tecnicas.map(tec => `
                  <span class="bg-white border border-slate-300 text-slate-800 px-2 py-0.5 rounded font-bold" style="background-color: white; border: 1px solid #cbd5e1; color: #1e293b; padding: 2px 8px; border-radius: 4px; font-weight: 700;">
                    ${tec.replace(/"/g, '&quot;')}
                  </span>
                `).join('')}
              </div>
            </div>
            <div>
              <span class="font-bold text-slate-700 text-[9px] tracking-wider uppercase block mb-1" style="font-weight: 700; color: #475569; font-size: 9px; text-transform: uppercase; margin-bottom: 4px;">Instrumentos Recomendados:</span>
              <div class="flex flex-wrap gap-1" style="display: flex; flex-wrap: wrap; gap: 4px;">
                ${plan.evaluacionFormativa.instrumentos.map(ins => `
                  <span class="bg-white border border-slate-300 text-slate-800 px-2 py-0.5 rounded font-bold" style="background-color: white; border: 1px solid #cbd5e1; color: #1e293b; padding: 2px 8px; border-radius: 4px; font-weight: 700;">
                    ${ins.replace(/"/g, '&quot;')}
                  </span>
                `).join('')}
              </div>
            </div>
          </div>
          <div>
            <span class="font-bold text-slate-700 text-[9px] tracking-wider uppercase block mb-1" style="font-weight: 700; color: #475569; font-size: 9px; text-transform: uppercase; margin-bottom: 4px;">Descripción del Proceso de Evaluación:</span>
            <p class="text-slate-800 leading-relaxed font-normal bg-white p-3 rounded border border-slate-200" style="color: #1e293b; background-color: white; padding: 12px; border-radius: 4px; border: 1px solid #e2e8f0; line-height: 1.625;">
              ${plan.evaluacionFormativa.descripcion.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
            </p>
          </div>
        </div>
      </div>

      <!-- Adecuaciones -->
      <div class="space-y-4 mt-8 page-break-inside-avoid" style="margin-top: 32px;">
        <h3 class="text-xs font-black uppercase text-slate-950 tracking-widest border-b-2 border-slate-950 pb-1 flex items-center gap-2" style="font-weight: 900; font-size: 12px; text-transform: uppercase; border-bottom-width: 2px; border-color: #0f172a; padding-bottom: 4px; margin-bottom: 16px;">
          <span>IV. Ajustes Razonables / Diseño Universal para el Aprendizaje (DUA)</span>
        </h3>
        <div class="border-2 border-slate-900 rounded p-5 bg-slate-50/20 text-xs leading-relaxed text-slate-800 font-normal shadow-[4px_4px_0px_0px_rgba(106,27,49,0.15)]" style="border-width: 2px; border-color: #0f172a; padding: 20px; border-radius: 4px; background-color: rgba(248, 250, 252, 0.2); line-height: 1.625; color: #1e293b;">
          <p style="white-space: pre-wrap;">${plan.sugerenciasAdecuacion.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        </div>
      </div>

      <!-- Firmas -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 pt-8 border-t-2 border-slate-900 text-xs text-center page-break-inside-avoid" style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 48px; text-align: center; border-top-width: 2px; border-color: #0f172a; padding-top: 32px; margin-top: 64px;">
        <div class="flex flex-col items-center" style="display: flex; flex-direction: column; align-items: center;">
          <div class="w-48 border-b-2 border-slate-900 mb-2 mt-8" style="width: 192px; border-bottom: 2px solid #0f172a; margin-top: 32px; margin-bottom: 8px;"></div>
          <span class="font-black text-slate-900 uppercase block" style="font-weight: 900; color: #020617; text-transform: uppercase;">${docenteName.replace(/"/g, '&quot;')}</span>
          <span class="text-slate-500 font-bold block text-[9px] uppercase" style="color: #64748b; font-weight: 700; font-size: 9px; text-transform: uppercase;">Profesor(a) Titular de la Disciplina</span>
        </div>
        <div class="flex flex-col items-center" style="display: flex; flex-direction: column; align-items: center;">
          <div class="w-48 border-b-2 border-slate-900 mb-2 mt-8" style="width: 192px; border-bottom: 2px solid #0f172a; margin-top: 32px; margin-bottom: 8px;"></div>
          <span class="font-black text-slate-900 uppercase block" style="font-weight: 900; color: #020617; text-transform: uppercase;">${((nivel || '').toLowerCase() === 'preescolar' || (nivel || '').toLowerCase() === 'primaria') ? 'Dirección de la Escuela' : 'Coordinación Académica'}</span>
          <span class="text-slate-500 font-bold block text-[9px] uppercase" style="color: #64748b; font-weight: 700; font-size: 9px; text-transform: uppercase;">${((nivel || '').toLowerCase() === 'preescolar' || (nivel || '').toLowerCase() === 'primaria') ? 'Autorizado / Visto Bueno' : 'Visto Bueno (Vo. Bo.) Dirección'}</span>
        </div>
      </div>
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 600);
    }
  </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Planeacion_NEM_Fase6_${disciplina.replace(/\s+/g, '_')}_${grado.replace(/\s+/g, '_')}.html`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  React.useEffect(() => {
    // Automatically trigger printing with a tiny delay so the browser fully renders layout
    const timer = setTimeout(() => {
      try {
        window.print();
      } catch (e) {
        console.error("Print blocked by iframe restrictions:", e);
        setPrintBlocked(true);
      }
    }, 700);
    return () => clearTimeout(timer);
  }, [planData.id]); // trigger when a different plan is selected too


  return (
    <div className="space-y-6">
      {/* Barra de Herramientas de Control - Oculta al imprimir */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded border border-slate-200 shadow-sm print:hidden">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-mex-maroon text-xs font-bold uppercase tracking-wider transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Formulador</span>
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={handleDownloadHtml}
            className="w-full sm:w-auto px-5 py-2.5 rounded bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-sm active:scale-[0.98]"
            title="Descargar planeación completa en formato HTML"
          >
            <Download className="w-4 h-4 text-mex-gold" />
            <span>Descargar Planeación</span>
          </button>

          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-5 py-2.5 rounded bg-mex-maroon hover:bg-mex-maroon/90 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-sm active:scale-[0.98]"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Planeación</span>
          </button>
        </div>
      </div>

      {/* Contenedor del Formato de Planeación para Imprimir */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Contenedor del Formato de Planeación para Imprimir */}
        <div id="print-area" className="lg:col-span-2 bg-white p-8 sm:p-12 rounded border-2 border-slate-900 shadow-[6px_6px_0px_0px_rgba(106,27,49,0.15)] font-sans text-slate-900 print:border-none print:p-0 print:shadow-none">
        
        {/* Encabezado Escolar */}
        <div className="text-center border-b-2 border-slate-900 pb-4 mb-6">
          <h1 className="font-black text-lg tracking-wider text-slate-950 uppercase mb-1">Planeación Didáctica</h1>
          <h2 className="text-sm font-extrabold text-mex-maroon uppercase mb-0.5">{escuelaName}</h2>
          <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">C.C.T. {cct}</span>
        </div>

        {/* Tabla Principal de Identificación Curricular (Formato Matriz Escolar) */}
        <div className="border-2 border-slate-900 text-xs mb-6 overflow-hidden rounded">
          {/* Fila 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-slate-900">
            <div className="p-3 border-r-2 border-slate-900 bg-slate-50/50">
              <span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5">DOCENTE:</span>
              <span className="font-black text-slate-950 text-xs uppercase">{docenteName}</span>
            </div>
            <div className="p-3 bg-slate-50/50 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5">FECHA / DURACIÓN ESTIMADA:</span>
                <span className="font-bold text-slate-950 text-xs">{planData.duracionSemanas || "2 semanas"}</span>
              </div>
              {planData.duracionSesion && (
                <div className="text-right border-l pl-4 border-slate-300">
                  <span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5">SESIÓN DE CLASE:</span>
                  <span className="font-bold text-slate-950 text-xs">{planData.duracionSesion}</span>
                </div>
              )}
            </div>
          </div>

          {/* Fila 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b-2 border-slate-900">
            <div className="p-3 border-r-2 border-slate-900 bg-slate-50/50">
              <span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5">CAMPO FORMATIVO:</span>
              <span className="font-bold text-slate-950">{campoFormativo}</span>
            </div>
            <div className="p-3 border-r-2 border-slate-900 bg-slate-50/50">
              <span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5">DISCIPLINA:</span>
              <span className="font-bold text-slate-950">{disciplina}</span>
            </div>
            <div className="p-3 bg-slate-50/50">
              <span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5">GRADO Y GRUPO:</span>
              <span className="font-bold text-slate-950">{grado} - Grupo "{grupo}"</span>
            </div>
          </div>

          {/* Fila 3 - Título / Producto */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-slate-900">
            <div className="p-3 border-r-2 border-slate-900">
              <span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5">PRODUCTO FINAL SUGERIDO:</span>
              <span className="font-bold text-slate-950 text-mex-maroon">{plan.producto}</span>
            </div>
            <div className="p-3">
              <span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5">{(nivel || '').toLowerCase() === 'preescolar' ? 'MODALIDAD DE TRABAJO:' : 'METODOLOGÍA NEM:'}</span>
              <span className="font-bold text-slate-950">{metodologia}</span>
            </div>
          </div>

          {/* Fila 4 - Situación Problema */}
          <div className="p-3 border-b-2 border-slate-900 bg-slate-50/30">
            <span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5">SITUACIÓN-PROBLEMA DEL CONTEXTO:</span>
            <span className="text-slate-950 italic mt-0.5 block leading-relaxed">"{situacionProblema}"</span>
          </div>

          {/* Fila 5 - Propósito */}
          <div className="p-3 border-b-2 border-slate-900">
            <span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5">PROPÓSITO DEL PROYECTO:</span>
            <span className="text-slate-950 mt-0.5 block leading-relaxed font-medium">{plan.proposito}</span>
          </div>

          {/* Fila 6 - Contenido y PDA */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-slate-900">
            <div className="p-3 border-r-2 border-slate-900">
              <span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5">CONTENIDO SINTÉTICO:</span>
              <span className="font-bold text-slate-950 mt-0.5 block leading-normal">{contenido}</span>
            </div>
            <div className="p-3">
              <span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-0.5">PROCESO DE DESARROLLO DE APRENDIZAJE (PDA):</span>
              <span className="font-bold text-slate-950 mt-0.5 block leading-normal">{pda}</span>
            </div>
          </div>

          {/* Fila 7 - Ejes Articuladores */}
          <div className="p-3 bg-slate-50/50">
            <span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-1.5">EJES ARTICULADORES TRANSVERSALES:</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {ejesArticuladores.map((eje, i) => (
                <span
                  key={i}
                  className="bg-mex-maroon/5 text-mex-maroon text-[9px] font-black px-2 py-0.5 rounded border border-mex-maroon/15 uppercase tracking-wide"
                >
                  {eje}
                </span>
              ))}
            </div>
          </div>

          {/* Fila 8 - BAP Seleccionados */}
          {bapSelected && bapSelected.length > 0 && (
            <div className="p-3 bg-slate-50/50 border-t-2 border-slate-900">
              <span className="font-bold text-slate-700 uppercase text-[9px] tracking-wider block mb-1.5">BAP / APTITUDES SOBRESALIENTES EN EL GRUPO:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {bapSelected.map((bap, i) => (
                  <span
                    key={i}
                    className="bg-[#991b1b]/5 text-[#991b1b] text-[9px] font-black px-2 py-0.5 rounded border border-[#991b1b]/15 uppercase tracking-wide"
                  >
                    {bap}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SECUENCIA DIDÁCTICA DETALLADA POR FASES/MOMENTOS */}
        <div className="space-y-6 mt-8">
          <h3 className="text-xs font-black uppercase text-slate-950 tracking-widest border-b-2 border-slate-950 pb-1 flex items-center gap-2">
            <span>II. Secuencia de Aprendizaje</span>
          </h3>

          {plan.fases.map((fase, fIndex) => (
            <div key={fIndex} className="border-2 border-slate-900 rounded overflow-hidden shadow-[4px_4px_0px_0px_rgba(106,27,49,0.15)] page-break-inside-avoid">
              {/* Encabezado de la Fase / Momento */}
              <div className="bg-mex-maroon text-white p-3 font-bold text-xs uppercase tracking-wider flex items-center justify-between border-b-2 border-slate-900">
                <span>{fase.nombre}</span>
                <span className="text-[9px] bg-mex-gold text-slate-950 font-black px-2 py-0.5 rounded tracking-wider">
                  {nivel?.toLowerCase() === 'preescolar' ? 'Estructura Didáctica' : 'Fase Metodológica'}
                </span>
              </div>

              {/* Lista de Sesiones dentro de esta fase */}
              <div className="divide-y-2 divide-slate-900">
                {fase.sesiones.map((sesion, sIndex) => (
                  <div key={sIndex} className="p-4 sm:p-5 bg-white text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2 mb-3">
                      <span className="font-black text-xs text-slate-900 uppercase tracking-wide">
                        Sesión {sesion.numero}: {sesion.titulo}
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-mex-maroon bg-mex-maroon/5 px-2.5 py-0.5 rounded border border-mex-maroon/15 text-[10px]">
                          Duración: {sesion.duracion}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleGenerateWorksheet(fase.nombre, sesion)}
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition shadow-2xs cursor-pointer print:hidden active:scale-95"
                          title="Crear hoja de trabajo con las actividades de esta sesión"
                        >
                          <FileText className="w-3.5 h-3.5 text-blue-200" />
                          <span>Crear hoja de trabajo</span>
                        </button>
                      </div>
                    </div>

                    {/* Actividades de la Sesión en un diseño tabular elegante */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      {/* Inicio */}
                      <div className="border border-slate-300 rounded p-3 bg-slate-50/50">
                        <span className="font-black text-[9px] text-mex-maroon tracking-wider uppercase block border-b border-mex-maroon/10 pb-1 mb-1.5">
                          Actividades de Inicio (Motivación y Saberes)
                        </span>
                        <p className="text-slate-800 leading-relaxed font-normal whitespace-pre-line">{sesion.inicio}</p>
                      </div>

                      {/* Desarrollo */}
                      <div className="border border-slate-300 rounded p-3 bg-white">
                        <span className="font-black text-[9px] text-emerald-800 tracking-wider uppercase block border-b border-emerald-100 pb-1 mb-1.5">
                          Actividades de Desarrollo (Acción e Indagación)
                        </span>
                        <p className="text-slate-800 leading-relaxed font-normal whitespace-pre-line">{sesion.desarrollo}</p>
                      </div>

                      {/* Cierre */}
                      <div className="border border-slate-300 rounded p-3 bg-slate-50/50">
                        <span className="font-black text-[9px] text-[#b45309] tracking-wider uppercase block border-b border-amber-100/50 pb-1 mb-1.5">
                          Actividades de Cierre (Síntesis y Evaluación)
                        </span>
                        <p className="text-slate-800 leading-relaxed font-normal whitespace-pre-line">{sesion.cierre}</p>
                      </div>
                    </div>

                    {/* Recursos y Materiales */}
                    <div className="bg-slate-50 rounded p-2.5 border border-slate-200">
                      <span className="font-bold text-slate-700 text-[9px] block uppercase tracking-wider">RECURSOS Y MATERIALES REQUERIDOS:</span>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {sesion.materiales.map((mat, i) => (
                          <span
                            key={i}
                            className="bg-white border border-slate-300 text-slate-800 text-[9px] font-semibold px-2 py-0.5 rounded"
                          >
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Evaluación Formativa Integrada de la Sesión */}
                    {sesion.evaluacionSesion && (
                      <div className="mt-2.5 bg-[#fffaf5] rounded p-2.5 border border-[#fed7aa]/40">
                        <span className="font-black text-amber-900 text-[9px] block uppercase tracking-wider">EVALUACIÓN FORMATIVA INTEGRADA EN ESTA SESIÓN:</span>
                        <p className="text-slate-800 font-medium text-xs mt-1 italic leading-relaxed whitespace-pre-line">{sesion.evaluacionSesion}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* EVALUACIÓN FORMATIVA */}
        <div className="space-y-4 mt-8 page-break-inside-avoid">
          <h3 className="text-xs font-black uppercase text-slate-950 tracking-widest border-b-2 border-slate-950 pb-1 flex items-center gap-2">
            <span>III. Estrategia de Evaluación Formativa</span>
          </h3>
          <div className="border-2 border-slate-900 rounded p-5 bg-slate-50/20 text-xs shadow-[4px_4px_0px_0px_rgba(106,27,49,0.15)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <span className="font-bold text-slate-700 text-[9px] tracking-wider uppercase block mb-1">Técnicas de Evaluación Sugeridas:</span>
                <div className="flex flex-wrap gap-1">
                  {plan.evaluacionFormativa.tecnicas.map((tec, i) => (
                    <span key={i} className="bg-white border border-slate-300 text-slate-800 px-2 py-0.5 rounded font-bold">
                      {tec}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-bold text-slate-700 text-[9px] tracking-wider uppercase block mb-1">
                  Instrumentos Recomendados (Diseña e Imprime con Gemini):
                </span>
                <div className="flex flex-wrap gap-2 items-center">
                  {plan.evaluacionFormativa.instrumentos.map((ins, i) => (
                    <div
                      key={i}
                      className="bg-white border border-slate-300 text-slate-900 px-2.5 py-1 rounded-lg font-bold text-xs flex items-center gap-2 shadow-2xs hover:border-mex-maroon transition"
                    >
                      <span>{ins}</span>
                      <button
                        type="button"
                        onClick={() => handleGenerateInstrument(ins)}
                        className="px-2 py-0.5 bg-mex-maroon hover:bg-mex-maroon/90 text-white rounded font-black text-[10px] tracking-wider uppercase flex items-center gap-1 transition shadow-2xs print:hidden cursor-pointer active:scale-95"
                        title={`Diseñar ${ins} con Gemini para este proyecto`}
                      >
                        <Sparkles className="w-3 h-3 text-mex-gold" />
                        <span>Crear</span>
                      </button>
                    </div>
                  ))}

                  {!showCustomInput ? (
                    <button
                      type="button"
                      onClick={() => setShowCustomInput(true)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-lg text-xs font-bold flex items-center gap-1 transition print:hidden cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-mex-maroon" />
                      <span>Crear otro...</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-mex-maroon shadow-sm print:hidden">
                      <input
                        type="text"
                        placeholder="Ej. Guía de Coevaluación"
                        value={customInstrumentName}
                        onChange={(e) => setCustomInstrumentName(e.target.value)}
                        className="px-2 py-0.5 text-xs border border-slate-200 rounded text-slate-900 font-medium focus:outline-none w-36"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (customInstrumentName.trim()) {
                            handleGenerateInstrument(customInstrumentName.trim());
                            setCustomInstrumentName("");
                            setShowCustomInput(false);
                          }
                        }}
                        disabled={!customInstrumentName.trim()}
                        className="px-2.5 py-1 bg-mex-maroon hover:bg-mex-maroon/90 disabled:opacity-50 text-white rounded font-black text-[10px] uppercase flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-mex-gold" />
                        <span>Generar</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCustomInput(false)}
                        className="text-slate-400 hover:text-slate-600 text-xs px-1 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <span className="font-bold text-slate-700 text-[9px] tracking-wider uppercase block mb-1">Descripción del Proceso de Evaluación:</span>
              <p className="text-slate-800 leading-relaxed font-normal bg-white p-3 rounded border border-slate-200">
                {plan.evaluacionFormativa.descripcion}
              </p>
            </div>
          </div>
        </div>

        {/* ADECUACIONES CURRICULARES / DUA */}
        <div className="space-y-4 mt-8 page-break-inside-avoid">
          <h3 className="text-xs font-black uppercase text-slate-950 tracking-widest border-b-2 border-slate-950 pb-1 flex items-center gap-2">
            <span>IV. Ajustes Razonables / Diseño Universal para el Aprendizaje (DUA)</span>
          </h3>
          <div className="border-2 border-slate-900 rounded p-5 bg-slate-50/20 text-xs leading-relaxed text-slate-800 font-normal shadow-[4px_4px_0px_0px_rgba(106,27,49,0.15)]">
            <p className="whitespace-pre-line">{plan.sugerenciasAdecuacion}</p>
          </div>
        </div>

        {/* SECCIÓN DE FIRMAS - MUY IMPORTANTE EN MÉXICO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 pt-8 border-t-2 border-slate-900 text-xs text-center page-break-inside-avoid">
          <div className="flex flex-col items-center">
            <div className="w-48 border-b-2 border-slate-900 mb-2 mt-8" />
            <span className="font-black text-slate-900 uppercase block">{docenteName}</span>
            <span className="text-slate-500 font-bold block text-[9px] uppercase">Profesor(a) Titular de la Disciplina</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-48 border-b-2 border-slate-900 mb-2 mt-8" />
            <span className="font-black text-slate-900 uppercase block">
              {((nivel || "").toLowerCase() === "preescolar" || (nivel || "").toLowerCase() === "primaria")
                ? "Dirección de la Escuela"
                : "Coordinación Académica"}
            </span>
            <span className="text-slate-500 font-bold block text-[9px] uppercase">
              {((nivel || "").toLowerCase() === "preescolar" || (nivel || "").toLowerCase() === "primaria")
                ? "Autorizado / Visto Bueno"
                : "Visto Bueno (Vo. Bo.) Dirección"}
            </span>
          </div>
        </div>

      </div>

      {/* Asistente de Chat con Gemini - Oculto al imprimir */}
      <div className="lg:col-span-1 bg-white border-2 border-slate-900 rounded shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] overflow-hidden flex flex-col h-[650px] sticky top-6 print:hidden">
        {/* Cabecera del Chat */}
        <div className="bg-slate-900 p-4 flex items-center justify-between text-white border-b-2 border-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-mex-maroon/20 rounded-lg flex items-center justify-center border border-white/10">
              <Bot className="w-4 h-4 text-mex-gold" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs tracking-wider uppercase flex items-center gap-1.5">
                <span>Asistente de Planeación</span>
                <Sparkles className="w-3 h-3 text-mex-gold animate-pulse" />
              </h4>
              <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wide">Gemini 3.5 en Español (México)</span>
            </div>
          </div>
          {isModifying && (
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          )}
        </div>

        {/* Historial de Mensajes */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 flex flex-col">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                msg.sender === "user"
                  ? "bg-mex-maroon text-white rounded-tr-none self-end"
                  : "bg-white text-slate-800 border border-slate-200/80 rounded-tl-none self-start shadow-xs"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1 opacity-70">
                {msg.sender === "user" ? (
                  <>
                    <User className="w-3 h-3" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Tú (Docente)</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-3 h-3" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Gemini NEM</span>
                  </>
                )}
              </div>
              <p className="whitespace-pre-wrap font-medium">{msg.text}</p>
            </div>
          ))}
          
          {isModifying && (
            <div className="bg-white text-slate-800 border border-slate-200/80 rounded-2xl rounded-tl-none p-3.5 text-xs self-start shadow-xs flex items-center gap-2.5 max-w-[85%]">
              <Loader2 className="w-4 h-4 text-mex-maroon animate-spin" />
              <span className="font-semibold text-slate-500">Analizando y rediseñando planeación...</span>
            </div>
          )}
          
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-950 p-3 rounded-xl text-[11px] font-semibold flex items-start gap-2 max-w-[85%]">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block uppercase text-red-800 text-[9px] tracking-wide">Error del servidor</span>
                <span>{errorMsg}</span>
              </div>
            </div>
          )}
        </div>

        {/* Formulario de Entrada */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t-2 border-slate-900 flex gap-2">
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            disabled={isModifying}
            placeholder="Escribe un cambio (ej: Agrega más juegos)..."
            className="flex-1 bg-slate-50 hover:bg-slate-100/50 focus:bg-white px-3.5 py-2.5 rounded-xl text-xs border border-slate-300 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-950 transition"
          />
          <button
            type="submit"
            disabled={!chatMessage.trim() || isModifying}
            className="bg-mex-maroon hover:bg-mex-maroon/95 disabled:bg-slate-200 disabled:text-slate-400 text-white p-2.5 rounded-xl transition flex items-center justify-center shadow-md shadow-mex-maroon/10 active:scale-95 shrink-0"
            title="Enviar solicitud de cambio"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Modal de Generación e Impresión del Instrumento de Evaluación */}
      <InstrumentoEvaluacionModal
        isOpen={isInstrumentModalOpen}
        onClose={() => setIsInstrumentModalOpen(false)}
        instrumentName={selectedInstrumentName}
        instrumentData={instrumentData}
        isLoading={isGeneratingInstrument}
        error={instrumentError}
        planData={planData}
        onRegenerate={() => handleGenerateInstrument(selectedInstrumentName)}
      />

      {/* Modal de Generación de Hoja de Trabajo para el Alumno */}
      <HojaDeTrabajoModal
        isOpen={isWorksheetModalOpen}
        onClose={() => setIsWorksheetModalOpen(false)}
        worksheet={worksheetData}
        isLoading={isGeneratingWorksheet}
        error={worksheetError}
        onRetry={() => activeWorksheetSessionMeta.sesionObj && handleGenerateWorksheet(activeWorksheetSessionMeta.faseNombre, activeWorksheetSessionMeta.sesionObj)}
        meta={{
          escuelaName,
          cct,
          docenteName,
          grado,
          grupo,
          campoFormativo,
          disciplina,
          pda,
          sesionNumero: activeWorksheetSessionMeta.sesionNumero,
          sesionTitulo: activeWorksheetSessionMeta.sesionTitulo,
        }}
      />

    </div>

      {/* Estilos CSS Específicos para un Formato de Impresión Insuperable */}
      <style>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
            font-size: 11px !important;
          }
          /* Ocultar elementos que no deben imprimirse */
          header, footer, nav, aside, .print\\:hidden, #google-link-banner, #planeacion-form, #history-sidebar {
            display: none !important;
          }
          #print-area {
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            width: 100% !important;
          }
          .page-break-inside-avoid {
            page-break-inside: avoid !important;
          }
          .bg-slate-50\\/50 {
            background-color: #f8fafc !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .bg-slate-900 {
            background-color: #0f172a !important;
            color: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .bg-slate-200 {
            background-color: #e2e8f0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}
