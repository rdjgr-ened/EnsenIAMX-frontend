import React, { useState } from 'react';
import { iniciarSesion, recuperarPassword } from '../services/authService';

const LOGO_IMG = "https://i.imgur.com/tv95RC0.png";

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMensaje(null);
    setCargando(true);

    try {
      await iniciarSesion(email, password);
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setCargando(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Por favor, ingresa tu correo electrónico para recuperar la contraseña.');
      return;
    }

    setError(null);
    setMensaje(null);
    setCargando(true);

    try {
      await recuperarPassword(email);
      setMensaje('Se ha enviado un enlace de recuperación a tu correo electrónico.');
    } catch (err: any) {
      setError(err.message || 'Error al enviar el correo de recuperación.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#2A3E54] text-white p-6 text-center">
          <img src={LOGO_IMG} alt="EnseñIA MX Logo" className="w-20 h-20 mx-auto mb-2" />
          <h1 className="text-2xl font-bold">EnseñIA MX</h1>
          <p className="text-xs tracking-wider text-slate-300">ASISTENTE INTEGRAL DOCENTE</p>
        </div>

        {/* Formulario */}
        <div className="p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-bold text-slate-800 tracking-wide">ACCESO DOCENTE</h2>
            <p className="text-xs text-slate-500 mt-1">
              Ingresa tu correo institucional o personal y contraseña para cargar tu planeador didáctico.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded border border-red-200">
              {error}
            </div>
          )}

          {mensaje && (
            <div className="bg-green-50 text-green-700 text-xs p-3 rounded border border-green-200">
              {mensaje}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                CORREO ELECTRÓNICO (GMAIL)
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rdjgr.ened@gmail.com"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-slate-50"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">
                  CONTRASEÑA
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-[11px] font-bold text-[#2A3E54] hover:underline"
                >
                  ¿OLVIDASTE TU CONTRASEÑA?
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-slate-50"
              />
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-[#0F172A] text-white py-3 rounded-md font-bold text-sm hover:bg-slate-800 transition-colors uppercase tracking-wider mt-4"
            >
              {cargando ? 'CARGANDO...' : 'INGRESAR AL SISTEMA'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginScreen;