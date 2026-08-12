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
  return data;
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