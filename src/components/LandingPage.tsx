import React, { useState } from "react";
import { 
  Sparkles, CheckCircle2, Clock, ShieldCheck, FileText, Printer, 
  BookOpen, Users, Brain, Award, ChevronRight, HelpCircle, 
  Coins, ArrowRight, Zap, Crown, Gem, Star, Check, Layers, 
  FileSpreadsheet, ShieldAlert, GraduationCap, School, HeartHandshake,
  Download, Eye, Sparkle
} from "lucide-react";
import { BillingCycle, PlanTier } from "../types";
import { PLAN_CONFIGS } from "../utils/planManager";

const logoImg = "https://i.imgur.com/tv95RC0.png";

interface LandingPageProps {
  onGoToLogin: () => void;
  onGoToRegister: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToTerms?: () => void;
}

export default function LandingPage({ 
  onGoToLogin, 
  onGoToRegister,
  onNavigateToPrivacy,
  onNavigateToTerms
}: LandingPageProps) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("mensual");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const getPriceDisplay = (planKey: PlanTier) => {
    const config = PLAN_CONFIGS[planKey];
    if (config.priceMonthly === 0) return { main: "$0", period: "Gratis para siempre" };
    
    if (billingCycle === "mensual") {
      return { main: `$${config.priceMonthly} MXN`, period: "/ mes" };
    }
    if (billingCycle === "trimestral") {
      const quarterlyPrice = config.priceQuarterly || config.priceMonthly * 3;
      return { main: `$${quarterlyPrice} MXN`, period: "/ trimestre" };
    }
    const annualPrice = config.priceYearly ?? null;
    if (annualPrice === null) {
      return { main: "No disponible", period: "Plan no habilitado" };
    }

    return { main: `$${annualPrice} MXN`, period: "/ año" };
  };

  const faqs = [
    {
      q: "¿EnseñIA MX cumple con el Plan de Estudio 2022 y la Nueva Escuela Mexicana?",
      a: "Sí, absolutamente. Todo el motor pedagógico está alimentado con la sintaxis oficial de la SEP: Fases 2 a la 6, los 4 Campos Formativos (Lenguajes, Saberes y Pensamiento Científico, Ética, Naturaleza y Sociedades, De lo Humano y lo Comunitario), los 7 Ejes Articuladores, Metodologías Sociocríticas (ABp, STEAM, AS, Aprendizaje Basado en Problemas) y Proceso de Desarrollo de Aprendizaje (PDA)."
    },
    {
      q: "¿Cómo funcionan las adecuaciones curriculares para alumnos con BAP y TDAH?",
      a: "Puedes seleccionar barreras para el aprendizaje (BAP motriz, auditiva, visual, intelectual), TDAH o Aptitudes Sobresalientes. La IA integrará de forma natural los ajustes razonables bajo el Diseño Universal para el Aprendizaje (DUA) en los 3 momentos de cada sesión sin ningún costo de créditos adicional."
    },
    {
      q: "¿Qué incluye la prueba gratuita y necesito tarjeta de crédito?",
      a: "No necesitas registrar ninguna tarjeta de crédito. Al crear tu cuenta recibes inmediatamente 20 créditos gratuitos para generar tus primeras planeaciones, proyectos didácticos o instrumentos de evaluación completos."
    },
    {
      q: "¿Puedo registrar varias escuelas y CCT diferentes?",
      a: "Sí. EnseñIA MX te permite registrar múltiples centros de trabajo (CCT, zona, turno y nombre de escuela) para que puedas alternar entre tus colegios sin tener que reescribir tus datos en cada planeación o formato de evaluación."
    },
    {
      q: "¿Puedo imprimir directamente o descargar?",
      a: "Sí. Todas las planeaciones, instrumentos de evaluación, bitácoras de incidencias y exámenes se pueden imprimir o descargar."
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 font-sans antialiased selection:bg-mex-maroon selection:text-white flex flex-col">
      
      {/* ─────────────────────────────────────────────────────────────
          1. TOP NAVIGATION BAR
      ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-xl flex items-center justify-center p-1 shadow-sm border border-mex-gold/40 shrink-0">
              <img
                src={logoImg}
                alt="EnseñIA MX"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight leading-none">
                  EnseñIA <span className="text-mex-maroon">MX</span>
                </span>
              </div>
              <p className="text-slate-500 text-[11px] font-medium hidden sm:block">
                Asistente Integral Docente
              </p>
            </div>
          </div>

          {/* Quick Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
            <a href="#beneficios" className="hover:text-mex-maroon transition">Beneficios</a>
            <a href="#herramientas" className="hover:text-mex-maroon transition">Herramientas</a>
            <a href="#precios" className="hover:text-mex-maroon transition">Planes y Precios</a>
            <a href="#faq" className="hover:text-mex-maroon transition">Preguntas Frecuentes</a>
          </nav>

          {/* Auth Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onGoToLogin}
              className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl shadow-xs transition cursor-pointer"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={onGoToRegister}
              className="text-xs font-extrabold bg-mex-maroon hover:bg-[#521324] text-white px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition flex items-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-mex-gold" />
              <span>Probar Gratis Ahora</span>
            </button>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. HERO SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-white via-slate-50/60 to-slate-100/50 border-b border-slate-200">
        {/* Subtle decorative background lights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial from-mex-maroon/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-mex-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black text-slate-900 tracking-tight leading-[1.12]">
                Planea, Enseña y Evalúa en <span className="text-mex-maroon">minutos</span>, no en horas.
              </h1>

              {/* Subheadline */}
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Diseñado exclusivamente para maestras y maestros de México. Genera tu Programa Analítico, Proyectos didácticos con Contenidos y PDA, hojas de trabajo, instrumentos de evaluación, y examenes listos para imprimir bajo los lineamientos de la Nueva Escuela Mexicana.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={onGoToRegister}
                  className="w-full sm:w-auto px-8 py-4 bg-mex-maroon hover:bg-[#521324] text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer group transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-5 h-5 text-mex-gold group-hover:rotate-12 transition-transform" />
                  <span>Probar Gratis Ahora</span>
                  <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Micro Perks under CTA */}
              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  20 créditos gratis de bienvenida
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Sin tarjeta de crédito requerida
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Fases 2 a 6 (Preescolar a Secundaria)
                </span>
              </div>
            </div>

            {/* Right Interactive Mockup / Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Decorative border card */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-mex-maroon via-mex-gold to-emerald-600 rounded-3xl blur-sm opacity-30 group-hover:opacity-100 transition duration-1000" />
                
                <div className="relative bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden text-left p-5 sm:p-6 space-y-4">
                  
                  {/* Top card header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                  </div>

                  {/* Mock Plan Content */}
                  <div className="space-y-3">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                      <div className="text-[10px] font-extrabold text-slate-400 uppercase">Campo Formativo</div>
                      <div className="text-xs font-black text-slate-900">Saberes y Pensamiento Científico</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
                        <div className="text-[9px] font-bold text-emerald-700 uppercase">Metodología</div>
                        <div className="font-extrabold text-emerald-950 text-[11px]">STEAM en Acción</div>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 p-2.5 rounded-xl">
                        <div className="text-[9px] font-bold text-purple-700 uppercase">Adecuación BAP</div>
                        <div className="font-extrabold text-purple-950 text-[11px]">DUA + TDAH Incluido</div>
                      </div>
                    </div>

                    {/* Step pills */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <span className="font-bold text-slate-700 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-mex-maroon text-white flex items-center justify-center text-[10px] font-black">1</span>
                          Fase Inicio: Pregunta generadora
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <span className="font-bold text-slate-700 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-mex-maroon text-white flex items-center justify-center text-[10px] font-black">2</span>
                          Fase Desarrollo: Trabajo por equipos
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <span className="font-bold text-slate-700 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-mex-maroon text-white flex items-center justify-center text-[10px] font-black">3</span>
                          Fase Cierre: Rúbrica formativa
                        </span>
                      </div>
                    </div>

                    {/* Footer print badge */}
                    <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
                      <span className="flex items-center gap-1 font-semibold text-mex-maroon">
                        <Printer className="w-3.5 h-3.5" />
                        Formatos listos para imprimir o descargar
                      </span>
                      <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        ✓ Alineado al 100%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Metric Badge */}
                <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white p-3.5 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-3 hidden sm:flex">
                  <div className="w-10 h-10 rounded-xl bg-mex-gold text-slate-950 flex items-center justify-center font-black text-lg">
                    ⚡
                  </div>
                  <div>
                    <div className="text-xs font-black text-white">De 8 Horas a 3 Minutos</div>
                    <div className="text-[10px] text-slate-400">Ahorro comprobado de papeleo docente</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. STATS STRIP
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-mex-maroon text-white py-6 border-y border-mex-maroon/80 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-mex-gold">90%</div>
              <div className="text-xs text-white/80 font-medium">Menos tiempo en planeación</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-mex-gold">100%</div>
              <div className="text-xs text-white/80 font-medium">Alineado al Plan de Estudio SEP</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-mex-gold">Fases 2 a 6</div>
              <div className="text-xs text-white/80 font-medium">Preescolar, Primaria y Secundaria</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. PEDAGOGICAL BENEFITS SECTION
      ───────────────────────────────────────────────────────────── */}
      <section id="beneficios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Beneficios Pedagógicos Diseñados por y para Maestros
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              EnseñIA MX no es un generador genérico de texto. Es una plataforma pedagógica integral.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Benefit 1: Time Savings */}
            <div className="bg-slate-50 hover:bg-white p-7 rounded-2xl border border-slate-200 hover:border-mex-maroon/30 shadow-xs hover:shadow-lg transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-mex-maroon/10 text-mex-maroon flex items-center justify-center group-hover:bg-mex-maroon group-hover:text-white transition-colors">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-mex-maroon transition-colors">
                Ahorro Extraordinario de Tiempo
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Olvídate de pasar los fines de semana redactando formatos repetitivos. Genera secuencias completas con inicio, desarrollo, cierre, recursos y evaluación formativa en menos de 3 minutos.
              </p>
            </div>

            {/* Benefit 2: Adecuaciones Curriculares */}
            <div className="bg-slate-50 hover:bg-white p-7 rounded-2xl border border-slate-200 hover:border-purple-300 shadow-xs hover:shadow-lg transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:bg-purple-700 group-hover:text-white transition-colors">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-purple-700 transition-colors">
                Adecuaciones Curriculares
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Ajustes razonables contextualizados bajo el enfoque DUA (Diseño Universal para el Aprendizaje) para barreras motrices, visuales, auditivas, TDAH o aptitudes sobresalientes sin costo de créditos adicional.
              </p>
            </div>

            {/* Benefit 3: Print Ready Formats */}
            <div className="bg-slate-50 hover:bg-white p-7 rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-lg transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <Printer className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                Formatos Listos para Imprimir o Descargar
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Cada documento se genera con encabezados institucionales (CCT, Zona Escolar, Escuela, Grado, Turno) y tablas limpias listas para imprimir o descargar en cualquier momento.
              </p>
            </div>

            {/* Benefit 4: Programa Analítico */}
            <div className="bg-slate-50 hover:bg-white p-7 rounded-2xl border border-slate-200 hover:border-amber-300 shadow-xs hover:shadow-lg transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:bg-amber-700 group-hover:text-white transition-colors">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-700 transition-colors">
                Programa Analítico y Codiseño
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Articula el programa sintético con la problematización de tu comunidad escolar y diseña contenidos contextualizados con sus respectivos PDA.
              </p>
            </div>

            {/* Benefit 5: Evaluación Continua */}
            <div className="bg-slate-50 hover:bg-white p-7 rounded-2xl border border-slate-200 hover:border-cyan-300 shadow-xs hover:shadow-lg transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center group-hover:bg-cyan-700 group-hover:text-white transition-colors">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-cyan-700 transition-colors">
                Evaluación Integral Automatizada
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Rúbricas analíticas, listas de cotejo, escalas estimativas y formatos de evaluación continua con ponderaciones porcentuales y cálculo automático de calificaciones.
              </p>
            </div>

            {/* Benefit 6: Exámenes y Reactivos */}
            <div className="bg-slate-50 hover:bg-white p-7 rounded-2xl border border-slate-200 hover:border-rose-300 shadow-xs hover:shadow-lg transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center group-hover:bg-rose-700 group-hover:text-white transition-colors">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-rose-700 transition-colors">
                Exámenes y Hojas de Trabajo
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Diseña exámenes trimestrales o de diagnóstico con reactivos de opción múltiple, clave de respuestas para el docente y hojas de actividades para los alumnos.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. HERRAMIENTAS & MODULOS SHOWCASE
      ───────────────────────────────────────────────────────────── */}
      <section id="herramientas" className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Todo el ecosistema docente en un solo lugar
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Herramientas modulares creadas para agilizar tu labor cotidiana frente a grupo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-mex-maroon/10 text-mex-maroon flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-black text-sm text-slate-900">Diseñador Didáctico</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Planeación por proyectos con fases sociocríticas, PDA y ejes articuladores.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="font-black text-sm text-slate-900">Generador de Exámenes</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Reactivos alineados a los aprendizajes con clave docente lista para calificar.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h4 className="font-black text-sm text-slate-900">Bitácora de Incidencias</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Actas con folio institucional y firmas de padres, tutores y directivos.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h4 className="font-black text-sm text-slate-900">Evaluación Continua</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Formatos ponderados tipo Google Sheets y Excel con cálculo automático de promedios.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. PRICING AND PLANS TABLE
      ───────────────────────────────────────────────────────────── */}
      <section id="precios" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Planes Flexibles al Alcance de Cada Docente
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Comienza hoy mismo con nuestra prueba gratuita. Elige el plan que mejor se adapte a tus necesidades.
            </p>

            {/* Billing Cycle Toggle */}
            <div className="pt-4 flex items-center justify-center">
              <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 inline-flex items-center gap-1 shadow-inner">
                <button
                  type="button"
                  onClick={() => setBillingCycle("mensual")}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    billingCycle === "mensual"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Mensual
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle("trimestral")}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    billingCycle === "trimestral"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Trimestral
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle("anual")}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                    billingCycle === "anual"
                      ? "bg-mex-maroon text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span>Anual</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    billingCycle === "anual" ? "bg-mex-gold text-slate-950" : "bg-emerald-100 text-emerald-800"
                  }`}>
                    Ahorra 2 meses
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. GRATUITO */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 flex flex-col justify-between space-y-6 hover:shadow-lg transition">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900">Gratuito</h3>
                  <Sparkles className="w-4 h-4 text-slate-400" />
                </div>
                <div className="pt-2">
                  <span className="text-3xl font-black text-slate-900">$0</span>
                  <span className="text-slate-500 text-xs font-bold block">Gratis para siempre</span>
                </div>

                {/* Features list */}
                <ul className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>20 Créditos</strong> de bienvenida</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Diseñador de planeación NEM</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Adecuaciones BAP y TDAH</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Hojas de trabajo por sesión</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-400">
                    <span className="text-slate-300 shrink-0">—</span>
                    <span>Historial guardado: 7 días</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={onGoToRegister}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
              >
                Probar Gratis Ahora
              </button>
            </div>

            {/* 2. BASICO */}
            <div className="bg-white rounded-2xl border-2 border-emerald-200 p-6 flex flex-col justify-between space-y-6 hover:shadow-lg transition">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900">Básico</h3>
                  <Zap className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="pt-2">
                  <span className="text-3xl font-black text-slate-900">{getPriceDisplay("basico").main}</span>
                  <span className="text-slate-500 text-xs font-bold"> {getPriceDisplay("basico").period}</span>
                </div>

                {/* Features list */}
                <ul className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>50 Créditos</strong> renovables cada mes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Historial guardado: <strong>30 días</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Gestión de grupos y alumnos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Hasta <strong>5 actas</strong> de bitácora</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Exportación para imprimir</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={onGoToRegister}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-xs transition cursor-pointer"
              >
                Comenzar con Básico
              </button>
            </div>

            {/* 3. ORO */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 flex flex-col justify-between space-y-6 hover:shadow-lg transition">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900">Plan Oro</h3>
                  <Crown className="w-4 h-4 text-amber-500" />
                </div>
                <div className="pt-2">
                  <span className="text-3xl font-black text-slate-900">{getPriceDisplay("oro").main}</span>
                  <span className="text-slate-500 text-xs font-bold"> {getPriceDisplay("oro").period}</span>
                </div>

                {/* Features list */}
                <ul className="space-y-2.5 text-xs text-slate-700 border-t border-slate-100 pt-4">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>100 Créditos</strong> renovables cada mes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Historial guardado: <strong>3 meses</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Generador de <strong>Exámenes</strong> completo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Creación de <strong>Programa Analítico</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Hasta <strong>15 actas</strong> de bitácora</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Seguimiento y control de clases</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={onGoToRegister}
                className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-xs transition cursor-pointer"
              >
                Elegir Plan Oro
              </button>
            </div>

            {/* 4. PLATINO (MÁS RECOMENDADO) */}
            <div className="bg-gradient-to-b from-amber-50/60 via-indigo-50/30 to-white rounded-2xl border-2 border-amber-400 p-6 flex flex-col justify-between space-y-6 shadow-md hover:shadow-xl transition relative">
              {/* Popular badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                ⭐ Más Recomendado
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200/60">
                    Todo Incluido
                  </span>
                  <Gem className="w-4 h-4 text-indigo-500" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Platino</h3>
                  <p className="text-slate-500 text-xs">Máxima potencia, ciclo escolar completo y evaluación continua.</p>
                </div>
                <div className="pt-2">
                  <span className="text-3xl font-black text-slate-900">{getPriceDisplay("platino").main}</span>
                  <span className="text-slate-500 text-xs font-bold"> {getPriceDisplay("platino").period}</span>
                </div>

                {/* Features list */}
                <ul className="space-y-2.5 text-xs text-slate-600 border-t border-amber-200/60 pt-4">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span><strong>300 Créditos</strong> renovables cada mes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>Historial de <strong>12 meses (Ciclo completo)</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span><strong>Formato de Evaluación Integral</strong> (Excel/Sheets)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span><strong>Bitácora Ilimitada</strong> sin restricciones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>Soporte técnico prioritario</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={onGoToRegister}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition cursor-pointer"
              >
                Elegir Plan Platino
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. FREQUENTLY ASKED QUESTIONS (FAQ)
      ───────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2 mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Preguntas Frecuentes de Docentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left font-bold text-slate-800 text-sm sm:text-base flex items-center justify-between gap-4 cursor-pointer hover:text-mex-maroon transition"
                  >
                    <span>{faq.q}</span>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center bg-slate-100 text-slate-600 transition-transform ${isOpen ? "rotate-180 bg-mex-maroon text-white" : ""}`}>
                      ↓
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. FINAL CALL TO ACTION (CTA)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-[#521324] via-mex-maroon to-[#7A1E38] text-white relative overflow-hidden">
        {/* Background ambient elements */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-mex-gold/15 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Recupera tus fines de semana y enseña con excelencia.
          </h2>

          <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Únete a maestras y maestros en todo México que ya optimizaron su tiempo con planeaciones pedagógicas listas para el aula.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onGoToRegister}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl hover:shadow-2xl transition flex items-center justify-center gap-3 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>Probar Gratis Ahora</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onGoToLogin}
              className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-2xl border border-white/20 transition cursor-pointer"
            >
              Ya tengo una cuenta • Iniciar Sesión
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. FOOTER
      ───────────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-white/70 py-12 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center p-1 border border-mex-gold/40 shrink-0">
                <img
                  src={logoImg}
                  alt="EnseñIA MX"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="font-black text-white text-base">EnseñIA MX</div>
                <div className="text-[10px] text-slate-400">Asistente Integral Docente</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-slate-400">
              <a href="#beneficios" className="hover:text-white transition">Beneficios</a>
              <a href="#herramientas" className="hover:text-white transition">Herramientas</a>
              <a href="#precios" className="hover:text-white transition">Planes</a>
              <a href="#faq" className="hover:text-white transition">Preguntas Frecuentes</a>
              <a 
                href="/politica-de-privacidad" 
                onClick={(e) => {
                  if (onNavigateToPrivacy) {
                    e.preventDefault();
                    onNavigateToPrivacy();
                  }
                }} 
                className="hover:text-white transition cursor-pointer"
              >
                Aviso de Privacidad
              </a>
              <a 
                href="/terminos-y-condiciones" 
                onClick={(e) => {
                  if (onNavigateToTerms) {
                    e.preventDefault();
                    onNavigateToTerms();
                  }
                }} 
                className="hover:text-white transition cursor-pointer"
              >
                Términos y Condiciones
              </a>
              <button onClick={onGoToLogin} className="hover:text-white transition cursor-pointer">Acceso Docente</button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>
              © {new Date().getFullYear()} EnseñIA MX. Desarrollado para la comunidad docente de México.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <a 
                href="/politica-de-privacidad" 
                onClick={(e) => {
                  if (onNavigateToPrivacy) {
                    e.preventDefault();
                    onNavigateToPrivacy();
                  }
                }} 
                className="hover:text-slate-200 transition underline underline-offset-2"
              >
                Privacidad
              </a>
              <span>•</span>
              <a 
                href="/terminos-y-condiciones" 
                onClick={(e) => {
                  if (onNavigateToTerms) {
                    e.preventDefault();
                    onNavigateToTerms();
                  }
                }} 
                className="hover:text-slate-200 transition underline underline-offset-2"
              >
                Términos de Servicio
              </a>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-400">
                Hecho por la educación mexicana 🇲🇽
              </span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
