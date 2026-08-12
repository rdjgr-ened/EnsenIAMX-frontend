import { supabase } from '../lib/supabase';

export const iniciarSesion = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const registrarUsuario = async (
  email: string, 
  password: string, 
  perfilCompleto?: { nombreDocente: string; escuelas: Array<{ nombre: string; cct: string }> }
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window.location.origin,
      data: {
        nombre_docente: perfilCompleto?.nombreDocente || '',
        escuelas: perfilCompleto?.escuelas || [],
      },
    },
  });
  if (error) throw error;
  return data;
};

export const recuperarPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
  return data;
};

export const cerrarSesion = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};