import React, { useState, useEffect, useMemo } from "react";
import { 
  FileText, ShieldAlert, Users, Search, Plus, Trash2, Printer, 
  ArrowLeft, Calendar, Lock, CheckCircle2 
} from "lucide-react";
import AccionesDocumento from "./AccionesDocumento";
import { BitacoraIncidencia, StudentPadronItem, UserSubscription, PaywallReason } from "../types";
import { checkBitacoraLimit, checkFeatureAccess } from "../utils/planManager";
import { 
  getIncidencias as fetchSupabaseIncidencias,
  insertIncidencia as insertSupabaseIncidencia,
  deleteIncidencia as deleteSupabaseIncidencia,
  getAlumnos as fetchSupabaseAlumnos,
  saveAlumno as saveSupabaseAlumno,
  isSupabaseConfigured
} from "../utils/supabaseClient";

interface BitacoraIncidenciaViewProps {
  onBack: () => void;
  escuelaName: string;
  cct: string;
  docenteName: string;
  escuelas?: Array<{ escuelaName: string; cct: string }>;
  subscription?: UserSubscription;
  onTriggerPaywall?: (reason: PaywallReason) => void;
}

const GRADOS_NIVELES = [
  {
    nivel: "Preescolar",
    grados: ["1º de Preescolar", "2º de Preescolar", "3º de Preescolar"]
  },
  {
    nivel: "Primaria",
    grados: [
      "1º de Primaria",
      "2º de Primaria",
      "3º de Primaria",
      "4º de Primaria",
      "5º de Primaria",
      "6º de Primaria"
    ]
  },
  {
    nivel: "Secundaria",
    grados: ["1º de Secundaria", "2º de Secundaria", "3º de Secundaria"]
  }
];

const LUGARES_INCIDENCIA = [
  "Aula",
  "Patio",
  "Cancha",
  "Baños",
  "Pasillos",
  "Entrada/Salida",
  "Taller/Laboratorio",
  "Otro",
];

const TIPOS_INCIDENCIA = [
  "Falta de respeto al personal escolar",
  "Agresión verbal",
  "Agresión física",
  "Acoso escolar (bullying)",
  "Ciberacoso",
  "Daño a instalaciones o mobiliario",
  "Daño a pertenencias ajenas",
  "Uso inadecuado de dispositivos electrónicos",
  "Incumplimiento de actividades escolares",
  "Conducta disruptiva en clase",
  "Lenguaje ofensivo o discriminatorio",
  "Riesgo para la integridad propia o de terceros",
  "Ausencia injustificada reiterada",
  "Otro",
];

const ACCIONES_INMEDIATAS = [
  "Llamado de atención verbal",
  "Diálogo con el alumno",
  "Cambio de lugar",
  "Trabajo restaurativo",
  "Canalización a orientación",
  "Canalización a trabajo social",
  "Notificación a prefectura",
  "Notificación a dirección",
  "Notificación a madre, padre o tutor",
  "Otro",
];

const EVIDENCIAS_ANEXAS = [
  "Fotografías",
  "Capturas de pantalla",
  "Testimonios",
  "Reporte médico",
  "Otro",
];

// Helper to generate custom folio from teacher initials, group, and count
const generateFolio = (docenteName: string, grado: string, grupo: string, count: number): string => {
  let initials = "DOC";
  if (docenteName && docenteName.trim()) {
    const clean = docenteName.trim().replace(/^(profr?|profra|mtro|mtra|dr|dra|lic)\.?\s+/i, "");
    const words = clean.split(/\s+/).filter(w => w.length > 0 && !["de", "del", "la", "los", "las", "y"].includes(w.toLowerCase()));
    if (words.length === 1) {
      initials = words[0].substring(0, 2).toUpperCase();
    } else if (words.length >= 2) {
      initials = words.map(w => w[0].toUpperCase()).slice(0, 3).join("");
    }
  }

  const gradeDigit = (grado || "").match(/\d+/)?.[0] || "1";
  const groupLetter = (grupo || "A").trim().replace(/[^a-zA-Z0-9]/g, "").toUpperCase().substring(0, 2) || "A";
  const groupCode = `${gradeDigit}${groupLetter}`;
  const numStr = String(count + 1).padStart(3, "0");

  return `${initials}${groupCode}${numStr}`;
};

