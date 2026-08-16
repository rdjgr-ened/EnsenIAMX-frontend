import React from "react";
import { 
  FileText, 
  ArrowLeft, 
  Printer, 
  Scale, 
  Brain, 
  CreditCard, 
  RotateCcw, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles,
  HelpCircle,
  Mail,
  CheckCircle2
} from "lucide-react";

const logoImg = "https://i.imgur.com/tv95RC0.png";

interface TerminosCondicionesViewProps {
  onBack: () => void;
}

export default function TerminosCondicionesView({ onBack }: TerminosCondicionesViewProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-mex-maroon transition cursor-pointer px-3 py-1.5 rounded-lg hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-0.5 border border-mex-gold/40 shrink-0">
              <img
                src={logoImg}
                alt="EnseñIA MX"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-extrabold text-slate-900 text-sm hidden sm:inline">
              EnseñIA <span className="text-mex-maroon">MX</span>
            </span>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Imprimir Términos</span>
          </button>
        </div>
      </header>

      {/* Main Document Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-12 space-y-8 print:border-none print:shadow-none print:p-0">
          
          {/* Document Header */}
          <div className="border-b border-slate-200 pb-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-900 text-xs font-bold rounded-full border border-amber-200 print:hidden">
              <Scale className="w-3.5 h-3.5 text-mex-gold" />
              <span>Condiciones Generales de Servicio (SaaS)</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Términos y Condiciones de Uso
            </h1>
            
            <p className="text-xs text-slate-500 font-medium">
              Vigente a partir de: 1 de enero de 2026 | Aplica a todos los usuarios, docentes e instituciones educativas que utilicen la plataforma EnseñIA MX.
            </p>
          </div>

          {/* Quick Notice Box */}
          <div className="bg-slate-50 border-l-4 border-mex-maroon p-4 sm:p-5 rounded-r-xl text-xs sm:text-sm text-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <FileText className="w-4 h-4 text-mex-maroon shrink-0" />
              <span>Aceptación Previa de los Términos</span>
            </div>
            <p className="leading-relaxed text-slate-600">
              Al acceder, registrarse o utilizar la plataforma de software como servicio (SaaS) <strong>EnseñIA MX</strong>, usted declara ser mayor de edad, contar con la capacidad legal para contratar y manifiesta su aceptación plena y sin reservas de los presentes Términos y Condiciones.
            </p>
          </div>

          {/* Section 1: Objeto del Servicio */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center">1</span>
              Descripción y Objeto del Servicio
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>EnseñIA MX</strong> es una suite tecnológica orientada a la educación básica en México que proporciona a los docentes herramientas de asistencia pedagógica para:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
              <li>Generación y estructuración de proyectos y planeaciones didácticas alineadas a los Planes y Programas de Estudio vigentes (Fases 2 a 6).</li>
              <li>Diseño de Programas Analíticos, Codiseño y problematización comunitaria.</li>
              <li>Elaboración de instrumentos de evaluación formativa (rúbricas, listas de cotejo, escalas) y exámenes con claves para el docente.</li>
              <li>Generación de hojas de trabajo y actividades fotocopiables para alumnos.</li>
              <li>Gestión de grupos, registro de asistencias, concentrado de calificaciones y bitácoras de incidencias.</li>
            </ul>
          </section>

          {/* Section 2: Reglas de Uso de la Inteligencia Artificial */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center">2</span>
              Reglas y Directrices de Uso de la Inteligencia Artificial (IA)
            </h2>
            
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200/80 space-y-2">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Carácter Auxiliar y Autonomía Profesional Docente</span>
                </div>
                <p className="text-emerald-950">
                  La Inteligencia Artificial provista en EnseñIA MX actúa exclusivamente como un <strong>asistente de co-diseño pedagógico y optimizador de tiempo</strong>. No sustituye en ningún momento la autonomía profesional, la experiencia contextual ni el criterio del maestro frente a su grupo.
                </p>
              </div>

              <p>
                <strong>Responsabilidad de Revisión Pedagógica:</strong> Es responsabilidad indelegable del docente revisar, verificar y adaptar cualquier propuesta didáctica generada antes de su implementación en el aula o de su entrega ante las autoridades escolares (Dirección Escolar, Supervisión o ATP).
              </p>

              <p>
                <strong>Prohibición de Usos Indebidos:</strong> Queda estrictamente prohibido utilizar los motores de IA para generar contenido difamatorio, discriminatorio, violento, que vulnere los derechos humanos de la niñez y adolescencia, o que infrinja normativas educativas mexicanas.
              </p>
            </div>
          </section>

          {/* Section 3: Cuentas y Seguridad */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center">3</span>
              Registro de Cuentas y Responsabilidad de Credenciales
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              El usuario se compromete a proporcionar información verídica y mantener actualizados sus datos de contacto y centros escolares (CCT). Las credenciales de acceso son personales e intransferibles. El usuario es el único responsable de la confidencialidad de su contraseña y de todas las actividades realizadas a través de su cuenta.
            </p>
          </section>

          {/* Section 4: Propiedad Intelectual */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center">4</span>
              Propiedad Intelectual y Titularidad de Contenidos
            </h2>
            
            <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                <strong>1. Titularidad de los Materiales Generados por el Docente:</strong> El docente o usuario conserva en todo momento la titularidad, propiedad y libre disposición de las planeaciones, proyectos escolares, evaluaciones y materiales didácticos que cree o genere mediante la plataforma para su desempeño educativo.
              </p>
              <p>
                <strong>2. Propiedad de la Plataforma:</strong> El software, código fuente, interfaz gráfica, algoritmos de orquestación, logotipos, marcas comerciales ("EnseñIA MX") y bases de datos son propiedad exclusiva de Tecnologías Educativas para México y están protegidos por las leyes de propiedad industrial y derechos de autor vigentes en México e internacionales.
              </p>
            </div>
          </section>

          {/* Section 5: Suscripciones, Planes y Créditos */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center">5</span>
              Suscripciones, Ciclos de Cobro y Sistema de Créditos
            </h2>
            
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                EnseñIA MX opera bajo un modelo <em>Freemium</em> con opciones de suscripción de pago (Básico, Oro, Platino) y disponibilidad en modalidades de cobro mensual, trimestral o anual:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-mex-maroon" />
                    <span>Prueba Gratuita</span>
                  </div>
                  <p className="text-slate-600 text-xs mt-1">
                    Incluye 20 créditos iniciales de bienvenida para probar las funcionalidades sin requerir registrar tarjeta bancaria.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Planes de Pago</span>
                  </div>
                  <p className="text-slate-600 text-xs mt-1">
                    Asignan una bolsa de créditos mensual renovable según el plan adquirido (50, 100 o 300 créditos) y desbloquean funciones avanzadas.
                  </p>
                </div>
              </div>

              <p className="pt-1">
                Los precios están expresados en Moneda Nacional Mexicana (MXN) e incluyen los impuestos aplicables. Los cargos se efectúan de manera recurrente al inicio de cada ciclo de facturación acordado.
              </p>
            </div>
          </section>

          {/* Section 6: Políticas de Cancelación y Reembolso */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center">6</span>
              Política de Cancelación y Reembolsos
            </h2>
            
            <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Cancelación en cualquier momento:</strong> Usted puede cancelar la renovación automática de su suscripción en cualquier momento desde los ajustes de su cuenta o enviando una solicitud a soporte sin costo ni penalización alguna.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Conservación del Servicio hasta el fin del periodo:</strong> Al solicitar la cancelación, usted mantendrá acceso total a los beneficios de su plan y sus créditos hasta que concluya el ciclo de facturación previamente pagado.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Garantía de Satisfacción:</strong> Si durante los primeros 7 días naturales posteriores a su primera contratación presenta fallas técnicas no atribuibles a su conexión que le impidan usar el servicio, podrá solicitar la revisión de su caso para un reembolso íntegro.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: Disponibilidad y Limitación de Responsabilidad */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center">7</span>
              Disponibilidad del Servicio y Limitación de Responsabilidad
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Nos esforzamos por mantener una disponibilidad continua del 99.9% en la plataforma. Sin embargo, el servicio puede experimentar interrupciones programadas por mantenimiento o causas de fuerza mayor inherentes a redes globales de telecomunicaciones.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              EnseñIA MX no se hace responsable por resoluciones administrativas, calificaciones académicas o decisiones dictadas por autoridades educativas respecto a los proyectos didácticos entregados por el usuario.
            </p>
          </section>

          {/* Section 8: Legislación y Jurisdicción */}
          <section className="space-y-3 border-t border-slate-200 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center">8</span>
              Legislación Aplicable y Jurisdicción
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Los presentes Términos y Condiciones se rigen e interpretan de conformidad con las leyes federales de los Estados Unidos Mexicanos y la normativa de protección al consumidor (PROFECO). Para cualquier controversia, las partes se someten a la jurisdicción de los tribunales competentes en México.
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3 text-xs sm:text-sm text-slate-700">
              <Mail className="w-5 h-5 text-mex-maroon shrink-0" />
              <div>
                <span className="font-bold block">Canal Oficial de Atención a Términos y Suscripciones:</span>
                <span className="text-slate-500">contacto@enseniamx.app | legal@enseniamx.app</span>
              </div>
            </div>
          </section>

          {/* Footer inside document */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <span>EnseñIA MX — Asistente Integral Docente para México.</span>
            <button
              onClick={onBack}
              className="text-mex-maroon font-bold hover:underline cursor-pointer print:hidden"
            >
              ← Volver a la plataforma
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
