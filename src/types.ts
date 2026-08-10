export interface CurriculumItem {
  id: number;
  campoFormativo: string;
  disciplina: string;
  grado: string;
  contenido: string;
  pda: string;
  nivel?: string;
}

export interface Lesson {
  numero: number;
  titulo: string;
  duracion: string;
  materiales: string[];
  inicio: string;
  desarrollo: string;
  cierre: string;
  evaluacionSesion?: string;
}

export interface PlanPhase {
  nombre: string;
  sesiones: Lesson[];
}

export interface FormatPlan {
  proposito: string;
  producto: string;
  fases: PlanPhase[];
  evaluacionFormativa: {
    tecnicas: string[];
    instrumentos: string[];
    descripcion: string;
  };
  sugerenciasAdecuacion: string;
}

export interface CompletePlan {
  id: string;
  createdAt: string;
  nivel?: string;
  docenteName: string;
  escuelaName: string;
  cct: string;
  grupo: string;
  grado: string;
  duracionSemanas: string;
  duracionSesion?: string;
  campoFormativo: string;
  disciplina: string;
  contenido: string;
  pda: string;
  ejesArticuladores: string[];
  metodologia: string;
  situacionProblema: string;
  bapSelected?: string[];
  plan: FormatPlan;
}

export interface RubricCriterion {
  criterio: string;
  ponderacion?: string;
  sobresaliente: string; // 10-9
  satisfactorio: string; // 8-7
  basico: string;       // 6
  requiereApoyo: string; // 5
}

export interface ChecklistItem {
  num: number;
  criterio: string;
  indicador: string;
  puntosMaximos?: number;
}

export interface ScaleItem {
  num: number;
  aspecto: string;
  escala?: string[];
}

export interface ObservationItem {
  num: number;
  aspecto: string;
  focoAtencion: string;
}

export interface QuestionnaireItem {
  num: number;
  pregunta: string;
  opciones?: string[];
  respuestaCorrecta?: string;
  espacioRespuesta?: boolean;
}

export interface GeneratedInstrument {
  id?: string;
  titulo: string;
  tipoInstrumento: string;
  instrucciones: string;
  criteriosRubrica?: RubricCriterion[];
  itemsListaCotejo?: ChecklistItem[];
  itemsEscalaEstimativa?: ScaleItem[];
  guiaObservacion?: ObservationItem[];
  preguntasCuestionario?: QuestionnaireItem[];
  aspectosGenerales?: Array<{ titulo: string; descripcion: string }>;
  criteriosEvaluacionHtml?: string;
  retroalimentacionFormativa: string;
  puntuacionMaximaTotal?: string;
  escalaEvaluacionTexto?: string;
}

export interface WorksheetExercise {
  numero: number;
  preguntaOInstruccion: string;
  lineasDeRespuesta?: number;
  textoOAuxiliar?: string;
  opciones?: string[];
}

export interface WorksheetSection {
  titulo: string;
  instrucciones: string;
  ejercicios: WorksheetExercise[];
}

export interface GeneratedWorksheet {
  titulo: string;
  subtitulo: string;
  instruccionesGenerales: string;
  seccionInicio: WorksheetSection;
  seccionDesarrollo: WorksheetSection;
  seccionCierre: WorksheetSection;
  ticketDeSalida?: string;
  sesionNumero?: number;
  sesionTitulo?: string;
  disciplina?: string;
  grado?: string;
  grupo?: string;
  escuelaName?: string;
  cct?: string;
  docenteName?: string;
  pda?: string;
}

export type UserRoleProfile = "docente" | "asistencia" | "direccion" | "padre";

export interface StudentPadronItem {
  id: string;
  nombre: string;
  grado: string;
  grupo: string;
  edad?: string;
  padreTutor?: string;
  telefonoPadre?: string;
}

export interface BitacoraIncidencia {
  id: string;
  folio: string;
  createdAt: string;
  updatedAt: string;
  status?: "abierto" | "en_seguimiento" | "concluido";
  
  // Datos Generales de la Escuela
  escuela: string;
  cct: string;
  turno: string;
  cicloEscolar: string;
  
  // I. Datos Generales
  fecha: string;
  hora: string;
  lugar: string;
  lugarOtro?: string;
  docenteReporta: string;
  
  // Alumno Involucrado
  alumnoNombre: string;
  alumnoGrado: string;
  alumnoGrupo: string;
  alumnoEdad?: string;
  otrosInvolucrados?: string;
  
  // II. Tipo de Incidencia
  tiposIncidencia: string[];
  tipoIncidenciaOtro?: string;
  
  // III. Descripción Objetiva
  descripcionHechos: string;
  
  // IV. Norma o Acuerdo Incumplido
  acuerdoIncumplido?: string;
  
  // V. Acciones Inmediatas
  accionesInmediatas: string[];
  accionesOtro?: string;
  descripcionAcciones?: string;
  
  // VI. Acuerdos y Compromisos
  compromisoAlumno?: string;
  compromisoPadre?: string;
  compromisoEscuela?: string;
  
  // VII. Seguimiento
  fechaSeguimiento?: string;
  resultadoObservado?: "cumplio" | "parcial" | "no_cumplio" | "";
  observacionesSeguimiento?: string;
  
  // VIII. Evidencias Anexas
  evidencias?: string[];
  evidenciasOtro?: string;
  notasEvidencias?: string;

  // IX. Firmas/Estatus
  firmaDocenteStatus?: boolean;
  firmaAlumnoStatus?: boolean;
  firmaPadreStatus?: boolean;
  firmaAutoridadStatus?: boolean;
}

export interface StudentItem {
  id: string;
  nombre: string;
  curp?: string;
  notas?: string;
}

export interface EscolarGroup {
  id: string;
  grado: string;
  grupo: string;
  nombreCompleto: string;
  disciplina?: string;
  turno?: string;
  estudiantes: StudentItem[];
  syncedPlanId?: string;
}

export interface ClassTrackingRecord {
  groupId: string;
  syncedPlanId?: string;
  completedSessions: number[]; // Array of session numbers checked off, e.g. [1, 2, 3]
  planCompletedSessions?: Record<string, number[]>; // Key: planId (or "default"), Value: completed session numbers for that plan
  maxSessions?: number;
}

export interface EvaluationColumnItem {
  id: string;
  fecha: string; // ISO string YYYY-MM-DD or formatted DD/MMM
  titulo: string;
  puntosMaximos: number;
  sesionNumero?: number;
}

export interface ContinuousEvalGroupData {
  groupId: string;
  syncedPlanId?: string;
  columnas: EvaluationColumnItem[];
  // Key: `${studentId}_${columnId}`, Value: numeric score
  calificaciones: Record<string, number>;
}

