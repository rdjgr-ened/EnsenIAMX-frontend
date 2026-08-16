/**
 * Standardized PDF Export Utility for EnseñIA MX
 * Converts any DOM element or container into a high-quality PDF file
 * Following official Mexican SEP / NEM naming conventions:
 * EnsenIA_MX_[Tipo_de_Recurso]_[YYYY-MM-DD].pdf
 */

export interface ExportPdfOptions {
  elementOrId: HTMLElement | string;
  tipoRecurso: string;
  customFileName?: string;
  orientation?: "portrait" | "landscape";
  unit?: "mm" | "pt" | "in";
  format?: "letter" | "a4";
  margin?: number | [number, number, number, number];
}

/**
 * Generate formatted filename according to EnseñIA MX standards:
 * EnsenIA_MX_[Tipo_de_Recurso]_[YYYY-MM-DD].pdf
 */
export function getStandardPdfFilename(tipoRecurso: string, customSuffix?: string): string {
  const cleanTipo = tipoRecurso
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .replace(/_+/g, "_");

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const dateStr = `${yyyy}-${mm}-${dd}`;

  if (customSuffix) {
    const cleanSuffix = customSuffix
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .replace(/_+/g, "_")
      .slice(0, 30);
    return `EnsenIA_MX_${cleanTipo}_${cleanSuffix}_${dateStr}.pdf`;
  }

  return `EnsenIA_MX_${cleanTipo}_${dateStr}.pdf`;
}

/**
 * Triggers native browser print with safeguards
 */
export function printDocument(): boolean {
  try {
    if (typeof window !== "undefined") {
      window.print();
      return true;
    }
  } catch (error) {
    console.error("Error executing window.print():", error);
  }
  return false;
}

/**
 * Exports a DOM element or container to a real .PDF file using html2pdf.js
 */
export async function exportElementToPdf({
  elementOrId,
  tipoRecurso,
  customFileName,
  orientation = "portrait",
  format = "letter",
  margin = [8, 8, 8, 8],
}: ExportPdfOptions): Promise<{ success: boolean; filename: string; error?: string }> {
  try {
    let targetEl: HTMLElement | null = null;

    if (typeof elementOrId === "string") {
      targetEl = document.getElementById(elementOrId);
    } else if (elementOrId instanceof HTMLElement) {
      targetEl = elementOrId;
    }

    if (!targetEl) {
      throw new Error(`No se encontró el contenedor del documento a exportar.`);
    }

    const filename = customFileName || getStandardPdfFilename(tipoRecurso);

    // Dynamically import html2pdf.js for optimal client bundling
    // @ts-ignore
    const html2pdfModule = await import("html2pdf.js");
    const html2pdf = html2pdfModule.default || html2pdfModule;

    const opt = {
      margin: margin,
      filename: filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true,
        backgroundColor: "#ffffff",
        windowWidth: 1024,
      },
      jsPDF: {
        unit: "mm",
        format: format,
        orientation: orientation,
        compress: true,
      },
      pagebreak: {
        mode: ["avoid-all", "css", "legacy"],
        before: ".page-break-before",
        after: ".page-break-after",
        avoid: [
          ".page-break-inside-avoid",
          ".break-inside-avoid",
          "tr",
          "thead",
          "tbody",
          ".card-avoid-break",
          ".table-box",
        ],
      },
    };

    // Execute html2pdf generation and download
    const html2pdfLib = ((html2pdf as any)?.default || html2pdf) as any;
    await html2pdfLib().set(opt).from(targetEl).save();

    return { success: true, filename };
  } catch (err: any) {
    console.error("Error generating PDF in EnseñIA MX:", err);
    return {
      success: false,
      filename: customFileName || getStandardPdfFilename(tipoRecurso),
      error: err.message || "Error al generar el archivo PDF.",
    };
  }
}
