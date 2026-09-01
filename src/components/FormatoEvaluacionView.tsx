import React, { useState, useEffect, useMemo } from "react";
import { 
  FileSpreadsheet, Plus, Minus, Trash2, Printer, Check, 
  RotateCcw, Table, Users, Award, HelpCircle, ArrowLeft, 
  Calculator, CheckCircle2, AlertCircle, RefreshCw, Lock,
  FileCheck, ShieldCheck, CheckSquare, Layers, BookOpen, Gem, Crown, Save, Loader2
} from "lucide-react";
import AccionesDocumento from "./AccionesDocumento";
import { UserSubscription, PaywallReason } from "../types";
import { 
  getFormatoEvaluacion,
  saveFormatoEvaluacion,
  isSupabaseConfigured
} from "../utils/supabaseClient";

interface FormatoEvaluacionViewProps {
  onBack: () => void;
  escuelaName: string;
  cct: string;
  docenteName: string;
  subscription?: UserSubscription;
  onTriggerPaywall?: (reason: PaywallReason) => void;
}

export interface EvaluationElement {
  id: string;
  name: string;
  maxPoints: number; 
  weightPercentage: number; 
  category?: string;
}

export interface StudentRecord {
  id: string;
  name: string;
  scores: { [elementId: string]: number };
}

