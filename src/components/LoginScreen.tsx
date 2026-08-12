import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, Mail, UserCheck, AlertCircle, ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    console.log("🚀 EJECUTANDO ACCION DE AUTENTICACION");
    console.log("Datos capturados:", { email, password: "******", esRegistro: isRegister });

    try {
      if (isRegister) {
        // Registro de usuario en Supabase
        console.log("Registrando usuario en Supabase...");
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        console.log("Registro exitoso:", data);
        if (data.user && !data.session) {
          alert("Registro exitoso. Revisa tu correo electrónico para confirmar la cuenta antes de iniciar sesión.");
        } else if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        // Inicio de sesión en Supabase
        console.log("Enviando inicio de sesión a Supabase...");
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        console.log("Inicio de sesión exitoso:", data);
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      }
    } catch (error: any) {
      console.error("❌ Error durante la autenticación:", error);
      
      // Traducir mensajes de error comunes de Supabase
      if (error.message?.includes("Invalid login credentials")) {
        setErrorMessage("Correo electrónico o contraseña incorrectos.");
      } else if (error.message?.includes("Email not confirmed")) {
        setErrorMessage("Tu correo no ha sido confirmado. Revisa tu bandeja de entrada.");
      } else if (error.message?.includes("User already registered")) {
        setErrorMessage("Este correo ya está registrado en el sistema.");
      } else if (error.message?.includes("Password should be at least")) {
        setErrorMessage("La contraseña debe contener al menos 6 caracteres.");
      } else {
        setErrorMessage(error.message || "Ocurrió un error inesperado al conectar con el servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        
        {/* Cabecera */}
        <div className="bg-[#2A3E54] p-6 text-center text-white">
          <h1 className="text-2xl font-bold tracking-tight">EnsenIA MX</h1>
          <p className="text-xs text-slate-300 mt-1 uppercase tracking-wider">Plataforma Docente de Educación Básica</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="text-center mb-2">
            <h2 className="text-lg font-semibold text-slate-800">
              {isRegister ? 'Crear una cuenta' : 'Iniciar Sesión'}
            </h2>
            <p className="text-xs text-slate-500">
              {isRegister 
                ? 'Ingresa tus datos para registrarte en el sistema' 
                : 'Accede a tus secuencias y herramientas didácticas'}
            </p>
          </div>

          {/* Banner de Error */}
          {errorMessage && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded text-sm text-red-700 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Campo Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              CORREO ELECTRÓNICO
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="docente@escuela.edu.mx"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-slate-50/50"
              />
            </div>
          </div>

          {/* Campo Contraseña */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              CONTRASEÑA
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-slate-50/50"
              />
            </div>
          </div>

          {/* Botón de Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#2A3E54] hover:bg-[#1f2d3d] text-white font-medium py-2.5 px-4 rounded-md text-sm transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isRegister ? (
              <>
                <UserCheck className="w-4 h-4" />
                <span>REGISTRARSE</span>
              </>
            ) : (
              <>
                <span>INGRESAR AL SISTEMA</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Alternar entre Login / Registro */}
          <div className="text-center pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setErrorMessage(null);
              }}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              {isRegister 
                ? '¿Ya tienes una cuenta? Inicia sesión aquí' 
                : '¿No tienes cuenta? Regístrate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;