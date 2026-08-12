import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { LoginScreen } from './components/LoginScreen';
import MainLayout from './components/MainLayout'; // O el nombre de tu componente principal del Dashboard
import { User } from '@supabase/supabase-js';

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // 1. Obtener la sesión actual al cargar la app
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setCargando(false);
    });

    // 2. Escuchar cambios de estado en la autenticación (Login, Logout, Registro)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setCargando(false);
    });

    return () => subscription.unsubscribe();
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

  // Si no hay usuario autenticado, muestra la pantalla de inicio de sesión
  if (!user) {
    return <LoginScreen onLoginSuccess={() => setCargando(true)} />;
  }

  // Si hay usuario autenticado, renderiza el Dashboard principal
  return <MainLayout user={user} />;
};

export default App;