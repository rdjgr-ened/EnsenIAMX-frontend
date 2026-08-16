# -*- coding: utf-8 -*-
import json
import os

entries = []

def add_entry(fase, nivel, grado, campo, disciplina, contenido, pdas):
    # Filter out empty or header pdas
    cleaned_pdas = []
    for p in pdas:
        p_clean = p.strip()
        if not p_clean or p_clean.endswith("GRADO") or p_clean in ["1° GRADO", "2° GRADO", "3° GRADO", "4° GRADO", "5° GRADO", "6° GRADO"]:
            continue
        # Clean up common OCR artifacts
        p_clean = re.sub(r'\s+', ' ', p_clean)
        cleaned_pdas.append(p_clean)
    
    if not cleaned_pdas:
        return

    # Create safe ID
    clean_campo = re.sub(r'[^a-zA-Z0-9]', '', campo)[:6].upper()
    clean_disc = re.sub(r'[^a-zA-Z0-9]', '', disciplina)[:6].upper()
    clean_grado = re.sub(r'[^a-zA-Z0-9]', '', grado).upper()
    clean_fase = re.sub(r'[^a-zA-Z0-9]', '', fase).upper()
    
    item_id = f"CONT_{clean_fase}_{clean_campo}_{clean_disc}_{clean_grado}_{len(entries)+1}"
    
    pda_objects = []
    for i, p_desc in enumerate(cleaned_pdas):
        pda_objects.append({
            "pda_id": f"PDA_{clean_fase}_{clean_campo}_{clean_disc}_{clean_grado}_{len(entries)+1}_{i+1}",
            "descripcion": p_desc,
            "orden": i + 1
        })

    entries.append({
        "fase": fase,
        "nivel": nivel,
        "campo_formativo": campo,
        "disciplina": disciplina if disciplina and disciplina != "nan" and disciplina != "NaN" else "General",
        "grado": grado,
        "contenido_id": item_id,
        "contenido": re.sub(r'\s+', ' ', contenido).strip(),
        "pdas": pda_objects
    })

import re
print("Helper ready")
