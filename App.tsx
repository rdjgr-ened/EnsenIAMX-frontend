import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { LoginScreen } from './components/LoginScreen';
import MainLayout from './components/MainLayout';
import { User } from '@supabase/supabase-js';

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cargando, setCargando] = useState(true);

  // Función para sincronizar la sesión manualmente
  const verificarSesion = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        console.log("✅ Sesión detectada en App.tsx:", session.user);
        setUser(session.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Error al obtener sesión:", err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    verificarSesion();

    // Listener para cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("🔄 Evento de Auth en App.tsx:", event, session?.user);
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
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
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Cargando EnseñIA MX...</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario en el estado, mostramos el Login
  if (!user) {
    return (
      <LoginScreen 
        onLoginSuccess={(usuarioDetectado) => {
          console.log("Login exitoso capturado en App.tsx:", usuarioDetectado);
          if (usuarioDetectado) {
            setUser(usuarioDetectado);
          } else {
            // Si por alguna razón el objeto no viene, forzamos la verificación con Supabase
            verificarSesion();
          }
        }} 
      />
    );
  }

  // Si hay usuario, entra al MainLayout directamente
  return <MainLayout user={user} />;
};

export default App;