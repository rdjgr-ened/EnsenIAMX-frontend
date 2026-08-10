import React, { useState } from "react";
import { 
  FileSpreadsheet, Plus, Minus, Trash2, Printer, Check, 
  RotateCcw, Table, Users, Award, HelpCircle, ArrowLeft, 
  Calculator, CheckCircle2, AlertCircle, RefreshCw, Lock,
  FileCheck, ShieldCheck, CheckSquare, Layers, BookOpen
} from "lucide-react";

interface FormatoEvaluacionViewProps {
  onBack: () => void;
  escuelaName: string;
  cct: string;
  docenteName: string;
}

export interface EvaluationElement {
  id: string;
  name: string;
  maxPoints: number; // 0 to 50
  weightPercentage: number; // 0 to 100
  category?: string;
}

export interface StudentRecord {
  id: string;
  name: string;
  scores: { [elementId: string]: number };
}

// Catalog of 20 standardized SEP Evaluation Elements & Instruments
const CATALOG_ELEMENTS: { id: string; name: string; defaultMax: number; defaultWeight: number; category: string }[] = [
  // Técnicas de Observación
  { id: "guia_observacion", name: "Guía de observación", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Observación" },
  { id: "registro_anecdotico", name: "Registro anecdótico", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Observación" },
  { id: "diario_clase", name: "Diario de clase", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Observación" },
  { id: "diario_trabajo", name: "Diario de trabajo", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Observación" },
  { id: "escala_actitudes", name: "Escala de actitudes", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Observación" },

  // Técnicas de Desempeño
  { id: "cuaderno_alumnos", name: "Cuaderno de los alumnos", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Desempeño" },
  { id: "preguntas_procedimiento", name: "Preguntas sobre el procedimiento", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Desempeño" },
  { id: "organizadores_graficos", name: "Organizadores gráficos", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Desempeño" },
  { id: "lineas_tiempo", name: "Líneas de tiempo", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Desempeño" },
  { id: "maquetas_modelos", name: "Maquetas y modelos", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Desempeño" },

  // Técnicas de Análisis del Desempeño
  { id: "rubrica_analitica", name: "Rúbrica analítica", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Análisis del Desempeño" },
  { id: "rubrica_holistica", name: "Rúbrica holística", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Análisis del Desempeño" },
  { id: "lista_cotejo", name: "Lista de cotejo", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Análisis del Desempeño" },
  { id: "portafolio_evidencias", name: "Portafolio de evidencias", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Análisis del Desempeño" },
  { id: "proyectos_didacticos", name: "Proyectos didácticos", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Análisis del Desempeño" },

  // Técnicas de Interrogatorio
  { id: "prueba_opcion_multiple", name: "Prueba escrita de opción múltiple", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Interrogatorio" },
  { id: "prueba_respuesta_abierta", name: "Prueba de respuesta abierta", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Interrogatorio" },
  { id: "ensayo", name: "Ensayo", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Interrogatorio" },
  { id: "exposicion_oral", name: "Exposición oral", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Interrogatorio" },
  { id: "debate", name: "Debate", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Interrogatorio" },
];

const CAMPOS_FORMATIVOS = [
  {
    id: "lenguajes",
    name: "Lenguajes",
    disciplinas: ["Español", "Inglés (Lengua Extranjera)", "Artes", "Lengua Materna / Indígena"],
  },
  {
    id: "saberes",
    name: "Saberes y Pensamiento Científico",
    disciplinas: ["Matemáticas", "Biología", "Física", "Química", "Conocimiento del Medio / Ciencias Naturales"],
  },
  {
    id: "etica",
    name: "Ética, Naturaleza y Sociedades",
    disciplinas: ["Geografía", "Historia", "Formación Cívica y Ética", "La Entidad donde Vivo"],
  },
  {
    id: "humano",
    name: "De lo Humano y lo Comunitario",
    disciplinas: ["Educación Física", "Tecnología", "Tutoría y Educación Socioemocional"],
  },
];

const ALL_GRADES = [
  "1º de Preescolar",
  "2º de Preescolar",
  "3º de Preescolar",
  "1º de Primaria",
  "2º de Primaria",
  "3º de Primaria",
  "4º de Primaria",
  "5º de Primaria",
  "6º de Primaria",
  "1º de Secundaria",
  "2º de Secundaria",
  "3º de Secundaria",
];

export default function FormatoEvaluacionView({
  onBack,
  escuelaName: initialEscuela,
  cct: initialCct,
  docenteName: initialDocente,
}: FormatoEvaluacionViewProps) {
  // Datos Generales (Precargados y bloqueados para docente, escuela y CCT)
  const escuelaName = initialEscuela || "Escuela Educación Básica";
  const cct = initialCct || "CCT Sin Registrar";
  const docenteName = initialDocente || "Docente Titular";

  const [grado, setGrado] = useState("1º de Secundaria");
  const [grupo, setGrupo] = useState("A");
  const [periodo, setPeriodo] = useState("1er Trimestre");

  // Campo Formativo y Disciplina
  const [selectedCampoId, setSelectedCampoId] = useState("lenguajes");
  const currentCampo = CAMPOS_FORMATIVOS.find((c) => c.id === selectedCampoId) || CAMPOS_FORMATIVOS[0];
  const [disciplina, setDisciplina] = useState(currentCampo.disciplinas[0]);

  // Elements of evaluation (starts empty as requested)
  const [elements, setElements] = useState<EvaluationElement[]>([]);
  const [showAddElementsModal, setShowAddElementsModal] = useState(false);
  const [selectedCatalogIds, setSelectedCatalogIds] = useState<string[]>([]);
  const [customElementName, setCustomElementName] = useState("");

  // Students & Scores (starts empty as requested)
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [newStudentName, setNewStudentName] = useState("");
  const [bulkText, setBulkText] = useState("");
  const [showBulkModal, setShowBulkModal] = useState(false);

  // Print modal / Preview
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Check if current grade is Secundaria
  const isSecundaria = grado.includes("Secundaria");
  const firmaAutoridad = isSecundaria ? "Coordinación Académica" : "Dirección Escolar";
  const firmaDocente = isSecundaria ? "Docente de la Asignatura" : "Docente de Grupo";

  // Active weight calculations
  const totalWeight = elements.reduce((acc, el) => acc + el.weightPercentage, 0);

  // Handle max points change (0 to 50)
  const updateMaxPoints = (id: string, delta: number) => {
    setElements((prev) =>
      prev.map((el) => {
        if (el.id === id) {
          const newVal = Math.min(50, Math.max(0, el.maxPoints + delta));
          return { ...el, maxPoints: newVal };
        }
        return el;
      })
    );
  };

  const setDirectMaxPoints = (id: string, val: number) => {
    const clamped = Math.min(50, Math.max(0, isNaN(val) ? 0 : val));
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, maxPoints: clamped } : el))
    );
  };

  // Handle weight percentage change (0 to 100%)
  const updateWeight = (id: string, delta: number) => {
    setElements((prev) =>
      prev.map((el) => {
        if (el.id === id) {
          const newVal = Math.min(100, Math.max(0, el.weightPercentage + delta));
          return { ...el, weightPercentage: newVal };
        }
        return el;
      })
    );
  };

  const setDirectWeight = (id: string, val: number) => {
    const clamped = Math.min(100, Math.max(0, isNaN(val) ? 0 : val));
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, weightPercentage: clamped } : el))
    );
  };

  // Auto balance weights to 100%
  const autoBalanceWeights = () => {
    if (elements.length === 0) return;
    const currentSum = totalWeight;
    if (currentSum === 0) {
      const equalShare = Math.floor(100 / elements.length);
      const remainder = 100 - equalShare * elements.length;
      setElements((prev) =>
        prev.map((el, idx) => ({
          ...el,
          weightPercentage: equalShare + (idx === 0 ? remainder : 0),
        }))
      );
      return;
    }
    setElements((prev) => {
      let sum = 0;
      const updated = prev.map((el) => {
        const newWeight = Math.round((el.weightPercentage / currentSum) * 100);
        sum += newWeight;
        return { ...el, weightPercentage: newWeight };
      });
      if (sum !== 100 && updated.length > 0) {
        updated[0].weightPercentage += 100 - sum;
      }
      return updated;
    });
  };

  // Open modal for elements catalog
  const handleOpenAddElementsModal = () => {
    // pre-select elements that are already added
    setSelectedCatalogIds(elements.map((e) => e.id));
    setShowAddElementsModal(true);
  };

  const toggleCatalogSelection = (id: string) => {
    setSelectedCatalogIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Confirm selection from catalog modal
  const handleConfirmAddElements = () => {
    const newElements: EvaluationElement[] = [];

    // Add selected items from catalog
    CATALOG_ELEMENTS.forEach((catItem) => {
      if (selectedCatalogIds.includes(catItem.id)) {
        const existing = elements.find((e) => e.id === catItem.id);
        if (existing) {
          newElements.push(existing);
        } else {
          newElements.push({
            id: catItem.id,
            name: catItem.name,
            maxPoints: catItem.defaultMax,
            weightPercentage: catItem.defaultWeight,
            category: catItem.category,
          });
        }
      }
    });

    // Add custom elements if previously existing and still in selection
    elements.forEach((e) => {
      if (e.id.startsWith("custom_") && selectedCatalogIds.includes(e.id)) {
        newElements.push(e);
      }
    });

    setElements(newElements);
    setShowAddElementsModal(false);
  };

  // Add custom element in modal
  const handleAddCustomElementInModal = () => {
    if (!customElementName.trim()) return;
    const customId = "custom_" + Date.now();
    const newEl: EvaluationElement = {
      id: customId,
      name: customElementName.trim(),
      maxPoints: 10,
      weightPercentage: 10,
      category: "Personalizado",
    };
    setElements((prev) => [...prev, newEl]);
    setSelectedCatalogIds((prev) => [...prev, customId]);
    setCustomElementName("");
  };

  // Remove element
  const handleRemoveElement = (id: string) => {
    setElements((prev) => prev.filter((e) => e.id !== id));
  };

  // Student score change
  const handleScoreChange = (studentId: string, elementId: string, value: string) => {
    const element = elements.find((e) => e.id === elementId);
    if (!element) return;
    const numVal = parseFloat(value);
    const validScore = isNaN(numVal) ? 0 : Math.min(element.maxPoints, Math.max(0, numVal));

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          return {
            ...s,
            scores: {
              ...s.scores,
              [elementId]: validScore,
            },
          };
        }
        return s;
      })
    );
  };

  // Add student individual
  const handleAddStudent = () => {
    if (!newStudentName.trim()) return;
    const newStud: StudentRecord = {
      id: "std_" + Date.now(),
      name: newStudentName.trim(),
      scores: {},
    };
    elements.forEach((el) => {
      newStud.scores[el.id] = 0;
    });
    setStudents((prev) => [...prev, newStud]);
    setNewStudentName("");
  };

  // Add bulk students
  const handleAddBulkStudents = () => {
    if (!bulkText.trim()) return;
    const lines = bulkText
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const newStuds: StudentRecord[] = lines.map((name, i) => {
      const scoresObj: { [key: string]: number } = {};
      elements.forEach((el) => {
        scoresObj[el.id] = 0;
      });
      return {
        id: "bulk_" + Date.now() + "_" + i,
        name,
        scores: scoresObj,
      };
    });

    setStudents((prev) => [...prev, ...newStuds]);
    setBulkText("");
    setShowBulkModal(false);
  };

  // Delete student
  const handleDeleteStudent = (studentId: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
  };

  // Calculate final grade for a student (0 - 10 scale SEP)
  const calculateStudentFinal = (student: StudentRecord) => {
    if (elements.length === 0 || totalWeight === 0) return 0;

    let weightedSum = 0;
    elements.forEach((el) => {
      const score = student.scores[el.id] || 0;
      const max = el.maxPoints > 0 ? el.maxPoints : 1;
      const elementFraction = score / max;
      const elementWeightedScore = elementFraction * el.weightPercentage;
      weightedSum += elementWeightedScore;
    });

    const normalizedPercent = (weightedSum / totalWeight) * 100;
    const finalGrade = (normalizedPercent / 100) * 10;
    return Math.min(10, Math.max(0, finalGrade));
  };

  // Group statistics
  const calculateGroupStats = () => {
    if (students.length === 0) return { average: 0, passingCount: 0, failingCount: 0, passingPercentage: 0 };
    const finals = students.map((s) => calculateStudentFinal(s));
    const sum = finals.reduce((acc, v) => acc + v, 0);
    const average = sum / students.length;
    const passingCount = finals.filter((g) => g >= 6.0).length;
    const failingCount = students.length - passingCount;
    const passingPercentage = (passingCount / students.length) * 100;

    return {
      average: Math.round(average * 10) / 10,
      passingCount,
      failingCount,
      passingPercentage: Math.round(passingPercentage),
    };
  };

  const groupStats = calculateGroupStats();

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Clean Header without external download/copy buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Menú</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                Evaluación Formativa y Trimestral
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1 flex items-center gap-2">
              <FileSpreadsheet className="w-6 h-6 text-emerald-600 inline" />
              Formato de Evaluación y Registro de Calificaciones
            </h2>
          </div>
        </div>
      </div>

      {/* PASO 1: Datos Generales de la Escuela y Grupo */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-mex-maroon text-white flex items-center justify-center text-xs font-black">1</span>
            Datos Generales de la Escuela, Docente y Asignatura
          </h3>
          <span className="text-[11px] text-slate-400 font-semibold">Configuración del Registro</span>
        </div>

        {/* Read-Only: Escuela, CCT, Docente */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" />
              Escuela
            </label>
            <div className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-800 shadow-2xs">
              {escuelaName}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" />
              Clave C.C.T.
            </label>
            <div className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-800 shadow-2xs">
              {cct}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" />
              Docente Titular
            </label>
            <div className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-800 shadow-2xs">
              {docenteName}
            </div>
          </div>
        </div>

        {/* Campo Formativo (Pestañas) y Disciplina */}
        <div className="space-y-3 pt-2">
          <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
            Campo Formativo (Selecciona uno)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {CAMPOS_FORMATIVOS.map((cf) => {
              const isSelected = cf.id === selectedCampoId;
              return (
                <button
                  key={cf.id}
                  type="button"
                  onClick={() => {
                    setSelectedCampoId(cf.id);
                    setDisciplina(cf.disciplinas[0]);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all text-xs font-extrabold flex items-center justify-between ${
                    isSelected
                      ? "bg-mex-maroon text-white border-mex-maroon shadow-md"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span>{cf.name}</span>
                  {isSelected && <Check className="w-4 h-4 text-mex-gold shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Disciplina, Grado (Preescolar a Secundaria), Grupo y Periodo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
              Disciplina / Asignatura
            </label>
            <select
              value={disciplina}
              onChange={(e) => setDisciplina(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-mex-maroon"
            >
              {currentCampo.disciplinas.map((disc) => (
                <option key={disc} value={disc}>
                  {disc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
              Grado Escolar (Preescolar, Primaria y Secundaria)
            </label>
            <select
              value={grado}
              onChange={(e) => setGrado(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-mex-maroon font-bold"
            >
              {ALL_GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
              Grupo
            </label>
            <input
              type="text"
              value={grupo}
              onChange={(e) => setGrupo(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-mex-maroon text-center uppercase"
            />
          </div>

          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
              Periodo de Evaluación
            </label>
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-mex-maroon"
            >
              <option value="1er Trimestre">1er Trimestre</option>
              <option value="2do Trimestre">2do Trimestre</option>
              <option value="3er Trimestre">3er Trimestre</option>
            </select>
          </div>
        </div>
      </div>

      {/* PASO 2: Elementos o Instrumentos de Evaluación */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-mex-maroon text-white flex items-center justify-center text-xs font-black">2</span>
              Elementos o Instrumentos de Evaluación
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Agrega los elementos o instrumentos que utilizarás en el periodo, asigna la <strong>calificación máxima (0 a 50)</strong> con los botones <strong>+</strong> y <strong>-</strong>, y ajusta su porcentaje (%) en la calificación final.
            </p>
          </div>

          <button
            onClick={handleOpenAddElementsModal}
            className="px-4 py-2.5 bg-mex-maroon hover:bg-mex-maroon/90 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4 text-mex-gold" />
            <span>Agregar Elementos o Instrumentos</span>
          </button>
        </div>

        {/* Status Bar of Total Weight % */}
        {elements.length > 0 && (
          <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            totalWeight === 100 
              ? "bg-emerald-50/80 border-emerald-200 text-emerald-900" 
              : "bg-amber-50/80 border-amber-200 text-amber-900"
          }`}>
            <div className="flex items-center gap-3">
              {totalWeight === 100 ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm">
                    Ponderación Total de Elementos: {totalWeight}%
                  </span>
                  {totalWeight === 100 ? (
                    <span className="bg-emerald-200 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                      ¡Suma 100% Exacto!
                    </span>
                  ) : (
                    <span className="bg-amber-200 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                      {totalWeight < 100 ? `Faltan ${100 - totalWeight}%` : `Exceso de ${totalWeight - 100}%`}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  La suma total de porcentajes debe ser igual a 100% para la calificación final (0-10).
                </p>
              </div>
            </div>

            {totalWeight !== 100 && (
              <button
                onClick={autoBalanceWeights}
                className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-colors shrink-0 shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Ajustar Proporcional a 100%</span>
              </button>
            )}
          </div>
        )}

        {/* List of active elements */}
        {elements.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-300 rounded-2xl space-y-3">
            <CheckSquare className="w-10 h-10 text-slate-300 mx-auto" />
            <div className="space-y-1">
              <p className="text-sm font-extrabold text-slate-700">No hay elementos de evaluación agregados aún</p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Haz clic en el botón <strong>"Agregar Elementos o Instrumentos"</strong> ubicado en la parte superior para seleccionar los que requieras.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {elements.map((el) => (
              <div
                key={el.id}
                className="p-4 rounded-xl border border-mex-maroon/30 bg-white shadow-xs flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-black text-slate-900 block">{el.name}</span>
                    {el.category && (
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200 inline-block mt-1">
                        {el.category}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemoveElement(el.id)}
                    className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded transition-colors"
                    title="Quitar este elemento"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-100">
                  {/* Calificación Máxima (0-50) using + and - buttons */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-extrabold text-slate-600 uppercase">
                      Puntaje Máximo (0-50):
                    </span>
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                      <button
                        type="button"
                        onClick={() => updateMaxPoints(el.id, -1)}
                        className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-800 font-extrabold flex items-center justify-center border border-slate-300 transition-colors shadow-xs"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={el.maxPoints}
                        onChange={(e) => setDirectMaxPoints(el.id, parseInt(e.target.value))}
                        className="w-11 text-center bg-transparent text-xs font-black text-slate-900 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button
                        type="button"
                        onClick={() => updateMaxPoints(el.id, 1)}
                        className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-800 font-extrabold flex items-center justify-center border border-slate-300 transition-colors shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Porcentaje % en Calificación Final */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-extrabold text-slate-600 uppercase">
                      Porcentaje en Final (%):
                    </span>
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                      <button
                        type="button"
                        onClick={() => updateWeight(el.id, -5)}
                        className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-800 font-extrabold flex items-center justify-center border border-slate-300 transition-colors shadow-xs text-xs"
                      >
                        -5
                      </button>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={el.weightPercentage}
                        onChange={(e) => setDirectWeight(el.id, parseInt(e.target.value))}
                        className="w-12 text-center bg-transparent text-xs font-black text-mex-maroon focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button
                        type="button"
                        onClick={() => updateWeight(el.id, 5)}
                        className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-800 font-extrabold flex items-center justify-center border border-slate-300 transition-colors shadow-xs text-xs"
                      >
                        +5
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PASO 3: Registro de Calificaciones por Alumno */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-mex-maroon text-white flex items-center justify-center text-xs font-black">3</span>
              Registro de Alumnos y Calificaciones
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Ingresa los puntajes obtenidos por cada alumno. La calificación final trimestral se calcula automáticamente en escala 0-10.
            </p>
          </div>

          <button
            onClick={() => setShowBulkModal(true)}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold rounded-xl flex items-center gap-1.5 transition-colors border border-slate-300 shrink-0"
          >
            <Users className="w-4 h-4 text-mex-maroon" />
            <span>Pegar Lista Completa de Alumnos</span>
          </button>
        </div>

        {/* Input para agregar alumno individual */}
        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <input
            type="text"
            placeholder="Escribe el nombre del alumno (ej. Pérez Juárez, Carlos)..."
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddStudent()}
            className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:border-mex-maroon"
          />
          <button
            onClick={handleAddStudent}
            className="px-4 py-2 bg-mex-maroon hover:bg-mex-maroon/90 text-white text-xs font-extrabold rounded-lg flex items-center gap-1.5 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4 text-mex-gold" />
            <span>Agregar Alumno</span>
          </button>
        </div>

        {/* Group Stats Bar */}
        {students.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900 text-white p-4 rounded-xl">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">
                Total Alumnos
              </span>
              <span className="text-lg font-black text-white">{students.length}</span>
            </div>

            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">
                Promedio del Grupo
              </span>
              <span className="text-lg font-black text-mex-gold">{groupStats.average} / 10.0</span>
            </div>

            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">
                Aprobados (≥ 6.0)
              </span>
              <span className="text-lg font-black text-emerald-400">
                {groupStats.passingCount} ({groupStats.passingPercentage}%)
              </span>
            </div>

            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">
                En Riesgo (&lt; 6.0)
              </span>
              <span className="text-lg font-black text-red-400">
                {groupStats.failingCount}
              </span>
            </div>
          </div>
        )}

        {/* Table of Students & Scores */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="p-3 font-black text-[10px] uppercase tracking-wider text-center border-r border-slate-700 w-12">
                  N°
                </th>
                <th className="p-3 font-black text-[10px] uppercase tracking-wider border-r border-slate-700 min-w-[200px]">
                  Nombre del Alumno
                </th>

                {elements.map((el) => (
                  <th
                    key={el.id}
                    className="p-3 font-black text-[10px] uppercase tracking-wider text-center border-r border-slate-700 min-w-[130px] bg-slate-800"
                  >
                    <div className="text-white font-black truncate" title={el.name}>
                      {el.name}
                    </div>
                    <div className="text-[9px] text-mex-gold mt-0.5 font-bold">
                      Max: {el.maxPoints} pts | {el.weightPercentage}%
                    </div>
                  </th>
                ))}

                <th className="p-3 font-black text-[10px] uppercase tracking-wider text-center bg-slate-900 text-mex-gold border-r border-slate-700 min-w-[110px]">
                  Calificación Final
                </th>
                <th className="p-3 font-black text-[10px] uppercase tracking-wider text-center bg-slate-900 text-white min-w-[100px]">
                  Estatus
                </th>
                <th className="p-3 font-black text-[10px] uppercase tracking-wider text-center bg-slate-900 w-10">
                  
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 bg-white">
              {students.length === 0 ? (
                <tr>
                  <td
                    colSpan={elements.length + 4}
                    className="p-8 text-center text-slate-400 font-medium"
                  >
                    Lista de alumnos vacía. Escribe los nombres arriba o presiona <strong>"Pegar Lista Completa de Alumnos"</strong>.
                  </td>
                </tr>
              ) : (
                students.map((student, idx) => {
                  const finalScore = calculateStudentFinal(student);
                  const isPassing = finalScore >= 6.0;
                  const isHonors = finalScore >= 9.0;

                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-50 transition-colors text-slate-800"
                    >
                      <td className="p-2 text-center font-extrabold text-slate-500 border-r border-slate-100">
                        {idx + 1}
                      </td>

                      <td className="p-2 font-bold text-slate-900 border-r border-slate-100">
                        {student.name}
                      </td>

                      {elements.map((el) => {
                        const score = student.scores[el.id] !== undefined ? student.scores[el.id] : 0;
                        return (
                          <td
                            key={el.id}
                            className="p-2 text-center border-r border-slate-100 bg-slate-50/50"
                          >
                            <input
                              type="number"
                              min="0"
                              max={el.maxPoints}
                              step="0.5"
                              value={score}
                              onChange={(e) => handleScoreChange(student.id, el.id, e.target.value)}
                              className="w-16 px-2 py-1 text-center bg-white border border-slate-200 rounded-lg text-xs font-black text-slate-900 focus:outline-none focus:border-mex-maroon focus:ring-1 focus:ring-mex-maroon"
                            />
                          </td>
                        );
                      })}

                      <td className="p-2 text-center font-black border-r border-slate-100 bg-slate-100/80">
                        <span
                          className={`text-sm ${
                            isHonors
                              ? "text-emerald-700"
                              : isPassing
                              ? "text-slate-900"
                              : "text-red-600"
                          }`}
                        >
                          {finalScore.toFixed(1)}
                        </span>
                      </td>

                      <td className="p-2 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                            isHonors
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : isPassing
                              ? "bg-blue-100 text-blue-800 border border-blue-200"
                              : "bg-red-100 text-red-800 border border-red-300"
                          }`}
                        >
                          {isHonors ? "Excelente" : isPassing ? "Aprobado" : "En Riesgo"}
                        </span>
                      </td>

                      <td className="p-2 text-center">
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded transition-colors"
                          title="Eliminar Alumno"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* BOTÓN DE IMPRIMIR / GENERAR FORMATO AUTOMÁTICO */}
      <div className="pt-2 flex flex-col items-center justify-center space-y-3">
        <button
          onClick={() => setShowPrintModal(true)}
          className="w-full sm:w-auto px-8 py-4 bg-mex-maroon hover:bg-mex-maroon/90 text-white rounded-2xl text-sm font-black flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Printer className="w-5 h-5 text-mex-gold" />
          <span>Generar e Imprimir Formato Terminado</span>
        </button>
        <p className="text-[11px] text-slate-400 font-medium text-center">
          Abre la vista previa imprimible lista para firma de {firmaAutoridad} ({isSecundaria ? "Secundaria" : "Preescolar / Primaria"}).
        </p>
      </div>

      {/* MODAL POP-UP: Seleccionar Elementos o Instrumentos de Evaluación */}
      {showAddElementsModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl space-y-5 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-mex-maroon" />
                  <span>Seleccionar Elementos o Instrumentos de Evaluación</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Marca todos los elementos que deseas incluir en tu formato de evaluación:
                </p>
              </div>
              <button
                onClick={() => setShowAddElementsModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* List of catalog elements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CATALOG_ELEMENTS.map((item) => {
                const isSelected = selectedCatalogIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCatalogSelection(item.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                      isSelected
                        ? "bg-mex-maroon/5 border-mex-maroon shadow-xs"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}} // handled by parent div click
                      className="mt-0.5 w-4 h-4 rounded text-mex-maroon focus:ring-mex-maroon border-slate-300"
                    />
                    <div>
                      <span className="text-xs font-extrabold text-slate-800 block leading-tight">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">
                        {item.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom element addition inside pop-up */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <label className="block text-[11px] font-extrabold uppercase text-slate-600">
                ¿Deseas agregar un elemento no listado?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ej. Registro Anecdótico, Bitácora de Campo..."
                  value={customElementName}
                  onChange={(e) => setCustomElementName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddCustomElementInModal()}
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-mex-maroon"
                />
                <button
                  type="button"
                  onClick={handleAddCustomElementInModal}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-extrabold rounded-xl shrink-0"
                >
                  + Añadir
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowAddElementsModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-extrabold rounded-xl"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmAddElements}
                className="px-5 py-2 bg-mex-maroon hover:bg-mex-maroon/90 text-white text-xs font-black rounded-xl shadow-sm"
              >
                Confirmar y Agregar ({selectedCatalogIds.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL POP-UP: Bulk Student Import */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-mex-maroon" />
                <span>Pegar Lista Completa de Alumnos</span>
              </h3>
              <button
                onClick={() => setShowBulkModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Pega la lista de alumnos de tu grupo (un nombre por renglón) copiada desde Excel o tu lista oficial:
            </p>

            <textarea
              rows={8}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={`Álvarez Gómez, Ana María\nBenítez Cruz, Carlos\nCastillo Morales, Diana\n...`}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:border-mex-maroon"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowBulkModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-extrabold rounded-xl"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddBulkStudents}
                className="px-4 py-2 bg-mex-maroon hover:bg-mex-maroon/90 text-white text-xs font-extrabold rounded-xl"
              >
                Cargar Lista
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL POP-UP: Print Preview / Formato Terminado */}
      {showPrintModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-8 shadow-2xl space-y-6 border border-slate-200 my-8">
            <div className="flex items-center justify-between border-b pb-4 print:hidden">
              <div className="flex items-center gap-2">
                <FileCheck className="w-6 h-6 text-mex-maroon" />
                <h3 className="font-black text-lg text-slate-900">
                  Formato de Evaluación y Registro de Calificaciones - Listo para Imprimir
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-mex-maroon hover:bg-mex-maroon/90 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm"
                >
                  <Printer className="w-4 h-4 text-mex-gold" />
                  <span>Imprimir / Guardar PDF</span>
                </button>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-extrabold"
                >
                  Cerrar
                </button>
              </div>
            </div>

            {/* Printable Document Body */}
            <div className="space-y-6 text-slate-900 p-4 border border-slate-200 rounded-xl">
              {/* Document Header */}
              <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
                <h2 className="text-base font-black uppercase tracking-wider">{escuelaName}</h2>
                <h3 className="text-xs font-extrabold text-slate-600 uppercase">
                  FORMATO DE EVALUACIÓN Y REGISTRO DE CALIFICACIONES - {periodo.toUpperCase()}
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-bold text-slate-700 pt-1">
                  <span>CCT: <strong>{cct}</strong></span>
                  <span>Docente: <strong>{docenteName}</strong></span>
                  <span>Grado y Grupo: <strong>{grado} {grupo}</strong></span>
                  <span>Campo: <strong>{currentCampo.name}</strong></span>
                  <span>Disciplina: <strong>{disciplina}</strong></span>
                </div>
              </div>

              {/* Elements Summary Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                  1. Elementos o Instrumentos de Evaluación Ponderados
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                  {elements.map((el) => (
                    <div key={el.id} className="p-2 border border-slate-300 rounded bg-slate-50">
                      <span className="font-bold block">{el.name}</span>
                      <span className="text-[10px] text-slate-600 block">
                        Puntaje Máx: {el.maxPoints} pts | Ponderación: {el.weightPercentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Scores Matrix */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                  2. Registro de Calificaciones por Alumno
                </h4>
                <table className="w-full text-[11px] border-collapse border border-slate-400">
                  <thead>
                    <tr className="bg-slate-100 text-slate-900">
                      <th className="border border-slate-400 p-1.5 text-center w-8 font-black">N°</th>
                      <th className="border border-slate-400 p-1.5 text-left font-black">Nombre del Alumno</th>
                      {elements.map((el) => (
                        <th key={el.id} className="border border-slate-400 p-1.5 text-center font-black">
                          {el.name}
                        </th>
                      ))}
                      <th className="border border-slate-400 p-1.5 text-center font-black bg-slate-200">
                        Final (0-10)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((st, i) => (
                      <tr key={st.id} className="border-b border-slate-300">
                        <td className="border border-slate-400 p-1.5 text-center font-bold">{i + 1}</td>
                        <td className="border border-slate-400 p-1.5 font-bold">{st.name}</td>
                        {elements.map((el) => (
                          <td key={el.id} className="border border-slate-400 p-1.5 text-center">
                            {st.scores[el.id] !== undefined ? st.scores[el.id] : 0}
                          </td>
                        ))}
                        <td className="border border-slate-400 p-1.5 text-center font-black bg-slate-50">
                          {calculateStudentFinal(st).toFixed(1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-2 gap-12 pt-12">
                <div className="text-center border-t border-slate-900 pt-2">
                  <span className="text-xs font-bold block">{docenteName}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-600 block">{firmaDocente}</span>
                </div>
                <div className="text-center border-t border-slate-900 pt-2">
                  <span className="text-xs font-bold block">Firma y Sello</span>
                  <span className="text-[10px] uppercase font-bold text-slate-600 block">{firmaAutoridad}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
