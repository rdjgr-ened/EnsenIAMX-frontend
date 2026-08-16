import pandas as pd
import json
import os

files_info = [
    ("Fase 2", "Fase 2_Contenidos y PDA.xlsx"),
    ("Fase 3", "Fase 3_Contenido y PDA.xlsx"),
    ("Fase 4", "Fase 4_Contenido y PDA.xlsx"),
    ("Fase 5", "Fase 5_Contenido y PDA.xlsx"),
    ("Fase 6", "Fase 6_1º_Contenidos y PDA.xlsx"),
    ("Fase 6", "Fase 6_2º_Contenidos y PDA.xlsx"),
    ("Fase 6", "Fase 6_3º_ Contenidos y PD.xlsx"),
]

records = []

for fase_label, filename in files_info:
    if not os.path.exists(filename):
        print(f"Advertencia: No se encontró el archivo {filename}")
        continue
        
    xls = pd.ExcelFile(filename)
    for sheet in xls.sheet_names:
        df = pd.read_excel(filename, sheet_name=sheet)
        sheet_str = sheet.strip()
        
        campo = ""
        disciplina = None
        grado = ""
        
        if any(k in sheet_str for k in ["Len", "ESP", "ING", "ARTES"]):
            campo = "Lenguajes"
        elif any(k in sheet_str for k in ["Saberes", "MAT", "BIO", "FIS", "QUI"]):
            campo = "Saberes y Pensamiento Científico"
        elif any(k in sheet_str for k in ["Ética", "GEO", "HIST", "F.C.E"]):
            campo = "Ética, Naturaleza y Sociedades"
        elif any(k in sheet_str for k in ["Humano", "TEC", "TUTO", "EDU.FIS"]):
            campo = "De lo Humano y lo Comunitario"
            
        if "ESP" in sheet_str: disciplina = "Español"
        elif "ING" in sheet_str: disciplina = "Inglés"
        elif "ARTES" in sheet_str: disciplina = "Artes"
        elif "MAT" in sheet_str: disciplina = "Matemáticas"
        elif "BIO" in sheet_str: disciplina = "Biología"
        elif "FIS" in sheet_str: disciplina = "Física"
        elif "QUI" in sheet_str: disciplina = "Química"
        elif "GEO" in sheet_str: disciplina = "Geografía"
        elif "HIST" in sheet_str: disciplina = "Historia"
        elif "F.C.E" in sheet_str: disciplina = "Formación Cívica y Ética"
        elif "TEC" in sheet_str: disciplina = "Tecnología"
        elif "TUTO" in sheet_str: disciplina = "Tutoría / Educación Socioemocional"
        elif "EDU.FIS" in sheet_str: disciplina = "Educación Física"
        
        for g in ["1º", "1°", "2º", "2°", "3º", "3°", "4º", "4°", "5º", "5°", "6º", "6°"]:
            if g in sheet_str:
                grado = g.replace("º", "°")
                break
        if not grado and fase_label == "Fase 2":
            grado = "1°"

        current_cont = ""
        for _, row in df.iterrows():
            c0 = str(row.iloc[0]).strip() if len(row) > 0 and pd.notna(row.iloc[0]) else ""
            c2 = str(row.iloc[2]).strip() if len(row) > 2 and pd.notna(row.iloc[2]) else ""
            
            if c0 and not c0.startswith("Unnamed") and not c0.startswith("CONTENIDOS") and c0 not in ["I","II","III","IV","V","VI"]:
                current_cont = c0
                
            if c2 and not c2.startswith("Unnamed") and not c2.startswith("Procesos") and c2 not in ["I","II","III","IV","V","VI"] and not c2.startswith("http"):
                if current_cont:
                    records.append({
                        "fase": fase_label,
                        "grado": grado,
                        "campo_formativo": campo,
                        "disciplina": disciplina,
                        "contenido": current_cont,
                        "pda": c2
                    })

df_raw = pd.DataFrame(records)
grouped = df_raw.groupby(['fase', 'grado', 'campo_formativo', 'disciplina', 'contenido'], dropna=False)['pda'].apply(list).reset_index()

grouped_csv = grouped.copy()
grouped_csv['pdas'] = grouped_csv['pda'].apply(lambda x: json.dumps(x, ensure_ascii=False))
grouped_csv = grouped_csv.drop(columns=['pda'])
grouped_csv.to_csv("contenidos_supabase.csv", index=False)
print("✔ Archivo 'contenidos_supabase.csv' generado exitosamente.")

json_list = grouped.to_dict(orient='records')
json_structure = {"programa_sintetico_nem": json_list}
with open("nem_curriculo_completo.json", "w", encoding="utf-8") as f:
    json.dump(json_structure, f, ensure_ascii=False, indent=2)
print("✔ Archivo 'nem_curriculo_completo.json' generado exitosamente.")