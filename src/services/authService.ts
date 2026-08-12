import { supabase } from '../lib/supabase';

/**
 * Registra un nuevo docente con correo y contraseña.
 */
export async function registrarDocente(email: string, password: string, nombreCompleto: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: nombreCompleto,
        },
      },
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Inicia sesión para un docente existente.
 */
export async function iniciarSesionDocente(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Cierra la sesión activa.
 */
export async function cerrarSesion() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Obtiene la información del perfil del usuario logueado desde la tabla 'perfiles'.
 */
export async function obtenerPerfilActual() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('perfiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    return null;
  }
}