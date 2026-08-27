import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { 
  DatabaseSchema, 
  DbProfile, 
  DbGrupo, 
  DbAlumno, 
  DbIncidencia, 
  DbPlaneacion, 
  DbRecursoGenerado, 
  DbEvaluacionContinua,
  PlanTier,
  TipoRecursoGenerado
} from '../types';

// Read env variables (compatible with Vite)
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project') &&
  !supabaseAnonKey.includes('your-anon-key')
);

// Create the Supabase client
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    })
  : null;

// Plan limits for Incidencias Bitacora
export const INCIDENCIAS_LIMITS_BY_PLAN: Record<PlanTier, number> = {
  gratuito: 0,
  basico: 5,
  oro: 15,
  platino: Infinity // Ilimitado
};

// ============================================================================
// 1. PROFILES API (`profiles`)
// ============================================================================

export async function getProfile(userId: string): Promise<DbProfile | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code !== 'PGRST116') { // PGRST116 is not found
        console.warn('Error al obtener perfil de Supabase:', error.message);
      }
      return null;
    }
    return data as DbProfile;
  } catch (err) {
    console.error('Error de red al consultar profiles:', err);
    return null;
  }
}

// En tu archivo utils/supabaseClient.ts
export async function upsertProfile(profileData: {
  id: string; // <-- Ahora exigimos el UUID real
  email: string;
  plan?: string;
  creditos_disponibles?: number;
  [key: string]: any;
}) {
  if (!isSupabaseConfigured) return null;

  // Eliminamos el generador de texto (user_gmail). 
  // Ahora usamos directamente el UUID seguro que viene de App.tsx
  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: profileData.id, 
      email: profileData.email,
      plan: profileData.plan ?? "gratuito",
      creditos_disponibles: profileData.creditos_disponibles ?? 20,
    }, { onConflict: "id" });

  if (error) {
    console.error("Error al guardar profile en Supabase:", error.message);
    throw error;
  }
  return data;
}

export async function updateProfileCredits(userId: string, newCredits: number): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ creditos_disponibles: newCredits, updated_at: new Date().toISOString() })
      .eq('id', userId);
    return !error;
  } catch (err) {
    console.error('Error al actualizar créditos:', err);
    return false;
  }
}

// ============================================================================
// 2. GRUPOS API (`grupos`)
// ============================================================================

export async function getGrupos(userId: string): Promise<DbGrupo[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('grupos')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error al obtener grupos de Supabase:', error.message);
      return [];
    }
    return (data || []) as DbGrupo[];
  } catch (err) {
    console.error('Error de red en grupos:', err);
    return [];
  }
}

export async function saveGrupo(grupo: Omit<DbGrupo, 'created_at'> & { id?: string }): Promise<DbGrupo | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('grupos')
      .upsert(grupo)
      .select()
      .single();

    if (error) {
      console.warn('Error al guardar grupo en Supabase:', error.message);
      return null;
    }
    return data as DbGrupo;
  } catch (err) {
    console.error('Error de red en saveGrupo:', err);
    return null;
  }
}

export async function deleteGrupo(grupoId: string, userId: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('grupos')
      .delete()
      .eq('id', grupoId)
      .eq('user_id', userId);
    return !error;
  } catch (err) {
    console.error('Error al eliminar grupo:', err);
    return false;
  }
}

// ============================================================================
// 3. ALUMNOS API (`alumnos`)
// ============================================================================

export async function getAlumnos(userId: string, grupoId?: string): Promise<DbAlumno[]> {
  if (!supabase) return [];
  try {
    let query = supabase.from('alumnos').select('*').eq('user_id', userId);
    if (grupoId) {
      query = query.eq('grupo_id', grupoId);
    }
    const { data, error } = await query.order('nombre_completo', { ascending: true });

    if (error) {
      console.warn('Error al obtener alumnos de Supabase:', error.message);
      return [];
    }
    return (data || []) as DbAlumno[];
  } catch (err) {
    console.error('Error de red en alumnos:', err);
    return [];
  }
}

export async function saveAlumno(alumno: Omit<DbAlumno, 'created_at'> & { id?: string }): Promise<DbAlumno | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('alumnos')
      .upsert(alumno)
      .select()
      .single();

    if (error) {
      console.warn('Error al guardar alumno en Supabase:', error.message);
      return null;
    }
    return data as DbAlumno;
  } catch (err) {
    console.error('Error de red en saveAlumno:', err);
    return null;
  }
}

export async function deleteAlumno(alumnoId: string, userId: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('alumnos')
      .delete()
      .eq('id', alumnoId)
      .eq('user_id', userId);
    return !error;
  } catch (err) {
    console.error('Error al eliminar alumno:', err);
    return false;
  }
}

