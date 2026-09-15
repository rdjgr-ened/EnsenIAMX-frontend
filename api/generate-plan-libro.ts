import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI, Type } from '@google/genai';
import fs from 'fs';
import path from 'path';
import os from 'os';

// 1. Inicializar Supabase con SERVICE ROLE para lectura y escritura en la tabla gemini_pdf_cache
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: any, res: any) {
  // CORS Headers (Misma configuración que el archivo generate-plan original)
  res.setHeader?.("Access-Control-Allow-Credentials", "true");
  res.setHeader?.("Access-Control-Allow-Origin", "*");
  res.setHeader?.("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader?.(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido. Usa POST.' });

  try {
    let body = req.body;
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch (e) { /* ignore */ }
    }

    // Datos que enviará el Frontend (Ej. desde ProyectosGrid.tsx)
    const { 
      libroId, // Ej. "primaria_1_proyectos" (Debe coincidir con el nombre del PDF sin el .pdf)
      proyectoNombre, // Ej. "El rincón de la lectura"
      paginas, // Ej. "12-18"
      grado, 
      campoFormativo,
      numSesiones,
      duracionSesion,
      metodologia
    } = body || {};

    if (!libroId || !proyectoNombre || !paginas) {
      return res.status(400).json({ error: "Faltan datos clave del libro SEP para generar el proyecto (libroId, proyectoNombre o paginas)." });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "";
    if (!apiKey) return res.status(500).json({ error: "La variable GEMINI_API_KEY no está configurada." });

    const ai = new GoogleGenAI({ apiKey });

    console.log(`[Libros SEP] Procesando Libro: ${libroId} - Proyecto: ${proyectoNombre}`);

    // PASO 1: Buscar Caché en la tabla gemini_pdf_cache de Supabase
    const { data: cacheData } = await supabase
      .from('gemini_pdf_cache')
      .select('*')
      .eq('libro_id', libroId)
      .gt('expira_en', new Date().toISOString()) // Solo recuperar si no ha expirado
      .single();

    let geminiCacheName = cacheData?.cache_name;

    // PASO 2: Si no hay caché válido, descargar PDF, subir a Gemini y crear Caché
    if (!geminiCacheName) {
      console.log(`No hay caché activo. Descargando ${libroId}.pdf del bucket libros_sep...`);
      
      const { data: fileData, error: downloadError } = await supabase
        .storage
        .from('libros_sep')
        .download(`${libroId}.pdf`); // El nombre del archivo en Supabase debe ser exactamente {libroId}.pdf
        
      if (downloadError) throw new Error(`No se pudo descargar el libro ${libroId}.pdf del bucket: ${downloadError.message}`);
      
      const buffer = Buffer.from(await fileData.arrayBuffer());
      const tempFilePath = path.join(os.tmpdir(), `${libroId}.pdf`);
      fs.writeFileSync(tempFilePath, buffer);

      console.log(`Subiendo PDF a Gemini...`);
      const uploadResult = await ai.files.upload({ file: tempFilePath, mimeType: 'application/pdf' });

      console.log(`Creando Context Cache en Gemini para el archivo subido...`);
      const ttlSeconds = 3600; // El caché vivirá por 1 hora
      const cachedContent = await ai.caches.create({
        model: 'gemini-1.5-flash', // El modelo debe coincidir con el que se usará para generar el contenido
        contents: [
          { role: 'user', parts: [{ fileData: { fileUri: uploadResult.uri, mimeType: uploadResult.mimeType } }] }
        ],
        ttl: `${ttlSeconds}s`
      });

      geminiCacheName = cachedContent.name;

      // Guardar el nombre del caché y la fecha de expiración en Supabase
      const expirationDate = new Date(Date.now() + ttlSeconds * 1000).toISOString();
      await supabase.from('gemini_pdf_cache').upsert({ 
        libro_id: libroId, 
        cache_name: geminiCacheName, 
        expira_en: expirationDate 
      }, { onConflict: 'libro_id' }); // Actualiza la fila si el libro_id ya existía
        
      // Eliminar el PDF de la memoria temporal del servidor
      fs.unlinkSync(tempFilePath);
      console.log(`Caché creado exitosamente: ${geminiCacheName}`);
    } else {
      console.log(`Utilizando caché activo desde Supabase: ${geminiCacheName}`);
    }

    // PASO 3: Construcción del Prompt especializado para Libros SEP
    const prompt = `
      Eres un experto docente de la Nueva Escuela Mexicana (NEM). 
      Tienes en tu memoria (Context Cache) el libro de texto oficial de la SEP completo.
      
      TAREA:
      Localiza el proyecto titulado "${proyectoNombre}", que se encuentra aproximadamente entre las páginas ${paginas}.
      Diseña una secuencia didáctica completa, formal y detallada para este proyecto.
      
      DATOS DEL PROYECTO:
      - Grado: ${grado}
      - Campo Formativo: ${campoFormativo}
      - Metodología Sugerida: ${metodologia || 'Acorde al campo formativo'}
      - Duración por sesión: ${duracionSesion || "50 minutos"}
      - Total de sesiones a planear: ${numSesiones || 8}
      
      INSTRUCCIONES ESTRICTAS:
      1. Extrae el "propósito" y el "producto" final tal cual lo marca el libro en esas páginas.
      2. Divide las actividades del proyecto en ${numSesiones || 8} sesiones, respetando las fases/momentos de la metodología.
      3. Basa las actividades ("inicio", "desarrollo", "cierre") estrictamente en lo que dicen las páginas del libro. Menciona cuándo deben leer, qué ejercicios deben resolver y qué materiales necesitan según el texto oficial.
      4. Para cada sesión, llena el campo "evaluacionSesion" detallando qué criterios formativos se evaluarán ese día.
      5. La respuesta debe estar en Español de México, con ortografía y acentuación perfectas.
    `;

    // PASO 4: Definición del Esquema JSON (Mismo formato que espera PlaneacionPreview.tsx)
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        proposito: { type: Type.STRING },
        producto: { type: Type.STRING },
        fases: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              nombre: { type: Type.STRING },
              sesiones: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    numero: { type: Type.INTEGER },
                    titulo: { type: Type.STRING },
                    duracion: { type: Type.STRING },
                    materiales: { type: Type.ARRAY, items: { type: Type.STRING } },
                    inicio: { type: Type.STRING },
                    desarrollo: { type: Type.STRING },
                    cierre: { type: Type.STRING },
                    evaluacionSesion: { type: Type.STRING },
                  },
                  required: ["numero", "titulo", "duracion", "materiales", "inicio", "desarrollo", "cierre", "evaluacionSesion"],
                },
              },
            },
            required: ["nombre", "sesiones"],
          },
        },
        evaluacionFormativa: {
          type: Type.OBJECT,
          properties: {
            tecnicas: { type: Type.ARRAY, items: { type: Type.STRING } },
            instrumentos: { type: Type.ARRAY, items: { type: Type.STRING } },
            descripcion: { type: Type.STRING },
          },
          required: ["tecnicas", "instrumentos", "descripcion"],
        },
        sugerenciasAdecuacion: { type: Type.STRING },
      },
      required: ["proposito", "producto", "fases", "evaluacionFormativa", "sugerenciasAdecuacion"],
    };

    // PASO 5: Llamada final a Gemini usando el Context Cache
    const result = await ai.models.generateContent({
      model: 'gemini-1.5-flash', // El modelo debe coincidir con el utilizado al crear el caché
      contents: prompt,
      config: {
        cachedContent: geminiCacheName, // Inyección del ID del caché
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2, // Temperatura baja para que se apegue firmemente al texto del libro
      },
    });

    const responseText = result.text;
    if (!responseText) throw new Error("La IA no devolvió ningún texto.");

    const planData = JSON.parse(responseText.trim());
    
    // Devolver el JSON estructurado al Frontend
    return res.status(200).json({ success: true, plan: planData, fromCache: true });

  } catch (error: any) {
    console.error("Error en generate-plan-libro:", error);
    return res.status(500).json({ error: error.message || "Error interno al procesar el libro de la SEP." });
  }
}