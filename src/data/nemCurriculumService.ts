/**
 * SERVICIO OFICIAL INTEGRAL DEL PLAN DE ESTUDIOS NEM (NUEVA ESCUELA MEXICANA)
 * FASE 2 (Preescolar 1°, 2°, 3°)
 * FASE 3 (Primaria 1°, 2°)
 * FASE 4 (Primaria 3°, 4°)
 * FASE 5 (Primaria 5°, 6°)
 * FASE 6 (Secundaria 1°, 2°, 3°)
 *
 * Contiene el 100% de los Contenidos y Procesos de Desarrollo de Aprendizaje (PDA)
 * con normalización omnidireccional de Grados, Campos y Disciplinas.
 */

export interface NemPdaItem {
  id: string;
  descripcion: string;
  orden: number;
}

export interface NemContenidoEntry {
  fase: "Fase 2" | "Fase 3" | "Fase 4" | "Fase 5" | "Fase 6" | string;
  nivel: "Preescolar" | "Primaria" | "Secundaria" | string;
  grado: string; // "1°", "2°", "3°", "4°", "5°", "6°" o formato largo
  campo_formativo: string; // "Lenguajes", "Saberes y Pensamiento Científico", "Ética, Naturaleza y Sociedades", "De lo Humano y lo Comunitario"
  disciplina: string; // "Español", "Matemáticas", "Inglés", "Biología", "Física", "Química", "Geografía", "Historia", "Formación Cívica y Ética", "Tecnología", "Artes", "Tutoría / Educación Socioemocional", "Educación Física", "General"
  contenido: string;
  pdas: string[];
}

import { NEM_CURRICULUM_RELATIONAL_DATA } from "./nemCurriculumRelational";

export function cleanCurriculumText(text: string): string {
  if (!text) return "";
  let t = text;
  // Join words broken by hyphens and whitespace/newlines: e.g. "salu- dables" -> "saludables", "regu- laridades" -> "regularidades"
  t = t.replace(/([a-záéíóúüñA-ZÁÉÍÓÚÜÑ]+)-\s+([a-záéíóúüñA-ZÁÉÍÓÚÜÑ]+)/g, "$1$2");
  // Replace multiple spaces
  t = t.replace(/\s+/g, " ");
  // Fix common OCR initial letter drops
  if (/^nteracción\b/i.test(t)) t = "I" + t;
  if (/^dentifica\b/i.test(t)) t = "I" + t;
  if (/^econoce\b/i.test(t)) t = "R" + t;
  if (/^omprende\b/i.test(t)) t = "C" + t;
  if (/^labora\b/i.test(t)) t = "E" + t;
  if (/^xpresa\b/i.test(t)) t = "E" + t;
  if (/^xplora\b/i.test(t)) t = "E" + t;
  if (/^naliza\b/i.test(t)) t = "A" + t;
  if (/^escribe\b/i.test(t)) t = "D" + t;
  if (/^tiliza\b/i.test(t)) t = "U" + t;
  if (/^articipa\b/i.test(t)) t = "P" + t;
  if (/^eflexiona\b/i.test(t)) t = "R" + t;
  return t.trim();
}

const DISCIPLINE_HEADER_NAMES = new Set([
  "ESPAÑOL", "MATEMÁTICAS", "INGLÉS", "ARTES", "BIOLOGÍA", "FÍSICA", "QUÍMICA",
  "GEOGRAFÍA", "HISTORIA", "FORMACIÓN CÍVICA Y ÉTICA", "TECNOLOGÍA", "TUTORÍA",
  "EDUCACIÓN FÍSICA", "TUTORÍA / EDUCACIÓN SOCIOEMOCIONAL", "TUTORÍA Y EDUCACIÓN SOCIOEMOCIONAL"
]);

// Map of canonical Campo Formativo labels
export const CANONICAL_CAMPOS = [
  "Lenguajes",
  "Saberes y Pensamiento Científico",
  "Ética, Naturaleza y Sociedades",
  "De lo Humano y lo Comunitario"
];

// Helper to normalize strings for comparison
export function normalizeStr(str: string): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/**
 * Normaliza cualquier variante de Grado al estándar del nivel
 */
