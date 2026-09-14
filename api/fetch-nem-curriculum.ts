import { createClient } from '@supabase/supabase-js';

// Inicializa el cliente de Supabase utilizando tus variables de entorno
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: any, res: any) {
  // Manejo de CORS (si tu frontend y backend están en distintos dominios)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Método no permitido. Usa POST.' });
  }

  // Recibimos la petición del frontend (ahora incluye minId y maxId)
  const { nivel, grado, campoFormativo, disciplina, minId, maxId } = req.body;

  try {
    // Iniciamos la consulta base
    let query = supabase.from('contenidos').select('id, contenido, pdas');

    // EL ESCUDO INFALIBLE: Si el frontend envió los rangos numéricos, ignoramos el texto y los acentos.
    if (minId !== undefined && maxId !== undefined) {
      query = query.gte('id', minId).lte('id', maxId);
    } 
    // PLAN DE RESPALDO: Si no hay IDs, buscamos de la forma tradicional
    else {
      if (campoFormativo) {
        query = query.eq('campo_formativo', campoFormativo);
      }
      if (disciplina && disciplina !== "General") {
        query = query.eq('disciplina', disciplina);
      }
    }

    // Ejecutamos la consulta y la ordenamos cronológicamente
    const { data, error } = await query.order('id', { ascending: true });

    if (error) {
      throw error;
    }

    // Formateamos los datos para evitar errores si la columna pdas es string en vez de jsonb
    const contenidosFormateados = data.map((item: any) => ({
      id: item.id,
      contenido: item.contenido,
      pdas: typeof item.pdas === 'string' ? JSON.parse(item.pdas) : (item.pdas || [])
    }));

    // Retornamos el éxito al frontend
    return res.status(200).json({
      success: true,
      contenidos: contenidosFormateados
    });

  } catch (error: any) {
    console.error('Error en la API fetch-nem-curriculum:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Error interno al consultar la base de datos.'
    });
  }
}