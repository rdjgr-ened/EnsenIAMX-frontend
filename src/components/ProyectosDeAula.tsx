import React, { useState, useEffect, useMemo } from "react";
import { 
  getGradosPorNivel, 
  getCamposFormativos, 
  getFaseByNivelGrado,
} from "../data/nemData";
import { Sparkles, BookOpen, User, School, Calendar, RefreshCw, Layers, FileText, Accessibility, Users, Coins, ArrowLeft } from "lucide-react";
import { supabase } from "../utils/supabaseClient";

// --- IMPORTACIONES PARA LOS CRÉDITOS ---
import { CREDIT_COSTS } from "../utils/planManager";
import { UserSubscription, PaywallReason, CreditActionType } from "../types";

interface ProyectosDeAulaProps {
  onVolver: () => void;
  onPlanGenerated: (planData: any) => void;
  subscription?: UserSubscription;
  onDeductCredits?: (action: CreditActionType) => boolean;
  onTriggerPaywall?: (reason: PaywallReason) => void;
}

export interface ProyectoLibro {
  id: number;
  nivel: string;
  grado: number;
  campo_formativo: string;
  nombre_proyecto: string;
  paginas: string;
}

// === DICCIONARIO INFALIBLE DE IDs DE PROYECTOS SEP ===
const PROYECTOS_ID_RANGES: Record<string, {min: number, max: number}> = {
  "Primaria_1_De lo Humano y lo Comunitario": { min: 20, max: 23 },
  "Primaria_1_Lenguajes": { min: 1, max: 8 },
  "Primaria_1_Saberes y Pensamiento Científico": { min: 9, max: 12 },
  "Primaria_1_Ética, Naturaleza y Sociedades": { min: 13, max: 19 },
  "Primaria_2_De lo Humano y lo Comunitario": { min: 41, max: 44 },
  "Primaria_2_Lenguajes": { min: 24, max: 30 },
  "Primaria_2_Saberes y Pensamiento Científico": { min: 31, max: 33 },
  "Primaria_2_Ética, Naturaleza y Sociedades": { min: 34, max: 40 },
  "Primaria_3_De lo Humano y lo Comunitario": { min: 61, max: 66 },
  "Primaria_3_Lenguajes": { min: 45, max: 50 },
  "Primaria_3_Saberes y Pensamiento Científico": { min: 51, max: 54 },
  "Primaria_3_Ética, Naturaleza y Sociedades": { min: 55, max: 60 },
  "Primaria_4_De lo Humano y lo Comunitario": { min: 85, max: 90 },
  "Primaria_4_Lenguajes": { min: 67, max: 74 },
  "Primaria_4_Saberes y Pensamiento Científico": { min: 75, max: 78 },
  "Primaria_4_Ética, Naturaleza y Sociedades": { min: 79, max: 84 },
  "Primaria_5_De lo Humano y lo Comunitario": { min: 109, max: 115 },
  "Primaria_5_Lenguajes": { min: 91, max: 98 },
  "Primaria_5_Saberes y Pensamiento Científico": { min: 99, max: 102 },
  "Primaria_5_Ética, Naturaleza y Sociedades": { min: 103, max: 108 },
  "Primaria_6_De lo Humano y lo Comunitario": { min: 134, max: 140 },
  "Primaria_6_Lenguajes": { min: 116, max: 123 },
  "Primaria_6_Saberes y Pensamiento Científico": { min: 124, max: 127 },
  "Primaria_6_Ética, Naturaleza y Sociedades": { min: 128, max: 133 },
  "Secundaria_1_De lo Humano y lo Comunitario": { min: 166, max: 173 },
  "Secundaria_1_Lenguajes": { min: 141, max: 151 },
  "Secundaria_1_Saberes y Pensamiento Científico": { min: 152, max: 159 },
  "Secundaria_1_Ética, Naturaleza y Sociedades": { min: 160, max: 165 },
  "Secundaria_2_De lo Humano y lo Comunitario": { min: 196, max: 201 },
  "Secundaria_2_Lenguajes": { min: 174, max: 183 },
  "Secundaria_2_Saberes y Pensamiento Científico": { min: 184, max: 189 },
  "Secundaria_2_Ética, Naturaleza y Sociedades": { min: 190, max: 195 },
  "Secundaria_3_De lo Humano y lo Comunitario": { min: 224, max: 229 },
  "Secundaria_3_Lenguajes": { min: 202, max: 211 },
  "Secundaria_3_Saberes y Pensamiento Científico": { min: 212, max: 217 },
  "Secundaria_3_Ética, Naturaleza y Sociedades": { min: 218, max: 223 }
};

