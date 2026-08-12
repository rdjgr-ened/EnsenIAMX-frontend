import React from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import { LogOut, User as UserIcon, BookOpen, School } from 'lucide-react';

interface MainLayoutProps {
  user: User;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ user }) => {
  const nombreDocente = user.user_metadata?.nombreDocente || 'Docente';
  const escuelas = user.user_metadata?.escuelas || [];

  const handleCerrarSesion = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Navbar Superior */}
      <header className="bg-[#2A3E54] text-white px-6 py-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src="https://i.imgur.com/tv95RC0.png" 
            alt="EnseñIA MX Logo" 
            className="w-10 h-10 object-contain" 
          />
          <div>
            <h1 className="text-lg font-bold tracking-wide leading-none">EnseñIA MX</h1>
            <p className="text-[10px] text-slate-300 uppercase tracking-wider">Asistente Integral Docente</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold flex items-center justify-end gap-1">
              <UserIcon className="w-3.5 h-3.5" /> {nombreDocente}
            </p>
            <p className="text-[10px] text-slate-300">{user.email}</p>
          </div>
          <button
            onClick={handleCerrarSesion}
            className="bg-red-600/80 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Salir
          </button>
        </div>
      </header>

      {/* Contenido Principal / Dashboard */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {/* Banner de Bienvenida */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 uppercase">
              ¡Bienvenido(a), {nombreDocente}!
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Selecciona una herramienta o comienza a estructurar tu planeación didáctica.
            </p>
          </div>

          {escuelas.length > 0 && (
            <div className="bg-slate-50 p-3 rounded-md border border-slate-200">
              <p className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1 mb-1">
                <School className="w-3.5 h-3.5" /> Plantel Registrado:
              </p>
              <p className="text-xs font-bold text-slate-700">
                {escuelas[0].nombre} {escuelas[0].cct ? `(${escuelas[0].cct})` : ''}
              </p>
            </div>
          )}
        </div>

        {/* Tarjetas de Acceso Rápido */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#2A3E54] mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-800 uppercase">Planeador Didáctico</h3>
            <p className="text-xs text-slate-500 mt-1">
              Diseña tus secuencias didácticas alineadas a los programas de estudio.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;