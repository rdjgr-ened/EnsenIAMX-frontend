import React, { useState, useEffect, useMemo } from "react";
import { CompletePlan, UserSubscription } from "../types";
import { ArrowLeft, Save, Loader2, CheckCircle2, AlertCircle, FileSpreadsheet, RefreshCw, ChevronDown, Plus } from "lucide-react";
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
      {/* ENCABEZADO Y CONTROLES PRINCIPALES */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2 uppercase tracking-wider">
              <FileSpreadsheet className="w-5 h-5 text-amber-600" />
              <span>Evaluación Continua del Trabajo en Clase</span>
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Grupo:</span>
              <select
                value={selectedGroupId}
                onChange={(e) => setSelectedGroupId(e.target.value)}
                className="px-3 py-1.5 border border-slate-300 rounded-xl text-xs font-black text-slate-900 bg-slate-50 focus:outline-none"
              >
                <option value="">-- Selecciona --</option>
                {gruposGuardados.map(g => (
                  <option key={g.id} value={g.id}>
                    {g.grado} {g.grupo} - {g.disciplina || "General"}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => setShowSyncDrawer(!showSyncDrawer)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer border ${
                showSyncDrawer || currentGroupEval?.syncedPlanId
                  ? "bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200"
                  : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 text-amber-700 ${showSyncDrawer ? "rotate-180 transition-transform" : ""}`} />
              <span>Sincronizar planeación</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSyncDrawer ? "rotate-180" : ""}`} />
            </button>

            <button
              type="button"
              onClick={() => setShowAddColumnModal(true)}
              className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar clase</span>
            </button>

            {/* NUEVO BOTÓN DE GUARDADO */}
            <button
              onClick={handleSaveToCloud}
              disabled={!selectedGroupId || isSaving}
              className={`px-4 py-1.5 font-extrabold text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-1.5 shadow-md ${
                saveSuccess ? "bg-emerald-600 text-white" : "bg-mex-maroon hover:bg-mex-maroon/90 text-white disabled:bg-slate-300"
              }`}
            >
              {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : saveSuccess ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
              <span>{isSaving ? "Guardando..." : saveSuccess ? "¡Guardado!" : "Guardar Calificaciones"}</span>
            </button>
          </div>
        </div>

        {/* MENSAJE DE ERROR SI FALLA EL GUARDADO */}
        {errorMsg && (
           <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-bold flex items-center gap-2">
             <AlertCircle className="w-4 h-4"/> {errorMsg}
           </div>
        )}

        {/* Desplegable de Sincronización con Planeación Didáctica */}
        {showSyncDrawer && selectedGroup && (
          <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-2xl space-y-3 animate-fade-in text-xs">
            <div className="flex items-center justify-between">
              <span className="font-black text-amber-950 uppercase tracking-wider text-[11px] flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-amber-700" />
                <span>Seleccionar Planeación Didáctica</span>
              </span>
              <button type="button" onClick={() => setShowSyncDrawer(false)} className="text-slate-400 hover:text-slate-700 text-sm font-bold">✕</button>
            </div>

            <div className="space-y-2">
              <select
                value={currentGroupEval?.syncedPlanId || ""}
                onChange={(e) => handleSyncPlanToEval(e.target.value)}
                className="w-full p-2.5 border border-amber-300 bg-white rounded-xl font-bold text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
              >
                <option value="">-- Sin planeación vinculada (Evaluación Libre) --</option>
                {planeacionesGuardadas.map((p: any) => {
                  const sessionCount = p.plan?.fases ? p.plan.fases.flatMap((f: any) => f.sesiones).length : 0;
                  return (
                    <option key={p.id} value={p.id}>
                      {p.plan?.producto || p.contenido || "Planeación"} ({sessionCount} clases)
                    </option>
                  );
                })}
              </select>
            </div>

            {currentGroupEval?.syncedPlanId && (() => {
              const activePlan = planeacionesGuardadas.find((p: any) => p.id === currentGroupEval.syncedPlanId);
              if (!activePlan) return null;
              const totalSessions = activePlan.plan?.fases ? activePlan.plan.fases.flatMap((f: any) => f.sesiones).length : 0;

              return (
                <div className="p-3 bg-white/90 border border-amber-200 rounded-xl space-y-1 mt-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider">
                      Planeación Vinculada ({totalSessions} Clases Cargadas)
                    </span>
                  </div>
                  <div className="font-extrabold text-slate-900 leading-snug break-words whitespace-normal text-xs pt-0.5">
                    {activePlan.plan?.producto || "Proyecto Didáctico"}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* TABLA PRINCIPAL DE EVALUACIÓN */}
        {!selectedGroup ? (
          <div className="p-8 text-center text-slate-400">
            <p>Selecciona o registra un grupo para iniciar el control de evaluación continua.</p>
          </div>
        ) : selectedGroup.estudiantes.length === 0 ? (
          <div className="p-8 text-center text-slate-400 border border-slate-200 rounded-xl">
            <p className="font-bold text-slate-700">Este grupo no tiene alumnos registrados.</p>
            <p className="text-xs text-slate-500 mt-1">Ingresa a la pestaña "Mis Grupos" para agregar a los estudiantes.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="overflow-x-auto border border-slate-300 rounded-xl shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-900 text-white font-black uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3 w-10 text-center border-r border-slate-800">#</th>
                    <th className="p-3 min-w-[200px] border-r border-slate-800">Nombre del Alumno</th>

                    {currentGroupEval?.columnas.map((col: any) => (
                      <th key={col.id} className="p-2 min-w-[150px] max-w-[200px] border-r border-slate-800 text-center">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <input
                            type="date"
                            value={formatDateForInput(col.fecha)}
                            onChange={(e) => handleUpdateColumnDate(col.id, e.target.value)}
                            className="bg-slate-800 text-amber-300 font-extrabold text-[10px] px-1.5 py-0.5 rounded border border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
                          />
                          <button onClick={() => handleDeleteCol(col.id)} className="text-slate-500 hover:text-rose-400 font-normal text-[10px] px-1">✕</button>
                        </div>

                        <span className="block text-white font-extrabold text-[11px] leading-tight mb-1 truncate px-0.5" title={col.titulo}>
                          {col.titulo}
                        </span>

                        <div className="mt-1 flex items-center justify-center gap-1.5">
                          <div className="flex items-center gap-1 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700">
                            <span className="text-[9px] text-amber-200/80 font-bold">Max:</span>
                            <input
                              type="number"
                              min={1}
                              max={100}
                              value={col.puntosMaximos}
                              onChange={(e) => handleUpdateColumnMaxPoints(col.id, Number(e.target.value))}
                              className="w-10 text-center bg-slate-900 text-amber-300 font-black text-[10px] py-0.2 rounded border border-slate-700 focus:outline-none focus:border-amber-400"
                            />
                            <span className="text-[9px] text-amber-200/80 font-bold">pts</span>
                          </div>

                          <button onClick={() => handleBatchCheckColumn(col.id, col.puntosMaximos)} className="text-[8px] bg-slate-800 hover:bg-slate-700 px-1.5 py-1 rounded text-slate-300 font-bold cursor-pointer">
                            ✓ Todos
                          </button>
                        </div>
                      </th>
                    ))}
                    <th className="p-3 min-w-[120px] bg-amber-950 text-amber-200 text-center font-black text-xs">SUMA TOTAL (Pts)</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 font-semibold text-slate-800 bg-white">
                  {selectedGroup.estudiantes.map((st: any, idx: number) => {
                    let totalPoints = 0;
                    let maxPossible = 0;

                    currentGroupEval?.columnas.forEach((col: any) => {
                      maxPossible += col.puntosMaximos;
                      const key = `${st.id}_${col.id}`;
                      totalPoints += (currentGroupEval.calificaciones[key] || 0);
                    });

                    const pctScore = maxPossible > 0 ? Math.round((totalPoints / maxPossible) * 100) : 0;

                    return (
                      <tr key={st.id} className="hover:bg-amber-50/40 transition">
                        <td className="p-3 text-center text-slate-400 font-bold text-[11px] border-r border-slate-200 bg-slate-50">{idx + 1}</td>
                        <td className="p-3 font-extrabold text-slate-900 border-r border-slate-200 bg-slate-50/80">{st.nombre}</td>

                        {currentGroupEval?.columnas.map((col: any) => {
                          const key = `${st.id}_${col.id}`;
                          const score = currentGroupEval.calificaciones[key] || 0;
                          const isFullScore = score >= col.puntosMaximos;

                          return (
                            <td key={col.id} className="p-2 text-center border-r border-slate-200">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleToggleCheckCell(st.id, col.id, col.puntosMaximos)}
                                  className={`w-5 h-5 rounded flex items-center justify-center text-xs font-black transition cursor-pointer ${
                                    isFullScore ? "bg-amber-500 text-white shadow-2xs" : score > 0 ? "bg-amber-100 text-amber-900 border border-amber-300" : "bg-slate-100 text-slate-300 hover:bg-slate-200"
                                  }`}
                                >✓</button>
                                <input
                                  type="number"
                                  min="0"
                                  max={col.puntosMaximos * 2}
                                  value={score}
                                  onChange={(e) => handleScoreChange(st.id, col.id, Number(e.target.value))}
                                  className="w-12 text-center py-0.5 border border-slate-200 rounded font-black text-xs focus:outline-none focus:border-amber-500"
                                />
                              </div>
                            </td>
                          );
                        })}
                        <td className="p-3 text-center bg-amber-50 font-black text-xs text-amber-950 border-l border-amber-200">
                          <span className="text-sm text-amber-900 font-extrabold block">{totalPoints} pts</span>
                          <span className="text-[9px] text-amber-700 block font-bold">({pctScore}% de {maxPossible} max)</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: AGREGAR CLASE O ELEMENTO A EVALUAR */}
      {showAddColumnModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-600" />
                <span>Agregar Clase / Elemento a Evaluar</span>
              </h3>
              <button type="button" onClick={() => setShowAddColumnModal(false)} className="text-slate-400 hover:text-slate-700 text-lg font-bold">✕</button>
            </div>

            <form onSubmit={handleAddCol} className="space-y-4 text-xs font-semibold text-slate-700">
              <div>
                <label className="block mb-1 text-slate-800">Título de la Clase o Elemento a Evaluar:</label>
                <input
                  type="text"
                  required
                  value={newColTitle}
                  onChange={(e) => setNewColTitle(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-bold focus:outline-none focus:border-amber-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-800">Escala Numérica (Puntaje Máximo):</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={100}
                  value={newColMaxPoints}
                  onChange={(e) => setNewColMaxPoints(Number(e.target.value))}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-bold focus:outline-none focus:border-amber-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-800">Fecha de Implementación:</label>
                <input
                  type="date"
                  required
                  value={newColDate}
                  onChange={(e) => setNewColDate(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-bold focus:outline-none focus:border-amber-500 text-slate-900 bg-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setShowAddColumnModal(false)} className="px-3.5 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-black uppercase rounded-xl shadow-xs transition">Guardar Clase</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}