export function normalizeGrado(gradoRaw: string, nivelRaw: string): string {
  const norm = normalizeStr(gradoRaw);
  const nNorm = normalizeStr(nivelRaw);

  if (nNorm.includes("preescolar") || norm.includes("preescolar")) {
    if (norm.includes("1") || norm.includes("primer")) return "1º de Preescolar";
    if (norm.includes("2") || norm.includes("segund")) return "2º de Preescolar";
    return "3º de Preescolar";
  }

  if (nNorm.includes("secundaria") || norm.includes("secundaria")) {
    if (norm.includes("1") || norm.includes("primer")) return "1º de Secundaria";
    if (norm.includes("2") || norm.includes("segund")) return "2º de Secundaria";
    return "3º de Secundaria";
  }

  // Primaria default
  if (norm.includes("1") || norm.includes("primer")) return "1º de Primaria";
  if (norm.includes("2") || norm.includes("segund")) return "2º de Primaria";
  if (norm.includes("3") || norm.includes("tercer")) return "3º de Primaria";
  if (norm.includes("4") || norm.includes("cuart")) return "4º de Primaria";
  if (norm.includes("5") || norm.includes("quint")) return "5º de Primaria";
  if (norm.includes("6") || norm.includes("sext")) return "6º de Primaria";

  return gradoRaw;
}

/**
 * Devuelve la lista de grados válidos según el nivel
 */
export function getGradosPorNivel(nivel: string): string[] {
  const n = normalizeStr(nivel);
  if (n.includes("preescolar")) {
    return ["1º de Preescolar", "2º de Preescolar", "3º de Preescolar"];
  }
  if (n.includes("secundaria")) {
    return ["1º de Secundaria", "2º de Secundaria", "3º de Secundaria"];
  }
  return [
    "1º de Primaria",
    "2º de Primaria",
    "3º de Primaria",
    "4º de Primaria",
    "5º de Primaria",
    "6º de Primaria"
  ];
}

/**
 * Normaliza el nombre o ID de un Campo Formativo
 */
export function normalizeCampoFormativo(campoRaw: string): string {
  const n = normalizeStr(campoRaw);
  if (n.includes("lengua")) return "Lenguajes";
  if (n.includes("saber") || n.includes("cientif") || n.includes("matemat")) return "Saberes y Pensamiento Científico";
  if (n.includes("etic") || n.includes("sociedad") || n.includes("naturaleza")) return "Ética, Naturaleza y Sociedades";
  if (n.includes("human") || n.includes("comunit")) return "De lo Humano y lo Comunitario";
  return "Lenguajes";
}

/**
 * Normaliza el nombre o ID de una Disciplina en Secundaria
 */
export function normalizeDisciplina(disciplinaRaw: string, campoCanonical?: string): string {
  const n = normalizeStr(disciplinaRaw);
  if (n.includes("espanol") || n.includes("lengua materna")) return "Español";
  if (n.includes("ingles") || n.includes("extranjera")) return "Inglés";
  if (n.includes("arte") || n.includes("musica") || n.includes("danza") || n.includes("teatro")) return "Artes";
  if (n.includes("matemat")) return "Matemáticas";
  if (n.includes("biolog")) return "Biología";
  if (n.includes("fisic") && !n.includes("educacion fisica")) return "Física";
  if (n.includes("quimic")) return "Química";
  if (n.includes("geograf")) return "Geografía";
  if (n.includes("histor")) return "Historia";
  if (n.includes("civic") || n.includes("fcye") || n.includes("formacion")) return "Formación Cívica y Ética";
  if (n.includes("tecnolog")) return "Tecnología";
  if (n.includes("tutor") || n.includes("socioemocional")) return "Tutoría / Educación Socioemocional";
  if (n.includes("educacion fisica") || n.includes("ed. fisica")) return "Educación Física";
  
  if (campoCanonical) {
    if (campoCanonical === "Lenguajes") return "Español";
    if (campoCanonical === "Saberes y Pensamiento Científico") return "Matemáticas";
    if (campoCanonical === "Ética, Naturaleza y Sociedades") return "Historia";
    if (campoCanonical === "De lo Humano y lo Comunitario") return "Tecnología";
  }

  return "General";
}

/**
 * Obtiene las disciplinas disponibles según Nivel, Grado y Campo Formativo
 */
