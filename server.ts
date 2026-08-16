import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import {
  getOrCreateNemPromptCache,
  NEM_STATIC_CURRICULUM_SYSTEM_INSTRUCTION,
} from "./src/utils/nemContextCache";
import { getOficialContenidos } from "./src/data/nemCurriculumService";
import { handleCheckout } from "./api/checkout";
import { handleMercadoPagoWebhook } from "./api/mercadopago-webhook";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Mercado Pago Checkout Preference Endpoint
app.post("/api/checkout", async (req, res) => {
  return handleCheckout(req, res);
});

// Mercado Pago Webhook Notification Endpoint
app.all(["/api/mercadopago-webhook", "/api/mercadopago-webhook.js"], async (req, res) => {
  return handleMercadoPagoWebhook(req, res);
});

// Initialize Google Gen AI
const geminiApiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "";
const ai = new GoogleGenAI({
  apiKey: geminiApiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Generic /api/generate Serverless-compatible endpoint with Prompt Caching
app.post("/api/generate", async (req, res) => {
  try {
    const {
      prompt,
      contents,
      systemInstruction,
      responseSchema,
      responseMimeType,
      temperature,
      model,
      useNemCache = true,
    } = req.body || {};

    const promptContent = prompt || contents;
    if (!promptContent) {
      return res.status(400).json({
        success: false,
        error: "El campo 'prompt' o 'contents' es requerido para generar la respuesta.",
      });
    }

    const selectedModel = model || "gemini-2.5-flash";
    const generationConfig: any = {};

    // 1. Context Caching (Prompt Caching) Implementation
    if (useNemCache) {
      try {
        const cacheResourceName = await getOrCreateNemPromptCache(ai, selectedModel);
        if (cacheResourceName) {
          generationConfig.cachedContent = cacheResourceName;
          console.log(`[Prompt Caching Server] Applied cachedContent: ${cacheResourceName}`);
        } else {
          generationConfig.systemInstruction =
            systemInstruction || NEM_STATIC_CURRICULUM_SYSTEM_INSTRUCTION;
        }
      } catch (cacheErr) {
        console.warn("[Prompt Caching Server] Fallback to direct systemInstruction:", cacheErr);
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

    const result = await ai.models.generateContent({
      model: selectedModel,
      contents: promptContent,
      config: generationConfig,
    });

    const responseText = result.text || "";

    if (responseMimeType === "application/json" && responseText.trim()) {
      try {
        const parsedData = JSON.parse(responseText.trim());
        return res.json({
          success: true,
          text: responseText,
          data: parsedData,
          cached: !!generationConfig.cachedContent,
        });
      } catch (parseErr) {
        return res.json({
          success: true,
          text: responseText,
          data: null,
          cached: !!generationConfig.cachedContent,
          warning: "La respuesta no pudo ser parseada automáticamente a JSON.",
        });
      }
    }

    return res.json({
      success: true,
      text: responseText,
      cached: !!generationConfig.cachedContent,
    });
  } catch (error: any) {
    console.error("Error in /api/generate:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Ocurrió un error al comunicarse con Gemini.",
    });
  }
});

// API endpoint for Lesson Plan Generation
app.post("/api/generate-plan", async (req, res) => {
  try {
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
    } = req.body;

    if (!campoFormativo || !disciplina || !contenido || !pda || !metodologia) {
      return res.status(400).json({ error: "Faltan campos obligatorios para generar la planeación didáctica." });
    }

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
      - Docente: ${docenteName || "René Gaytán"}
      - Escuela: ${escuelaName || "Esc. Sec. Gral. #3 'Jaime Torres Bodet'"}
      - C.C.T.: ${cct || "10DES0021J"}
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
      
      BARRERAS PARA EL APRENDIZAJE Y LA PARTICIPACIÓN (BAP) / APTITUDES SOBRESALIENTES PRESENTES EN EL GRUPO:
      ${bapSelected && bapSelected.length > 0 ? bapSelected.map(b => `- ${b}`).join("\n      ") : "- Ninguna barrera específica registrada. El diseño debe enfocarse en la inclusión general."}

      SITUACIÓN-PROBLEMA DEL CONTEXTO:
      "${situacionProblema || "No especificada por el docente. Crea una situación de interés o necesidad del contexto a partir del contenido y PDA."}"

      DIRECTRICES DE DISEÑO INCLUSIVO Y AJUSTES RAZONABLES (DUA):
      Es crítico que diseñes la secuencia didáctica teniendo en cuenta las BAP o Aptitudes Sobresalientes seleccionadas arriba:
      1. En las actividades de inicio, desarrollo y cierre de las sesiones, prevé formas alternativas de representación, expresión y compromiso de acuerdo con el Diseño Universal para el Aprendizaje (DUA) para los alumnos que enfrenten estas condiciones.
      2. En el campo 'sugerenciasAdecuacion', proporciona recomendaciones pedagógicas concretas, estrategias didácticas específicas y ajustes razonables detallados para atender adecuadamente cada uno de los casos seleccionados (por ejemplo, si se selecciona 'Intelectual (DI)', sugiere adecuaciones de contenido y apoyo visual; si se selecciona 'Aptitudes Sobresalientes (ASI)', sugiere actividades de profundización o enriquecimiento curricular). Si no hay BAPs específicas seleccionadas, ofrece sugerencias de adecuación generales basadas en DUA.

      DIRECTRICES METODOLÓGICAS (Establecidas por la SEP):
      Deberás organizar la planeación didáctica exactamente en FASES, ETAPAS o MOMENTOS que corresponden a la metodología o modalidad elegida:
      1. Si la metodología es "Aprendizaje Basado en Proyectos Comunitarios (ABPC)" (para Lenguajes), divídela estrictamente en:
         - Fase 1. Planeación (Momento 1. Identificación, Momento 2. Recuperación, Momento 3. Planificación)
         - Fase 2. Acción (Momento 4. Acercamiento, Momento 5. Comprensión y producción, Momento 6. Reconocimiento, Momento 7. Concreción)
         - Fase 3. Intervención (Momento 8. Integración, Momento 9. Difusión, Momento 10. Consideraciones, Momento 11. Avances)
      2. Si es "Aprendizaje Basado en Indagación (STEAM)" (para Saberes y Pensamiento Científico), divídela en:
         - Fase 1. Introducción al tema
         - Fase 2. Diseño de la investigación / Desarrollo de la indagación
         - Fase 3. Organizar y estructurar las respuestas a las preguntas
         - Fase 4. Presentación de los resultados de indagación / Aplicación
         - Fase 5. Metacognición / Reflexión y evaluación
      3. Si es "Aprendizaje Basado en Problemas (ABP)" (para Ética, Naturaleza y Sociedades), divídela en:
         - Momento 1. Presentemos
         - Momento 2. Recolectemos
         - Momento 3. Formulemos el problema
         - Momento 4. Organicemos la experiencia
         - Momento 5. Vivamos la experiencia
         - Momento 6. Resultados y análisis
      4. Si es "Aprendizaje Servicio (AS)" (para De lo Humano y lo Comunitario), divídela en:
         - Etapa 1. Punto de partida
         - Etapa 2. Lo que sé y lo que quiero saber
         - Etapa 3. Organicemos las actividades
         - Etapa 4. Creatividad en marcha
         - Etapa 5. Compartir y evaluar los resultados
      5. Si es "Taller Crítico" (Modalidad de trabajo de Preescolar), divídela estrictamente en:
         - Etapa 1. Situación Inicial (Plantear acciones didácticas para presentar un tema de relevancia o interés y proponer una producción)
         - Etapa 2. Organización de las Acciones (Dialogar, construir acuerdos, rescatar conocimientos previos y definir actividades, espacios, tiempos y materiales)
         - Etapa 3. Puesta en Marcha (Búsqueda de información, observar procesos y realizar acciones para la elaboración de la producción)
         - Etapa 4. Valoramos lo Aprendido (Presentar/utilizar el producto haciendo énfasis en el proceso y evaluar conjuntamente lo realizado)
      6. Si es "Rincones de Aprendizaje" (Modalidad de trabajo de Preescolar), divídela estrictamente en:
         - Etapa 1. Saberes Previos (Recuperar conocimientos, introducir temática vinculada a una problemática/interés, presentar rincones y formular preguntas detonadoras)
         - Etapa 2. Asamblea Inicial y Planeación (Organizar el trabajo, establecer acuerdos, explicar actividades, rotación, definir materiales e intereses)
         - Etapa 3. Exploración de los Rincones (Trabajo simultáneo en rincones con intervención, observación, registro de avances y retroalimentación del docente)
         - Etapa 4. Compartimos lo Aprendido (Socializar experiencias, presentar producciones, explicar logros/dificultades y valorar el trabajo)
         - Etapa 5. Reflexión sobre el Aprendizaje (Evaluación formativa, autoevaluación, coevaluación y propuestas de mejora)
      7. Si es "Centros de Interés" (Modalidad de trabajo de Preescolar), divídela estrictamente en:
         - Etapa 1. En Contacto con la Realidad (Despertar interés, exploración sensorial, recuperar saberes, formular preguntas detonadoras y compartir ideas)
         - Etapa 2. Identificación e Integración (Profundizar, formular preguntas de investigación, establecer asociaciones, registrar hallazgos y ampliar información)
         - Etapa 3. Expresión (Comunicar lo aprendido mediante textos, teatro, dibujo, pintura, música, danza, modelado o construcción)
      8. Si es "Unidad Didáctica" (Modalidad de trabajo de Preescolar), divídela estrictamente en:
         - Etapa 1. Lectura de la Realidad (Presentación de un aspecto significativo de la realidad, recuperar saberes previos y diálogo sobre vivencias cotidianas)
         - Etapa 2. Identificación de la Trama y Complejidad (Formulación de preguntas y relaciones entre distintos elementos del recorte de la realidad)
         - Etapa 3. Planificación y Organización del Trabajo (Diseñar plan de trabajo, actividades, recursos, tiempos y definir estrategias de registro)
         - Etapa 4. Exploración y Descubrimiento (Investigación empírica: entrevistas, visitas, encuestas, análisis, registro de hallazgos y reflexión)
         - Etapa 5. Participación Activa y Horizontal (Participación en acciones de mejora sobre la realidad analizada, compartiendo propuestas y sentimientos)
         - Etapa 6. Valoración de la Experiencia (Evaluación formativa de las actividades, aprendizajes obtenidos y logros alcanzados)
      9. Si es "Aprendizaje Basado en el Juego" (Modalidad de trabajo de Preescolar), divídela estrictamente en:
         - Etapa 1. Planteamiento del Juego (Proponer experiencia lúdica basada en la realidad/interés, recuperar saberes, definir acuerdos, reglas y seguridad)
         - Etapa 2. Desarrollo de las Actividades (Ejecución del juego, participación activa, toma de decisiones, asunción de responsabilidades y colaboración)
         - Etapa 3. Compartimos la Experiencia (Expresión de lo vivido, compartir resultados individuales/grupales y analizar qué mejorar)
         - Etapa 4. Comunidad de Juego (Reflexión colectiva sobre la convivencia, importancia del juego para aprender y comunicarse, y retroalimentación)
      10. Si es "Proyecto" (Modalidad de trabajo de Preescolar), divídela estrictamente en:
          - Etapa 1. Punto de Partida (Experiencias iniciales sobre una necesidad/problema, recuperar saberes, preguntas detonadoras e intereses)
          - Etapa 2. Planeación (Organizar colaborativamente acciones, objetivos, participantes, recursos, tiempos y el plan de trabajo)
          - Etapa 3. ¡A Trabajar! (Llevar a cabo las acciones planificadas, investigar, explorar y realizar producciones para responder al desafío)
          - Etapa 4. Comunicamos Nuestros Logros (Presentar producciones del proyecto y comunicar los aprendizajes construidos)
          - Etapa 5. Reflexión sobre el Aprendizaje (Valoración individual y colectiva del proyecto, identificar logros/dificultades y proponer nuevas acciones)

      Genera exactamente ${numSesiones || 8} sesiones bien estructuradas en total, distribuidas equitativamente entre las fases, etapas o momentos de la metodología. CADA sesión escolar individual DEBE durar exactamente ${duracionSesion || "50 minutos"}, y debes reflejar este valor exacto (por ejemplo: "${duracionSesion || "50 minutos"}") en el campo 'duracion' de cada lección/sesión.
      
      CRÍTICO: No dejes la evaluación formativa al final del proyecto como una sección vacía. En lugar de eso, integra de forma específica la evaluación formativa en CADA sesión escolar. En el campo 'evaluacionSesion' de cada sesión, explica detalladamente los criterios de evaluación, los indicadores específicos de logro, las evidencias concretas de aprendizaje esperadas y los instrumentos que el docente utilizará para evaluar la sesión concreta.
      
      IDIOMA Y ORTOGRAFÍA CRÍTICOS: El idioma de respuesta DEBE ser Español (México) de manera impecable, utilizando correctamente todos los acentos (á, é, í, ó, ú, Á, É, Í, Ó, Ú, etc.) y la letra eñe (ñ). Bajo ninguna circunstancia uses caracteres desprovistos de acentos o eñe como 'desempene', 'planeacion' sin acento, etc. Escribe 'desempeño', 'planeación', 'evaluación', 'didáctica' con toda su ortografía correcta.
    `;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        proposito: {
          type: Type.STRING,
          description: "Propósito didáctico del proyecto redactado formalmente, vinculando la resolución de la situación-problema con el desarrollo del PDA.",
        },
        producto: {
          type: Type.STRING,
          description: "Descripción detallada del producto didáctico que los estudiantes elaborarán (ej. Folleto, Infografía, Debate, Prototipo, Periódico escolar).",
        },
        fases: {
          type: Type.ARRAY,
          description: "Las fases, etapas o momentos correspondientes a la metodología NEM seleccionada.",
          items: {
            type: Type.OBJECT,
            properties: {
              nombre: {
                type: Type.STRING,
                description: "Nombre formal de la fase o momento de la NEM (ej. 'Fase 1: Planeación - Momento 1: Identificación').",
              },
              sesiones: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    numero: { type: Type.INTEGER, description: "Número correlativo de la sesión escolar." },
                    titulo: { type: Type.STRING, description: "Título sugerido para la sesión." },
                    duracion: { type: Type.STRING, description: "Duración en minutos (ej. '50 minutos')." },
                    materiales: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Materiales específicos requeridos." },
                    inicio: { type: Type.STRING, description: "Detalle de actividades de inicio (focalización, saberes previos, conflicto cognitivo, tiempos)." },
                    desarrollo: { type: Type.STRING, description: "Detalle de actividades de desarrollo (construcción, indagación, trabajo colaborativo, ejercicios)." },
                    cierre: { type: Type.STRING, description: "Detalle de actividades de cierre (retroalimentación, síntesis, tareas)." },
                    evaluacionSesion: { type: Type.STRING, description: "Evaluación formativa integrada específica para esta sesión (indicadores, técnicas, instrumentos y criterios aplicables a esta sesión en particular)." },
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
            tecnicas: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Lista de técnicas pedagógicas generales aplicadas a lo largo del proyecto." },
            instrumentos: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Lista de instrumentos de evaluación sugeridos." },
            descripcion: { type: Type.STRING, description: "Resumen explicativo de la estrategia de coevaluación, autoevaluación o retroalimentación formativa del proyecto." },
          },
          required: ["tecnicas", "instrumentos", "descripcion"],
        },
        sugerenciasAdecuacion: {
          type: Type.STRING,
          description: "Recomendaciones específicas para la inclusión de alumnos con necesidades educativas especiales o adecuaciones en base al DUA.",
        },
      },
      required: ["proposito", "producto", "fases", "evaluacionFormativa", "sugerenciasAdecuacion"],
    };

    const selectedModel = "gemini-2.5-flash";
    const planConfig: any = {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
      temperature: 0.2, // Low temperature for consistent structural planning
    };

    try {
      const cacheResourceName = await getOrCreateNemPromptCache(ai, selectedModel);
      if (cacheResourceName) {
        planConfig.cachedContent = cacheResourceName;
      } else {
        planConfig.systemInstruction = NEM_STATIC_CURRICULUM_SYSTEM_INSTRUCTION;
      }
    } catch (cacheErr) {
      planConfig.systemInstruction = NEM_STATIC_CURRICULUM_SYSTEM_INSTRUCTION;
    }

    const result = await ai.models.generateContent({
      model: selectedModel,
      contents: prompt,
      config: planConfig,
    });

    const responseText = result.text;
    if (!responseText) {
      throw new Error("No se pudo obtener una respuesta válida de Gemini.");
    }

    const planData = JSON.parse(responseText.trim());
    return res.json({ success: true, plan: planData, cached: !!planConfig.cachedContent });
  } catch (error: any) {
    console.error("Error generating plan:", error);
    return res.status(500).json({ error: error.message || "Ocurrió un error en el servidor al generar la planeación." });
  }
});

// API endpoint for modifying/chatting with an existing plan
app.post("/api/modify-plan", async (req, res) => {
  try {
    const {
      plan,
      instruction,
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
      duracionSesion,
    } = req.body;

    if (!plan || !instruction) {
      return res.status(400).json({ error: "Faltan datos obligatorios (planeación actual o instrucción del docente) para modificar la planeación." });
    }

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
      
      Recientemente diseñaste la siguiente planeación didáctica:
      ---
      ${JSON.stringify(plan, null, 2)}
      ---

      El docente solicita realizar las siguientes modificaciones o adiciones a esta planeación:
      "${instruction}"

      DATOS DE REFERENCIA DEL CONTEXTO:
      - Nivel Educativo: ${nivelEducativo}
      - Campo Formativo: ${campoFormativo}
      - Disciplina: ${disciplina}
      - Contenido Sintético: ${contenido}
      - PDA: ${pda}
      - Metodología NEM: ${metodologia}

      MODIFICA LA PLANEACIÓN DIDÁCTICA ACTUAL siguiendo exactamente la petición del docente.
      Asegúrate de:
      1. Mantener el formato, estilo, profundidad, profesionalismo y rigor pedagógico de la planeación original, pero aplicando de manera precisa los cambios solicitados por el docente.
      2. No omitir ninguna sección requerida por el esquema JSON de salida (proposito, producto, fases, evaluacionFormativa, sugerenciasAdecuacion).
      3. CRÍTICO: El idioma de respuesta DEBE ser Español (México) de manera impecable, utilizando correctamente todos los acentos (á, é, í, ó, ú, Á, É, Í, Ó, Ú, etc.) y la letra eñe (ñ). Bajo ninguna circunstancia uses caracteres desprovistos de acentos o eñe como 'desempene', 'planeacion' sin acento, etc. Escribe 'desempeño', 'planeación', 'evaluación', 'didáctica' con toda su ortografía correcta.
    `;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        proposito: {
          type: Type.STRING,
          description: "Propósito didáctico del proyecto redactado formalmente, vinculando la resolución de la situación-problema con el desarrollo del PDA.",
        },
        producto: {
          type: Type.STRING,
          description: "Descripción detallada del producto didáctico que los estudiantes elaborarán.",
        },
        fases: {
          type: Type.ARRAY,
          description: "Las fases, etapas o momentos correspondientes a la metodología NEM seleccionada.",
          items: {
            type: Type.OBJECT,
            properties: {
              nombre: {
                type: Type.STRING,
                description: "Nombre formal de la fase o momento de la NEM.",
              },
              sesiones: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    numero: { type: Type.INTEGER, description: "Número correlativo de la sesión escolar." },
                    titulo: { type: Type.STRING, description: "Título sugerido para la sesión." },
                    duracion: { type: Type.STRING, description: "Duración en minutos (ej. '50 minutos')." },
                    materiales: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Materiales específicos requeridos." },
                    inicio: { type: Type.STRING, description: "Detalle de actividades de inicio (focalización, saberes previos, conflicto cognitivo, tiempos)." },
                    desarrollo: { type: Type.STRING, description: "Detalle de actividades de desarrollo (construcción, indagación, trabajo colaborativo, ejercicios)." },
                    cierre: { type: Type.STRING, description: "Detalle de actividades de cierre (retroalimentación, síntesis, tareas)." },
                    evaluacionSesion: { type: Type.STRING, description: "Evaluación formativa integrada específica para esta sesión (indicadores, evidencias concretas de aprendizaje esperadas e instrumentos)." },
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
            tecnicas: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Lista de técnicas pedagógicas generales aplicadas a lo largo del proyecto." },
            instrumentos: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Lista de instrumentos de evaluación sugeridos." },
            descripcion: { type: Type.STRING, description: "Resumen explicativo de la estrategia de coevaluación, autoevaluación o retroalimentación formativa del proyecto." },
          },
          required: ["tecnicas", "instrumentos", "descripcion"],
        },
        sugerenciasAdecuacion: {
          type: Type.STRING,
          description: "Recomendaciones específicas para la inclusión de alumnos con necesidades educativas especiales o adecuaciones en base al DUA.",
        },
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
    if (!responseText) {
      throw new Error("No se pudo obtener una respuesta válida de Gemini.");
    }

    const modifiedPlanData = JSON.parse(responseText.trim());
    return res.json({ success: true, plan: modifiedPlanData });
  } catch (error: any) {
    console.error("Error modifying plan:", error);
    return res.status(500).json({ error: error.message || "Ocurrió un error en el servidor al modificar la planeación." });
  }
});

// API endpoint to fetch official NEM Contenidos & PDAs dynamically with Gemini & Prompt Caching
app.post("/api/fetch-nem-curriculum", async (req, res) => {
  try {
    const { nivel, grado, campoFormativo, disciplina } = req.body;

    if (!nivel || !grado || !campoFormativo) {
      return res.status(400).json({ 
        error: "Nivel, grado y campo formativo son requeridos para la consulta curricular." 
      });
    }

    // 1. Try local verified comprehensive catalogue first (<1ms response time, 100% fidelity)
    try {
      const officialList = getOficialContenidos(nivel, grado, campoFormativo, disciplina);
      if (officialList && officialList.length > 0) {
        return res.json({
          success: true,
          source: "official_nem_catalogue",
          contenidos: officialList,
          cached: true
        });
      }
    } catch (catErr) {
      console.warn("Could not query local official catalogue:", catErr);
    }

    const selectedModel = "gemini-3.7-flash";
    const prompt = `
      Eres el Catálogo Curricular Oficial de la Nueva Escuela Mexicana (NEM) y el Plan de Estudio 2022-2026 de la Secretaría de Educación Pública (SEP) de México.

      SOLICITUD DOCENTE:
      Extrae y devuelve la lista oficial completa de TODOS los Contenidos Sintéticos Curriculares de la NEM y sus respectivos Procesos de Desarrollo de Aprendizaje (PDA) correspondientes con exactitud a la siguiente combinación:
      
      - Nivel Educativo: ${nivel}
      - Grado Escolar: ${grado}
      - Campo Formativo: ${campoFormativo}
      - Disciplina / Asignatura: ${disciplina || "General / Todas las correspondientes al campo"}

      DIRECTRICES RIGUROSAS:
      1. Extrae del Programa Sintético oficial de la NEM todos los Contenidos vigentes para esta combinación.
      2. Para cada Contenido, extrae la lista de TODOS los Procesos de Desarrollo de Aprendizaje (PDA) oficiales estipulados para este grado específico (${grado}).
      3. No resumas ni inventes contenidos. Devuelve los textos oficiales con redacción completa en Español de México y acentuación impecable (á, é, í, ó, ú, ñ).
      4. Si la disciplina es general (ej. en Preescolar o Primaria), incluye los contenidos de dicho Campo Formativo para el grado.
    `;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        contenidos: {
          type: Type.ARRAY,
          description: "Lista de contenidos sintéticos oficiales de la NEM con sus PDAs para el grado",
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: "Identificador del contenido" },
              contenido: { type: Type.STRING, description: "Texto íntegro del contenido sintético oficial de la SEP" },
              pdas: {
                type: Type.ARRAY,
                description: "Lista de PDAs oficiales específicos para este grado",
                items: { type: Type.STRING }
              }
            },
            required: ["id", "contenido", "pdas"]
          }
        }
      },
      required: ["contenidos"]
    };

    const generationConfig: any = {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
      temperature: 0.1, // Near-zero for deterministic curriculum retrieval
    };

    try {
      const cacheResourceName = await getOrCreateNemPromptCache(ai, selectedModel);
      if (cacheResourceName) {
        generationConfig.cachedContent = cacheResourceName;
        console.log(`[Fetch Curriculum API] Using prompt cache: ${cacheResourceName}`);
      } else {
        generationConfig.systemInstruction = NEM_STATIC_CURRICULUM_SYSTEM_INSTRUCTION;
      }
    } catch (cacheErr) {
      generationConfig.systemInstruction = NEM_STATIC_CURRICULUM_SYSTEM_INSTRUCTION;
    }

    const result = await ai.models.generateContent({
      model: selectedModel,
      contents: prompt,
      config: generationConfig,
    });

    const responseText = result.text;
    if (!responseText) {
      throw new Error("No se recibió respuesta de Gemini.");
    }

    const parsed = JSON.parse(responseText.trim());
    return res.json({
      success: true,
      contenidos: parsed.contenidos || [],
      cached: !!generationConfig.cachedContent,
    });
  } catch (error: any) {
    console.error("Error fetching NEM curriculum dynamically:", error);
    return res.status(500).json({
      error: error.message || "Error al consultar los contenidos curriculares oficiales de la NEM.",
    });
  }
});

