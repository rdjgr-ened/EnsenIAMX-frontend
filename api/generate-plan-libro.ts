import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI, Type } from '@google/genai';
import fs from 'fs';
import path from 'path';
import os from 'os';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: any, res: any) {
  // CORS Headers
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

    const { libroId, proyectoNombre, paginas, grado, campoFormativo, numSesiones, duracionSesion, metodologia } = body || {};

    if (!libroId || !proyectoNombre || !paginas) {
      return res.status(400).json({ error: "Faltan datos clave del libro SEP para generar el proyecto." });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "";
    if (!apiKey) return res.status(500).json({ error: "La variable GEMINI_API_KEY no está configurada." });

    const ai = new GoogleGenAI({ apiKey });
    
    // MODELO ESTRICTO REQUERIDO POR GOOGLE PARA CACHING
    const MODELO_CACHE = 'gemini-3.6-flash';

    console.log(`[Libros SEP] Procesando Libro: ${libroId} - Proyecto: ${proyectoNombre}`);

    // PASO 1: Buscar Caché en la base de datos
    const { data: cacheData } = await supabase
      .from('gemini_pdf_cache')
      .select('*')
      .eq('libro_id', libroId)
      .gt('expira_en', new Date().toISOString())
      .single();

    let geminiCacheName = cacheData?.cache_name;

    // PASO 2: Si no hay caché válido, descargamos de forma robusta
    if (!geminiCacheName) {
      console.log(`Obteniendo URL segura para ${libroId}.pdf...`);
      
      // SOLUCIÓN A LOS 0 TOKENS: Descarga mediante Signed URL y Fetch nativo
      const { data: signedData, error: signError } = await supabase
        .storage
        .from('libros_sep')
        .createSignedUrl(`${libroId}.pdf`, 60); // URL válida por 60 segundos

      if (signError || !signedData?.signedUrl) {
        throw new Error(`No se pudo acceder al libro ${libroId}.pdf en Supabase.`);
      }

      console.log(`Descargando PDF desde la URL segura...`);
      const fileResponse = await fetch(signedData.signedUrl);
      if (!fileResponse.ok) throw new Error("Falló la descarga del PDF.");

      const arrayBuffer = await fileResponse.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Verificación de seguridad (Si pesa menos de 10KB, está corrupto)
      if (buffer.length < 10000) {
        throw new Error(`El PDF descargado está corrupto o vacío (Tamaño: ${buffer.length} bytes). Revisa el archivo en Supabase.`);
      }

      const tempFilePath = path.join(os.tmpdir(), `${libroId}.pdf`);
      fs.writeFileSync(tempFilePath, buffer);

      console.log(`Subiendo PDF de ${buffer.length} bytes a Gemini...`);
      let uploadResult = await ai.files.upload({ file: tempFilePath, mimeType: 'application/pdf' });

      // ESPERAR A QUE GEMINI EXTRAIGA EL TEXTO DEL PDF
      console.log(`Esperando a que Gemini extraiga el texto del PDF...`);
      while (uploadResult.state === 'PROCESSING') {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Esperar 2 segundos
        uploadResult = await ai.files.get({ name: uploadResult.name });
      }

      if (uploadResult.state === 'FAILED') {
        fs.unlinkSync(tempFilePath);
        throw new Error("Google Gemini falló al procesar el texto del PDF.");
      }

      console.log(`Creando Context Cache en Gemini...`);
      const ttlSeconds = 3600; 
      const cachedContent = await ai.caches.create({
        model: MODELO_CACHE, 
        contents: [
          { role: 'user', parts: [{ fileData: { fileUri: uploadResult.uri, mimeType: uploadResult.mimeType } }] }
        ],
        ttl: `${ttlSeconds}s`
      });

      geminiCacheName = cachedContent.name;

      const expirationDate = new Date(Date.now() + ttlSeconds * 1000).toISOString();
      await supabase.from('gemini_pdf_cache').upsert({ 
        libro_id: libroId, 
        cache_name: geminiCacheName, 
        expira_en: expirationDate 
      }, { onConflict: 'libro_id' }); 
        
      fs.unlinkSync(tempFilePath);
      console.log(`Caché creado exitosamente: ${geminiCacheName}`);
    } else {
      console.log(`Utilizando caché activo desde Supabase: ${geminiCacheName}`);
    }

    // PASO 3: Construcción del Prompt
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
      1. Extrae el "propósito" y el "producto" final tal cual lo marca el libro.
      2. Divide las actividades del proyecto en ${numSesiones || 8} sesiones.
      3. Basa las actividades ("inicio", "desarrollo", "cierre") en lo que dicen las páginas del libro.
      4. Para cada sesión, llena el campo "evaluacionSesion" detallando qué evaluar.
      5. La respuesta debe estar en Español de México, con ortografía impecable.
    `;

    // PASO 4: Esquema JSON (Intacto)
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

    // PASO 5: Generar Contenido
    const result = await ai.models.generateContent({
      model: MODELO_CACHE,
      contents: prompt,
      config: {
        cachedContent: geminiCacheName,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2, 
      },
    });

    const responseText = result.text;
    if (!responseText) throw new Error("La IA no devolvió ningún texto.");

    const planData = JSON.parse(responseText.trim());
    return res.status(200).json({ success: true, plan: planData, fromCache: true });

  } catch (error: any) {
    console.error("Error crítico en generate-plan-libro:", error);
    return res.status(500).json({ error: error.message || "Error interno al procesar el libro de la SEP." });
  }
}