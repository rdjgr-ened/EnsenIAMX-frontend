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

    const { nivel, grado, campoFormativo, disciplina, situacionProblema } = body || {};

    if (!nivel || !grado || !campoFormativo || !disciplina || !situacionProblema) {
      return res.status(400).json({ error: "Todos los campos son requeridos." });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "";
    if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY no configurada." });

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { "User-Agent": "aistudio-build" } },
    });

    const prompt = `
      Eres un metodólogo educativo experto en la Nueva Escuela Mexicana (NEM) y el Plan de Estudio 2022.
      Sugiere exactamente 3 opciones de Contenidos y su respectivo Proceso de Desarrollo de Aprendizaje (PDA) oficiales o pertinentes para:
      - Nivel: ${nivel}
      - Grado: ${grado}
      - Campo Formativo: ${campoFormativo}
      - Disciplina: ${disciplina}
      - Situación-Problema: "${situacionProblema}"
    `;

    const responseSchema = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          contenido: { type: Type.STRING },
          pda: { type: Type.STRING },
        },
        required: ["contenido", "pda"],
      },
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
    if (!responseText) throw new Error("No se recibió respuesta.");

    const suggestions = JSON.parse(responseText.trim());
    return res.status(200).json({ success: true, suggestions });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Error al sugerir contenidos." });
  }
}
