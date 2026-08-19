import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { LoginScreen } from './components/LoginScreen';
import MainLayout from './components/MainLayout';
import { User } from '@supabase/supabase-js';

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cargando, setCargando] = useState(true);

  // Función para obtener al usuario del storage de Supabase o directo de la API
  const comprobarUsuario = async () => {
    try {
      // 1. Preguntar a Supabase si hay sesión activa
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        return;
      }

      // 2. Si getSession falla, leer directamente el localStorage como respaldo de emergencia
      const keys = Object.keys(localStorage);
      const sbKey = keys.find(k => k.startsWith('sb-') && k.endsWith('-auth-token'));
      if (sbKey) {
        const item = localStorage.getItem(sbKey);
        if (item) {
          const parsed = JSON.parse(item);
          if (parsed?.user) {
            setUser(parsed.user);
            return;
          }
        }
      }

      setUser(null);
    } catch (e) {
      console.error("Error comprobando sesión:", e);
      setUser(null);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    comprobarUsuario();

    // Listener de cambios de Auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
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

  // Si no se detecta usuario, mostramos el login
  if (!user) {
    return (
      <LoginScreen 
        onLoginSuccess={(usuarioDetectado) => {
          if (usuarioDetectado) {
            setUser(usuarioDetectado);
          }
          // Recargamos la ventana para asegurar la lectura global de la app
          window.location.reload();
        }} 
      />
    );
  }

  // Si hay usuario, renderiza el Dashboard principal
  return <MainLayout user={user} />;
};

export default App;