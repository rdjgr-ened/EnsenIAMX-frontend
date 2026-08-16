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

export interface ExamQuestionOption {
  inciso: "A" | "B" | "C" | "D";
  texto: string;
}

export interface ExamQuestionItem {
  numero: number;
  tipo: "opcion_multiple" | "pregunta_abierta";
  contenidoEvaluado: string;
  pdaEvaluado?: string;
  planteamiento: string;
  opciones?: ExamQuestionOption[];
  lineasRespuesta?: number;
  espacioRespuesta?: string;
  respuestaCorrecta: string;
  justificacionPedagogica: string;
  criterioEvaluacion?: string;
  puntos: number;
}

export interface ExamSpecificationItem {
  numero: number;
  contenido: string;
  pda: string;
  nivelCognitivo: string;
  tipoReactivo: string;
  puntos: number;
}

export interface GeneratedExam {
  id?: string;
  createdAt?: string;
  titulo: string;
  subtitulo?: string;
  tipoExamen: "diagnostico" | "parcial" | "trimestral";
  periodoTrimestre?: string;
  nivel: string;
  grado: string;
  grupo?: string;
  disciplina: string;
  campoFormativo: string;
  escuelaName: string;
  cct: string;
  docenteName: string;
  fechaAplicacion?: string;
  tiempoEstimado?: string;
  instruccionesGenerales: string;
  reactivos: ExamQuestionItem[];
  tablaEspecificaciones?: ExamSpecificationItem[];
  hojaRespuestasDocente?: Array<{
    numero: number;
    respuesta: string;
    contenido: string;
    justificacion: string;
  }>;
}

export type PlanTier = "gratuito" | "basico" | "oro" | "platino";

export type BillingCycle = "mensual" | "trimestral" | "anual";

export type CreditActionType = 
  | "disenar_planeacion"
  | "adecuacion_curricular"
  | "disenar_examenes"
  | "programa_analitico"
  | "hoja_trabajo"
  | "instrumento_evaluacion"
  | "modificar_planeacion"
  | "crear_contenidos"
  | "asistente_chatbot"
  | "sugerir_contenidos";

export interface UserSubscription {
  plan: PlanTier;
  credits: number;
  billingCycle: BillingCycle;
  planStartDate: string;
  lastCreditRenewalDate?: string;
  historyDays: number;
  bitacoraCount?: number;
}

export interface PlanFeatureConfig {
  id: PlanTier;
  name: string;
  badgeLabel: string;
  badgeColor: string;
  priceMonthly: number;
  priceQuarterly: number;
  priceYearly: number;
  creditsPerMonth: number;
  isInitialOnly?: boolean;
  historyDays: number;
  historyLabel: string;
  bitacoraLimit: number; // 0 = disabled, 5, 15, Infinity
  allowGroups: boolean;
  allowBitacora: boolean;
  allowClassTracking: boolean;
  allowEvaluationFormat: boolean;
  allowContinuousEvaluation: boolean;
  description: string;
  features: string[];
}

export type PaywallReason = 
  | { type: "credits"; action: CreditActionType; required: number; current: number; customMessage?: string }
  | { type: "feature"; featureName: string; requiredPlan: PlanTier; message: string }
  | { type: "limit"; featureName: string; limitName?: string; currentCount: number; maxAllowed: number; requiredPlan: PlanTier; message: string }
  | { type: "manual_upgrade" };

// ==================== MERCADO PAGO CHECKOUT TYPES ====================

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  popular?: boolean;
  savings?: string;
  description: string;
}

export interface CheckoutRequest {
  itemType: "plan" | "credits";
  planId?: PlanTier;
  billingCycle?: BillingCycle;
  creditPackageId?: string;
  creditAmount?: number;
  price?: number;
  title?: string;
  userEmail?: string;
  userName?: string;
  userId?: string;
  returnUrl?: string;
}

export interface CheckoutResponse {
  success: boolean;
  preferenceId?: string;
  initPoint?: string;
  sandboxInitPoint?: string;
  error?: string;
  isMockDemo?: boolean;
}

// ==================== SUPABASE DATABASE MODELS (EnseñIA MX) ====================

export interface DbProfile {
  id: string;
  email: string;
  plan: PlanTier;
  creditos_disponibles: number;
  fecha_renovacion?: string | null;
  docente_nombre?: string | null;
  escuela_nombre?: string | null;
  cct?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface DbGrupo {
  id: string;
  user_id: string;
  grado_grupo: string;
  materia: string;
  ciclo_escolar: string;
  created_at?: string;
}

export interface DbAlumno {
  id: string;
  grupo_id: string;
  user_id: string;
  nombre_completo: string;
  bap_diagnostico?: string | null;
  created_at?: string;
}

export interface DbIncidencia {
  id: string;
  alumno_id: string;
  user_id: string;
  fecha: string;
  categoria: string;
  descripcion: string;
  created_at?: string;
}

export interface DbPlaneacion {
  id: string;
  user_id: string;
  titulo: string;
  campo_formativo: string;
  pda: string;
  contenido_json: any;
  created_at?: string;
}

export type TipoRecursoGenerado =
  | "examen"
  | "hoja_de_trabajo"
  | "rubrica"
  | "instrumento_evaluacion"
  | "programa_analitico"
  | "otro";

export interface DbRecursoGenerado {
  id: string;
  user_id: string;
  tipo_recurso: TipoRecursoGenerado;
  contenido_json: any;
  created_at?: string;
}

export interface DbEvaluacionContinua {
  id: string;
  user_id: string;
  grupo_id?: string | null;
  alumno_id?: string | null;
  fecha?: string | null;
  criterio?: string | null;
  calificacion?: string | number | null;
  observaciones?: string | null;
  contenido_json: any;
  created_at?: string;
}

export interface DatabaseSchema {
  public: {
    Tables: {
      profiles: {
        Row: DbProfile;
        Insert: Partial<DbProfile> & { id: string; email: string };
        Update: Partial<DbProfile>;
      };
      grupos: {
        Row: DbGrupo;
        Insert: Omit<DbGrupo, "created_at"> & { id?: string; created_at?: string };
        Update: Partial<DbGrupo>;
      };
      alumnos: {
        Row: DbAlumno;
        Insert: Omit<DbAlumno, "created_at"> & { id?: string; created_at?: string };
        Update: Partial<DbAlumno>;
      };
      incidencias: {
        Row: DbIncidencia;
        Insert: Omit<DbIncidencia, "created_at"> & { id?: string; created_at?: string };
        Update: Partial<DbIncidencia>;
      };
      planeaciones: {
        Row: DbPlaneacion;
        Insert: Omit<DbPlaneacion, "created_at"> & { id?: string; created_at?: string };
        Update: Partial<DbPlaneacion>;
      };
      recursos_generados: {
        Row: DbRecursoGenerado;
        Insert: Omit<DbRecursoGenerado, "created_at"> & { id?: string; created_at?: string };
        Update: Partial<DbRecursoGenerado>;
      };
      evaluacion_continua: {
        Row: DbEvaluacionContinua;
        Insert: Omit<DbEvaluacionContinua, "created_at"> & { id?: string; created_at?: string };
        Update: Partial<DbEvaluacionContinua>;
      };
    };
  };
}


