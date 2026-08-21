import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// --- FUNCIONES DE PERSISTENCIA ADICIONALES ---

// Guardar Planeación Didáctica
export const savePlaneacion = async (planeacionData: any) => {
  if (!isSupabaseConfigured || !supabase) return;

  const userProfileStr = localStorage.getItem("nem_secundaria_profile");
  const userEmail = userProfileStr ? JSON.parse(userProfileStr)?.email : null;
  const userId = userEmail ? `user_${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}` : 'anonymous_user';

  const { data, error } = await supabase
    .from('planeaciones')
    .insert([
      {
        user_id: userId,
        disciplina: planeacionData.disciplina,
        grado: planeacionData.grado,
        grupo: planeacionData.grupo,
        contenido: planeacionData.contenido,
        pda: planeacionData.pda,
        contenido_json: planeacionData,
        created_at: new Date().toISOString()
      }
    ])
    .select();

  if (error) console.error("Error al guardar planeación:", error);
  return { data, error };
};

// Guardar Grupo con sus Alumnos
export const saveGrupoConAlumnos = async (grupoNombre: string, grado: string, alumnos: string[]) => {
  if (!isSupabaseConfigured || !supabase) return;

  const userProfileStr = localStorage.getItem("nem_secundaria_profile");
  const userEmail = userProfileStr ? JSON.parse(userProfileStr)?.email : null;
  const userId = userEmail ? `user_${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}` : 'anonymous_user';

  const { data: grupo, error: errGrupo } = await supabase
    .from('grupos')
    .insert([{ user_id: userId, nombre: grupoNombre, grado }])
    .select()
    .single();

  if (errGrupo) {
    console.error("Error al guardar grupo:", errGrupo);
    return;
  }

  if (alumnos && alumnos.length > 0) {
    const alumnosPayload = alumnos.map(nombre => ({
      user_id: userId,
      grupo_id: grupo.id,
      nombre: nombre.trim()
    }));
    await supabase.from('alumnos').insert(alumnosPayload);
  }
};

// Guardar Incidencia en Bitácora
export const saveIncidencia = async (incidenciaData: { alumnoId: string; descripcion: string; tipo: string }) => {
  if (!isSupabaseConfigured || !supabase) return;

  const userProfileStr = localStorage.getItem("nem_secundaria_profile");
  const userEmail = userProfileStr ? JSON.parse(userProfileStr)?.email : null;
  const userId = userEmail ? `user_${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}` : 'anonymous_user';

  const { data, error } = await supabase
    .from('incidencias')
    .insert([
      {
        user_id: userId,
        alumno_id: incidenciaData.alumnoId,
        descripcion: incidenciaData.descripcion,
        tipo_incidencia: incidenciaData.tipo,
        fecha: new Date().toISOString()
      }
    ]);

  if (error) console.error("Error guardando incidencia:", error);
  return data;
};