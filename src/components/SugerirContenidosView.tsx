import React, { useState, useEffect } from "react";
import { Sparkles, ArrowLeft, RefreshCw, Copy, Check, FileEdit } from "lucide-react";

interface SugerirContenidosViewProps {
  onBack: () => void;
  onUseContent: (data: {
    nivel: string;
    grado: string;
    campoFormativo: string;
    disciplina: string;
    situacionProblema: string;
    contenido: string;
    pda: string;
  }) => void;
}

export default function SugerirContenidosView({ onBack, onUseContent }: SugerirContenidosViewProps) {
  const [nivel, setNivel] = useState("Secundaria");
  const [grado, setGrado] = useState("Primer Grado");
  const [campoFormativo, setCampoFormativo] = useState("Lenguajes");
  const [disciplina, setDisciplina] = useState("Español");
  const [situacionProblema, setSituacionProblema] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Array<{ contenido: string; pda: string }>>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

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

  // Sync default grades and available disciplines based on Level/Campo selection
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

  const handleSuggest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!situacionProblema.trim()) {
      setError("Por favor describe la situación-problema o necesidad del contexto.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuggestions([]);
    setSelectedIndex(null);

    try {
      const response = await fetch("/api/suggest-content", {
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
        throw new Error(data.error || "Error al sugerir contenidos.");
      }

      const data = await response.json();
      if (data.success && data.suggestions) {
        setSuggestions(data.suggestions);
      } else {
        throw new Error("Respuesta del servidor en formato incorrecto.");
      }
    } catch (err: any) {
      console.error("Error fetching suggestions:", err);
      setError(err.message || "Ocurrió un error al conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-lg transition"
            title="Volver"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-mex-gold animate-pulse" />
              Sugerir Contenidos y PDA
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">Sugerencias curriculares con Inteligencia Artificial</p>
          </div>
        </div>
      </div>

      {/* Main filter form */}
      <form onSubmit={handleSuggest} className="space-y-4">
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
            Situación-Problema a abordar en el contexto escolar
          </label>
          <textarea
            rows={3}
            value={situacionProblema}
            onChange={(e) => setSituacionProblema(e.target.value)}
            placeholder="Describe la problemática comunitaria, escolar o necesidad detectada (ej. Pérdida del uso de lenguas indígenas, falta de hábitos saludables, dificultades con operaciones básicas)..."
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-xs font-medium leading-relaxed transition outline-none"
            required
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-lg transition shadow-sm flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Obteniendo sugerencias...
              </>
            ) : (
              <>
                🔍 Obtener 3 Sugerencias Curriculares
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

      {/* SUGGESTIONS RESULTS DISPLAY */}
      {suggestions.length > 0 && (
        <div className="border-t border-slate-100 pt-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="font-extrabold text-xs text-slate-700 uppercase tracking-wider">
              🎯 Contenidos y PDAs sugeridos por Gemini:
            </h3>
            <p className="text-[11px] text-slate-400">Haz clic sobre una opción para seleccionarla y usarla</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {suggestions.map((sug, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`p-4 rounded-xl border cursor-pointer transition relative group ${
                  selectedIndex === idx
                    ? "bg-mex-maroon/5 border-mex-maroon ring-1 ring-mex-maroon/25"
                    : "bg-white border-slate-200/80 hover:bg-slate-50/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    checked={selectedIndex === idx}
                    onChange={() => setSelectedIndex(idx)}
                    className="mt-1 text-mex-maroon focus:ring-mex-maroon"
                  />
                  <div className="text-xs space-y-3 flex-1">
                    <div>
                      <span className="font-extrabold text-[9px] text-mex-maroon uppercase tracking-wider block mb-1">
                        Contenido sugerido:
                      </span>
                      <p className="font-bold text-slate-800 leading-relaxed">{sug.contenido}</p>
                    </div>
                    <div>
                      <span className="font-extrabold text-[9px] text-mex-maroon uppercase tracking-wider block mb-1">
                        Proceso de Desarrollo de Aprendizaje (PDA):
                      </span>
                      <p className="text-slate-600 font-semibold leading-relaxed">{sug.pda}</p>
                    </div>
                  </div>

                  {/* Copy button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(`Contenido: ${sug.contenido}\n\nPDA: ${sug.pda}`, idx);
                    }}
                    className="p-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-800 transition shadow-sm self-start"
                    title="Copiar texto"
                  >
                    {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3">
            <p className="text-[10px] text-slate-400 font-medium">
              *Las sugerencias están orientadas al marco curricular de la Nueva Escuela Mexicana (NEM) para {nivel}.
            </p>
            <button
              type="button"
              disabled={selectedIndex === null}
              onClick={() => {
                if (selectedIndex !== null) {
                  const s = suggestions[selectedIndex];
                  onUseContent({
                    nivel,
                    grado,
                    campoFormativo,
                    disciplina,
                    situacionProblema,
                    contenido: s.contenido,
                    pda: s.pda,
                  });
                }
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-mex-maroon hover:bg-mex-maroon/90 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-lg transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
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