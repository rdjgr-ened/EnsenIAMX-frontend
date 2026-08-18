import React, { useState } from "react";
import { ShieldCheck, User, School, Key, FileSpreadsheet, Sparkles, ArrowLeft, Mail, PlusCircle, Trash2, Plus } from "lucide-react";
import { iniciarSesion, registrarUsuario, recuperarPassword } from "../services/authService";
const logoImg = "https://i.imgur.com/tv95RC0.png";

interface LoginScreenProps {
  onLogin?: (profile: {
    docenteName: string;
    escuelaName: string;
    cct: string;
    email: string;
    escuelas?: Array<{ escuelaName: string; cct: string }>;
  }) => void;
  initialMode?: "login" | "register" | "recover";
  onBackToLanding?: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToTerms?: () => void;
}

export default function LoginScreen(props: LoginScreenProps) {
  const safeOnLogin = props.onLogin || (() => {});
  const [mode, setMode] = useState<"login" | "register" | "recover">(props.initialMode || "login");

  React.useEffect(() => {
    if (props.initialMode) {
      setMode(props.initialMode);
    }
  }, [props.initialMode]);

  // Login inputs
  const [loginEmail, setLoginEmail] = useState(() => localStorage.getItem("nem_secundaria_email") || "");
  const [loginPassword, setLoginPassword] = useState("");

  // Registration inputs
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regDocenteName, setRegDocenteName] = useState("");
  const [regSchools, setRegSchools] = useState<Array<{ escuelaName: string; cct: string }>>([
    { escuelaName: "", cct: "" }
  ]);

  // Recovery input
  const [recoverEmail, setRecoverEmail] = useState("");

  // Feedback states
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const resetMessages = () => {
    setError(null);
    setSuccess(null);
  };

  // Handle Login con Supabase Real
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setError("Por favor, ingresa tu correo y contraseña.");
      return;
    }

    setIsProcessing(true);

    try {
      const data = await iniciarSesion(loginEmail.trim(), loginPassword);
      const user = data.user;

      if (!user) throw new Error("No se pudo obtener la sesión del usuario.");

      const userMeta = user.user_metadata || {};
      const profileObj = {
        docenteName: userMeta.nombreDocente || userMeta.full_name || "Docente",
        escuelaName: userMeta.escuelas?.[0]?.escuelaName || "Escuela",
        cct: userMeta.escuelas?.[0]?.cct || "",
        email: user.email || loginEmail,
        escuelas: userMeta.escuelas || []
      };

      localStorage.setItem("nem_secundaria_email", profileObj.email);
      localStorage.setItem("nem_secundaria_profile", JSON.stringify(profileObj));

      safeOnLogin(profileObj);
    } catch (err: any) {
      console.error("Error de acceso:", err);
      setError(err.message || "Usuario o contraseña incorrectos. Verifica tus datos.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle Registro con Supabase Real
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    const hasEmptySchool = regSchools.some(s => !s.escuelaName.trim() || !s.cct.trim());
    if (!regEmail.trim() || !regPassword.trim() || !regDocenteName.trim() || regSchools.length === 0 || hasEmptySchool) {
      setError("Todos los campos de correo, contraseña, nombre de docente y escuela(s) son obligatorios.");
      return;
    }

    const emailLower = regEmail.toLowerCase().trim();
    if (!emailLower.endsWith("@gmail.com")) {
      setError("Se requiere una cuenta de correo válida de G-mail (@gmail.com).");
      return;
    }

    setIsProcessing(true);

    try {
      const parsedSchools = regSchools.map(s => ({
        escuelaName: s.escuelaName.trim(),
        cct: s.cct.trim().toUpperCase()
      }));

      const res = await registrarUsuario(emailLower, regPassword, {
        nombreDocente: regDocenteName.trim(),
        escuelas: parsedSchools
      });

      if (res?.requiresEmailConfirmation) {
        setSuccess("¡Registro iniciado! Revisa tu correo electrónico para confirmar tu cuenta antes de iniciar sesión.");
      } else {
        setSuccess("¡Cuenta creada con éxito en Supabase! Ya puedes iniciar sesión.");
        setLoginEmail(emailLower);
        setLoginPassword(regPassword);
        setMode("login");
      }

      setRegEmail("");
      setRegPassword("");
      setRegDocenteName("");
      setRegSchools([{ escuelaName: "", cct: "" }]);
    } catch (err: any) {
      console.error("Error de registro:", err);
      setError(err.message || "No se pudo completar el registro.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle Recuperación con Supabase Real
  const handleRecoverSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    const emailLower = recoverEmail.toLowerCase().trim();
    if (!emailLower) {
      setError("Ingresa el correo electrónico para la recuperación.");
      return;
    }

    setIsProcessing(true);

    try {
      await recuperarPassword(emailLower);
      setSuccess(`📧 Enlace de restablecimiento enviado a ${emailLower}. Revisa tu bandeja de entrada.`);
    } catch (err: any) {
      setError(err.message || "El correo no se encuentra registrado.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 sm:p-6 select-none relative overflow-hidden font-sans">
      <div className="w-full max-w-xl bg-white rounded border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(106,27,49,0.15)] overflow-hidden relative z-10">
        
        {/* Header */}
        <div className="bg-mex-maroon text-white p-6 relative border-b-2 border-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center p-1 border-2 border-mex-gold shadow-lg overflow-hidden shrink-0">
              <img src={logoImg} alt="EnseñIA MX Logo" className="w-full h-full object-contain" />
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
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-[11px] font-bold text-white transition flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Página Principal</span>
            </button>
          )}
        </div>

        {/* Banners de Feedback */}
        {error && (
          <div className="bg-red-50 border-b border-red-200 text-red-900 px-6 py-3.5 text-xs font-semibold flex items-start gap-2.5">
            <span>⚠️</span>
            <div>{error}</div>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-950 px-6 py-4 text-xs font-semibold flex items-start gap-2.5">
            <span>📬</span>
            <div>{success}</div>
          </div>
        )}

        {/* MODE: LOGIN */}
        {mode === "login" && (
          <form onSubmit={handleLoginSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-1.5 pb-2">
              <h2 className="text-base font-black text-slate-900 uppercase tracking-wide">Acceso Docente</h2>
              <p className="text-slate-500 text-xs">Ingresa tus credenciales para acceder al sistema.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Correo Electrónico (Gmail)</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="correo@gmail.com"
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded text-slate-800 text-xs font-semibold outline-none focus:border-mex-maroon"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-slate-500 font-bold text-[10px] uppercase">Contraseña</label>
                  <button
                    type="button"
                    onClick={() => { resetMessages(); setMode("recover"); }}
                    className="text-mex-maroon hover:text-black text-[10px] font-black uppercase"
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
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded text-slate-800 text-xs font-semibold outline-none focus:border-mex-maroon"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 px-6 rounded bg-slate-900 hover:bg-black text-white font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-mex-gold" />
                    <span>Verificando en Supabase...</span>
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
                  onClick={() => { resetMessages(); setMode("register"); }}
                  className="inline-flex items-center gap-1.5 text-mex-maroon hover:text-black font-extrabold text-xs uppercase py-2"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Crear nueva cuenta docente</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* MODE: REGISTER */}
        {mode === "register" && (
          <form onSubmit={handleRegisterSubmit} className="p-6 sm:p-8 space-y-5">
            <div className="text-center space-y-1.5 pb-1">
              <h2 className="text-base font-black text-slate-900 uppercase tracking-wide">Crear Cuenta Docente</h2>
              <p className="text-slate-500 text-xs">Registra tu correo para darte de alta en Supabase.</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Correo (Gmail)</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="usuario@gmail.com"
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded text-slate-800 text-xs font-semibold outline-none focus:border-mex-maroon"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Contraseña</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded text-slate-800 text-xs font-semibold outline-none focus:border-mex-maroon"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Nombre Completo del Docente</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={regDocenteName}
                    onChange={(e) => setRegDocenteName(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded text-slate-800 text-xs font-semibold outline-none focus:border-mex-maroon"
                    required
                  />
                </div>
              </div>

              {/* Planteles */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-black text-mex-maroon uppercase">Escuelas Asociadas</span>
                  <button
                    type="button"
                    onClick={() => setRegSchools([...regSchools, { escuelaName: "", cct: "" }])}
                    className="inline-flex items-center gap-1 text-mex-maroon font-extrabold text-[10px] uppercase"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar Plantel</span>
                  </button>
                </div>

                {regSchools.map((school, index) => (
                  <div key={index} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-3 relative">
                    {regSchools.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setRegSchools(regSchools.filter((_, i) => i !== index))}
                        className="absolute top-2 right-2 text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-500 font-bold text-[9px] uppercase mb-1">Escuela {index + 1}</label>
                        <input
                          type="text"
                          value={school.escuelaName}
                          onChange={(e) => {
                            const updated = [...regSchools];
                            updated[index].escuelaName = e.target.value;
                            setRegSchools(updated);
                          }}
                          placeholder="Nombre del plantel"
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-slate-800 text-xs font-semibold outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-slate-500 font-bold text-[9px] uppercase mb-1">CCT {index + 1}</label>
                        <input
                          type="text"
                          value={school.cct}
                          onChange={(e) => {
                            const updated = [...regSchools];
                            updated[index].cct = e.target.value;
                            setRegSchools(updated);
                          }}
                          placeholder="Clave CCT"
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-slate-800 text-xs font-semibold outline-none uppercase"
                          required
                        />
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
                className="w-full py-3 px-6 rounded bg-mex-maroon hover:bg-mex-maroon/90 text-white font-extrabold text-xs uppercase flex items-center justify-center gap-3 transition disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-mex-gold" />
                    <span>Registrando en Supabase...</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4 text-mex-gold" />
                    <span>Registrar Cuenta</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => { resetMessages(); setMode("login"); }}
                className="w-full py-2 px-6 rounded border border-slate-200 text-slate-600 font-extrabold text-xs uppercase flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver al Acceso</span>
              </button>
            </div>
          </form>
        )}

        {/* MODE: RECOVER */}
        {mode === "recover" && (
          <form onSubmit={handleRecoverSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-1.5 pb-2">
              <h2 className="text-base font-black text-slate-900 uppercase tracking-wide">Recuperar Contraseña</h2>
              <p className="text-slate-500 text-xs">Ingresa tu correo para recibir un enlace de recuperación.</p>
            </div>

            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Correo Registrado (Gmail)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={recoverEmail}
                  onChange={(e) => setRecoverEmail(e.target.value)}
                  placeholder="usuario@gmail.com"
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded text-slate-800 text-xs font-semibold outline-none focus:border-mex-maroon"
                  required
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 px-6 rounded bg-slate-900 hover:bg-black text-white font-extrabold text-xs uppercase flex items-center justify-center gap-3 transition disabled:opacity-75"
              >
                {isProcessing ? <span>Enviando...</span> : <span>Enviar Correo</span>}
              </button>

              <button
                type="button"
                onClick={() => { resetMessages(); setMode("login"); }}
                className="w-full py-2 px-6 rounded border border-slate-200 text-slate-600 font-extrabold text-xs uppercase flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver al Acceso</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}