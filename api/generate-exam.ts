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
      nivel,
      grado,
      disciplina,
      campoFormativo,
      tipoExamen,
      periodoTrimestre,
      contenidosSeleccionados,
      gradoAnterior,
      numReactivos,
      escuelaName,
      cct,
      docenteName,
      grupo,
    } = body || {};

    if (!nivel || !grado || !disciplina || !tipoExamen) {
      return res.status(400).json({ error: "Faltan parámetros obligatorios." });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "";
    if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY no configurada." });

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { "User-Agent": "aistudio-build" } },
    });

    const totalReactivos = Math.min(Math.max(Number(numReactivos) || 10, 3), 60);
    const nivelEducativo = nivel || "Secundaria";

    let descripcionTipo = "";
    if (tipoExamen === "diagnostico") {
      descripcionTipo = `TIPO: DIAGNÓSTICO INICIAL (Aprendizajes previos de ${gradoAnterior || "grado previo"}).`;
    } else if (tipoExamen === "parcial") {
      descripcionTipo = `TIPO: EVALUACIÓN PARCIAL / FORMATIVA.`;
    } else {
      descripcionTipo = `TIPO: EVALUACIÓN TRIMESTRAL (${periodoTrimestre || "Trimestre Actual"}).`;
    }

    // Restringimos forzosamente a opción múltiple
    const descripcionPreguntas = `TIPO DE PREGUNTAS: EXCLUSIVAMENTE OPCIÓN MÚLTIPLE (4 incisos: A, B, C, D).`;

    const listaContenidos = (contenidosSeleccionados && contenidosSeleccionados.length > 0)
      ? contenidosSeleccionados.map((c: any, i: number) => `   Contenido ${i + 1}: ${c.contenido || 'Contenido'}\n   PDA ${i + 1}: ${c.pda || 'PDA'}`).join("\n")
      : "Contenidos y PDAs sintéticos de la NEM para " + disciplina + " en " + grado;

    // PROMPT DIRECTO Y RESTRINGIDO
    const prompt = `
      Eres un Asesor Técnico Pedagógico (ATP) de la Nueva Escuela Mexicana (NEM).
      Diseña un EXAMEN ESCOLAR de ${totalReactivos} reactivos para:
      - Nivel: ${nivelEducativo}
      - Grado: ${grado}
      - Disciplina: ${disciplina}
      - ${descripcionTipo}
      
      INSTRUCCIONES ESTRICTAS:
      1. Genera SOLO preguntas de OPCIÓN MÚLTIPLE (4 incisos: A, B, C, D).
      2. NADA de justificaciones largas, sé directo y conciso.
      3. No repitas información en arreglos adicionales. Solo entrega el arreglo de "reactivos".
      
      CONTENIDOS Y PDAs:
      ${listaContenidos}
    `;

    // ESQUEMA ULTRA-LIGERO (Sin tablas extras, sin respuestas redundantes, sin preguntas abiertas)
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        titulo: { type: Type.STRING },
        subtitulo: { type: Type.STRING },
        tipoExamen: { type: Type.STRING },
        instruccionesGenerales: { type: Type.STRING },
        tiempoEstimado: { type: Type.STRING },
        reactivos: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              numero: { type: Type.INTEGER },
              tipo: { type: Type.STRING },
              contenidoEvaluado: { type: Type.STRING },
              pdaEvaluado: { type: Type.STRING },
              planteamiento: { type: Type.STRING },
              opciones: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    inciso: { type: Type.STRING },
                    texto: { type: Type.STRING },
                  },
                  required: ["inciso", "texto"],
                },
              },
              respuestaCorrecta: { type: Type.STRING },
              puntos: { type: Type.NUMBER },
            },
            required: ["numero", "tipo", "contenidoEvaluado", "planteamiento", "respuestaCorrecta", "puntos"],
          },
        },
      },
      required: ["titulo", "instruccionesGenerales", "reactivos"],
    };

    // Configuramos el objeto config de forma dinámica para incluir el caché
    const config: any = {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
      temperature: 0.25,
    };

    // Mantenemos el modelo que tenías configurado
    const result = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: config,
    });

    const responseText = result.text;
    if (!responseText) throw new Error("No se pudo generar el examen.");

    const examData = JSON.parse(responseText.trim());
    return res.status(200).json({
      success: true,
      exam: {
        ...examData,
        id: Math.random().toString(36).substring(2, 11),
        createdAt: new Date().toISOString(),
        nivel: nivelEducativo,
        grado,
        grupo: grupo || "A",
        disciplina,
        campoFormativo,
        escuelaName: escuelaName || "Escuela Secundaria",
        cct: cct || "CCT",
        docenteName: docenteName || "Docente Titular",
        tipoExamen,
        periodoTrimestre,
      },
    });
  } catch (error: any) {
    console.error(error); // Imprime el error real en tu consola (Vercel Logs) para debugear
    return res.status(500).json({ error: error.message || "Error al generar examen." });
  }
}