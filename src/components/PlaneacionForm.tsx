import React, { useState, useEffect, useMemo } from "react";
import { 
  getGradosPorNivel, 
  getCamposFormativos, 
  getAsignaturasPorCampo, 
  getContenidosPorFiltro, 
  getPdasPorContenido,
  getFaseByNivelGrado,
  CAMPO_FORMATIVO_LABELS,
  NemCampoFormativo,
  NemAsignatura,
  NemContenido
} from "../data/nemData";
import { Sparkles, BookOpen, User, School, Calendar, RefreshCw, Layers, FileText, Accessibility, Users, Coins, GraduationCap, Zap } from "lucide-react";

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

export default function PlaneacionForm(props: PlaneacionFormProps) {
  // Safe default callbacks guarantees that no callback is undefined in production
  const safeOnSubmit = props.onSubmit || (() => {});
  const safeOnBackToHub = props.onBackToHub || (() => {});
  const safeOnChange = props.onChange || (() => {});
  const safeOnSelect = props.onSelect || (() => {});
  const safeToggleOption = props.toggleOption || (() => {});
  const safeSetFormData = props.setFormData || (() => {});

  const isLoading = props.isLoading ?? false;
  const initialData = props.initialData ?? null;

  // General details
  const [docenteName, setDocenteName] = useState<string>("René Gaytán");
  const [escuelaName, setEscuelaName] = useState<string>("Esc. Sec. Gral. #3 \"Jaime Torres Bodet\"");
  const [cct, setCct] = useState<string>("10DES0021J");
  const [grupo, setGrupo] = useState<string>("A");
  const [nivel, setNivel] = useState<string>("Secundaria");
  const [grado, setGrado] = useState<string>("Primer Grado");
  const [duracionSemanas, setDuracionSemanas] = useState<string>("2 semanas");
  const [numSesiones, setNumSesiones] = useState<number>(8);
  const [duracionSesion, setDuracionSesion] = useState<string>("50 minutos");

  // Arrays strictly initialized to []
  const [selectedBap, setSelectedBap] = useState<string[]>([]);
  const [selectedEjes, setSelectedEjes] = useState<string[]>(["Artes y experiencias estéticas"]);
  const [escuelasList, setEscuelasList] = useState<Array<{ escuelaName: string; cct: string }>>([]);

  const [formError, setFormError] = useState<string | null>(null);

  // Calendar state
  const [startDate, setStartDate] = useState<string>(() => new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState<string>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toISOString().split("T")[0];
  });

  // Curriculum selections
  const [selectedCampo, setSelectedCampo] = useState<string>("lenguajes");
  const [selectedDisciplina, setSelectedDisciplina] = useState<string>("ESPAÑOL");
  const [selectedContenido, setSelectedContenido] = useState<string>("");
  const [selectedPda, setSelectedPda] = useState<string>("");
  const [selectedPdas, setSelectedPdas] = useState<string[]>([]);

  // Persistent localStorage helper functions for NEM Curriculum
  const NEM_STORAGE_KEY = "nem_curriculum_cache_v2";

  // Dynamic Gemini Curriculum State & Cache (initialized with localStorage)
  const [isFetchingCurriculum, setIsFetchingCurriculum] = useState<boolean>(false);
  const [dynamicContenidosMap, setDynamicContenidosMap] = useState<Record<string, Array<{ id: string; contenido: string; pdas: string[] }>>>(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const saved = window.localStorage.getItem("nem_curriculum_cache_v2");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === "object") {
            return parsed;
          }
        }
      }
    } catch (e) {
      console.warn("Could not read NEM curriculum from localStorage:", e);
    }
    return {};
  });
  const [curriculumSource, setCurriculumSource] = useState<"ai" | "cache" | "static">("static");

  // Custom curriculum toggling
  const [isCustomCurriculum, setIsCustomCurriculum] = useState<boolean>(false);
  const [customContenido, setCustomContenido] = useState<string>("");
  const [customPda, setCustomPda] = useState<string>("");

  // Other NEM details
  const [selectedMetodologia, setSelectedMetodologia] = useState<string>("Aprendizaje Basado en Proyectos Comunitarios (ABPC)");
  const [situacionProblema, setSituacionProblema] = useState<string>(
  );

  // Dynamic calculated cascading options based on current state
  const currentFaseObj = useMemo(() => {
    return getFaseByNivelGrado(nivel, grado);
  }, [nivel, grado]);

  const availableGrados = useMemo(() => {
    return getGradosPorNivel(nivel);
  }, [nivel]);

  const availableCampos = useMemo(() => {
    return getCamposFormativos(nivel, grado);
  }, [nivel, grado]);

  const availableDisciplinas = useMemo(() => {
    return getAsignaturasPorCampo(nivel, grado, selectedCampo);
  }, [nivel, grado, selectedCampo]);

  // Combined Contenidos: Use dynamic AI/localStorage contents if present; fallback to static nemData
  const cacheKey = useMemo(() => {
    return `${nivel}__${grado}__${selectedCampo}__${selectedDisciplina}`;
  }, [nivel, grado, selectedCampo, selectedDisciplina]);

  const availableContenidos = useMemo(() => {
    const officialList = getContenidosPorFiltro(nivel, grado, selectedCampo, selectedDisciplina);
    if (officialList && officialList.length > 0) {
      return officialList;
    }
    const cached = dynamicContenidosMap[cacheKey];
    if (cached && Array.isArray(cached) && cached.length > 0) {
      return cached;
    }
    return [];
  }, [dynamicContenidosMap, cacheKey, nivel, grado, selectedCampo, selectedDisciplina]);

  // Combined PDAs for the currently selected Contenido
  const availablePdas = useMemo(() => {
    const officialPdas = getPdasPorContenido(nivel, grado, selectedCampo, selectedDisciplina, selectedContenido);
    if (officialPdas && officialPdas.length > 0) {
      return officialPdas;
    }
    const cached = dynamicContenidosMap[cacheKey];
    if (cached && Array.isArray(cached) && cached.length > 0) {
      const match = cached.find((item) => item.contenido === selectedContenido);
      if (match && Array.isArray(match.pdas) && match.pdas.length > 0) {
        return match.pdas;
      }
    }
    return [];
  }, [dynamicContenidosMap, cacheKey, nivel, grado, selectedCampo, selectedDisciplina, selectedContenido]);

  // Function to fetch official contents and PDAs: checks React state & localStorage first ($0 cost, 0 latency)
  const fetchCurriculumFromGemini = async (
    targetNivel: string,
    targetGrado: string,
    targetCampoId: string,
    targetDisciplinaId: string,
    forceRefresh: boolean = false
  ) => {
    const targetKey = `${targetNivel}__${targetGrado}__${targetCampoId}__${targetDisciplinaId}`;
    
    // 1. Check in React Memory State
    if (!forceRefresh && dynamicContenidosMap[targetKey] && dynamicContenidosMap[targetKey].length > 0) {
      setCurriculumSource("cache");
      return;
    }

    // 2. Check in Browser localStorage
    if (!forceRefresh && typeof window !== "undefined" && window.localStorage) {
      try {
        const raw = window.localStorage.getItem(NEM_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed[targetKey] && Array.isArray(parsed[targetKey]) && parsed[targetKey].length > 0) {
            const list = parsed[targetKey];
            setDynamicContenidosMap((prev) => ({
              ...prev,
              [targetKey]: list,
            }));
            setCurriculumSource("cache");

            // Auto-select valid first content & PDA if not matching
            setSelectedContenido((curr) => {
              const exists = list.some((item: any) => item.contenido === curr);
              if (exists) return curr;
              const firstCont = list[0]?.contenido || "";
              const firstPdas = list[0]?.pdas || [];
              if (firstPdas.length > 0) {
                setSelectedPda(firstPdas[0]);
              }
              return firstCont;
            });
            return;
          }
        }
      } catch (e) {
        console.warn("Error reading from localStorage cache:", e);
      }
    }

    // 3. Not in cache: Perform lightweight API call with PDF prompt caching
    const campoObj = availableCampos.find((c) => c.id === targetCampoId);
    const campoNombre = campoObj?.nombre || CAMPO_FORMATIVO_LABELS[targetCampoId] || targetCampoId;
    
    const asigObj = availableDisciplinas.find((a) => a.id === targetDisciplinaId);
    const disciplinaNombre = asigObj?.nombre || targetDisciplinaId || "General";

    try {
      setIsFetchingCurriculum(true);
      const res = await fetch("/api/fetch-nem-curriculum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nivel: targetNivel,
          grado: targetGrado,
          campoFormativo: campoNombre,
          disciplina: disciplinaNombre,
        }),
      });

      if (!res.ok) {
        throw new Error("Error en la respuesta del servidor.");
      }

      const data = await res.json();
      if (data.success && Array.isArray(data.contenidos) && data.contenidos.length > 0) {
        const fetchedList = data.contenidos.map((c: any, index: number) => ({
          id: c.id || `dyn-cont-${index}`,
          contenido: c.contenido,
          pdas: Array.isArray(c.pdas) ? c.pdas : [],
        }));

        // Update React State
        setDynamicContenidosMap((prev) => {
          const updated = {
            ...prev,
            [targetKey]: fetchedList,
          };
          // Persist to localStorage for future zero-cost zero-latency access
          try {
            if (typeof window !== "undefined" && window.localStorage) {
              window.localStorage.setItem(NEM_STORAGE_KEY, JSON.stringify(updated));
            }
          } catch (e) {
            console.warn("Could not save to localStorage:", e);
          }
          return updated;
        });

        setCurriculumSource("ai");

        // Automatically update the selected Contenido and PDA
        setSelectedContenido((curr) => {
          const exists = fetchedList.some((item: any) => item.contenido === curr);
          if (exists) return curr;
          const firstCont = fetchedList[0]?.contenido || "";
          const firstPdas = fetchedList[0]?.pdas || [];
          if (firstPdas.length > 0) {
            setSelectedPda(firstPdas[0]);
          }
          return firstCont;
        });
      }
    } catch (err) {
      console.warn("Could not fetch dynamic curriculum from Gemini, using static catalogue:", err);
    } finally {
      setIsFetchingCurriculum(false);
    }
  };

  // Trigger Gemini API dynamic query whenever Nivel, Grado, Campo or Disciplina changes
  useEffect(() => {
    if (isCustomCurriculum) return;
    const timer = setTimeout(() => {
      fetchCurriculumFromGemini(nivel, grado, selectedCampo, selectedDisciplina);
    }, 150);
    return () => clearTimeout(timer);
  }, [nivel, grado, selectedCampo, selectedDisciplina, isCustomCurriculum]);

  // CASCADING HANDLERS WITH AUTOMATIC DOWNSTREAM RESET
  const handleNivelChange = (newNivel: string) => {
    setNivel(newNivel);
    const newGrados = getGradosPorNivel(newNivel);
    const newGrado = newGrados[0] || "Primer Grado";
    setGrado(newGrado);

    if (newNivel === "Preescolar") {
      setDuracionSesion("45 minutos");
      setSelectedMetodologia("Aprendizaje Basado en el Juego");
    } else {
      setDuracionSesion("50 minutos");
      setSelectedMetodologia("Aprendizaje Basado en Proyectos Comunitarios (ABPC)");
    }

    const campos = getCamposFormativos(newNivel, newGrado);
    const firstCampo = campos[0]?.id || "lenguajes";
    setSelectedCampo(firstCampo);

    const asigs = getAsignaturasPorCampo(newNivel, newGrado, firstCampo);
    const firstAsig = asigs[0]?.id || "";
    setSelectedDisciplina(firstAsig);

    const conts = getContenidosPorFiltro(newNivel, newGrado, firstCampo, firstAsig);
    const firstCont = conts[0]?.contenido || "";
    setSelectedContenido(firstCont);

    const pdasForCont = getPdasPorContenido(newNivel, newGrado, firstCampo, firstAsig, firstCont);
    setSelectedPda(pdasForCont[0] || "");
    setSelectedPdas(pdasForCont.length > 0 ? [pdasForCont[0]] : []);
  };

  const handleGradoChange = (newGrado: string) => {
    setGrado(newGrado);

    // Recompute valid campo
    const campos = getCamposFormativos(nivel, newGrado);
    const isCampoValid = campos.some((c) => c.id === selectedCampo);
    const validCampo = isCampoValid ? selectedCampo : (campos[0]?.id || "lenguajes");
    if (!isCampoValid) setSelectedCampo(validCampo);

    // Recompute valid disciplina
    const asigs = getAsignaturasPorCampo(nivel, newGrado, validCampo);
    const isAsigValid = asigs.some((a) => a.id === selectedDisciplina);
    const validAsig = isAsigValid ? selectedDisciplina : (asigs[0]?.id || "");
    setSelectedDisciplina(validAsig);

    // Reset contenido & pda for new grade to guarantee consistency
    const conts = getContenidosPorFiltro(nivel, newGrado, validCampo, validAsig);
    const firstCont = conts[0]?.contenido || "";
    setSelectedContenido(firstCont);

    const pdasForCont = getPdasPorContenido(nivel, newGrado, validCampo, validAsig, firstCont);
    setSelectedPda(pdasForCont[0] || "");
    setSelectedPdas(pdasForCont.length > 0 ? [pdasForCont[0]] : []);
  };

  const handleCampoChange = (newCampo: string) => {
    setSelectedCampo(newCampo);

    // Automatic methodology recommendation
    if (nivel === "Preescolar") {
      setSelectedMetodologia("Aprendizaje Basado en el Juego");
    } else {
      if (newCampo === "lenguajes") {
        setSelectedMetodologia("Aprendizaje Basado en Proyectos Comunitarios (ABPC)");
      } else if (newCampo === "SABERES") {
        setSelectedMetodologia("Aprendizaje Basado en Indagación (STEAM)");
      } else if (newCampo === "ETICA" || newCampo === "ETICA NyS") {
        setSelectedMetodologia("Aprendizaje Basado en Problemas (ABP)");
      } else if (newCampo === "HUMANO" || newCampo === "HUMANO Y C") {
        setSelectedMetodologia("Aprendizaje Servicio (AS)");
      }
    }

    // Cascading reset downstream: disciplina -> contenido -> pda
    const asigs = getAsignaturasPorCampo(nivel, grado, newCampo);
    const firstAsig = asigs[0]?.id || "";
    setSelectedDisciplina(firstAsig);

    const conts = getContenidosPorFiltro(nivel, grado, newCampo, firstAsig);
    const firstCont = conts[0]?.contenido || "";
    setSelectedContenido(firstCont);

    const pdasForCont = getPdasPorContenido(nivel, grado, newCampo, firstAsig, firstCont);
    setSelectedPda(pdasForCont[0] || "");
    setSelectedPdas(pdasForCont.length > 0 ? [pdasForCont[0]] : []);
  };

  const handleDisciplinaChange = (newDisciplina: string) => {
    setSelectedDisciplina(newDisciplina);

    // Cascading reset downstream: contenido -> pda
    const conts = getContenidosPorFiltro(nivel, grado, selectedCampo, newDisciplina);
    const firstCont = conts[0]?.contenido || "";
    setSelectedContenido(firstCont);

    const pdasForCont = getPdasPorContenido(nivel, grado, selectedCampo, newDisciplina, firstCont);
    setSelectedPda(pdasForCont[0] || "");
    setSelectedPdas(pdasForCont.length > 0 ? [pdasForCont[0]] : []);
  };

  const handleContenidoChange = (newContenido: string) => {
    setSelectedContenido(newContenido);

    // Cascading reset downstream: pda
    const matchAi = dynamicContenidosMap[cacheKey]?.find((item) => item.contenido === newContenido);
    if (matchAi && matchAi.pdas.length > 0) {
      setSelectedPda(matchAi.pdas[0] || "");
      setSelectedPdas([matchAi.pdas[0]]);
    } else {
      const pdasForCont = getPdasPorContenido(nivel, grado, selectedCampo, selectedDisciplina, newContenido);
      setSelectedPda(pdasForCont[0] || "");
      setSelectedPdas(pdasForCont.length > 0 ? [pdasForCont[0]] : []);
    }
  };

  // Helper toggle for multi-PDA selection
  const handleTogglePda = (pdaText: string) => {
    setSelectedPdas((prev) => {
      let updated: string[];
      if (prev.includes(pdaText)) {
        updated = prev.filter((p) => p !== pdaText);
      } else {
        updated = [...prev, pdaText];
      }
      if (updated.length > 0) {
        setSelectedPda(updated[0]);
      } else {
        setSelectedPda("");
      }
      safeOnSelect(updated.join(" // "));
      return updated;
    });
  };

  const handleSelectAllPdas = () => {
    if (availablePdas.length > 0) {
      setSelectedPdas([...availablePdas]);
      setSelectedPda(availablePdas[0]);
      safeOnSelect(availablePdas.join(" // "));
    }
  };

  const handleClearPdas = () => {
    if (availablePdas.length > 0) {
      setSelectedPdas([availablePdas[0]]);
      setSelectedPda(availablePdas[0]);
      safeOnSelect(availablePdas[0]);
    }
  };

  // Helper toggle for BAP / Aptitudes Sobresalientes with full safety
  const handleToggleBap = (formattedValue: string) => {
    if (!formattedValue || typeof formattedValue !== "string") return;
    setSelectedBap((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      if (safePrev.includes(formattedValue)) {
        return safePrev.filter((val) => val !== formattedValue);
      } else {
        return [...safePrev, formattedValue];
      }
    });

    safeToggleOption(formattedValue);
  };

  const handleEjeChange = (ejeId: string) => {
    if (!ejeId || typeof ejeId !== "string") return;
    setSelectedEjes((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.includes(ejeId) ? safePrev.filter((id) => id !== ejeId) : [...safePrev, ejeId];
    });
  };

  // Load profile from localStorage if exists
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
      console.error("Error loading profile from localStorage:", e);
    }
  }, []);

  // Sync initialData if provided
  useEffect(() => {
    if (initialData) {
      if (initialData.nivel) setNivel(initialData.nivel);
      if (initialData.grado) setGrado(initialData.grado);
      if (initialData.situacionProblema) setSituacionProblema(initialData.situacionProblema);
      
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
        const normCampo = String(initialData.campoFormativo).toLowerCase();
        if (normCampo.includes("lenguaje")) {
          setSelectedCampo("lenguajes");
        } else if (normCampo.includes("saberes") || normCampo.includes("científico") || normCampo.includes("cientifico")) {
          setSelectedCampo("SABERES");
        } else if (normCampo.includes("ética") || normCampo.includes("etica") || normCampo.includes("naturaleza")) {
          setSelectedCampo("ETICA");
        } else if (normCampo.includes("humano") || normCampo.includes("comunitario")) {
          setSelectedCampo("HUMANO");
        }
      }
    }
  }, [initialData]);

  // Sync dates to duracionSemanas
  useEffect(() => {
    if (startDate && endDate) {
      try {
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
      } catch (e) {
        setDuracionSemanas("2 semanas");
      }
    }
  }, [startDate, endDate]);

  // Initialize first selection on mount
  useEffect(() => {
    if (!selectedContenido) {
      const conts = getContenidosPorFiltro(nivel, grado, selectedCampo, selectedDisciplina);
      if (conts.length > 0) {
        setSelectedContenido(conts[0].contenido);
        const pdasForCont = getPdasPorContenido(nivel, grado, selectedCampo, selectedDisciplina, conts[0].contenido);
        if (pdasForCont.length > 0) {
          setSelectedPda(pdasForCont[0]);
        }
      }
    }
  }, []);

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

    const foundCampo = availableCampos.find((c) => c.id === selectedCampo);
    const finalCampo = isCustomCurriculum
      ? (foundCampo?.nombre || CAMPO_FORMATIVO_LABELS[selectedCampo] || selectedCampo || "General")
      : (foundCampo?.nombre || CAMPO_FORMATIVO_LABELS[selectedCampo] || selectedCampo);

    const foundAsig = availableDisciplinas.find((a) => a.id === selectedDisciplina);
    const finalDisciplina = isCustomCurriculum
      ? (foundAsig?.nombre || selectedDisciplina || "General")
      : (foundAsig?.nombre || selectedDisciplina);

    const effectivePda = isCustomCurriculum
      ? customPda
      : selectedPdas.length > 0
      ? selectedPdas.join(" \n• ")
      : selectedPda;

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
      pda: effectivePda,
      ejesArticuladores: selectedEjes,
      metodologia: selectedMetodologia,
      situacionProblema,
      bapSelected: selectedBap,
    };

    safeOnChange(formDataPayload);
    safeSetFormData(formDataPayload);
    safeOnSubmit(formDataPayload);
  };

  return (
    <form id="planeacion-form" onSubmit={handleFormSubmit} className="space-y-8 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
      {/* Sección 1: Datos Generales */}
      <div>
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-slate-100">
          <School className="w-5 h-5 text-mex-maroon" />
          <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
            {Array.isArray(escuelasList) && escuelasList.length > 1 ? "Datos de la Institución y del Proyecto" : "Datos de la Planeación"}
          </h2>
        </div>

        {Array.isArray(escuelasList) && escuelasList.length > 1 && (
          <div className="bg-slate-50 p-4 border border-slate-200/60 rounded-xl space-y-2.5 mb-5">
            <label className="block text-slate-500 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
              <School className="w-4 h-4 text-mex-maroon animate-pulse" />
              <span>Selecciona la Escuela / Plantel para esta Planeación:</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {escuelasList.map((esc, index) => {
                const isSelected = escuelaName === esc?.escuelaName && cct === esc?.cct;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={(e) => {
                      if (e && typeof e.preventDefault === "function") e.preventDefault();
                      if (esc?.escuelaName) setEscuelaName(esc.escuelaName);
                      if (esc?.cct) setCct(esc.cct);
                    }}
                    className={`px-3.5 py-2 rounded-lg border text-xs font-bold transition flex items-center gap-2 ${
                      isSelected
                        ? "bg-mex-maroon text-white border-mex-maroon shadow-sm"
                        : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-extrabold">{esc?.escuelaName}</div>
                      <div className={`text-[9px] font-medium mt-0.5 ${isSelected ? "text-mex-gold" : "text-slate-400"}`}>
                        CCT: {esc?.cct}
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
                handleNivelChange(e.target.value);
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

      {/* Sección 2: Selección Curricular Dinámica NEM (Cascading Dropdowns) */}
      <div>
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-mex-maroon" />
            <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
              Elementos Curriculares
            </h2>
            {currentFaseObj && (
              <span className="ml-2 px-2.5 py-0.5 bg-mex-maroon/10 text-mex-maroon text-[11px] font-extrabold rounded-full border border-mex-maroon/20">
                {currentFaseObj.fase} • {currentFaseObj.nivel}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={(e) => {
              if (e && typeof e.preventDefault === "function") e.preventDefault();
              setIsCustomCurriculum(!isCustomCurriculum);
            }}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 rounded border border-slate-200 font-extrabold text-[10px] uppercase tracking-wider transition cursor-pointer"
          >
            {isCustomCurriculum ? "✓ Usar Base de Datos Curricular" : "✍ Escribir Personalizado"}
          </button>
        </div>

        {isCustomCurriculum ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Grado Escolar</label>
                <select
                  value={grado}
                  onChange={(e) => handleGradoChange(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-sm font-medium transition outline-none"
                >
                  {availableGrados.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Campo Formativo</label>
                <select
                  value={selectedCampo}
                  onChange={(e) => handleCampoChange(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-sm font-medium transition outline-none"
                >
                  {availableCampos.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
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
          <div className="space-y-5">
            {/* Cascading selectors: Grado -> Campo Formativo -> Asignatura */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">
                  1. Grado Escolar
                </label>
                <select
                  value={grado}
                  onChange={(e) => handleGradoChange(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-sm font-semibold transition outline-none"
                >
                  {availableGrados.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">
                  2. Campo Formativo
                </label>
                <select
                  value={selectedCampo}
                  onChange={(e) => handleCampoChange(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-sm font-semibold transition outline-none"
                >
                  {availableCampos.map((campo) => (
                    <option key={campo.id} value={campo.id}>
                      {campo.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">
                  3. Disciplina / Asignatura
                </label>
                <select
                  value={selectedDisciplina}
                  onChange={(e) => handleDisciplinaChange(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-sm font-semibold transition outline-none"
                >
                  {availableDisciplinas.map((asig) => (
                    <option key={asig.id} value={asig.id}>
                      {asig.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cascading Contenido Selector */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-slate-500 font-bold text-[10px] uppercase">
                  4. Contenido Curricular Sintético (NEM)
                </label>
              </div>

              {Array.isArray(availableContenidos) && availableContenidos.length > 0 ? (
                <select
                  value={selectedContenido}
                  onChange={(e) => handleContenidoChange(e.target.value)}
                  disabled={isFetchingCurriculum && availableContenidos.length === 0}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-sm font-medium transition outline-none leading-relaxed"
                >
                  {availableContenidos.map((cont, i) => (
                    <option key={cont.id || i} value={cont.contenido}>
                      {cont.contenido}
                    </option>
                  ))}
                </select>
              ) : isFetchingCurriculum ? (
                <div className="p-3.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-medium border border-slate-200 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-mex-maroon" />
                  <span>Consultando el Catálogo Oficial de la Nueva Escuela Mexicana con la API de Gemini...</span>
                </div>
              ) : (
                <div className="p-3.5 bg-amber-50 text-amber-800 rounded-lg text-xs font-medium border border-amber-200 flex items-center gap-2">
                  <span>No se encontraron contenidos curriculares para la combinación seleccionada.</span>
                </div>
              )}
            </div>

            {/* Cascading PDA Selector */}
            {selectedContenido && (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="block text-slate-500 font-bold text-[10px] uppercase">
                    5. Proceso de Desarrollo de Aprendizaje (PDA) Vinculado
                  </label>
                  <div className="flex items-center gap-2">
                    {availablePdas.length > 1 && (
                      <div className="flex items-center gap-2 text-xs">
                        <button
                          type="button"
                          onClick={handleSelectAllPdas}
                          className="text-[10px] text-mex-maroon hover:underline font-semibold"
                        >
                          Seleccionar todos
                        </button>
                        <span className="text-slate-300">|</span>
                        <button
                          type="button"
                          onClick={handleClearPdas}
                          className="text-[10px] text-slate-500 hover:underline"
                        >
                          Reiniciar
                        </button>
                      </div>
                    )}
                    {availablePdas.length > 1 && (
                      <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-semibold">
                        {selectedPdas.length} seleccionado(s)
                      </span>
                    )}
                  </div>
                </div>

                {Array.isArray(availablePdas) && availablePdas.length > 0 ? (
                  <div className="space-y-2.5">
                    {availablePdas.map((pdaOption, index) => {
                      const isChecked = selectedPdas.includes(pdaOption);

                      return (
                        <label
                          key={index}
                          onClick={(e) => {
                            if ((e.target as HTMLElement).tagName !== "INPUT") {
                              e.preventDefault();
                              handleTogglePda(pdaOption);
                            }
                          }}
                          className={`flex items-start gap-3 p-3.5 rounded-lg border text-sm font-normal cursor-pointer transition select-none ${
                            isChecked
                              ? "bg-mex-maroon/5 border-l-4 border-l-mex-maroon border-y-mex-maroon/20 border-r-mex-maroon/20 text-slate-900 ring-1 ring-mex-maroon/10 shadow-sm"
                              : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/70"
                          }`}
                        >
                          <div className="mt-0.5 flex-shrink-0">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                if (e && typeof e.stopPropagation === "function") e.stopPropagation();
                                handleTogglePda(pdaOption);
                              }}
                              className="h-4 w-4 rounded border-slate-300 text-mex-maroon focus:ring-mex-maroon cursor-pointer"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700">
                                #{index + 1}
                              </span>
                              {availablePdas.length === 1 && (
                                <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                                  PDA Oficial Asignado
                                </span>
                              )}
                            </div>
                            <span className="text-xs leading-relaxed font-semibold text-slate-800 block">
                              {pdaOption}
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-3.5 bg-amber-50 text-amber-800 rounded-lg text-xs font-medium border border-amber-200">
                    No se encontraron PDAs específicos para este grado en el contenido seleccionado.
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
          Selecciona las condiciones o barreras que enfrentan los alumnos de tu grupo para que la IA diseñe los ajustes razonables pertinentes y aplique el enfoque del Diseño Universal para el Aprendizaje (DUA).
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
        {props.onBackToHub && (
          <button
            type="button"
            onClick={(e) => {
              if (e && typeof e.preventDefault === "function") e.preventDefault();
              safeOnBackToHub();
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded border border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-extrabold text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 cursor-pointer"
          >
            Volver al Panel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading || (!isCustomCurriculum && (!selectedContenido || (selectedPdas.length === 0 && !selectedPda))) || (isCustomCurriculum && (!customContenido.trim() || !customPda.trim()))}
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
