import { supabase } from '../lib/supabase';

/**
 * Inicia sesión con correo y contraseña en Supabase.
 */
export const iniciarSesion = async (email: string, pass: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: pass,
  });

  if (error) throw error;
  return data;
};

/**
 * Registra un nuevo usuario en Supabase con sus metadatos de perfil.
 */
export const registrarUsuario = async (
  email: string, 
  pass: string, 
  userMetadata: { nombreDocente: string; escuelas: Array<{ nombre: string; cct: string }> }
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password: pass,
    options: {
      data: userMetadata,
    },
  });

  if (error) throw error;

  // 1. Detectar si el usuario ya existe (Supabase no lanza error, pero envía identities vacío)
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    throw new Error('Este correo ya está registrado. Por favor, inicia sesión.');
  }

  // 2. Si se requiere confirmación por correo y no hay sesión activa
  if (!data.session && data.user) {
    return { ...data, requiresEmailConfirmation: true };
  }

  return data;
};

/**
 * Valida en tiempo real si el usuario actual sigue existiendo en Supabase.
 * Si el usuario fue eliminado desde el panel, cierra la sesión local.
 */
export const obtenerUsuarioActual = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    // Si el usuario fue eliminado en Supabase o el token venció, cerrar sesión
    await supabase.auth.signOut();
    return null;
  }

  return user;
};

/**
 * Envía un correo para restablecer la contraseña.
 */
export const recuperarPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin,
  });

  if (error) throw error;
  return data;
};

/**
 * Cierra la sesión activa.
 */
export const cerrarSesion = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};