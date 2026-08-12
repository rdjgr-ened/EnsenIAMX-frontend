import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { LoginScreen } from './components/LoginScreen';
import MainLayout from './components/MainLayout';
import { User } from '@supabase/supabase-js';

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Verificar sesión al cargar la app
    const cargarSesionInicial = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          console.log("Sesión previa detectada:", session.user.email);
          setUser(session.user);
        }
      } catch (err) {
        console.error("Error al obtener sesión inicial:", err);
      } finally {
        setCargando(false);
      }
    };

    cargarSesionInicial();

    // Escuchar eventos globales de Supabase
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

  // Si NO hay usuario, muestra el Login
  if (!user) {
    return (
      <LoginScreen 
        onLoginSuccess={(usuarioAutenticado) => {
          console.log("onLoginSuccess activado. Cambiando a MainLayout...");
          if (usuarioAutenticado) {
            setUser(usuarioAutenticado);
          } else {
            // Reintento directo si no se pasó por parámetro
            supabase.auth.getUser().then(({ data }) => {
              if (data.user) setUser(data.user);
            });
          }
        }} 
      />
    );
  }

  // Si SÍ hay usuario, renderiza la app
  return <MainLayout user={user} />;
};

export default App;