// ============================================================================
// 4. INCIDENCIAS API (`incidencias`) con verificación de límites de plan
// (Gratuito: 0, Básico: 5, Oro: 15, Platino: ilimitado)
// ============================================================================

export async function getIncidenciasCount(userId: string): Promise<number> {
  if (!supabase) return 0;
  try {
    const { count, error } = await supabase
      .from('incidencias')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (error) {
      console.warn('Error al contar incidencias:', error.message);
      return 0;
    }
    return count || 0;
  } catch (err) {
    console.error('Error de red al contar incidencias:', err);
    return 0;
  }
}

export async function getIncidencias(userId: string, alumnoId?: string): Promise<DbIncidencia[]> {
  if (!supabase) return [];
  try {
    let query = supabase.from('incidencias').select('*').eq('user_id', userId);
    if (alumnoId) {
      query = query.eq('alumno_id', alumnoId);
    }
    const { data, error } = await query.order('fecha', { ascending: false });

    if (error) {
      console.warn('Error al obtener incidencias de Supabase:', error.message);
      return [];
    }
    return (data || []) as DbIncidencia[];
  } catch (err) {
    console.error('Error de red en incidencias:', err);
    return [];
  }
}

export interface InsertIncidenciaResult {
  success: boolean;
  data?: DbIncidencia;
  error?: string;
  limitReached?: boolean;
  currentCount?: number;
  maxAllowed?: number;
  requiredPlan?: PlanTier;
}

export async function insertIncidencia(
  incidencia: Omit<DbIncidencia, 'id' | 'created_at'> & { id?: string },
  userPlan: PlanTier
): Promise<InsertIncidenciaResult> {
  const maxAllowed = INCIDENCIAS_LIMITS_BY_PLAN[userPlan] ?? 0;

  // Plan gratuito no permite incidencias en Supabase
  if (maxAllowed === 0) {
    return {
      success: false,
      limitReached: true,
      currentCount: 0,
      maxAllowed: 0,
      requiredPlan: 'basico',
      error: 'La Bitácora de Incidencias no está disponible en el plan Gratuito. Requiere al menos el plan Básico (hasta 5 incidencias).'
    };
  }

  if (supabase) {
    try {
      // Verificar conteo actual del usuario
      const currentCount = await getIncidenciasCount(incidencia.user_id);

      if (maxAllowed !== Infinity && currentCount >= maxAllowed && !incidencia.id) {
        const nextPlan: PlanTier = userPlan === 'basico' ? 'oro' : 'platino';
        return {
          success: false,
          limitReached: true,
          currentCount,
          maxAllowed,
          requiredPlan: nextPlan,
          error: `Has alcanzado el límite de ${maxAllowed} incidencias para tu plan ${userPlan.toUpperCase()}. Actualiza a ${nextPlan.toUpperCase()} para registrar más.`
        };
      }

      const { data, error } = await supabase
        .from('incidencias')
        .upsert(incidencia)
        .select()
        .single();

      if (error) {
        return {
          success: false,
          error: error.message
        };
      }

      return {
        success: true,
        data: data as DbIncidencia
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Error de conexión con Supabase'
      };
    }
  }

  // Fallback offline / local
  return {
    success: true,
    data: {
      id: incidencia.id || `inc_${Date.now()}`,
      alumno_id: incidencia.alumno_id,
      user_id: incidencia.user_id,
      fecha: incidencia.fecha,
      categoria: incidencia.categoria,
      descripcion: incidencia.descripcion,
      created_at: new Date().toISOString()
    }
  };
}

export async function deleteIncidencia(incidenciaId: string, userId: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('incidencias')
      .delete()
      .eq('id', incidenciaId)
      .eq('user_id', userId);
    return !error;
  } catch (err) {
    console.error('Error al eliminar incidencia:', err);
    return false;
  }
}

// ============================================================================
// 5. PLANEACIONES API (`planeaciones`)
// ============================================================================

export async function getPlaneaciones(userId: string): Promise<DbPlaneacion[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('planeaciones')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error al obtener planeaciones de Supabase:', error.message);
      return [];
    }
    return (data || []) as DbPlaneacion[];
  } catch (err) {
    console.error('Error de red en planeaciones:', err);
    return [];
  }
}

export async function savePlaneacion(planeacion: Omit<DbPlaneacion, 'created_at'> & { id?: string }): Promise<DbPlaneacion | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('planeaciones')
      .upsert(planeacion)
      .select()
      .single();

    if (error) {
      console.warn('Error al guardar planeación en Supabase:', error.message);
      return null;
    }
    return data as DbPlaneacion;
  } catch (err) {
    console.error('Error de red en savePlaneacion:', err);
    return null;
  }
}

