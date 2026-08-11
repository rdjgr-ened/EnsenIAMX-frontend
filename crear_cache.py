import time
from google import genai
from google.genai import types

API_KEY = "AQ.Ab8RN6L75eIT21XOPcI_nKXWNUytOZ-CfLJIyBGiQ9nzq5ScZQ"  # Asegúrate de colocar tu clave aquí
client = genai.Client(api_key=API_KEY)

print("1. Subiendo el archivo PDF del Plan de Estudios de la SEP...")

archivo_pdf = client.files.upload(
    file="plan_de_estudios_nem.pdf"
)

print(f"Archivo subido exitosamente. ID del archivo: {archivo_pdf.name}")
print("Procesando el PDF en los servidores de Google...")
time.sleep(10)

print("2. Creando el caché de la información...")

cache_creado = client.caches.create(
    model="gemini-3.6-flash",  # <--- MODELO ACTUALIZADO
    config=types.CreateCachedContentConfig(
        contents=[archivo_pdf],
        display_name="Contexto_NEM_EnsenIA_MX",
        system_instruction=(
            "Eres el motor de IA de EnseñIA MX, un asistente experto para docentes en México. "
            "Utiliza la información del documento adjunto (Plan de Estudios / Programa Sintético) "
            "como la fuente oficial e indiscutible para generar las secuencias didácticas, "
            "contenidos, PDA e instrumentos de evaluación."
        ),
        ttl="604800s",
    ),
)

print("\n¡ÉXITO! Tu caché ha sido creado correctamente.")
print(f"ID ÚNICO DE TU CACHÉ: {cache_creado.name}")