import React, { useState } from 'react';
import { 
  iniciarSesion, 
  registrarUsuario, 
  recuperarPassword 
} from '../services/authService';
import { 
  Mail, 
  KeyRound, 
  User, 
  Building2, 
  Plus, 
  Trash2, 
  UserPlus, 
  LogIn, 
  HelpCircle, 
  ArrowLeft 
} from 'lucide-react';

const LOGO_IMG = "https://i.imgur.com/tv95RC0.png";

interface Escuela {
  nombre: string;
  cct: string;
}

interface LoginScreenProps {
  onLoginSuccess?: (user?: any) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [esRegistro, setEsRegistro] = useState(false);
  
  // Campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombreDocente, setNombreDocente] = useState('');
  const [escuelas, setEscuelas] = useState<Escuela[]>([{ nombre: '', cct: '' }]);

  // Estados de control
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const handleAgregarEscuela = () => {
    setEscuelas([...escuelas, { nombre: '', cct: '' }]);
  };

  const handleRemoverEscuela = (index: number) => {
    if (escuelas.length > 1) {
      setEscuelas(escuelas.filter((_, i) => i !== index));
    }
  };

  const handleEscuelaChange = (index: number, field: 'nombre' | 'cct', value: string) => {
    const nuevasEscuelas = [...escuelas];
    nuevasEscuelas[index][field] = value;
    setEscuelas(nuevasEscuelas);
  };

  const ejecutarAccion = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    console.log("🚀 EJECUTANDO ACCION DE AUTENTICACION");

    if (!email || !password) {
      setError('Por favor, ingresa correo y contraseña.');
      return;
    }

    if (esRegistro && !nombreDocente) {
      setError('Por favor, ingresa tu nombre completo.');
      return;
    }

    setError(null);
    setMensaje(null);
    setCargando(true);

    try {
      if (esRegistro) {
        const escuelasFiltradas = escuelas.filter(
          esc => esc.nombre.trim() !== '' || esc.cct.trim() !== ''
        );

        console.log("Enviando registro a Supabase...");
        const res = await registrarUsuario(email, password, {
          nombreDocente,
          escuelas: escuelasFiltradas
        });

        console.log("Respuesta de Supabase:", res);

        const usuario = res?.session?.user || res?.user;
        if (usuario) {
          if (onLoginSuccess) onLoginSuccess(usuario);
          setTimeout(() => { window.location.reload(); }, 100);
        } else {
          setMensaje('Registro completado. Por favor, inicia sesión con tus credenciales.');
          setEsRegistro(false);
        }
      } else {
        console.log("Enviando inicio de sesión a Supabase...");
        const res = await iniciarSesion(email, password);
        console.log("Inicio de sesión exitoso:", res);
        
        const usuario = res?.session?.user || res?.user;

        if (usuario) {
          if (onLoginSuccess) {
            onLoginSuccess(usuario);
          }
          // Red de seguridad: garantiza la recarga y lectura de localStorage
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }
      }
    } catch (err: any) {
      console.error("❌ ERROR DE AUTENTICACION:", err);
      if (err.message?.includes("Invalid login credentials")) {
        setError("Correo electrónico o contraseña incorrectos.");
      } else {
        setError(err.message || 'Ocurrió un error al procesar la solicitud');
      }
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
      <div className={`w-full ${esRegistro ? 'max-w-2xl' : 'max-w-md'} bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300`}>
        {/* Header con Logo Original */}
        <div className="bg-[#2A3E54] text-white p-6 text-center">
          <img src={LOGO_IMG} alt="EnseñIA MX Logo" className="w-20 h-20 mx-auto mb-2" />
          <h1 className="text-2xl font-bold">EnseñIA MX</h1>
          <p className="text-xs tracking-wider text-slate-300 uppercase">ASISTENTE INTEGRAL DOCENTE</p>
        </div>

        {/* Formulario */}
        <div className="p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-800 tracking-wide uppercase">
              {esRegistro ? 'CREAR CUENTA DOCENTE' : 'ACCESO DOCENTE'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {esRegistro
                ? 'Registra tu perfil en el sistema. Los datos del plantel se vincularán automáticamente a tus planeaciones didácticas.'
                : 'Ingresa tu correo institucional o personal y contraseña para cargar tu planeador didáctico.'}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded border border-red-200 font-medium">
              ⚠️ {error}
            </div>
          )}