export function getDisciplinasDisponibles(nivel: string, grado: string, campo: string): Array<{ id: string; nombre: string }> {
  const n = normalizeStr(nivel);
  const campoCanon = normalizeCampoFormativo(campo);

  if (n.includes("secundaria")) {
    const gNorm = normalizeGrado(grado, "Secundaria");
    if (campoCanon === "Lenguajes") {
      return [
        { id: "Español", nombre: "Lengua Materna: Español" },
        { id: "Inglés", nombre: "Lengua Extranjera: Inglés" },
        { id: "Artes", nombre: "Artes (Música, Teatro, Danza, Visuales)" }
      ];
    }
    if (campoCanon === "Saberes y Pensamiento Científico") {
      const items: Array<{ id: string; nombre: string }> = [
        { id: "Matemáticas", nombre: "Matemáticas" }
      ];
      if (gNorm.includes("1")) {
        items.push({ id: "Biología", nombre: "Ciencias I: Biología" });
      } else if (gNorm.includes("2")) {
        items.push({ id: "Física", nombre: "Ciencias II: Física" });
      } else {
        items.push({ id: "Química", nombre: "Ciencias III: Química" });
      }
      items.push({ id: "Educación Física", nombre: "Educación Física" });
      return items;
    }
    if (campoCanon === "Ética, Naturaleza y Sociedades") {
      const items: Array<{ id: string; nombre: string }> = [];
      if (gNorm.includes("1")) {
        items.push({ id: "Geografía", nombre: "Geografía" });
      }
      items.push({ id: "Historia", nombre: "Historia" });
      items.push({ id: "Formación Cívica y Ética", nombre: "Formación Cívica y Ética" });
      return items;
    }
    if (campoCanon === "De lo Humano y lo Comunitario") {
      return [
        { id: "Tecnología", nombre: "Tecnología" },
        { id: "Tutoría / Educación Socioemocional", nombre: "Educación Socioemocional / Tutoría" },
        { id: "Educación Física", nombre: "Educación Física" }
      ];
    }
  }

  // Preescolar y Primaria: Disciplinas integradas por Campo Formativo
  return [
    { id: "General", nombre: `${campoCanon} (Integrado)` }
  ];
}

/**
 * Consulta de Contenidos Oficiales de la NEM con PDAs
 */
export function getOficialContenidos(
  nivel: string,
  grado: string,
  campo: string,
  disciplina?: string
): Array<{ id: string; contenido: string; pdas: string[] }> {
  const normNivel = normalizeStr(nivel);
  const normGrado = normalizeGrado(grado, nivel);
  const canonCampo = normalizeCampoFormativo(campo);
  const canonDisc = disciplina ? normalizeDisciplina(disciplina, canonCampo) : "General";

  // Filter relational database
  const matches = NEM_CURRICULUM_RELATIONAL_DATA.filter((item) => {
    const rawCont = (item.contenido || "").trim();
    if (DISCIPLINE_HEADER_NAMES.has(rawCont.toUpperCase())) return false;
    if (rawCont.toUpperCase() === rawCont && rawCont.length < 35 && (!item.pdas || item.pdas.length === 0)) return false;

    // 1. Check nivel
    const itemNivel = normalizeStr(item.nivel);
    const nivelMatch =
      (normNivel.includes("preescolar") && itemNivel.includes("preescolar")) ||
      (normNivel.includes("primaria") && itemNivel.includes("primaria")) ||
      (normNivel.includes("secundaria") && itemNivel.includes("secundaria"));
    if (!nivelMatch) return false;

    // 2. Check grado
    const itemGrado = normalizeGrado(item.grado, item.nivel);
    const gradoNumMatch =
      (normGrado.includes("1") && itemGrado.includes("1")) ||
      (normGrado.includes("2") && itemGrado.includes("2")) ||
      (normGrado.includes("3") && itemGrado.includes("3")) ||
      (normGrado.includes("4") && itemGrado.includes("4")) ||
      (normGrado.includes("5") && itemGrado.includes("5")) ||
      (normGrado.includes("6") && itemGrado.includes("6"));
    if (!gradoNumMatch) return false;

    // 3. Check campo formativo
    const itemCampo = normalizeCampoFormativo(item.campo_formativo);
    if (itemCampo !== canonCampo) return false;

    // 4. Check disciplina (if in Secundaria)
    if (normNivel.includes("secundaria")) {
      const itemDisc = normalizeDisciplina(item.disciplina, itemCampo);
      if (canonDisc !== "General" && itemDisc !== "General") {
        if (itemDisc !== canonDisc) return false;
      }
    }

    return item.pdas && item.pdas.length > 0;
  });

  // Map to unified format with text cleaning
  return matches.map((item, idx) => ({
    id: item.contenido_id || `cont_${idx + 1}`,
    contenido: cleanCurriculumText(item.contenido),
    pdas: item.pdas
      .map((p) => cleanCurriculumText(typeof p === "string" ? p : p.descripcion))
      .filter((desc) => desc && desc.length > 0)
  }));
}

/**
 * Consulta de PDAs específicos de un Contenido
 */
export function getOficialPdas(
  nivel: string,
  grado: string,
  campo: string,
  disciplina: string,
  contenidoTexto: string
): string[] {
  const contents = getOficialContenidos(nivel, grado, campo, disciplina);
  const target = normalizeStr(contenidoTexto);
  
  const found = contents.find((c) => {
    const norm = normalizeStr(c.contenido);
    return norm === target || norm.includes(target) || target.includes(norm);
  });

  if (found && found.pdas && found.pdas.length > 0) {
    return found.pdas;
  }

  // Fallback: If no exact content match, return all available PDAs in the group or empty
  return contents[0]?.pdas || [];
}