// API endpoint to suggest contents and PDAs based on situation and filters
app.post("/api/suggest-content", async (req, res) => {
  try {
    const { nivel, grado, campoFormativo, disciplina, situacionProblema } = req.body;

    if (!nivel || !grado || !campoFormativo || !disciplina || !situacionProblema) {
      return res.status(400).json({ error: "Todos los campos (nivel, grado, campo formativo, disciplina y situación-problema) son requeridos." });
    }

    const prompt = `
      Eres un metodólogo educativo experto en la Nueva Escuela Mexicana (NEM) y el Plan de Estudio 2022.
      El docente solicita sugerencias de contenidos y Procesos de Desarrollo de Aprendizaje (PDA) oficiales o pertinentes para:
      
      - Nivel Educativo: ${nivel}
      - Grado: ${grado}
      - Campo Formativo: ${campoFormativo}
      - Disciplina: ${disciplina}
      - Situación-Problema a abordar: "${situacionProblema}"

      Sugiere exactamente 3 opciones de Contenidos y su respectivo Proceso de Desarrollo de Aprendizaje (PDA) que se alineen perfectamente con este nivel, grado, campo formativo y disciplina, y que sirvan para comprender o resolver la situación-problema planteada de forma didáctica.
      
      Asegúrate de responder en español y de forma rigurosa, siguiendo los lineamientos de la NEM de la SEP.
    `;

    const responseSchema = {
      type: Type.ARRAY,
      description: "Lista de 3 sugerencias de contenidos y sus respectivos PDAs",
      items: {
        type: Type.OBJECT,
        properties: {
          contenido: {
            type: Type.STRING,
            description: "Contenido sintético o analítico sugerido.",
          },
          pda: {
            type: Type.STRING,
            description: "Proceso de Desarrollo de Aprendizaje (PDA) sugerido.",
          },
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
    if (!responseText) {
      throw new Error("No se recibió respuesta de Gemini.");
    }

    const suggestions = JSON.parse(responseText.trim());
    return res.json({ success: true, suggestions });
  } catch (error: any) {
    console.error("Error suggesting content:", error);
    return res.status(500).json({ error: error.message || "Error al sugerir contenidos." });
  }
});

// API endpoint to create a customized content and PDA (co-diseño)
app.post("/api/create-content", async (req, res) => {
  try {
    const { nivel, grado, campoFormativo, disciplina, situacionProblema } = req.body;

    if (!nivel || !grado || !campoFormativo || !disciplina || !situacionProblema) {
      return res.status(400).json({ error: "Todos los campos (nivel, grado, campo formativo, disciplina y situación-problema) son requeridos." });
    }

    const prompt = `
      Eres un metodólogo educativo experto en la Nueva Escuela Mexicana (NEM) y procesos de codiseño curricular.
      El docente solicita crear un Contenido analítico (personalizado) y su respectivo Proceso de Desarrollo de Aprendizaje (PDA) a la medida para:
      
      - Nivel Educativo: ${nivel}
      - Grado: ${grado}
      - Campo Formativo: ${campoFormativo}
      - Disciplina: ${disciplina}
      - Situación-Problema a abordar: "${situacionProblema}"

      Redacta un Contenido sintético o analítico personalizado nuevo y un respectivo Proceso de Desarrollo de Aprendizaje (PDA) a la medida (codiseño). 
      El Contenido y el PDA deben estar perfectamente adaptados al grado y nivel correspondientes, estar redactados con la rigurosidad pedagógica de la SEP y vincular explícitamente el campo formativo y la disciplina con la resolución o comprensión de la situación-problema planteada.
    `;

    const responseSchema = {
      type: Type.OBJECT,
      description: "Contenido y PDA creados a la medida",
      properties: {
        contenido: {
          type: Type.STRING,
          description: "Contenido analítico personalizado creado a la medida.",
        },
        pda: {
          type: Type.STRING,
          description: "Proceso de Desarrollo de Aprendizaje (PDA) correspondiente redactado a la medida.",
        },
      },
      required: ["contenido", "pda"],
    };

    const result = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.5,
      },
    });

    const responseText = result.text;
    if (!responseText) {
      throw new Error("No se recibió respuesta de Gemini.");
    }

    const createdContent = JSON.parse(responseText.trim());
    return res.json({ success: true, ...createdContent });
  } catch (error: any) {
    console.error("Error creating content:", error);
    return res.status(500).json({ error: error.message || "Error al crear contenido." });
  }
});