const EJES_ARTICULADORES = [
  { id: "Inclusión", label: "Inclusión", desc: "Equidad en oportunidades y reconocimiento de la diversidad." },
  { id: "Pensamiento crítico", label: "Pensamiento Crítico", desc: "Cuestionamiento, análisis y argumentación de la realidad." },
  { id: "Interculturalidad crítica", label: "Interculturalidad Crítica", desc: "Diálogo horizontal y valoración de culturas y saberes." },
  { id: "Igualdad de género", label: "Igualdad de Género", desc: "Prevención de brechas de género y fomento de derechos mutuos." },
  { id: "Vida saludable", label: "Vida Saludable", desc: "Alimentación sana, higiene, deporte y bienestar integral." },
  { id: "Apropiación de las culturas a través de la lectura y la escritura", label: "Apropiación de las Culturas", desc: "La lectura y escritura como ventanas al mundo y autoconocimiento." },
  { id: "Artes y experiencias estéticas", label: "Artes y Exp. Estéticas", desc: "Sensibilidad, creatividad y expresión lúdico-estética." },
];

const METODOLOGIAS = [
  { id: "Aprendizaje Basado en Proyectos Comunitarios (ABPC)", label: "Proyectos Comunitarios (ABPC)", desc: "Ideal para el Campo Formativo de Lenguajes. 3 fases y 11 momentos." },
  { id: "Aprendizaje Basado en Indagación (STEAM)", label: "Indagación (STEAM)", desc: "Ideal para Saberes y Pensamiento Científico. Enfoque científico e investigación." },
  { id: "Aprendizaje Basado en Problemas (ABP)", label: "Basado en Problemas (ABP)", desc: "Ideal para Ética, Naturaleza y Sociedades. 6 momentos para analizar la realidad." },
  { id: "Aprendizaje Servicio (AS)", label: "Aprendizaje Servicio (AS)", desc: "Ideal para De lo Humano y lo Comunitario. 5 etapas vinculando escuela y comunidad." },
];

const BAP_CATEGORIES = [
  {
    category: "Alumnos con discapacidad y dificultades severas",
    subcategories: [
      {
        name: "Con Discapacidad",
        items: [
          { id: "DI", label: "Intelectual", code: "DI" },
          { id: "DMO", label: "Motriz", code: "DMO" },
          { id: "SO", label: "Auditiva - Sordera", code: "SO" },
          { id: "HP", label: "Auditiva - Hipoacusia", code: "HP" },
          { id: "CEG", label: "Visual - Ceguera", code: "CEG" },
          { id: "BV", label: "Visual - Baja Visión", code: "BV" },
          { id: "DM", label: "Múltiple", code: "DM" },
          { id: "SCG", label: "Sordoceguera", code: "SCG" },
          { id: "DME", label: "Mental o Psicosocial", code: "DME" }
        ]
      },
      {
        name: "Dificultades Severas",
        items: [
          { id: "DSC", label: "De Conducta", code: "DSC" },
          { id: "DSCO", label: "De Comunicación", code: "DSCO" },
          { id: "DSA", label: "De Aprendizaje", code: "DSA" }
        ]
      },
      {
        name: "Trastornos",
        items: [
          { id: "TEA", label: "Trastorno (condición) del Espectro Autista", code: "TEA" },
          { id: "TDAH", label: "Trastorno por Déficit de Atención e Hiperactividad", code: "TDAH" }
        ]
      }
    ]
  },
  {
    category: "Aptitudes Sobresalientes",
    subcategories: [
      {
        name: "Aptitudes Sobresalientes",
        items: [
          { id: "ASI", label: "Intelectual", code: "ASI" },
          { id: "ASC", label: "Creativa", code: "ASC" },
          { id: "ASS", label: "Socioafectiva", code: "ASS" },
          { id: "ASA", label: "Artística", code: "ASA" },
          { id: "ASP", label: "Psicomotriz", code: "ASP" }
        ]
      }
    ]
  }
];

