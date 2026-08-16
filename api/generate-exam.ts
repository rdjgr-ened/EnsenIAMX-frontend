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
      tipoPreguntas,
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

    let descripcionPreguntas = "";
    if (tipoPreguntas === "opcion_multiple") {
      descripcionPreguntas = `TIPO DE PREGUNTAS: OPCIÓN MÚLTIPLE (4 incisos: A, B, C, D).`;
    } else if (tipoPreguntas === "pregunta_abierta") {
      descripcionPreguntas = `TIPO DE PREGUNTAS: PREGUNTAS ABIERTAS CON RÚBRICA Y RESPUESTA MODELO.`;
    } else {
      descripcionPreguntas = `TIPO DE PREGUNTAS: COMBINADAS (OPCIÓN MÚLTIPLE + PREGUNTAS ABIERTAS).`;
    }

    const listaContenidos = (contenidosSeleccionados && contenidosSeleccionados.length > 0)
      ? contenidosSeleccionados.map((c: any, i: number) => `   Contenido ${i + 1}: ${c.contenido || 'Contenido'}\n   PDA ${i + 1}: ${c.pda || 'PDA'}`).join("\n")
      : "Contenidos y PDAs sintéticos de la NEM para " + disciplina + " en " + grado;

    const prompt = `
      Eres un Asesor Técnico Pedagógico (ATP) de la Nueva Escuela Mexicana (NEM).
      Diseña un instrumento tipo EXAMEN ESCOLAR contextualizado y alineado a la NEM para:
      - Nivel: ${nivelEducativo}
      - Grado: ${grado}
      - Grupo: ${grupo || "A"}
      - Disciplina: ${disciplina}
      - Campo Formativo: ${campoFormativo || "NEM"}
      - Total Reactivos: ${totalReactivos}
      - ${descripcionTipo}
      - ${descripcionPreguntas}
      
      CONTENIDOS Y PDAs:
      ${listaContenidos}
    `;

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
              lineasRespuesta: { type: Type.INTEGER },
              espacioRespuesta: { type: Type.STRING },
              respuestaCorrecta: { type: Type.STRING },
              justificacionPedagogica: { type: Type.STRING },
              criterioEvaluacion: { type: Type.STRING },
              puntos: { type: Type.NUMBER },
            },
            required: ["numero", "tipo", "contenidoEvaluado", "planteamiento", "respuestaCorrecta", "justificacionPedagogica", "puntos"],
          },
        },
        tablaEspecificaciones: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              numero: { type: Type.INTEGER },
              contenido: { type: Type.STRING },
              pda: { type: Type.STRING },
              nivelCognitivo: { type: Type.STRING },
              tipoReactivo: { type: Type.STRING },
              puntos: { type: Type.NUMBER },
            },
            required: ["numero", "contenido", "pda", "nivelCognitivo", "tipoReactivo", "puntos"],
          },
        },
        hojaRespuestasDocente: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              numero: { type: Type.INTEGER },
              respuesta: { type: Type.STRING },
              contenido: { type: Type.STRING },
              justificacion: { type: Type.STRING },
            },
            required: ["numero", "respuesta", "contenido", "justificacion"],
          },
        },
      },
      required: ["titulo", "instruccionesGenerales", "reactivos", "hojaRespuestasDocente"],
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
    return res.status(500).json({ error: error.message || "Error al generar examen." });
  }
}
