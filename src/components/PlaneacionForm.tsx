import React, { useState, useEffect } from "react";
import { curriculumData, CAMPO_FORMATIVO_LABELS, DISCIPLINA_LABELS } from "../data/fase6sintetico";
import { Sparkles, BookOpen, User, School, Calendar, RefreshCw, Layers, FileText, Accessibility, Users } from "lucide-react";

interface PlaneacionFormProps {
  onSubmit?: (formData: any) => void;
  isLoading?: boolean;
  initialData?: {
    nivel?: string;
    grado?: string;
    campoFormativo?: string;
    disciplina?: string;
    situacionProblema?: string;
    contenido?: string;
    pda?: string;
    metodologia?: string;
    ejesArticuladores?: string[];
  } | null;
  onBackToHub?: () => void;
  onChange?: (data: any) => void;
  onSelect?: (item: any) => void;
  toggleOption?: (optionId: string) => void;
  setFormData?: (data: any) => void;
}

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

const MODALIDADES_TRABAJO = [
  { id: "Taller Crítico", label: "Taller Crítico", desc: "Planteamiento de acciones didácticas para el codiseño y la acción transformadora. Consta de 4 etapas: Situación Inicial, Organización de las Acciones, Puesta en Marcha y Valoramos lo Aprendido." },
  { id: "Rincones de Aprendizaje", label: "Rincones de Aprendizaje", desc: "Promueve la autonomía y exploración lúdica en espacios designados. Consta de 5 etapas: Saberes Previos, Asamblea Inicial y Planeación, Exploración de los Rincones, Compartimos lo Aprendido y Reflexión sobre el Aprendizaje." },
  { id: "Centros de Interés", label: "Centros de Interés", desc: "Profundizar en el conocimiento a partir de la realidad y la curiosidad infantil. Consta de 3 etapas: En Contacto con la Realidad, Identificación e Integración y Expresión." },
  { id: "Unidad Didáctica", label: "Unidad Didáctica", desc: "Investigación colectiva sobre un aspecto significativo de la realidad. Consta de 6 etapas: Lectura de la Realidad, Identificación de la Trama y Complejidad, Planificación y Organización del Trabajo, Exploración y Descubrimiento, Participación Activa y Horizontal, y Valoración de la Experiencia." },
  { id: "Aprendizaje Basado en el Juego", label: "Aprendizaje Basado en el Juego", desc: "Experiencia lúdica para el desarrollo integral y reflexión colectiva. Consta de 4 etapas: Planteamiento del Juego, Desarrollo de las Actividades, Compartimos la Experiencia y Comunidad de Juego." },
  { id: "Proyecto", label: "Proyecto", desc: "Trabajo colaborativo a partir de un punto de partida, planeación, ejecución y reflexión. Consta de 5 etapas: Punto de Partida, Planeación, ¡A Trabajar!, Comunicamos Nuestros Logros y Reflexión sobre el Aprendizaje." },
];