// API endpoint to generate a full Programa Analítico
app.post("/api/generate-programa-analitico", async (req, res) => {
  try {
    const { nivel, grado, situacionProblema } = req.body;

    if (!nivel || !grado || !situacionProblema) {
      return res.status(400).json({ error: "El nivel, grado y situación-problema son campos obligatorios." });
    }

    const prompt = `
      Eres un metodólogo educativo experto de alto nivel en la Nueva Escuela Mexicana (NEM) y el Plan de Estudio 2022.
      El colectivo docente (o un docente en lo individual) está diseñando su Programa Analítico (Codiseño y Contextualización de Contenidos) para el siguiente nivel, grado y problemática social:
      
      - Nivel Educativo: ${nivel}
      - Grado: ${grado}
      - Situación-Problema Identificada: "${situacionProblema}"

      Tu tarea es redactar y estructurar el Programa Analítico oficial para este grado, seleccionando o redactando Procesos de Desarrollo de Aprendizaje (PDA) y contenidos adaptados para CADA uno de los 4 Campos Formativos de la NEM, vinculándolos de manera coherente y directa con la resolución o estudio de la Situación-Problema.

      Para reflejar de forma exacta la realidad del Programa Analítico nacional según la SEP y el diagrama educativo correspondiente, debes incorporar tres tipos de PDAs distribuidos entre los campos:
      1. PDA NORMAL (tipo: "normal"): Proceso de Desarrollo de Aprendizaje directo del programa sintético oficial que se adapta sin modificaciones.
      2. PDA MODIFICADO (tipo: "modificado"): Proceso oficial que el docente contextualizó o adecuó en su redacción (marcado con un asterisco *). Explica qué se modificó y por qué en el campo "nota".
      3. NUEVO PDA (tipo: "nuevo"): Proceso de codiseño curricular propuesto directamente por la escuela porque no existía un proceso similar en el programa sintético para resolver este problema (marcado con dos asteriscos **). Explica la justificación sintética en el campo "nota".

      CRÍTICO - REGLAS DE DISCIPLINAS POR NIVEL:
      1. Si el Nivel Educativo es "Preescolar": NO existen disciplinas ni asignaturas, solo los 4 Campos Formativos generales. Por lo tanto, para cada contenido o PDA generado en este nivel, el campo 'disciplina' DEBE ser exactamente una cadena vacía "" o "General". Nunca inventes disciplinas como "Matemáticas" o "Español" para Preescolar.
      2. Si el Nivel Educativo es "Secundaria": Es OBLIGATORIO e INDISPENSABLE incluir contenidos y PDAs para TODAS las disciplinas específicas que integran cada uno de los Campos Formativos, para asegurar que ningún docente se quede fuera del proyecto colegiado (puesto que en Secundaria cada disciplina la imparte un docente diferente). Debes generar elementos para:
         - Campo 'saberes': Incluye un objeto de contenido/PDA para "Matemáticas" y otro objeto para la ciencia del grado (Biología para 1º, Física para 2º, Química para 3º).
         - Campo 'lenguajes': Incluye objetos de contenidos/PDAs separados para "Español", "Inglés" y "Artes".
         - Campo 'etica': Incluye objetos de contenidos/PDAs separados para "Historia", "Geografía" (en 1º grado) y "Formación Cívica y Ética".
         - Campo 'humano': Incluye objetos de contenidos/PDAs separados para "Educación Física", "Tecnología" y "Tutoría / Educación Socioemocional".

      También debes formular:
      - Un Nombre sugerido y creativo de proyecto didáctico que integre el problema (ej: "Mejoramos nuestro desayuno", "Guardianes de la energía", etc.)
      - La Metodología NEM ideal para este proyecto (ej. Aprendizaje Basado en Problemas, Aprendizaje Servicio (AS), STEAM, etc.)
      - El Eje Articulador transversal prioritario (ej. Vida saludable, Inclusión, Pensamiento crítico, Artes y experiencias estéticas, etc.)
      - Las Orientaciones Didácticas expresadas mediante una pregunta movilizadora detonadora vinculada a la metodología (ej. ¿De qué forma vamos a estudiar el problema de la nutrición infantil?) seguido de una breve descripción de acciones didácticas.

      Asegúrate de responder estrictamente en español, con un tono docente oficial, respetando la estructura de la SEP.
    `;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        fase: { type: Type.STRING, description: "La Fase de la NEM correspondiente (Fase 2 para preescolar, Fase 3 para 1-2 primaria, Fase 4 para 3-4 primaria, Fase 5 para 5-6 primaria, Fase 6 para secundaria)." },
        grado: { type: Type.STRING, description: "El grado escolar" },
        problema: { type: Type.STRING, description: "La situación-problema abordada" },
        nombreProyecto: { type: Type.STRING, description: "Nombre didáctico y creativo sugerido para el proyecto" },
        camposFormativos: {
          type: Type.OBJECT,
          properties: {
            saberes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  contenido: { type: Type.STRING, description: "Contenido sintético o analítico del campo Saberes y Pensamiento Científico" },
                  pda: { type: Type.STRING, description: "Redacción del Proceso de Desarrollo de Aprendizaje (PDA)" },
                  tipo: { type: Type.STRING, description: "Tipo de PDA: 'normal', 'modificado' o 'nuevo'" },
                  nota: { type: Type.STRING, description: "Nota explicativa, justificación del codiseño o cambio (requerido para modificado o nuevo)" },
                  disciplina: { type: Type.STRING, description: "Disciplina asociada (ej: Matemáticas, Ciencias, Pensamiento Matemático, o General)" }
                },
                required: ["contenido", "pda", "tipo", "disciplina"]
              }
            },
            lenguajes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  contenido: { type: Type.STRING, description: "Contenido sintético o analítico del campo Lenguajes" },
                  pda: { type: Type.STRING, description: "Redacción del Proceso de Desarrollo de Aprendizaje (PDA)" },
                  tipo: { type: Type.STRING, description: "Tipo de PDA: 'normal', 'modificado' o 'nuevo'" },
                  nota: { type: Type.STRING, description: "Nota explicativa" },
                  disciplina: { type: Type.STRING, description: "Disciplina asociada (ej: Español, Inglés, Artes, Lenguajes, o General)" }
                },
                required: ["contenido", "pda", "tipo", "disciplina"]
              }
            },
            etica: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  contenido: { type: Type.STRING, description: "Contenido sintético o analítico del campo Ética, Naturaleza y Sociedades" },
                  pda: { type: Type.STRING, description: "Redacción del Proceso de Desarrollo de Aprendizaje (PDA)" },
                  tipo: { type: Type.STRING, description: "Tipo de PDA: 'normal', 'modificado' o 'nuevo'" },
                  nota: { type: Type.STRING, description: "Nota explicativa" },
                  disciplina: { type: Type.STRING, description: "Disciplina asociada (ej: Geografía, Historia, Formación Cívica, Exploración, o General)" }
                },
                required: ["contenido", "pda", "tipo", "disciplina"]
              }
            },
            humano: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  contenido: { type: Type.STRING, description: "Contenido sintético o analítico del campo De lo Humano y lo Comunitario" },
                  pda: { type: Type.STRING, description: "Redacción del Proceso de Desarrollo de Aprendizaje (PDA)" },
                  tipo: { type: Type.STRING, description: "Tipo de PDA: 'normal', 'modificado' o 'nuevo'" },
                  nota: { type: Type.STRING, description: "Nota explicativa" },
                  disciplina: { type: Type.STRING, description: "Disciplina asociada (ej: Educación Física, Tecnología, Tutoría, o General)" }
                },
                required: ["contenido", "pda", "tipo", "disciplina"]
              }
            }
          },
          required: ["saberes", "lenguajes", "etica", "humano"]
        },
        metodologia: {
          type: Type.OBJECT,
          properties: {
            tipo: { type: Type.STRING, description: "Metodología ideal (ej: Aprendizaje Servicio (AS), Aprendizaje Basado en Problemas (ABP), STEAM)" },
            ejeArticulador: { type: Type.STRING, description: "Eje articulador principal (ej: Vida saludable, Pensamiento crítico)" },
            orientaciones: { type: Type.STRING, description: "Pregunta orientadora y descripción de acciones didácticas" }
          },
          required: ["tipo", "ejeArticulador", "orientaciones"]
        }
      },
      required: ["fase", "grado", "problema", "nombreProyecto", "camposFormativos", "metodologia"]
    };

    const result = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.4,
      },
    });

    const responseText = result.text;
    if (!responseText) {
      throw new Error("No se recibió respuesta de Gemini.");
    }

    const programaAnalitico = JSON.parse(responseText.trim());
    return res.json({ success: true, programaAnalitico });
  } catch (error: any) {
    console.error("Error generating Programa Analítico:", error);
    return res.status(500).json({ error: error.message || "Error al generar el programa analítico." });
  }
});

