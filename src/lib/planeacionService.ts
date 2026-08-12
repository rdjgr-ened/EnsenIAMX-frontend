import { supabase } from '../lib/supabase';

export interface Planeacion {
  id?: string;
  usuario_id?: string;
  titulo: string;
  tipo?: 'Plano Didactico' | 'Programa Analitico' | 'Otro';
  grado?: string;
  campo_formativo?: string;
  disciplina?: string;
  contenido_pda?: Record<string, any>;
  contenido_generado: string;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}

/**
 * Guarda una nueva planeación en la base de datos de Supabase.
 */
export async function guardarPlaneacion(planeacion: Omit<Planeacion, 'id' | 'usuario_id' | 'fecha_creacion' | 'fecha_actualizacion'>) {
  try {
    // 1. Obtener la sesión del usuario actual
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error('Usuario no autenticado.');
    }

    // 2. Insertar la planeación vinculada al ID del usuario
    const { data, error } = await supabase
      .from('planeaciones')
      .insert([
        {
          ...planeacion,
          usuario_id: user.id,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error al guardar planeación:', error.message);
      throw error;
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Obtiene todas las planeaciones creadas por el docente autenticado.
 */
export async function obtenerPlaneaciones() {
  try {
    const { data, error } = await supabase
      .from('planeaciones')
      .select('*')
      .order('fecha_creacion', { ascending: false });

    if (error) {
      console.error('Error al obtener planeaciones:', error.message);
      throw error;
    }

    return { success: true, data: data as Planeacion[] };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Elimina una planeación específica por su ID.
 */
export async function eliminarPlaneacion(id: string) {
  try {
    const { error } = await supabase
      .from('planeaciones')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error al eliminar planeación:', error.message);
      throw error;
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}