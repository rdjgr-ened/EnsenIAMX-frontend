import { GoogleGenAI, Type } from "@google/genai";

/**
 * Contexto Estático Completo de la Nueva Escuela Mexicana (NEM) y Plan de Estudio 2022
 * Diseñado para ser almacenado en Caché de Contexto (Prompt Caching / Context Caching)
 * de la API de Gemini, reduciendo el consumo de tokens en cada petición.
 */
export const NEM_STATIC_CURRICULUM_SYSTEM_INSTRUCTION = `
Eres un Asesor Pedagógico de Élite y Especialista Curricular en la Nueva Escuela Mexicana (NEM), el Plan de Estudio 2022 y la Educación Básica en México (Fase 2: Preescolar, Fases 3, 4 y 5: Primaria, Fase 6: Secundaria).

Tu misión es generar secuencias y planeaciones didácticas completas, analíticas, estructuradas y contextualizadas con el máximo rigor pedagógico oficial mexicano.

1. MARCO CURRICULAR Y CAMPOS FORMATIVOS:
- Lenguajes: Español, Lenguas Indígenas, Lengua Extranjera (Inglés) y Artes. Fomenta la comunicación dialógica, expresión artística y valoración cultural.
- Saberes y Pensamiento Científico: Matemáticas, Biología, Física y Química. Desarrolla el pensamiento analítico, indagación científica y modelación matemática.
- Ética, Naturaleza y Sociedades: Geografía, Historia y Formación Cívica y Ética. Promueve la ciudadanía crítica, conciencia ambiental, memoria histórica y derechos humanos.
- De lo Humano y lo Comunitario: Tecnología, Tutoría y Educación Socioemocional, Educación Física. Fortalece el autocuidado, habilidades socioemocionales y proyectos de vida comunitaria.

2. LOS 7 EJES ARTICULADORES:
- Inclusión: Garantizar la presencia, participación y logro de todos los estudiantes.
- Pensamiento Crítico: Capacidad de interrogar la realidad y emitir juicios razonados.
- Interculturalidad Crítica: Reconocimiento y diálogo simétrico entre diversas identidades culturales.
- Igualdad de Género: Desmontaje de estereotipos y relaciones de poder desiguales.
- Vida Saludable: Cuidado del cuerpo, alimentación sana, actividad física y bienestar socioemocional.
- Apropiación de las culturas a través de la lectura y la escritura: Desarrollo pleno de la lectura y escritura para la vida.
- Artes y experiencias estéticas: Goce estético, creatividad y apreciación del patrimonio cultural.

3. METODOLOGÍAS SOCIOCRÍTICAS Y MODALIDADES OFICIALES:
A) Aprendizaje Basado en Proyectos Comunitarios (ABPC) [Lenguajes]:
   - Fase 1. Planeación: Momento 1 (Identificación), Momento 2 (Recuperación), Momento 3 (Planificación).
   - Fase 2. Acción: Momento 4 (Acercamiento), Momento 5 (Comprensión y producción), Momento 6 (Reconocimiento), Momento 7 (Concreción).
   - Fase 3. Intervención: Momento 8 (Integración), Momento 9 (Difusión), Momento 10 (Consideraciones), Momento 11 (Avances).
B) Aprendizaje Basado en Indagación (STEAM) [Saberes y Pensamiento Científico]:
   - Fase 1. Introducción al tema y saberes previos.
   - Fase 2. Diseño de la investigación / Desarrollo de la indagación.
   - Fase 3. Organizar y estructurar las respuestas a las preguntas de indagación.
   - Fase 4. Presentación de los resultados de indagación / Aplicación.
   - Fase 5. Metacognición / Reflexión y evaluación formativa.
C) Aprendizaje Basado en Problemas (ABP) [Ética, Naturaleza y Sociedades]:
   - Momento 1. Presentemos
   - Momento 2. Recolectemos
   - Momento 3. Formulemos el problema
   - Momento 4. Organicemos la experiencia
   - Momento 5. Vivamos la experiencia
   - Momento 6. Resultados y análisis
D) Aprendizaje Servicio (AS) [De lo Humano y lo Comunitario]:
   - Etapa 1. Punto de partida
   - Etapa 2. Lo que sé y lo que quiero saber
   - Etapa 3. Organicemos las actividades
   - Etapa 4. Creatividad en marcha
   - Etapa 5. Compartir y evaluar los resultados
E) Modalidades de Preescolar (Fase 2):
   - Taller Crítico: Etapa 1 (Situación Inicial), Etapa 2 (Organización), Etapa 3 (Puesta en Marcha), Etapa 4 (Valoramos lo Aprendido).
   - Rincones de Aprendizaje: Etapa 1 (Saberes Previos), Etapa 2 (Asamblea Inicial), Etapa 3 (Exploración), Etapa 4 (Compartimos), Etapa 5 (Reflexión).
   - Centros de Interés: Etapa 1 (Contacto con la Realidad), Etapa 2 (Identificación e Integración), Etapa 3 (Expresión).
   - Unidad Didáctica: Etapa 1 (Lectura de la Realidad), Etapa 2 (Trama y Complejidad), Etapa 3 (Planificación), Etapa 4 (Exploración), Etapa 5 (Participación Activa), Etapa 6 (Valoración).
   - Aprendizaje Basado en el Juego: Etapa 1 (Planteamiento), Etapa 2 (Desarrollo), Etapa 3 (Compartimos), Etapa 4 (Comunidad de Juego).
   - Proyecto: Etapa 1 (Punto de Partida), Etapa 2 (Planeación), Etapa 3 (¡A Trabajar!), Etapa 4 (Comunicamos Logros), Etapa 5 (Reflexión).

4. DISEÑO UNIVERSAL PARA EL APRENDIZAJE (DUA) Y ATENCIÓN A BAP / TDAH:
- Prever múltiples formas de representación (visual, auditiva, kinestésica, apoyos pictográficos).
- Prever múltiples formas de acción y expresión (organizadores gráficos, maquetas, presentaciones orales, respuestas orales o grabadas).
- Prever múltiples formas de implicación y compromiso (desafíos graduados, roles colaborativos, temporizadores para TDAH, descansos activos).
- Ajustes razonables específicos para Discapacidad Intelectual (DI), Visual, Auditiva, Motriz, Trastorno del Espectro Autista (TEA), Trastorno por Déficit de Atención e Hiperactividad (TDAH), y Aptitudes Sobresalientes (ASI).

5. EVALUACIÓN FORMATIVA INTEGRADA:
- Evaluación procesual e integrada sesión por sesión (no un apéndice vacío al final).
- Criterios claros de logro, indicadores observables, evidencias de desempeño e instrumentos formativos (rúbricas sintéticas, listas de cotejo, escalas estimativas, diarios de clase, registros anecdóticos).
- Énfasis en la autoevaluación, coevaluación y retroalimentación constructiva continua.

6. REGLA ESTRICTA DE SALIDA:
- Responder siempre en formato JSON limpio acorde con el esquema de salida pedagógico estructurado.
- Usar Español de México formal con acentuación y ortografía impecable (á, é, í, ó, ú, ñ).
`;

