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
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido. Utilice POST." });

  try {
    let body = req.body;
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch (e) { /* ignore */ }
    }

    const {
      plan,
      instruction,
      nivel,
      campoFormativo,
      disciplina,
      grado,
      contenido,
      pda,
      metodologia,
    } = body || {};

    if (!plan || !instruction) {
      return res.status(400).json({ error: "Faltan datos obligatorios para modificar la planeación." });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "";
    if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY no está configurada." });

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { "User-Agent": "aistudio-build" } },
    });

    const nivelEducativo = nivel || "Secundaria";
    const prompt = `
      Eres un docente experto en la Nueva Escuela Mexicana (NEM) y educación básica (${nivelEducativo}).
      
      Recientemente diseñaste la siguiente planeación didáctica:
      ---
      ${JSON.stringify(plan, null, 2)}
      ---

      El docente solicita realizar las siguientes modificaciones a esta planeación:
      "${instruction}"

      DATOS DE CONTEXTO:
      - Campo Formativo: ${campoFormativo}
      - Disciplina: ${disciplina}
      - Contenido Sintético: ${contenido}
      - PDA: ${pda}
      - Metodología NEM: ${metodologia}

      MODIFICA LA PLANEACIÓN DIDÁCTICA ACTUAL aplicando de forma precisa los cambios solicitados por el docente.
      Mantén el formato, profundidad, profesionalismo y rigor pedagógico de la NEM con ortografía impecable en Español de México.
    `;

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
    if (!responseText) throw new Error("No se obtuvo respuesta de Gemini.");

    const modifiedPlanData = JSON.parse(responseText.trim());
    return res.status(200).json({ success: true, plan: modifiedPlanData });
  } catch (error: any) {
    console.error("Error in modify-plan serverless handler:", error);
    return res.status(500).json({ error: error.message || "Error al modificar la planeación." });
  }
}
