import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, HelpCircle, FileText, Check, Layers, Printer, AlertCircle, Download } from "lucide-react";

interface CrearProgramaAnaliticoViewProps {
  onUseContent: (data: {
    nivel: string;
    grado: string;
    campoFormativo: string;
    disciplina: string;
    contenido: string;
    pda: string;
    metodologia: string;
    ejesArticuladores: string[];
    situacionProblema: string;
    nombreProyecto: string;
  }) => void;
  onBack: () => void;
  escuelaName: string;
  cct: string;
  docenteName: string;
}

interface PDALine {
  contenido: string;
  pda: string;
  tipo: "normal" | "modificado" | "nuevo";
  nota?: string;
  disciplina: string;
}

interface ProgramaAnaliticoResponse {
  fase: string;
  grado: string;
  problema: string;
  nombreProyecto: string;
  camposFormativos: {
    saberes: PDALine[];
    lenguajes: PDALine[];
    etica: PDALine[];
    humano: PDALine[];
  };
  metodologia: {
    tipo: string;
    ejeArticulador: string;
    orientaciones: string;
  };
}

export default function CrearProgramaAnaliticoView({ 
  onUseContent, 
  onBack,
  escuelaName,
  cct,
  docenteName
}: CrearProgramaAnaliticoViewProps) {
  const [nivel, setNivel] = useState<string>("Secundaria");
  const [grado, setGrado] = useState<string>("1º de Secundaria");
  const [situacionProblema, setSituacionProblema] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [programa, setPrograma] = useState<ProgramaAnaliticoResponse | null>(null);
  
  const [printBlocked, setPrintBlocked] = useState<boolean>(false);

  // Auto-update default grado when nivel changes
  useEffect(() => {
    if (nivel === "Preescolar") {
      setGrado("3º de Preescolar");
    } else if (nivel === "Primaria") {
      setGrado("4º de Primaria");
    } else {
      setGrado("1º de Secundaria");
    }
  }, [nivel]);

  const loadingTexts = [
    "Analizando el contexto escolar y la situación-problema...",
    "Consultando planes de estudio oficiales y fases de la NEM...",
    "Seleccionando y contextualizando Contenidos Sintéticos...",
    "Redactando y codiseñando Procesos de Desarrollo de Aprendizaje (PDA)...",
    "Vinculando metodologías sociocríticas y ejes articuladores oficiales...",
    "Estructurando el Programa Analítico integrado..."
  ];

  useEffect(() => {
    let interval: any;
    if (loading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingTexts.length - 1 ? prev + 1 : prev));
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!situacionProblema.trim()) return;

    setLoading(true);
    setPrograma(null);
    setPrintBlocked(false);

    try {
      const response = await fetch("/api/generate-programa-analitico", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nivel,
          grado,
          situacionProblema,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Error al generar el programa analítico.");
      }

      const data = await response.json();
      if (data.success && data.programaAnalitico) {
        setPrograma(data.programaAnalitico);
      } else {
        throw new Error("Formato de respuesta inválido.");
      }
    } catch (err: any) {
      console.error(err);
      alert(`Error: ${err.message || "No se pudo conectar con el servidor."}`);
    } finally {
      setLoading(false);
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
    if (!programa) return;

    const renderPdaListHtml = (pdaList: PDALine[]) => {
      return pdaList.map(item => {
        let pdaStyle = "border: 1px solid #cbd5e1; background-color: #ffffff;";
        let badgeText = "PDA Sintético";
        let badgeStyle = "background-color: #f1f5f9; color: #475569;";
        if (item.tipo === "modificado") {
          pdaStyle = "border: 1px solid #fde68a; background-color: #fefbeb;";
          badgeText = "PDA Modificado (*)";
          badgeStyle = "background-color: #fef3c7; color: #92400e;";
        } else if (item.tipo === "nuevo") {
          pdaStyle = "border: 1px solid #bae6fd; background-color: #f0f9ff;";
          badgeText = "Nuevo PDA (Codiseño **)";
          badgeStyle = "background-color: #e0f2fe; color: #075985;";
        }

        return `
          <div style="padding: 10px; margin-bottom: 10px; border-radius: 8px; ${pdaStyle}">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-size: 8px; font-weight: 800; text-transform: uppercase; padding: 2px 6px; border-radius: 9999px; ${badgeStyle}">${badgeText}</span>
              ${(item.disciplina && nivel !== "Preescolar") ? `<span style="font-size: 8px; font-weight: 700; text-transform: uppercase; background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 2px 4px; border-radius: 4px;">${item.disciplina}</span>` : ""}
            </div>
            <div style="font-size: 10px; line-height: 1.4;">
              <p style="color: #64748b; margin: 0 0 4px 0;"><strong style="font-size: 8px; text-transform: uppercase; color: #64748b; display: block;">Contenido:</strong>${item.contenido}</p>
              <p style="color: #1e293b; margin: 0; font-weight: bold;"><strong style="font-size: 8px; text-transform: uppercase; color: #64748b; display: block;">PDA:</strong>${item.pda}</p>
              ${item.nota ? `<p style="font-size: 9px; color: #475569; font-style: italic; margin-top: 6px; background-color: #f8fafc; padding: 6px; border-radius: 4px; border: 1px solid #e2e8f0;">${item.nota}</p>` : ""}
            </div>
          </div>
        `;
      }).join('');
    };

    const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Programa Analítico - ${escuelaName.replace(/"/g, '&quot;')}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    body {
      font-family: 'Inter', sans-serif;
    }
    @media print {
      body {
        background-color: white !important;
        color: black !important;
        font-size: 10px !important;
      }
      .no-print {
        display: none !important;
      }
      @page {
        size: landscape;
        margin: 0.8cm;
      }
    }
  </style>
</head>
<body class="bg-slate-50 p-4 sm:p-8 text-slate-900 font-sans">
  <div class="max-w-[1400px] mx-auto">
    <!-- Indicaciones para el docente -->
    <div class="no-print mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-950 text-xs font-semibold flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
      <div class="flex items-center gap-2.5">
        <span class="text-lg">📄</span>
        <span>Este archivo contiene tu Programa Analítico con formato horizontal listo para impresión. Abre este archivo en tu navegador e imprímelo o guárdalo como PDF.</span>
      </div>
      <button onclick="window.print()" class="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-black text-white font-bold rounded uppercase tracking-wider text-[10px] transition shadow-sm">
        Imprimir / Guardar PDF
      </button>
    </div>

    <!-- Contenido del Programa Analítico -->
    <div class="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm">
      <!-- Encabezado -->
      <div class="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-6 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span class="text-[10px] font-black tracking-widest uppercase text-white/90">
            ${escuelaName.replace(/"/g, '&quot;')} • C.C.T. ${cct.replace(/"/g, '&quot;')}
          </span>
          <h2 class="text-xl sm:text-2xl font-black tracking-tight mt-1">
            Programa Analítico Integrado
          </h2>
        </div>
        <div class="bg-white/10 px-4 py-2 rounded-xl border border-white/25 text-xs font-black uppercase tracking-wider self-center">
          ${programa.fase.replace(/"/g, '&quot;')} • ${programa.grado.replace(/"/g, '&quot;')}
        </div>
      </div>

      <!-- Simbología -->
      <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-1.5 my-4">
        <h5 class="font-bold text-slate-700 uppercase tracking-wide text-[9px]">
          Simbología del Codiseño y Contextualización:
        </h5>
        <div style="display: flex; flex-wrap: wrap; gap: 15px; font-weight: 500; color: #475569;">
          <span style="display: flex; align-items: center; gap: 6px;">
            <span style="width: 10px; height: 10px; border-radius: 50%; background-color: #10b981; display: inline-block;"></span>
            <strong>PDA sin asterisco:</strong> Programa sintético normal
          </span>
          <span style="display: flex; align-items: center; gap: 6px;">
            <span style="width: 10px; height: 10px; border-radius: 50%; background-color: #f59e0b; display: inline-block;"></span>
            <strong>*PDA Modificado:</strong> Contextualizado/Adecuado
          </span>
          <span style="display: flex; align-items: center; gap: 6px;">
            <span style="width: 10px; height: 10px; border-radius: 50%; background-color: #38bdf8; display: inline-block;"></span>
            <strong>**Nuevo PDA:</strong> Propuesto en codiseño
          </span>
        </div>
      </div>

      <!-- Tabla de 7 Columnas -->
      <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 12px; margin-top: 20px;">
        <!-- 1. Problema -->
        <div style="background-color: #fdf4ff; border: 1px solid #fae8ff; border-radius: 12px; padding: 12px;">
          <div style="background-color: #a21caf; color: white; font-weight: 800; font-size: 8px; text-transform: uppercase; text-align: center; padding: 6px; border-radius: 6px; margin-bottom: 10px;">
            Problema identificado
          </div>
          <div style="background-color: white; padding: 10px; border: 1px solid #f3e8ff; border-radius: 8px; font-weight: bold; font-size: 10px; line-height: 1.4; color: #1e1b4b;">
            ${programa.problema.replace(/"/g, '&quot;')}
          </div>
        </div>

        <!-- 2. Saberes -->
        <div style="background-color: #f0fdfa; border: 1px solid #ccfbf1; border-radius: 12px; padding: 12px;">
          <div style="background-color: #0d9488; color: white; font-weight: 800; font-size: 8px; text-transform: uppercase; text-align: center; padding: 6px; border-radius: 6px; margin-bottom: 10px;">
            Saberes y Pensamiento Científico
          </div>
          ${renderPdaListHtml(programa.camposFormativos.saberes)}
        </div>

        <!-- 3. Lenguajes -->
        <div style="background-color: #fff7ed; border: 1px solid #ffedd5; border-radius: 12px; padding: 12px;">
          <div style="background-color: #ea580c; color: white; font-weight: 800; font-size: 8px; text-transform: uppercase; text-align: center; padding: 6px; border-radius: 6px; margin-bottom: 10px;">
            Lenguajes
          </div>
          ${renderPdaListHtml(programa.camposFormativos.lenguajes)}
        </div>

        <!-- 4. Ética -->
        <div style="background-color: #f0f9ff; border: 1px solid #e0f2fe; border-radius: 12px; padding: 12px;">
          <div style="background-color: #0284c7; color: white; font-weight: 800; font-size: 8px; text-transform: uppercase; text-align: center; padding: 6px; border-radius: 6px; margin-bottom: 10px;">
            Ética, Naturaleza y Sociedades
          </div>
          ${renderPdaListHtml(programa.camposFormativos.etica)}
        </div>

        <!-- 5. Humano -->
        <div style="background-color: #f0fdf4; border: 1px solid #dcfce7; border-radius: 12px; padding: 12px;">
          <div style="background-color: #16a34a; color: white; font-weight: 800; font-size: 8px; text-transform: uppercase; text-align: center; padding: 6px; border-radius: 6px; margin-bottom: 10px;">
            De lo Humano y lo Comunitario
          </div>
          ${renderPdaListHtml(programa.camposFormativos.humano)}
        </div>

        <!-- 6. Metodología -->
        <div style="background-color: #eef2ff; border: 1px solid #e0e7ff; border-radius: 12px; padding: 12px;">
          <div style="background-color: #4f46e5; color: white; font-weight: 800; font-size: 8px; text-transform: uppercase; text-align: center; padding: 6px; border-radius: 6px; margin-bottom: 10px;">
            Metodología
          </div>
          <div style="background-color: white; padding: 10px; border: 1px solid #e0e7ff; border-radius: 8px; font-size: 10px; line-height: 1.4;">
            <p style="margin: 0 0 8px 0;"><strong>Metodología:</strong><br><span style="font-weight: bold; color: #4f46e5;">${programa.metodologia.tipo.replace(/"/g, '&quot;')}</span></p>
            <p style="margin: 0 0 8px 0;"><strong>Eje Articulador:</strong><br><span style="font-weight: bold; color: #4f46e5;">${programa.metodologia.ejeArticulador.replace(/"/g, '&quot;')}</span></p>
            <p style="margin: 0; font-style: italic; color: #475569;"><strong>Orientaciones:</strong><br>${programa.metodologia.orientaciones.replace(/"/g, '&quot;')}</p>
          </div>
        </div>

        <!-- 7. Nombre Proyecto -->
        <div style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 12px; padding: 12px;">
          <div style="background-color: #d97706; color: white; font-weight: 800; font-size: 8px; text-transform: uppercase; text-align: center; padding: 6px; border-radius: 6px; margin-bottom: 10px;">
            Proyecto Sugerido
          </div>
          <div style="background-color: white; padding: 14px 10px; border: 1px solid #fef3c7; border-radius: 8px; font-weight: 900; font-size: 11px; text-align: center; line-height: 1.4; color: #92400e;">
            "${programa.nombreProyecto.replace(/"/g, '&quot;')}"
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    }
  </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Programa_Analitico_${grado.replace(/\s+/g, '_')}.html`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Banner de Título */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm print:hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="font-extrabold text-slate-800 text-base mb-1 tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-mex-gold" />
            <span>Crear Programa Analítico con Codiseño</span>
          </h3>
          <p className="text-slate-500 text-xs leading-relaxed">
            Estructura el Programa Analítico integrado de tu fase. Selecciona nivel, grado y describe tu situación-problema. Gemini redactará de forma integrada los contenidos, codiseños (PDAs modificados y nuevos), metodología y sugerirá el proyecto didáctico asociable.
          </p>
        </div>
        <button
          onClick={onBack}
          className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition self-start sm:self-center shrink-0"
        >
          ← Volver al Panel
        </button>
      </div>

      {/* Formulario de Entrada */}
      {!programa && !loading && (
        <form onSubmit={handleGenerate} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6 max-w-3xl mx-auto print:hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nivel */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                Nivel Educativo
              </label>
              <select
                value={nivel}
                onChange={(e) => setNivel(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-mex-maroon/20 focus:border-mex-maroon transition"
              >
                <option value="Preescolar">Preescolar (Fase 2)</option>
                <option value="Primaria">Primaria (Fases 3, 4, 5)</option>
                <option value="Secundaria">Secundaria (Fase 6)</option>
              </select>
            </div>

            {/* Grado */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                Grado Escolar
              </label>
              {nivel === "Preescolar" && (
                <select
                  value={grado}
                  onChange={(e) => setGrado(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-mex-maroon/20 focus:border-mex-maroon transition"
                >
                  <option value="1º de Preescolar">1º de Preescolar</option>
                  <option value="2º de Preescolar">2º de Preescolar</option>
                  <option value="3º de Preescolar">3º de Preescolar</option>
                </select>
              )}
              {nivel === "Primaria" && (
                <select
                  value={grado}
                  onChange={(e) => setGrado(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-mex-maroon/20 focus:border-mex-maroon transition"
                >
                  <option value="1º de Primaria">1º de Primaria (Fase 3)</option>
                  <option value="2º de Primaria">2º de Primaria (Fase 3)</option>
                  <option value="3º de Primaria">3º de Primaria (Fase 4)</option>
                  <option value="4º de Primaria">4º de Primaria (Fase 4)</option>
                  <option value="5º de Primaria">5º de Primaria (Fase 5)</option>
                  <option value="6º de Primaria">6º de Primaria (Fase 5)</option>
                </select>
              )}
              {nivel === "Secundaria" && (
                <select
                  value={grado}
                  onChange={(e) => setGrado(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-mex-maroon/20 focus:border-mex-maroon transition"
                >
                  <option value="1º de Secundaria">1º de Secundaria</option>
                  <option value="2º de Secundaria">2º de Secundaria</option>
                  <option value="3º de Secundaria">3º de Secundaria</option>
                </select>
              )}
            </div>
          </div>

          {/* Situación Problema */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                Situación-Problema Identificado
              </label>
              <span className="text-[10px] font-bold text-slate-400">Puntual y contextual</span>
            </div>
            <textarea
              required
              rows={4}
              value={situacionProblema}
              onChange={(e) => setSituacionProblema(e.target.value)}
              placeholder="Ej: Nutrición deficiente de niñas y niños que asisten a la escuela, debido al consumo excesivo de comida chatarra y falta de desayunos saludables..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-mex-maroon/20 focus:border-mex-maroon transition resize-none"
            />
          </div>

          {/* Botón de envío */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={!situacionProblema.trim()}
              className="px-6 py-3 bg-mex-maroon hover:bg-mex-maroon/90 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-sm hover:shadow transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-mex-gold" />
              <span>Generar Programa Analítico</span>
            </button>
          </div>
        </form>
      )}

      {/* Estado de Carga */}
      {loading && (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 shadow-sm text-center max-w-2xl mx-auto space-y-6 print:hidden">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
            <div className="absolute inset-0 rounded-full border-4 border-mex-maroon border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-mex-gold animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-800 text-sm tracking-tight">Diseñando Programa Analítico</h4>
            <p className="text-mex-maroon text-xs font-bold animate-pulse tracking-wide">
              {loadingTexts[loadingStep]}
            </p>
          </div>
          <p className="text-[10px] text-slate-400 max-w-sm mx-auto leading-relaxed">
            Gemini está formulando una propuesta integral que vincula la problemática identificada con los contenidos y procesos de codiseño curricular oficiales de la SEP.
          </p>
        </div>
      )}

      {/* Resultado del Programa Analítico */}
      {programa && (
        <div className="space-y-6 animate-fade-in">
          {/* Instrucciones de Impresión y Planificación */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm print:hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1 max-w-xl">
              <h4 className="font-extrabold text-slate-800 text-sm tracking-tight flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500 stroke-[3px]" />
                <span>¡Programa Analítico Generado Exitosamente!</span>
              </h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Revisa el diagrama interactivo de tu programa de contextualización y codiseño. Puedes imprimirlo o descargar el archivo HTML de alta fidelidad para abrirlo en tu navegador y guardarlo directamente como PDF.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                onClick={handleDownloadHtml}
                className="px-4 py-2.5 bg-slate-900 hover:bg-black text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition flex items-center gap-2 shadow-sm"
                title="Descargar archivo HTML de alta fidelidad listo para imprimirse en formato horizontal"
              >
                <Download className="w-4 h-4 text-mex-gold" />
                <span>Descargar HTML Imprimible</span>
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition flex items-center gap-2"
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span>Imprimir PDF</span>
              </button>
              <button
                onClick={() => setPrograma(null)}
                className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition"
              >
                Nuevo Programa
              </button>
            </div>
          </div>

          {/* Aviso de ayuda si se bloquea la impresión (Común en frames sandboxed de AI Studio) */}
          <div className="bg-amber-50/80 border border-amber-200/60 p-4.5 rounded-xl text-amber-950 text-xs font-medium space-y-2 print:hidden shadow-sm">
            <p className="font-bold uppercase tracking-wide text-amber-900 flex items-center gap-2">
              <span>💡 Recomendación para una Impresión Exitosa</span>
            </p>
            <p className="leading-relaxed text-slate-700">
              Debido a las restricciones de seguridad del visor integrado (iframe) en AI Studio, la ventana de impresión de "Imprimir PDF" puede llegar a bloquearse temporalmente. Te recomendamos usar estas dos alternativas:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>Haz clic en <strong className="text-slate-900">"Descargar HTML Imprimible"</strong> para guardar un archivo interactivo en tu equipo que se abre directamente con el formato horizontal impecable y abre el diálogo de impresión de tu navegador de manera automática.</li>
              <li>Haz clic en el icono de <strong className="text-slate-900">"Abrir en una pestaña nueva"</strong> en la esquina superior derecha del panel de visualización, y usa el botón de imprimir con total libertad.</li>
            </ul>
          </div>

          {/* DOCUMENTO IMPRIMIBLE Y VISUAL (DIAGRAMA) */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-4 sm:p-8 space-y-6 print:border-0 print:shadow-none print:p-0">
            {/* Header / Datos de identificación */}
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-4 sm:p-6 text-white text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 print:bg-orange-500 print:text-black print:rounded-none">
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase text-white/95 print:text-slate-800">
                  {escuelaName} • C.C.T. {cct}
                </span>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
                  Programa Analítico Integrado
                </h2>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/25 text-xs font-black uppercase tracking-wider self-center print:border-slate-400">
                {programa.fase} • {programa.grado}
              </div>
            </div>

            {/* Simbología / Guía de Codiseño */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2 print:hidden">
              <h5 className="font-extrabold text-slate-700 uppercase tracking-wide text-[10px]">
                Simbología del Codiseño y Contextualización:
              </h5>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <strong>PDA sin asterisco:</strong> Sin contextualización requerida (Programa sintético)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <strong>*PDA Modificado:</strong> Con adecuación del colectivo docente
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  <strong>**Nuevo PDA:</strong> Propuesto basado en el contexto y justificación sintética
                </span>
              </div>
            </div>

            {/* Diagrama en Tabla/Grid - Estilo del folleto de Tobón */}
            <div className="overflow-x-auto">
              <div className="min-w-[1200px] grid grid-cols-7 gap-4 text-[11px] leading-relaxed">
                {/* 1. Problema Identificado */}
                <div className="bg-fuchsia-50/40 border border-fuchsia-100 rounded-2xl p-4 space-y-3">
                  <div className="bg-fuchsia-700 text-white font-black text-[10px] uppercase tracking-wider text-center py-2 px-3 rounded-lg shadow-sm print:bg-fuchsia-800">
                    Problema identificado y jerarquizado
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-fuchsia-200 font-bold text-slate-800 text-xs shadow-sm">
                    {programa.problema}
                  </div>
                </div>

                {/* 2. Saberes y pensamiento científico */}
                <div className="bg-teal-50/40 border border-teal-100 rounded-2xl p-4 space-y-3">
                  <div className="bg-teal-600 text-white font-black text-[10px] uppercase tracking-wider text-center py-2 px-3 rounded-lg shadow-sm print:bg-teal-800">
                    Saberes y pensamiento científico
                  </div>
                  <div className="space-y-3">
                    {programa.camposFormativos.saberes.map((item, idx) => (
                      <div key={idx}>
                        <PdaCard item={item} nivel={nivel} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Lenguajes */}
                <div className="bg-orange-50/40 border border-orange-100 rounded-2xl p-4 space-y-3">
                  <div className="bg-orange-600 text-white font-black text-[10px] uppercase tracking-wider text-center py-2 px-3 rounded-lg shadow-sm print:bg-orange-800">
                    Lenguajes
                  </div>
                  <div className="space-y-3">
                    {programa.camposFormativos.lenguajes.map((item, idx) => (
                      <div key={idx}>
                        <PdaCard item={item} nivel={nivel} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Ética, naturaleza y sociedades */}
                <div className="bg-sky-50/40 border border-sky-100 rounded-2xl p-4 space-y-3">
                  <div className="bg-sky-600 text-white font-black text-[10px] uppercase tracking-wider text-center py-2 px-3 rounded-lg shadow-sm print:bg-sky-800">
                    Ética, naturaleza y sociedades
                  </div>
                  <div className="space-y-3">
                    {programa.camposFormativos.etica.map((item, idx) => (
                      <div key={idx}>
                        <PdaCard item={item} nivel={nivel} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. De lo humano y lo comunitario */}
                <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-4 space-y-3">
                  <div className="bg-emerald-600 text-white font-black text-[10px] uppercase tracking-wider text-center py-2 px-3 rounded-lg shadow-sm print:bg-emerald-800">
                    De lo humano y lo comunitario
                  </div>
                  <div className="space-y-3">
                    {programa.camposFormativos.humano.map((item, idx) => (
                      <div key={idx}>
                        <PdaCard item={item} nivel={nivel} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. Metodología */}
                <div className="bg-indigo-50/40 border border-indigo-100 rounded-2xl p-4 space-y-3">
                  <div className="bg-indigo-600 text-white font-black text-[10px] uppercase tracking-wider text-center py-2 px-3 rounded-lg shadow-sm print:bg-indigo-800">
                    Metodología
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-indigo-200 space-y-3 shadow-sm">
                    <div>
                      <strong className="text-slate-500 uppercase text-[9px] block">Tipo</strong>
                      <span className="font-extrabold text-indigo-900">{programa.metodologia.tipo}</span>
                    </div>
                    <div>
                      <strong className="text-slate-500 uppercase text-[9px] block">Eje Articulador</strong>
                      <span className="font-extrabold text-indigo-900">{programa.metodologia.ejeArticulador}</span>
                    </div>
                    <div>
                      <strong className="text-slate-500 uppercase text-[9px] block">Orientaciones Didácticas</strong>
                      <p className="text-slate-700 leading-normal font-semibold text-[10px] mt-1 italic">
                        {programa.metodologia.orientaciones}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 7. Nombre del Proyecto */}
                <div className="bg-amber-50/40 border border-amber-100 rounded-2xl p-4 space-y-3">
                  <div className="bg-amber-600 text-white font-black text-[10px] uppercase tracking-wider text-center py-2 px-3 rounded-lg shadow-sm print:bg-amber-800">
                    Nombre del proyecto sugerido
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-amber-200 text-center font-black text-amber-900 text-xs shadow-sm py-5 leading-normal">
                    "{programa.nombreProyecto}"
                  </div>
                </div>

              </div>
            </div>

            {/* Espacio final */}
            <div className="pt-2" />
          </div>
        </div>
      )}
    </div>
  );
}

function PdaCard({ item, nivel }: { item: PDALine; nivel?: string }) {
  const [showNote, setShowNote] = useState<boolean>(false);

  let pdaClass = "bg-white p-3 rounded-xl border shadow-sm space-y-2 relative transition hover:border-slate-300";
  let badgeClass = "text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full inline-block";
  let badgeText = "";

  if (item.tipo === "modificado") {
    pdaClass += " border-amber-200 bg-amber-50/10";
    badgeClass += " bg-amber-100 text-amber-800 border border-amber-200/40";
    badgeText = "PDA Modificado (*)";
  } else if (item.tipo === "nuevo") {
    pdaClass += " border-sky-200 bg-sky-50/10";
    badgeClass += " bg-sky-100 text-sky-800 border border-sky-200/40";
    badgeText = "Nuevo PDA (Codiseño **)";
  } else {
    pdaClass += " border-slate-100";
    badgeClass += " bg-slate-100 text-slate-600";
    badgeText = "PDA Sintético";
  }

  return (
    <div className={pdaClass}>
      <div className="flex items-center justify-between gap-1">
        <span className={badgeClass}>{badgeText}</span>
        {item.disciplina && nivel !== "Preescolar" && (
          <span className="text-[9px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 uppercase">
            {item.disciplina}
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        <p className="text-[10px] text-slate-400 font-semibold leading-normal">
          <strong className="text-slate-500 uppercase text-[9px] block">Contenido:</strong>
          {item.contenido}
        </p>
        <p className="text-slate-800 font-bold leading-normal text-[10px]">
          <strong className="text-slate-500 uppercase text-[9px] block">PDA:</strong>
          {item.pda}
        </p>
      </div>

      {item.nota && (
        <div className="pt-2 border-t border-slate-100">
          <button
            onClick={() => setShowNote(!showNote)}
            className="text-[9px] text-mex-maroon hover:text-mex-maroon/80 font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer print:hidden"
          >
            <AlertCircle className="w-3 h-3 text-mex-gold" />
            <span>{showNote ? "Ocultar justificación" : "Ver justificación/contexto"}</span>
          </button>
          
          {/* Always visible on print, toggleable on web */}
          <p className={`text-[9.5px] leading-relaxed text-slate-500 font-semibold italic mt-1.5 bg-slate-50 p-2 rounded-lg border border-slate-150 ${showNote ? "block animate-fade-in" : "hidden md:hidden print:block"}`}>
            {item.nota}
          </p>
        </div>
      )}
    </div>
  );
}
