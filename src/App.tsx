import React, { useState, useEffect } from 'react';
import { FileText, LayoutDashboard, Sparkles, BookOpen, UserCheck, Calendar, ShieldAlert } from 'lucide-react';

// Importación de componentes existentes
import DashboardHub from './components/DashboardHub';
import PlaneacionForm from './components/PlaneacionForm';
import SugerirContenidosView from './components/SugerirContenidosView';
import CrearContenidoView from './components/CrearContenidoView';
import CrearProgramaAnaliticoView from './components/CrearProgramaAnaliticoView';
import FormatoEvaluacionView from './components/FormatoEvaluacionView';
import BitacoraIncidenciaView from './components/BitacoraIncidenciaView';
import OrganizadorEscolarView from './components/OrganizadorEscolarView';

// URL base de la API (Render en producción o localhost en desarrollo)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export default function App() {
  // --- ESTADOS PRINCIPALES ---
  const [activeTab, setActiveTab] = useState<string>('hub');
  const [organizadorTab, setOrganizadorTab] = useState<string>('planes');
  const [prefilledData, setPrefilledData] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [currentPlan, setCurrentPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Perfil Docente unificado
  const [userProfile, setUserProfile] = useState<any>({
    docenteName: '',
    escuelaName: '',
    cct: '',
    email: '',
    escuelas: []
  });

  // --- EFECTOS ---
  // Cargar datos guardados del perfil y planes desde localStorage al iniciar
  useEffect(() => {
    const savedProfile = localStorage.getItem('ensenia_user_profile');
    if (savedProfile) {
      try {
        setUserProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error('Error al cargar perfil:', e);
      }
    }

    const savedPlans = localStorage.getItem('ensenia_plans');
    if (savedPlans) {
      try {
        setPlans(JSON.parse(savedPlans));
      } catch (e) {
        console.error('Error al cargar planes:', e);
      }
    }
  }, []);

  // Guardar planes automáticamente cuando cambian
  useEffect(() => {
    localStorage.setItem('ensenia_plans', JSON.stringify(plans));
  }, [plans]);

  // --- MANIPULADORES DE EVENTOS / ACCIONES ---
  const handleFormSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/generate-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const generatedPlan = await response.json();
      
      // Guardar nuevo plan
      const newPlans = [generatedPlan, ...plans];
      setPlans(newPlans);
      setCurrentPlan(generatedPlan);
      
      // Ir al organizador para ver el resultado
      setOrganizadorTab('planes');
      setActiveTab('organizador');
    } catch (error) {
      console.error('Error al generar la planeación:', error);
      alert('Hubo un detalle al conectar con el servidor. Verifica tu conexión.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePlan = (planId: string) => {
    const updatedPlans = plans.filter((p) => p.id !== planId);
    setPlans(updatedPlans);
    if (currentPlan?.id === planId) {
      setCurrentPlan(null);
    }
  };

  // --- RENDERIZADO DE VISTAS ACTIVAS ---
  const renderActiveView = () => {
    const profile = userProfile || {
      docenteName: '',
      escuelaName: '',
      cct: '',
      email: '',
      escuelas: []
    };

    switch (activeTab) {
      case 'hub':
        return (
          <DashboardHub
            onSelectFunction={(func: string, folder?: string) => {
              if (folder) {
                setOrganizadorTab(folder);
              }
              setActiveTab(func);
              setPrefilledData(null);
            }}
            docenteName={profile.docenteName}
            savedPlansCount={plans.length}
          />
        );

      case 'diseno':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm print:hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-800 text-base mb-1 tracking-tight flex items-center gap-2">
                  <FileText className="w-5 h-5 text-rose-700" />
                  <span>Diseñar Nuevo Proyecto Didáctico</span>
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Completa los datos para generar tu proyecto con IA alineado a la NEM.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveTab('hub');
                  setPrefilledData(null);
                }}
                className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition self-start sm:self-center shrink-0"
              >
                Volver al Panel
              </button>
            </div>

            <PlaneacionForm
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
              initialData={{
                ...prefilledData,
                // Precarga de información del docente garantizada
                docenteName: prefilledData?.docenteName || profile.docenteName,
                escuelaName: prefilledData?.escuelaName || profile.escuelaName,
                cct: prefilledData?.cct || profile.cct,
              }}
              onBackToHub={() => {
                setActiveTab('hub');
                setPrefilledData(null);
              }}
            />
          </div>
        );

      case 'sugerir':
        return (
          <SugerirContenidosView
            onUseContent={(data: any) => {
              setPrefilledData(data);
              setActiveTab('diseno');
            }}
            onBack={() => {
              setActiveTab('hub');
            }}
          />
        );

      case 'crear':
        return (
          <CrearContenidoView
            onUseContent={(data: any) => {
              setPrefilledData(data);
              setActiveTab('diseno');
            }}
            onBack={() => {
              setActiveTab('hub');
            }}
          />
        );

      case 'programa':
        return (
          <CrearProgramaAnaliticoView
            onUseContent={(data: any) => {
              setPrefilledData(data);
              setActiveTab('diseno');
            }}
            onBack={() => {
              setActiveTab('hub');
            }}
            escuelaName={profile.escuelaName}
            cct={profile.cct}
            docenteName={profile.docenteName}
          />
        );

      case 'evaluacion':
        return (
          <FormatoEvaluacionView
            onBack={() => {
              setActiveTab('hub');
            }}
            escuelaName={profile.escuelaName}
            cct={profile.cct}
            docenteName={profile.docenteName}
          />
        );

      case 'bitacora':
        return (
          <BitacoraIncidenciaView
            onBack={() => {
              setActiveTab('hub');
            }}
            escuelaName={profile.escuelaName}
            cct={profile.cct}
            docenteName={profile.docenteName}
            escuelas={profile.escuelas}
          />
        );

      case 'organizador':
        return (
          <OrganizadorEscolarView
            initialTab={organizadorTab}
            plans={plans}
            onSelectPlan={(plan: any) => {
              setCurrentPlan(plan);
            }}
            onDeletePlan={handleDeletePlan}
            onBack={() => {
              setActiveTab('hub');
            }}
            onGoToBitacora={() => {
              setActiveTab('bitacora');
            }}
            onGoToDiseno={() => {
              setActiveTab('diseno');
              setPrefilledData(null);
            }}
            docenteName={profile.docenteName}
            escuelaName={profile.escuelaName}
          />
        );

      default:
        return (
          <DashboardHub
            onSelectFunction={(func: string) => setActiveTab(func)}
            docenteName={profile.docenteName}
            savedPlansCount={plans.length}
          />
        );
    }
  };

  // --- ESTRUCTURA GENERAL DE LA APLICACIÓN ---
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
      {/* Barra Superior / Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            onClick={() => {
              setActiveTab('hub');
              setPrefilledData(null);
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-700 flex items-center justify-center text-white font-black shadow-md shadow-rose-700/20 group-hover:scale-105 transition">
              E
            </div>
            <div>
              <h1 className="font-bold text-slate-900 text-base leading-none tracking-tight">
                EnsenIAMX
              </h1>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                Plataforma de Asistencia Docente
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => {
                setActiveTab('hub');
                setPrefilledData(null);
              }}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
                activeTab === 'hub'
                  ? 'bg-rose-50 text-rose-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden md:inline">Panel</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('diseno');
                setPrefilledData(null);
              }}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
                activeTab === 'diseno'
                  ? 'bg-rose-50 text-rose-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden md:inline">Crear Proyecto</span>
            </button>

            <button
              onClick={() => setActiveTab('organizador')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
                activeTab === 'organizador'
                  ? 'bg-rose-50 text-rose-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden md:inline">Mis Proyectos</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderActiveView()}
      </main>

      {/* Pie de Página */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400 print:hidden">
        EnsenIAMX &copy; {new Date().getFullYear()} — Diseñado para docentes de Educación Básica.
      </footer>
    </div>
  );
}