import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { LoginScreen } from './components/LoginScreen';
import MainLayout from './components/MainLayout';
import { User } from '@supabase/supabase-js';

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // 1. Obtener sesión activa al cargar la aplicación por primera vez
    const comprobarSesionInicial = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error al recuperar la sesión inicial:", error);
        }
        setUser(session?.user ?? null);
      } catch (err) {
        console.error("Excepción al validar sesión:", err);
      } finally {
        setCargando(false);
      }
    };

    comprobarSesionInicial();

    // 2. Escuchador en tiempo real para eventos de autenticación (SIGNED_IN, SIGNED_OUT, INITIAL_SESSION)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("⚡ Evento de autenticación registrado:", event);
      setUser(session?.user ?? null);
      setCargando(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Pantalla de carga profesional mientras Supabase valida el almacenamiento local
  if (cargando) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-4">
        <div className="text-center bg-white p-8 rounded-lg shadow-md border border-slate-200">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2A3E54] mx-auto mb-4"></div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Cargando asistente docente...
          </p>
        </div>
      </div>
    );
  }

  // Si no hay sesión válida, muestra la pantalla de acceso
  if (!user) {
    return (
      <LoginScreen 
        onLoginSuccess={async () => {
          // Callback de respaldo: fuerza la relectura de sesión activa si la suscripción tarda milisegundos
          const { data: { session } } = await supabase.auth.getSession();
          setUser(session?.user ?? null);
        }} 
      />
    );
  }

  // Si hay usuario autenticado, renderiza el panel de control principal (MainLayout)
  return <MainLayout user={user} />;
};

export default App;