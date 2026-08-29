import React, { useState, useEffect, useMemo } from "react";
import { 
  Folder, FolderKanban, Users, ShieldAlert, CalendarCheck, Grid, 
  Search, Plus, Trash2, Printer, ArrowLeft, CheckSquare, Sparkles, 
  FileSpreadsheet, FileText, CheckCircle2, ChevronRight, Edit3, Download,
  BookOpen, HelpCircle, UserPlus, RefreshCw, Layers, ChevronDown,
  Lock, Crown, Gem, ClipboardList, BookCheck, GraduationCap
} from "lucide-react";
import { 
  CompletePlan, BitacoraIncidencia, EscolarGroup, StudentItem, 
  ClassTrackingRecord, ContinuousEvalGroupData, EvaluationColumnItem,
  UserSubscription, PaywallReason, PlanTier
} from "../types";
import { checkFeatureAccess, checkBitacoraLimit, PLAN_CONFIGS } from "../utils/planManager";
import { 
  getGrupos as fetchSupabaseGrupos,
  saveGrupo as saveSupabaseGrupo,
  deleteGrupo as deleteSupabaseGrupo,
  getAlumnos as fetchSupabaseAlumnos,
  saveAlumno as saveSupabaseAlumno,
  deleteAlumno as deleteSupabaseAlumno,
  getIncidencias as fetchSupabaseIncidencias,
  insertIncidencia as insertSupabaseIncidencia,
  deleteIncidencia as deleteSupabaseIncidencia,
  getEvaluacionContinua as fetchSupabaseEvaluacionContinua,
  saveEvaluacionContinua as saveSupabaseEvaluacionContinua,
  deleteEvaluacionContinua as deleteSupabaseEvaluacionContinua,
  isSupabaseConfigured,
  getRecursosGenerados,
  deleteRecursoGenerado
} from "../utils/supabaseClient";

interface OrganizadorEscolarViewProps {
  initialTab?: TabFolder;
  plans: CompletePlan[];
  onSelectPlan: (plan: CompletePlan) => void;
  onDeletePlan: (id: string) => void;
  onBack: () => void;
  onGoToBitacora: () => void;
  onGoToDiseno: () => void;
  docenteName: string;
  escuelaName: string;
  subscription?: UserSubscription;
  onTriggerPaywall?: (reason: PaywallReason) => void;
}

type TabFolder = "planeaciones" | "grupos" | "bitacora" | "evaluacion" | "hojas" | "instrumentos" | "programas" | "examenes";

export default function OrganizadorEscolarView({
  initialTab = "planeaciones",
  plans,
  onSelectPlan,
  onDeletePlan,
  onBack,
  onGoToBitacora,
  onGoToDiseno,
  docenteName,
  escuelaName,
  subscription,
  onTriggerPaywall,
}: OrganizadorEscolarViewProps) {
  const userPlan: PlanTier = subscription?.plan || "gratuito";
  const safeTriggerPaywall = onTriggerPaywall || (() => {});
  const [activeTab, setActiveTab] = useState<TabFolder>(initialTab);

  const handleTabChange = (tab: TabFolder) => {
    const isPremium = userPlan === "basico" || userPlan === "oro" || userPlan === "platino";
    const isOroPlatino = userPlan === "oro" || userPlan === "platino";
    const isPlatino = userPlan === "platino";

    if (tab === "grupos" && !isPremium) {
      safeTriggerPaywall({
        type: "feature",
        featureName: "Registro y Administración de Grupos",
        requiredPlan: "basico",
        message: "Esta función requiere el Plan Básico o superior."
      });
      return;
    } else if (tab === "bitacora" && !isPremium) {
      safeTriggerPaywall({
        type: "feature",
        featureName: "Bitácora de Incidencias Escolares",
        requiredPlan: "basico",
        message: "Esta función requiere el Plan Básico o superior."
      });
      return;
    } else if (tab === "evaluacion" && !isPlatino) {
      safeTriggerPaywall({
        type: "feature",
        featureName: "Evaluación Continua del Trabajo en Clase",
        requiredPlan: "platino",
        message: "Esta función es exclusiva del Plan Platino."
      });
      return;
    }

    setActiveTab(tab);
  };


  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // ==================== STATE: MIS GRUPOS ====================
  const [grupos, setGrupos] = useState<EscolarGroup[]>(() => {
  const saved = localStorage.getItem("nem_grupos_organizador");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
  }
  
  // Retornamos un arreglo vacío para que inicie limpio sin datos de prueba
  return []; 
});

  const [selectedGroupId, setSelectedGroupId] = useState<string>(() => grupos[0]?.id || "");
  const [showAddGroupModal, setShowAddGroupModal] = useState<boolean>(false);