          {mensaje && (
            <div className="bg-green-50 text-green-700 text-xs p-3 rounded border border-green-200 font-medium">
              ✅ {mensaje}
            </div>
          )}

          <form onSubmit={ejecutarAccion} className="space-y-5">
            <div className={`grid grid-cols-1 ${esRegistro ? 'md:grid-cols-2' : ''} gap-4`}>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase">
                  CORREO DE G-MAIL (@GMAIL.COM)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="docente@ejemplo.com"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase">
                    {esRegistro ? 'DEFINIR CONTRASEÑA' : 'CONTRASEÑA'}
                  </label>
                  {!esRegistro && (
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-[10px] font-bold text-[#2A3E54] hover:underline flex items-center gap-1"
                    >
                      <HelpCircle className="w-3 h-3" />
                      ¿OLVIDASTE TU CONTRASEÑA?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={esRegistro ? 'Mínimo 6 caracteres' : '••••••••••'}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-slate-50/50"
                  />
                </div>
              </div>
            </div>

            {esRegistro && (
              <>
                <div className="border-t border-dashed border-slate-200 my-4 pt-4">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    PERFIL PROFESIONAL DOCENTE
                  </h3>
                  <p className="text-[11px] text-slate-500 mb-3">
                    Esta información de identificación es obligatoria y aparecerá en las firmas de los formatos de planeación oficiales.
                  </p>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase">
                      NOMBRE COMPLETO DEL DOCENTE
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={nombreDocente}
                        onChange={(e) => setNombreDocente(e.target.value)}
                        placeholder="Ej. Juan Pérez"
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-slate-50/50"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                      PLANTELES / ESCUELAS ASOCIADAS
                    </h3>
                    <button
                      type="button"
                      onClick={handleAgregarEscuela}
                      className="text-xs font-bold text-[#2A3E54] hover:underline flex items-center gap-1 uppercase"
                    >
                      <Plus className="w-3.5 h-3.5" /> AGREGAR PLANTEL
                    </button>
                  </div>

                  <div className="space-y-3">
                    {escuelas.map((escuela, index) => (
                      <div key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2 relative">
                        {escuelas.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoverEscuela(index)}
                            className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
                            title="Eliminar plantel"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 mb-1 uppercase">
                              NOMBRE DE LA ESCUELA {index + 1}
                            </label>
                            <div className="relative">
                              <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                              <input
                                type="text"
                                value={escuela.nombre}
                                onChange={(e) => handleEscuelaChange(index, 'nombre', e.target.value)}
                                placeholder="Ej. Esc. Sec. Gral. No. 1"
                                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 mb-1 uppercase">
                              CCT DE LA ESCUELA {index + 1}
                            </label>
                            <div className="relative">
                              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                              <input
                                type="text"
                                value={escuela.cct}
                                onChange={(e) => handleEscuelaChange(index, 'cct', e.target.value)}
                                placeholder="EJ. 00DPR0000X"
                                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white uppercase"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-[#2A3E54] hover:bg-[#1f2d3d] text-white py-3 rounded-md font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors mt-6 cursor-pointer disabled:opacity-50"
            >
              {cargando ? (
                'CARGANDO...'
              ) : esRegistro ? (
                <>
                  <UserPlus className="w-4 h-4" /> REGISTRAR CUENTA Y PERFIL
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" /> INGRESAR AL SISTEMA
                </>
              )}
            </button>
          </form>

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
              {esRegistro ? (
                <>
                  <ArrowLeft className="w-3.5 h-3.5" /> VOLVER AL ACCESO
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" /> CREAR NUEVA CUENTA DOCENTE
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;