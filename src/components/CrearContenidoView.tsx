import React, { useState, useEffect } from "react";
import { PenTool, ArrowLeft, RefreshCw, Copy, Check, FileEdit } from "lucide-react";

interface CrearContenidoViewProps {
  onBack?: () => void;
  onUseContent?: (data: {
    nivel: string;
    grado: string;
    campoFormativo: string;
    disciplina: string;
    situacionProblema: string;
    contenido: string;
    pda: string;
  }) => void;
}

export default function CrearContenidoView(props: CrearContenidoViewProps) {
  const safeOnBack = props.onBack || (() => {});
  const safeOnUseContent = props.onUseContent || (() => {});
  const [nivel, setNivel] = useState("Secundaria");
  const [grado, setGrado] = useState("Primer Grado");
  const [campoFormativo, setCampoFormativo] = useState("Lenguajes");
  const [disciplina, setDisciplina] = useState("Español");
  const [situacionProblema, setSituacionProblema] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdContent, setCreatedContent] = useState<{ contenido: string; pda: string } | null>(null);
  const [copied, setCopied] = useState(false);

  // Sync default grades and available disciplines based on Level/Campo selection
  const getDisciplines = (): string[] => {
    if (nivel === "Preescolar") {
      if (campoFormativo === "Lenguajes") {
        return ["Educación Preescolar", "Lenguajes (Preescolar)"];
      }
      if (campoFormativo === "Saberes y Pensamiento Científico") {
        return ["Pensamiento Matemático", "Exploración del Mundo"];
      }
      if (campoFormativo === "Ética, Naturaleza y Sociedades") {
        return ["Exploración del Mundo"];
      }
      if (campoFormativo === "De lo Humano y lo Comunitario") {
        return ["Educación Socioemocional"];
      }
    }
    if (nivel === "Primaria") {
      if (campoFormativo === "Lenguajes") {
        return ["Español / Lenguajes", "Artes", "Inglés"];
      }
      if (campoFormativo === "Saberes y Pensamiento Científico") {
        return ["Matemáticas / Saberes", "Ciencias Naturales / Saberes"];
      }
      if (campoFormativo === "Ética, Naturaleza y Sociedades") {
        return ["Historia / Ética, Nat. y Soc.", "Geografía / Ética, Nat. y Soc.", "Formación Cívica y Ética"];
      }
      if (campoFormativo === "De lo Humano y lo Comunitario") {
        return ["Educación Física / Comunitario", "Tutoría / Socioemocional"];
      }
    }
    // Secundaria
    if (campoFormativo === "Lenguajes") {
      return ["Español", "Inglés", "Artes"];
    }
    if (campoFormativo === "Saberes y Pensamiento Científico") {
      return ["Matemáticas", "Biología", "Física", "Química"];
    }
    if (campoFormativo === "Ética, Naturaleza y Sociedades") {
      return ["Geografía", "Historia", "Formación Cívica y Ética"];
    }
    if (campoFormativo === "De lo Humano y lo Comunitario") {
      return ["Tecnología", "Educación Física", "Tutoría y Educación Socioemocional"];
    }
    return ["Español", "Matemáticas", "Ciencias", "Historia", "Inglés"];
  };

  useEffect(() => {
    if (nivel === "Preescolar") {
      setGrado("1º de Preescolar");
    } else {
      setGrado("Primer Grado");
    }
    
    // Automatically select the first discipline of the new set
    const available = getDisciplines();
    if (!available.includes(disciplina)) {
      setDisciplina(available[0]);
    }
  }, [nivel, campoFormativo]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!situacionProblema.trim()) {
      setError("Por favor escribe la situación-problema primero para que Gemini diseñe tu Contenido y PDA.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setCreatedContent(null);
    setCopied(false);

    try {
      const response = await fetch("/api/create-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nivel,
          grado,
          campoFormativo,
          disciplina,
          situacionProblema,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al crear contenido.");
      }

      const data = await response.json();
      if (data.success && data.contenido) {
        setCreatedContent({ contenido: data.contenido, pda: data.pda });
      } else {
        throw new Error("Respuesta del servidor en formato incorrecto.");
      }
    } catch (err: any) {
      console.error("Error creating content:", err);
      setError(err.message || "Ocurrió un error al conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!createdContent) return;
    navigator.clipboard.writeText(`Contenido Analítico (Codiseño):\n${createdContent.contenido}\n\nProceso de Desarrollo de Aprendizaje (PDA) a la Medida:\n${createdContent.pda}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => safeOnBack()}
            className="p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-lg transition"
            title="Volver"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
              <PenTool className="w-4 h-4 text-mex-maroon" />
              Crear Contenido y PDA (Codiseño NEM)
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">Diseño curricular a la medida para problemáticas locales</p>
          </div>
        </div>
        <span className="bg-mex-maroon/10 text-mex-maroon px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block self-start sm:self-center">
          Codiseño de Contenidos
        </span>
      </div>

      {/* Main filter form */}
      <form onSubmit={handleCreate} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Nivel Educativo</label>
            <select
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-xs font-semibold transition outline-none"
            >
              <option value="Preescolar">Preescolar</option>
              <option value="Primaria">Primaria</option>
              <option value="Secundaria">Secundaria</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Grado Escolar</label>
            <select
              value={grado}
              onChange={(e) => setGrado(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-xs font-semibold transition outline-none"
            >
              {nivel === "Preescolar" && (
                <>
                  <option value="1º de Preescolar">1º de Preescolar (3 años)</option>
                  <option value="2º de Preescolar">2º de Preescolar (4 años)</option>
                  <option value="3º de Preescolar">3º de Preescolar (5 años)</option>
                </>
              )}
              {nivel === "Secundaria" && (
                <>
                  <option value="Primer Grado">Primer Grado (1º)</option>
                  <option value="Segundo Grado">Segundo Grado (2º)</option>
                  <option value="Tercer Grado">Tercer Grado (3º)</option>
                </>
              )}
              {nivel === "Primaria" && (
                <>
                  <option value="Primer Grado">Primer Grado (1º)</option>
                  <option value="Segundo Grado">Segundo Grado (2º)</option>
                  <option value="Tercer Grado">Tercer Grado (3º)</option>
                  <option value="Cuarto Grado">Cuarto Grado (4º)</option>
                  <option value="Quinto Grado">Quinto Grado (5º)</option>
                  <option value="Sexto Grado">Sexto Grado (6º)</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Campo Formativo</label>
            <select
              value={campoFormativo}
              onChange={(e) => setCampoFormativo(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-xs font-semibold transition outline-none"
            >
              <option value="Lenguajes">Lenguajes</option>
              <option value="Saberes y Pensamiento Científico">Saberes y Pensamiento Científico</option>
              <option value="Ética, Naturaleza y Sociedades">Ética, Naturaleza y Sociedades</option>
              <option value="De lo Humano y lo Comunitario">De lo Humano y lo Comunitario</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Disciplina / Asignatura</label>
            <select
              value={disciplina}
              onChange={(e) => setDisciplina(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-xs font-semibold transition outline-none"
            >
              {getDisciplines().map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">
            Situación-Problema o Desafío local a atender
          </label>
          <textarea
            rows={3}
            value={situacionProblema}
            onChange={(e) => setSituacionProblema(e.target.value)}
            placeholder="Describe la problemática comunitaria o particular de tus alumnos para la que requieres codiseñar un Contenido y PDA específicos (ej. Consumo excesivo de plásticos en la comunidad escolar, violencia verbal en redes sociales)..."
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-xs font-medium leading-relaxed transition outline-none"
            required
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-mex-maroon hover:bg-mex-maroon/90 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-lg transition shadow-sm flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Diseñando curricularmente...
              </>
            ) : (
              <>
                ✍ Diseñar Contenido y PDA Co-diseñado
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold leading-normal">
          ⚠️ {error}
        </div>
      )}

      {/* CREATED RESULT DISPLAY */}
      {createdContent && (
        <div className="border-t border-slate-100 pt-6 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-xs text-slate-700 uppercase tracking-wider">
              ✨ Contenido y PDA Diseñados a la Medida:
            </h3>
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-950 rounded text-[10px] uppercase tracking-wider font-extrabold flex items-center gap-1.5 transition shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copiar Todo
                </>
              )}
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-mex-maroon/5 border border-mex-maroon/15 space-y-4 shadow-inner">
            <div className="text-xs space-y-1">
              <span className="font-extrabold text-[10px] text-mex-maroon uppercase tracking-wider block">
                Contenido Co-diseñado (Analítico):
              </span>
              <p className="font-bold text-slate-800 bg-white p-3 rounded-xl border border-slate-100 shadow-sm leading-relaxed">
                {createdContent.contenido}
              </p>
            </div>
            <div className="text-xs space-y-1">
              <span className="font-extrabold text-[10px] text-mex-maroon uppercase tracking-wider block">
                Proceso de Desarrollo de Aprendizaje (PDA) correspondiente:
              </span>
              <p className="text-slate-600 font-semibold bg-white p-3 rounded-xl border border-slate-100 shadow-sm leading-relaxed">
                {createdContent.pda}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
              *Este contenido se clasifica como codiseño analítico complementario dentro del programa escolar.
            </p>
            <button
              type="button"
              onClick={() => {
                if (createdContent) {
                  safeOnUseContent({
                    nivel,
                    grado,
                    campoFormativo,
                    disciplina,
                    situacionProblema,
                    contenido: createdContent.contenido,
                    pda: createdContent.pda,
                  });
                }
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-mex-maroon hover:bg-mex-maroon/90 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-lg transition shadow-sm flex items-center justify-center gap-2"
            >
              <FileEdit className="w-3.5 h-3.5" />
              Diseñar Proyecto con este Contenido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