const SUGGESTED_PROBLEMS = [
  "Consumo excesivo de comida chatarra y bebidas azucaradas en la cooperativa escolar.",
  "Falta de cultura ambiental: acumulación de basura de plásticos de un solo uso en las áreas comunes de la escuela.",
  "Violencia verbal y acoso escolar (bullying) durante los recreos y en redes sociales entre compañeros.",
  "Desinterés por la lectura y dificultades severas en la comprensión de textos informativos y científicos.",
  "Desperdicio y falta de cuidado del agua potable en los sanitarios y áreas de riego de la institución.",
  "Dificultades en el manejo y regulación de las emociones tras el retorno a la presencialidad total.",
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

export default function PlaneacionForm({
  onSubmit = () => {},
  isLoading = false,
  initialData = null,
  onBackToHub = () => {},
  onChange = () => {},
  onSelect = () => {},
  toggleOption = () => {},
  setFormData = () => {},
}: PlaneacionFormProps) {
  // General details
  const [docenteName, setDocenteName] = useState("René Gaytán");
  const [escuelaName, setEscuelaName] = useState("Esc. Sec. Gral. #3 \"Jaime Torres Bodet\"");
  const [cct, setCct] = useState("10DES0021J");
  const [grupo, setGrupo] = useState("A");
  const [nivel, setNivel] = useState("Secundaria");
  const [grado, setGrado] = useState("Primer Grado");
  const [duracionSemanas, setDuracionSemanas] = useState("2 semanas");
  const [numSesiones, setNumSesiones] = useState<number>(8);
  const [duracionSesion, setDuracionSesion] = useState<string>("50 minutos");
  const [selectedBap, setSelectedBap] = useState<string[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const [escuelasList, setEscuelasList] = useState<Array<{ escuelaName: string; cct: string }>>([]);

  // AI Assistant States
  const [aiNivel, setAiNivel] = useState("Secundaria");
  const [aiGrado, setAiGrado] = useState("Primer Grado");
  const [aiCampo, setAiCampo] = useState("Lenguajes");
  const [aiDisciplina, setAiDisciplina] = useState("Español");
  const [aiSituacion, setAiSituacion] = useState("");
  
  // Suggestion options & loading states
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<Array<{ contenido: string; pda: string }>>([]);
  const [selectedAiIndex, setSelectedAiIndex] = useState<number | null>(null);
  
  // Custom created content option
  const [createdContent, setCreatedContent] = useState<{ contenido: string; pda: string } | null>(null);

  // Calendar state
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toISOString().split("T")[0];
  });

  // Curriculum selections
  const [selectedCampo, setSelectedCampo] = useState("lenguajes");
  const [selectedDisciplina, setSelectedDisciplina] = useState("ESPAÑOL");
  const [selectedContenido, setSelectedContenido] = useState("");
  const [selectedPda, setSelectedPda] = useState("");

  // Custom curriculum toggling
  const [isCustomCurriculum, setIsCustomCurriculum] = useState<boolean>(false);
  const [customContenido, setCustomContenido] = useState("");
  const [customPda, setCustomPda] = useState("");

  // Other NEM details
  const [selectedEjes, setSelectedEjes] = useState<string[]>(["Artes y experiencias estéticas"]);
  const [selectedMetodologia, setSelectedMetodologia] = useState("Aprendizaje Basado en Proyectos Comunitarios (ABPC)");
  const [situacionProblema, setSituacionProblema] = useState("Dificultad de los estudiantes para valorar y difundir las manifestaciones culturales locales en un segundo idioma.");

  // Helper toggle for BAP / Aptitudes Sobresalientes with full safety
  const handleToggleBap = (formattedValue: string) => {
    if (!formattedValue) return;
    setSelectedBap((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      if (safePrev.includes(formattedValue)) {
        return safePrev.filter((val) => val !== formattedValue);
      } else {
        return [...safePrev, formattedValue];
      }
    });

    if (typeof toggleOption === "function") {
      toggleOption(formattedValue);
    }
  };

  const handleEjeChange = (ejeId: string) => {
    if (!ejeId) return;
    setSelectedEjes((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.includes(ejeId) ? safePrev.filter((id) => id !== ejeId) : [...safePrev, ejeId];
    });
  };

  // Load profile from localStorage if exists
  useEffect(() => {
    const savedProfile = localStorage.getItem("nem_secundaria_profile");
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        if (profile.docenteName) setDocenteName(profile.docenteName);
        if (profile.escuelaName) setEscuelaName(profile.escuelaName);
        if (profile.cct) setCct(profile.cct);
        if (profile.escuelas && profile.escuelas.length > 0) {
          setEscuelasList(profile.escuelas);
          const matched = profile.escuelas.find((e: any) => e.escuelaName === profile.escuelaName && e.cct === profile.cct);
          if (!matched) {
            setEscuelaName(profile.escuelas[0].escuelaName);
            setCct(profile.escuelas[0].cct);
          }
        } else if (profile.escuelaName && profile.cct) {
          setEscuelasList([{ escuelaName: profile.escuelaName, cct: profile.cct }]);
        }
      } catch (e) {
        console.error("Error loading profile:", e);
      }
    }
  }, []);

  // Sync initialData if provided
  useEffect(() => {
    if (initialData) {
      if (initialData.nivel) {
        setNivel(initialData.nivel);
        setAiNivel(initialData.nivel);
      }
      if (initialData.grado) {
        setGrado(initialData.grado);
        setAiGrado(initialData.grado);
      }
      if (initialData.situacionProblema) {
        setSituacionProblema(initialData.situacionProblema);
        setAiSituacion(initialData.situacionProblema);
      }
      
      setIsCustomCurriculum(true);
      if (initialData.contenido) setCustomContenido(initialData.contenido);
      if (initialData.pda) setCustomPda(initialData.pda);

      if (initialData.metodologia) {
        setSelectedMetodologia(initialData.metodologia);
      }
      if (initialData.ejesArticuladores && Array.isArray(initialData.ejesArticuladores)) {
        setSelectedEjes(initialData.ejesArticuladores);
      }

      if (initialData.campoFormativo) {
        const normCampo = initialData.campoFormativo.toLowerCase();
        if (normCampo.includes("lenguaje")) {
          setSelectedCampo("lenguajes");
        } else if (normCampo.includes("saberes") || normCampo.includes("científico") || normCampo.includes("cientifico")) {
          setSelectedCampo("SABERES");
        } else if (normCampo.includes("ética") || normCampo.includes("etica") || normCampo.includes("naturaleza")) {
          setSelectedCampo("ETICA NyS");
        } else if (normCampo.includes("humano") || normCampo.includes("comunitario")) {
          setSelectedCampo("HUMANO Y C");
        }
      }
    }
  }, [initialData]);

  // Sync dates to duracionSemanas
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const weeks = Math.round(diffDays / 7);
      
      const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
      const startStr = start.toLocaleDateString("es-MX", options);
      const endStr = end.toLocaleDateString("es-MX", options);

      if (weeks <= 1) {
        setDuracionSemanas(`${diffDays} días (del ${startStr} al ${endStr})`);
      } else {
        setDuracionSemanas(`${weeks} semanas (del ${startStr} al ${endStr})`);
      }
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (nivel === "Preescolar") {
      setGrado("1º de Preescolar");
      setDuracionSesion("45 minutos");
      setSelectedMetodologia("Aprendizaje Basado en el Juego");
    } else if (nivel === "Primaria") {
      setGrado("Primer Grado");
      setDuracionSesion("50 minutos");
      setSelectedMetodologia("Aprendizaje Basado en Proyectos Comunitarios (ABPC)");
    } else {
      setGrado("Primer Grado");
      setDuracionSesion("50 minutos");
      setSelectedMetodologia("Aprendizaje Basado en Proyectos Comunitarios (ABPC)");
    }
  }, [nivel]);

  useEffect(() => {
    if (aiNivel === "Preescolar") {
      setAiGrado("1º de Preescolar");
      setAiDisciplina("Educación Preescolar");
    } else if (aiNivel === "Primaria") {
      setAiGrado("Primer Grado");
      setAiDisciplina("Lenguajes / Primaria");
    } else {
      setAiGrado("Primer Grado");
      setAiDisciplina("Español");
    }
  }, [aiNivel]);

  // Lists dynamically filtered
  const [disciplinas, setDisciplinas] = useState<string[]>([]);
  const [contenidos, setContenidos] = useState<string[]>([]);
  const [pdas, setPdas] = useState<string[]>([]);

  useEffect(() => {
    const uniqueDisciplinas = Array.from(
      new Set(
        curriculumData
          .filter((item) => {
            const matchesCampo = item.campoFormativo === selectedCampo;
            if (nivel === "Preescolar") {
              return matchesCampo && item.disciplina === "PREESCOLAR";
            } else if (nivel === "Primaria") {
              return matchesCampo && item.disciplina === "PRIMARIA";
            } else {
              return matchesCampo && item.disciplina !== "PREESCOLAR" && item.disciplina !== "PRIMARIA";
            }
          })
          .map((item) => item.disciplina)
      )
    );
    setDisciplinas(uniqueDisciplinas);

    if (uniqueDisciplinas.length > 0) {
      setSelectedDisciplina(uniqueDisciplinas[0]);
    }
  }, [selectedCampo, nivel]);

  useEffect(() => {
    if (nivel !== "Preescolar") {
      if (selectedCampo === "lenguajes") {
        setSelectedMetodologia("Aprendizaje Basado en Proyectos Comunitarios (ABPC)");
      } else if (selectedCampo === "SABERES") {
        setSelectedMetodologia("Aprendizaje Basado en Indagación (STEAM)");
      } else if (selectedCampo === "ETICA NyS") {
        setSelectedMetodologia("Aprendizaje Basado en Problemas (ABP)");
      } else if (selectedCampo === "HUMANO Y C") {
        setSelectedMetodologia("Aprendizaje Servicio (AS)");
      }
    }
  }, [selectedCampo, nivel]);

  useEffect(() => {
    const filteredContents = Array.from(
      new Set(
        curriculumData
          .filter(
            (item) =>
              item.campoFormativo === selectedCampo &&
              item.disciplina === selectedDisciplina &&
              item.grado.toLowerCase() === grado.toLowerCase()
          )
          .map((item) => item.contenido)
      )
    );
    setContenidos(filteredContents);

    if (filteredContents.length > 0) {
      setSelectedContenido(filteredContents[0]);
    } else {
      setSelectedContenido("");
    }
  }, [selectedCampo, selectedDisciplina, grado]);

  useEffect(() => {
    if (!selectedContenido) {
      setPdas([]);
      setSelectedPda("");
      return;
    }

    const filteredPdas = curriculumData
      .filter(
        (item) =>
          item.campoFormativo === selectedCampo &&
          item.disciplina === selectedDisciplina &&
          item.grado.toLowerCase() === grado.toLowerCase() &&
          item.contenido === selectedContenido
      )
      .map((item) => item.pda);

    setPdas(filteredPdas);

    if (filteredPdas.length > 0) {
      setSelectedPda(filteredPdas[0]);
    } else {
      setSelectedPda("");
    }
  }, [selectedCampo, selectedDisciplina, grado, selectedContenido]);

  const selectProblemPreset = (problem: string) => {
    if (typeof problem === "string" && problem) {
      setSituacionProblema(problem);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    setFormError(null);
    
    if (isCustomCurriculum) {
      if (!customContenido.trim() || !customPda.trim()) {
        setFormError("Por favor escribe o genera un Contenido y un PDA para tu planeación.");
        return;
      }
    } else {
      if (!selectedContenido || !selectedPda) {
        setFormError("Por favor selecciona un contenido y un PDA válidos de la base de datos.");
        return;
      }
    }

    const finalCampo = isCustomCurriculum
      ? (CAMPO_FORMATIVO_LABELS[selectedCampo] || selectedCampo || "General")
      : (CAMPO_FORMATIVO_LABELS[selectedCampo] || selectedCampo);

    const finalDisciplina = isCustomCurriculum
      ? (DISCIPLINA_LABELS[selectedDisciplina] || selectedDisciplina || "General")
      : (DISCIPLINA_LABELS[selectedDisciplina] || selectedDisciplina);

    const formDataPayload = {
      nivel,
      docenteName,
      escuelaName,
      cct,
      grupo,
      grado,
      duracionSemanas,
      numSesiones,
      duracionSesion,
      campoFormativo: finalCampo,
      disciplina: finalDisciplina,
      contenido: isCustomCurriculum ? customContenido : selectedContenido,
      pda: isCustomCurriculum ? customPda : selectedPda,
      ejesArticuladores: selectedEjes,
      metodologia: selectedMetodologia,
      situacionProblema,
      bapSelected: selectedBap,
    };

    if (typeof onChange === "function") {
      onChange(formDataPayload);
    }
    if (typeof setFormData === "function") {
      setFormData(formDataPayload);
    }

    if (typeof onSubmit === "function") {
      onSubmit(formDataPayload);
    }
  };

  return (
    <form id="planeacion-form" onSubmit={handleFormSubmit} className="space-y-8 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
      {/* Sección 1: Datos Generales */}
      <div>
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-slate-100">
          <School className="w-5 h-5 text-mex-maroon" />
          <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
            {escuelasList.length > 1 ? "Datos de la Institución y del Proyecto" : "Datos de la Planeación"}
          </h2>
        </div>

        {escuelasList.length > 1 && (
          <div className="bg-slate-50 p-4 border border-slate-200/60 rounded-xl space-y-2.5 mb-5">
            <label className="block text-slate-500 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
              <School className="w-4 h-4 text-mex-maroon animate-pulse" />
              <span>Selecciona la Escuela / Plantel para esta Planeación:</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {escuelasList.map((esc, index) => {
                const isSelected = escuelaName === esc.escuelaName && cct === esc.cct;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={(e) => {
                      if (e && typeof e.preventDefault === "function") e.preventDefault();
                      setEscuelaName(esc.escuelaName);
                      setCct(esc.cct);
                    }}
                    className={`px-3.5 py-2 rounded-lg border text-xs font-bold transition flex items-center gap-2 ${
                      isSelected
                        ? "bg-mex-maroon text-white border-mex-maroon shadow-sm"
                        : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-extrabold">{esc.escuelaName}</div>
                      <div className={`text-[9px] font-medium mt-0.5 ${isSelected ? "text-mex-gold" : "text-slate-400"}`}>
                        CCT: {esc.cct}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5 flex items-center justify-between">
              <span>Nombre del Docente</span>
              <span className="text-[8px] text-mex-maroon font-extrabold uppercase tracking-wide">Uso Personal Exclusivo</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={docenteName}
                readOnly
                disabled
                className="w-full pl-9 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded text-slate-500 text-sm font-medium cursor-not-allowed outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Nivel Educativo</label>
            <select
              value={nivel}
              onChange={(e) => {
                setNivel(e.target.value);
                setIsCustomCurriculum(false);
              }}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-sm font-medium transition outline-none"
            >
              <option value="Preescolar">Preescolar</option>
              <option value="Primaria">Primaria</option>
              <option value="Secundaria">Secundaria</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:col-span-2">
            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Grupo</label>
              <input
                type="text"
                value={grupo}
                onChange={(e) => setGrupo(e.target.value)}
                placeholder="Ej. A"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-sm font-medium transition text-center outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Fecha de Inicio (Calendario)</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-xs font-semibold transition outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Fecha de Fin (Calendario)</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-xs font-semibold transition outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 sm:col-span-2">
            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Número de Sesiones</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    if (e && typeof e.preventDefault === "function") e.preventDefault();
                    setNumSesiones(Math.max(1, numSesiones - 1));
                  }}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-extrabold text-sm rounded transition cursor-pointer"
                >
                  -
                </button>
                <input
                  type="text"
                  readOnly
                  value={numSesiones}
                  className="w-full py-2 bg-slate-50 border border-slate-200 rounded text-slate-800 text-sm font-bold text-center outline-none select-none cursor-default"
                  required
                />
                <button
                  type="button"
                  onClick={(e) => {
                    if (e && typeof e.preventDefault === "function") e.preventDefault();
                    setNumSesiones(Math.min(40, numSesiones + 1));
                  }}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-extrabold text-sm rounded transition cursor-pointer"
                >
                  +
                </button>
              </div>
              <span className="text-[10px] text-slate-400 font-medium block mt-1">Número de sesiones del proyecto.</span>
            </div>

            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Duración por Sesión</label>
              {nivel === "Secundaria" ? (
                <div className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded text-slate-500 text-sm font-semibold select-none cursor-not-allowed">
                  50 minutos (1 módulo)
                </div>
              ) : (
                <select
                  value={duracionSesion}
                  onChange={(e) => setDuracionSesion(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-sm font-medium transition outline-none"
                >
                  <option value="30 minutos">30 minutos</option>
                  <option value="40 minutos">40 minutos</option>
                  <option value="45 minutos">45 minutos</option>
                  <option value="50 minutos">50 minutos</option>
                  <option value="60 minutos">60 minutos (1 hora)</option>
                  <option value="90 minutos">90 minutos</option>
                  <option value="120 minutos">120 minutos (2 horas)</option>
                </select>
              )}
              <span className="text-[10px] text-slate-400 font-medium block mt-1">
                {nivel === "Secundaria" 
                  ? "En secundaria la sesión es de 1 módulo." 
                  : "Selecciona la duración de cada clase."}
              </span>
            </div>

            <div className="flex flex-col justify-end bg-slate-50 p-3 rounded border border-slate-200">
              <span className="text-[9px] font-black text-mex-maroon uppercase tracking-wider block">Duración total calculada:</span>
              <span className="text-xs font-bold text-slate-700 mt-1">{duracionSemanas}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sección 2: Selección Curricular NEM */}
      <div>
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-mex-maroon" />
            <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
              Elementos Curriculares ({nivel})
            </h2>
          </div>
          <button
            type="button"
            onClick={(e) => {
              if (e && typeof e.preventDefault === "function") e.preventDefault();
              setIsCustomCurriculum(!isCustomCurriculum);
            }}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 rounded border border-slate-200 font-extrabold text-[10px] uppercase tracking-wider transition cursor-pointer"
          >
            {isCustomCurriculum ? "✓ Usar Base de Datos" : "✍ Escribir Personalizado"}
          </button>
        </div>

        {isCustomCurriculum ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Grado Escolar</label>
                <select
                  value={grado}
                  onChange={(e) => setGrado(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-sm font-medium transition outline-none"
                >
                  {nivel === "Preescolar" && (
                    <>
                      <option value="1º de Preescolar">1º de Preescolar (3 años)</option>
                      <option value="2º de Preescolar">2º de Preescolar (4 años)</option>
                      <option value="3º de Preescolar">3º de Preescolar (5 años)</option>
                    </>
                  )}
                  {nivel === "Secundaria" && (
                    <>
                      <option value="Primer Grado">Primer Grado (1º)</option>
                      <option value="Segundo Grado">Segundo Grado (2º)</option>
                      <option value="Tercer Grado">Tercer Grado (3º)</option>
                    </>
                  )}
                  {nivel === "Primaria" && (
                    <>
                      <option value="Primer Grado">Primer Grado (1º)</option>
                      <option value="Segundo Grado">Segundo Grado (2º)</option>
                      <option value="Tercer Grado">Tercer Grado (3º)</option>
                      <option value="Cuarto Grado">Cuarto Grado (4º)</option>
                      <option value="Quinto Grado">Quinto Grado (5º)</option>
                      <option value="Sexto Grado">Sexto Grado (6º)</option>
                    </>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Campo Formativo</label>
                <select
                  value={selectedCampo}
                  onChange={(e) => setSelectedCampo(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-sm font-medium transition outline-none"
                >
                  {Object.entries(CAMPO_FORMATIVO_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Contenido Sintético / Analítico</label>
              <textarea
                rows={2}
                value={customContenido}
                onChange={(e) => setCustomContenido(e.target.value)}
                placeholder="Ingresa el contenido sintético oficial o analítico co-diseñado..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-xs font-semibold leading-relaxed transition outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Proceso de Desarrollo de Aprendizaje (PDA)</label>
              <textarea
                rows={3}
                value={customPda}
                onChange={(e) => setCustomPda(e.target.value)}
                placeholder="Ingresa el PDA correspondiente..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-xs font-semibold leading-relaxed transition outline-none"
                required
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Campo Formativo</label>
                <select
                  value={selectedCampo}
                  onChange={(e) => setSelectedCampo(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-sm font-medium transition outline-none"
                >
                  {Object.entries(CAMPO_FORMATIVO_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Disciplina / Asignatura</label>
                <select
                  value={selectedDisciplina}
                  onChange={(e) => setSelectedDisciplina(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-sm font-medium transition outline-none"
                >
                  {disciplinas.map((dis) => (
                    <option key={dis} value={dis}>
                      {DISCIPLINA_LABELS[dis] || dis}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Grado Escolar</label>
                <select
                  value={grado}
                  onChange={(e) => setGrado(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-sm font-medium transition outline-none"
                >
                  {nivel === "Preescolar" && (
                    <>
                      <option value="1º de Preescolar">1º de Preescolar (3 años)</option>
                      <option value="2º de Preescolar">2º de Preescolar (4 años)</option>
                      <option value="3º de Preescolar">3º de Preescolar (5 años)</option>
                    </>
                  )}
                  {nivel === "Secundaria" && (
                    <>
                      <option value="Primer Grado">Primer Grado (1º)</option>
                      <option value="Segundo Grado">Segundo Grado (2º)</option>
                      <option value="Tercer Grado">Tercer Grado (3º)</option>
                    </>
                  )}
                  {nivel === "Primaria" && (
                    <>
                      <option value="Primer Grado">Primer Grado (1º)</option>
                      <option value="Segundo Grado">Segundo Grado (2º)</option>
                      <option value="Tercer Grado">Tercer Grado (3º)</option>
                      <option value="Cuarto Grado">Cuarto Grado (4º)</option>
                      <option value="Quinto Grado">Quinto Grado (5º)</option>
                      <option value="Sexto Grado">Sexto Grado (6º)</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">
                Contenido Oficial
              </label>
              {contenidos.length > 0 ? (
                <select
                  value={selectedContenido}
                  onChange={(e) => setSelectedContenido(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-sm font-medium transition outline-none"
                >
                  {contenidos.map((cont, i) => (
                    <option key={i} value={cont}>
                      {cont}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="p-3 bg-slate-50 text-slate-500 rounded-xl text-xs font-medium border border-slate-200">
                  No se encontraron contenidos para los filtros seleccionados de la base de datos oficial.
                </div>
              )}
            </div>

            {selectedContenido && (
              <div>
                <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">
                  Proceso de Desarrollo de Aprendizaje (PDA) correspondiente
                </label>
                {pdas.length > 0 ? (
                  <div className="space-y-2">
                    {pdas.map((pdaOption, index) => (
                      <label
                        key={index}
                        onClick={(e) => {
                          if ((e.target as HTMLElement).tagName !== "INPUT") {
                            setSelectedPda(pdaOption);
                            if (typeof onSelect === "function") {
                              onSelect(pdaOption);
                            }
                          }
                        }}
                        className={`flex items-start gap-3 p-3.5 rounded border text-sm font-normal cursor-pointer transition select-none ${
                          selectedPda === pdaOption
                            ? "bg-mex-maroon/5 border-l-4 border-l-mex-maroon border-y-mex-maroon/20 border-r-mex-maroon/20 text-slate-900 ring-1 ring-mex-maroon/10"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="pda_selection"
                          checked={selectedPda === pdaOption}
                          onChange={(e) => {
                            if (e && typeof e.stopPropagation === "function") e.stopPropagation();
                            setSelectedPda(pdaOption);
                            if (typeof onSelect === "function") {
                              onSelect(pdaOption);
                            }
                          }}
                          className="mt-0.5 text-mex-maroon focus:ring-mex-maroon"
                        />
                        <span className="text-xs leading-relaxed font-semibold">{pdaOption}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-slate-50 text-slate-500 rounded-xl text-xs font-medium border border-slate-200">
                    No se encontraron PDAs correspondientes.
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sección 3: Ejes Articuladores */}
      <div>
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-slate-100">
          <Layers className="w-5 h-5 text-mex-maroon" />
          <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Ejes Articuladores (NEM)</h2>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Selecciona uno o más ejes rectores que integrarán de forma transversal las actividades del proyecto.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {EJES_ARTICULADORES.map((eje) => {
            const isChecked = Array.isArray(selectedEjes) && selectedEjes.includes(eje.id);
            return (
              <label
                key={eje.id}
                onClick={(e) => {
                  if ((e.target as HTMLElement).tagName !== "INPUT") {
                    e.preventDefault();
                    handleEjeChange(eje.id);
                  }
                }}
                className={`flex items-start gap-3 p-3.5 rounded border cursor-pointer transition select-none ${
                  isChecked
                    ? "bg-mex-maroon/5 border-mex-maroon/20 text-mex-maroon"
                    : "bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => {
                    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
                    handleEjeChange(eje.id);
                  }}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-mex-maroon focus:ring-mex-maroon"
                />
                <div>
                  <span className="font-bold text-xs block mb-0.5 text-slate-800">{eje.label}</span>
                  <span className="text-[11px] text-slate-500 block leading-tight">{eje.desc}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Sección 4: Metodología / Modalidad de Trabajo */}
      <div>
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-slate-100">
          <Sparkles className="w-5 h-5 text-mex-maroon" />
          <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
            {nivel === "Preescolar" ? "Modalidades de Trabajo" : "Metodología Sociocrítica Sugerida"}
          </h2>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          {nivel === "Preescolar"
            ? "Selecciona la modalidad de trabajo para guiar la acción transformadora y el codiseño en educación preescolar."
            : "La metodología recomendada varía según el Campo Formativo. Se ha pre-seleccionado la sugerida automáticamente para este campo."}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(nivel === "Preescolar" ? MODALIDADES_TRABAJO : METODOLOGIAS).map((meto) => {
            const isSelected = selectedMetodologia === meto.id;
            return (
              <div
                key={meto.id}
                onClick={(e) => {
                  if (e && typeof e.stopPropagation === "function") e.stopPropagation();
                  if (meto && meto.id) {
                    setSelectedMetodologia(meto.id);
                  }
                }}
                className={`p-4 rounded border cursor-pointer transition relative overflow-hidden flex flex-col justify-between select-none ${
                  isSelected
                    ? "bg-mex-maroon/5 border-mex-maroon/25 ring-1 ring-mex-maroon/10 text-mex-maroon"
                    : "bg-slate-50/50 border-slate-200 hover:bg-slate-50 text-slate-600"
                }`}
              >
                {isSelected && (
                  <div className="absolute right-0 top-0 bg-mex-maroon text-white px-2 py-0.5 rounded-bl text-[10px] font-bold tracking-wider uppercase">
                    Activa
                  </div>
                )}
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
        <p className="text-xs text-slate-500 mb-4">
          Describe la situación de interés real o el problema escolar/comunitario que los alumnos investigarán o resolverán a lo largo del proyecto.
        </p>

        <textarea
          rows={4}
          value={situacionProblema}
          onChange={(e) => setSituacionProblema(e.target.value)}
          placeholder="Escribe la situación-problema de tu escuela o comunidad..."
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-sm font-normal leading-relaxed transition outline-none"
          required
        />

        {/* Sugerencias de problemáticas contextuales */}
        <div className="mt-4">
          <span className="block text-slate-500 font-bold text-[10px] mb-2.5 uppercase tracking-wider">
            Sugerencias de Problemáticas del Contexto Nacional/Escolar:
          </span>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_PROBLEMS.map((problem, i) => (
              <button
                type="button"
                key={i}
                onClick={(e) => {
                  if (e && typeof e.preventDefault === "function") e.preventDefault();
                  selectProblemPreset(problem);
                }}
                className="text-slate-600 hover:text-mex-maroon bg-slate-50 hover:bg-mex-maroon/5 border border-slate-200 hover:border-mex-maroon/20 rounded px-3 py-1.5 text-xs text-left transition font-normal cursor-pointer"
              >
                {problem}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sección 6: Barreras para el Aprendizaje y la Participación (BAP) y Aptitudes Sobresalientes */}
      <div>
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-slate-100">
          <Accessibility className="w-5 h-5 text-mex-maroon" />
          <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
            Barreras para el Aprendizaje y la Participación (BAP) y Aptitudes Sobresalientes
          </h2>
        </div>
        <p className="text-xs text-slate-500 mb-6">
          Selecciona las condiciones o barreras que enfrentan los alumnos de tu grupo para que Gemini diseñe los ajustes razonables pertinentes y aplique el enfoque del Diseño Universal para el Aprendizaje (DUA).
        </p>

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
                      <span className="text-[8px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">
                        {subcat.items.length} opciones
                      </span>
                    </h4>
                    <div className="space-y-2.5">
                      {subcat.items.map((item) => {
                        const formattedValue = `${subcat.name}: ${item.label} (${item.code})`;
                        const isChecked = Array.isArray(selectedBap) && selectedBap.includes(formattedValue);
                        return (
                          <label
                            key={item.id}
                            onClick={(e) => {
                              if ((e.target as HTMLElement).tagName !== "INPUT") {
                                e.preventDefault();
                                handleToggleBap(formattedValue);
                              }
                            }}
                            className={`flex items-start gap-2.5 p-2 rounded border cursor-pointer transition select-none text-xs ${
                              isChecked
                                ? "bg-mex-maroon/5 border-mex-maroon/20 text-mex-maroon font-semibold"
                                : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/60"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                if (e && typeof e.stopPropagation === "function") {
                                  e.stopPropagation();
                                }
                                handleToggleBap(formattedValue);
                              }}
                              className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-mex-maroon focus:ring-mex-maroon cursor-pointer"
                            />
                            <div className="flex-1 min-w-0 flex items-center justify-between gap-1.5">
                              <span className="truncate">{item.label}</span>
                              <span className={`text-[9px] px-1 py-0.2 rounded font-extrabold font-mono ${
                                isChecked ? "bg-mex-maroon/10 text-mex-maroon" : "bg-slate-200/80 text-slate-500"
                              }`}>
                                {item.code}
                              </span>
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

        {Array.isArray(selectedBap) && selectedBap.length > 0 && (
          <div className="mt-4 p-3 bg-mex-gold/5 border border-mex-gold/20 rounded-lg flex items-start gap-2.5">
            <span className="text-xs">
              <span className="font-extrabold text-mex-maroon">Seleccionados para la planeación ({selectedBap.length}):</span>{" "}
              <span className="text-slate-700 font-medium">
                {selectedBap.map(val => (val && typeof val === "string" && val.includes(": ") ? val.split(": ")[1] : val)).join(", ")}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Error banner if validation fails */}
      {formError && (
        <div className="p-4 bg-slate-50 border-l-4 border-mex-maroon rounded text-slate-800 text-xs font-semibold">
          {formError}
        </div>
      )}

      {/* Botón de Enviar */}
      <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
        {onBackToHub && typeof onBackToHub === "function" && (
          <button
            type="button"
            onClick={(e) => {
              if (e && typeof e.preventDefault === "function") e.preventDefault();
              if (typeof onBackToHub === "function") {
                onBackToHub();
              }
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded border border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-extrabold text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 cursor-pointer"
          >
            Volver al Panel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading || (!isCustomCurriculum && (!selectedContenido || !selectedPda)) || (isCustomCurriculum && (!customContenido.trim() || !customPda.trim()))}
          className="flex-1 w-full py-3.5 px-6 rounded bg-slate-900 hover:bg-black text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Diseñando Secuencia Didáctica con Gemini...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-mex-gold fill-mex-gold" />
              <span>Diseñar Secuencia con Gemini</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