const [newGroupData, setNewGroupData] = useState({ grado: "1º Secundaria", grupo: "A", disciplina: "General", turno: "Matutino" });  
  const [showAddStudentModal, setShowAddStudentModal] = useState<boolean>(false);
  const [newStudentName, setNewStudentName] = useState<string>("");
  const [batchStudentText, setBatchStudentText] = useState<string>("");
  const [isBatchMode, setIsBatchMode] = useState<boolean>(false);
  const [groupToDeleteId, setGroupToDeleteId] = useState<string | null>(null);

  // Sync groups to localStorage and Supabase
  useEffect(() => {
    localStorage.setItem("nem_grupos_organizador", JSON.stringify(grupos));
    
    // Flatten all students into padron format for bitácora compatibility
    const allPadronStudents = grupos.flatMap(grp => 
      grp.estudiantes.map(st => ({
        id: st.id,
        nombre: st.nombre,
        grado: grp.grado,
        grupo: grp.grupo,
      }))
    );
    if (allPadronStudents.length > 0) {
      localStorage.setItem("nem_padron_alumnos", JSON.stringify(allPadronStudents));
    }
  }, [grupos]);

  // Load from Supabase on mount if available
  useEffect(() => {
    const userProfileStr = localStorage.getItem("nem_secundaria_profile");
        const userProfile = userProfileStr ? JSON.parse(userProfileStr) : null;
        const userId = userProfile?.id;
        if (!userId) return;

    if (isSupabaseConfigured) {
      getRecursosGenerados(userId).then(dbRecursos => {
        if (dbRecursos && dbRecursos.length > 0) {
          const recursosMapeados = dbRecursos.map(r => ({
            id: r.id,
            tipo_recurso: r.tipo_recurso,
            titulo: r.contenido_json?.titulo || r.contenido_json?.tema || (r.contenido_json?.fase ? `Programa ${r.contenido_json.fase} - ${r.contenido_json.grado}` : "Documento Generado"),
            contenido: r.contenido_json,
            createdAt: r.created_at
          }));
          setRecursosGuardados(recursosMapeados);
          localStorage.setItem("nem_recursos_generados", JSON.stringify(recursosMapeados));
        }
      });
      // 1.5 DESCARGAR BITÁCORAS DE INCIDENCIA
      fetchSupabaseIncidencias(userId).then(dbIncidencias => {
        if (dbIncidencias && dbIncidencias.length > 0) {
          const parsedBitacoras: BitacoraIncidencia[] = dbIncidencias.map(inc => {
            try {
              const parsed = JSON.parse(inc.descripcion);
              if (parsed && typeof parsed === 'object' && parsed.folio) {
                return { ...parsed, id: inc.id };
              }
            } catch (e) {}
            // Fallback
            return {
              id: inc.id,
              folio: `FOL-${inc.id.slice(-4).toUpperCase()}`,
              createdAt: inc.created_at || inc.fecha,
              updatedAt: inc.created_at || inc.fecha,
              escuela: "Escuela", cct: "CCT", turno: "Matutino", cicloEscolar: "2025-2026",
              fecha: inc.fecha, hora: "10:00", lugar: "Aula", docenteReporta: "Docente",
              alumnoNombre: inc.alumno_id, alumnoGrado: "1º", alumnoGrupo: "A",
              otrosInvolucrados: "", tiposIncidencia: [inc.categoria], tipoIncidenciaOtro: "",
              descripcionHechos: inc.descripcion, accionesInmediatas: [], accionesOtro: "",
              compromisoAlumno: "", compromisoPadre: "", compromisoEscuela: ""
            };
          });
          setBitacoras(parsedBitacoras);
          localStorage.setItem("nem_bitacoras_incidencias", JSON.stringify(parsedBitacoras));
        }
      }).catch(err => console.warn("Supabase incidencias load error:", err));
      fetchSupabaseGrupos(userId).then(async (dbGrupos) => {
        if (dbGrupos && dbGrupos.length > 0) {
          const dbAlumnos = await fetchSupabaseAlumnos(userId);
          const fullGroups: EscolarGroup[] = dbGrupos.map(g => ({
            id: g.id,
            grado: g.grado_grupo.split(" ")[0] || "1º",
            grupo: g.grado_grupo.split(" ")[1] || "A",
            nombreCompleto: `${g.grado_grupo} - ${g.materia}`,
            disciplina: g.materia,
            turno: "Matutino",
            estudiantes: dbAlumnos
              .filter(a => a.grupo_id === g.id)
              .map(a => ({ id: a.id, nombre: a.nombre_completo, bap: a.bap_diagnostico || undefined }))
          }));
          setGrupos(fullGroups);
          if (fullGroups.length > 0) {
            setSelectedGroupId(fullGroups[0].id);
          }
        }
      }).catch(err => console.warn("Supabase grupos load error:", err));

      if (userPlan === "oro" || userPlan === "platino") {
        fetchSupabaseEvaluacionContinua(userId, userPlan).then((evalRecords) => {
          if (evalRecords && evalRecords.length > 0) {
            // Reconstitute evaluation structure
            const mergedEvalData: Record<string, ContinuousEvalGroupData> = {};
            evalRecords.forEach(rec => {
              if (rec.grupo_id && rec.contenido_json) {
                mergedEvalData[rec.grupo_id] = rec.contenido_json;
              }
            });
            if (Object.keys(mergedEvalData).length > 0) {
              setEvalData(prev => ({ ...prev, ...mergedEvalData }));
            }
          }
        }).catch(err => console.warn("Supabase evaluacion continua load error:", err));
      }
    }
  }, []);

  const selectedGroup = useMemo(() => {
    return grupos.find(g => g.id === selectedGroupId) || grupos[0] || null;
  }, [grupos, selectedGroupId]);

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = `grp_${Date.now()}`;
    const newGroup: EscolarGroup = {
      id,
      grado: newGroupData.grado,
      grupo: newGroupData.grupo,
      nombreCompleto: `${newGroupData.grado} ${newGroupData.grupo} - ${newGroupData.disciplina}`,
      disciplina: newGroupData.disciplina,
      turno: newGroupData.turno,
      estudiantes: []
    };
    const updated = [...grupos, newGroup];
    setGrupos(updated);
    setSelectedGroupId(id);
    setShowAddGroupModal(false);
    setNewGroupData({ grado: "1º Secundaria", grupo: "A", disciplina: "General", turno: "Matutino" });

    // Supabase persist
    const userProfileStr = localStorage.getItem("nem_secundaria_profile");
        const userProfile = userProfileStr ? JSON.parse(userProfileStr) : null;
        const userId = userProfile?.id;
        if (!userId) return;
    saveSupabaseGrupo({
      id,
      user_id: userId,
      grado_grupo: `${newGroup.grado} ${newGroup.grupo}`,
      materia: newGroup.disciplina,
      ciclo_escolar: "2025-2026"
    }).catch(err => console.warn("Error guardando grupo en Supabase:", err));
  };

  const handleDeleteGroup = (groupId: string) => {
    setGroupToDeleteId(groupId);
  };

  const confirmDeleteGroup = () => {
    if (!groupToDeleteId) return;
    const updated = grupos.filter(g => g.id !== groupToDeleteId);
    setGrupos(updated);
    if (selectedGroupId === groupToDeleteId) {
      setSelectedGroupId(updated.length > 0 ? updated[0].id : "");
    }

    // Supabase delete
    const userProfileStr = localStorage.getItem("nem_secundaria_profile");
        const userProfile = userProfileStr ? JSON.parse(userProfileStr) : null;
        const userId = userProfile?.id;
        if (!userId) return;
    deleteSupabaseGrupo(groupToDeleteId, userId).catch(err => console.warn("Error borrando grupo en Supabase:", err));

    setGroupToDeleteId(null);
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGroupId) return;

    const userProfileStr = localStorage.getItem("nem_secundaria_profile");
        const userProfile = userProfileStr ? JSON.parse(userProfileStr) : null;
        const userId = userProfile?.id;
        if (!userId) return;

    if (isBatchMode) {
      const names = batchStudentText
        .split("\n")
        .map(n => n.trim())
        .filter(n => n.length > 0);

      if (names.length === 0) return;

      const newStudents: StudentItem[] = names.map(n => ({
        id: `st_${Math.random().toString(36).substr(2, 7)}`,
        nombre: n
      }));

      const updated = grupos.map(grp => {
        if (grp.id === selectedGroupId) {
          return { ...grp, estudiantes: [...grp.estudiantes, ...newStudents] };
        }
        return grp;
      });

      setGrupos(updated);
      setBatchStudentText("");
      setShowAddStudentModal(false);

      // Persist in Supabase
      newStudents.forEach(st => {
        saveSupabaseAlumno({
          id: st.id,
          grupo_id: selectedGroupId,
          user_id: userId,
          nombre_completo: st.nombre,
          bap_diagnostico: null
        }).catch(err => console.warn("Error guardando alumno en Supabase:", err));
      });
    } else {
      if (!newStudentName.trim()) return;
      const newStudent: StudentItem = {
        id: `st_${Date.now()}`,
        nombre: newStudentName.trim()
      };

      const updated = grupos.map(grp => {
        if (grp.id === selectedGroupId) {
          return { ...grp, estudiantes: [...grp.estudiantes, newStudent] };
        }
        return grp;
      });

      setGrupos(updated);
      setNewStudentName("");
      setShowAddStudentModal(false);

      // Persist in Supabase
      saveSupabaseAlumno({
        id: newStudent.id,
        grupo_id: selectedGroupId,
        user_id: userId,
        nombre_completo: newStudent.nombre,
        bap_diagnostico: null
      }).catch(err => console.warn("Error guardando alumno en Supabase:", err));
    }
  };

  const handleDeleteStudent = (groupId: string, studentId: string) => {
    const updated = grupos.map(grp => {
      if (grp.id === groupId) {
        return {
          ...grp,
          estudiantes: grp.estudiantes.filter(s => s.id !== studentId)
        };
      }
      return grp;
    });
    setGrupos(updated);

    const userProfileStr = localStorage.getItem("nem_secundaria_profile");
        const userProfile = userProfileStr ? JSON.parse(userProfileStr) : null;
        const userId = userProfile?.id;
        if (!userId) return;
    deleteSupabaseAlumno(studentId, userId).catch(err => console.warn("Error borrando alumno en Supabase:", err));
  };

  // ==================== STATE: BITÁCORA ESCOLAR ====================
  const [bitacoras, setBitacoras] = useState<BitacoraIncidencia[]>(() => {
    const saved = localStorage.getItem("nem_bitacoras_incidencias");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const [bitacoraSearch, setBitacoraSearch] = useState<string>("");
  const [bitacoraStatusFilter, setBitacoraStatusFilter] = useState<string>("todos");

  useEffect(() => {
    const saved = localStorage.getItem("nem_bitacoras_incidencias");
    if (saved) {
      try {
        setBitacoras(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, [activeTab]);

  const handleDeleteBitacora = (id: string) => {
    const updated = bitacoras.filter(b => b.id !== id);
    setBitacoras(updated);
    localStorage.setItem("nem_bitacoras_incidencias", JSON.stringify(updated));
  };

  const handleToggleBitacoraStatus = (id: string) => {
    const updated = bitacoras.map(b => {
      if (b.id === id) {
        let nextStatus: "abierto" | "en_seguimiento" | "concluido" = "en_seguimiento";
        if (b.status === "abierto") nextStatus = "en_seguimiento";
        else if (b.status === "en_seguimiento") nextStatus = "concluido";
        else nextStatus = "abierto";
        return { ...b, status: nextStatus };
      }
      return b;
    });
    setBitacoras(updated);
    localStorage.setItem("nem_bitacoras_incidencias", JSON.stringify(updated));
  };

  const filteredBitacoras = useMemo(() => {
    return bitacoras.filter(b => {
      const matchesSearch = 
        b.alumnoNombre.toLowerCase().includes(bitacoraSearch.toLowerCase()) ||
        b.folio.toLowerCase().includes(bitacoraSearch.toLowerCase()) ||
        b.alumnoGrupo.toLowerCase().includes(bitacoraSearch.toLowerCase());
      
      const matchesStatus = 
        bitacoraStatusFilter === "todos" ? true : (b.status || "abierto") === bitacoraStatusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bitacoras, bitacoraSearch, bitacoraStatusFilter]);

  // ==================== STATE: SEGUIMIENTO DE CLASES ====================
  const [trackingRecords, setTrackingRecords] = useState<Record<string, ClassTrackingRecord>>(() => {
    const saved = localStorage.getItem("nem_seguimiento_clases");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {};
  });

  const [totalSessionsCols, setTotalSessionsCols] = useState<number>(10);
  const [activeSessionHover, setActiveSessionHover] = useState<{ groupId: string; sessionNum: number } | null>(null);

  useEffect(() => {
    localStorage.setItem("nem_seguimiento_clases", JSON.stringify(trackingRecords));
  }, [trackingRecords]);

  const getCompletedSessionsForGroup = (grp: EscolarGroup, record?: ClassTrackingRecord): number[] => {
    if (!record) return [];
    const planKey = grp.syncedPlanId || record.syncedPlanId || "default";
    if (record.planCompletedSessions && record.planCompletedSessions[planKey] !== undefined) {
      return record.planCompletedSessions[planKey];
    }
    return record.completedSessions || [];
  };

  const handleToggleSession = (groupId: string, sessionNum: number) => {
    const grp = grupos.find(g => g.id === groupId);
    const existing = trackingRecords[groupId] || { groupId, completedSessions: [] };
    const planKey = grp?.syncedPlanId || existing.syncedPlanId || "default";
    const currentCompleted = getCompletedSessionsForGroup(grp || { id: groupId, grado: "", grupo: "", nombreCompleto: "", estudiantes: [] }, existing);

    let updatedCompleted: number[] = [];

    if (currentCompleted.includes(sessionNum)) {
      updatedCompleted = currentCompleted.filter(s => s !== sessionNum);
    } else {
      updatedCompleted = [...currentCompleted, sessionNum].sort((a, b) => a - b);
    }

    const updatedPlanMap = {
      ...(existing.planCompletedSessions || {}),
      [planKey]: updatedCompleted
    };

    setTrackingRecords(prev => ({
      ...prev,
      [groupId]: {
        ...existing,
        syncedPlanId: planKey === "default" ? "" : planKey,
        completedSessions: updatedCompleted,
        planCompletedSessions: updatedPlanMap
      }
    }));
  };

  const handleSyncPlanToGroup = (groupId: string, planId: string) => {
    const updatedGroups = grupos.map(g => {
      if (g.id === groupId) {
        return { ...g, syncedPlanId: planId };
      }
      return g;
    });
    setGrupos(updatedGroups);

    setTrackingRecords(prev => {
      const existing = prev[groupId] || { groupId, completedSessions: [] };
      const newPlanKey = planId || "default";
      const planMap = existing.planCompletedSessions || {};

      let sessionsForNewPlan = planMap[newPlanKey];
      if (sessionsForNewPlan === undefined) {
        if (Object.keys(planMap).length === 0 && existing.completedSessions?.length > 0 && !existing.syncedPlanId) {
          sessionsForNewPlan = existing.completedSessions;
        } else {
          sessionsForNewPlan = [];
        }
      }

      const updatedPlanMap = {
        ...planMap,
        [newPlanKey]: sessionsForNewPlan
      };

      return {
        ...prev,
        [groupId]: {
          ...existing,
          syncedPlanId: planId,
          completedSessions: sessionsForNewPlan,
          planCompletedSessions: updatedPlanMap
        }
      };
    });
  };

  // ==================== STATE: EVALUACIÓN CONTINUA ====================
  const [evalData, setEvalData] = useState<Record<string, ContinuousEvalGroupData>>(() => {
    const saved = localStorage.getItem("nem_evaluacion_continua");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {};
  });

  const [showAddColumnModal, setShowAddColumnModal] = useState<boolean>(false);
  const [newColTitle, setNewColTitle] = useState<string>("Clase 1");
  const [newColMaxPoints, setNewColMaxPoints] = useState<number>(10);
  const [newColDate, setNewColDate] = useState<string>(() => new Date().toISOString().split("T")[0]);
  const [showSyncDrawer, setShowSyncDrawer] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("nem_evaluacion_continua", JSON.stringify(evalData));
  }, [evalData]);

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

  // Current Group's Evaluation State
  const currentGroupEval = useMemo(() => {
    if (!selectedGroupId) return null;
    const existing = evalData[selectedGroupId];
    const activeSyncedPlanId = existing?.syncedPlanId || selectedGroup?.syncedPlanId;
    const syncedPlan = plans.find(p => p.id === activeSyncedPlanId);

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
  }, [evalData, selectedGroupId, selectedGroup, plans]);

  // Handler to sync a planeación's lessons to evaluation columns
  const handleSyncPlanToEval = (planId: string) => {
    if (!selectedGroupId) return;
    const targetPlan = plans.find(p => p.id === planId);

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
    const currentScores = { ...(currentGroupEval?.calificaciones || {}) };

    selectedGroup.estudiantes.forEach(st => {
      const key = `${st.id}_${columnId}`;
      currentScores[key] = maxPoints;
    });

    setEvalData(prev => ({
      ...prev,
      [selectedGroupId]: {
        groupId: selectedGroupId,
        columnas: currentGroupEval?.columnas || [],
        calificaciones: currentScores
      }
    }));
  };

  // ==================== STATE: RECURSOS GENERADOS ====================
  const [recursosGuardados, setRecursosGuardados] = useState<any[]>(() => {
    const saved = localStorage.getItem("nem_recursos_generados");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });
  const [recursoToView, setRecursoToView] = useState<any | null>(null);

  const misHojas = recursosGuardados.filter(r => String(r.id).startsWith("ws_") || r.tipo_recurso === "hoja_de_trabajo");
  const misInstrumentos = recursosGuardados.filter(r => String(r.id).startsWith("ins_") || r.tipo_recurso === "instrumento_evaluacion");
  const misProgramas = recursosGuardados.filter(r => String(r.id).startsWith("prog_") || r.tipo_recurso === "programa_analitico");
  const misExamenes = recursosGuardados.filter(r => String(r.id).startsWith("exam_") || r.tipo_recurso === "examen");

  const handleDeleteRecursoLocal = (id: string) => {
    if(confirm("¿Eliminar este documento de tu organizador?")) {
      const updated = recursosGuardados.filter(r => r.id !== id);
      setRecursosGuardados(updated);
      localStorage.setItem("nem_recursos_generados", JSON.stringify(updated));
      
      const userProfileStr = localStorage.getItem("nem_secundaria_profile");
      const userId = userProfileStr ? JSON.parse(userProfileStr)?.id : null;
      if (userId) deleteRecursoGenerado(id, userId);
    }
  };
  // Search for Planeaciones
  const [planSearch, setPlanSearch] = useState<string>("");
  const filteredPlans = useMemo(() => {
    return plans.filter(p => {
      const search = planSearch.toLowerCase();
      return (
        p.disciplina.toLowerCase().includes(search) ||
        p.plan.producto.toLowerCase().includes(search) ||
        p.grado.toLowerCase().includes(search) ||
        p.contenido.toLowerCase().includes(search)
      );
    });
  }, [plans, planSearch]);
// -> VISOR DE RECURSOS DE PANTALLA COMPLETA <-
  if (recursoToView) {
    return (
      <div id="visor-recurso-container" className="space-y-6 animate-fade-in print:space-y-0">
        {/* Barra superior (Se oculta al imprimir) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-mex-maroon text-white flex items-center justify-center shadow-md shrink-0">
              <FileText className="w-6 h-6 text-mex-gold" />
            </div>
            <div>
              <h2 className="font-black text-slate-900 text-xl tracking-tight line-clamp-1">
                {recursoToView.titulo || "Documento Guardado"}
              </h2>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                {String(recursoToView.tipo_recurso).replace(/_/g, " ")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Printer className="w-4 h-4 text-mex-gold" />
              <span>Imprimir PDF</span>
            </button>
            <button
              type="button"
              onClick={() => setRecursoToView(null)}
              className="px-4 py-2.5 bg-slate-100 hover:bg-rose-100 border border-slate-300 hover:border-rose-200 text-slate-800 hover:text-rose-700 rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Cerrar Visor</span>
            </button>
          </div>
        </div>

        {/* Hoja del Documento (Es lo único que saldrá en la impresión) */}
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm print:border-none print:shadow-none print:p-0">
          <div className="prose max-w-none text-slate-800 text-sm leading-relaxed print:text-xs">
            <div className="whitespace-pre-wrap font-medium">
              {recursoToView.contenido?.markdown || recursoToView.contenido?.texto || recursoToView.contenido?.html || JSON.stringify(recursoToView.contenido, null, 2)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="organizador-escolar-container" className="space-y-6 animate-fade-in">
      
      {/* Top Banner & Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-mex-maroon text-white flex items-center justify-center shadow-md shrink-0">
            <FolderKanban className="w-6 h-6 text-mex-gold" />
          </div>
          <div>
            <h2 className="font-black text-slate-900 text-xl tracking-tight">
              Organizador Escolar
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center gap-2 self-start md:self-center shrink-0 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-mex-maroon" />
          <span>Volver al Panel</span>
        </button>
      </div>

      {/* Carpetas / Navigation Tabs */}
      <div className="bg-slate-200/80 p-1.5 rounded-2xl flex flex-wrap gap-1.5 border border-slate-300/80 shadow-xs print:hidden">
        <button
          type="button"
          onClick={() => handleTabChange("planeaciones")}
          className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase flex items-center gap-2 transition cursor-pointer ${
            activeTab === "planeaciones"
              ? "bg-white text-mex-maroon shadow-md border border-slate-200 ring-2 ring-mex-maroon/20"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <BookOpen className="w-4 h-4 text-mex-maroon" />
          <span>Mis Planeaciones ({plans.length})</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("grupos")}
          className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase flex items-center gap-2 transition cursor-pointer ${
            activeTab === "grupos"
              ? "bg-white text-mex-maroon shadow-md border border-slate-200 ring-2 ring-mex-maroon/20"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <Users className="w-4 h-4 text-blue-600" />
          <span>Mis Grupos ({grupos.length})</span>
          {userPlan === "gratuito" && <Lock className="w-3 h-3 text-slate-400 ml-1" />}
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("bitacora")}
          className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase flex items-center gap-2 transition cursor-pointer ${
            activeTab === "bitacora"
              ? "bg-white text-mex-maroon shadow-md border border-slate-200 ring-2 ring-mex-maroon/20"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-rose-600" />
          <span>Bitácora de Incidencias ({bitacoras.length})</span>
          {userPlan === "gratuito" && <Lock className="w-3 h-3 text-slate-400 ml-1" />}
        </button>

        <button onClick={() => handleTabChange("hojas")} className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase flex items-center gap-2 transition cursor-pointer ${activeTab === "hojas" ? "bg-white text-blue-600 shadow-md border border-slate-200 ring-2 ring-blue-600/20" : "text-slate-600 hover:text-slate-900 hover:bg-white/50"}`}>
          <ClipboardList className="w-4 h-4 text-blue-600" />
          <span>Mis Hojas de Trabajo</span>
        </button>

        <button onClick={() => handleTabChange("instrumentos")} className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase flex items-center gap-2 transition cursor-pointer ${activeTab === "instrumentos" ? "bg-white text-emerald-600 shadow-md border border-slate-200 ring-2 ring-emerald-600/20" : "text-slate-600 hover:text-slate-900 hover:bg-white/50"}`}>
          <BookCheck className="w-4 h-4 text-emerald-600" />
          <span>Mis Instrumentos</span>
        </button>

        <button onClick={() => handleTabChange("programas")} className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase flex items-center gap-2 transition cursor-pointer ${activeTab === "programas" ? "bg-white text-amber-600 shadow-md border border-slate-200 ring-2 ring-amber-600/20" : "text-slate-600 hover:text-slate-900 hover:bg-white/50"}`}>
          <Layers className="w-4 h-4 text-amber-600" />
          <span>Mis Programas Analíticos</span>
        </button>

        <button onClick={() => handleTabChange("examenes")} className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase flex items-center gap-2 transition cursor-pointer ${activeTab === "examenes" ? "bg-white text-purple-600 shadow-md border border-slate-200 ring-2 ring-purple-600/20" : "text-slate-600 hover:text-slate-900 hover:bg-white/50"}`}>
          <GraduationCap className="w-4 h-4 text-purple-600" />
          <span>Mis Exámenes</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("evaluacion")}
          className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase flex items-center gap-2 transition cursor-pointer ${
            activeTab === "evaluacion"
              ? "bg-white text-mex-maroon shadow-md border border-slate-200 ring-2 ring-mex-maroon/20"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <FileSpreadsheet className="w-4 h-4 text-amber-600" />
          <span>Evaluación Continua del Trabajo en Clase</span>
          {userPlan !== "platino" && (
            <span className="flex items-center gap-1 text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded font-black">
              <Gem className="w-3 h-3 text-indigo-600" /> Platino
            </span>
          )}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* FOLDER 1: MIS PLANEACIONES */}
      {/* ========================================================================= */}
      {activeTab === "planeaciones" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2 uppercase tracking-wider">
                <BookOpen className="w-5 h-5 text-mex-maroon" />
                <span>Mis Planeaciones Didácticas Guardadas</span>
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                Consulta, imprime o edita en el visor cualquier proyecto didáctico generado con Gemini.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Buscar planeación..."
                  value={planSearch}
                  onChange={(e) => setPlanSearch(e.target.value)}
                  className="pl-9 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs w-48 sm:w-64 focus:outline-none focus:border-mex-maroon font-medium"
                />
              </div>

              <button
                type="button"
                onClick={onGoToDiseno}
                className="px-3.5 py-1.5 bg-mex-maroon hover:bg-mex-maroon/90 text-white rounded-lg text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4 text-mex-gold" />
                <span>Diseñar Nueva</span>
              </button>
            </div>
          </div>

          {filteredPlans.length === 0 ? (
            <div className="p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="font-bold text-slate-700 text-sm">No se encontraron planeaciones guardadas</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Crea tus proyectos didácticos alineados a la NEM y Gemini los guardará de forma permanente en tu archivador escolar.
              </p>
              <button
                type="button"
                onClick={onGoToDiseno}
                className="mt-4 px-4 py-2 bg-mex-maroon text-white font-extrabold text-xs uppercase rounded-lg shadow-xs hover:bg-mex-maroon/90 transition"
              >
                Diseñar mi primer proyecto
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-slate-50/70 border border-slate-200 hover:border-mex-maroon/40 rounded-xl p-4 flex flex-col justify-between gap-4 transition hover:shadow-md group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="bg-mex-maroon/10 text-mex-maroon font-black text-[9px] uppercase px-2 py-0.5 rounded border border-mex-maroon/20">
                        {plan.disciplina} • Grado {plan.grado}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {new Date(plan.createdAt).toLocaleDateString("es-MX", { day: "2-digit", month: "short" })}
                      </span>
                    </div>

                    <h4 className="font-black text-sm text-slate-800 line-clamp-2 leading-snug group-hover:text-mex-maroon transition-colors">
                      {plan.plan.producto}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-2 font-medium">
                      <strong className="text-slate-700">Contenido:</strong> {plan.contenido}
                    </p>

                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold pt-1">
                      <span>Metodología: {plan.metodologia.split(" (")[0]}</span>
                      <span>•</span>
                      <span>{plan.duracionSemanas} sem.</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onDeletePlan(plan.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Eliminar planeación"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectPlan(plan)}
                      className="px-3 py-1.5 bg-mex-maroon text-white hover:bg-mex-maroon/90 font-extrabold text-[10px] uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition shadow-2xs"
                    >
                      <span>Abrir Visor / Imprimir</span>
                      <ChevronRight className="w-3.5 h-3.5 text-mex-gold" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* FOLDER 2: MIS GRUPOS */}
      {/* ========================================================================= */}
      {activeTab === "grupos" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2 uppercase tracking-wider">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Mis Grupos</span>
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                Registra tus grupos escolares de secundaria e ingresa la lista de tus estudiantes.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddGroupModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-1.5 self-start sm:self-center shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Registrar Nuevo Grupo</span>
            </button>
          </div>

          {/* Master Detail: Groups List + Students Table */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar of Groups */}
            <div className="lg:col-span-1 space-y-2">
              <span className="font-bold text-slate-600 text-[10px] uppercase tracking-wider block">
                Selecciona un Grupo ({grupos.length}):
              </span>

              {grupos.map((grp) => {
                const isSelected = selectedGroupId === grp.id;
                return (
                  <div
                    key={grp.id}
                    onClick={() => setSelectedGroupId(grp.id)}
                    className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "bg-blue-50 border-blue-500 text-blue-900 font-extrabold shadow-2xs ring-2 ring-blue-500/20"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <div>
                      <div className="font-black text-xs uppercase">
                        {grp.grado} {grp.grupo} - {grp.disciplina || "General"}
                      </div>
                      <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                        {grp.estudiantes.length} alumnos registrados
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteGroup(grp.id);
                      }}
                      className="text-slate-300 hover:text-rose-600 p-1 rounded transition"
                      title="Eliminar grupo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Selected Group Students List */}
            <div className="lg:col-span-3 space-y-4 bg-slate-50/50 p-4 rounded-xl border border-slate-200">
              {selectedGroup ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
                    <div>
                      <h4 className="font-black text-sm text-slate-900 uppercase">
                        Grupo: {selectedGroup.grado} {selectedGroup.grupo} ({selectedGroup.disciplina || "General"})
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Total de alumnos: <strong className="text-slate-800">{selectedGroup.estudiantes.length}</strong> • Turno: {selectedGroup.turno || "Matutino"}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsBatchMode(false);
                          setShowAddStudentModal(true);
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 text-blue-600" />
                        <span>Agregar estudiante</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsBatchMode(true);
                          setShowAddStudentModal(true);
                        }}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase rounded-lg transition flex items-center gap-1 cursor-pointer"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Cargar lista</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteGroup(selectedGroup.id)}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                        title="Eliminar este grupo"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                        <span>Eliminar grupo</span>
                      </button>
                    </div>
                  </div>

                  {/* Student Table */}
                  {selectedGroup.estudiantes.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 bg-white rounded-xl border border-slate-200">
                      <Users className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                      <p className="font-bold text-xs text-slate-600">Este grupo no tiene alumnos registrados aún.</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Haz clic en "Cargar lista" para copiar y pegar la lista de nombres desde Excel o Word de forma inmediata.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 text-slate-700 font-black uppercase tracking-wider text-[10px] border-b border-slate-200">
                          <tr>
                            <th className="p-3 w-12 text-center">#</th>
                            <th className="p-3">Nombre del Alumno (a)</th>
                            <th className="p-3 w-20 text-right">Acción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                          {selectedGroup.estudiantes.map((st, idx) => (
                            <tr key={st.id} className="hover:bg-slate-50 transition">
                              <td className="p-3 text-center text-slate-400 font-bold text-[11px]">
                                {idx + 1}
                              </td>
                              <td className="p-3 font-bold text-slate-900">
                                {st.nombre}
                              </td>
                              <td className="p-3 text-right">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteStudent(selectedGroup.id, st.id)}
                                  className="text-slate-300 hover:text-rose-600 p-1 rounded"
                                  title="Eliminar alumno"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-8 text-center text-slate-400">
                  <p>Selecciona un grupo a la izquierda para administrar sus alumnos.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FOLDER 3: BITÁCORA ESCOLAR */}
      {/* ========================================================================= */}
      {activeTab === "bitacora" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2 uppercase tracking-wider">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <span>Bitácora de Incidencias Escolares</span>
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Buscar alumno o folio..."
                  value={bitacoraSearch}
                  onChange={(e) => setBitacoraSearch(e.target.value)}
                  className="pl-9 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs w-48 focus:outline-none focus:border-rose-500 font-medium"
                />
              </div>

              <select
                value={bitacoraStatusFilter}
                onChange={(e) => setBitacoraStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 bg-white focus:outline-none"
              >
                <option value="todos">Todos los estatus</option>
                <option value="abierto">Abiertos</option>
                <option value="en_seguimiento">En seguimiento</option>
                <option value="concluido">Concluidos</option>
              </select>

              <button
                type="button"
                onClick={() => {
                  const limitCheck = checkBitacoraLimit(bitacoras.length, userPlan);
                  if (!limitCheck.allowed) {
                    safeTriggerPaywall({
                      type: "limit",
                      featureName: "Bitácora de Incidencias",
                      limitName: "Límite de Actas de Incidencia",
                      currentCount: bitacoras.length,
                      maxAllowed: limitCheck.maxAllowed,
                      requiredPlan: limitCheck.requiredPlan,
                      message: limitCheck.message,
                    });
                    return;
                  }
                  onGoToBitacora();
                }}
                className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Acta</span>
              </button>
            </div>
          </div>

          {filteredBitacoras.length === 0 ? (
            <div className="p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
              <ShieldAlert className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="font-bold text-slate-700 text-sm">No hay actas de incidencia en este momento</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Genera actas oficiales con folio de seguimiento y autocompletado del padrón de alumnos.
              </p>
              <button
                type="button"
                onClick={() => {
                  const limitCheck = checkBitacoraLimit(bitacoras.length, userPlan);
                  if (!limitCheck.allowed) {
                    safeTriggerPaywall({
                      type: "limit",
                      featureName: "Bitácora de Incidencias",
                      limitName: "Límite de Actas de Incidencia",
                      currentCount: bitacoras.length,
                      maxAllowed: limitCheck.maxAllowed,
                      requiredPlan: limitCheck.requiredPlan,
                      message: limitCheck.message,
                    });
                    return;
                  }
                  onGoToBitacora();
                }}
                className="mt-4 px-4 py-2 bg-rose-600 text-white font-extrabold text-xs uppercase rounded-lg shadow-xs hover:bg-rose-700 transition"
              >
                Crear nueva acta de incidencia
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBitacoras.map((b) => {
                const status = b.status || "abierto";
                return (
                  <div
                    key={b.id}
                    className="bg-slate-50 border border-slate-200 hover:border-rose-300 rounded-xl p-4 space-y-3 transition hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-[10px] text-rose-800 bg-rose-100 border border-rose-200 px-2 py-0.5 rounded uppercase">
                        Folio: {b.folio}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleToggleBitacoraStatus(b.id)}
                        className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full cursor-pointer transition ${
                          status === "concluido"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : status === "en_seguimiento"
                            ? "bg-blue-100 text-blue-800 border border-blue-300"
                            : "bg-amber-100 text-amber-800 border border-amber-300"
                        }`}
                        title="Haz clic para cambiar estatus"
                      >
                        {status === "concluido" ? "Concluido ✓" : status === "en_seguimiento" ? "En Seguimiento ⏳" : "Abierto 🔴"}
                      </button>
                    </div>

                    <div>
                      <h4 className="font-black text-sm text-slate-900 leading-tight">
                        {b.alumnoNombre}
                      </h4>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">
                        Grado y Grupo: {b.alumnoGrado} {b.alumnoGrupo} • Fecha: {b.fecha}
                      </p>
                    </div>

                    <p className="text-xs text-slate-700 line-clamp-2 bg-white p-2 rounded border border-slate-200 italic">
                      "{b.descripcionHechos}"
                    </p>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleDeleteBitacora(b.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Eliminar acta"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={onGoToBitacora}
                        className="px-3 py-1 bg-slate-900 text-white font-extrabold text-[10px] uppercase rounded flex items-center gap-1 hover:bg-slate-800"
                      >
                        <Printer className="w-3 h-3 text-mex-gold" />
                        <span>Ver / Imprimir</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* FOLDER 4: MIS HOJAS DE TRABAJO */}
      {/* ========================================================================= */}
      {activeTab === "hojas" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2 uppercase tracking-wider">
                <ClipboardList className="w-5 h-5 text-blue-600" />
                <span>Mis Hojas de Trabajo</span>
              </h3>
              <p className="text-slate-500 text-xs mt-1">Archivo de ejercicios y actividades para imprimir.</p>
            </div>
          </div>
          {misHojas.length === 0 ? (
            <div className="p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
              <ClipboardList className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="font-bold text-slate-700 text-sm">No hay hojas de trabajo generadas aún</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {misHojas.map(recurso => (
                <div key={recurso.id} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between gap-3 hover:shadow-md transition">
                  <div>
                    <span className="text-[9px] font-black text-blue-600 bg-blue-100 px-2 py-0.5 rounded uppercase">Hoja de Trabajo</span>
                    <h4 className="font-extrabold text-slate-800 text-sm mt-2 line-clamp-2">{recurso.titulo}</h4>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                    <button onClick={() => handleDeleteRecursoLocal(recurso.id)} className="text-slate-400 hover:text-rose-500 transition p-1"><Trash2 className="w-4 h-4"/></button>
<button onClick={() => setRecursoToView(recurso)} className="text-xs font-black uppercase text-blue-600 flex items-center gap-1 hover:underline cursor-pointer"><Printer className="w-3.5 h-3.5"/> Abrir / Imprimir</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* FOLDER 5: MIS INSTRUMENTOS DE EVALUACIÓN */}
      {/* ========================================================================= */}
      {activeTab === "instrumentos" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2 uppercase tracking-wider">
                <BookCheck className="w-5 h-5 text-emerald-600" />
                <span>Mis Instrumentos de Evaluación</span>
              </h3>
              <p className="text-slate-500 text-xs mt-1">Rúbricas, listas de cotejo y guías de observación.</p>
            </div>
          </div>
          {misInstrumentos.length === 0 ? (
            <div className="p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
              <BookCheck className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="font-bold text-slate-700 text-sm">No hay instrumentos guardados aún</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {misInstrumentos.map(recurso => (
                <div key={recurso.id} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between gap-3 hover:shadow-md transition">
                  <div>
                    <span className="text-[9px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded uppercase">Instrumento de Evaluación</span>
                    <h4 className="font-extrabold text-slate-800 text-sm mt-2 line-clamp-2">{recurso.titulo}</h4>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                    <button onClick={() => handleDeleteRecursoLocal(recurso.id)} className="text-slate-400 hover:text-rose-500 transition p-1"><Trash2 className="w-4 h-4"/></button>
                    <button onClick={() => setRecursoToView(recurso)} className="text-xs font-black uppercase text-emerald-600 flex items-center gap-1 hover:underline cursor-pointer"><Printer className="w-3.5 h-3.5"/> Abrir / Imprimir</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* FOLDER 6: MIS PROGRAMAS ANALÍTICOS */}
      {/* ========================================================================= */}
      {activeTab === "programas" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2 uppercase tracking-wider">
                <Layers className="w-5 h-5 text-amber-600" />
                <span>Mis Programas Analíticos</span>
              </h3>
              <p className="text-slate-500 text-xs mt-1">Diseño curricular, contextualización y codiseño.</p>
            </div>
          </div>
          {misProgramas.length === 0 ? (
            <div className="p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
              <Layers className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="font-bold text-slate-700 text-sm">No hay programas analíticos guardados aún</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {misProgramas.map(recurso => (
                <div key={recurso.id} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between gap-3 hover:shadow-md transition">
                  <div>
                    <span className="text-[9px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded uppercase">Programa Analítico</span>
                    <h4 className="font-extrabold text-slate-800 text-sm mt-2 line-clamp-2">{recurso.titulo}</h4>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                    <button onClick={() => handleDeleteRecursoLocal(recurso.id)} className="text-slate-400 hover:text-rose-500 transition p-1"><Trash2 className="w-4 h-4"/></button>
                    <button onClick={() => setRecursoToView(recurso)} className="text-xs font-black uppercase text-amber-600 flex items-center gap-1 hover:underline cursor-pointer"><Printer className="w-3.5 h-3.5"/> Abrir / Imprimir</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* FOLDER 7: MIS EXÁMENES */}
      {/* ========================================================================= */}
      {activeTab === "examenes" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2 uppercase tracking-wider">
                <GraduationCap className="w-5 h-5 text-purple-600" />
                <span>Mis Exámenes</span>
              </h3>
              <p className="text-slate-500 text-xs mt-1">Pruebas trimestrales, diagnósticas y claves docentes.</p>
            </div>
          </div>
          {misExamenes.length === 0 ? (
            <div className="p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
              <GraduationCap className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="font-bold text-slate-700 text-sm">No hay exámenes guardados aún</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {misExamenes.map(recurso => (
                <div key={recurso.id} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between gap-3 hover:shadow-md transition">
                  <div>
                    <span className="text-[9px] font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded uppercase">Examen / Prueba</span>
                    <h4 className="font-extrabold text-slate-800 text-sm mt-2 line-clamp-2">{recurso.titulo}</h4>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                    <button onClick={() => handleDeleteRecursoLocal(recurso.id)} className="text-slate-400 hover:text-rose-500 transition p-1"><Trash2 className="w-4 h-4"/></button>
                    <button onClick={() => setRecursoToView(recurso)} className="text-xs font-black uppercase text-purple-600 flex items-center gap-1 hover:underline cursor-pointer"><Printer className="w-3.5 h-3.5"/> Abrir / Imprimir</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* FOLDER 5: EVALUACIÓN CONTINUA (GOOGLE SHEETS STYLE) */}
      {/* ========================================================================= */}
      {activeTab === "evaluacion" && (
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
                  {grupos.map(g => (
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
            </div>
          </div>

          {/* Desplegable de Sincronización con Planeación Didáctica */}
          {showSyncDrawer && selectedGroup && (
            <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-2xl space-y-3 animate-fade-in text-xs">
              <div className="flex items-center justify-between">
                <span className="font-black text-amber-950 uppercase tracking-wider text-[11px] flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-amber-700" />
                  <span>Seleccionar Planeación Didáctica</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowSyncDrawer(false)}
                  className="text-slate-400 hover:text-slate-700 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                <select
                  value={currentGroupEval?.syncedPlanId || ""}
                  onChange={(e) => handleSyncPlanToEval(e.target.value)}
                  className="w-full p-2.5 border border-amber-300 bg-white rounded-xl font-bold text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
                >
                  <option value="">-- Sin planeación vinculada (Evaluación Libre) --</option>
                  {plans.map(p => {
                    const sessionCount = p.plan?.fases ? p.plan.fases.flatMap(f => f.sesiones).length : 0;
                    return (
                      <option key={p.id} value={p.id}>
                        {p.plan?.producto || p.contenido || "Planeación"} ({sessionCount} clases)
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Detalles de la planeación seleccionada en renglón separado sin desbordamientos */}
              {currentGroupEval?.syncedPlanId && (() => {
                const activePlan = plans.find(p => p.id === currentGroupEval.syncedPlanId);
                if (!activePlan) return null;
                const totalSessions = activePlan.plan?.fases ? activePlan.plan.fases.flatMap(f => f.sesiones).length : 0;

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

                    {activePlan.contenido && (
                      <div className="text-[11px] text-slate-600 font-medium leading-tight break-words whitespace-normal pt-0.5">
                        <strong className="text-slate-800">Contenido:</strong> {activePlan.contenido}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

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
              {/* Google Sheets Interactive Spreadsheet Table */}
              <div className="overflow-x-auto border border-slate-300 rounded-xl shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-900 text-white font-black uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3 w-10 text-center border-r border-slate-800">#</th>
                      <th className="p-3 min-w-[200px] border-r border-slate-800">Nombre del Alumno</th>

                      {currentGroupEval?.columnas.map((col) => (
                        <th key={col.id} className="p-2 min-w-[150px] max-w-[200px] border-r border-slate-800 text-center">
                          <div className="flex items-center justify-between gap-1 mb-1">
                            {/* Editable Fecha de Implementación (Permite fechas futuras) */}
                            <input
                              type="date"
                              value={formatDateForInput(col.fecha)}
                              onChange={(e) => handleUpdateColumnDate(col.id, e.target.value)}
                              title="Fecha de implementación (puedes seleccionar cualquier fecha a futuro)"
                              className="bg-slate-800 text-amber-300 font-extrabold text-[10px] px-1.5 py-0.5 rounded border border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
                            />

                            <button
                              type="button"
                              onClick={() => handleDeleteCol(col.id)}
                              className="text-slate-500 hover:text-rose-400 font-normal text-[10px] px-1"
                              title="Eliminar esta clase/columna"
                            >
                              ✕
                            </button>
                          </div>

                          <span
                            className="block text-white font-extrabold text-[11px] leading-tight mb-1 truncate px-0.5"
                            title={col.titulo}
                          >
                            {col.titulo}
                          </span>

                          <div className="mt-1 flex items-center justify-center gap-1.5">
                            {/* Editable Puntaje Máximo */}
                            <div className="flex items-center gap-1 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700">
                              <span className="text-[9px] text-amber-200/80 font-bold">Max:</span>
                              <input
                                type="number"
                                min={1}
                                max={100}
                                value={col.puntosMaximos}
                                onChange={(e) => handleUpdateColumnMaxPoints(col.id, Number(e.target.value))}
                                className="w-10 text-center bg-slate-900 text-amber-300 font-black text-[10px] py-0.2 rounded border border-slate-700 focus:outline-none focus:border-amber-400"
                                title="Editar puntaje máximo asignable a esta clase"
                              />
                              <span className="text-[9px] text-amber-200/80 font-bold">pts</span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleBatchCheckColumn(col.id, col.puntosMaximos)}
                              className="text-[8px] bg-slate-800 hover:bg-slate-700 px-1.5 py-1 rounded text-slate-300 font-bold cursor-pointer"
                              title="Marcar a todos los alumnos con el puntaje máximo"
                            >
                              ✓ Todos
                            </button>
                          </div>
                        </th>
                      ))}

                      <th className="p-3 min-w-[120px] bg-amber-950 text-amber-200 text-center font-black text-xs">
                        SUMA TOTAL (Pts)
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200 font-semibold text-slate-800 bg-white">
                    {selectedGroup.estudiantes.map((st, idx) => {
                      // Calculate sum for this student
                      let totalPoints = 0;
                      let maxPossible = 0;

                      currentGroupEval?.columnas.forEach(col => {
                        maxPossible += col.puntosMaximos;
                        const key = `${st.id}_${col.id}`;
                        totalPoints += (currentGroupEval.calificaciones[key] || 0);
                      });

                      const pctScore = maxPossible > 0 ? Math.round((totalPoints / maxPossible) * 100) : 0;

                      return (
                        <tr key={st.id} className="hover:bg-amber-50/40 transition">
                          <td className="p-3 text-center text-slate-400 font-bold text-[11px] border-r border-slate-200 bg-slate-50">
                            {idx + 1}
                          </td>
                          <td className="p-3 font-extrabold text-slate-900 border-r border-slate-200 bg-slate-50/80">
                            {st.nombre}
                          </td>

                          {currentGroupEval?.columnas.map((col) => {
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
                                      isFullScore
                                        ? "bg-amber-500 text-white shadow-2xs"
                                        : score > 0
                                        ? "bg-amber-100 text-amber-900 border border-amber-300"
                                        : "bg-slate-100 text-slate-300 hover:bg-slate-200"
                                    }`}
                                    title="Haz clic para asignar el puntaje máximo o desmarcar"
                                  >
                                    ✓
                                  </button>

                                  <input
                                    type="number"
                                    min="0"
                                    max={col.puntosMaximos * 2}
                                    value={score}
                                    onChange={(e) => handleScoreChange(st.id, col.id, Number(e.target.value))}
                                    className="w-12 text-center py-0.5 border border-slate-200 rounded font-black text-xs focus:outline-none focus:border-amber-500"
                                    title="Puntaje asignado"
                                  />
                                </div>
                              </td>
                            );
                          })}

                          {/* Realtime Sum Total Column */}
                          <td className="p-3 text-center bg-amber-50 font-black text-xs text-amber-950 border-l border-amber-200">
                            <span className="text-sm text-amber-900 font-extrabold block">
                              {totalPoints} pts
                            </span>
                            <span className="text-[9px] text-amber-700 block font-bold">
                              ({pctScore}% de {maxPossible} max)
                            </span>
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
      )}

      {/* ========================================================================= */}
      {/* MODAL: REGISTRAR NUEVO GRUPO */}
      {/* ========================================================================= */}
      {showAddGroupModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base uppercase tracking-wider flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Registrar Nuevo Grupo</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddGroupModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateGroup} className="space-y-4 text-xs font-semibold text-slate-700">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-800">Grado Escolar:</label>
                  <select
                    value={newGroupData.grado}
                    onChange={(e) => setNewGroupData({ ...newGroupData, grado: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg bg-white font-bold focus:outline-none"
                  >
                    <optgroup label="Preescolar">
                      <option value="1º Preescolar">1º de Preescolar</option>
                      <option value="2º Preescolar">2º de Preescolar</option>
                      <option value="3º Preescolar">3º de Preescolar</option>
                    </optgroup>
                    <optgroup label="Primaria">
                      <option value="1º Primaria">1º de Primaria</option>
                      <option value="2º Primaria">2º de Primaria</option>
                      <option value="3º Primaria">3º de Primaria</option>
                      <option value="4º Primaria">4º de Primaria</option>
                      <option value="5º Primaria">5º de Primaria</option>
                      <option value="6º Primaria">6º de Primaria</option>
                    </optgroup>
                    <optgroup label="Secundaria">
                      <option value="1º Secundaria">1º de Secundaria</option>
                      <option value="2º Secundaria">2º de Secundaria</option>
                      <option value="3º Secundaria">3º de Secundaria</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-slate-800">Grupo:</label>
                  <input
                    type="text"
                    required
                    value={newGroupData.grupo}
                    onChange={(e) => setNewGroupData({ ...newGroupData, grupo: e.target.value.toUpperCase() })}
                    placeholder="Ej. A, B, C"
                    className="w-full p-2 border border-slate-300 rounded-lg font-bold uppercase focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-slate-800">Asignatura / Disciplina:</label>
                <input
                  type="text"
                  required
                  value={newGroupData.disciplina}
                  onChange={(e) => setNewGroupData({ ...newGroupData, disciplina: e.target.value })}
                  placeholder="Ej. Español, Matemáticas, Historia, Ciencias"
                  className="w-full p-2 border border-slate-300 rounded-lg font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-800">Turno:</label>
                <select
                  value={newGroupData.turno}
                  onChange={(e) => setNewGroupData({ ...newGroupData, turno: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-white font-bold focus:outline-none"
                >
                  <option value="Matutino">Matutino</option>
                  <option value="Vespertino">Vespertino</option>
                  <option value="Nocturno">Nocturno</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddGroupModal(false)}
                  className="px-3.5 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase rounded-xl shadow-xs"
                >
                  Guardar Grupo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: AGREGAR ESTUDIANTE(S) */}
      {/* ========================================================================= */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base uppercase tracking-wider flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-600" />
                <span>Registrar Alumnos ({selectedGroup?.nombreCompleto})</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddStudentModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex gap-2 bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setIsBatchMode(false)}
                className={`flex-1 py-1.5 rounded-lg transition ${!isBatchMode ? "bg-white shadow-xs text-blue-900" : "text-slate-600"}`}
              >
                Ingreso Individual
              </button>
              <button
                type="button"
                onClick={() => setIsBatchMode(true)}
                className={`flex-1 py-1.5 rounded-lg transition ${isBatchMode ? "bg-white shadow-xs text-blue-900" : "text-slate-600"}`}
              >
                Pegar Lista Completa (Lote)
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-4 text-xs font-semibold text-slate-700">
              {isBatchMode ? (
                <div>
                  <label className="block mb-1 text-slate-800">
                    Pega los nombres de los alumnos (un nombre por renglón):
                  </label>
                  <textarea
                    rows={8}
                    value={batchStudentText}
                    onChange={(e) => setBatchStudentText(e.target.value)}
                    placeholder={`Aguilar Morales Carlos\nBenítez Castro Sofía\nCastillo Gómez Diego\n...`}
                    className="w-full p-3 border border-slate-300 rounded-xl font-mono text-xs focus:outline-none focus:border-blue-500"
                  />
                  <span className="text-[10px] text-slate-400 font-medium block mt-1">
                    Tip: Puedes copiar la columna de nombres desde Excel o Word y pegarla aquí directamente.
                  </span>
                </div>
              ) : (
                <div>
                  <label className="block mb-1 text-slate-800">Nombre Completo del Alumno:</label>
                  <input
                    type="text"
                    required
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    placeholder="Apellidos y Nombre(s)"
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-bold focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-3.5 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase rounded-xl shadow-xs"
                >
                  Agregar a la Lista
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: AGREGAR CLASE O ELEMENTO A EVALUAR */}
      {showAddColumnModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-600" />
                <span>Agregar Clase / Elemento a Evaluar</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddColumnModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCol} className="space-y-4 text-xs font-semibold text-slate-700">
              <div>
                <label className="block mb-1 text-slate-800">
                  Título de la Clase o Elemento a Evaluar:
                </label>
                <input
                  type="text"
                  required
                  value={newColTitle}
                  onChange={(e) => setNewColTitle(e.target.value)}
                  placeholder="Ej. Clase 1: Resumen de lectura"
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-bold focus:outline-none focus:border-amber-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-800">
                  Escala de Evaluación Numérica (Puntaje Máximo):
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  max={100}
                  value={newColMaxPoints}
                  onChange={(e) => setNewColMaxPoints(Number(e.target.value))}
                  placeholder="10"
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-bold focus:outline-none focus:border-amber-500 text-slate-900"
                />
                <span className="text-[10px] text-slate-400 font-medium block mt-1">
                  Puntaje o valor máximo asignado a esta actividad (ej. 10 puntos, 5 puntos, etc.)
                </span>
              </div>

              <div>
                <label className="block mb-1 text-slate-800">
                  Fecha de Implementación (puedes programar fechas futuras):
                </label>
                <input
                  type="date"
                  required
                  value={newColDate}
                  onChange={(e) => setNewColDate(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-bold focus:outline-none focus:border-amber-500 text-slate-900 bg-white"
                />
                <span className="text-[10px] text-slate-400 font-medium block mt-1">
                  Selecciona la fecha de impartición de esta clase (presente o futura).
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddColumnModal(false)}
                  className="px-3.5 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-black uppercase rounded-xl shadow-xs transition"
                >
                  Guardar Clase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CONFIRMAR ELIMINAR GRUPO */}
      {groupToDeleteId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider">
                  Eliminar Grupo
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Esta acción no se puede deshacer.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-700 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
              ¿Estás seguro de que deseas eliminar este grupo y a todos sus alumnos registrados?
            </p>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setGroupToDeleteId(null)}
                className="px-3.5 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDeleteGroup}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase rounded-xl shadow-xs transition cursor-pointer"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
