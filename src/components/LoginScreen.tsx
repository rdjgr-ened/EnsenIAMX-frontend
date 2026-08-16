import React, { useState } from "react";
import { ShieldCheck, User, School, Key, FileSpreadsheet, Sparkles, ArrowLeft, Mail, PlusCircle, HelpCircle, Trash2, Plus, Minus } from "lucide-react";
import { upsertProfile, isSupabaseConfigured } from "../utils/supabaseClient";
const logoImg = "https://i.imgur.com/tv95RC0.png";

interface LoginScreenProps {
  onLogin?: (profile: {
    docenteName: string;
    escuelaName: string;
    cct: string;
    email: string;
    escuelas?: Array<{ escuelaName: string; cct: string }>;
  }) => void;
  initialMode?: "login" | "register" | "recover" | "reset-password";
  onBackToLanding?: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToTerms?: () => void;
}

const DEFAULT_USER = {
  email: "rdjgr.ened@gmail.com",
  password: "password123",
  docenteName: "René Gaytán",
  escuelaName: "Esc. Sec. Gral. #3 'Jaime Torres Bodet'",
  cct: "10DES0021J",
  escuelas: [
    { escuelaName: "Esc. Sec. Gral. #3 'Jaime Torres Bodet'", cct: "10DES0021J" }
  ]
};