export default function ProyectosDeAula({ onVolver, onPlanGenerated, subscription, onDeductCredits, onTriggerPaywall }: ProyectosDeAulaProps) {
  // Estados Generales
  const [docenteName, setDocenteName] = useState<string>("Docente");
  const [escuelaName, setEscuelaName] = useState<string>("Escuela");
  const [cct, setCct] = useState<string>("CCT");
  const [grupo, setGrupo] = useState<string>("A");
  const [nivel, setNivel] = useState<string>("Primaria");
  const [grado, setGrado] = useState<string>("Primer Grado");
  const [duracionSemanas, setDuracionSemanas] = useState<string>("2 semanas");
  const [numSesiones, setNumSesiones] = useState<number>(8);
  const [duracionSesion, setDuracionSesion] = useState<string>("50 minutos");
  const [escuelasList, setEscuelasList] = useState<Array<{ escuelaName: string; cct: string }>>([]);
  const [formError, setFormError] = useState<string | null>(null);

  // Estados de Fechas
  const [startDate, setStartDate] = useState<string>(() => new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState<string>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toISOString().split("T")[0];
  });

  // Estados Curriculares y de Proyecto
  const [selectedCampo, setSelectedCampo] = useState<string>("lenguajes");
  const [proyectos, setProyectos] = useState<ProyectoLibro[]>([]);
  const [selectedProyectoId, setSelectedProyectoId] = useState<number | "">("");
  const [isLoadingProyectos, setIsLoadingProyectos] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Estados NEM adicionales
  const [selectedEjes, setSelectedEjes] = useState<string[]>(["Inclusión"]);
  const [selectedMetodologia, setSelectedMetodologia] = useState<string>("Aprendizaje Basado en Proyectos Comunitarios (ABPC)");
  const [situacionProblema, setSituacionProblema] = useState<string>("");
  const [selectedBap, setSelectedBap] = useState<string[]>([]);

  // Opciones calculadas
  const currentFaseObj = useMemo(() => getFaseByNivelGrado(nivel, grado), [nivel, grado]);
  const availableGrados = useMemo(() => getGradosPorNivel(nivel), [nivel]);
  const availableCampos = useMemo(() => getCamposFormativos(nivel, grado), [nivel, grado]);

  // Cargar perfil
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("nem_secundaria_profile");
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile?.docenteName) setDocenteName(profile.docenteName);
        if (profile?.escuelaName) setEscuelaName(profile.escuelaName);
        if (profile?.cct) setCct(profile.cct);
        if (profile?.escuelas && Array.isArray(profile.escuelas) && profile.escuelas.length > 0) {
          setEscuelasList(profile.escuelas);
          const matched = profile.escuelas.find((e: any) => e?.escuelaName === profile.escuelaName && e?.cct === profile.cct);
          if (!matched) {
            setEscuelaName(profile.escuelas[0]?.escuelaName || "");
            setCct(profile.escuelas[0]?.cct || "");
          }
        } else if (profile?.escuelaName && profile?.cct) {
          setEscuelasList([{ escuelaName: profile.escuelaName, cct: profile.cct }]);
        }
      }
    } catch (e) {
      console.error("Error loading profile:", e);
    }
  }, []);

  // Calcular duración en semanas
  useEffect(() => {
    if (startDate && endDate) {
      try {
        const start = new Date(startDate + 'T12:00:00');
        const end = new Date(endDate + 'T12:00:00');
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const weeks = Math.round(diffDays / 7);
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const startStr = start.toLocaleDateString("es-MX", options);
        const endStr = end.toLocaleDateString("es-MX", options);

        if (weeks <= 1) setDuracionSemanas(`${diffDays} días (del ${startStr} al ${endStr})`);
        else setDuracionSemanas(`${weeks} semanas (del ${startStr} al ${endStr})`);
      } catch (e) {
        setDuracionSemanas("2 semanas");
      }
    }
  }, [startDate, endDate]);

  // Cargar Proyectos desde Supabase usando el Diccionario Infalible
  useEffect(() => {
    const fetchProyectos = async () => {
      setIsLoadingProyectos(true);
      setProyectos([]);
      setSelectedProyectoId("");

      const gradoToNumMap: Record<string, number> = {
        "Primer Grado": 1, "Segundo Grado": 2, "Tercer Grado": 3,
        "Cuarto Grado": 4, "Quinto Grado": 5, "Sexto Grado": 6
      };
      const gradoNum = gradoToNumMap[grado] || 1;

      const campoObj = availableCampos.find((c) => c.id === selectedCampo);
      const nombreCampoBusqueda = campoObj?.nombre || "Lenguajes";

      // MAGIA: Construimos la llave y buscamos los rangos exactos de la BD
      const rangeKey = `${nivel}_${gradoNum}_${nombreCampoBusqueda}`;
      const ids = PROYECTOS_ID_RANGES[rangeKey];

      try {
        let query = supabase
          .from('proyectos_libros')
          .select('*')
          .order('id', { ascending: true });

        if (ids) {
          // Si encontramos el rango, filtramos estrictamente por ID (A prueba de errores de texto)
          query = query.gte('id', ids.min).lte('id', ids.max);
        } else {
          // Respaldo de seguridad
          query = query.eq('nivel', nivel).eq('grado', gradoNum).ilike('campo_formativo', `%${nombreCampoBusqueda}%`);
        }

        const { data, error } = await query;

        if (error) throw error;
        
        const proyectosData = data || [];
        setProyectos(proyectosData);
        if (proyectosData.length > 0) {
          setSelectedProyectoId(proyectosData[0].id);
        }
      } catch (error) {
        console.error("Error al cargar proyectos:", error);
      } finally {
        setIsLoadingProyectos(false);
      }
    };

    fetchProyectos();
  }, [nivel, grado, selectedCampo, availableCampos]);

  // Handlers en cascada
  const handleNivelChange = (newNivel: string) => {
    setNivel(newNivel);
    const newGrados = getGradosPorNivel(newNivel);
    const newGrado = newGrados[0] || "Primer Grado";
    setGrado(newGrado);
    setDuracionSesion(newNivel === "Secundaria" ? "50 minutos" : "60 minutos");

    const campos = getCamposFormativos(newNivel, newGrado);
    setSelectedCampo(campos[0]?.id || "lenguajes");
    setSelectedMetodologia("Aprendizaje Basado en Proyectos Comunitarios (ABPC)");
  };

  const handleGradoChange = (newGrado: string) => {
    setGrado(newGrado);
    const campos = getCamposFormativos(nivel, newGrado);
    const isCampoValid = campos.some((c) => c.id === selectedCampo);
    if (!isCampoValid) setSelectedCampo(campos[0]?.id || "lenguajes");
  };

  const handleCampoChange = (newCampo: string) => {
    setSelectedCampo(newCampo);
    if (newCampo === "lenguajes") setSelectedMetodologia("Aprendizaje Basado en Proyectos Comunitarios (ABPC)");
    else if (newCampo === "SABERES") setSelectedMetodologia("Aprendizaje Basado en Indagación (STEAM)");
    else if (newCampo === "ETICA" || newCampo === "ETICA NyS") setSelectedMetodologia("Aprendizaje Basado en Problemas (ABP)");
    else if (newCampo === "HUMANO" || newCampo === "HUMANO Y C") setSelectedMetodologia("Aprendizaje Servicio (AS)");
  };

  const handleToggleEje = (ejeId: string) => {
    setSelectedEjes(prev => prev.includes(ejeId) ? prev.filter(id => id !== ejeId) : [...prev, ejeId]);
  };

  const handleToggleBap = (formattedValue: string) => {
    setSelectedBap(prev => prev.includes(formattedValue) ? prev.filter(val => val !== formattedValue) : [...prev, formattedValue]);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const proyectoSeleccionado = proyectos.find(p => p.id === selectedProyectoId);

    if (!proyectoSeleccionado) {
      setFormError("Por favor selecciona un Proyecto de Aula válido del catálogo.");
      return;
    }

    // LÓGICA DE COBRO DE CRÉDITOS
    const requiredCredits = CREDIT_COSTS["disenar_planeacion"] || 10;
    const userCredits = subscription?.credits ?? 0;

    if (userCredits < requiredCredits) {
      if (onTriggerPaywall) {
        onTriggerPaywall({
          type: "credits",
          action: "disenar_planeacion",
          required: requiredCredits,
          current: userCredits
        });
      }
      return; 
    }

    if (onDeductCredits && !onDeductCredits("disenar_planeacion")) {
      return; 
    }

    setIsGenerating(true);

    try {
      const payload = {
        proyectoNombre: proyectoSeleccionado.nombre_proyecto,
        paginas: proyectoSeleccionado.paginas,
        grado: grado,
        campoFormativo: proyectoSeleccionado.campo_formativo,
        numSesiones,
        duracionSesion,
        metodologia: selectedMetodologia,
        ejesArticuladores: selectedEjes,
        situacionProblema,
        bapSelected: selectedBap,
        nivel,
        grupo,
      };

      const response = await fetch('/api/generate-plan-libro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Error al generar la planeación desde el libro.");
      }

      // Estructuramos el resultado para el componente PlaneacionPreview
      const completePlan = {
        nivel,
        grado,
        grupo,
        docenteName,
        escuelaName,
        cct,
        duracionSemanas,
        duracionSesion,
        campoFormativo: proyectoSeleccionado.campo_formativo,
        disciplina: nivel === "Secundaria" ? "Integrada" : "",
        contenido: `Proyecto del Libro SEP: ${proyectoSeleccionado.nombre_proyecto}`,
        pda: data.plan?.proposito || "Cumplir con el propósito del proyecto.",
        metodologia: selectedMetodologia,
        ejesArticuladores: selectedEjes,
        situacionProblema: situacionProblema || `Desarrollo del proyecto: ${proyectoSeleccionado.nombre_proyecto} (Págs. ${proyectoSeleccionado.paginas})`,
        bapSelected: selectedBap,
        plan: data.plan,
      };

      onPlanGenerated(completePlan);

    } catch (error: any) {
      console.error("Error en la generación:", error);
      setFormError(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-8 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm animate-fade-in">
      {/* Botón de retroceso integrado en el encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="font-black text-slate-800 text-base uppercase tracking-wider">Proyectos de Aula</h2>
            <p className="text-slate-500 text-xs font-semibold">Generador de secuencias para Libros SEP</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onVolver}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs uppercase tracking-wider transition cursor-pointer self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Panel</span>
        </button>
      </div>

      {/* Sección 1: Datos Generales */}
      <div>
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-slate-100">
          <School className="w-5 h-5 text-mex-maroon" />
          <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Datos de la Planeación</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5 flex items-center justify-between">
              <span>Nombre del Docente</span>
              <span className="text-[8px] text-mex-maroon font-extrabold uppercase tracking-wide">Uso Personal Exclusivo</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
              <input type="text" value={docenteName} readOnly disabled className="w-full pl-9 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded text-slate-500 text-sm font-medium cursor-not-allowed outline-none" required />
            </div>
          </div>

          <div>
            <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Nivel Educativo</label>
            <select value={nivel} onChange={(e) => handleNivelChange(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-sm font-medium transition outline-none">
              <option value="Primaria">Primaria</option>
              <option value="Secundaria">Secundaria</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:col-span-2">
            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Grupo</label>
              <input type="text" value={grupo} onChange={(e) => setGrupo(e.target.value)} placeholder="Ej. A" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-sm font-medium transition text-center outline-none" required />
            </div>
            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Fecha de Inicio</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon rounded text-slate-800 text-xs font-semibold outline-none" required />
              </div>
            </div>
            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Fecha de Fin</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon rounded text-slate-800 text-xs font-semibold outline-none" required />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 sm:col-span-2">
            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Número de Sesiones</label>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setNumSesiones(Math.max(1, numSesiones - 1))} className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 font-extrabold rounded">-</button>
                <input type="text" readOnly value={numSesiones} className="w-full py-2 bg-slate-50 border border-slate-200 rounded text-slate-800 text-sm font-bold text-center outline-none select-none" />
                <button type="button" onClick={() => setNumSesiones(Math.min(40, numSesiones + 1))} className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 font-extrabold rounded">+</button>
              </div>
            </div>

            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Duración por Sesión</label>
              {nivel === "Secundaria" ? (
                <div className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded text-slate-500 text-sm font-semibold select-none cursor-not-allowed">
                  50 minutos (1 módulo)
                </div>
              ) : (
                <select value={duracionSesion} onChange={(e) => setDuracionSesion(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon rounded text-slate-800 text-sm font-medium outline-none">
                  <option value="30 minutos">30 minutos</option>
                  <option value="45 minutos">45 minutos</option>
                  <option value="50 minutos">50 minutos</option>
                  <option value="60 minutos">60 minutos (1 hora)</option>
                  <option value="90 minutos">90 minutos</option>
                  <option value="120 minutos">120 minutos (2 horas)</option>
                </select>
              )}
            </div>

            <div className="flex flex-col justify-end bg-slate-50 p-3 rounded border border-slate-200">
              <span className="text-[9px] font-black text-mex-maroon uppercase tracking-wider block">Duración total calculada:</span>
              <span className="text-xs font-bold text-slate-700 mt-1">{duracionSemanas}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sección 2: Selección Curricular - Libros SEP */}
      <div>
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
              Catálogo de Libros SEP
            </h2>
            {currentFaseObj && (
              <span className="ml-2 px-2.5 py-0.5 bg-blue-50 text-blue-700 text-[11px] font-extrabold rounded-full border border-blue-200">
                {currentFaseObj.fase}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">
                1. Grado Escolar
              </label>
              <select value={grado} onChange={(e) => handleGradoChange(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-600 rounded text-slate-800 text-sm font-semibold outline-none">
                {availableGrados.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">
                2. Campo Formativo
              </label>
              <select value={selectedCampo} onChange={(e) => handleCampoChange(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-600 rounded text-slate-800 text-sm font-semibold outline-none">
                {availableCampos.map((campo) => (
                  <option key={campo.id} value={campo.id}>{campo.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-slate-500 font-bold text-[10px] uppercase">
                3. Proyecto de Aula (Libro de Texto)
              </label>
            </div>

            {isLoadingProyectos ? (
              <div className="p-3.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-medium border border-slate-200 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                <span>Buscando proyectos oficiales en la base de datos...</span>
              </div>
            ) : proyectos.length > 0 ? (
              <select
                value={selectedProyectoId}
                onChange={(e) => setSelectedProyectoId(Number(e.target.value))}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 rounded text-slate-800 text-sm font-bold transition outline-none leading-relaxed shadow-sm"
              >
                {proyectos.map((proyecto) => (
                  <option key={proyecto.id} value={proyecto.id}>
                    {proyecto.nombre_proyecto} (Págs. {proyecto.paginas})
                  </option>
                ))}
              </select>
            ) : (
              <div className="p-3.5 bg-amber-50 text-amber-800 rounded-lg text-xs font-medium border border-amber-200">
                No se encontraron proyectos registrados para esta combinación de nivel, grado y campo formativo.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sección 3: Ejes Articuladores */}
      <div>
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-slate-100">
          <Layers className="w-5 h-5 text-mex-maroon" />
          <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Ejes Articuladores (NEM)</h2>
        </div>
        <p className="text-xs text-slate-500 mb-4">Selecciona uno o más ejes rectores que integrarán de forma transversal las actividades del proyecto.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {EJES_ARTICULADORES.map((eje) => {
            const isChecked = selectedEjes.includes(eje.id);
            return (
              <label key={eje.id} className={`flex items-start gap-3 p-3.5 rounded border cursor-pointer transition select-none ${isChecked ? "bg-mex-maroon/5 border-mex-maroon/20 text-mex-maroon" : "bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                <input type="checkbox" checked={isChecked} onChange={() => handleToggleEje(eje.id)} className="mt-1 h-4 w-4 rounded border-slate-300 text-mex-maroon focus:ring-mex-maroon" />
                <div>
                  <span className="font-bold text-xs block mb-0.5 text-slate-800">{eje.label}</span>
                  <span className="text-[11px] text-slate-500 block leading-tight">{eje.desc}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Sección 4: Metodología */}
      <div>
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-slate-100">
          <Sparkles className="w-5 h-5 text-mex-maroon" />
          <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Metodología Sociocrítica Sugerida</h2>
        </div>
        <p className="text-xs text-slate-500 mb-4">La metodología recomendada varía según el Campo Formativo. Se ha pre-seleccionado la sugerida automáticamente.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {METODOLOGIAS.map((meto) => {
            const isSelected = selectedMetodologia === meto.id;
            return (
              <div key={meto.id} onClick={() => setSelectedMetodologia(meto.id)} className={`p-4 rounded border cursor-pointer transition relative overflow-hidden flex flex-col justify-between select-none ${isSelected ? "bg-mex-maroon/5 border-mex-maroon/25 ring-1 ring-mex-maroon/10 text-mex-maroon" : "bg-slate-50/50 border-slate-200 hover:bg-slate-50 text-slate-600"}`}>
                {isSelected && <div className="absolute right-0 top-0 bg-mex-maroon text-white px-2 py-0.5 rounded-bl text-[10px] font-bold tracking-wider uppercase">Activa</div>}
                <div>
                  <h4 className="font-extrabold text-xs text-slate-800 mb-1">{meto.label}</h4>
                  <p className="text-xs text-slate-500 leading-normal">{meto.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sección 5: Situación Problema */}
      <div>
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-mex-maroon" />
            <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Situación-Problema a Abordar</h2>
          </div>
        </div>
        <p className="text-xs text-slate-500 mb-4">Describe el problema escolar o comunitario que guiará el desarrollo de este proyecto del libro.</p>
        <textarea rows={4} value={situacionProblema} onChange={(e) => setSituacionProblema(e.target.value)} placeholder="Ej. El consumo excesivo de comida chatarra en los recreos..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 rounded text-slate-800 text-sm font-normal leading-relaxed outline-none" />
      </div>

      {/* Sección 6: BAP / DUA */}
      <div>
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-slate-100">
          <Accessibility className="w-5 h-5 text-mex-maroon" />
          <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Barreras para el Aprendizaje y la Participación (BAP)</h2>
        </div>
        <p className="text-xs text-slate-500 mb-6">Selecciona las condiciones para que la IA diseñe los ajustes razonables (DUA).</p>
        <div className="space-y-6">
          {BAP_CATEGORIES.map((cat, catIdx) => (
            <div key={catIdx} className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50/30 p-5">
              <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wide mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Users className="w-4 h-4 text-mex-maroon" />
                <span>{cat.category}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {cat.subcategories.map((subcat, subIdx) => (
                  <div key={subIdx} className="space-y-3 bg-white p-4 rounded-lg border border-slate-200/60 shadow-sm">
                    <h4 className="font-black text-[10px] text-mex-maroon uppercase tracking-wider flex items-center justify-between">
                      <span>{subcat.name}</span>
                      <span className="text-[8px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">{subcat.items.length} opciones</span>
                    </h4>
                    <div className="space-y-2.5">
                      {subcat.items.map((item) => {
                        const formattedValue = `${subcat.name}: ${item.label} (${item.code})`;
                        const isChecked = selectedBap.includes(formattedValue);
                        return (
                          <label key={item.id} className={`flex items-start gap-2.5 p-2 rounded border cursor-pointer transition select-none text-xs ${isChecked ? "bg-mex-maroon/5 border-mex-maroon/20 text-mex-maroon font-semibold" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/60"}`}>
                            <input type="checkbox" checked={isChecked} onChange={() => handleToggleBap(formattedValue)} className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-mex-maroon focus:ring-mex-maroon" />
                            <div className="flex-1 min-w-0 flex items-center justify-between gap-1.5">
                              <span className="truncate">{item.label}</span>
                              <span className={`text-[9px] px-1 py-0.2 rounded font-extrabold font-mono ${isChecked ? "bg-mex-maroon/10 text-mex-maroon" : "bg-slate-200/80 text-slate-500"}`}>{item.code}</span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {formError && (
        <div className="p-4 bg-slate-50 border-l-4 border-mex-maroon rounded text-slate-800 text-xs font-semibold">
          {formError}
        </div>
      )}

      {/* Botón de Enviar */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-slate-100">
        <button
          type="submit"
          disabled={isGenerating || proyectos.length === 0 || !selectedProyectoId}
          className="w-full sm:w-auto py-3.5 px-8 rounded-lg bg-slate-900 hover:bg-black text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Diseñando Secuencia Didáctica...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-mex-gold fill-mex-gold" />
              <span>Diseñar Secuencia</span>
              <span className="text-[11px] font-black bg-white/20 px-2 py-0.5 rounded-full text-mex-gold flex items-center gap-1">
                <Coins className="w-3 h-3" />
                10 créditos
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}