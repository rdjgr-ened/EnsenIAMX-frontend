# -*- coding: utf-8 -*-
import json
import re
from data_fase2 import FASE_2_DATA
from data_fase3 import FASE_3_DATA
from data_fase4 import FASE_4_DATA
from data_fase5 import FASE_5_DATA
from data_fase6 import FASE_6_DATA

all_records = []
id_counter = 1

def process_phase_data(fase_name, nivel_name, data_list):
    global id_counter
    for item in data_list:
        campo = item.get("campo", "")
        disciplina = item.get("disciplina", "General")
        contenido = item.get("contenido", "")
        pdas_by_grado = item.get("pdas", {})

        for grado, pda_list in pdas_by_grado.items():
            # Format grado string
            grado_full = grado
            if "°" in grado and "de" not in grado:
                if nivel_name == "Preescolar":
                    grado_full = f"{grado} de Preescolar"
                elif nivel_name == "Primaria":
                    grado_full = f"{grado} de Primaria"
                elif nivel_name == "Secundaria":
                    grado_full = f"{grado} de Secundaria"

            pda_objects = []
            for idx, pda_text in enumerate(pda_list):
                pda_text_clean = pda_text.strip()
                if not pda_text_clean:
                    continue
                pda_id = f"PDA_{fase_name.upper()}_{id_counter}_{idx+1}"
                pda_objects.append({
                    "pda_id": pda_id,
                    "descripcion": pda_text_clean,
                    "orden": idx + 1
                })

            if pda_objects:
                cont_id = f"CONT_{fase_name.upper()}_{id_counter}"
                id_counter += 1
                all_records.append({
                    "fase": fase_name,
                    "nivel": nivel_name,
                    "campo_formativo": campo,
                    "disciplina": disciplina,
                    "grado": grado_full,
                    "contenido_id": cont_id,
                    "contenido": contenido.strip(),
                    "pdas": pda_objects
                })

process_phase_data("Fase 2", "Preescolar", FASE_2_DATA)
process_phase_data("Fase 3", "Primaria", FASE_3_DATA)
process_phase_data("Fase 4", "Primaria", FASE_4_DATA)
process_phase_data("Fase 5", "Primaria", FASE_5_DATA)
process_phase_data("Fase 6", "Secundaria", FASE_6_DATA)

print(f"Total structured items generated: {len(all_records)}")

total_pdas = sum(len(r["pdas"]) for r in all_records)
print(f"Total individual PDAs: {total_pdas}")

# Output TypeScript file
ts_content = """// Catálogo Curricular Relacional Oficial de la Nueva Escuela Mexicana (NEM)
// Plan de Estudios 2022-2023 - Fases 2, 3, 4, 5 y 6
// Actualizado con el 100% de Contenidos y Procesos de Desarrollo de Aprendizaje (PDA)

export interface NemPdaRelacional {
  pda_id: string;
  descripcion: string;
  orden: number;
}

export interface NemContenidoRelacional {
  fase: string;
  nivel: string;
  campo_formativo: string;
  disciplina?: string;
  grado: string;
  contenido_id: string;
  contenido: string;
  pdas: NemPdaRelacional[];
}

export const NEM_CURRICULUM_DATA: NemContenidoRelacional[] = """ + json.dumps(all_records, ensure_ascii=False, indent=2) + """;

export const NEM_CURRICULUM_RELATIONAL_DATA = NEM_CURRICULUM_DATA;
"""

with open("src/data/nemCurriculumRelational.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("nemCurriculumRelational.ts generated successfully!")
