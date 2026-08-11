from google import genai
from google.genai import types

API_KEY = "AQ.Ab8RN6L75eIT21XOPcI_nKXWNUytOZ-CfLJIyBGiQ9nzq5ScZQ"
client = genai.Client(api_key=API_KEY)

CACHE_ID = "cachedContents/c15x4momr2guxag636vjj7pfudgxb9ymn6iy982e"

prompt_docente = """
Genera una secuencia didáctica con la metodología de Aprendizaje Basado en Proyectos Comunitarios (ABPC)...
"""

print("Generando planeación con EnseñIA MX usando Gemini 3.6 Flash...")

# Actualiza el nombre del modelo aquí:
response = client.models.generate_content(
    model="gemini-3.6-flash",  # <--- MODELO ACTUAL
    contents=prompt_docente,
    config=types.GenerateContentConfig(
        cached_content=CACHE_ID,
        temperature=0.3,
    )
)

print(response.text)