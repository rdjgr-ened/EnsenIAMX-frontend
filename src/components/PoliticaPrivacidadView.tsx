import React from "react";
import { 
  ShieldCheck, 
  Lock, 
  ArrowLeft, 
  Printer, 
  FileText, 
  UserCheck, 
  EyeOff, 
  Database, 
  Scale, 
  AlertCircle,
  School,
  Mail
} from "lucide-react";

const logoImg = "https://i.imgur.com/tv95RC0.png";

interface PoliticaPrivacidadViewProps {
  onBack: () => void;
}

export default function PoliticaPrivacidadView({ onBack }: PoliticaPrivacidadViewProps) {
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
            <span className="hidden sm:inline">Imprimir Documento</span>
          </button>
        </div>
      </header>

      {/* Main Document Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-12 space-y-8 print:border-none print:shadow-none print:p-0">
          
          {/* Document Header */}
          <div className="border-b border-slate-200 pb-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200 print:hidden">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Aviso de Privacidad Integral • Entorno Educativo</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Política y Aviso de Privacidad
            </h1>
            
            <p className="text-xs text-slate-500 font-medium">
              Última actualización y entrada en vigor: 1 de enero de 2026 | Cumplimiento conforme a la LFPDPPP y estándares de protección de datos en entornos escolares.
            </p>
          </div>

          {/* Quick Notice Box */}
          <div className="bg-amber-50/70 border-l-4 border-mex-gold p-4 sm:p-5 rounded-r-xl text-xs sm:text-sm text-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <Lock className="w-4 h-4 text-mex-gold shrink-0" />
              <span>Compromiso con la Privacidad Escolar y de Menores de Edad</span>
            </div>
            <p className="leading-relaxed text-slate-600">
              En <strong>EnseñIA MX</strong> reconocemos la sensibilidad de la labor educativa y la estricta confidencialidad que requiere la información de las instituciones escolares, docentes y estudiantes de educación básica (preescolar, primaria y secundaria) en los Estados Unidos Mexicanos.
            </p>
          </div>

          {/* Section 1: Responsable */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center">1</span>
              Identidad y Domicilio del Responsable
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>EnseñIA MX</strong> (en lo sucesivo, “La Plataforma”), operada por el equipo de desarrollo y servicios pedagógicos de Tecnologías Educativas para México, con domicilio digital y portal web accesible en <code>enseniamx.app</code>, es la entidad responsable del uso, protección y tratamiento legítimo de sus datos personales, en estricto cumplimiento con la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</strong> y su Reglamento.
            </p>
          </section>

          {/* Section 2: Datos Recabados */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center">2</span>
              Datos Personales que Recabamos
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Para brindarle acceso a las herramientas de diseño didáctico, organización escolar y generación de materiales, recabamos las siguientes categorías de datos:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-mex-maroon" />
                  <span>Datos del Docente</span>
                </div>
                <p className="text-slate-600 text-xs">
                  Nombre completo, correo electrónico, perfil formativo, nivel de suscripción y contraseña cifrada.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <School className="w-4 h-4 text-emerald-600" />
                  <span>Datos del Centro de Trabajo</span>
                </div>
                <p className="text-slate-600 text-xs">
                  Nombre de la escuela, Clave de Centro de Trabajo (CCT), Zona Escolar, Turno, Grado y Grupos asignados.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Datos Pedagógicos y Didácticos</span>
                </div>
                <p className="text-slate-600 text-xs">
                  Proyectos didácticos, planeaciones de clase, reactivos de examen, rúbricas de evaluación e instrumentos generados.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <EyeOff className="w-4 h-4 text-purple-600" />
                  <span>Datos de Alumnos y Gestión Escolar</span>
                </div>
                <p className="text-slate-600 text-xs">
                  Nombres de alumnos en listas de asistencia, calificaciones numéricas y registros de bitácoras de incidencias.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Finalidades */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center">3</span>
              Finalidades del Tratamiento de Datos
            </h2>
            
            <div className="space-y-2 text-xs sm:text-sm text-slate-600">
              <p className="font-semibold text-slate-800">Finalidades Primarias (necesarias para el servicio):</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Creación, autenticación y administración de su cuenta docente en la plataforma.</li>
                <li>Generación automatizada de secuencias didácticas alineadas a los programas de estudio de la Nueva Escuela Mexicana.</li>
                <li>Almacenamiento y organización de sus grupos escolares, planeaciones previas, programas analíticos y bitácoras.</li>
                <li>Cálculo y procesamiento automático de calificaciones e instrumentos de evaluación formativa.</li>
                <li>Administración de créditos de generación, planes de suscripción y facturación correspondiente.</li>
                <li>Proveer soporte técnico y atención a solicitudes de ayuda docente.</li>
              </ul>

              <p className="font-semibold text-slate-800 pt-2">Finalidades Secundarias:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Envío de notificaciones sobre nuevas funciones pedagógicas, actualizaciones curriculares de la SEP o avisos de mantenimiento.</li>
                <li>Generación de estadísticas agregadas y completamente disociadas para la mejora de la precisión del modelo pedagógico.</li>
              </ul>
            </div>
          </section>

          {/* Section 4: Protección de Menores y Datos Sensibles */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center">4</span>
              Tratamiento Especial de Datos de Menores y Datos Sensibles
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              EnseñIA MX no utiliza los datos de los estudiantes (tales como nombres en listas, incidencias de conducta o indicadores BAP/TDAH) para ningún fin publicitario, comercial, de perfilamiento conductual ni para entrenar modelos públicos de inteligencia artificial.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Toda la información introducida respecto a alumnos permanece confinada de manera privada en la cuenta del docente y se procesa únicamente para la renderización de los formatos solicitados (listas de cotejo, actas de acuerdos con tutores, concentrados de evaluación).
            </p>
          </section>

          {/* Section 5: Inteligencia Artificial y Seguridad */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center">5</span>
              Seguridad Informática y Procesamiento con IA
            </h2>
            <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                Implementamos rigurosas medidas de seguridad administrativas, técnicas y físicas para salvaguardar la confidencialidad de la información:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Cifrado en Tránsito (HTTPS/TLS):</strong> Todas las comunicaciones entre su navegador y nuestros servidores viajan bajo canales encriptados de alta seguridad.</li>
                <li><strong>Procesamiento Efímero de Consultas:</strong> Las solicitudes de generación didáctica enviadas al motor de lenguaje se procesan en memoria con el único propósito de producir la respuesta pedagógica requerida y no se almacenan para reentrenamiento de modelos abiertos.</li>
                <li><strong>Aislamiento de Cuentas:</strong> Cada maestro tiene acceso exclusivo a sus registros y archivos generados.</li>
              </ul>
            </div>
          </section>

          {/* Section 6: Derechos ARCO */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center">6</span>
              Ejercicio de Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Usted tiene el derecho permanente de <strong>Acceder</strong> a sus datos personales que poseemos, <strong>Rectificarlos</strong> en caso de ser inexactos o incompletos, solicitar su <strong>Cancelación</strong> total de nuestros servidores cuando considere que no se requieren para los fines señalados, u <strong>Oponerse</strong> al tratamiento de los mismos para fines específicos.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Para ejercer cualquiera de sus derechos ARCO o revocar su consentimiento, basta con enviar una solicitud formal al correo institucional de soporte con el asunto <em>"Derechos ARCO - EnseñIA MX"</em>, incluyendo su nombre, correo de cuenta registrada y la descripción clara del derecho a ejercer.
            </p>
          </section>

          {/* Section 7: Transferencia y Cookies */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center">7</span>
              Transferencias de Datos y Uso de Almacenamiento Local
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              EnseñIA MX <strong>no vende, arrienda, comercializa ni transfiere</strong> sus datos personales a terceras empresas con fines mercadotécnicos o comerciales. Únicamente se realizan transferencias estrictamente indispensables con proveedores de infraestructura tecnológica en la nube y pasarelas de pago seguro para procesar suscripciones.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              La plataforma utiliza almacenamiento local del navegador (<em>Local Storage</em>) para mantener su sesión activa y permitirle recuperar rápidamente sus borradores y datos de centros de trabajo sin demoras de red.
            </p>
          </section>

          {/* Section 8: Cambios y Contacto */}
          <section className="space-y-3 border-t border-slate-200 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center">8</span>
              Modificaciones y Canal de Contacto
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Nos reservamos el derecho de efectuar en cualquier momento modificaciones o actualizaciones al presente Aviso de Privacidad para la atención de novedades legislativas, jurisprudenciales o políticas internas de servicio. Las actualizaciones estarán siempre publicadas y accesibles en este mismo enlace.
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3 text-xs sm:text-sm text-slate-700">
              <Mail className="w-5 h-5 text-mex-maroon shrink-0" />
              <div>
                <span className="font-bold block">Oficina de Privacidad y Soporte Docente:</span>
                <span className="text-slate-500">contacto@enseniamx.app | privacidad@enseniamx.app</span>
              </div>
            </div>
          </section>

          {/* Footer inside document */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <span>Documento emitido por EnseñIA MX para la comunidad educativa de México.</span>
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
