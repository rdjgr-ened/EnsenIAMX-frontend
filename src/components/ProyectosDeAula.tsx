import React, { useState, useEffect } from "react";
import { BookOpen, Sparkles, RefreshCw, AlertCircle, Layers, ArrowLeft, Coins } from "lucide-react";
import { supabase } from "../utils/supabaseClient";

export interface ProyectoLibro {
  id: number;
  nivel: string;
  grado: number;
  campo_formativo: string;
  nombre_proyecto: string;
  paginas: string;
}

interface ProyectosDeAulaProps {
  onVolver: () => void;
  onPlanGenerated: (planData: any) => void;
}

export default function ProyectosDeAula({ onVolver, onPlanGenerated }: ProyectosDeAulaProps) {
  const [proyectos, setProyectos] = useState<ProyectoLibro[]>([]);
  const [isLoadingDatos, setIsLoadingDatos] = useState(true);
  
  // Filtros
  const [filtroNivel, setFiltroNivel] = useState("Primaria");
  const [filtroGrado, setFiltroGrado] = useState<number>(1);
  const [filtroCampo, setFiltroCampo] = useState<string>("Todos");

  // Estado para guardar los campos formativos únicos que existan en la BD para el grado seleccionado
  const [camposDisponibles, setCamposDisponibles] = useState<string[]>([]);

  // Estados de generación
  const [generatingId, setGeneratingId] = useState<number | null>(null);
  const [errorGlobal, setErrorGlobal] = useState<string | null>(null);

  // Cargar proyectos de la base de datos
  useEffect(() => {
    const fetchProyectos = async () => {
      setIsLoadingDatos(true);
      try {
        let query = supabase
          .from('proyectos_libros')
          .select('*')
          .eq('nivel', filtroNivel)
          .eq('grado', filtroGrado)
          .order('id', { ascending: true });

        // Si hay un campo seleccionado (y no es "Todos"), aplicamos el filtro
        if (filtroCampo !== "Todos") {
          query = query.eq('campo_formativo', filtroCampo);
        }

        const { data, error } = await query;

        if (error) throw error;
        
        const proyectosObtenidos = data || [];
        setProyectos(proyectosObtenidos);

        // Si estamos buscando "Todos", actualizamos la lista de campos disponibles
        if (filtroCampo === "Todos") {
           const camposUnicos = Array.from(new Set(proyectosObtenidos.map(p => p.campo_formativo)));
           setCamposDisponibles(camposUnicos);
        }

      } catch (error) {
        console.error("Error al cargar proyectos:", error);
      } finally {
        setIsLoadingDatos(false);
      }
    };

    fetchProyectos();
  }, [filtroNivel, filtroGrado, filtroCampo]);

  // Si cambia el nivel o el grado, reseteamos el filtro de campo a "Todos"
  const handleNivelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltroNivel(e.target.value);
    setFiltroGrado(1);
    setFiltroCampo("Todos");
  };

  const handleGradoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltroGrado(Number(e.target.value));
    setFiltroCampo("Todos");
  };

  // Manejador para conectar con la API
  const handleGenerarPlan = async (proyecto: ProyectoLibro) => {
    setGeneratingId(proyecto.id);
    setErrorGlobal(null);

    const gradoMap: Record<number, string> = { 1: "Primer Grado", 2: "Segundo Grado", 3: "Tercer Grado", 4: "Cuarto Grado", 5: "Quinto Grado", 6: "Sexto Grado" };
    const gradoTexto = gradoMap[proyecto.grado] || `${proyecto.grado} Grado`;
    
    // Armamos el libroId (ej: primaria_1_proyectos)
    const libroIdCalculado = `${proyecto.nivel.toLowerCase()}_${proyecto.grado}_proyectos`;

    try {
      const payload = {
        libroId: libroIdCalculado,
        proyectoNombre: proyecto.nombre_proyecto,
        paginas: proyecto.paginas,
        grado: gradoTexto,
        campoFormativo: proyecto.campo_formativo,
        numSesiones: 8,
        duracionSesion: "50 minutos",
        metodologia: "Aprendizaje Basado en Proyectos Comunitarios (ABPC)" 
      };

      const response = await fetch('/api/generate-plan-libro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Error al procesar el libro con Gemini.");
      }

      // Estructuramos el resultado para PlaneacionPreview.tsx
      const completePlan = {
        nivel: proyecto.nivel,
        grado: gradoTexto,
        campoFormativo: proyecto.campo_formativo,
        disciplina: "Integrada", 
        contenido: `Proyecto del Libro SEP: ${proyecto.nombre_proyecto}`,
        pda: data.plan?.proposito || "Cumplir con el propósito del proyecto.",
        metodologia: payload.metodologia,
        ejesArticuladores: ["Inclusión", "Pensamiento crítico"], 
        situacionProblema: `Desarrollo del proyecto: ${proyecto.nombre_proyecto} (Págs. ${proyecto.paginas})`,
        plan: data.plan,
        duracionSemanas: "2 semanas",
        duracionSesion: payload.duracionSesion
      };

      onPlanGenerated(completePlan);

    } catch (error: any) {
      console.error("Error en la generación:", error);
      setErrorGlobal(error.message);
    } finally {
      setGeneratingId(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Barra de retroceso */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <button
          type="button"
          onClick={onVolver}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs uppercase tracking-wider transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Panel</span>
        </button>
      </div>

      {/* Encabezado y Filtros */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-mex-maroon/10 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-mex-maroon" />
          </div>
          <div>
            <h2 className="font-black text-slate-800 text-lg uppercase tracking-wider">Proyectos de Aula</h2>
            <p className="text-slate-500 text-xs font-medium">Libros de Texto Gratuitos (SEP)</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 w-full lg:w-auto">
          <select 
            value={filtroNivel} 
            onChange={handleNivelChange}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon rounded-lg text-slate-700 text-xs font-bold outline-none cursor-pointer"
          >
            <option value="Primaria">Primaria</option>
            <option value="Secundaria">Secundaria</option>
          </select>

          <select 
            value={filtroGrado} 
            onChange={handleGradoChange}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon rounded-lg text-slate-700 text-xs font-bold outline-none cursor-pointer"
          >
            <option value={1}>1° Grado</option>
            <option value={2}>2° Grado</option>
            <option value={3}>3° Grado</option>
            {filtroNivel === "Primaria" && (
              <>
                <option value={4}>4° Grado</option>
                <option value={5}>5° Grado</option>
                <option value={6}>6° Grado</option>
              </>
            )}
          </select>

          <select 
            value={filtroCampo} 
            onChange={(e) => setFiltroCampo(e.target.value)}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-mex-maroon rounded-lg text-slate-700 text-xs font-bold outline-none cursor-pointer max-w-[200px] truncate"
          >
            <option value="Todos">Todos los Campos</option>
            {camposDisponibles.map(campo => (
               <option key={campo} value={campo}>{campo}</option>
            ))}
          </select>
        </div>
      </div>

      {errorGlobal && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{errorGlobal}</p>
        </div>
      )}

      {/* Grid de Proyectos */}
      {isLoadingDatos ? (
        <div className="flex flex-col items-center justify-center p-12 text-slate-400">
          <RefreshCw className="w-8 h-8 animate-spin text-mex-maroon mb-4" />
          <span className="text-sm font-bold uppercase tracking-wider">Cargando catálogo SEP...</span>
        </div>
      ) : proyectos.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center shadow-sm">
          <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700">No se encontraron proyectos</h3>
          <p className="text-xs text-slate-500 mt-1">Intenta con otro grado o nivel educativo.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {proyectos.map((proyecto) => {
            const isGenerating = generatingId === proyecto.id;
            
            return (
              <div key={proyecto.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
                <div className="p-5 flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] bg-slate-100 text-slate-600 font-black uppercase tracking-wider px-2 py-1 rounded">
                      Pág. {proyecto.paginas}
                    </span>
                  </div>
                  <h3 className="font-black text-slate-800 text-sm mb-2 leading-tight">
                    {proyecto.nombre_proyecto}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    {proyecto.campo_formativo}
                  </p>
                </div>
                
                <div className="p-4 bg-slate-50 border-t border-slate-100 relative">
                  <button
                    onClick={() => handleGenerarPlan(proyecto)}
                    disabled={generatingId !== null}
                    className={`w-full py-3 rounded-lg font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition ${
                      isGenerating 
                        ? "bg-slate-800 text-white cursor-wait" 
                        : generatingId !== null
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                        : "bg-slate-900 hover:bg-black text-white shadow-md active:scale-[0.98]"
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-mex-gold" />
                        <span>Analizando Libro...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-mex-gold" />
                        <span>Diseñar Secuencia</span>
                      </>
                    )}
                  </button>
                  
                  {/* Etiqueta de costo */}
                  {!isGenerating && generatingId === null && (
                    <div className="absolute -top-3 right-4 flex items-center gap-1 text-[9px] font-black bg-amber-100 border border-amber-200 text-amber-900 px-2 py-0.5 rounded-full shadow-sm">
                      <Coins className="w-3 h-3" /> 10 créditos
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}