// API endpoint to generate a specific evaluation instrument with Gemini
app.post("/api/generate-instrument", async (req, res) => {
  try {
    const {
      instrumentName,
      escuelaName,
      cct,
      docenteName,
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
    } = req.body;

    if (!instrumentName) {
      return res.status(400).json({ error: "El nombre del instrumento es requerido." });
    }

    const prompt = `
      Actúa como un Pedagogo Especialista en Evaluación Formativa para la Nueva Escuela Mexicana (NEM) en educación básica en México (${nivel || 'Educación Básica'}).
      
      Tu tarea es diseñar un instrumento de evaluación formativa completo, sumamente detallado, pedagógicamente riguroso y listo para imprimir y aplicar a los alumnos.
      
      INFORMACIÓN DE CONTEXTO:
      - Instrumento Solicitado: "${instrumentName}"
      - Producto/Evidencia a Evaluar: "${producto || 'Producto del proyecto'}"
      - Propósito del Proyecto: "${proposito || 'Desarrollo de aprendizajes significativos'}"
      - Campo Formativo: "${campoFormativo || 'General'}"
      - Disciplina / Asignatura: "${disciplina || 'General'}"
      - Grado y Grupo: "${grado || 'Grado'} - Grupo ${grupo || 'A'}"
      - Contenido Sintético: "${contenido || 'Sin especificar'}"
      - Proceso de Desarrollo de Aprendizaje (PDA): "${pda || 'Sin especificar'}"
      - Situación / Problema del Contexto: "${situacionProblema || 'Entorno escolar'}"

      INSTRUCCIONES DE DISEÑO SEGÚN EL TIPO DE INSTRUMENTO:
      1. Si es "Rúbrica" (Analítica o Holística): Proporciona entre 4 y 6 criterios de evaluación clave directamente alineados al PDA y producto. Para cada criterio incluye 4 niveles de desempeño exhaustivos y descriptivos (Sobresaliente [10-9 pts], Satisfactorio [8-7 pts], Básico [6 pts], Requiere Apoyo [5 pts]).
      2. Si es "Lista de Cotejo" / "Checklist": Proporciona entre 6 y 10 indicadores concretos y observables sobre el producto o desempeño del alumno.
      3. Si es "Escala Estimativa" / "Escala de Actitudes": Proporciona entre 6 y 10 aspectos a estimar con escala de valoración (ej: Excelente, Muy Bueno, Bueno, En Proceso, Requiere Apoyo).
      4. Si es "Guía de Observación": Proporciona entre 5 y 8 aspectos o focos de atención pedagógica para registrar observaciones cualitativas del docente.
      5. Si es "Prueba Written / Examen / Cuestionario": Proporciona entre 5 y 8 reactivos/preguntas pertinentes con opciones o espacio de respuesta.
      6. Para cualquier otro instrumento: Adapta la mejor estructura matricial.

      Asegúrate de incluir instrucciones claras para el usuario o alumno, puntuación máxima recomendada y sugerencias para la retroalimentación formativa y coevaluación/autoevaluación.
    `;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        titulo: { type: Type.STRING, description: "Título oficial del instrumento de evaluación" },
        tipoInstrumento: { type: Type.STRING, description: "Categoría/Tipo de instrumento (ej. Rúbrica Analítica, Lista de Cotejo)" },
        instrucciones: { type: Type.STRING, description: "Instrucciones de aplicación para el docente o alumno" },
        criteriosRubrica: {
          type: Type.ARRAY,
          description: "Lista de criterios si el instrumento es una Rúbrica",
          items: {
            type: Type.OBJECT,
            properties: {
              criterio: { type: Type.STRING, description: "Nombre del aspecto o dimensión a evaluar" },
              ponderacion: { type: Type.STRING, description: "Valor o porcentaje relativo del criterio" },
              sobresaliente: { type: Type.STRING, description: "Descripción del nivel Sobresaliente (10-9)" },
              satisfactorio: { type: Type.STRING, description: "Descripción del nivel Satisfactorio (8-7)" },
              basico: { type: Type.STRING, description: "Descripción del nivel Básico / Suficiente (6)" },
              requiereApoyo: { type: Type.STRING, description: "Descripción del nivel Requiere Apoyo (5)" },
            },
            required: ["criterio", "sobresaliente", "satisfactorio", "basico", "requiereApoyo"],
          },
        },
        itemsListaCotejo: {
          type: Type.ARRAY,
          description: "Lista de reactivos o indicadores para Lista de Cotejo",
          items: {
            type: Type.OBJECT,
            properties: {
              num: { type: Type.INTEGER },
              criterio: { type: Type.STRING, description: "Categoría o dimensión" },
              indicador: { type: Type.STRING, description: "Indicador claro y observable" },
              puntosMaximos: { type: Type.INTEGER, description: "Puntuación sugerida" },
            },
            required: ["num", "criterio", "indicador"],
          },
        },
        itemsEscalaEstimativa: {
          type: Type.ARRAY,
          description: "Lista de aspectos para Escala Estimativa",
          items: {
            type: Type.OBJECT,
            properties: {
              num: { type: Type.INTEGER },
              aspecto: { type: Type.STRING, description: "Aspecto o conducta a valorar" },
              escala: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Opciones de escala (ej. Siempre, Frecuentemente, A veces, Nunca)" },
            },
            required: ["num", "aspecto"],
          },
        },
        guiaObservacion: {
          type: Type.ARRAY,
          description: "Aspectos para Guía de Observación",
          items: {
            type: Type.OBJECT,
            properties: {
              num: { type: Type.INTEGER },
              aspecto: { type: Type.STRING },
              focoAtencion: { type: Type.STRING, description: "En qué fijarse durante la observación" },
            },
            required: ["num", "aspecto", "focoAtencion"],
          },
        },
        preguntasCuestionario: {
          type: Type.ARRAY,
          description: "Preguntas o reactivos para Cuestionarios o Pruebas Escritas",
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
        retroalimentacionFormativa: { type: Type.STRING, description: "Guía para que el docente proporcione retroalimentación formativa y cuantitativa/cualitativa" },
        puntuacionMaximaTotal: { type: Type.STRING, description: "Ejemplo: 100 puntos / Calificación escala 5-10" },
        escalaEvaluacionTexto: { type: Type.STRING, description: "Criterios para convertir puntos a valoración cualitativa de la NEM" },
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
    if (!responseText) {
      throw new Error("No se pudo generar el instrumento de evaluación con Gemini.");
    }

    const instrument = JSON.parse(responseText.trim());
    return res.json({ success: true, instrument });
  } catch (error: any) {
    console.error("Error generating evaluation instrument:", error);
    return res.status(500).json({ error: error.message || "Error al diseñar el instrumento de evaluación." });
  }
});

// API endpoint to generate a student worksheet (Hoja de trabajo) with Gemini
app.post("/api/generate-worksheet", async (req, res) => {
  try {
    const {
      sesionNumero,
      sesionTitulo,
      sesionInicio,
      sesionDesarrollo,
      sesionCierre,
      sesionMateriales,
      faseNombre,
      escuelaName,
      cct,
      docenteName,
      grado,
      grupo,
      campoFormativo,
      disciplina,
      contenido,
      pda,
      nivel,
    } = req.body;

    if (!sesionTitulo) {
      return res.status(400).json({ error: "Los datos de la sesión son requeridos." });
    }

    const prompt = `
      Actúa como un Diseñador Pedagógico y Especialista Didáctico para la Nueva Escuela Mexicana (NEM) en México (${nivel || 'Educación Básica'}).
      
      Tu objetivo es transformar las actividades de la Sesión de Clase descrita a continuación en una "HOJA DE TRABAJO IMPRIMIBLE Y EDITABLE EN WORD/GOOGLE DOCS PARA EL ALUMNO".
      
      DATOS DE LA SESIÓN DE CLASE:
      - Número y Título de Sesión: Sesión ${sesionNumero || 1}: ${sesionTitulo}
      - Fase Metodológica: ${faseNombre || 'Secuencia Didáctica'}
      - Asignatura/Disciplina: ${disciplina || 'General'}
      - Campo Formativo: ${campoFormativo || 'General'}
      - Grado y Grupo: ${grado || 'Grado'} - ${grupo || 'A'}
      - Contenido Sintético: ${contenido || 'General'}
      - PDA (Proceso de Desarrollo de Aprendizaje): ${pda || 'General'}
      - Actividades de Inicio sugeridas en la planeación: ${sesionInicio || ''}
      - Actividades de Desarrollo sugeridas en la planeación: ${sesionDesarrollo || ''}
      - Actividades de Cierre sugeridas en la planeación: ${sesionCierre || ''}
      - Materiales: ${(sesionMateriales || []).join(', ')}

      INSTRUCCIONES DE DISEÑO DE LA HOJA DE TRABAJO:
      La hoja de trabajo está dirigida directamente al ALUMNO/A para que la responda de manera individual o en binas.
      1. Título motivador y subtítulo con los datos clave del tema.
      2. Instrucciones Generales claras, comprensibles y respetuosas.
      3. SECCIÓN I: Inicio / Saberes Previos (1 a 3 preguntas o ejercicios de reflexión inicial basados en las actividades de inicio).
      4. SECCIÓN II: Desarrollo / Actividades Principales (3 a 5 actividades estructuradas: lectura guiada, preguntas analíticas, esquemas o tablas para completar, ejercicios prácticos basados en el desarrollo).
      5. SECCIÓN III: Cierre y Conclusiones (1 a 2 preguntas de síntesis, autoevaluación o reflexión crítica basadas en el cierre).
      6. Ticket de Salida: Una pregunta o reto relámpago final para comprobar el aprendizaje de la sesión.

      Asegúrate de estructurar preguntas con número de líneas o renglones sugeridos (ej. 3 a 5 líneas por respuesta).
    `;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        titulo: { type: Type.STRING, description: "Título de la hoja de trabajo" },
        subtitulo: { type: Type.STRING, description: "Subtítulo o tema central" },
        instruccionesGenerales: { type: Type.STRING, description: "Instrucciones generales para el estudiante" },
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
                required: ["numero", "preguntaOInstruccion"]
              }
            }
          },
          required: ["titulo", "instrucciones", "ejercicios"]
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
                required: ["numero", "preguntaOInstruccion"]
              }
            }
          },
          required: ["titulo", "instrucciones", "ejercicios"]
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
                required: ["numero", "preguntaOInstruccion"]
              }
            }
          },
          required: ["titulo", "instrucciones", "ejercicios"]
        },
        ticketDeSalida: { type: Type.STRING },
      },
      required: ["titulo", "subtitulo", "instruccionesGenerales", "seccionInicio", "seccionDesarrollo", "seccionCierre"]
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
    if (!responseText) {
      throw new Error("No se pudo generar la hoja de trabajo con Gemini.");
    }

    const worksheet = JSON.parse(responseText.trim());
    return res.json({ success: true, worksheet });
  } catch (error: any) {
    console.error("Error generating worksheet:", error);
    return res.status(500).json({ error: error.message || "Error al generar la hoja de trabajo." });
  }
});

