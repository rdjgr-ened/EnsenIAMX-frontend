import React, { useState } from 'react';
import { iniciarSesion, registrarUsuario } from '../services/authService';

const LOGO_IMG = "https://i.imgur.com/tv95RC0.png";

interface UserProfile {
  docenteName: string;
  escuelaName: string;
  cct: string;
  email: string;
  escuelas?: Array<{ escuelaName: string; cct: string }>;
}

interface LoginScreenProps {
  onLogin: (profile: UserProfile) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [esRegistro, setEsRegistro] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [docenteName, setDocenteName] = useState('');
  const [escuelaName, setEscuelaName] = useState('');
  const [cct, setCct] = useState('');
  
  const [cargando, setCargando] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setCargando(true);

    try {
      if (esRegistro) {
        // Registro en Supabase Auth
        const data = await registrarUsuario(email, password, {
          docenteName,
          escuelaName,
          cct
        });

        if (data.user) {
          onLogin({
            email,
            docenteName: docenteName || email.split('@')[0],
            escuelaName: escuelaName || 'Escuela Secundaria',
            cct: cct || 'CCT-000000',
          });
        }
      } else {
        // Login en Supabase Auth
        const data = await iniciarSesion(email, password);

        if (data.user) {
          const metadata = data.user.user_metadata || {};
          onLogin({
            email: data.user.email || email,
            docenteName: metadata.docenteName || email.split('@')[0],
            escuelaName: metadata.escuelaName || 'Escuela Secundaria',
            cct: metadata.cct || 'CCT-000000',
          });
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error de autenticación. Verifica tus datos.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        {/* Encabezado */}
        <div className="bg-[#2c3e50] text-white p-6 text-center relative overflow-hidden">
          <div className="w-16 h-16 bg-white rounded-xl mx-auto mb-3 p-1 flex items-center justify-center shadow">
            <img src={LOGO_IMG} alt="EnseñIA MX Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-xl font-bold tracking-wide">EnseñIA MX</h2>
          <p className="text-xs text-slate-300 font-medium">ASISTENTE INTEGRAL DOCENTE</p>
        </div>

        {/* Formulario */}
        <div className="p-8">
          <h3 className="text-center text-sm font-extrabold text-slate-800 tracking-wider uppercase mb-1">
            {esRegistro ? 'CREAR CUENTA DOCENTE' : 'ACCESO DOCENTE'}
          </h3>
          <p className="text-center text-xs text-slate-500 mb-6">
            {esRegistro 
              ? 'Registra tus datos institucionales para comenzar a planear.' 
              : 'Ingresa tu correo institucional o personal y contraseña para cargar tu planeador didáctico.'}
          </p>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs text-center font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                CORREO ELECTRÓNICO
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="docente@escuela.edu.mx"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-mex-maroon focus:bg-white outline-none transition"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                CONTRASEÑA
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-mex-maroon focus:bg-white outline-none transition"
              />
            </div>

            {/* Campos adicionales sólo al registrarse */}
            {esRegistro && (
              <>
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                    NOMBRE COMPLETO DEL DOCENTE
                  </label>
                  <input
                    type="text"
                    required
                    value={docenteName}
                    onChange={(e) => setDocenteName(e.target.value)}
                    placeholder="Prof. Juan Pérez"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-mex-maroon focus:bg-white outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                      ESCUELA
                    </label>
                    <input
                      type="text"
                      value={escuelaName}
                      onChange={(e) => setEscuelaName(e.target.value)}
                      placeholder="Secundaria No. 1"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-mex-maroon focus:bg-white outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                      CCT
                    </label>
                    <input
                      type="text"
                      value={cct}
                      onChange={(e) => setCct(e.target.value)}
                      placeholder="05DES0001A"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-mex-maroon focus:bg-white outline-none transition"
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={cargando}
              className="w-full py-3 bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-xs rounded-lg uppercase tracking-wider transition shadow-md disabled:opacity-50 mt-2"
            >
              {cargando ? 'Procesando...' : esRegistro ? 'REGISTRAR CUENTA' : 'INGRESAR AL SISTEMA'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setEsRegistro(!esRegistro);
                setErrorMsg('');
              }}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 uppercase tracking-wider transition"
            >
              {esRegistro ? '← Volver al Inicio de Sesión' : '+ CREAR NUEVA CUENTA DOCENTE'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}