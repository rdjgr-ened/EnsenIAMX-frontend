import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, HelpCircle, FileText, Check, Layers, Printer, AlertCircle, Download, Coins, ArrowLeft } from "lucide-react";
import { UserSubscription, PaywallReason, CreditActionType } from "../types";
import { CREDIT_COSTS } from "../utils/planManager";
import { saveRecursoGenerado, isSupabaseConfigured } from "../utils/supabaseClient";
import AccionesDocumento from "./AccionesDocumento";

interface CrearProgramaAnaliticoViewProps {
  onUseContent?: (data: {
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
  onBack?: () => void;
  escuelaName?: string;
  cct?: string;
  docenteName?: string;
  subscription?: UserSubscription;
  onDeductCredits?: (action: CreditActionType) => boolean;
  onTriggerPaywall?: (reason: PaywallReason) => void;
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

export default function CrearProgramaAnaliticoView(props: CrearProgramaAnaliticoViewProps) {
  const { subscription, onDeductCredits, onTriggerPaywall } = props;
  const safeOnUseContent = props.onUseContent || (() => {});
  const safeOnBack = props.onBack || (() => {});
  const safeEscuelaName = props.escuelaName || "Escuela Secundaria General";
  const safeCct = props.cct || "10DES0000X";
  const safeDocenteName = props.docenteName || "Docente";
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

    const userCredits = subscription?.credits ?? 0;
    const requiredCredits = CREDIT_COSTS["programa_analitico"]; // 10

    if (userCredits < requiredCredits) {
      if (onTriggerPaywall) {
        onTriggerPaywall({
          type: "credits",
          action: "programa_analitico",
          required: requiredCredits,
          current: userCredits,
        });
      }
      return;
    }

    if (onDeductCredits) {
      const ok = onDeductCredits("programa_analitico");
      if (!ok) return;
    }

    setLoading(true);
    setPrograma(null);
    setPrintBlocked(false);

    try {
      // 1. INYECCIÓN DE PROMPT DESDE EL FRONTEND (Molde Estricto)
      let instruccionEspecial = "";
      if (nivel === "Preescolar") {
        instruccionEspecial = `

REGLA ESTRICTA E INQUEBRANTABLE: 
DEBES incluir obligatoriamente el objeto "metodologia" en tu JSON de respuesta usando EXACTAMENTE esta estructura y nombres de propiedades:
"metodologia": {
  "tipo": "[Elige UNA: Taller Crítico, Rincones de Aprendizaje, Centros de Interés, Unidad Didáctica, Aprendizaje Basado en el Juego, o Proyecto]",
  "ejeArticulador": "[Eje articulador principal]",
  "orientaciones": "[REDACTA AQUÍ LAS ORIENTACIONES DIDÁCTICAS DETALLADAS. Describe paso a paso cómo implementar esta modalidad en el aula para resolver la problemática.]"
}
IMPORTANTE: Para Preescolar está PROHIBIDO usar "Proyectos Comunitarios" o "STEAM". Usa solo las Modalidades de Trabajo mencionadas. El campo "orientaciones" NUNCA debe estar vacío, debes redactar las instrucciones claras para el docente.`;
      } else {
        instruccionEspecial = `

REGLA ESTRICTA E INQUEBRANTABLE: 
DEBES incluir obligatoriamente el objeto "metodologia" en tu JSON de respuesta usando EXACTAMENTE esta estructura y nombres de propiedades:
"metodologia": {
  "tipo": "[Metodología NEM acorde al campo formativo: Aprendizaje Basado en Proyectos Comunitarios, Indagación STEAM, ABP o Aprendizaje Servicio]",
  "ejeArticulador": "[Eje articulador principal]",
  "orientaciones": "[REDACTA AQUÍ LAS ORIENTACIONES DIDÁCTICAS DETALLADAS. Describe las fases o pasos a seguir para implementar esta metodología en el aula y resolver la problemática.]"
}
IMPORTANTE: El campo "orientaciones" NUNCA debe estar vacío, debes redactar las instrucciones claras para el docente.`;
      }

      const response = await fetch("/api/generate-programa-analitico", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nivel,
          grado,
          // Unimos el texto del usuario con nuestra regla estricta para forzar a la IA
          situacionProblema: situacionProblema.trim() + instruccionEspecial,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Error al generar el programa analítico.");
      }

      const data = await response.json();
      console.log("Respuesta cruda de Gemini:", data); // Para depuración

      // 2. PARSEO FLEXIBLE Y BLINDAJE
      let programaGenerado = data.programaAnalitico || data.programa || data.data || data;

      // Limpiar Markdown si Gemini envió texto en lugar de JSON puro
      if (typeof programaGenerado === 'string') {
        try {
          const cleanStr = programaGenerado.replace(/```json/g, '').replace(/```/g, '').trim();
          programaGenerado = JSON.parse(cleanStr);
        } catch (e) {
          console.error("Fallo al limpiar JSON string de Gemini", e);
        }
      }

      // 3. SEGURO DE VIDA: Si Gemini desobedece y omite el objeto, lo forzamos manualmente para evitar pantalla blanca
      if (programaGenerado && !programaGenerado.metodologia) {
        programaGenerado.metodologia = {
          tipo: nivel === "Preescolar" ? "Modalidad de Trabajo (Sugerida)" : "Aprendizaje Basado en Proyectos Comunitarios",
          ejeArticulador: "Inclusión y Pensamiento Crítico",
          orientaciones: "Orientaciones didácticas a definir por el docente según el contexto."
        };
      }

      // Validación de éxito
      if (programaGenerado && typeof programaGenerado === 'object' && programaGenerado.fase) {
        setPrograma(programaGenerado);

        // Guardado en Supabase
        if (isSupabaseConfigured) {
          const userProfileStr = localStorage.getItem("nem_secundaria_profile");
          const userEmail = userProfileStr ? JSON.parse(userProfileStr)?.email : null;
          const userId = userEmail ? `user_${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}` : 'anonymous_user';

          saveRecursoGenerado({
            id: `pa_${crypto.randomUUID()}`, // ID Seguro
            user_id: userId,
            tipo_recurso: "programa_analitico",
            contenido_json: programaGenerado
          }).catch(err => console.warn("Error guardando programa analítico en Supabase:", err));
        }
      } else {
        throw new Error("Formato de respuesta inválido de Gemini.");
      }
    } catch (err: any) {
      console.error(err);
      alert(`Error: ${err.message || "No se pudo conectar con el servidor."}`);
    } finally {
      setLoading(false);
    }
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
          onClick={safeOnBack}
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
              <span className="text-[10px] font-black bg-black/25 text-mex-gold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Coins className="w-3 h-3" />
                10 créditos
              </span>
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
          {/* Barra de Herramientas Estandarizada EnseñIA MX */}
          <AccionesDocumento
            targetId="documento-resultado"
            tipoRecurso="Programa_Analitico"
            customSuffix={`${grado.replace(/\s+/g, '_')}`}
            orientation="landscape"
            title={
              <span className="flex items-center gap-1.5 font-black text-slate-800">
                <span>Programa Analítico Integrado:</span>
                <span className="text-mex-maroon font-extrabold">{programa.fase} ({programa.grado})</span>
              </span>
            }
            extraActions={
              <button
                type="button"
                onClick={() => setPrograma(null)}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer mr-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Nuevo Programa</span>
              </button>
            }
          />

          {/* DOCUMENTO IMPRIMIBLE Y VISUAL (DIAGRAMA) */}
          <div
            id="documento-resultado"
            className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-4 sm:p-8 space-y-6 print:border-0 print:shadow-none print:p-0 printable-document"
          >
            {/* Header / Datos de identificación */}
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-4 sm:p-6 text-white text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 print:bg-orange-500 print:text-black print:rounded-none">
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase text-white/95 print:text-slate-800">
                  {safeEscuelaName} • C.C.T. {safeCct}
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
<div id="diagrama-impresion" className="min-w-[1200px] grid grid-cols-7 gap-4 text-[11px] leading-relaxed">
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

                {/* 6. Metodología / Modalidad de Trabajo */}
                <div className="bg-indigo-50/40 border border-indigo-100 rounded-2xl p-4 space-y-3">
                  <div className="bg-indigo-600 text-white font-black text-[10px] uppercase tracking-wider text-center py-2 px-3 rounded-lg shadow-sm print:bg-indigo-800">
                    {nivel === "Preescolar" ? "Modalidad de Trabajo" : "Metodología NEM"}
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-indigo-200 space-y-3 shadow-sm">
                    <div>
                      <strong className="text-slate-500 uppercase text-[9px] block">
                        {nivel === "Preescolar" ? "Modalidad Sugerida" : "Tipo de Metodología"}
                      </strong>
                      <span className="font-extrabold text-indigo-900">
                        {programa?.metodologia?.tipo || "Por definir"}
                      </span>
                    </div>
                    <div>
                      <strong className="text-slate-500 uppercase text-[9px] block">Eje Articulador</strong>
                      <span className="font-extrabold text-indigo-900">
                        {programa?.metodologia?.ejeArticulador || "No especificado"}
                      </span>
                    </div>
                    <div>
                      <strong className="text-slate-500 uppercase text-[9px] block">Orientaciones Didácticas</strong>
                      <p className="text-slate-700 leading-normal font-semibold text-[10px] mt-1 italic">
                        {programa?.metodologia?.orientaciones || "Sin orientaciones generadas."}
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
                    "{programa?.nombreProyecto || "Proyecto NEM"}"
                  </div>
                </div>

              </div>
            </div>

            {/* Espacio final */}
            <div className="pt-2" />
          </div>
        </div>
      )}

      {/* Estilos CSS Específicos para imprimir horizontalmente con escalado automático */}
      <style dangerouslySetInnerHTML={{ __html: "@media print { @page { size: landscape; margin: 5mm; } body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } .overflow-x-auto { overflow: visible !important; } .min-w-\\[1200px\\] { min-width: 0 !important; width: 100% !important; transform: scale(0.85); transform-origin: top left; } }" }} />
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
          
          <p className={"text-[9.5px] leading-relaxed text-slate-500 font-semibold italic mt-1.5 bg-slate-50 p-2 rounded-lg border border-slate-150 " + (showNote ? "block animate-fade-in" : "hidden md:hidden print:block")}>
            {item.nota}
          </p>
        </div>
      )}
    </div>
  );
}