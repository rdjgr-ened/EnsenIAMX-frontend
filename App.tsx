import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { LoginScreen } from './components/LoginScreen';
import MainLayout from './components/MainLayout';
import { User } from '@supabase/supabase-js';

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // 1. Obtener la sesión almacenada en localStorage
    const recuperarSesion = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error al obtener la sesión:", error);
        }
        setUser(session?.user ?? null);
      } catch (err) {
        console.error("Excepción al recuperar sesión:", err);
      } finally {
        setCargando(false);
      }
    };

    recuperarSesion();

    // 2. Suscribirse a cambios en el estado de autenticación (Login, Logout, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
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
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2A3E54] mx-auto mb-3"></div>
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Accediendo a EnseñIA MX...</p>
        </div>
      </div>
    );
  }

  // Muestra Login si no hay usuario activo
  if (!user) {
    return (
      <LoginScreen 
        onLoginSuccess={(usuario) => {
          if (usuario) {
            setUser(usuario);
          }
        }} 
      />
    );
  }

  // Renderiza la aplicación cuando el usuario existe
  return <MainLayout user={user} />;
};

export default App;