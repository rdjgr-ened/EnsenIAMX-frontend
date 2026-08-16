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

    const { nivel, grado, situacionProblema } = body || {};

    if (!nivel || !grado || !situacionProblema) {
      return res.status(400).json({ error: "Nivel, grado y situación problema son obligatorios." });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "";
    if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY no configurada." });

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { "User-Agent": "aistudio-build" } },
    });

    const prompt = `
      Eres un metodólogo educativo experto de alto nivel en la Nueva Escuela Mexicana (NEM) y el Plan de Estudio 2022.
      Redacta y estructura el Programa Analítico oficial (Codiseño y Contextualización) para:
      - Nivel Educativo: ${nivel}
      - Grado: ${grado}
      - Situación-Problema: "${situacionProblema}"

      Para cada uno de los 4 Campos Formativos, incorpora PDAs clasificados en 'normal', 'modificado' o 'nuevo'.
      En Preescolar, 'disciplina' debe ser "" o "General". En Secundaria, incluye disciplinas específicas (Matemáticas, Español, Historia, etc.).
    `;

    const pdaItemSchema = {
      type: Type.OBJECT,
      properties: {
        contenido: { type: Type.STRING },
        pda: { type: Type.STRING },
        tipo: { type: Type.STRING },
        nota: { type: Type.STRING },
        disciplina: { type: Type.STRING },
      },
      required: ["contenido", "pda", "tipo", "disciplina"],
    };

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        fase: { type: Type.STRING },
        grado: { type: Type.STRING },
        problema: { type: Type.STRING },
        nombreProyecto: { type: Type.STRING },
        camposFormativos: {
          type: Type.OBJECT,
          properties: {
            saberes: { type: Type.ARRAY, items: pdaItemSchema },
            lenguajes: { type: Type.ARRAY, items: pdaItemSchema },
            etica: { type: Type.ARRAY, items: pdaItemSchema },
            humano: { type: Type.ARRAY, items: pdaItemSchema },
          },
          required: ["saberes", "lenguajes", "etica", "humano"],
        },
        metodologiaSugerida: { type: Type.STRING },
        ejeArticuladorPrioritario: { type: Type.STRING },
        orientacionesDidacticasGenerales: { type: Type.STRING },
      },
      required: ["fase", "grado", "problema", "nombreProyecto", "camposFormativos", "metodologiaSugerida", "ejeArticuladorPrioritario", "orientacionesDidacticasGenerales"],
    };

    const result = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.25,
      },
    });

    const responseText = result.text;
    if (!responseText) throw new Error("No se recibió respuesta.");

    const programa = JSON.parse(responseText.trim());
    return res.status(200).json({ success: true, programa });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Error al generar programa analítico." });
  }
}
