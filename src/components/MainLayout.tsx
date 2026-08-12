import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import { LogOut, User as UserIcon } from 'lucide-react';

// Importación de todos los componentes de vistas de AI Studio
import DashboardHub from './DashboardHub';
import OrganizadorEscolarView from './OrganizadorEscolarView';
import PlaneacionForm from './PlaneacionForm';
import BitacoraIncidenciaView from './BitacoraIncidenciaView';
import FormatoEvaluacionView from './FormatoEvaluacionView';
import CrearProgramaAnaliticoView from './CrearProgramaAnaliticoView';
import SugerirContenidosView from './SugerirContenidosView';
import CrearContenidoView from './CrearContenidoView';

interface MainLayoutProps {
  user: User;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ user }) => {
  const [vistaActual, setVistaActual] = useState<string>('hub');

  const nombreDocente = 
    user.user_metadata?.nombreDocente || 
    user.user_metadata?.full_name || 
    user.user_metadata?.name || 
    user.email?.split('@')[0] || 
    'Docente';

  const handleCerrarSesion = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-[#2A3E54] text-white px-6 py-4 shadow-md flex justify-between items-center">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setVistaActual('hub')}
        >
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

      {/* Contenido Dinámico */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        {vistaActual === 'hub' && (
          <DashboardHub 
            user={user} 
            onNavigate={(vista: string) => setVistaActual(vista)} 
          />
        )}

        {vistaActual === 'organizador' && (
          <OrganizadorEscolarView onVolver={() => setVistaActual('hub')} />
        )}

        {vistaActual === 'plano-didactico' && (
          <PlaneacionForm onVolver={() => setVistaActual('hub')} />
        )}

        {vistaActual === 'bitacora' && (
          <BitacoraIncidenciaView onVolver={() => setVistaActual('hub')} />
        )}

        {vistaActual === 'evaluacion' && (
          <FormatoEvaluacionView onVolver={() => setVistaActual('hub')} />
        )}

        {vistaActual === 'programa-analitico' && (
          <CrearProgramaAnaliticoView onVolver={() => setVistaActual('hub')} />
        )}

        {vistaActual === 'sugerir-contenidos' && (
          <SugerirContenidosView onVolver={() => setVistaActual('hub')} />
        )}

        {vistaActual === 'crear-contenido' && (
          <CrearContenidoView onVolver={() => setVistaActual('hub')} />
        )}
      </main>
    </div>
  );
};

export default MainLayout;