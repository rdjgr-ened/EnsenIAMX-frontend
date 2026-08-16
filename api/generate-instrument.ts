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
      instrumentName,
      grado,
      grupo,
      campoFormativo,
      disciplina,
      contenido,
      pda,
      producto,
      situacionProblema,
      proposito,
      nivel,
    } = body || {};

    if (!instrumentName) {
      return res.status(400).json({ error: "El nombre del instrumento es requerido." });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "";
    if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY no configurada." });

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { "User-Agent": "aistudio-build" } },
    });

    const prompt = `
      Actúa como un Pedagogo Especialista en Evaluación Formativa para la Nueva Escuela Mexicana (NEM) en México (${nivel || 'Educación Básica'}).
      Diseña un instrumento de evaluación formativa completo para:
      - Instrumento Solicitado: "${instrumentName}"
      - Producto a Evaluar: "${producto || 'Producto del proyecto'}"
      - Propósito: "${proposito || 'Desarrollo de aprendizajes'}"
      - Campo Formativo: "${campoFormativo || 'General'}"
      - Disciplina: "${disciplina || 'General'}"
      - Grado y Grupo: "${grado || 'Grado'} - Grupo ${grupo || 'A'}"
      - Contenido: "${contenido || 'Sin especificar'}"
      - PDA: "${pda || 'Sin especificar'}"
      - Situación-Problema: "${situacionProblema || 'Entorno escolar'}"
    `;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        titulo: { type: Type.STRING },
        tipoInstrumento: { type: Type.STRING },
        instrucciones: { type: Type.STRING },
        criteriosRubrica: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              criterio: { type: Type.STRING },
              ponderacion: { type: Type.STRING },
              sobresaliente: { type: Type.STRING },
              satisfactorio: { type: Type.STRING },
              basico: { type: Type.STRING },
              requiereApoyo: { type: Type.STRING },
            },
            required: ["criterio", "sobresaliente", "satisfactorio", "basico", "requiereApoyo"],
          },
        },
        itemsListaCotejo: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              num: { type: Type.INTEGER },
              criterio: { type: Type.STRING },
              indicador: { type: Type.STRING },
              puntosMaximos: { type: Type.INTEGER },
            },
            required: ["num", "criterio", "indicador"],
          },
        },
        itemsEscalaEstimativa: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              num: { type: Type.INTEGER },
              aspecto: { type: Type.STRING },
              escala: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["num", "aspecto"],
          },
        },
        guiaObservacion: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              num: { type: Type.INTEGER },
              aspecto: { type: Type.STRING },
              focoAtencion: { type: Type.STRING },
            },
            required: ["num", "aspecto", "focoAtencion"],
          },
        },
        preguntasCuestionario: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              num: { type: Type.INTEGER },
              pregunta: { type: Type.STRING },
              opciones: { type: Type.ARRAY, items: { type: Type.STRING } },
              respuestaCorrecta: { type: Type.STRING },
              espacioRespuesta: { type: Type.BOOLEAN },
            },
            required: ["num", "pregunta"],
          },
        },
        retroalimentacionFormativa: { type: Type.STRING },
        puntuacionMaximaTotal: { type: Type.STRING },
        escalaEvaluacionTexto: { type: Type.STRING },
      },
      required: ["titulo", "tipoInstrumento", "instrucciones", "retroalimentacionFormativa"],
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
    if (!responseText) throw new Error("No se pudo generar el instrumento.");

    const instrument = JSON.parse(responseText.trim());
    return res.status(200).json({ success: true, instrument });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Error al diseñar el instrumento." });
  }
}