export async function deletePlaneacion(planeacionId: string, userId: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('planeaciones')
      .delete()
      .eq('id', planeacionId)
      .eq('user_id', userId);
    return !error;
  } catch (err) {
    console.error('Error al eliminar planeación:', err);
    return false;
  }
}

// ============================================================================
// 6. RECURSOS GENERADOS API (`recursos_generados`)
// Exámenes, Hojas de trabajo, Rúbricas, Programas Analíticos
// ============================================================================

export async function getRecursosGenerados(userId: string, tipo?: TipoRecursoGenerado): Promise<DbRecursoGenerado[]> {
  if (!supabase) return [];
  try {
    let query = supabase.from('recursos_generados').select('*').eq('user_id', userId);
    if (tipo) {
      query = query.eq('tipo_recurso', tipo);
    }
    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.warn('Error al obtener recursos de Supabase:', error.message);
      return [];
    }
    return (data || []) as DbRecursoGenerado[];
  } catch (err) {
    console.error('Error de red en recursos_generados:', err);
    return [];
  }
}

export async function saveRecursoGenerado(recurso: Omit<DbRecursoGenerado, 'created_at'> & { id?: string }): Promise<DbRecursoGenerado | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('recursos_generados')
      .upsert(recurso)
      .select()
      .single();

    if (error) {
      console.warn('Error al guardar recurso en Supabase:', error.message);
      return null;
    }
    return data as DbRecursoGenerado;
  } catch (err) {
    console.error('Error de red en saveRecursoGenerado:', err);
    return null;
  }
}

export async function deleteRecursoGenerado(recursoId: string, userId: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('recursos_generados')
      .delete()
      .eq('id', recursoId)
      .eq('user_id', userId);
    return !error;
  } catch (err) {
    console.error('Error al eliminar recurso generado:', err);
    return false;
  }
}

// ============================================================================
// 7. EVALUACION CONTINUA API (`evaluacion_continua`)
// Solo habilitado para usuarios ORO y PLATINO
// ============================================================================

export interface EvaluacionContinuaResult {
  success: boolean;
  data?: DbEvaluacionContinua;
  error?: string;
  requiresUpgrade?: boolean;
}

export async function getEvaluacionContinua(userId: string, userPlan: PlanTier, grupoId?: string): Promise<DbEvaluacionContinua[]> {
  // Verificar acceso por plan
  if (userPlan !== 'oro' && userPlan !== 'platino') {
    return [];
  }

  if (!supabase) return [];
  try {
    let query = supabase.from('evaluacion_continua').select('*').eq('user_id', userId);
    if (grupoId) {
      query = query.eq('grupo_id', grupoId);
    }
    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.warn('Error al obtener evaluación continua de Supabase:', error.message);
      return [];
    }
    return (data || []) as DbEvaluacionContinua[];
  } catch (err) {
    console.error('Error de red en evaluacion_continua:', err);
    return [];
  }
}

export async function saveEvaluacionContinua(
  evaluacion: Omit<DbEvaluacionContinua, 'created_at'> & { id?: string },
  userPlan: PlanTier
): Promise<EvaluacionContinuaResult> {
  // Solo habilitado para planes Oro y Platino
  if (userPlan !== 'oro' && userPlan !== 'platino') {
    return {
      success: false,
      requiresUpgrade: true,
      error: 'El módulo de Evaluación Continua y Seguimiento está disponible exclusivamente para planes Oro y Platino.'
    };
  }

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('evaluacion_continua')
        .upsert(evaluacion)
        .select()
        .single();

      if (error) {
        return {
          success: false,
          error: error.message
        };
      }
      return {
        success: true,
        data: data as DbEvaluacionContinua
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Error al conectar con Supabase'
      };
    }
  }

  return {
    success: true,
    data: {
      id: evaluacion.id || `eval_${Date.now()}`,
      user_id: evaluacion.user_id,
      grupo_id: evaluacion.grupo_id,
      alumno_id: evaluacion.alumno_id,
      fecha: evaluacion.fecha || new Date().toISOString().split('T')[0],
      criterio: evaluacion.criterio,
      calificacion: evaluacion.calificacion,
      observaciones: evaluacion.observaciones,
      contenido_json: evaluacion.contenido_json,
      created_at: new Date().toISOString()
    }
  };
}

export async function deleteEvaluacionContinua(evaluacionId: string, userId: string, userPlan: PlanTier): Promise<boolean> {
  if (userPlan !== 'oro' && userPlan !== 'platino') return false;
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('evaluacion_continua')
      .delete()
      .eq('id', evaluacionId)
      .eq('user_id', userId);
    return !error;
  } catch (err) {
    console.error('Error al eliminar evaluación continua:', err);
    return false;
  }
}
