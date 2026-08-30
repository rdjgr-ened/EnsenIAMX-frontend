import React, { useState, useEffect, useMemo } from "react";
import { CompletePlan, UserSubscription } from "../types";
import { ArrowLeft, Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { saveEvaluacionContinua, getEvaluacionContinua, isSupabaseConfigured } from "../utils/supabaseClient";

interface EvaluacionContinuaProps {
  planeacionesGuardadas: CompletePlan[];
  gruposGuardados: any[];
  onBack: () => void;
  subscription?: UserSubscription;
}

export default function EvaluacionContinuaView({
  planeacionesGuardadas,
  gruposGuardados,
  onBack,
  subscription
}: EvaluacionContinuaProps) {
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");
  const [evalData, setEvalData] = useState<any>({});
  
  // EL SECRETO: Guardar el ID de Supabase para saber si actualizar o insertar
  const [dbRecordId, setDbRecordId] = useState<string | null>(null); 
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 1. Cargar datos y extraer alumnos
  useEffect(() => {
    if (!selectedGroupId || !isSupabaseConfigured) return;
    
    const userProfileStr = localStorage.getItem("nem_secundaria_profile");
    const userId = userProfileStr ? JSON.parse(userProfileStr)?.id : null;
    if (!userId) return;

    setErrorMsg(null);

    getEvaluacionContinua(userId, subscription?.plan || "gratuito", selectedGroupId)
      .then(data => {
        if (data && data.length > 0) {
          // Ya existe en la nube: Guardamos su ID oficial y mostramos los datos
          setDbRecordId(data[0].id);
          setEvalData(data[0].contenido_json);
        } else {
          // Es nuevo: Extraemos los alumnos reales del grupo para que la tabla no esté vacía
          setDbRecordId(null);
          const grupoSeleccionado = gruposGuardados.find(g => g.id === selectedGroupId);
          const alumnosDelGrupo = grupoSeleccionado?.estudiantes || []; // <--- LA SANGRE
          
          setEvalData({ 
            groupId: selectedGroupId, 
            alumnos: alumnosDelGrupo 
          });
        }
      });
  }, [selectedGroupId, subscription, gruposGuardados]);

  // 2. Guardar a la nube
  const handleSaveToCloud = async () => {
    if (!selectedGroupId || !isSupabaseConfigured) return;
    
    const userProfileStr = localStorage.getItem("nem_secundaria_profile");
    const userId = userProfileStr ? JSON.parse(userProfileStr)?.id : null;
    if (!userId) return;

    setIsSaving(true);
    setSaveSuccess(false);
    setErrorMsg(null);

    try {
      await saveEvaluacionContinua({
        id: dbRecordId || undefined, // Mandamos el ID para que Supabase sepa qué actualizar
        grupo_id: selectedGroupId,
        user_id: userId,
        contenido_json: evalData
      }, subscription?.plan || "gratuito");
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error: any) {
      console.error("Error al guardar:", error);
      setErrorMsg(error?.message || "No se pudo conectar con la base de datos.");
    } finally {
      setIsSaving(false);
    }
  };
  const [showAddColumnModal, setShowAddColumnModal] = useState<boolean>(false);
  const [newColTitle, setNewColTitle] = useState<string>("Clase 1");
  const [newColMaxPoints, setNewColMaxPoints] = useState<number>(10);
  const [newColDate, setNewColDate] = useState<string>(() => new Date().toISOString().split("T")[0]);
  const [showSyncDrawer, setShowSyncDrawer] = useState<boolean>(false);



  // Helper date formatting functions
  const formatDateForInput = (str: string) => {
    if (!str) return new Date().toISOString().split("T")[0];
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;
    return new Date().toISOString().split("T")[0];
  };

  const formatDateDisplay = (str: string) => {
    if (!str) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
      const [year, month, day] = str.split("-").map(Number);
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        const d = new Date(year, month - 1, day);
        return d.toLocaleDateString("es-MX", { day: "2-digit", month: "short" });
      }
    }
    return str;
  };

  // 1. Calculamos selectedGroup (esto quita el error de la línea 119)
  const selectedGroup = useMemo(() => {
    return gruposGuardados.find(g => g.id === selectedGroupId) || null;
  }, [gruposGuardados, selectedGroupId]);

  // Current Group's Evaluation State
  const currentGroupEval = useMemo(() => {
    if (!selectedGroupId) return null;
    const existing = evalData[selectedGroupId];
    const activeSyncedPlanId = existing?.syncedPlanId || selectedGroup?.syncedPlanId;
    
    // 2. Cambiamos 'plans' por 'planeacionesGuardadas' (esto quita el error de la línea 120)
    const syncedPlan = planeacionesGuardadas.find(p => p.id === activeSyncedPlanId);

    if (existing && existing.columnas && existing.columnas.length > 0) {
      return {
        ...existing,
        syncedPlanId: activeSyncedPlanId
      };
    }

    // Auto-generate columns from synced plan if available
    if (syncedPlan && syncedPlan.plan?.fases) {
      const allLessons = syncedPlan.plan.fases.flatMap(f => f.sesiones);
      if (allLessons.length > 0) {
        const todayIso = new Date().toISOString().split("T")[0];
        const autoCols: EvaluationColumnItem[] = allLessons.map(les => ({
          id: `col_s${les.numero}`,
          sesionNumero: les.numero,
          fecha: todayIso,
          titulo: `S${les.numero}: ${les.titulo}`,
          puntosMaximos: 10
        }));
        return {
          groupId: selectedGroupId,
          syncedPlanId: activeSyncedPlanId,
          columnas: autoCols,
          calificaciones: existing?.calificaciones || {}
        };
      }
    }

    return existing || {
      groupId: selectedGroupId,
      syncedPlanId: activeSyncedPlanId,
      columnas: [
        { id: "col_1", fecha: new Date().toISOString().split("T")[0], titulo: "S1: Asistencia y Trabajo", puntosMaximos: 10 },
        { id: "col_2", fecha: new Date().toISOString().split("T")[0], titulo: "S2: Actividad Individual", puntosMaximos: 10 },
        { id: "col_3", fecha: new Date().toISOString().split("T")[0], titulo: "S3: Proyecto y Participación", puntosMaximos: 10 },
      ],
      calificaciones: {}
    };
  }, [evalData, selectedGroupId, selectedGroup, planeacionesGuardadas]);

  // Handler to sync a planeación's lessons to evaluation columns
  const handleSyncPlanToEval = (planId: string) => {
    if (!selectedGroupId) return;
    const targetPlan = planeacionesGuardadas.find(p => p.id === planId);

    if (!planId) {
      setEvalData(prev => ({
        ...prev,
        [selectedGroupId]: {
          groupId: selectedGroupId,
          syncedPlanId: "",
          columnas: prev[selectedGroupId]?.columnas || currentGroupEval?.columnas || [],
          calificaciones: prev[selectedGroupId]?.calificaciones || {}
        }
      }));
      setShowSyncDrawer(false);
      return;
    }

    if (!targetPlan || !targetPlan.plan?.fases) return;

    const allLessons = targetPlan.plan.fases.flatMap(f => f.sesiones);
    if (allLessons.length === 0) return;

    const todayIso = new Date().toISOString().split("T")[0];

    const newCols: EvaluationColumnItem[] = allLessons.map((les) => {
      const existingCol = currentGroupEval?.columnas.find(c => c.sesionNumero === les.numero || c.id === `col_s${les.numero}`);
      return {
        id: `col_s${les.numero}`,
        sesionNumero: les.numero,
        fecha: existingCol?.fecha || todayIso,
        titulo: `S${les.numero}: ${les.titulo}`,
        puntosMaximos: existingCol?.puntosMaximos ?? 10,
      };
    });

    // Also sync to group state
    handleSyncPlanToGroup(selectedGroupId, planId);

    setEvalData(prev => ({
      ...prev,
      [selectedGroupId]: {
        groupId: selectedGroupId,
        syncedPlanId: planId,
        columnas: newCols,
        calificaciones: prev[selectedGroupId]?.calificaciones || {}
      }
    }));

    // Auto-collapse the selection drawer
    setShowSyncDrawer(false);
  };

  const handleUpdateColumnDate = (columnId: string, newFecha: string) => {
    if (!selectedGroupId) return;
    const currentCols = currentGroupEval?.columnas || [];
    const updatedCols = currentCols.map(col => col.id === columnId ? { ...col, fecha: newFecha } : col);

    setEvalData(prev => ({
      ...prev,
      [selectedGroupId]: {
        groupId: selectedGroupId,
        syncedPlanId: prev[selectedGroupId]?.syncedPlanId || currentGroupEval?.syncedPlanId,
        columnas: updatedCols,
        calificaciones: prev[selectedGroupId]?.calificaciones || {}
      }
    }));
  };

  const handleUpdateColumnMaxPoints = (columnId: string, newMaxPoints: number) => {
    if (!selectedGroupId) return;
    const currentCols = currentGroupEval?.columnas || [];
    const updatedCols = currentCols.map(col => col.id === columnId ? { ...col, puntosMaximos: Math.max(1, newMaxPoints) } : col);

    setEvalData(prev => ({
      ...prev,
      [selectedGroupId]: {
        groupId: selectedGroupId,
        syncedPlanId: prev[selectedGroupId]?.syncedPlanId || currentGroupEval?.syncedPlanId,
        columnas: updatedCols,
        calificaciones: prev[selectedGroupId]?.calificaciones || {}
      }
    }));
  };

  const handleUpdateColumnTitle = (columnId: string, newTitle: string) => {
    if (!selectedGroupId) return;
    const currentCols = currentGroupEval?.columnas || [];
    const updatedCols = currentCols.map(col => col.id === columnId ? { ...col, titulo: newTitle } : col);

    setEvalData(prev => ({
      ...prev,
      [selectedGroupId]: {
        groupId: selectedGroupId,
        syncedPlanId: prev[selectedGroupId]?.syncedPlanId || currentGroupEval?.syncedPlanId,
        columnas: updatedCols,
        calificaciones: prev[selectedGroupId]?.calificaciones || {}
      }
    }));
  };

  const handleAddCol = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGroupId) return;

    const currentCols = currentGroupEval?.columnas || [];
    const newCol: EvaluationColumnItem = {
      id: `col_${Date.now()}`,
      fecha: newColDate || new Date().toISOString().split("T")[0],
      titulo: newColTitle.trim() || "Criterio de Evaluación",
      puntosMaximos: Number(newColMaxPoints) || 10
    };

    setEvalData(prev => ({
      ...prev,
      [selectedGroupId]: {
        groupId: selectedGroupId,
        syncedPlanId: prev[selectedGroupId]?.syncedPlanId || currentGroupEval?.syncedPlanId,
        columnas: [...currentCols, newCol],
        calificaciones: prev[selectedGroupId]?.calificaciones || {}
      }
    }));

    setShowAddColumnModal(false);
    setNewColTitle("Trabajo en clase");
    setNewColMaxPoints(10);
  };

  const handleDeleteCol = (columnId: string) => {
    if (!selectedGroupId) return;
    const currentCols = currentGroupEval?.columnas || [];
    const updatedCols = currentCols.filter(c => c.id !== columnId);

    setEvalData(prev => ({
      ...prev,
      [selectedGroupId]: {
        groupId: selectedGroupId,
        columnas: updatedCols,
        calificaciones: prev[selectedGroupId]?.calificaciones || {}
      }
    }));
  };

  const handleScoreChange = (studentId: string, columnId: string, score: number) => {
    if (!selectedGroupId) return;
    const key = `${studentId}_${columnId}`;
    const currentScores = currentGroupEval?.calificaciones || {};

    setEvalData(prev => ({
      ...prev,
      [selectedGroupId]: {
        groupId: selectedGroupId,
        columnas: prev[selectedGroupId]?.columnas || currentGroupEval?.columnas || [],
        calificaciones: {
          ...currentScores,
          [key]: Math.max(0, score)
        }
      }
    }));
  };

  const handleToggleCheckCell = (studentId: string, columnId: string, maxPoints: number) => {
    if (!selectedGroupId) return;
    const key = `${studentId}_${columnId}`;
    const currentScore = currentGroupEval?.calificaciones[key] || 0;
    const newScore = currentScore > 0 ? 0 : maxPoints;

    handleScoreChange(studentId, columnId, newScore);
  };

  const handleBatchCheckColumn = (columnId: string, maxPoints: number) => {
    if (!selectedGroup) return;
    
    // Primero, hacemos una copia de las calificaciones actuales
    const currentScores = { ...(currentGroupEval?.calificaciones || {}) };

    // Recorremos a todos los estudiantes y les ponemos 10 (o el maxPoints)
    selectedGroup.estudiantes.forEach((st: any) => {
      const key = `${st.id}_${columnId}`;
      currentScores[key] = maxPoints;
    });

    // Guardamos todo de vuelta
    setEvalData((prev: any) => ({
      ...prev,
      [selectedGroupId]: {
        groupId: selectedGroupId,
        columnas: currentGroupEval?.columnas || [],
        calificaciones: currentScores
      }
    }));
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* ENCABEZADO Y CONTROLES */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <h2 className="font-black text-slate-800 text-lg uppercase tracking-wider">Evaluación Continua</h2>
          </div>
          <button onClick={onBack} className="px-3 py-2 rounded-xl text-xs font-black uppercase text-slate-700 hover:bg-slate-100 transition flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" /><span>Volver</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">1. Selecciona el Grupo</label>
            <select
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium outline-none"
            >
              <option value="">-- Elige un grupo --</option>
              {gruposGuardados.map(g => (
                <option key={g.id} value={g.id}>{g.grado} {g.grupo} - {g.disciplina}</option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col items-end justify-end gap-2">
            {errorMsg && (
               <span className="text-xs font-bold text-red-600 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5"/> {errorMsg}</span>
            )}
            <button
              onClick={handleSaveToCloud}
              disabled={!selectedGroupId || isSaving}
              className={`px-8 py-3.5 font-extrabold text-sm uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 shadow-md ${
                saveSuccess ? "bg-emerald-600 text-white" : "bg-mex-maroon hover:bg-mex-maroon/90 text-white disabled:bg-slate-300"
              }`}
            >
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : saveSuccess ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
              <span>{isSaving ? "Guardando..." : saveSuccess ? "¡Guardado en la Nube!" : "Guardar Calificaciones"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* AQUÍ VA EL CÓDIGO DE TU TABLA DE CALIFICACIONES (El que ya tienes en OrganizadorEscolar) */}
      {selectedGroupId && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           {/* Pega aquí la interfaz de la tabla que me mostraste en la imagen anterior */}
           <p className="text-center text-slate-500 font-bold py-10">Aquí va tu tabla de alumnos...</p>
        </div>
      )}
    </div>
  );
}