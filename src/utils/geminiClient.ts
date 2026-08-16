/**
 * Client service to communicate with the server-side /api/generate endpoint (Vercel Serverless Function / Express route).
 * This ensures that no GEMINI_API_KEY is ever exposed on the frontend client.
 */

export interface GeminiGenerateOptions {
  prompt: string;
  systemInstruction?: string;
  responseSchema?: any;
  responseMimeType?: "application/json" | "text/plain";
  temperature?: number;
  model?: string;
  useNemCache?: boolean;
}

export interface GeminiGenerateResponse<T = any> {
  success: boolean;
  text?: string;
  data?: T;
  error?: string;
  warning?: string;
  cached?: boolean;
}

export async function generateWithGemini<T = any>(
  options: GeminiGenerateOptions
): Promise<GeminiGenerateResponse<T>> {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(
        errData.error || `Error ${response.status}: No se pudo procesar la solicitud con el servidor de Gemini.`
      );
    }

    const json: GeminiGenerateResponse<T> = await response.json();
    return json;
  } catch (error: any) {
    console.error("Error invoking /api/generate:", error);
    return {
      success: false,
      error: error.message || "Error al conectar con la función de servidor.",
    };
  }
}
