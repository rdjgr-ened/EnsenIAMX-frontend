import React, { useState } from 'react';
import { iniciarSesion, registrarUsuario, recuperarPassword } from '../services/authService';

const LOGO_IMG = "https://i.imgur.com/tv95RC0.png";

export const LoginScreen: React.FC = () => {
  const [esRegistro, setEsRegistro] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMensaje(null);
    setCargando(true);

    try {
      if (esRegistro) {
        await registrarUsuario(email, password);
        setMensaje('Cuenta creada con éxito. Revisa tu correo o inicia sesión.');
        setEsRegistro(false);
      } else {
        await iniciarSesion(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al procesar la solicitud');
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
          <p className="text-xs tracking-wider text-slate-300 uppercase">ASISTENTE INTEGRAL DOCENTE</p>
        </div>

        {/* Formulario */}
        <div className="p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-bold text-slate-800 tracking-wide uppercase">
              {esRegistro ? 'REGISTRO DE NUEVA CUENTA' : 'ACCESO DOCENTE'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {esRegistro
                ? 'Ingresa tu correo y define una contraseña para crear tu cuenta docente.'
                : 'Ingresa tu correo institucional o personal y contraseña para cargar tu planeador didáctico.'}
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

          <form onSubmit={handleSubmit} className="space-y-4">
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
                {!esRegistro && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[11px] font-bold text-[#2A3E54] hover:underline"
                  >
                    ¿OLVIDASTE TU CONTRASEÑA?
                  </button>
                )}
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
              {cargando
                ? 'CARGANDO...'
                : esRegistro
                ? 'REGISTRAR MI CUENTA'
                : 'INGRESAR AL SISTEMA'}
            </button>
          </form>

          {/* Botón de alternar entre Registro / Login */}
          <div className="pt-2 text-center border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setEsRegistro(!esRegistro);
                setError(null);
                setMensaje(null);
              }}
              className="text-xs font-bold text-[#2A3E54] hover:underline inline-flex items-center gap-1 uppercase tracking-wider"
            >
              {esRegistro ? '← VOLVER A INICIAR SESIÓN' : '⊕ CREAR NUEVA CUENTA DOCENTE'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;