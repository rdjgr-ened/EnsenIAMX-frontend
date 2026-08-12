import React, { useState } from 'react';
import { LogOut, Folder, BookOpen, Layers, FileSpreadsheet, ShieldAlert, ArrowRight } from 'lucide-react';

export default function App() {
  const [userName] = useState("René Gaytán");

  const handleNavigate = (view: string) => {
    console.log("Navegar a:", view);
  };

  const handleLogout = () => {
    console.log("Cerrar sesión");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      {/* 1. HEADER / NAVBAR */}
      <header className="bg-[#2D4356] text-white px-6 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center w-10 h-10">
            <img src="/logo-owly.png" alt="EnseñIA MX Logo" className="w-8 h-8 object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-tight text-white">
              EnseñIA MX
            </h1>
            <p className="text-[11px] text-slate-300 font-medium">
              Asistente Integral Docente
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-700/50 hover:bg-slate-700/80 text-white rounded-lg border border-slate-500/30 text-xs font-semibold transition cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          Cerrar Sesión
        </button>
      </header>

      {/* 2. DASHBOARD / CONTENIDO PRINCIPAL */}
      <main className="p-6 max-w-7xl mx-auto w-full space-y-6 flex-1">
        {/* Banner Oscuro */}
        <div className="bg-[#2D4356] text-white rounded-2xl p-8 shadow-sm relative overflow-hidden">
          <h2 className="text-3xl font-extrabold tracking-tight">
            ¡Hola, {userName}!
          </h2>
        </div>

        {/* Grid de Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ORGANIZADOR ESCOLAR */}
          <div 
            onClick={() => handleNavigate('organizador')}
            className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between min-h-[220px]"
          >
            <div className="space-y-4">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700">
                <Folder className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide">
                  ORGANIZADOR ESCOLAR
                </h3>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                  Acceso a tus carpetas digitales: Mis Planeaciones, Mis Grupos, Bitácora de Incidencias, Seguimiento y Evaluación Continua.
                </p>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
              <span>VER CARPETAS</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* PLANO DIDÁCTICO */}
          <div 
            onClick={() => handleNavigate('plano-didactico')}
            className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between min-h-[220px]"
          >
            <div className="space-y-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide">
                  PLANO DIDÁCTICO
                </h3>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                  Diseño y estructuración de proyectos didácticos por fases, ejes articuladores y secuencias de clase.
                </p>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
              <span>EXPLORAR FUNCIONES</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* PROGRAMA ANALÍTICO */}
          <div 
            onClick={() => handleNavigate('programa-analitico')}
            className="bg-white p-6 rounded-2xl border-2 border-amber-300 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between min-h-[220px]"
          >
            <div className="space-y-4">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide">
                  PROGRAMA ANALÍTICO
                </h3>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                  Sugerencias de contenidos con IA, creación de contenidos/PDAs y ensamblado del programa analítico.
                </p>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
              <span>EXPLORAR FUNCIONES</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* EVALUACIÓN */}
          <div 
            onClick={() => handleNavigate('evaluacion')}
            className="bg-white p-6 rounded-2xl border-2 border-emerald-300 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between min-h-[220px]"
          >
            <div className="space-y-4">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide">
                  EVALUACIÓN
                </h3>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                  Generación de formatos en Excel/Google Sheets y suma automática de evaluación continua por grupo.
                </p>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>EXPLORAR FUNCIONES</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* REGISTRO E INCIDENCIAS */}
          <div 
            onClick={() => handleNavigate('incidencias')}
            className="bg-white p-6 rounded-2xl border-2 border-rose-200 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between min-h-[220px]"
          >
            <div className="space-y-4">
              <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide">
                  REGISTRO E INCIDENCIAS
                </h3>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                  Bitácora de incidencias escolares y administración de grupos.
                </p>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
              <span>EXPLORAR FUNCIONES</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </main>

      {/* 3. FOOTER */}
      <footer className="w-full bg-slate-100 border-t border-slate-200 py-3 px-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 mt-auto">
        <div className="font-semibold tracking-wider text-slate-500">
          ENSEÑIA MX V2026.1
        </div>
        <div className="flex items-center gap-6 mt-2 sm:mt-0 font-medium">
          <a href="#privacidad" className="hover:text-slate-800 transition">
            Privacidad
          </a>
          <a href="#manual" className="hover:text-slate-800 transition">
            Manual de la NEM
          </a>
          <a href="#soporte" className="hover:text-slate-800 transition">
            Soporte Técnico
          </a>
        </div>
      </footer>
    </div>
  );
}