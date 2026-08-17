import { GoogleGenAI, Type } from "@google/genai";
import {
  getOrCreateNemPromptCache,
  NEM_STATIC_CURRICULUM_SYSTEM_INSTRUCTION,
} from "../src/utils/nemContextCache.js";
import { getOficialContenidos } from "../src/data/nemCurriculumService.js";

export default async function handler(req: any, res: any) {
  res.setHeader?.("Access-Control-Allow-Credentials", "true");
  res.setHeader?.("Access-Control-Allow-Origin", "*");
  res.setHeader?.("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader?.(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido. Utilice POST." });

  try {
    let body = req.body;
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch (e) { /* ignore */ }
    }

    const { nivel, grado, campoFormativo, disciplina } = body || {};

    if (!nivel || !grado || !campoFormativo) {
      return res.status(400).json({ 
        error: "Nivel, grado y campo formativo son requeridos para la consulta curricular." 
      });
    }

    // 1. Try local verified comprehensive catalogue first (<1ms response time, 100% fidelity)
    try {
      const officialList = getOficialContenidos(nivel, grado, campoFormativo, disciplina);
      if (officialList && officialList.length > 0) {
        return res.status(200).json({
          success: true,
          source: "official_nem_catalogue",
          contenidos: officialList,
          cached: true,
        });
      }
    } catch (catErr) {
      console.warn("Could not query local official catalogue in serverless:", catErr);
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "";
    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY no está configurada." });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { "User-Agent": "aistudio-build" } },
    });

    const selectedModel = "gemini-3.7-flash";
    const prompt = `
      Eres el Catálogo Curricular Oficial de la Nueva Escuela Mexicana (NEM) y el Plan de Estudio 2022-2026 de la SEP.
      Extrae y devuelve la lista oficial completa de TODOS los Contenidos Sintéticos Curriculares de la NEM y sus respectivos PDAs para:
      - Nivel Educativo: ${nivel}
      - Grado Escolar: ${grado}
      - Campo Formativo: ${campoFormativo}
      - Disciplina / Asignatura: ${disciplina || "General"}
    `;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        contenidos: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              contenido: { type: Type.STRING },
              pdas: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ["id", "contenido", "pdas"],
          },
        },
      },
      required: ["contenidos"],
    };

    const generationConfig: any = {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
      temperature: 0.1,
    };

    try {
      const cacheResourceName = await getOrCreateNemPromptCache(ai, selectedModel);
      if (cacheResourceName) generationConfig.cachedContent = cacheResourceName;
      else generationConfig.systemInstruction = NEM_STATIC_CURRICULUM_SYSTEM_INSTRUCTION;
    } catch {
      generationConfig.systemInstruction = NEM_STATIC_CURRICULUM_SYSTEM_INSTRUCTION;
    }

    const result = await ai.models.generateContent({
      model: selectedModel,
      contents: prompt,
      config: generationConfig,
    });

    const responseText = result.text;
    if (!responseText) throw new Error("No se recibió respuesta de Gemini.");

    const parsed = JSON.parse(responseText.trim());
    return res.status(200).json({
      success: true,
      contenidos: parsed.contenidos || [],
      cached: !!generationConfig.cachedContent,
    });
  } catch (error: any) {
    console.error("Error in fetch-nem-curriculum serverless handler:", error);
    return res.status(500).json({ error: error.message || "Error curricular." });
  }
}