const CATALOG_ELEMENTS: { id: string; name: string; defaultMax: number; defaultWeight: number; category: string }[] = [
  { id: "guia_observacion", name: "Guía de observación", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Observación" },
  { id: "registro_anecdotico", name: "Registro anecdótico", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Observación" },
  { id: "diario_clase", name: "Diario de clase", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Observación" },
  { id: "cuaderno_alumnos", name: "Cuaderno de los alumnos", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Desempeño" },
  { id: "organizadores_graficos", name: "Organizadores gráficos", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Desempeño" },
  { id: "rubrica_analitica", name: "Rúbrica analítica", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Análisis del Desempeño" },
  { id: "lista_cotejo", name: "Lista de cotejo", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Análisis del Desempeño" },
  { id: "proyectos_didacticos", name: "Proyectos didácticos", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Análisis del Desempeño" },
  { id: "prueba_opcion_multiple", name: "Prueba escrita", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Interrogatorio" },
  { id: "ensayo", name: "Ensayo", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Interrogatorio" },
  { id: "exposicion_oral", name: "Exposición oral", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Interrogatorio" },
  { id: "debate", name: "Debate", defaultMax: 10, defaultWeight: 0, category: "Técnicas de Interrogatorio" },
];

export default function FormatoEvaluacionView({
  onBack,
  escuelaName: initialEscuela,
  cct: initialCct,
  docenteName: initialDocente,
  subscription,
  onTriggerPaywall,
}: FormatoEvaluacionViewProps) {
  const userPlan = subscription?.plan || "gratuito";
  const isPlatino = userPlan === "platino";
  const safeTriggerPaywall = onTriggerPaywall || (() => {});

  const escuelaName = initialEscuela || "Escuela Educación Básica";
  const cct = initialCct || "CCT Sin Registrar";
  const docenteName = initialDocente || "Docente Titular";

  // Carga de grupos registrados en la app
  const [grupos, setGrupos] = useState<any[]>(() => {
    const saved = localStorage.getItem("nem_grupos_organizador");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [periodo, setPeriodo] = useState("1er Trimestre");
  const selectedGroup = useMemo(() => grupos.find(g => g.id === selectedGroupId) || null, [grupos, selectedGroupId]);

  const [elements, setElements] = useState<EvaluationElement[]>([]);
  const [showAddElementsModal, setShowAddElementsModal] = useState(false);
  const [selectedCatalogIds, setSelectedCatalogIds] = useState<string[]>([]);
  const [customElementName, setCustomElementName] = useState("");

  const [students, setStudents] = useState<StudentRecord[]>([]);
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const isSecundaria = selectedGroup?.grado?.toLowerCase().includes("secundaria") || false;
  const firmaAutoridad = isSecundaria ? "Coordinación Académica" : "Dirección Escolar";
  const firmaDocente = isSecundaria ? "Docente de la Asignatura" : "Docente de Grupo";

  // Efecto para cargar datos desde Supabase al cambiar de grupo o trimestre
  useEffect(() => {
    if (!selectedGroupId || !isSupabaseConfigured) {
      if (selectedGroup) {
        setStudents(selectedGroup.estudiantes.map((st: any) => ({ id: st.id, name: st.nombre, scores: {} })));
        setElements([]);
      } else {
        setStudents([]);
        setElements([]);
      }
      return;
    }

    const userId = JSON.parse(localStorage.getItem("nem_secundaria_profile") || "{}")?.id;
    if (!userId) return;

    getFormatoEvaluacion(userId, selectedGroupId, periodo).then(data => {
      if (data && data.length > 0) {
         const record = data[0].contenido_json;
         setElements(record.elements || []);
         
         const groupStuds = grupos.find(g => g.id === selectedGroupId)?.estudiantes || [];
         const mergedStuds = groupStuds.map((st: any) => {
           const dbStud = (record.students || []).find((s: any) => s.id === st.id);
           return {
             id: st.id,
             name: st.nombre,
             scores: dbStud ? dbStud.scores : {}
           };
         });
         setStudents(mergedStuds);
      } else {
         setElements([]);
         const groupStuds = grupos.find(g => g.id === selectedGroupId)?.estudiantes || [];
         setStudents(groupStuds.map((st: any) => ({ id: st.id, name: st.nombre, scores: {} })));
      }
    }).catch(err => console.warn(err));
  }, [selectedGroupId, periodo, grupos]);

  // Guardado en la nube
  const handleSaveToCloud = async () => {
    if (!selectedGroupId || !isSupabaseConfigured) return;
    const userId = JSON.parse(localStorage.getItem("nem_secundaria_profile") || "{}")?.id;
    if (!userId) return;

    setIsSaving(true);
    setErrorMsg(null);
    try {
      const recordId = `feval_${selectedGroupId}_${periodo.replace(/\s+/g, '')}`;
      await saveFormatoEvaluacion({
        id: recordId,
        user_id: userId,
        grupo_id: selectedGroupId,
        periodo: periodo,
        contenido_json: { elements, students, grado: selectedGroup?.grado, grupo: selectedGroup?.grupo, disciplina: selectedGroup?.disciplina }
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setErrorMsg("Error al guardar calificaciones en la nube.");
    } finally {
      setIsSaving(false);
    }
  };

  const totalWeight = elements.reduce((acc, el) => acc + el.weightPercentage, 0);

  const updateMaxPoints = (id: string, delta: number) => {
    setElements((prev) => prev.map((el) => el.id === id ? { ...el, maxPoints: Math.min(50, Math.max(0, el.maxPoints + delta)) } : el));
  };

  const setDirectMaxPoints = (id: string, val: number) => {
    setElements((prev) => prev.map((el) => el.id === id ? { ...el, maxPoints: Math.min(50, Math.max(0, isNaN(val) ? 0 : val)) } : el));
  };

  const updateWeight = (id: string, delta: number) => {
    setElements((prev) => prev.map((el) => el.id === id ? { ...el, weightPercentage: Math.min(100, Math.max(0, el.weightPercentage + delta)) } : el));
  };

  const setDirectWeight = (id: string, val: number) => {
    setElements((prev) => prev.map((el) => el.id === id ? { ...el, weightPercentage: Math.min(100, Math.max(0, isNaN(val) ? 0 : val)) } : el));
  };

  const autoBalanceWeights = () => {
    if (elements.length === 0) return;
    const currentSum = totalWeight;
    if (currentSum === 0) {
      const equalShare = Math.floor(100 / elements.length);
      const remainder = 100 - equalShare * elements.length;
      setElements((prev) => prev.map((el, idx) => ({ ...el, weightPercentage: equalShare + (idx === 0 ? remainder : 0) })));
      return;
    }
    setElements((prev) => {
      let sum = 0;
      const updated = prev.map((el) => {
        const newWeight = Math.round((el.weightPercentage / currentSum) * 100);
        sum += newWeight;
        return { ...el, weightPercentage: newWeight };
      });
      if (sum !== 100 && updated.length > 0) updated[0].weightPercentage += 100 - sum;
      return updated;
    });
  };

  const handleOpenAddElementsModal = () => {
    setSelectedCatalogIds(elements.map((e) => e.id));
    setShowAddElementsModal(true);
  };

  const toggleCatalogSelection = (id: string) => {
    setSelectedCatalogIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  };

  const handleConfirmAddElements = () => {
    const newElements: EvaluationElement[] = [];
    CATALOG_ELEMENTS.forEach((catItem) => {
      if (selectedCatalogIds.includes(catItem.id)) {
        const existing = elements.find((e) => e.id === catItem.id);
        if (existing) newElements.push(existing);
        else newElements.push({ id: catItem.id, name: catItem.name, maxPoints: catItem.defaultMax, weightPercentage: catItem.defaultWeight, category: catItem.category });
      }
    });
    elements.forEach((e) => {
      if (e.id.startsWith("custom_") && selectedCatalogIds.includes(e.id)) newElements.push(e);
    });
    setElements(newElements);
    setShowAddElementsModal(false);
  };

  const handleAddCustomElementInModal = () => {
    if (!customElementName.trim()) return;
    const customId = "custom_" + Date.now();
    const newEl: EvaluationElement = { id: customId, name: customElementName.trim(), maxPoints: 10, weightPercentage: 10, category: "Personalizado" };
    setElements((prev) => [...prev, newEl]);
    setSelectedCatalogIds((prev) => [...prev, customId]);
    setCustomElementName("");
  };

  const handleRemoveElement = (id: string) => setElements((prev) => prev.filter((e) => e.id !== id));

  const handleScoreChange = (studentId: string, elementId: string, value: string) => {
    const element = elements.find((e) => e.id === elementId);
    if (!element) return;
    const numVal = parseFloat(value);
    const validScore = isNaN(numVal) ? 0 : Math.min(element.maxPoints, Math.max(0, numVal));

    setStudents((prev) => prev.map((s) => s.id === studentId ? { ...s, scores: { ...s.scores, [elementId]: validScore } } : s));
  };

  const calculateStudentFinal = (student: StudentRecord) => {
    if (elements.length === 0 || totalWeight === 0) return 0;
    let weightedSum = 0;
    elements.forEach((el) => {
      const score = student.scores[el.id] || 0;
      const max = el.maxPoints > 0 ? el.maxPoints : 1;
      weightedSum += (score / max) * el.weightPercentage;
    });
    const finalGrade = ((weightedSum / totalWeight) * 100) / 10;
    return Math.min(10, Math.max(0, finalGrade));
  };

  const calculateGroupStats = () => {
    if (students.length === 0) return { average: 0, passingCount: 0, failingCount: 0, passingPercentage: 0 };
    const finals = students.map((s) => calculateStudentFinal(s));
    const sum = finals.reduce((acc, v) => acc + v, 0);
    const passingCount = finals.filter((g) => g >= 6.0).length;
    return {
      average: Math.round((sum / students.length) * 10) / 10,
      passingCount,
      failingCount: students.length - passingCount,
      passingPercentage: Math.round((passingCount / students.length) * 100),
    };
  };

  const groupStats = calculateGroupStats();

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold">
            <ArrowLeft className="w-4 h-4" /><span>Volver al Menú</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">Evaluación Formativa y Trimestral</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1 flex items-center gap-2">
              <FileSpreadsheet className="w-6 h-6 text-emerald-600 inline" />
              Formato de Evaluación y Calificaciones
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSaveToCloud}
              disabled={!selectedGroupId || isSaving}
              className={`px-4 py-2 font-extrabold text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-1.5 shadow-md ${
                saveSuccess ? "bg-emerald-600 text-white" : "bg-mex-maroon hover:bg-mex-maroon/90 text-white disabled:bg-slate-300"
              }`}
            >
              {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : saveSuccess ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
              <span>{isSaving ? "Guardando..." : saveSuccess ? "¡Guardado!" : "Guardar Calificaciones"}</span>
            </button>
        </div>
      </div>

      {errorMsg && (
         <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-bold flex items-center gap-2">
           <AlertCircle className="w-4 h-4"/> {errorMsg}
         </div>
      )}

      {/* PASO 1: Datos Generales y Grupo */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-mex-maroon text-white flex items-center justify-center text-xs font-black">1</span>
            Datos Generales y Selección de Grupo
          </h3>
          <span className="text-[11px] text-slate-400 font-semibold">Configuración del Registro</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" /> Escuela
            </label>
            <div className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-800">{escuelaName}</div>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" /> Clave C.C.T.
            </label>
            <div className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-800">{cct}</div>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" /> Docente Titular
            </label>
            <div className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-800">{docenteName}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">Selecciona tu Grupo</label>
            <select
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-mex-maroon"
            >
              <option value="">-- Elige un grupo registrado --</option>
              {grupos.map((g) => (
                <option key={g.id} value={g.id}>{g.grado} {g.grupo} - {g.disciplina || "General"}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">Periodo de Evaluación</label>
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

      {/* PASO 2: Elementos de Evaluación */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-mex-maroon text-white flex items-center justify-center text-xs font-black">2</span>
              Elementos o Instrumentos de Evaluación
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Agrega los instrumentos del periodo, asigna la <strong>calificación máxima</strong> y ajusta su porcentaje (%) en la calificación final.
            </p>
          </div>
          <button onClick={handleOpenAddElementsModal} className="px-4 py-2.5 bg-mex-maroon hover:bg-mex-maroon/90 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all shrink-0">
            <Plus className="w-4 h-4 text-mex-gold" /><span>Agregar Instrumentos</span>
          </button>
        </div>

        {elements.length > 0 && (
          <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${totalWeight === 100 ? "bg-emerald-50/80 border-emerald-200 text-emerald-900" : "bg-amber-50/80 border-amber-200 text-amber-900"}`}>
            <div className="flex items-center gap-3">
              {totalWeight === 100 ? <CheckCircle2 className="w-6 h-6 text-emerald-600" /> : <AlertCircle className="w-6 h-6 text-amber-600" />}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm">Ponderación Total: {totalWeight}%</span>
                  {totalWeight === 100 ? (
                    <span className="bg-emerald-200 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">¡Suma 100% Exacto!</span>
                  ) : (
                    <span className="bg-amber-200 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">{totalWeight < 100 ? `Faltan ${100 - totalWeight}%` : `Exceso de ${totalWeight - 100}%`}</span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-0.5">La suma total de porcentajes debe ser igual a 100%.</p>
              </div>
            </div>
            {totalWeight !== 100 && (
              <button onClick={autoBalanceWeights} className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-colors shadow-sm">
                <RefreshCw className="w-3.5 h-3.5" /><span>Ajustar a 100%</span>
              </button>
            )}
          </div>
        )}

        {elements.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-300 rounded-2xl">
            <CheckSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-extrabold text-slate-700">No hay elementos agregados aún</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {elements.map((el) => (
              <div key={el.id} className="p-4 rounded-xl border border-mex-maroon/30 bg-white shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-black text-slate-900 block">{el.name}</span>
                    {el.category && <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200 inline-block mt-1">{el.category}</span>}
                  </div>
                  <button onClick={() => handleRemoveElement(el.id)} className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-extrabold text-slate-600 uppercase">Puntaje Máximo:</span>
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                      <button onClick={() => updateMaxPoints(el.id, -1)} className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 font-extrabold flex items-center justify-center border border-slate-300"><Minus className="w-3.5 h-3.5" /></button>
                      <input type="number" min="0" max="50" value={el.maxPoints} onChange={(e) => setDirectMaxPoints(el.id, parseInt(e.target.value))} className="w-11 text-center bg-transparent text-xs font-black focus:outline-none" />
                      <button onClick={() => updateMaxPoints(el.id, 1)} className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 font-extrabold flex items-center justify-center border border-slate-300"><Plus className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-extrabold text-slate-600 uppercase">Porcentaje (%):</span>
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                      <button onClick={() => updateWeight(el.id, -5)} className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 font-extrabold flex items-center justify-center border border-slate-300 text-xs">-5</button>
                      <input type="number" min="0" max="100" value={el.weightPercentage} onChange={(e) => setDirectWeight(el.id, parseInt(e.target.value))} className="w-12 text-center bg-transparent text-xs font-black text-mex-maroon focus:outline-none" />
                      <button onClick={() => updateWeight(el.id, 5)} className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 font-extrabold flex items-center justify-center border border-slate-300 text-xs">+5</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PASO 3: Registro de Calificaciones */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-mex-maroon text-white flex items-center justify-center text-xs font-black">3</span>
            Registro de Calificaciones del Grupo
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Ingresa los puntajes obtenidos. La calificación final trimestral se calcula automáticamente en escala 0-10.</p>
        </div>

        {students.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900 text-white p-4 rounded-xl">
            <div><span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">Total Alumnos</span><span className="text-lg font-black">{students.length}</span></div>
            <div><span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">Promedio</span><span className="text-lg font-black text-mex-gold">{groupStats.average}</span></div>
            <div><span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">Aprobados</span><span className="text-lg font-black text-emerald-400">{groupStats.passingCount} ({groupStats.passingPercentage}%)</span></div>
            <div><span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">En Riesgo</span><span className="text-lg font-black text-red-400">{groupStats.failingCount}</span></div>
          </div>
        )}

        <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="p-3 font-black text-[10px] uppercase text-center border-r border-slate-700 w-12">N°</th>
                <th className="p-3 font-black text-[10px] uppercase border-r border-slate-700 min-w-[200px]">Nombre del Alumno</th>
                {elements.map((el) => (
                  <th key={el.id} className="p-3 font-black text-[10px] uppercase text-center border-r border-slate-700 min-w-[130px]">
                    <div className="truncate" title={el.name}>{el.name}</div>
                    <div className="text-[9px] text-mex-gold mt-0.5">Max: {el.maxPoints} pts | {el.weightPercentage}%</div>
                  </th>
                ))}
                <th className="p-3 font-black text-[10px] uppercase text-center bg-slate-900 text-mex-gold border-r border-slate-700 min-w-[110px]">Final (0-10)</th>
                <th className="p-3 font-black text-[10px] uppercase text-center bg-slate-900 text-white min-w-[100px]">Estatus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {students.length === 0 ? (
                <tr><td colSpan={elements.length + 4} className="p-8 text-center text-slate-400 font-medium">Selecciona un grupo en el Paso 1 para ver la lista de alumnos.</td></tr>
              ) : (
                students.map((student, idx) => {
                  const finalScore = calculateStudentFinal(student);
                  const isPassing = finalScore >= 6.0;
                  const isHonors = finalScore >= 9.0;
                  return (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors text-slate-800">
                      <td className="p-2 text-center font-extrabold text-slate-500 border-r border-slate-100">{idx + 1}</td>
                      <td className="p-2 font-bold text-slate-900 border-r border-slate-100">{student.name}</td>
                      {elements.map((el) => (
                        <td key={el.id} className="p-2 text-center border-r border-slate-100 bg-slate-50/50">
                          <input type="number" min="0" max={el.maxPoints} step="0.5" value={student.scores[el.id] !== undefined ? student.scores[el.id] : 0} onChange={(e) => handleScoreChange(student.id, el.id, e.target.value)} className="w-16 px-2 py-1 text-center bg-white border border-slate-200 rounded-lg font-black focus:outline-none focus:border-mex-maroon" />
                        </td>
                      ))}
                      <td className="p-2 text-center font-black border-r border-slate-100 bg-slate-100/80">
                        <span className={`text-sm ${isHonors ? "text-emerald-700" : isPassing ? "text-slate-900" : "text-red-600"}`}>{finalScore.toFixed(1)}</span>
                      </td>
                      <td className="p-2 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${isHonors ? "bg-emerald-100 text-emerald-800 border-emerald-300" : isPassing ? "bg-blue-100 text-blue-800 border-blue-200" : "bg-red-100 text-red-800 border-red-300"}`}>
                          {isHonors ? "Excelente" : isPassing ? "Aprobado" : "En Riesgo"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pt-2 flex flex-col items-center justify-center space-y-3">
        <button onClick={() => setShowPrintModal(true)} className="w-full sm:w-auto px-8 py-4 bg-mex-maroon hover:bg-mex-maroon/90 text-white rounded-2xl text-sm font-black flex items-center gap-3 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          <Printer className="w-5 h-5 text-mex-gold" /><span>Generar e Imprimir Formato Terminado</span>
        </button>
      </div>

      {/* MODAL POP-UP: Seleccionar Instrumentos */}
      {showAddElementsModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl space-y-5 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base flex items-center gap-2"><CheckSquare className="w-5 h-5 text-mex-maroon" />Instrumentos de Evaluación</h3>
              <button onClick={() => setShowAddElementsModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CATALOG_ELEMENTS.map((item) => (
                <div key={item.id} onClick={() => toggleCatalogSelection(item.id)} className={`p-3 rounded-xl border cursor-pointer flex gap-3 ${selectedCatalogIds.includes(item.id) ? "bg-mex-maroon/5 border-mex-maroon" : "bg-slate-50"}`}>
                  <input type="checkbox" checked={selectedCatalogIds.includes(item.id)} readOnly className="mt-0.5 w-4 h-4 rounded text-mex-maroon focus:ring-mex-maroon" />
                  <div>
                    <span className="text-xs font-extrabold block">{item.name}</span>
                    <span className="text-[10px] text-slate-400 block">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <label className="block text-[11px] font-extrabold uppercase text-slate-600">Agregar elemento personalizado</label>
              <div className="flex gap-2">
                <input type="text" value={customElementName} onChange={(e) => setCustomElementName(e.target.value)} className="flex-1 px-3 py-2 bg-slate-50 border rounded-xl text-xs focus:outline-none focus:border-mex-maroon" />
                <button onClick={handleAddCustomElementInModal} className="px-3.5 py-2 bg-slate-800 text-white text-xs font-extrabold rounded-xl">+ Añadir</button>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t"><button onClick={() => setShowAddElementsModal(false)} className="px-4 py-2 bg-slate-100 font-extrabold rounded-xl text-xs">Cancelar</button><button onClick={handleConfirmAddElements} className="px-5 py-2 bg-mex-maroon text-white font-black rounded-xl text-xs">Confirmar</button></div>
          </div>
        </div>
      )}

      {/* MODAL POP-UP: Imprimir */}
      {showPrintModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <AccionesDocumento
              targetId="documento-resultado"
              tipoRecurso="Formato_Evaluacion"
              customSuffix={`Formato_${periodo}_${selectedGroup?.grado || ''}`}
              title={<span className="font-black text-sm">Formato de Evaluación ({selectedGroup?.grado || ""} {selectedGroup?.grupo || ""})</span>}
              extraActions={<button onClick={() => setShowPrintModal(false)} className="px-3 py-2 bg-slate-100 font-bold rounded-xl text-xs">Cerrar Vista</button>}
            />
            <div id="documento-resultado" className="space-y-6 text-slate-900 p-6 bg-white printable-document">
              <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
                <h2 className="text-base font-black uppercase tracking-wider">{escuelaName}</h2>
                <h3 className="text-xs font-extrabold text-slate-600 uppercase">FORMATO DE EVALUACIÓN Y REGISTRO DE CALIFICACIONES - {periodo.toUpperCase()}</h3>
                <div className="flex flex-wrap justify-center gap-4 text-[11px] font-bold pt-1">
                  <span>CCT: <strong>{cct}</strong></span>
                  <span>Docente: <strong>{docenteName}</strong></span>
                  <span>Grado y Grupo: <strong>{selectedGroup?.grado || ""} {selectedGroup?.grupo || ""}</strong></span>
                  <span>Disciplina: <strong>{selectedGroup?.disciplina || "General"}</strong></span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase text-slate-800">1. Instrumentos de Evaluación</h4>
                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  {elements.map((el) => (
                    <div key={el.id} className="p-2 border rounded bg-slate-50"><span className="font-bold block">{el.name}</span><span className="text-[10px] text-slate-600 block">Máx: {el.maxPoints} pts | {el.weightPercentage}%</span></div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase text-slate-800">2. Registro de Calificaciones</h4>
                <table className="w-full text-[11px] border-collapse border border-slate-400">
                  <thead>
                    <tr className="bg-slate-100"><th className="border border-slate-400 p-1.5 w-8">N°</th><th className="border border-slate-400 p-1.5 text-left">Nombre del Alumno</th>
                      {elements.map((el) => (<th key={el.id} className="border border-slate-400 p-1.5">{el.name}</th>))}
                      <th className="border border-slate-400 p-1.5 bg-slate-200">Final (0-10)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((st, i) => (
                      <tr key={st.id}><td className="border border-slate-400 p-1.5 text-center">{i + 1}</td><td className="border border-slate-400 p-1.5 font-bold">{st.name}</td>
                        {elements.map((el) => (<td key={el.id} className="border border-slate-400 p-1.5 text-center">{st.scores[el.id] !== undefined ? st.scores[el.id] : 0}</td>))}
                        <td className="border border-slate-400 p-1.5 text-center font-black bg-slate-50">{calculateStudentFinal(st).toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-2 gap-12 pt-12">
                <div className="text-center border-t border-slate-900 pt-2"><span className="text-xs font-bold block">{docenteName}</span><span className="text-[10px] uppercase font-bold text-slate-600 block">{firmaDocente}</span></div>
                <div className="text-center border-t border-slate-900 pt-2"><span className="text-xs font-bold block">Firma y Sello</span><span className="text-[10px] uppercase font-bold text-slate-600 block">{firmaAutoridad}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}