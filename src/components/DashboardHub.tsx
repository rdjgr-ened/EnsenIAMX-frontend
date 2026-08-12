import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { 
  Folder, 
  BookOpen, 
  Layers, 
  FileSpreadsheet, 
  ClipboardList, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  PenTool,
  PlusCircle,
  Users,
  Calculator,
  Calendar,
  FileText
} from 'lucide-react';

interface DashboardHubProps {
  user?: User | null;
  onNavigate: (vista: string) => void;
}

export const DashboardHub: React.FC<DashboardHubProps> = ({ user, onNavigate }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);

  const nombreUsuario = 
    user?.user_metadata?.nombreDocente || 
    user?.user_metadata?.full_name || 
    user?.user_metadata?.name || 
    user?.email?.split('@')[0] || 
    'Docente';

  return (
    <div className="space-y-6">
      {/* Banner de Bienvenida con Nombre */}
      <div className="bg-[#2A3E54] text-white p-8 rounded-2xl shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tight">¡Hola, {nombreUsuario}!</h1>
          <p className="text-slate-300 text-sm mt-1">
            Selecciona un módulo para gestionar tu labor docente o generar materiales con IA.
          </p>
        </div>
      </div>

      {/* Botón de regreso a categorías principales */}
      {categoriaSeleccionada && (
        <button
          onClick={() => setCategoriaSeleccionada(null)}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#2A3E54] uppercase tracking-wider mb-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a categorías
        </button>
      )}

      {/* ================= VISTA 1: CATEGORÍAS PRINCIPALES ================= */}
      {!categoriaSeleccionada && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. ORGANIZADOR ESCOLAR */}
          <div 
            onClick={() => setCategoriaSeleccionada('organizador')}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 mb-4">
                <Folder className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg uppercase">Organizador Escolar</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Acceso a tus carpetas digitales: Mis Planeaciones, Mis Grupos, Bitácora de Incidencias, Seguimiento y Evaluación Continua.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
              <span>VER CARPETAS</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* 2. PLANO DIDÁCTICO */}
          <div 
            onClick={() => setCategoriaSeleccionada('plano-didactico')}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg uppercase">Plano Didáctico</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Diseño y estructuración de proyectos didácticos por fases, ejes articuladores y secuencias de clase.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
              <span>EXPLORAR FUNCIONES</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* 3. PROGRAMA ANALÍTICO */}
          <div 
            onClick={() => setCategoriaSeleccionada('programa-analitico')}
            className="bg-white p-6 rounded-2xl shadow-sm border border-amber-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg uppercase">Programa Analítico</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Sugerencias de contenidos con IA, creación de contenidos/PDAs y ensamblado del programa analítico.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
              <span>EXPLORAR FUNCIONES</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* 4. EVALUACIÓN */}
          <div 
            onClick={() => setCategoriaSeleccionada('evaluacion')}
            className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 mb-4">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg uppercase">Evaluación</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Generación de formatos en Excel/Google Sheets y suma automática de evaluación continua por grupo.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
              <span>FORMATOS Y LISTAS</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* 5. REGISTRO E INCIDENCIAS */}
          <div 
            onClick={() => setCategoriaSeleccionada('registro-incidencias')}
            className="bg-white p-6 rounded-2xl shadow-sm border border-rose-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-700 mb-4">
                <ClipboardList className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg uppercase">Registro e Incidencias</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Bitácora de incidencias escolares y administración de reportes por alumnos y grupos.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
              <span>ABRIR BITÁCORA</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}

      {/* ================= VISTAS DE SUBCATEGORÍAS ================= */}

      {/* 1. SUBCATEGORÍAS: ORGANIZADOR ESCOLAR */}
      {categoriaSeleccionada === 'organizador' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-slate-100 p-4 rounded-xl border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-white">
              <Folder className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-lg uppercase">Organizador Escolar</h2>
              <p className="text-xs text-slate-600">Selecciona una carpeta digital para ingresar directamente:</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              onClick={() => onNavigate('organizador')}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-slate-800 text-sm uppercase">1. Mis Planeaciones</h3>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                <span>ABRIR CARPETA</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div 
              onClick={() => onNavigate('organizador')}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-slate-800 text-sm uppercase">2. Mis Grupos</h3>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                <span>ABRIR CARPETA</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div 
              onClick={() => onNavigate('bitacora')}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-slate-800 text-sm uppercase">3. Bitácora de Incidencias</h3>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-red-600">
                <span>ABRIR CARPETA</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div 
              onClick={() => onNavigate('organizador')}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-slate-800 text-sm uppercase">4. Seguimiento de Clases</h3>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                <span>ABRIR CARPETA</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div 
              onClick={() => onNavigate('evaluacion')}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-slate-800 text-sm uppercase">5. Evaluación Continua del Trabajo en Clase</h3>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
                <span>ABRIR CARPETA</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SUBCATEGORÍAS: PLANO DIDÁCTICO */}
      {categoriaSeleccionada === 'plano-didactico' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl border border-blue-200">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-lg uppercase">Plano Didáctico</h2>
              <p className="text-xs text-slate-600">Herramientas de diseño de secuencias didácticas:</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              onClick={() => onNavigate('plano-didactico')}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm uppercase">Diseñar Planeación Didáctica</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Crea una planeación didáctica completa paso a paso. Define duración, ejes transversales, metodologías NEM y genera una secuencia didáctica profesional.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                <span>INICIAR PLANEACIÓN</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. SUBCATEGORÍAS: PROGRAMA ANALÍTICO */}
      {categoriaSeleccionada === 'programa-analitico' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-amber-50 p-4 rounded-xl border border-amber-200">
            <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-white">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-lg uppercase">Programa Analítico</h2>
              <p className="text-xs text-slate-600">Funciones de codiseño curricular e integración de PDAs:</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              onClick={() => onNavigate('sugerir-contenidos')}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm uppercase">Sugerir Contenidos</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Proporciona tu problemática contextual y Gemini sugerirá los mejores Contenidos y PDAs estructurados.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                <span>EXPLORAR SUGERENCIAS</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div 
              onClick={() => onNavigate('crear-contenido')}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 mb-4">
                  <PenTool className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm uppercase">Crear Contenido y PDA</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Efectúa procesos de codiseño curricular. Describe una situación local única y Gemini diseñará un Contenido y un PDA a la medida.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                <span>REDACTAR CODISEÑO</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div 
              onClick={() => onNavigate('programa-analitico')}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 mb-4">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm uppercase">Programa Analítico</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Estructura el programa analítico integrado de tu fase. Contextualiza y codiseña PDAs normales, modificados y nuevos.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                <span>CREAR PROGRAMA</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. SUBCATEGORÍAS: EVALUACIÓN */}
      {categoriaSeleccionada === 'evaluacion' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-emerald-50 p-4 rounded-xl border border-emerald-200">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-lg uppercase">Evaluación</h2>
              <p className="text-xs text-slate-600">Herramientas de cálculo, formatos y listas de evaluación:</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              onClick={() => onNavigate('evaluacion')}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm uppercase">Formato de Evaluación</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Crea el formato oficial para Google Sheets / Excel. Selecciona elementos, ajusta calificaciones máximas y porcentajes.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                <span>ABRIR FORMATO</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div 
              onClick={() => onNavigate('evaluacion')}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm uppercase">Evaluación Continua</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Suma automática de entregables, participaciones y proyectos de tus grupos con ponderación personalizada.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                <span>ABRIR EVALUACIÓN CONTINUA</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. SUBCATEGORÍAS: REGISTRO E INCIDENCIAS ESCOLARES */}
      {categoriaSeleccionada === 'registro-incidencias' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-rose-50 p-4 rounded-xl border border-rose-200">
            <div className="w-10 h-10 rounded-lg bg-rose-600 flex items-center justify-center text-white">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-lg uppercase">Registro e Incidencias Escolares</h2>
              <p className="text-xs text-slate-600">Herramientas de control de incidencias y alumnos:</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              onClick={() => onNavigate('bitacora')}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600 mb-4">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm uppercase">Bitácora de Incidencia Escolar</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Registro y seguimiento de incidencias por grupo, autocompletado desde el padrón de alumnos, folio automático y PDF.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-600">
                <span>ABRIR BITÁCORA</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div 
              onClick={() => onNavigate('organizador')}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm uppercase">Mis Grupos y Alumnos</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Administración de grupos, altas de estudiantes e importación de listas.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                <span>ADMINISTRAR GRUPOS</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHub;