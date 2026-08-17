import { GoogleGenAI } from "@google/genai";
import {
  getOrCreateNemPromptCache,
  NEM_STATIC_CURRICULUM_SYSTEM_INSTRUCTION,
} from "../src/utils/nemContextCache";

export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Método no permitido. Utilice POST para comunicarse con el servidor de Gemini.",
    });
  }

  try {
    // Parse body if it arrived as a string
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({
          success: false,
          error: "El cuerpo de la petición no contiene un JSON válido.",
        });
      }
    }

    const {
      prompt,
      contents,
      systemInstruction,
      responseSchema,
      responseMimeType,
      temperature,
      model,
      useNemCache = true,
    } = body || {};

    const promptContent = prompt || contents;
    if (!promptContent) {
      return res.status(400).json({
        success: false,
        error: "El campo 'prompt' o 'contents' es requerido para generar la respuesta.",
      });
    }

    // Read API key securely from Server Environment Variables
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "";
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: "La clave GEMINI_API_KEY no está configurada en las variables de entorno del servidor.",
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const selectedModel = model || "gemini-3.6-flash";
    const generationConfig: any = {};

    // 1. Context Caching (Prompt Caching) Implementation
    if (useNemCache) {
      try {
        const cacheResourceName = await getOrCreateNemPromptCache(ai, selectedModel);
        if (cacheResourceName) {
          generationConfig.cachedContent = cacheResourceName;
          console.log(`[Prompt Caching] Applied cachedContent: ${cacheResourceName}`);
        } else {
          // Graceful fallback: supply systemInstruction directly
          generationConfig.systemInstruction =
            systemInstruction || NEM_STATIC_CURRICULUM_SYSTEM_INSTRUCTION;
        }
      } catch (cacheError) {
        console.warn("[Prompt Caching] Fallback to direct systemInstruction:", cacheError);
        generationConfig.systemInstruction =
          systemInstruction || NEM_STATIC_CURRICULUM_SYSTEM_INSTRUCTION;
      }
    } else if (systemInstruction) {
      generationConfig.systemInstruction = systemInstruction;
    }

    if (responseMimeType) {
      generationConfig.responseMimeType = responseMimeType;
    }
    if (responseSchema) {
      generationConfig.responseSchema = responseSchema;
    }
    if (typeof temperature === "number") {
      generationConfig.temperature = temperature;
    }

    // 2. Execute call with cached static context + new dynamic tokens
    const result = await ai.models.generateContent({
      model: selectedModel,
      contents: promptContent,
      config: generationConfig,
    });

    const responseText = result.text || "";

    // If application/json was requested, parse and return clean data
    if (responseMimeType === "application/json" && responseText.trim()) {
      try {
        const parsedData = JSON.parse(responseText.trim());
        return res.status(200).json({
          success: true,
          text: responseText,
          data: parsedData,
          cached: !!generationConfig.cachedContent,
        });
      } catch (parseErr: any) {
        console.error("Error parsing JSON output from Gemini:", parseErr);
        return res.status(200).json({
          success: true,
          text: responseText,
          data: null,
          cached: !!generationConfig.cachedContent,
          warning: "La respuesta no pudo ser parseada automáticamente a JSON.",
        });
      }
    }

    return res.status(200).json({
      success: true,
      text: responseText,
      cached: !!generationConfig.cachedContent,
    });
  } catch (error: any) {
    console.error("Error in /api/generate serverless function:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Ocurrió un error en la Serverless Function al comunicarse con Gemini.",
    });
  }
}

