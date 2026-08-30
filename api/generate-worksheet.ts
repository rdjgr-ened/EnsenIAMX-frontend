import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(req: any, res: any) {
  res.setHeader?.("Access-Control-Allow-Credentials", "true");
  res.setHeader?.("Access-Control-Allow-Origin", "*");
  res.setHeader?.("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader?.(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido." });

  try {
    let body = req.body;
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch (e) { /* ignore */ }
    }

    const {
      sesionNumero,
      sesionTitulo,
      sesionInicio,
      sesionDesarrollo,
      sesionCierre,
      sesionMateriales,
      faseNombre,
      grado,
      grupo,
      campoFormativo,
      disciplina,
      contenido,
      pda,
      nivel,
    } = body || {};

    if (!sesionTitulo) {
      return res.status(400).json({ error: "Los datos de la sesión son requeridos." });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "";
    if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY no configurada." });

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { "User-Agent": "aistudio-build" } },
    });

    const prompt = `
      Actúa como un Diseñador Pedagógico para la Nueva Escuela Mexicana (${nivel || 'Educación Básica'}).
      Transforma las actividades de la Sesión en una "HOJA DE TRABAJO IMPRIMIBLE Y EDITABLE PARA EL ALUMNO".
      - Sesión ${sesionNumero || 1}: ${sesionTitulo}
      - Fase: ${faseNombre || 'Secuencia Didáctica'}
      - Asignatura: ${disciplina || 'General'}
      - Campo: ${campoFormativo || 'General'}
      - Grado y Grupo: ${grado || 'Grado'} - ${grupo || 'A'}
      - Contenido: ${contenido || 'General'}
      - PDA: ${pda || 'General'}
      - Inicio: ${sesionInicio || ''}
      - Desarrollo: ${sesionDesarrollo || ''}
      - Cierre: ${sesionCierre || ''}
      - Materiales: ${(sesionMateriales || []).join(', ')}
    `;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        titulo: { type: Type.STRING },
        subtitulo: { type: Type.STRING },
        instruccionesGenerales: { type: Type.STRING },
        seccionInicio: {
          type: Type.OBJECT,
          properties: {
            titulo: { type: Type.STRING },
            instrucciones: { type: Type.STRING },
            ejercicios: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  numero: { type: Type.INTEGER },
                  preguntaOInstruccion: { type: Type.STRING },
                  lineasDeRespuesta: { type: Type.INTEGER },
                  opciones: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ["numero", "preguntaOInstruccion"],
              },
            },
          },
          required: ["titulo", "instrucciones", "ejercicios"],
        },
        seccionDesarrollo: {
          type: Type.OBJECT,
          properties: {
            titulo: { type: Type.STRING },
            instrucciones: { type: Type.STRING },
            ejercicios: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  numero: { type: Type.INTEGER },
                  preguntaOInstruccion: { type: Type.STRING },
                  textoOAuxiliar: { type: Type.STRING },
                  lineasDeRespuesta: { type: Type.INTEGER },
                },
                required: ["numero", "preguntaOInstruccion"],
              },
            },
          },
          required: ["titulo", "instrucciones", "ejercicios"],
        },
        seccionCierre: {
          type: Type.OBJECT,
          properties: {
            titulo: { type: Type.STRING },
            instrucciones: { type: Type.STRING },
            ejercicios: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  numero: { type: Type.INTEGER },
                  preguntaOInstruccion: { type: Type.STRING },
                  lineasDeRespuesta: { type: Type.INTEGER },
                },
                required: ["numero", "preguntaOInstruccion"],
              },
            },
          },
          required: ["titulo", "instrucciones", "ejercicios"],
        },
      },
      required: ["titulo", "subtitulo", "instruccionesGenerales", "seccionInicio", "seccionDesarrollo", "seccionCierre"],
    };

    const result = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.3,
      },
    });

    const responseText = result.text;
    if (!responseText) throw new Error("No se pudo generar la hoja de trabajo.");

    const worksheet = JSON.parse(responseText.trim());
    return res.status(200).json({ success: true, worksheet });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Error al generar la hoja de trabajo." });
  }
}
