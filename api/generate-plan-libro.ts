import { GoogleGenAI, Type } from '@google/genai';

export default async function handler(req: any, res: any) {
  // 1. Cabeceras de seguridad y CORS (Igual que en tu función principal)
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

    // 2. Extraemos los datos que nos manda ProyectosDeAula.tsx
    const { 
      proyectoNombre, // Ej: "Conozcamos las maravillas de la lectura"
      grado,          // Ej: "1° Grado"
      campoFormativo, // Ej: "Lenguajes"
      paginas,        // Ej: "12-19"
      numSesiones,
      duracionSesion,
      metodologia
    } = body || {};

    if (!proyectoNombre || !grado || !campoFormativo) {
      return res.status(400).json({ error: "Faltan datos del proyecto para generar la planeación." });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "";
    if (!apiKey) return res.status(500).json({ error: "La variable GEMINI_API_KEY no está configurada." });

    // 3. Inicializamos Gemini con el modelo oficial que estás usando
    const ai = new GoogleGenAI({ apiKey });
    const selectedModel = 'gemini-3.6-flash'; 

    console.log(`[Libros SEP] Diseñando secuencia para: ${proyectoNombre} (${grado} - ${campoFormativo})`);

    // 4. El Prompt Mágico (Igual que en tu función principal, enfocado en NEM)
    const prompt = `
      Eres un experto docente de la Nueva Escuela Mexicana (NEM). 
      
      TAREA:
      Diseña una secuencia didáctica completa, formal y detallada para el "Proyecto de Aula" de los libros de texto gratuitos de la SEP titulado: "${proyectoNombre}".
      Este proyecto se encuentra aproximadamente en las páginas ${paginas} del libro de proyectos.
      
      DATOS DEL PROYECTO:
      - Grado: ${grado}
      - Campo Formativo: ${campoFormativo}
      - Metodología Sugerida: ${metodologia || 'Acorde al campo formativo'}
      - Duración por sesión: ${duracionSesion || "50 minutos"}
      - Total de sesiones a planear: ${numSesiones || 8}
      
      INSTRUCCIONES ESTRICTAS:
      1. Define un "propósito" pedagógico claro y un "producto" final realista para este proyecto.
      2. Divide el proyecto en ${numSesiones || 8} sesiones, respetando las fases/momentos de la metodología NEM correspondiente al campo formativo.
      3. Desarrolla las actividades de "inicio", "desarrollo" y "cierre" de cada sesión de manera práctica, asumiendo el uso del libro de texto y el trabajo comunitario.
      4. Llena el campo "evaluacionSesion" detallando qué criterios formativos se evaluarán ese día.
      5. Genera sugerencias de adecuación DUA (Diseño Universal para el Aprendizaje).
      6. La respuesta debe estar en Español de México, con ortografía impecable.
    `;

    // 5. Esquema JSON (Idéntico a tu función original para que el Frontend lo dibuje perfecto)
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

    // 6. Ejecutamos la petición directa a Gemini (Sin descargas de PDF, super rápido)
    const result = await ai.models.generateContent({
      model: selectedModel,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.3, // Temperatura baja para respuestas coherentes y estructuradas
      },
    });

    const responseText = result.text;
    if (!responseText) throw new Error("La IA no devolvió ningún texto.");

    const planData = JSON.parse(responseText.trim());
    
    // Retornamos el éxito al Frontend
    return res.status(200).json({ success: true, plan: planData });

  } catch (error: any) {
    console.error("Error en generate-plan-libro:", error);
    return res.status(500).json({ error: error.message || "Error interno al generar la planeación del libro." });
  }
}