// API endpoint for generating Exams (Diagnóstico, Parcial, Trimestral)
app.post("/api/generate-exam", async (req, res) => {
  try {
    const {
      nivel,
      grado,
      disciplina,
      campoFormativo,
      tipoExamen, // "diagnostico" | "parcial" | "trimestral"
      periodoTrimestre, // "Trimestre 1" | "Trimestre 2" | "Trimestre 3" | "1er Parcial" etc.
      contenidosSeleccionados, // Array of { contenido: string, pda: string }
      gradoAnterior,
      numReactivos,
      tipoPreguntas, // "opcion_multiple" | "pregunta_abierta" | "ambas"
      escuelaName,
      cct,
      docenteName,
      grupo,
    } = req.body;

    if (!nivel || !grado || !disciplina || !tipoExamen) {
      return res.status(400).json({ error: "Faltan parámetros obligatorios (nivel, grado, disciplina o tipo de examen)." });
    }

    const totalReactivos = Math.min(Math.max(Number(numReactivos) || 10, 3), 60);
    const nivelEducativo = nivel || "Secundaria";

    let descripcionTipo = "";
    if (tipoExamen === "diagnostico") {
      descripcionTipo = `
        TIPO DE EXAMEN: DIAGNÓSTICO INICIAL.
        OBJETIVO: Evaluar los aprendizajes previos y prerrequisitos fundamentales del GRADO ANTERIOR INMEDIATO (${gradoAnterior || "grado previo"}).
        El examen debe identificar el nivel de dominio de los contenidos y habilidades esenciales con los que el estudiante ingresa al ciclo escolar.
      `;
    } else if (tipoExamen === "parcial") {
      descripcionTipo = `
        TIPO DE EXAMEN: EVALUACIÓN PARCIAL / FORMATIVA.
        OBJETIVO: Evaluar el avance en los Contenidos y Procesos de Desarrollo de Aprendizaje (PDA) específicos seleccionados por el docente para este corte.
      `;
    } else {
      descripcionTipo = `
        TIPO DE EXAMEN: EVALUACIÓN TRIMESTRAL (${periodoTrimestre || "Trimestre Actual"}).
        OBJETIVO: Evaluar de manera integradora y formativa los Contenidos y PDA abordados a lo largo del periodo trimestral.
      `;
    }

    let descripcionPreguntas = "";
    if (tipoPreguntas === "opcion_multiple") {
      descripcionPreguntas = `
        TIPO DE PREGUNTAS: EXCLUSIVAMENTE OPCIÓN MÚLTIPLE (A, B, C, D).
        - Genera los ${totalReactivos} reactivos en formato de Opción Múltiple con exactamente 4 incisos: A, B, C y D.
        - 1 sola opción es inequívocamente correcta. Las otras 3 son distractores plausibles que reflejan concepciones alternativas o errores conceptuales comunes.
        - Plantea situaciones contextualizadas, casos, lecturas breves o problemas aplicados acordes al enfoque de la NEM.
      `;
    } else if (tipoPreguntas === "pregunta_abierta") {
      descripcionPreguntas = `
        TIPO DE PREGUNTAS: EXCLUSIVAMENTE PREGUNTAS ABIERTAS / RESPUESTA CONSTRUIDA.
        - Genera los ${totalReactivos} reactivos en formato de Pregunta Abierta.
        - Exigen argumentación, procedimiento, análisis crítico, redacción o resolución paso a paso.
        - Asigna el número sugerido de líneas/renglones para la respuesta del alumno (ej. 3 a 6 líneas).
        - Proporciona la respuesta modelo esperada y los criterios de evaluación formativa/rúbrica para calificar.
      `;
    } else {
      const halfMulti = Math.ceil(totalReactivos / 2);
      const halfOpen = totalReactivos - halfMulti;
      descripcionPreguntas = `
        TIPO DE PREGUNTAS: COMBINADAS (OPCIÓN MÚLTIPLE + PREGUNTAS ABIERTAS).
        - Distribución: Genera aproximadamente ${halfMulti} reactivos de Opción Múltiple (A, B, C, D) y ${halfOpen} reactivos de Pregunta Abierta.
        - Agrupa o intercala los reactivos coherentemente según su nivel de profundidad pedagógica.
      `;
    }

    const listaContenidos = (contenidosSeleccionados && contenidosSeleccionados.length > 0)
      ? contenidosSeleccionados.map((c: any, i: number) => `   Contenido ${i + 1}: ${c.contenido || 'Contenido general'}\n   PDA ${i + 1}: ${c.pda || 'PDA general'}`).join("\n")
      : "   Contenidos y PDAs sintéticos oficiales de la NEM para " + disciplina + " en " + grado + " de " + nivelEducativo + (tipoExamen === 'diagnostico' ? ' (enfocado en el grado anterior)' : '');

    const prompt = `
      Eres un Asesor Técnico Pedagógico (ATP) y Especialista en Evaluación Educativa de la Nueva Escuela Mexicana (NEM) y el Plan de Estudio 2022 de la SEP en México.

      Diseña un instrumento de evaluación formal tipo EXAMEN ESCOLAR contextualizado, riguroso y alineado a los principios de la NEM.

      DATOS DE LA EVALUACIÓN:
      - Nivel Educativo: ${nivelEducativo}
      - Grado: ${grado}
      - Grupo: ${grupo || "A"}
      - Disciplina / Asignatura: ${disciplina}
      - Campo Formativo: ${campoFormativo || "Curricular NEM"}
      - Escuela: ${escuelaName || "Escuela Secundaria"}
      - C.C.T.: ${cct || "CCT"}
      - Docente: ${docenteName || "Docente Titular"}
      - Número Total de Reactivos: Exactamente ${totalReactivos} reactivos
      - ${descripcionTipo}
      - ${descripcionPreguntas}

      CONTENIDOS Y PROCESOS DE DESARROLLO DE APRENDIZAJE (PDA) A EVALUAR:
      ${listaContenidos}

      REGLAS PEDAGÓGICAS DE REDACCIÓN DE LOS REACTIVOS:
      1. Evita reactivos puramente memorísticos o descontextualizados. Redacta reactivos basados en situaciones problemáticas, análisis de textos breves, gráficos conceptuales, dilemas éticos o aplicaciones científicas/matemáticas cotidianas.
      2. En opción múltiple: las 4 opciones (A, B, C, D) deben ser homogéneas en longitud y gramaticalmente concordantes con el enunciado.
      3. En preguntas abiertas: la instrucción debe ser explícita (ej. 'Explica...', 'Calcula y argumenta...', 'Compara...', 'Justifica tu postura...').
      4. Para CADA reactivo, debes incluir en la clave del docente:
         - La respuesta correcta (inciso exacto o respuesta modelo).
         - La justificación pedagógica explicando por qué esa es la respuesta correcta y qué indicador del PDA demuestra.
         - El contenido y PDA evaluado.
      5. La tabla de especificaciones debe mapear cada reactivo con su nivel cognitivo (Conocimiento, Comprensión, Aplicación, Análisis / Pensamiento Crítico) y puntaje.

      RESPONDE ÚNICAMENTE EN ESPAÑOL (MÉXICO) CON ORTOGRAFÍA IMPECABLE Y ACENTOS COMPLETOS.
    `;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        titulo: { type: Type.STRING, description: "Título oficial del examen (ej. 'Examen Diagnóstico de Matemáticas - 2º de Secundaria' o 'Examen Trimestral I de Lenguajes')" },
        subtitulo: { type: Type.STRING, description: "Subtítulo descriptivo o periodo evaluado" },
        tipoExamen: { type: Type.STRING, description: "diagnostico, parcial o trimestral" },
        instruccionesGenerales: { type: Type.STRING, description: "Instrucciones claras para el alumno al responder el examen" },
        tiempoEstimado: { type: Type.STRING, description: "Tiempo estimado de aplicación (ej. '50 a 60 minutos')" },
        reactivos: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              numero: { type: Type.INTEGER, description: "Número correlativo del reactivo (1 a N)" },
              tipo: { type: Type.STRING, description: "'opcion_multiple' o 'pregunta_abierta'" },
              contenidoEvaluado: { type: Type.STRING, description: "Contenido sintético curricular evaluado" },
              pdaEvaluado: { type: Type.STRING, description: "PDA correspondiente" },
              planteamiento: { type: Type.STRING, description: "Texto completo del reactivo, problema o pregunta" },
              opciones: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    inciso: { type: Type.STRING, description: "A, B, C o D" },
                    texto: { type: Type.STRING, description: "Texto de la opción de respuesta" },
                  },
                  required: ["inciso", "texto"],
                },
                description: "Lista de 4 opciones para reactivos de opción múltiple",
              },
              lineasRespuesta: { type: Type.INTEGER, description: "Número de líneas sugeridas para preguntas abiertas" },
              espacioRespuesta: { type: Type.STRING, description: "Indicación del espacio de respuesta" },
              respuestaCorrecta: { type: Type.STRING, description: "Inciso correcto (A, B, C o D) o respuesta modelo desarrollada" },
              justificacionPedagogica: { type: Type.STRING, description: "Explicación pedagógica de la respuesta y el error en distractores" },
              criterioEvaluacion: { type: Type.STRING, description: "Criterio o rúbrica de puntaje para calificar este reactivo" },
              puntos: { type: Type.NUMBER, description: "Valor en puntos del reactivo (ej. 1 punto o 2 puntos)" },
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
              nivelCognitivo: { type: Type.STRING, description: "Conocimiento, Comprensión, Aplicación o Análisis / Pensamiento Crítico" },
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
    if (!responseText) {
      throw new Error("No se pudo generar el examen con Gemini.");
    }

    const examData = JSON.parse(responseText.trim());
    return res.json({
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
    console.error("Error generating exam:", error);
    return res.status(500).json({ error: error.message || "Error al generar el examen institucional." });
  }
});

// Configure Vite or Static Assets serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
