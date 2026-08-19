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
import { Sparkles, BookOpen, User, School, Calendar, RefreshCw, Layers, FileText, Accessibility, Users, Coins } from "lucide-react";

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
  { id: "Taller Crítico", label: "Taller Crítico", desc: "Planteamiento de acciones didácticas para el codiseño y la acción transformadora." },
  { id: "Rincones de Aprendizaje", label: "Rincones de Aprendizaje", desc: "Promueve la autonomía y exploración lúdica en espacios designados." },
  { id: "Centros de Interés", label: "Centros de Interés", desc: "Profundizar en el conocimiento a partir de la realidad y la curiosidad infantil." },
  { id: "Unidad Didáctica", label: "Unidad Didáctica", desc: "Investigación colectiva sobre un aspecto significativo de la realidad." },
  { id: "Aprendizaje Basado en el Juego", label: "Aprendizaje Basado en el Juego", desc: "Experiencia lúdica para el desarrollo integral y reflexión colectiva." },
  { id: "Proyecto", label: "Proyecto", desc: "Trabajo colaborativo a partir de un punto de partida, planeación, ejecución y reflexión." },
];

const SUGGESTED_PROBLEMS = [
  "Consumo excesivo de comida chatarra y bebidas azucaradas en la cooperativa escolar.",
  "Falta de cultura ambiental: acumulación de basura de plásticos de un solo uso en las áreas comunes.",
  "Violencia verbal y acoso escolar (bullying) durante los recreos y en redes sociales.",
  "Desinterés por la lectura y dificultades severas en la comprensión de textos informativos.",
  "Desperdicio y falta de cuidado del agua potable en los sanitarios de la institución.",
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

  const NEM_STORAGE_KEY = "nem_curriculum_cache_v2";

  const [isFetchingCurriculum, setIsFetchingCurriculum] = useState<boolean>(false);
  const [dynamicContenidosMap, setDynamicContenidosMap] = useState<Record<string, Array<{ id: string; contenido: string; pdas: string[] }>>>(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const saved = window.localStorage.getItem(NEM_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === "object") return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not read NEM curriculum from localStorage:", e);
    }
    return {};
  });

  const [isCustomCurriculum, setIsCustomCurriculum] = useState<boolean>(false);
  const [customContenido, setCustomContenido] = useState<string>("");
  const [customPda, setCustomPda] = useState<string>("");

  const [selectedMetodologia, setSelectedMetodologia] = useState<string>("Aprendizaje Basado en Proyectos Comunitarios (ABPC)");
  const [situacionProblema, setSituacionProblema] = useState<string>(
    "Dificultad de los estudiantes para valorar y difundir las manifestaciones culturales locales en un segundo idioma."
  );

  const currentFaseObj = useMemo(() => getFaseByNivelGrado(nivel, grado), [nivel, grado]);
  const availableGrados = useMemo(() => getGradosPorNivel(nivel), [nivel]);
  const availableCampos = useMemo(() => getCamposFormativos(nivel, grado), [nivel, grado]);
  const availableDisciplinas = useMemo(() => getAsignaturasPorCampo(nivel, grado, selectedCampo), [nivel, grado, selectedCampo]);

  const cacheKey = useMemo(() => `${nivel}__${grado}__${selectedCampo}__${selectedDisciplina}`, [nivel, grado, selectedCampo, selectedDisciplina]);

  const availableContenidos = useMemo(() => {
    const officialList = getContenidosPorFiltro(nivel, grado, selectedCampo, selectedDisciplina);
    if (officialList && officialList.length > 0) return officialList;
    const cached = dynamicContenidosMap[cacheKey];
    if (cached && Array.isArray(cached) && cached.length > 0) return cached;
    return [];
  }, [dynamicContenidosMap, cacheKey, nivel, grado, selectedCampo, selectedDisciplina]);

  const availablePdas = useMemo(() => {
    const officialPdas = getPdasPorContenido(nivel, grado, selectedCampo, selectedDisciplina, selectedContenido);
    if (officialPdas && officialPdas.length > 0) return officialPdas;
    const cached = dynamicContenidosMap[cacheKey];
    if (cached && Array.isArray(cached) && cached.length > 0) {
      const match = cached.find((item) => item.contenido === selectedContenido);
      if (match && Array.isArray(match.pdas) && match.pdas.length > 0) return match.pdas;
    }
    return [];
  }, [dynamicContenidosMap, cacheKey, nivel, grado, selectedCampo, selectedDisciplina, selectedContenido]);

  const fetchCurriculumFromGemini = async (
    targetNivel: string,
    targetGrado: string,
    targetCampoId: string,
    targetDisciplinaId: string,
    forceRefresh: boolean = false
  ) => {
    const targetKey = `${targetNivel}__${targetGrado}__${targetCampoId}__${targetDisciplinaId}`;
    
    if (!forceRefresh && dynamicContenidosMap[targetKey] && dynamicContenidosMap[targetKey].length > 0) {
      return;
    }

    if (!forceRefresh && typeof window !== "undefined" && window.localStorage) {
      try {
        const raw = window.localStorage.getItem(NEM_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed[targetKey] && Array.isArray(parsed[targetKey]) && parsed[targetKey].length > 0) {
            const list = parsed[targetKey];
            setDynamicContenidosMap((prev) => ({ ...prev, [targetKey]: list }));
            return;
          }
        }
      } catch (e) {
        console.warn("Error reading from localStorage cache:", e);
      }
    }

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

      if (!res.ok) throw new Error("Error en la respuesta del servidor.");

      const data = await res.json();
      if (data.success && Array.isArray(data.contenidos) && data.contenidos.length > 0) {
        const fetchedList = data.contenidos.map((c: any, index: number) => ({
          id: c.id || `dyn-cont-${index}`,
          contenido: c.contenido,
          pdas: Array.isArray(c.pdas) ? c.pdas : [],
        }));

        setDynamicContenidosMap((prev) => {
          const updated = { ...prev, [targetKey]: fetchedList };
          try {
            if (typeof window !== "undefined" && window.localStorage) {
              window.localStorage.setItem(NEM_STORAGE_KEY, JSON.stringify(updated));
            }
          } catch (e) {
            console.warn("Could not save to localStorage:", e);
          }
          return updated;
        });
      }
    } catch (err) {
      console.warn("Could not fetch dynamic curriculum from Gemini:", err);
    } finally {
      setIsFetchingCurriculum(false);
    }
  };

  useEffect(() => {
    if (isCustomCurriculum) return;
    const timer = setTimeout(() => {
      fetchCurriculumFromGemini(nivel, grado, selectedCampo, selectedDisciplina);
    }, 150);
    return () => clearTimeout(timer);
  }, [nivel, grado, selectedCampo, selectedDisciplina, isCustomCurriculum]);

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
    const campos = getCamposFormativos(nivel, newGrado);
    const isCampoValid = campos.some((c) => c.id === selectedCampo);
    const validCampo = isCampoValid ? selectedCampo : (campos[0]?.id || "lenguajes");
    if (!isCampoValid) setSelectedCampo(validCampo);

    const asigs = getAsignaturasPorCampo(nivel, newGrado, validCampo);
    const isAsigValid = asigs.some((a) => a.id === selectedDisciplina);
    const validAsig = isAsigValid ? selectedDisciplina : (asigs[0]?.id || "");
    setSelectedDisciplina(validAsig);

    const conts = getContenidosPorFiltro(nivel, newGrado, validCampo, validAsig);
    const firstCont = conts[0]?.contenido || "";
    setSelectedContenido(firstCont);

    const pdasForCont = getPdasPorContenido(nivel, newGrado, validCampo, validAsig, firstCont);
    setSelectedPda(pdasForCont[0] || "");
    setSelectedPdas(pdasForCont.length > 0 ? [pdasForCont[0]] : []);
  };

  const handleCampoChange = (newCampo: string) => {
    setSelectedCampo(newCampo);
    if (nivel === "Preescolar") {
      setSelectedMetodologia("Aprendizaje Basado en el Juego");
    } else {
      if (newCampo === "lenguajes") setSelectedMetodologia("Aprendizaje Basado en Proyectos Comunitarios (ABPC)");
      else if (newCampo === "SABERES") setSelectedMetodologia("Aprendizaje Basado en Indagación (STEAM)");
      else if (newCampo === "ETICA" || newCampo === "ETICA NyS") setSelectedMetodologia("Aprendizaje Basado en Problemas (ABP)");
      else if (newCampo === "HUMANO" || newCampo === "HUMANO Y C") setSelectedMetodologia("Aprendizaje Servicio (AS)");
    }

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
    const conts = getContenidosPorFiltro(nivel, grado, selectedCampo, newDisciplina);
    const firstCont = conts[0]?.contenido || "";
    setSelectedContenido(firstCont);

    const pdasForCont = getPdasPorContenido(nivel, grado, selectedCampo, newDisciplina, firstCont);
    setSelectedPda(pdasForCont[0] || "");
    setSelectedPdas(pdasForCont.length > 0 ? [pdasForCont[0]] : []);
  };

  const handleContenidoChange = (newContenido: string) => {
    setSelectedContenido(newContenido);
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

  const handleTogglePda = (pdaText: string) => {
    setSelectedPdas((prev) => {
      const updated = prev.includes(pdaText) ? prev.filter((p) => p !== pdaText) : [...prev, pdaText];
      setSelectedPda(updated[0] || "");
      safeOnSelect(updated.join(" // "));
      return updated;
    });
  };

  const handleToggleBap = (formattedValue: string) => {
    if (!formattedValue || typeof formattedValue !== "string") return;
    setSelectedBap((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.includes(formattedValue) ? safePrev.filter((val) => val !== formattedValue) : [...safePrev, formattedValue];
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

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("nem_secundaria_profile");
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile?.docenteName) setDocenteName(profile.docenteName);
        if (profile?.escuelaName) setEscuelaName(profile.escuelaName);
        if (profile?.cct) setCct(profile.cct);
      }
    } catch (e) {
      console.error("Error loading profile:", e);
    }
  }, []);

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

        if (weeks <= 1) setDuracionSemanas(`${diffDays} días (del ${startStr} al ${endStr})`);
        else setDuracionSemanas(`${weeks} semanas (del ${startStr} al ${endStr})`);
      } catch (e) {
        setDuracionSemanas("2 semanas");
      }
    }
  }, [startDate, endDate]);

  const handleFormSubmit = (e: React.FormEvent) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    setFormError(null);
    
    if (isCustomCurriculum) {
      if (!customContenido.trim() || !customPda.trim()) {
        setFormError("Por favor escribe un Contenido y un PDA para tu planeación.");
        return;
      }
    } else {
      if (!selectedContenido || !selectedPda) {
        setFormError("Por favor selecciona un contenido y un PDA válidos.");
        return;
      }
    }

    const foundCampo = availableCampos.find((c) => c.id === selectedCampo);
    const finalCampo = foundCampo?.nombre || CAMPO_FORMATIVO_LABELS[selectedCampo] || selectedCampo;

    const foundAsig = availableDisciplinas.find((a) => a.id === selectedDisciplina);
    const finalDisciplina = foundAsig?.nombre || selectedDisciplina;

    const effectivePda = isCustomCurriculum ? customPda : selectedPdas.length > 0 ? selectedPdas.join(" \n• ") : selectedPda;

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
      {/* Datos de la Planeación */}
      <div>
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-slate-100">
          <School className="w-5 h-5 text-mex-maroon" />
          <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Datos de la Planeación</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Nombre del Docente</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={docenteName}
                readOnly
                disabled
                className="w-full pl-9 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded text-slate-500 text-sm font-medium cursor-not-allowed outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Nivel Educativo</label>
            <select
              value={nivel}
              onChange={(e) => handleNivelChange(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon rounded text-slate-800 text-sm font-medium outline-none"
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
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800 text-sm font-medium text-center outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Fecha de Inicio</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800 text-xs font-semibold outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Fecha de Fin</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800 text-xs font-semibold outline-none"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Elementos Curriculares NEM */}
      <div>
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-mex-maroon" />
            <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Elementos Curriculares</h2>
          </div>
          <button
            type="button"
            onClick={() => setIsCustomCurriculum(!isCustomCurriculum)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-extrabold uppercase tracking-wider"
          >
            {isCustomCurriculum ? "✓ Usar Catálogo Oficial" : "✍ Escribir Personalizado"}
          </button>
        </div>

        {isCustomCurriculum ? (
          <div className="space-y-4">
            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Contenido Sintético / Analítico</label>
              <textarea
                rows={2}
                value={customContenido}
                onChange={(e) => setCustomContenido(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800 text-xs font-semibold outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Proceso de Desarrollo de Aprendizaje (PDA)</label>
              <textarea
                rows={3}
                value={customPda}
                onChange={(e) => setCustomPda(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800 text-xs font-semibold outline-none"
                required
              />
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">1. Grado Escolar</label>
                <select
                  value={grado}
                  onChange={(e) => handleGradoChange(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800 text-sm font-semibold outline-none"
                >
                  {availableGrados.map((g) => (<option key={g} value={g}>{g}</option>))}
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">2. Campo Formativo</label>
                <select
                  value={selectedCampo}
                  onChange={(e) => handleCampoChange(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800 text-sm font-semibold outline-none"
                >
                  {availableCampos.map((campo) => (<option key={campo.id} value={campo.id}>{campo.nombre}</option>))}
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">3. Disciplina / Asignatura</label>
                <select
                  value={selectedDisciplina}
                  onChange={(e) => handleDisciplinaChange(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800 text-sm font-semibold outline-none"
                >
                  {availableDisciplinas.map((asig) => (<option key={asig.id} value={asig.id}>{asig.nombre}</option>))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">4. Contenido Curricular Sintético (NEM)</label>
              {availableContenidos.length > 0 ? (
                <select
                  value={selectedContenido}
                  onChange={(e) => handleContenidoChange(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800 text-sm font-medium outline-none"
                >
                  {availableContenidos.map((cont, i) => (
                    <option key={cont.id || i} value={cont.contenido}>{cont.contenido}</option>
                  ))}
                </select>
              ) : (
                <div className="p-3.5 bg-slate-50 text-slate-600 rounded text-xs font-medium border border-slate-200 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-mex-maroon" />
                  <span>Consultando el Catálogo Oficial NEM...</span>
                </div>
              )}
            </div>

            {selectedContenido && (
              <div>
                <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">5. PDA Vinculado</label>
                <div className="space-y-2">
                  {availablePdas.map((pdaOption, index) => {
                    const isChecked = selectedPdas.includes(pdaOption);
                    return (
                      <label
                        key={index}
                        onClick={() => handleTogglePda(pdaOption)}
                        className={`flex items-start gap-3 p-3 rounded border text-xs cursor-pointer ${
                          isChecked ? "bg-mex-maroon/5 border-mex-maroon text-slate-900" : "bg-slate-50 border-slate-200 text-slate-700"
                        }`}
                      >
                        <input type="checkbox" checked={isChecked} readOnly className="mt-0.5 h-4 w-4 rounded text-mex-maroon" />
                        <span className="font-medium">{pdaOption}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Situación Problema */}
      <div>
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-slate-100">
          <FileText className="w-5 h-5 text-mex-maroon" />
          <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Situación-Problema a Abordar</h2>
        </div>
        <textarea
          rows={3}
          value={situacionProblema}
          onChange={(e) => setSituacionProblema(e.target.value)}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded text-slate-800 text-sm leading-relaxed outline-none"
          required
        />
      </div>

      {/* Botón Generar */}
      {formError && <div className="p-3 bg-red-50 text-red-700 rounded text-xs font-bold">{formError}</div>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-slate-900 hover:bg-black text-white font-extrabold text-sm uppercase tracking-wider rounded flex items-center justify-center gap-3 transition shadow-md"
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
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded text-mex-gold flex items-center gap-1">
              <Coins className="w-3 h-3" /> 10 créditos
            </span>
          </>
        )}
      </button>
    </form>
  );
}