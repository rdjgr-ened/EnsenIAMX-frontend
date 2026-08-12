import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { LoginScreen } from './components/LoginScreen';
import MainLayout from './components/MainLayout';
import { User } from '@supabase/supabase-js';

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // 1. Verificar si ya existe una sesión activa al cargar la app
    const inicializarSesion = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Error al obtener la sesión de Supabase:", error);
      } finally {
        setCargando(false);
      }
    };

    inicializarSesion();

    // 2. Suscribirse a cambios en la autenticación (Login / Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("🔄 Evento Auth detectado:", event);
      setUser(session?.user ?? null);
      setCargando(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2A3E54] mx-auto mb-4"></div>
          <p className="text-sm font-bold text-slate-600 uppercase tracking-wider">Cargando sistema...</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario autenticado, renderiza el Login
  if (!user) {
    return <LoginScreen onLoginSuccess={() => setCargando(true)} />;
  }

  // Si hay usuario autenticado, renderiza el Dashboard principal
  return <MainLayout user={user} />;
};

export default App;