export default function BitacoraIncidenciaView({
  onBack,
  escuelaName: initialEscuela,
  cct: initialCct,
  docenteName: initialDocente,
  escuelas = [],
  subscription,
  onTriggerPaywall,
}: BitacoraIncidenciaViewProps) {
  const userPlan = subscription?.plan || "gratuito";
  const safeTriggerPaywall = onTriggerPaywall || (() => {});

  // Multi-school selection support
  const [selectedEscuela, setSelectedEscuela] = useState(initialEscuela || "Escuela Educación Básica");
  const [selectedCct, setSelectedCct] = useState(initialCct || "CCT Sin Registrar");

  useEffect(() => {
    if (escuelas && escuelas.length > 0) {
      const matched = escuelas.find(e => e.escuelaName === selectedEscuela);
      if (matched) {
        setSelectedCct(matched.cct);
      }
    }
  }, [selectedEscuela, escuelas]);

  // Saved bitácoras in localStorage
  const [bitacoras, setBitacoras] = useState<BitacoraIncidencia[]>(() => {
    const saved = localStorage.getItem("nem_bitacoras_incidencias");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const saveBitacorasToStorage = (updated: BitacoraIncidencia[]) => {
    setBitacoras(updated);
    localStorage.setItem("nem_bitacoras_incidencias", JSON.stringify(updated));
  };

  // Student Padron stored in localStorage
  const [studentPadron, setStudentPadron] = useState<StudentPadronItem[]>(() => {
    const saved = localStorage.getItem("nem_padron_alumnos");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      { id: "1", nombre: "Álvarez García Mateo", grado: "1º de Secundaria", grupo: "A", padreTutor: "Carlos Álvarez", telefonoPadre: "555-123-4567" },
      { id: "2", nombre: "Benítez Mendoza Sofía", grado: "1º de Secundaria", grupo: "A", padreTutor: "Martha Mendoza", telefonoPadre: "555-234-5678" },
      { id: "3", nombre: "Castillo Hernández Santiago", grado: "2º de Secundaria", grupo: "B", padreTutor: "Roberto Castillo", telefonoPadre: "555-345-6789" },
      { id: "4", nombre: "Díaz Flores Camila", grado: "3º de Secundaria", grupo: "A", padreTutor: "Elena Flores", telefonoPadre: "555-456-7890" },
      { id: "5", nombre: "Espinosa Ruiz Leonardo", grado: "1º de Secundaria", grupo: "B", padreTutor: "Javier Espinosa", telefonoPadre: "555-567-8901" }
    ];
  });

  const savePadronToStorage = (updated: StudentPadronItem[]) => {
    setStudentPadron(updated);
    localStorage.setItem("nem_padron_alumnos", JSON.stringify(updated));
  };

  // Synchronize students from Formato de Evaluación saved state if available
  useEffect(() => {
    const savedEval = localStorage.getItem("nem_formato_evaluacion_state");
    if (savedEval) {
      try {
        const parsed = JSON.parse(savedEval);
        if (parsed.students && Array.isArray(parsed.students)) {
          const evalStudents: StudentPadronItem[] = parsed.students.map((s: any, idx: number) => ({
            id: `eval_${idx}_${s.id}`,
            nombre: s.name,
            grado: parsed.grado || "1º de Secundaria",
            grupo: parsed.grupo || "A",
          }));

          setStudentPadron((prev) => {
            const existingNames = new Set(prev.map((p) => p.nombre.toLowerCase().trim()));
            const newItems = evalStudents.filter((s) => !existingNames.has(s.nombre.toLowerCase().trim()));
            if (newItems.length > 0) {
              const merged = [...prev, ...newItems];
              localStorage.setItem("nem_padron_alumnos", JSON.stringify(merged));
              return merged;
            }
            return prev;
          });
        }
      } catch (e) {
        console.error("Error loading students from evaluation format:", e);
      }
    }
  }, []);

  // Supabase Load Effect on mount
  useEffect(() => {
    const userProfileStr = localStorage.getItem("nem_secundaria_profile");
        const userProfile = userProfileStr ? JSON.parse(userProfileStr) : null;
        const userId = userProfile?.id;
        if (!userId) return;);

    if (isSupabaseConfigured) {
      // Fetch Alumnos from Supabase
      fetchSupabaseAlumnos(userId).then(dbAlumnos => {
        if (dbAlumnos && dbAlumnos.length > 0) {
          setStudentPadron(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const newOnes = dbAlumnos
              .filter(a => !existingIds.has(a.id))
              .map(a => ({
                id: a.id,
                nombre: a.nombre_completo,
                grado: "1º de Secundaria",
                grupo: "A"
              }));
            if (newOnes.length > 0) {
              const updated = [...prev, ...newOnes];
              localStorage.setItem("nem_padron_alumnos", JSON.stringify(updated));
              return updated;
            }
            return prev;
          });
        }
      }).catch(err => console.warn("Supabase alumnos load error:", err));

      // Fetch Incidencias from Supabase
      fetchSupabaseIncidencias(userId).then(dbIncidencias => {
        if (dbIncidencias && dbIncidencias.length > 0) {
          const parsedBitacoras: BitacoraIncidencia[] = dbIncidencias.map(inc => {
            try {
              const parsed = JSON.parse(inc.descripcion);
              if (parsed && typeof parsed === 'object' && parsed.folio) {
                return { ...parsed, id: inc.id };
              }
            } catch (e) {}
            return {
              id: inc.id,
              folio: `FOL-${inc.id.slice(-4).toUpperCase()}`,
              createdAt: inc.created_at || inc.fecha,
              updatedAt: inc.created_at || inc.fecha,
              escuela: selectedEscuela,
              cct: selectedCct,
              turno: "Matutino",
              cicloEscolar: "2025-2026",
              fecha: inc.fecha,
              hora: "10:00",
              lugar: "Aula",
              docenteReporta: initialDocente || "Docente Titular",
              alumnoNombre: inc.alumno_id || "Alumno Registrado",
              alumnoGrado: "1º de Secundaria",
              alumnoGrupo: "A",
              otrosInvolucrados: "",
              tiposIncidencia: [inc.categoria],
              descripcionHechos: inc.descripcion,
              accionesInmediatas: [],
              compromisoAlumno: "",
              compromisoPadre: "",
              compromisoEscuela: ""
            };
          });
          setBitacoras(parsedBitacoras);
          localStorage.setItem("nem_bitacoras_incidencias", JSON.stringify(parsedBitacoras));
        }
      }).catch(err => console.warn("Supabase incidencias load error:", err));
    }
  }, []);

  // View mode: "form" | "list" | "print"
  const [viewMode, setViewMode] = useState<"form" | "list" | "print">("form");
  const [selectedBitacoraId, setSelectedBitacoraId] = useState<string | null>(null);

  // Form State
  const [turno, setTurno] = useState("Matutino");
  const [cicloEscolar, setCicloEscolar] = useState("2025-2026");
  
  // I. Datos Generales
  const [fecha, setFecha] = useState(() => new Date().toISOString().split("T")[0]);
  const [hora, setHora] = useState(() => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  });
  const [lugar, setLugar] = useState("Aula");
  const [lugarOtro, setLugarOtro] = useState("");
  const docenteReporta = initialDocente || "Docente Titular";
  
  // Alumno Involucrado
  const [alumnoNombre, setAlumnoNombre] = useState("");
  const [alumnoGrado, setAlumnoGrado] = useState("1º de Secundaria");
  const [alumnoGrupo, setAlumnoGrupo] = useState("A");
  const [otrosInvolucrados, setOtrosInvolucrados] = useState("");

  // Auto-generated Folio
  const [folio, setFolio] = useState(() => generateFolio(docenteReporta, "1º de Secundaria", "A", bitacoras.length));

  // Auto-update folio when grade/group changes for new bitácora
  useEffect(() => {
    if (!selectedBitacoraId) {
      setFolio(generateFolio(docenteReporta, alumnoGrado, alumnoGrupo, bitacoras.length));
    }
  }, [docenteReporta, alumnoGrado, alumnoGrupo, bitacoras.length, selectedBitacoraId]);

  // Student search autocomplete state
  const [studentSearchTerm, setStudentSearchTerm] = useState("");
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);

  // Padron Manager Modal State
  const [showPadronModal, setShowPadronModal] = useState(false);
  const [bulkPadronText, setBulkPadronText] = useState("");
  const [padronGrado, setPadronGrado] = useState("1º de Secundaria");
  const [padronGrupo, setPadronGrupo] = useState("A");

  // II. Tipo de Incidencia
  const [tiposIncidencia, setTiposIncidencia] = useState<string[]>([]);
  const [tipoIncidenciaOtro, setTipoIncidenciaOtro] = useState("");

  // III. Descripción Objetiva
  const [descripcionHechos, setDescripcionHechos] = useState("");

  // IV. Acciones Inmediatas
  const [accionesInmediatas, setAccionesInmediatas] = useState<string[]>([]);
  const [accionesOtro, setAccionesOtro] = useState("");

  // V. Acuerdos y Compromisos
  const [compromisoAlumno, setCompromisoAlumno] = useState("");
  const [compromisoPadre, setCompromisoPadre] = useState("");
  const [compromisoEscuela, setCompromisoEscuela] = useState("");

  // Search filter for List View
  const [searchTerm, setSearchTerm] = useState("");

  // Autocomplete student list filtering
  const matchingStudents = useMemo(() => {
    if (!studentSearchTerm || studentSearchTerm.trim().length < 2) return [];
    const term = studentSearchTerm.toLowerCase().trim();
    return studentPadron.filter(
      (s) => s.nombre.toLowerCase().includes(term) || s.grupo.toLowerCase().includes(term)
    );
  }, [studentSearchTerm, studentPadron]);

  // Handle student selection from autocomplete
  const handleSelectStudent = (student: StudentPadronItem) => {
    setAlumnoNombre(student.nombre);
    setAlumnoGrado(student.grado);
    setAlumnoGrupo(student.grupo);
    setStudentSearchTerm(student.nombre);
    setShowStudentDropdown(false);
  };

  // Toggle Checkboxes Helper
  const toggleArrayItem = (list: string[], setList: (val: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  // Reset form for a new bitácora
  const handleNewBitacora = () => {
    const access = checkFeatureAccess("bitacora", userPlan);
    if (!access.allowed) {
      safeTriggerPaywall({
        type: "feature",
        featureName: "Bitácora de Incidencias Escolares",
        requiredPlan: "basico",
        message: access.message
      });
      return;
    }

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

    setSelectedBitacoraId(null);
    const newFolio = generateFolio(docenteReporta, "1º de Secundaria", "A", bitacoras.length);
    setFolio(newFolio);
    setFecha(new Date().toISOString().split("T")[0]);
    const now = new Date();
    setHora(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
    setLugar("Aula");
    setLugarOtro("");
    setAlumnoNombre("");
    setStudentSearchTerm("");
    setAlumnoGrado("1º de Secundaria");
    setAlumnoGrupo("A");
    setOtrosInvolucrados("");
    setTiposIncidencia([]);
    setTipoIncidenciaOtro("");
    setDescripcionHechos("");
    setAccionesInmediatas([]);
    setAccionesOtro("");
    setCompromisoAlumno("");
    setCompromisoPadre("");
    setCompromisoEscuela("");
    setViewMode("form");
  };

  // Edit existing bitácora
  const handleEditBitacora = (item: BitacoraIncidencia) => {
    setSelectedBitacoraId(item.id);
    setFolio(item.folio);
    setSelectedEscuela(item.escuela);
    setSelectedCct(item.cct);
    setTurno(item.turno || "Matutino");
    setCicloEscolar(item.cicloEscolar);
    setFecha(item.fecha);
    setHora(item.hora);
    setLugar(item.lugar);
    setLugarOtro(item.lugarOtro || "");
    setAlumnoNombre(item.alumnoNombre);
    setStudentSearchTerm(item.alumnoNombre);
    setAlumnoGrado(item.alumnoGrado);
    setAlumnoGrupo(item.alumnoGrupo);
    setOtrosInvolucrados(item.otrosInvolucrados || "");
    setTiposIncidencia(item.tiposIncidencia || []);
    setTipoIncidenciaOtro(item.tipoIncidenciaOtro || "");
    setDescripcionHechos(item.descripcionHechos);
    setAccionesInmediatas(item.accionesInmediatas || []);
    setAccionesOtro(item.accionesOtro || "");
    setCompromisoAlumno(item.compromisoAlumno);
    setCompromisoPadre(item.compromisoPadre);
    setCompromisoEscuela(item.compromisoEscuela);
    setViewMode("form");
  };

  // Save / Update Bitácora
  const handleSaveBitacora = async () => {
    if (!alumnoNombre.trim()) {
      alert("Por favor ingresa o selecciona el nombre del alumno involucrado.");
      return;
    }
    if (!descripcionHechos.trim()) {
      alert("Por favor completa la descripción objetiva de los hechos.");
      return;
    }

    // Check Plan Limits
    const limitCheck = checkBitacoraLimit(bitacoras.length, userPlan);
    if (!limitCheck.allowed && !selectedBitacoraId) {
      if (safeTriggerPaywall) {
        safeTriggerPaywall({
          type: "limit",
          featureName: "Bitácora Escolar de Incidencias",
          currentCount: bitacoras.length,
          maxAllowed: limitCheck.maxAllowed,
          requiredPlan: limitCheck.requiredPlan,
          message: limitCheck.message || "Has alcanzado el límite de incidencias de tu plan."
        });
      } else {
        alert(limitCheck.message);
      }
      return;
    }

    const nowIso = new Date().toISOString();
    const newBitacora: BitacoraIncidencia = {
      id: selectedBitacoraId || Math.random().toString(36).substring(2, 11),
      folio,
      createdAt: selectedBitacoraId ? (bitacoras.find(b => b.id === selectedBitacoraId)?.createdAt || nowIso) : nowIso,
      updatedAt: nowIso,
      escuela: selectedEscuela,
      cct: selectedCct,
      turno,
      cicloEscolar,
      fecha,
      hora,
      lugar,
      lugarOtro,
      docenteReporta,
      alumnoNombre,
      alumnoGrado,
      alumnoGrupo,
      otrosInvolucrados,
      tiposIncidencia,
      tipoIncidenciaOtro,
      descripcionHechos,
      accionesInmediatas,
      accionesOtro,
      compromisoAlumno,
      compromisoPadre,
      compromisoEscuela,
    };

    let updatedList: BitacoraIncidencia[];
    if (selectedBitacoraId) {
      updatedList = bitacoras.map((b) => (b.id === selectedBitacoraId ? newBitacora : b));
    } else {
      updatedList = [newBitacora, ...bitacoras];
    }

    saveBitacorasToStorage(updatedList);
    setSelectedBitacoraId(newBitacora.id);

    // Sync to Supabase
    const userProfileStr = localStorage.getItem("nem_secundaria_profile");
        const userProfile = userProfileStr ? JSON.parse(userProfileStr) : null;
        const userId = userProfile?.id;
        if (!userId) return;

    if (isSupabaseConfigured) {
      insertSupabaseIncidencia({
        id: newBitacora.id,
        user_id: userId,
        alumno_id: newBitacora.alumnoNombre,
        fecha: newBitacora.fecha,
        categoria: newBitacora.tiposIncidencia[0] || "Conducta",
        descripcion: JSON.stringify(newBitacora)
      }, userPlan).then(res => {
        if (!res.success && res.limitReached && safeTriggerPaywall) {
          safeTriggerPaywall({
            type: "limit",
            featureName: "Bitácora Escolar de Incidencias",
            currentCount: res.currentCount || 0,
            maxAllowed: res.maxAllowed || 0,
            requiredPlan: res.requiredPlan || "oro",
            message: res.error || "Límite de incidencias alcanzado."
          });
        }
      }).catch(err => console.warn("Error guardando en Supabase:", err));
    }

    alert(`¡Bitácora ${folio} guardada exitosamente!`);
  };

  // Delete Bitácora
  const handleDeleteBitacora = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("¿Estás seguro de que deseas eliminar esta bitácora de incidencia?")) {
      const updated = bitacoras.filter((b) => b.id !== id);
      saveBitacorasToStorage(updated);
      if (selectedBitacoraId === id) {
        handleNewBitacora();
      }

      // Supabase Delete
      const userProfileStr = localStorage.getItem("nem_secundaria_profile");
        const userProfile = userProfileStr ? JSON.parse(userProfileStr) : null;
        const userId = userProfile?.id;
        if (!userId) return;
      
      deleteSupabaseIncidencia(id, userId).catch(err => console.warn("Error borrando incidencia en Supabase:", err));
    }
  };

  // Bulk add students to Padron
  const handleAddBulkPadron = () => {
    if (!bulkPadronText.trim()) return;
    const lines = bulkPadronText.split("\n").filter((l) => l.trim().length > 0);
    const newItems: StudentPadronItem[] = lines.map((line, idx) => {
      const cleanName = line.replace(/^\d+[\.\-\)]\s*/, "").trim();
      return {
        id: `p_${Date.now()}_${idx}`,
        nombre: cleanName,
        grado: padronGrado,
        grupo: padronGrupo,
      };
    });

    const updated = [...studentPadron, ...newItems];
    savePadronToStorage(updated);
    setBulkPadronText("");
    setShowPadronModal(false);
    alert(`Se agregaron ${newItems.length} alumnos al padrón de ${padronGrado} ${padronGrupo}.`);
  };

  // Filtered bitacoras for list view
  const filteredBitacoras = useMemo(() => {
    return bitacoras.filter((b) => {
      return (
        b.folio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.alumnoNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.docenteReporta.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.alumnoGrupo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [bitacoras, searchTerm]);

  // Current active bitacora for print view
  const printBitacora = useMemo(() => {
    if (selectedBitacoraId) {
      return bitacoras.find((b) => b.id === selectedBitacoraId) || null;
    }
    return {
      id: "preview",
      folio,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      escuela: selectedEscuela,
      cct: selectedCct,
      turno,
      cicloEscolar,
      fecha,
      hora,
      lugar,
      lugarOtro,
      docenteReporta,
      alumnoNombre: alumnoNombre || "Nombre del Alumno",
      alumnoGrado,
      alumnoGrupo,
      otrosInvolucrados,
      tiposIncidencia,
      tipoIncidenciaOtro,
      descripcionHechos,
      accionesInmediatas,
      accionesOtro,
      compromisoAlumno,
      compromisoPadre,
      compromisoEscuela,
    } as BitacoraIncidencia;
  }, [
    selectedBitacoraId, bitacoras, folio, selectedEscuela, selectedCct, turno, cicloEscolar,
    fecha, hora, lugar, lugarOtro, docenteReporta, alumnoNombre, alumnoGrado, alumnoGrupo,
    otrosInvolucrados, tiposIncidencia, tipoIncidenciaOtro, descripcionHechos,
    accionesInmediatas, accionesOtro, compromisoAlumno, compromisoPadre, compromisoEscuela
  ]);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* HEADER PRINCIPAL Y BOTÓN DE REGRESO - Ocultos al imprimir */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 transition"
            title="Volver al Panel"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-mex-maroon/10 text-mex-maroon border border-mex-maroon/20 text-[10px] font-black uppercase tracking-wider">
                Resguardo e Incidencias
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-mex-maroon" />
              <span>Bitácora de Incidencia Escolar</span>
            </h2>
          </div>
        </div>

        {/* Acciones de Navegación */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setViewMode(viewMode === "list" ? "form" : "list")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition ${
              viewMode === "list"
                ? "bg-mex-maroon text-white shadow-md"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Consultar Registros ({bitacoras.length})</span>
          </button>
        </div>
      </div>

      {/* ==================== VISTA 1: LISTADO DE BITÁCORAS GUARDADAS ==================== */}
      {viewMode === "list" && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por folio, alumno, o grupo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-mex-maroon/20"
              />
            </div>
          </div>

          {filteredBitacoras.length === 0 ? (
            <div className="text-center py-12 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 space-y-3">
              <ShieldAlert className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-slate-600 text-sm font-bold">
                No se encontraron bitácoras de incidencia registradas.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBitacoras.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleEditBitacora(item)}
                  className="group bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-mex-maroon rounded-2xl p-5 transition-all shadow-2xs hover:shadow-md cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs text-mex-maroon bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-lg">
                        {item.folio}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.fecha}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-mex-maroon transition line-clamp-1">
                      {item.alumnoNombre}
                    </h4>

                    <p className="text-slate-500 text-xs font-semibold">
                      {item.alumnoGrado} - Grupo {item.alumnoGrupo} • Turno {item.turno}
                    </p>

                    <div className="text-[11px] text-slate-600 font-medium line-clamp-2 bg-white/80 p-2 rounded-lg border border-slate-100">
                      {item.descripcionHechos}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditBitacora(item);
                        setViewMode("print");
                      }}
                      className="text-mex-maroon font-bold hover:underline flex items-center gap-1"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Imprimir PDF</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleDeleteBitacora(item.id, e)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition hover:bg-rose-50 rounded-lg"
                      title="Eliminar registro"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ==================== VISTA 2: FORMULARIO DE CAPTURA ==================== */}
      {viewMode === "form" && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-8">
          
          {/* ENCABEZADO DE LA ESCUELA */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <div className="border-b border-slate-200/80 pb-3">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-wide flex items-center gap-2">
                <FileText className="w-4 h-4 text-mex-maroon" />
                <span>Datos de la Institución</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
                  Escuela
                </label>
                {escuelas.length > 1 ? (
                  <select
                    value={selectedEscuela}
                    onChange={(e) => setSelectedEscuela(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  >
                    {escuelas.map((e, idx) => (
                      <option key={idx} value={e.escuelaName}>{e.escuelaName}</option>
                    ))}
                  </select>
                ) : (
                  <div className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>{selectedEscuela}</span>
                    <Lock className="w-3 h-3 text-slate-400" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
                  C.C.T.
                </label>
                <div className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>{selectedCct}</span>
                  <Lock className="w-3 h-3 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
                  Turno
                </label>
                <select
                  value={turno}
                  onChange={(e) => setTurno(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value="Matutino">Matutino</option>
                  <option value="Vespertino">Vespertino</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
                  Ciclo Escolar
                </label>
                <input
                  type="text"
                  value={cicloEscolar}
                  onChange={(e) => setCicloEscolar(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* I. DATOS GENERALES */}
          <div className="space-y-4 border-b border-slate-100 pb-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2 bg-slate-100 p-2.5 rounded-xl">
              <span className="w-5 h-5 rounded-lg bg-mex-maroon text-white flex items-center justify-center text-[10px]">I</span>
              <span>DATOS GENERALES DE LA INCIDENCIA</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-extrabold text-slate-700 mb-1">
                  Fecha
                </label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-slate-700 mb-1">
                  Hora
                </label>
                <input
                  type="time"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-slate-700 mb-1">
                  Docente que Reporta
                </label>
                <div className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>{docenteReporta}</span>
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Lugar donde ocurrió */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-700 mb-2">
                Lugar donde ocurrió la incidencia:
              </label>
              <div className="flex flex-wrap gap-2">
                {LUGARES_INCIDENCIA.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setLugar(item)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      lugar === item
                        ? "bg-mex-maroon text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <span>{lugar === item ? "✓" : "○"}</span>
                    <span>{item}</span>
                  </button>
                ))}
              </div>
              {lugar === "Otro" && (
                <input
                  type="text"
                  placeholder="Especificar lugar..."
                  value={lugarOtro}
                  onChange={(e) => setLugarOtro(e.target.value)}
                  className="mt-2.5 w-full max-w-md px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                />
              )}
            </div>

            {/* Alumno(a) Involucrado con Búsqueda Inteligente del Padrón */}
            <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200/80 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-black text-emerald-950 uppercase tracking-wide flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-700" />
                  <span>Alumno(a) Involucrado(a)</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowPadronModal(true)}
                  className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 underline flex items-center gap-1 self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Administrar / Cargar Padrón por Grupo</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 relative">
                {/* Autocomplete Name Search */}
                <div className="sm:col-span-2 relative">
                  <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">
                    Nombre Completo (Búsqueda en Padrón) *
                  </label>
                  <input
                    type="text"
                    placeholder="Escribe el nombre del alumno..."
                    value={studentSearchTerm}
                    onChange={(e) => {
                      setStudentSearchTerm(e.target.value);
                      setAlumnoNombre(e.target.value);
                      setShowStudentDropdown(true);
                    }}
                    onFocus={() => setShowStudentDropdown(true)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />

                  {/* Autocomplete Dropdown */}
                  {showStudentDropdown && matchingStudents.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 max-h-48 overflow-y-auto divide-y divide-slate-100">
                      {matchingStudents.map((s) => (
                        <div
                          key={s.id}
                          onClick={() => handleSelectStudent(s)}
                          className="p-2.5 hover:bg-emerald-50 cursor-pointer flex items-center justify-between text-xs transition"
                        >
                          <span className="font-extrabold text-slate-900">{s.nombre}</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded-full">
                            {s.grado} {s.grupo}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">
                    Nivel / Grado
                  </label>
                  <select
                    value={alumnoGrado}
                    onChange={(e) => setAlumnoGrado(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
                  >
                    {GRADOS_NIVELES.map((group) => (
                      <optgroup key={group.nivel} label={`--- ${group.nivel.toUpperCase()} ---`}>
                        {group.grados.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">
                    Grupo
                  </label>
                  <input
                    type="text"
                    value={alumnoGrupo}
                    onChange={(e) => setAlumnoGrupo(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">
                  Otros Involucrados (si aplica)
                </label>
                <input
                  type="text"
                  placeholder="Otros alumnos o participantes..."
                  value={otrosInvolucrados}
                  onChange={(e) => setOtrosInvolucrados(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* II. TIPO DE INCIDENCIA */}
          <div className="space-y-4 border-b border-slate-100 pb-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2 bg-slate-100 p-2.5 rounded-xl">
              <span className="w-5 h-5 rounded-lg bg-mex-maroon text-white flex items-center justify-center text-[10px]">II</span>
              <span>TIPO DE INCIDENCIA</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {TIPOS_INCIDENCIA.map((item) => {
                const isSelected = tiposIncidencia.includes(item);
                return (
                  <label
                    key={item}
                    onClick={() => toggleArrayItem(tiposIncidencia, setTiposIncidencia, item)}
                    className={`p-3 rounded-xl border text-xs font-bold transition cursor-pointer flex items-center gap-2.5 ${
                      isSelected
                        ? "bg-rose-50 border-rose-300 text-rose-950 shadow-2xs"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] shrink-0 ${
                      isSelected ? "bg-rose-600 border-rose-600 text-white font-black" : "border-slate-400 bg-white"
                    }`}>
                      {isSelected ? "✓" : ""}
                    </span>
                    <span>{item}</span>
                  </label>
                );
              })}
            </div>

            {tiposIncidencia.includes("Otro") && (
              <input
                type="text"
                placeholder="Especificar otro tipo de incidencia..."
                value={tipoIncidenciaOtro}
                onChange={(e) => setTipoIncidenciaOtro(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
              />
            )}
          </div>

          {/* III. DESCRIPCIÓN OBJETIVA DE LOS HECHOS */}
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2 bg-slate-100 p-2.5 rounded-xl">
              <span className="w-5 h-5 rounded-lg bg-mex-maroon text-white flex items-center justify-center text-[10px]">III</span>
              <span>DESCRIPCIÓN OBJETIVA DE LOS HECHOS</span>
            </h4>
            <p className="text-[11px] text-slate-500 font-semibold italic">
              (Describir únicamente lo observado, evitando juicios personales)
            </p>

            <textarea
              rows={4}
              placeholder="Escribe aquí la descripción clara, imparcial y cronológica de lo acontecido..."
              value={descripcionHechos}
              onChange={(e) => setDescripcionHechos(e.target.value)}
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-mex-maroon/20 leading-relaxed"
            />
          </div>

          {/* IV. ACCIONES INMEDIATAS REALIZADAS */}
          <div className="space-y-4 border-b border-slate-100 pb-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2 bg-slate-100 p-2.5 rounded-xl">
              <span className="w-5 h-5 rounded-lg bg-mex-maroon text-white flex items-center justify-center text-[10px]">IV</span>
              <span>ACCIONES INMEDIATAS REALIZADAS</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {ACCIONES_INMEDIATAS.map((item) => {
                const isSelected = accionesInmediatas.includes(item);
                return (
                  <label
                    key={item}
                    onClick={() => toggleArrayItem(accionesInmediatas, setAccionesInmediatas, item)}
                    className={`p-3 rounded-xl border text-xs font-bold transition cursor-pointer flex items-center gap-2.5 ${
                      isSelected
                        ? "bg-emerald-50 border-emerald-300 text-emerald-950 shadow-2xs"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] shrink-0 ${
                      isSelected ? "bg-emerald-700 border-emerald-700 text-white font-black" : "border-slate-400 bg-white"
                    }`}>
                      {isSelected ? "✓" : ""}
                    </span>
                    <span>{item}</span>
                  </label>
                );
              })}
            </div>

            {accionesInmediatas.includes("Otro") && (
              <input
                type="text"
                placeholder="Especificar otra acción inmediata..."
                value={accionesOtro}
                onChange={(e) => setAccionesOtro(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
              />
            )}
          </div>

          {/* ASIGNACIÓN DE FOLIO Y BOTONES DE FINALIZACIÓN */}
          <div className="pt-4 border-t border-slate-200/80 space-y-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-black uppercase text-slate-800 block">Folio del Registro:</span>
                <span className="text-[11px] text-slate-500 font-medium">Generado automáticamente según iniciales, grado y consecutivo. Se asignará a esta bitácora.</span>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs uppercase font-black text-slate-500">Folio:</span>
                <input
                  type="text"
                  value={folio}
                  onChange={(e) => setFolio(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-black text-mex-maroon text-sm tracking-wider shadow-2xs w-36 text-center uppercase focus:ring-2 focus:ring-mex-maroon/20 focus:outline-none"
                  title="Folio autogenerado"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleSaveBitacora}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Guardar Bitácora ({folio})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  handleSaveBitacora();
                  setViewMode("print");
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-mex-maroon hover:bg-mex-maroon/90 text-white font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition"
              >
                <Printer className="w-4 h-4 text-mex-gold" />
                <span>Ver e Imprimir Formato (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== VISTA 3: FORMATO IMPRIMIBLE PARA FIRMAS ==================== */}
      {(viewMode === "print" || selectedBitacoraId) && (
        <div className={viewMode === "print" ? "block space-y-6" : "hidden print:block space-y-6"}>
          
          {/* Barra de Controles de Impresión y Descarga Estandarizada */}
          <AccionesDocumento
            targetId="documento-resultado"
            tipoRecurso="Bitacora_Incidencia"
            customSuffix={`${printBitacora.alumnoNombre.replace(/[^a-zA-Z0-9]/g, '_')}_Folio_${printBitacora.folio}`}
            title={
              <span className="flex items-center gap-1.5 font-black text-slate-800">
                <span>Bitácora de Incidencia:</span>
                <span className="text-mex-maroon font-extrabold">Folio #{printBitacora.folio}</span>
              </span>
            }
            extraActions={
              <button
                type="button"
                onClick={() => setViewMode("form")}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer mr-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver a Edición</span>
              </button>
            }
          />

          {/* HOJA DE DOCUMENTO DE RESGUARDO INSTITUCIONAL */}
          <div
            id="documento-resultado"
            className="bg-white p-8 sm:p-12 border border-slate-300 shadow-xl max-w-4xl mx-auto space-y-6 text-slate-900 font-sans print:shadow-none print:border-none print:p-0 printable-document"
          >
            
            {/* Header Institucional */}
            <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
              <h1 className="text-base font-black uppercase tracking-wider">
                SECRETARÍA DE EDUCACIÓN PÚBLICA
              </h1>
              <h2 className="text-sm font-black uppercase tracking-wide text-mex-maroon">
                BITÁCORA DE INCIDENCIA ESCOLAR
              </h2>
              <p className="text-[10px] font-extrabold uppercase text-slate-600">
                Documento de Registro, Seguimiento y Acuerdos de Convivencia Escolar
              </p>
            </div>

            {/* Encabezado Escuela & Folio */}
            <div className="grid grid-cols-2 gap-4 text-xs font-bold border border-slate-800 p-3 rounded-lg bg-slate-50/50">
              <div>
                <p><span className="font-black">Escuela:</span> {printBitacora.escuela}</p>
                <p><span className="font-black">C.C.T.:</span> {printBitacora.cct}</p>
                <p><span className="font-black">Turno:</span> {printBitacora.turno}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-mex-maroon">FOLIO: {printBitacora.folio}</p>
                <p><span className="font-black">Ciclo Escolar:</span> {printBitacora.cicloEscolar}</p>
              </div>
            </div>

            {/* I. DATOS GENERALES */}
            <div className="space-y-1 text-xs">
              <h3 className="font-black uppercase bg-slate-200 px-2 py-1 text-[11px] border border-slate-800">
                I. DATOS GENERALES
              </h3>
              <div className="grid grid-cols-2 gap-2 p-2 border border-slate-800">
                <p><span className="font-black">Fecha:</span> {printBitacora.fecha}</p>
                <p><span className="font-black">Hora:</span> {printBitacora.hora}</p>
                <p className="col-span-2">
                  <span className="font-black">Lugar donde ocurrió:</span> {printBitacora.lugar} {printBitacora.lugarOtro ? `(${printBitacora.lugarOtro})` : ""}
                </p>
                <p className="col-span-2"><span className="font-black">Docente que reporta:</span> {printBitacora.docenteReporta}</p>
                <p className="col-span-2 font-black text-slate-900 border-t border-slate-300 pt-1">
                  ALUMNO(A) INVOLUCRADO(A):
                </p>
                <p><span className="font-black">Nombre completo:</span> {printBitacora.alumnoNombre}</p>
                <p><span className="font-black">Grado y Grupo:</span> {printBitacora.alumnoGrado} - Grupo {printBitacora.alumnoGrupo}</p>
                {printBitacora.otrosInvolucrados && (
                  <p className="col-span-2"><span className="font-black">Otros involucrados:</span> {printBitacora.otrosInvolucrados}</p>
                )}
              </div>
            </div>

            {/* II. TIPO DE INCIDENCIA */}
            <div className="space-y-1 text-xs">
              <h3 className="font-black uppercase bg-slate-200 px-2 py-1 text-[11px] border border-slate-800">
                II. TIPO DE INCIDENCIA
              </h3>
              <div className="p-2 border border-slate-800">
                <ul className="grid grid-cols-2 gap-1 text-[11px]">
                  {printBitacora.tiposIncidencia.map((t, idx) => (
                    <li key={idx} className="flex items-center gap-1 font-bold">
                      <span>[X]</span> <span>{t}</span>
                    </li>
                  ))}
                  {printBitacora.tipoIncidenciaOtro && (
                    <li className="col-span-2 font-bold">[X] Otro: {printBitacora.tipoIncidenciaOtro}</li>
                  )}
                </ul>
              </div>
            </div>

            {/* III. DESCRIPCIÓN OBJETIVA DE LOS HECHOS */}
            <div className="space-y-1 text-xs">
              <h3 className="font-black uppercase bg-slate-200 px-2 py-1 text-[11px] border border-slate-800">
                III. DESCRIPCIÓN OBJETIVA DE LOS HECHOS
              </h3>
              <div className="p-3 border border-slate-800 text-[11px] leading-relaxed min-h-[60px]">
                {printBitacora.descripcionHechos || "Sin descripción proporcionada."}
              </div>
            </div>

            {/* IV. ACCIONES INMEDIATAS REALIZADAS */}
            <div className="space-y-1 text-xs">
              <h3 className="font-black uppercase bg-slate-200 px-2 py-1 text-[11px] border border-slate-800">
                IV. ACCIONES INMEDIATAS REALIZADAS
              </h3>
              <div className="p-2 border border-slate-800 space-y-1 text-[11px]">
                <div className="grid grid-cols-2 gap-1 font-bold">
                  {printBitacora.accionesInmediatas.map((a, idx) => (
                    <span key={idx}>[X] {a}</span>
                  ))}
                  {printBitacora.accionesOtro && (
                    <span className="col-span-2">[X] Otro: {printBitacora.accionesOtro}</span>
                  )}
                </div>
              </div>
            </div>

            {/* V. ACUERDOS Y COMPROMISOS (Espacio para llenado manual en el formato) */}
            <div className="space-y-1 text-xs">
              <h3 className="font-black uppercase bg-slate-200 px-2 py-1 text-[11px] border border-slate-800">
                V. ACUERDOS Y COMPROMISOS
              </h3>
              <div className="grid grid-cols-3 gap-2 border border-slate-800 p-2 text-[10px]">
                <div>
                  <p className="font-black border-b border-slate-400 mb-1">Del Alumno(a):</p>
                  <div className="border-b border-dashed border-slate-400 h-5 mt-1"></div>
                  <div className="border-b border-dashed border-slate-400 h-5"></div>
                  <div className="border-b border-dashed border-slate-400 h-5"></div>
                </div>
                <div>
                  <p className="font-black border-b border-slate-400 mb-1">Del Padre/Madre/Tutor:</p>
                  <div className="border-b border-dashed border-slate-400 h-5 mt-1"></div>
                  <div className="border-b border-dashed border-slate-400 h-5"></div>
                  <div className="border-b border-dashed border-slate-400 h-5"></div>
                </div>
                <div>
                  <p className="font-black border-b border-slate-400 mb-1">De la Escuela / Personal:</p>
                  <div className="border-b border-dashed border-slate-400 h-5 mt-1"></div>
                  <div className="border-b border-dashed border-slate-400 h-5"></div>
                  <div className="border-b border-dashed border-slate-400 h-5"></div>
                </div>
              </div>
            </div>

            {/* VI. SEGUIMIENTO Y EVALUACIÓN DE ACUERDOS (Espacio en blanco para llenado manual) */}
            <div className="space-y-1 text-xs">
              <h3 className="font-black uppercase bg-slate-200 px-2 py-1 text-[11px] border border-slate-800">
                VI. SEGUIMIENTO Y EVALUACIÓN DE ACUERDOS
              </h3>
              <div className="p-3 border border-slate-800 text-[10px] space-y-2">
                <div className="flex items-center justify-between">
                  <p><span className="font-black">Fecha de seguimiento:</span> ________________________</p>
                  <p><span className="font-black">Resultado:</span> [ &nbsp; ] Cumplió &nbsp;&nbsp; [ &nbsp; ] Parcial &nbsp;&nbsp; [ &nbsp; ] No cumplió</p>
                </div>
                <div>
                  <p className="font-black mb-1">Observaciones del Seguimiento:</p>
                  <div className="border-b border-dashed border-slate-400 h-5"></div>
                  <div className="border-b border-dashed border-slate-400 h-5"></div>
                </div>
              </div>
            </div>

            {/* VII. EVIDENCIAS ANEXAS (Formato para marcado manual) */}
            <div className="space-y-1 text-xs">
              <h3 className="font-black uppercase bg-slate-200 px-2 py-1 text-[11px] border border-slate-800">
                VII. EVIDENCIAS ANEXAS
              </h3>
              <div className="p-2 border border-slate-800">
                <div className="flex flex-wrap gap-4 text-[10px] font-bold">
                  {EVIDENCIAS_ANEXAS.map((item) => (
                    <span key={item}>[ &nbsp; ] {item}</span>
                  ))}
                  <span>Especifique: ________________________</span>
                </div>
              </div>
            </div>

            {/* FIRMAS FÍSICAS PARA IMPRESIÓN (Docente, Tutor, Orientación/Dirección) */}
            <div className="space-y-1 text-xs pt-6">
              <h3 className="font-black uppercase bg-slate-200 px-2 py-1 text-[11px] border border-slate-800 text-center">
                FIRMAS DE CONFORMIDAD Y ACUERDO
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-slate-800 p-4 pt-12 text-center">
                <div className="border-t border-slate-800 pt-1">
                  <p className="font-black text-[10px]">{printBitacora.docenteReporta}</p>
                  <p className="text-[9px] uppercase font-semibold text-slate-600">Docente que Reporta</p>
                </div>
                <div className="border-t border-slate-800 pt-1">
                  <p className="font-black text-[10px]">Firma y Nombre</p>
                  <p className="text-[9px] uppercase font-semibold text-slate-600">Madre, Padre o Tutor</p>
                </div>
                <div className="border-t border-slate-800 pt-1">
                  <p className="font-black text-[10px]">Sello y Firma</p>
                  <p className="text-[9px] uppercase font-semibold text-slate-600">Orientación / Dirección</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==================== MODAL: ADMINISTRAR PADRÓN DE ALUMNOS ==================== */}
      {showPadronModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in print:hidden">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base uppercase tracking-wide flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-700" />
                <span>Padrón de Alumnos por Grupo</span>
              </h3>
              <button
                onClick={() => setShowPadronModal(false)}
                className="text-slate-400 hover:text-slate-600 font-black text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Pega la lista de alumnos de tu grupo (un nombre por línea) para que aparezcan automáticamente al redactar tus bitácoras de incidencia.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
                  Nivel / Grado
                </label>
                <select
                  value={padronGrado}
                  onChange={(e) => setPadronGrado(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  {GRADOS_NIVELES.map((group) => (
                    <optgroup key={group.nivel} label={`--- ${group.nivel.toUpperCase()} ---`}>
                      {group.grados.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
                  Grupo
                </label>
                <input
                  type="text"
                  value={padronGrupo}
                  onChange={(e) => setPadronGrupo(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-slate-700 mb-1">
                Lista de Nombres (Pegar o Escribir):
              </label>
              <textarea
                rows={6}
                placeholder="1. Aguilar Soto María&#10;2. Becerra Lope José&#10;3. Cruz Domínguez Ana"
                value={bulkPadronText}
                onChange={(e) => setBulkPadronText(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-500 font-bold">
                Alumnos actualmente en padrón: {studentPadron.length}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowPadronModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddBulkPadron}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-xl shadow-md"
                >
                  Guardar en Padrón
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