export const NEM_STATIC_CURRICULUM_CONTENT_BLOCK = `
PROGRAMAS SINTÉTICOS Y ESTRUCTURA DIDÁCTICA DE REFERENCIA (NEM 2022-2026):
- Fase 2 (Preescolar): 1º, 2º y 3º de Preescolar. Integración de lenguajes verbales, artísticos, corporales; exploración del entorno natural y social; desarrollo de autonomía y convivencia armónica.
- Fase 3 (Primaria): 1º y 2º de Primaria. Alfabetización inicial consolidada, pensamiento matemático básico, exploración del entorno inmediato y cuidado del cuerpo.
- Fase 4 (Primaria): 3º y 4º de Primaria. Comprensión lectora avanzada, razonamiento matemático y resolución de problemas, ubicación espacio-temporal e identidad comunitaria.
- Fase 5 (Primaria): 5º y 6º de Primaria. Pensamiento crítico y reflexivo, indagación científica, análisis histórico y geográfico de México y el mundo, convivencia democrática.
- Fase 6 (Secundaria): 1º, 2º y 3º de Secundaria. Profundización disciplinar por asignaturas articuladas en los cuatro campos formativos.
`;

export const NEM_PLAN_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    proposito: {
      type: Type.STRING,
      description: "Propósito didáctico formal del proyecto vinculando el problema con el PDA.",
    },
    producto: {
      type: Type.STRING,
      description: "Descripción detallada del producto didáctico final (ej. Folleto, Infografía, Debate, Prototipo, Periódico escolar).",
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
                numero: { type: Type.INTEGER, description: "Número correlativo de la sesión." },
                titulo: { type: Type.STRING, description: "Título sugerido para la sesión." },
                duracion: { type: Type.STRING, description: "Duración en minutos (ej. '50 minutos')." },
                materiales: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Materiales específicos requeridos." },
                inicio: { type: Type.STRING, description: "Detalle de actividades de inicio (focalización, saberes previos, conflicto cognitivo, tiempos)." },
                desarrollo: { type: Type.STRING, description: "Detalle de actividades de desarrollo (construcción, indagación, trabajo colaborativo, ejercicios)." },
                cierre: { type: Type.STRING, description: "Detalle de actividades de cierre (retroalimentación, síntesis, evaluación)." },
                evaluacionSesion: { type: Type.STRING, description: "Evaluación formativa integrada específica para esta sesión." },
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
        tecnicas: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Lista de técnicas pedagógicas aplicadas." },
        instrumentos: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Lista de instrumentos de evaluación formativa sugeridos." },
        descripcion: { type: Type.STRING, description: "Estrategia general de evaluación formativa, autoevaluación y retroalimentación." },
      },
      required: ["tecnicas", "instrumentos", "descripcion"],
    },
    sugerenciasAdecuacion: {
      type: Type.STRING,
      description: "Recomendaciones específicas para la atención inclusiva de BAP / TDAH / DUA.",
    },
  },
  required: ["proposito", "producto", "fases", "evaluacionFormativa", "sugerenciasAdecuacion"],
};

