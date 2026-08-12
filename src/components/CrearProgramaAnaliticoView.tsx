import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Layers, Printer, AlertCircle, Download } from "lucide-react";

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

  // Actualización automática del grado predeterminado al cambiar de nivel
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
    let interval: ReturnType<typeof setInterval> | undefined;
    if (loading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingTexts.length - 1 ? prev + 1 : prev));
      }, 2500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading, loadingTexts.length]);

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
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Error al generar el programa analítico.");
      }

      const data = await response.json();
      if (data.success && data.programaAnalitico) {
        setPrograma(data.programaAnalitico);
      } else {
        throw new Error("Formato de respuesta inválido.");
      }
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "No se pudo conectar con el servidor.";
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch (e) {
      console.error("Error al ejecutar ventana de impresión:", e);
      setPrintBlocked(true);
    }
  };

  const handleDownloadHtml = () => {
    if (!programa) return;

    const renderPdaListHtml = (pdaList: PDALine[] = []) => {
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
        <h5 class="font-bold text-slate-700 uppercase tracking-wide text-[9px]">Anotaciones de Codiseño y Contextualización:</h5>
        <div class="flex flex-wrap gap-4 text-[10px] text-slate-600">
          <span class="flex items-center gap-1.5 font-medium"><span class="w-2 h-2 rounded-full bg-slate-400"></span> <strong>PDA Sintético:</strong> Programa sintético sin modificaciones.</span>
          <span class="flex items-center gap-1.5 font-medium"><span class="w-2 h-2 rounded-full bg-amber-500"></span> <strong>PDA Modificado (*):</strong> Adaptado al contexto local.</span>
          <span class="flex items-center gap-1.5 font-medium"><span class="w-2 h-2 rounded-full bg-sky-500"></span> <strong>Nuevo PDA (**):</strong> Creado por codiseño docente.</span>
        </div>
      </div>

      <!-- Contexto Local -->
      <div class="bg-slate-50 border border-slate-200 rounded-2xl p-4 my-4">
        <div class="flex flex-col md:flex-row gap-4 justify-between">
          <div>
            <span class="text-[9px] font-black uppercase text-amber-700 tracking-wider">Situación-Problema Local Detectada:</span>
            <p class="text-xs font-bold text-slate-800 mt-0.5">${programa.problema.replace(/"/g, '&quot;')}</p>
          </div>
          <div>
            <span class="text-[9px] font-black uppercase text-slate-500 tracking-wider">Docente Responsable:</span>
            <p class="text-xs font-bold text-slate-700 mt-0.5">${docenteName.replace(/"/g, '&quot;')}</p>
          </div>
        </div>
      </div>

      <!-- Matriz de Campos Formativos -->
      <div class="border border-slate-200 rounded-2xl overflow-hidden my-4">
        <div class="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 bg-slate-100/80 border-b border-slate-200">
          <div class="p-3 text-center"><h4 class="font-black text-xs uppercase tracking-wider text-emerald-800">1. Saberes y Pensamiento C.</h4></div>
          <div class="p-3 text-center"><h4 class="font-black text-xs uppercase tracking-wider text-indigo-800">2. Lenguajes</h4></div>
          <div class="p-3 text-center"><h4 class="font-black text-xs uppercase tracking-wider text-amber-800">3. Ética, Naturaleza y Soc.</h4></div>
          <div class="p-3 text-center"><h4 class="font-black text-xs uppercase tracking-wider text-rose-800">4. De lo Humano y lo Com.</h4></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 p-2 bg-white">
          <div class="p-2 space-y-2">${renderPdaListHtml(programa.camposFormativos?.saberes)}</div>
          <div class="p-2 space-y-2">${renderPdaListHtml(programa.camposFormativos?.lenguajes)}</div>
          <div class="p-2 space-y-2">${renderPdaListHtml(programa.camposFormativos?.etica)}</div>
          <div class="p-2 space-y-2">${renderPdaListHtml(programa.camposFormativos?.humano)}</div>
        </div>
      </div>

      <!-- Orientaciones Metodológicas -->
      <div class="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 my-4 space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-black text-amber-900 uppercase tracking-wider">Orientaciones Didácticas Generales y Metodología Propuesta</span>
          <span class="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">${programa.metodologia?.tipo || ''}</span>
        </div>
        <p class="text-xs text-slate-700 leading-relaxed">${programa.metodologia?.orientaciones || ''}</p>
        <div class="pt-2 flex flex-wrap gap-4 text-[10px] text-slate-600 border-t border-amber-200/50">
          <span><strong>Eje Articulador Principal:</strong> ${programa.metodologia?.ejeArticulador || ''}</span>
          ${programa.nombreProyecto ? `<span><strong>Proyecto Sugerido:</strong> ${programa.nombreProyecto}</span>` : ""}
        </div>
      </div>
    </div>
  </div>
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
    URL.revokeObjectURL(url);
  };

  const renderPdaList = (pdaList: PDALine[] = []) => {
    return pdaList.map((item, idx) => {
      let cardStyle = "bg-white border-slate-200";
      let badgeStyle = "bg-slate-100 text-slate-600 border-slate-200";
      let badgeText = "PDA Sintético";

      if (item.tipo === "modificado") {
        cardStyle = "bg-amber-50/50 border-amber-200";
        badgeStyle = "bg-amber-100 text-amber-800 border-amber-300";
        badgeText = "PDA Modificado (*)";
      } else if (item.tipo === "nuevo") {
        cardStyle = "bg-sky-50/50 border-sky-200";
        badgeStyle = "bg-sky-100 text-sky-800 border-sky-300";
        badgeText = "Nuevo PDA (Codiseño **)";
      }

      return (
        <div key={idx} className={`p-3 rounded-xl border ${cardStyle} space-y-2 shadow-xs transition hover:shadow-sm`}>
          <div className="flex items-center justify-between gap-2">
            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeStyle}`}>
              {badgeText}
            </span>
            {item.disciplina && nivel !== "Preescolar" && (
              <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 uppercase">
                {item.disciplina}
              </span>
            )}
          </div>

          <div className="space-y-1 text-xs">
            <div>
              <span className="text-[9px] font-black text-slate-400 uppercase block">Contenido Sintético / Codiseño:</span>
              <p className="font-semibold text-slate-800 leading-snug">{item.contenido}</p>
            </div>
            <div>
              <span className="text-[9px] font-black text-slate-400 uppercase block">Proceso de Desarrollo de Aprendizaje (PDA):</span>
              <p className="font-extrabold text-slate-900 leading-snug">{item.pda}</p>
            </div>
          </div>

          {item.nota && (
            <p className="text-[10px] text-slate-600 italic bg-white/80 p-2 rounded-lg border border-slate-100 leading-tight">
              {item.nota}
            </p>
          )}

          <button
            type="button"
            onClick={() => {
              onUseContent({
                nivel,
                grado,
                campoFormativo: "Lenguajes",
                disciplina: item.disciplina || "Español",
                contenido: item.contenido,
                pda: item.pda,
                metodologia: programa?.metodologia?.tipo || "Aprendizaje Basado en Proyectos Comunitarios",
                ejesArticuladores: [programa?.metodologia?.ejeArticulador || "Inclusión"],
                situacionProblema: programa?.problema || situacionProblema,
                nombreProyecto: programa?.nombreProyecto || "Proyecto Integrador NEM",
              });
            }}
            className="w-full mt-2 py-1.5 bg-slate-100 hover:bg-amber-500 hover:text-white text-slate-700 font-extrabold text-[9px] uppercase tracking-wider rounded-lg transition flex items-center justify-center gap-1 group"
          >
            <span>Diseñar Proyecto con este PDA</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      );
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 print:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-lg transition"
            title="Volver"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
          <div>
            <h2 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-600" />
              Generador de Programa Analítico Integrado
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">
              Genera la contextualización y codiseño de contenidos para todos los Campos Formativos
            </p>
          </div>
        </div>
        <span className="bg-amber-500/10 text-amber-700 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block self-start sm:self-center">
          Plan de Estudio NEM
        </span>
      </div>

      {/* Form Setup */}
      <form onSubmit={handleGenerate} className="space-y-4 print:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Nivel Educativo</label>
            <select
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:bg-white rounded-xl text-slate-800 text-xs font-semibold transition outline-none"
            >
              <option value="Preescolar">Preescolar (Fase 2)</option>
              <option value="Primaria">Primaria (Fases 3, 4 y 5)</option>
              <option value="Secundaria">Secundaria (Fase 6)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Grado / Fase Escolar</label>
            <select
              value={grado}
              onChange={(e) => setGrado(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:bg-white rounded-xl text-slate-800 text-xs font-semibold transition outline-none"
            >
              {nivel === "Preescolar" && (
                <>
                  <option value="1º de Preescolar">1º de Preescolar (Fase 2)</option>
                  <option value="2º de Preescolar">2º de Preescolar (Fase 2)</option>
                  <option value="3º de Preescolar">3º de Preescolar (Fase 2)</option>
                </>
              )}
              {nivel === "Primaria" && (
                <>
                  <option value="1º de Primaria">1º de Primaria (Fase 3)</option>
                  <option value="2º de Primaria">2º de Primaria (Fase 3)</option>
                  <option value="3º de Primaria">3º de Primaria (Fase 4)</option>
                  <option value="4º de Primaria">4º de Primaria (Fase 4)</option>
                  <option value="5º de Primaria">5º de Primaria (Fase 5)</option>
                  <option value="6º de Primaria">6º de Primaria (Fase 5)</option>
                </>
              )}
              {nivel === "Secundaria" && (
                <>
                  <option value="1º de Secundaria">1º de Secundaria (Fase 6)</option>
                  <option value="2º de Secundaria">2º de Secundaria (Fase 6)</option>
                  <option value="3º de Secundaria">3º de Secundaria (Fase 6)</option>
                </>
              )}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">
            Situación-Problema Local o Diagnóstico Comunitario
          </label>
          <textarea
            rows={3}
            value={situacionProblema}
            onChange={(e) => setSituacionProblema(e.target.value)}
            placeholder="Describe la problemática comunitaria o particular de tu escuela (ej. Mal manejo de residuos sólidos en la comunidad, bajo nivel de comprensión lectora, problemas de convivencia escolar)..."
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:bg-white rounded-xl text-slate-800 text-xs font-medium leading-relaxed transition outline-none"
            required
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition shadow-sm flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Contextualizando Programa...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generar Programa Analítico con IA</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Loading Progress State */}
      {loading && (
        <div className="p-8 bg-amber-50/50 border border-amber-200/80 rounded-2xl text-center space-y-4 my-6">
          <div className="relative w-12 h-12 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-amber-200 border-t-amber-600 animate-spin"></div>
            <Sparkles className="w-5 h-5 text-amber-600" />
          </div>
          <div className="space-y-1">
            <h4 className="font-extrabold text-slate-800 text-sm">Diseñando Programa Analítico Multidisciplinario</h4>
            <p className="text-amber-800 text-xs font-bold animate-pulse">
              {loadingTexts[loadingStep]}
            </p>
          </div>
        </div>
      )}

      {/* Display Program Results */}
      {programa && (
        <div className="space-y-6 pt-4 animate-fade-in">
          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 text-white rounded-2xl print:hidden">
            <div>
              <h3 className="font-extrabold text-xs text-amber-400 uppercase tracking-wider">
                Programa Analítico Listo
              </h3>
              <p className="text-[11px] text-slate-300">
                Contextualizado para {programa.fase} ({programa.grado})
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDownloadHtml}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition flex items-center gap-1.5 border border-slate-700"
                title="Descargar archivo HTML interactivo e imprimible"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Descargar HTML/PDF</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir Programa</span>
              </button>
            </div>
          </div>

          {printBlocked && (
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs font-semibold flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Si el cuadro de impresión de tu navegador no se abre, utiliza el botón "Descargar HTML/PDF" arriba.</span>
              </div>
            </div>
          )}

          {/* DOCUMENT BODY PRINTABLE AREA */}
          <div className="border border-slate-200 rounded-2xl p-6 space-y-6 bg-white shadow-xs">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-6 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase text-white/90">
                  {escuelaName} • C.C.T. {cct}
                </span>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
                  Programa Analítico Integrado
                </h2>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/25 text-xs font-black uppercase tracking-wider self-center">
                {programa.fase} • {programa.grado}
              </div>
            </div>

            {/* Simbología */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-1.5">
              <h5 className="font-bold text-slate-700 uppercase tracking-wide text-[9px]">Anotaciones de Codiseño y Contextualización:</h5>
              <div className="flex flex-wrap gap-4 text-[10px] text-slate-600">
                <span className="flex items-center gap-1.5 font-medium"><span className="w-2 h-2 rounded-full bg-slate-400"></span> <strong>PDA Sintético:</strong> Programa sintético sin modificaciones.</span>
                <span className="flex items-center gap-1.5 font-medium"><span className="w-2 h-2 rounded-full bg-amber-500"></span> <strong>PDA Modificado (*):</strong> Adaptado al contexto local.</span>
                <span className="flex items-center gap-1.5 font-medium"><span className="w-2 h-2 rounded-full bg-sky-500"></span> <strong>Nuevo PDA (**):</strong> Creado por codiseño docente.</span>
              </div>
            </div>

            {/* Contexto Local */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div>
                  <span className="text-[9px] font-black uppercase text-amber-700 tracking-wider">Situación-Problema Local Detectada:</span>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{programa.problema}</p>
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Docente Responsable:</span>
                  <p class="text-xs font-bold text-slate-700 mt-0.5">{docenteName}</p>
                </div>
              </div>
            </div>

            {/* Matriz de Campos Formativos */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">
                Distribución por Campos Formativos:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Saberes y Pensamiento Científico */}
                <div className="space-y-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-200/80">
                  <div className="p-2 bg-emerald-100/60 border border-emerald-200/80 rounded-xl text-center">
                    <h5 className="font-black text-xs uppercase tracking-wider text-emerald-900">
                      1. Saberes y Pensamiento C.
                    </h5>
                  </div>
                  <div className="space-y-3">
                    {renderPdaList(programa.camposFormativos?.saberes)}
                  </div>
                </div>

                {/* 2. Lenguajes */}
                <div className="space-y-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-200/80">
                  <div className="p-2 bg-indigo-100/60 border border-indigo-200/80 rounded-xl text-center">
                    <h5 className="font-black text-xs uppercase tracking-wider text-indigo-900">
                      2. Lenguajes
                    </h5>
                  </div>
                  <div className="space-y-3">
                    {renderPdaList(programa.camposFormativos?.lenguajes)}
                  </div>
                </div>

                {/* 3. Ética, Naturaleza y Sociedades */}
                <div className="space-y-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-200/80">
                  <div className="p-2 bg-amber-100/60 border border-amber-200/80 rounded-xl text-center">
                    <h5 className="font-black text-xs uppercase tracking-wider text-amber-900">
                      3. Ética, Naturaleza y Soc.
                    </h5>
                  </div>
                  <div className="space-y-3">
                    {renderPdaList(programa.camposFormativos?.etica)}
                  </div>
                </div>

                {/* 4. De lo Humano y lo Comunitario */}
                <div className="space-y-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-200/80">
                  <div className="p-2 bg-rose-100/60 border border-rose-200/80 rounded-xl text-center">
                    <h5 className="font-black text-xs uppercase tracking-wider text-rose-900">
                      4. De lo Humano y lo Com.
                    </h5>
                  </div>
                  <div className="space-y-3">
                    {renderPdaList(programa.camposFormativos?.humano)}
                  </div>
                </div>
              </div>
            </div>

            {/* Orientaciones Metodológicas */}
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-black text-amber-950 uppercase tracking-wider">
                  Orientaciones Didácticas Generales y Metodología Sugerida
                </span>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-lg border border-amber-200 self-start sm:self-auto">
                  {programa.metodologia?.tipo}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {programa.metodologia?.orientaciones}
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-[11px] text-slate-600 border-t border-amber-200/50">
                <span><strong>Eje Articulador Principal:</strong> {programa.metodologia?.ejeArticulador}</span>
                {programa.nombreProyecto && (
                  <span><strong>Proyecto Sugerido:</strong> {programa.nombreProyecto}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}