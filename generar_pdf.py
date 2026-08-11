from google import genai
from google.genai import types
import markdown
from xhtml2pdf import pisa

# 1. Configuración de API e ID de Caché
API_KEY = "AQ.Ab8RN6L75eIT21XOPcI_nKXWNUytOZ-CfLJIyBGiQ9nzq5ScZQ"
CACHE_ID = "cachedContents/c15x4momr2guxag636vjj7pfudgxb9ymn6iy982e"

client = genai.Client(api_key=API_KEY)

# 2. Petición del docente
prompt_docente = """
Genera una secuencia didáctica con la metodología de Aprendizaje Basado en Proyectos Comunitarios (ABPC):
- Campo Formativo: Lenguajes
- Fase / Grado: Fase 4 (3° de Primaria)
- Nombre del Proyecto: Mi comunidad a través de la narrativa
- Contenido: Narración de sucesos del pasado y del presente.
- PDA: Identifica y comprende la función y las características principales de los textos narrativos.
- Número de sesiones: 3 sesiones

Incluye actividades detalladas por sesión y una rúbrica de evaluación clara.
"""

print("1. Generando planeación con EnseñIA MX...")

response = client.models.generate_content(
    model="gemini-3.6-flash",
    contents=prompt_docente,
    config=types.GenerateContentConfig(
        cached_content=CACHE_ID,
        temperature=0.3,
    )
)

contenido_markdown = response.text

print("2. Convirtiendo respuesta a formato PDF...")

# Convertir Markdown a HTML
html_body = markdown.markdown(contenido_markdown, extensions=['tables'])

# Plantilla HTML con estilo limpio para el PDF
html_content = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        @page {{
            size: a4 portrait;
            margin: 1.5cm;
        }}
        body {{
            font-family: Helvetica, Arial, sans-serif;
            color: #2b2b2b;
            font-size: 10pt;
            line-height: 1.4;
        }}
        h1 {{
            color: #003366;
            font-size: 18pt;
            border-bottom: 2px solid #0056b3;
            padding-bottom: 5px;
        }}
        h2 {{
            color: #003366;
            font-size: 13pt;
            margin-top: 15px;
        }}
        h3 {{
            font-size: 11pt;
            color: #2b2b2b;
        }}
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
        }}
        th, td {{
            border: 1px solid #cccccc;
            padding: 5px;
            font-size: 8.5pt;
            text-align: left;
        }}
        th {{
            background-color: #f0f4f8;
            color: #003366;
        }}
        ul, ol {{
            margin-left: 15px;
        }}
    </style>
</head>
<body>
    <h1>EnseñIA MX - Planeación Didáctica</h1>
    <p><b>Marco Oficial:</b> Nueva Escuela Mexicana (NEM)</p>
    <hr/>
    {html_body}
</body>
</html>
"""

# Guardar el PDF
archivo_pdf = "Planeacion_EnsenIA_MX.pdf"

with open(archivo_pdf, "wb") as pdf_file:
    pisa_status = pisa.CreatePDF(html_content, dest=pdf_file)

if not pisa_status.err:
    print(f"\n¡ÉXITO! Tu archivo PDF se generó en: {archivo_pdf}")
else:
    print("\nOcurrió un error al generar el PDF.")