// In-Memory Cache Tracker to reuse the active Context Cache across calls
interface CacheEntry {
  cacheName: string;
  model: string;
  expiresAt: number;
}

let activeNemCache: CacheEntry | null = null;
let cacheCreationPromise: Promise<string | null> | null = null;

/**
 * Obtiene o crea un recurso de Context Caching (Prompt Caching) en la API de Gemini.
 * Almacena el contexto estático curricular de la NEM en el servidor de Google durante 2 horas.
 * Las peticiones posteriores solo transmiten los tokens dinámicos del docente.
 */
export async function getOrCreateNemPromptCache(
  ai: GoogleGenAI,
  modelName: string = "gemini-2.5-flash"
): Promise<string | null> {
  const now = Date.now();

  // If we already have an active valid cache for this model, reuse it!
  if (activeNemCache && activeNemCache.model === modelName && activeNemCache.expiresAt > now + 60000) {
    return activeNemCache.cacheName;
  }

  // Prevent concurrent duplicate creation requests
  if (cacheCreationPromise) {
    return cacheCreationPromise;
  }

  cacheCreationPromise = (async () => {
    try {
      if (!ai.caches || typeof ai.caches.create !== "function") {
        return null;
      }

      console.log(`[Prompt Caching] Creating new NEM Context Cache resource for model: ${modelName}...`);
      
      const createdCache = await ai.caches.create({
        model: modelName,
        config: {
          displayName: "nem_curriculum_static_cache",
          ttl: "7200s", // 2 hours TTL
          systemInstruction: NEM_STATIC_CURRICULUM_SYSTEM_INSTRUCTION,
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: NEM_STATIC_CURRICULUM_CONTENT_BLOCK,
                },
              ],
            },
          ],
        },
      });

      if (createdCache && createdCache.name) {
        activeNemCache = {
          cacheName: createdCache.name,
          model: modelName,
          expiresAt: now + 7200 * 1000,
        };
        console.log(`[Prompt Caching] Successfully registered NEM cache resource: ${createdCache.name}`);
        return createdCache.name;
      }

      return null;
    } catch (err: any) {
      console.warn("[Prompt Caching] Notice: Cache resource creation bypassed (falling back to standard systemInstruction):", err.message || err);
      return null;
    } finally {
      cacheCreationPromise = null;
    }
  })();

  return cacheCreationPromise;
}
