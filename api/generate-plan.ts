import { GoogleGenAI, Type } from "@google/genai";
import {
  getOrCreateNemPromptCache,
  NEM_STATIC_CURRICULUM_SYSTEM_INSTRUCTION,
} from "../src/utils/nemContextCache";

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

    const {
      nivel,
      campoFormativo,
      disciplina,
      grado,
      contenido,
      pda,
      ejesArticuladores,
      metodologia,
      situacionProblema,
      docenteName,
      escuelaName,
      cct,
      grupo,
      duracionSemanas,
      numSesiones,
      duracionSesion,
      bapSelected,
    } = body || {};

    if (!campoFormativo || !disciplina || !contenido || !pda || !metodologia) {
      return res.status(400).json({ error: "Faltan campos obligatorios para generar la planeación didáctica." });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "";
    if (!apiKey) {
      return res.status(500).json({ error: "La variable GEMINI_API_KEY no está configurada." });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { "User-Agent": "aistudio-build" } },
    });

    const nivelEducativo = nivel || "Secundaria";
    let roleText = "";
    if (nivelEducativo.toLowerCase() === "preescolar") {
      roleText = "Eres un docente de educación preescolar en México de alta experiencia, especialista en el diseño y planeación de proyectos didácticos alineados a la Nueva Escuela Mexicana (NEM) y el Plan de Estudio 2022 (Fase 2).";
    } else if (nivelEducativo.toLowerCase() === "primaria") {
      roleText = "Eres un docente de educación primaria en México de alta experiencia, especialista en el diseño y planeación de proyectos didácticos alineados a la Nueva Escuela Mexicana (NEM) y el Plan de Estudio 2022 (Fases 3, 4 y 5).";
    } else {
      roleText = "Eres un docente de educación secundaria en México de alta experiencia, especialista en el diseño y planeación de proyectos didácticos alineados a la Nueva Escuela Mexicana (NEM) y el Plan de Estudio 2022 (Fase 6).";
    }

    const prompt = `
      ${roleText}
      Diseña una secuencia didáctica completa y altamente profesional para:
      
      DATOS GENERALES DE REFERENCIA:
      - Nivel Educativo: ${nivelEducativo}
      - Docente: ${docenteName || "Docente Titular"}
      - Escuela: ${escuelaName || "Escuela de Educación Básica"}
      - C.C.T.: ${cct || "CCT"}
      - Grupo/Grado: ${grado} - Grupo ${grupo || "A"}
      - Duración estimada: ${duracionSemanas || "2 semanas"}
      - Duración por sesión de clase: ${duracionSesion || "50 minutos"}

      ELEMENTOS CURRICULARES OFICIALES (NEM):
      - Campo Formativo: ${campoFormativo}
      - Disciplina: ${disciplina}
      - Contenido Sintético: ${contenido}
      - Proceso de Desarrollo de Aprendizaje (PDA): ${pda}
      - Ejes Articuladores seleccionados: ${ejesArticuladores?.join(", ") || "No especificados"}
      - Metodología NEM sugerida: ${metodologia}
      
      BARRERAS PARA EL APRENDIZAJE Y LA PARTICIPACIÓN (BAP) / APTITUDES SOBRESALIENTES:
      ${bapSelected && bapSelected.length > 0 ? bapSelected.map((b: string) => `- ${b}`).join("\n      ") : "- Ninguna barrera específica registrada. El diseño debe enfocarse en la inclusión general."}

      SITUACIÓN-PROBLEMA DEL CONTEXTO:
      "${situacionProblema || "Situación formativa de contexto relevante para la comunidad escolar."}"

      DIRECTRICES METODOLÓGICAS (SEP):
      Genera exactamente ${numSesiones || 8} sesiones bien estructuradas en total, distribuidas equitativamente entre las fases, etapas o momentos de la metodología. CADA sesión escolar individual DEBE durar exactamente ${duracionSesion || "50 minutos"}.
      
      CRÍTICO: No dejes la evaluación formativa al final del proyecto como una sección vacía. En el campo 'evaluacionSesion' de cada sesión, explica detalladamente los criterios de evaluación, indicadores de logro e instrumentos aplicables a esa sesión.
      
      IDIOMA Y ORTOGRAFÍA CRÍTICOS: El idioma de respuesta DEBE ser Español (México) de manera impecable con toda la acentuación correcta (á, é, í, ó, ú, ñ).
    `;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        proposito: { type: Type.STRING, description: "Propósito didáctico del proyecto redactado formalmente." },
        producto: { type: Type.STRING, description: "Descripción detallada del producto didáctico." },
        fases: {
          type: Type.ARRAY,
          description: "Las fases, etapas o momentos correspondientes a la metodología NEM seleccionada.",
          items: {
            type: Type.OBJECT,
            properties: {
              nombre: { type: Type.STRING, description: "Nombre formal de la fase o momento." },
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

    const selectedModel = "gemini-2.5-flash";
    const planConfig: any = {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
      temperature: 0.2,
    };

    try {
      const cacheResourceName = await getOrCreateNemPromptCache(ai, selectedModel);
      if (cacheResourceName) planConfig.cachedContent = cacheResourceName;
      else planConfig.systemInstruction = NEM_STATIC_CURRICULUM_SYSTEM_INSTRUCTION;
    } catch {
      planConfig.systemInstruction = NEM_STATIC_CURRICULUM_SYSTEM_INSTRUCTION;
    }

    const result = await ai.models.generateContent({
      model: selectedModel,
      contents: prompt,
      config: planConfig,
    });

    const responseText = result.text;
    if (!responseText) throw new Error("No se pudo obtener una respuesta válida de Gemini.");

    const planData = JSON.parse(responseText.trim());
    return res.status(200).json({ success: true, plan: planData, cached: !!planConfig.cachedContent });
  } catch (error: any) {
    console.error("Error in generate-plan serverless function:", error);
    return res.status(500).json({ error: error.message || "Error al generar la planeación." });
  }
}