export default function LoginScreen(props: LoginScreenProps) {
  const safeOnLogin = props.onLogin || (() => {});
  // Navigation states: 'login' | 'register' | 'recover' | 'reset-password'
  const [mode, setMode] = useState<"login" | "register" | "recover" | "reset-password">(props.initialMode || "login");

  // Sync mode if initialMode prop changes
  React.useEffect(() => {
    if (props.initialMode) {
      setMode(props.initialMode);
    }
  }, [props.initialMode]);

  // Load registered users from localStorage (pre-seed with default user if empty)
  const getUsersList = (): any[] => {
    const saved = localStorage.getItem("nem_secundaria_registered_users");
    if (!saved) {
      const initialList = [DEFAULT_USER];
      localStorage.setItem("nem_secundaria_registered_users", JSON.stringify(initialList));
      return initialList;
    }
    try {
      return JSON.parse(saved);
    } catch (e) {
      return [DEFAULT_USER];
    }
  };

  const saveUsersList = (users: any[]) => {
    localStorage.setItem("nem_secundaria_registered_users", JSON.stringify(users));
  };

  // Login inputs
  const [loginEmail, setLoginEmail] = useState(() => {
    return localStorage.getItem("nem_secundaria_email") || "rdjgr.ened@gmail.com";
  });
  const [loginPassword, setLoginPassword] = useState("password123");

  // Registration inputs
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regDocenteName, setRegDocenteName] = useState("");
  const [regSchools, setRegSchools] = useState<Array<{ escuelaName: string; cct: string }>>([
    { escuelaName: "", cct: "" }
  ]);

  // Recovery inputs
  const [recoverEmail, setRecoverEmail] = useState("");
  const [targetResetUserEmail, setTargetResetUserEmail] = useState("");
  const [resetNewPassword, setResetNewPassword] = useState("");

  // Feedback states
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const resetMessages = () => {
    setError(null);
    setSuccess(null);
  };

  // Handle Login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setError("Por favor, ingresa tu correo y contraseña.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const users = getUsersList();
      const matchedUser = users.find(
        (u) => u.email.toLowerCase() === loginEmail.toLowerCase().trim() && u.password === loginPassword
      );

      if (matchedUser) {
        // Persist email and current profile state
        localStorage.setItem("nem_secundaria_email", matchedUser.email);
        localStorage.setItem("nem_secundaria_docenteName", matchedUser.docenteName);
        localStorage.setItem("nem_secundaria_escuelaName", matchedUser.escuelaName);
        localStorage.setItem("nem_secundaria_cct", matchedUser.cct);

        const profileObj = {
          docenteName: matchedUser.docenteName,
          escuelaName: matchedUser.escuelaName,
          cct: matchedUser.cct,
          email: matchedUser.email,
          escuelas: matchedUser.escuelas || [
            { escuelaName: matchedUser.escuelaName, cct: matchedUser.cct }
          ]
        };

        localStorage.setItem("nem_secundaria_profile", JSON.stringify(profileObj));

        if (isSupabaseConfigured) {
          const userId = `user_${profileObj.email.replace(/[^a-zA-Z0-9]/g, '_')}`;
          upsertProfile({
            id: userId,
            email: profileObj.email,
            docente_nombre: profileObj.docenteName,
            escuela_nombre: profileObj.escuelaName,
            cct: profileObj.cct
          }).catch(err => console.warn("Error sincronizando perfil con Supabase:", err));
        }

        safeOnLogin(profileObj);
      } else {
        setError("Usuario o contraseña incorrectos. Por favor, verifica tus datos o crea una cuenta.");
      }
      setIsProcessing(false);
    }, 700);
  };

  // Handle Register submission
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    // Validation
    const hasEmptySchool = regSchools.some(s => !s.escuelaName.trim() || !s.cct.trim());
    if (!regEmail.trim() || !regPassword.trim() || !regDocenteName.trim() || regSchools.length === 0 || hasEmptySchool) {
      setError("Todos los campos de correo, contraseña, nombre de docente y datos de escuela(s) son obligatorios.");
      return;
    }

    // Gmail requirement check
    const emailLower = regEmail.toLowerCase().trim();
    if (!emailLower.endsWith("@gmail.com")) {
      setError("Se requiere una cuenta de correo válida de G-mail (@gmail.com).");
      return;
    }

    const users = getUsersList();
    const existingUser = users.find((u) => u.email.toLowerCase() === emailLower);
    if (existingUser) {
      setError("Este correo electrónico ya está registrado. Por favor inicia sesión o recupera tu contraseña.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const parsedSchools = regSchools.map(s => ({
        escuelaName: s.escuelaName.trim(),
        cct: s.cct.trim().toUpperCase()
      }));

      const newUser = {
        email: emailLower,
        password: regPassword,
        docenteName: regDocenteName.trim(),
        escuelaName: parsedSchools[0].escuelaName,
        cct: parsedSchools[0].cct,
        escuelas: parsedSchools
      };

      const updatedUsers = [...users, newUser];
      saveUsersList(updatedUsers);

      if (isSupabaseConfigured) {
        const userId = `user_${newUser.email.replace(/[^a-zA-Z0-9]/g, '_')}`;
        upsertProfile({
          id: userId,
          email: newUser.email,
          docente_nombre: newUser.docenteName,
          escuela_nombre: newUser.escuelaName,
          cct: newUser.cct,
          plan: 'gratuito',
          creditos_disponibles: 3
        }).catch(err => console.warn("Error guardando nuevo perfil en Supabase:", err));
      }

      setSuccess("¡Usuario creado con éxito! Ahora puedes iniciar sesión con tu correo y contraseña.");
      setLoginEmail(newUser.email);
      setLoginPassword(newUser.password);
      
      // Clear registration inputs
      setRegEmail("");
      setRegPassword("");
      setRegDocenteName("");
      setRegSchools([{ escuelaName: "", cct: "" }]);

      setMode("login");
      setIsProcessing(false);
    }, 1000);
  };

  // Handle Recovery submission
  const handleRecoverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    const emailLower = recoverEmail.toLowerCase().trim();
    if (!emailLower) {
      setError("Ingresa el correo electrónico para la recuperación.");
      return;
    }

    const users = getUsersList();
    const existingUser = users.find((u) => u.email.toLowerCase() === emailLower);

    if (!existingUser) {
      setError("El correo electrónico no se encuentra registrado.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setTargetResetUserEmail(existingUser.email);
      setSuccess(`📧 Enlace de recuperación enviado con éxito a ${existingUser.email}. Haz clic en el botón de abajo para simular la recepción del correo y establecer tu nueva contraseña.`);
      setIsProcessing(false);
    }, 900);
  };

  // Handle actual password reset
  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (!resetNewPassword.trim()) {
      setError("Por favor, ingresa una nueva contraseña.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const users = getUsersList();
      const updatedUsers = users.map((u) => {
        if (u.email.toLowerCase() === targetResetUserEmail.toLowerCase()) {
          return { ...u, password: resetNewPassword };
        }
        return u;
      });

      saveUsersList(updatedUsers);
      setSuccess("¡Contraseña restablecida con éxito! Ya puedes iniciar sesión con tu nueva contraseña.");
      setLoginEmail(targetResetUserEmail);
      setLoginPassword(resetNewPassword);
      setResetNewPassword("");
      setTargetResetUserEmail("");
      setMode("login");
      setIsProcessing(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 sm:p-6 select-none relative overflow-hidden font-sans">
      {/* Dynamic Geometric Accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-mex-maroon/5 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-mex-gold/5 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-xl bg-white rounded border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(106,27,49,0.15)] overflow-hidden relative z-10 transition duration-300 hover:shadow-[10px_10px_0px_0px_rgba(106,27,49,0.18)]">
        
        {/* Top Institutional Header */}
        <div className="bg-mex-maroon text-white p-6 relative border-b-2 border-slate-900 flex items-center justify-between overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-lg -mr-8 -mt-8 pointer-events-none rotate-45" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center p-1 border-2 border-mex-gold shadow-lg overflow-hidden shrink-0">
              <img
                src={logoImg}
                alt="EnseñIA MX Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide leading-none mb-1">EnseñIA MX</h1>
              <span className="text-[10px] font-black tracking-widest text-mex-gold uppercase block">Asistente Integral Docente</span>
            </div>
          </div>

          {props.onBackToLanding && (
            <button
              type="button"
              onClick={props.onBackToLanding}
              className="relative z-10 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-[11px] font-bold text-white transition flex items-center gap-1.5 cursor-pointer"
              title="Volver a la página principal"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Página Principal</span>
            </button>
          )}
        </div>

        {/* Global Feedback Banner */}
        {error && (
          <div className="bg-slate-50 border-b border-slate-200 text-slate-800 px-6 py-3.5 text-xs font-semibold flex items-start gap-2.5">
            <span className="text-sm">⚠️</span>
            <div>{error}</div>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-950 px-6 py-4 text-xs font-semibold flex items-start gap-2.5 leading-relaxed">
            <span className="text-sm">📬</span>
            <div>{success}</div>
          </div>
        )}

        {/* MODE: LOGIN */}
        {mode === "login" && (
          <form onSubmit={handleLoginSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-1.5 pb-2">
              <h2 className="text-base font-black text-slate-900 uppercase tracking-wide">Acceso Docente</h2>
              <p className="text-slate-500 text-xs">
                Ingresa tu correo institucional o personal y contraseña para cargar tu planeador didáctico.
              </p>
            </div>

            <div className="space-y-4">
              {/* Usuario / Correo */}
              <div>
                <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Correo Electrónico (Gmail)</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="correo@gmail.com"
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-xs font-semibold transition outline-none"
                    required
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-slate-500 font-bold text-[10px] uppercase">Contraseña</label>
                  <button
                    type="button"
                    onClick={() => {
                      resetMessages();
                      setMode("recover");
                    }}
                    className="text-mex-maroon hover:text-black text-[10px] font-black uppercase tracking-wide transition outline-none"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="relative">
                  <Key className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Contraseña"
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-xs font-semibold transition outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 px-6 rounded bg-slate-900 hover:bg-black text-white font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition active:scale-[0.99] disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-mex-gold" />
                    <span>Iniciando Sesión...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-mex-gold" />
                    <span>Ingresar al Sistema</span>
                  </>
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    resetMessages();
                    setMode("register");
                  }}
                  className="inline-flex items-center gap-1.5 text-mex-maroon hover:text-black font-extrabold text-xs uppercase tracking-wider py-2 transition"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Crear nueva cuenta docente</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* MODE: REGISTER / CREAR USUARIO */}
        {mode === "register" && (
          <form onSubmit={handleRegisterSubmit} className="p-6 sm:p-8 space-y-5">
            <div className="text-center space-y-1.5 pb-1">
              <h2 className="text-base font-black text-slate-900 uppercase tracking-wide">Crear Cuenta Docente</h2>
              <p className="text-slate-500 text-xs">
                Registra tu perfil en el sistema. Los datos del plantel se vincularán automáticamente a tus planeaciones didácticas.
              </p>
            </div>

            <div className="space-y-4">
              {/* Email & Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Correo de G-mail (@gmail.com)</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="usuario@gmail.com"
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-xs font-semibold transition outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Definir Contraseña</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-xs font-semibold transition outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-dashed border-slate-200 my-2 pt-2" />

              <div className="text-left space-y-1">
                <span className="text-[10px] font-black text-mex-maroon uppercase tracking-wider block">Perfil Profesional Docente</span>
                <p className="text-slate-400 text-[10px] leading-relaxed">
                  Esta información de identificación es obligatoria y aparecerá en las firmas de los formatos de planeación oficiales.
                </p>
              </div>

              {/* Docente Name */}
              <div>
                <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Nombre Completo del Docente</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={regDocenteName}
                    onChange={(e) => setRegDocenteName(e.target.value)}
                    placeholder="Ej. René Gaytán"
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-xs font-semibold transition outline-none"
                    required
                  />
                </div>
              </div>

              {/* List of Schools */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-black text-mex-maroon uppercase tracking-wider block">Planteles / Escuelas Asociadas</span>
                  <button
                    type="button"
                    onClick={() => setRegSchools([...regSchools, { escuelaName: "", cct: "" }])}
                    className="inline-flex items-center gap-1 text-mex-maroon hover:text-black font-extrabold text-[10px] uppercase tracking-wider transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar Plantel</span>
                  </button>
                </div>

                {regSchools.map((school, index) => (
                  <div key={index} className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg space-y-3 relative">
                    {regSchools.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = regSchools.filter((_, i) => i !== index);
                          setRegSchools(updated);
                        }}
                        className="absolute top-2 right-2 text-slate-400 hover:text-red-600 transition"
                        title="Eliminar plantel"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-500 font-bold text-[9px] uppercase mb-1">Nombre de la Escuela {index + 1}</label>
                        <div className="relative">
                          <School className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                          <input
                            type="text"
                            value={school.escuelaName}
                            onChange={(e) => {
                              const updated = [...regSchools];
                              updated[index].escuelaName = e.target.value;
                              setRegSchools(updated);
                            }}
                            placeholder="Ej. Esc. Sec. Gral. #3"
                            className="w-full pl-8 pr-4 py-1.5 bg-white border border-slate-200 focus:border-mex-maroon focus:ring-1 focus:ring-mex-maroon/20 rounded text-slate-800 text-xs font-semibold transition outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-500 font-bold text-[9px] uppercase mb-1">CCT de la Escuela {index + 1}</label>
                        <div className="relative">
                          <FileSpreadsheet className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                          <input
                            type="text"
                            value={school.cct}
                            onChange={(e) => {
                              const updated = [...regSchools];
                              updated[index].cct = e.target.value;
                              setRegSchools(updated);
                            }}
                            placeholder="Ej. 10DES0021J"
                            className="w-full pl-8 pr-4 py-1.5 bg-white border border-slate-200 focus:border-mex-maroon focus:ring-1 focus:ring-mex-maroon/20 rounded text-slate-800 text-xs font-semibold transition outline-none uppercase"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 px-6 rounded bg-mex-maroon hover:bg-mex-maroon/90 text-white font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition active:scale-[0.99] disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-mex-gold" />
                    <span>Creando Usuario Docente...</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4 text-mex-gold" />
                    <span>Registrar Cuenta y Perfil</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  resetMessages();
                  setMode("login");
                }}
                className="w-full py-2 px-6 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver al Acceso</span>
              </button>
            </div>
          </form>
        )}

        {/* MODE: RECOVER / RECUPERAR CONTRASEÑA */}
        {mode === "recover" && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-1.5 pb-2">
              <h2 className="text-base font-black text-slate-900 uppercase tracking-wide">Recuperar Contraseña</h2>
              <p className="text-slate-500 text-xs">
                Ingresa tu correo de G-mail registrado. Te enviaremos una notificación para reestablecer tu contraseña escolar.
              </p>
            </div>

            <form onSubmit={handleRecoverSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Correo Electrónico Registrado (Gmail)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={recoverEmail}
                    onChange={(e) => setRecoverEmail(e.target.value)}
                    placeholder="usuario@gmail.com"
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-xs font-semibold transition outline-none"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 px-6 rounded bg-slate-900 hover:bg-black text-white font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-md transition active:scale-[0.99] disabled:opacity-75"
                >
                  {isProcessing ? (
                    <span>Buscando Usuario...</span>
                  ) : (
                    <span>Enviar Correo de Recuperación</span>
                  )}
                </button>
              </div>
            </form>

            {/* Simulated Gmail Inbox Notification Link */}
            {targetResetUserEmail && (
              <div className="mt-4 p-5 bg-[#fefce8] border-2 border-[#ca8a04] rounded-lg shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-[#ca8a04] font-black text-xs uppercase tracking-wider">
                  <Mail className="w-4 h-4" />
                  <span>Simulador de Correo Recibido</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-700">
                  Has recibido un correo en <strong className="text-slate-900">{targetResetUserEmail}</strong> con el enlace seguro para reestablecer tu contraseña.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    resetMessages();
                    setMode("reset-password");
                  }}
                  className="w-full py-2.5 px-4 bg-[#ca8a04] hover:bg-yellow-700 text-white font-black text-xs uppercase tracking-widest rounded transition flex items-center justify-center gap-2"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Abrir enlace para Restablecer</span>
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                resetMessages();
                setTargetResetUserEmail("");
                setMode("login");
              }}
              className="w-full py-2 px-6 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver al Acceso</span>
            </button>
          </div>
        )}

        {/* MODE: RESET PASSWORD */}
        {mode === "reset-password" && (
          <form onSubmit={handleResetPasswordSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-1.5 pb-2">
              <h2 className="text-base font-black text-slate-900 uppercase tracking-wide">Establecer Nueva Contraseña</h2>
              <p className="text-slate-500 text-xs">
                Crea una nueva contraseña de acceso seguro para tu perfil docente vinculado a: <span className="font-extrabold text-mex-maroon">{targetResetUserEmail}</span>
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Nueva Contraseña</label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={resetNewPassword}
                    onChange={(e) => setResetNewPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 focus:border-mex-maroon focus:ring-2 focus:ring-mex-maroon/20 focus:bg-white rounded text-slate-800 text-xs font-semibold transition outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 px-6 rounded bg-mex-maroon hover:bg-mex-maroon/90 text-white font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-md transition active:scale-[0.99] disabled:opacity-75"
              >
                {isProcessing ? (
                  <span>Guardando Contraseña...</span>
                ) : (
                  <span>Actualizar Contraseña e Ingresar</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  resetMessages();
                  setTargetResetUserEmail("");
                  setMode("login");
                }}
                className="w-full py-2 px-6 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Cancelar</span>
              </button>
            </div>
          </form>
        )}


      </div>

      {/* Footer legal links */}
      <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-500">
        <a 
          href="/politica-de-privacidad" 
          onClick={(e) => {
            if (props.onNavigateToPrivacy) {
              e.preventDefault();
              props.onNavigateToPrivacy();
            }
          }}
          className="hover:text-mex-maroon font-medium transition cursor-pointer underline underline-offset-2"
        >
          Aviso de Privacidad
        </a>
        <span>•</span>
        <a 
          href="/terminos-y-condiciones" 
          onClick={(e) => {
            if (props.onNavigateToTerms) {
              e.preventDefault();
              props.onNavigateToTerms();
            }
          }}
          className="hover:text-mex-maroon font-medium transition cursor-pointer underline underline-offset-2"
        >
          Términos y Condiciones
        </a>
      </div>
    </div>
  );
}
