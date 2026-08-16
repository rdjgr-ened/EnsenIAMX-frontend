# 🇲🇽 EnseñIA MX - Plataforma de Inteligencia Artificial para la Nueva Escuela Mexicana (NEM)

Plataforma integral de diseño pedagógico impulsada por IA (Google Gemini 2.5/3.6/3.7 Flash) para docentes de educación básica en México (Preescolar, Primaria y Secundaria). Permite generar planeaciones didácticas contextualizadas, programas analíticos (codiseño), instrumentos de evaluación formativa (rúbricas, listas de cotejo, escalas) y exámenes institucionales alineados al Plan de Estudio 2022 de la SEP.

---

## 🚀 Despliegue Rápido en Vercel

Este repositorio está completamente preparado y optimizado para desplegarse en **Vercel** en un solo clic con arquitectura Serverless y soporte completo para SPA.

### Pasos para Desplegar:

1. **Subir a GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - EnsenIA MX"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```

2. **Importar en Vercel**:
   - Ve a [Vercel Dashboard](https://vercel.com/new).
   - Conecta tu cuenta de GitHub e importa este repositorio.
   - Framework Preset: Selecciona **Vite**.
   - Build Command: `vite build` (configurado en `vercel.json`).
   - Output Directory: `dist`.

3. **Configurar Variables de Entorno en Vercel** (`Settings -> Environment Variables`):
   - `GEMINI_API_KEY`: Tu API key de Google AI Studio ([obtener aquí](https://aistudio.google.com/app/apikey)).
   - `VITE_GEMINI_API_KEY`: Misma API key para cliente.
   - `SUPABASE_URL`: URL de tu base de datos Supabase.
   - `SUPABASE_ANON_KEY`: Llave anónima pública de Supabase.
   - `SUPABASE_SERVICE_ROLE_KEY`: Llave de servicio de Supabase (opcional para administración).
   - `VITE_SUPABASE_URL`: Misma URL para cliente Vite.
   - `VITE_SUPABASE_ANON_KEY`: Misma clave anónima para cliente Vite.
   - `MERCADOPAGO_ACCESS_TOKEN`: Token de acceso de Mercado Pago Developers.
   - `MERCADOPAGO_PUBLIC_KEY`: Clave pública de Mercado Pago.
   - `APP_URL`: La URL asignada por Vercel (ej: `https://tu-proyecto.vercel.app`).

4. **Haz clic en "Deploy"** y ¡listo! Tu aplicación estará en línea y 100% funcional.

---

## 💻 Desarrollo Local

### Requisitos:
- Node.js 18+ o Node.js 20+
- npm o pnpm o yarn

### Instalación:
```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
cd TU_REPOSITORIO

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Edita .env con tus claves de Gemini, Supabase y Mercado Pago

# 4. Iniciar servidor de desarrollo
npm run dev
```

Abre en tu navegador: [http://localhost:3000](http://localhost:3000)

---

## 📁 Estructura del Proyecto

```text
├── api/                             # Serverless Functions de Vercel (Backend API)
│   ├── checkout.ts                  # Integración con Checkout de Mercado Pago
│   ├── create-content.ts            # Codiseño curricular asistido por IA
│   ├── fetch-nem-curriculum.ts      # Catálogo oficial NEM con Prompt Caching
│   ├── generate-exam.ts             # Generación de Exámenes y Diagnósticos
│   ├── generate-instrument.ts       # Rúbricas, Listas de Cotejo y Guías de Observación
│   ├── generate-plan.ts             # Generador de Planeaciones Didácticas NEM
│   ├── generate-programa-analitico.ts # Programa Analítico y Contextualización
│   ├── generate-worksheet.ts        # Hojas de trabajo editables para alumnos
│   ├── generate.ts                  # Endpoint universal Gemini con Prompt Caching
│   ├── mercadopago-webhook.ts       # Webhook de confirmación de pagos de Mercado Pago
│   ├── modify-plan.ts               # Asistente de edición y co-pilot de planeaciones
│   └── suggest-content.ts           # Recomendador inteligente de Contenidos y PDAs
│
├── src/                             # Código fuente Frontend (React 19 + TypeScript + Tailwind)
│   ├── components/                  # Componentes modulares y vistas
│   │   ├── ActividadesEditor.tsx
│   │   ├── BapSelector.tsx
│   │   ├── CrearContenidoView.tsx
│   │   ├── CrearExamenView.tsx
│   │   ├── CrearProgramaAnaliticoView.tsx
│   │   ├── ExamenPreviewModal.tsx
│   │   ├── HistorialExamenesModal.tsx
│   │   ├── HistorialPlaneacionesModal.tsx
│   │   ├── InstrumentoPreviewModal.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── Navbar.tsx
│   │   ├── PaymentSuccessView.tsx
│   │   ├── PaywallModal.tsx
│   │   ├── PlaneacionForm.tsx
│   │   ├── PlaneacionPreview.tsx
│   │   ├── PoliticaPrivacidadView.tsx
│   │   ├── ProgramasAnaliticosModal.tsx
│   │   ├── SugerirContenidosView.tsx
│   │   ├── TerminosCondicionesView.tsx
│   │   ├── WorksheetPreviewModal.tsx
│   │   └── ui/                      # Componentes atómicos de interfaz
│   │
│   ├── data/                        # Catálogo curricular sintético oficial NEM
│   │   ├── nemCurriculumData.ts     # Base de datos curricular estructurada
│   │   └── nemCurriculumService.ts  # Servicio de consulta y búsqueda curricular
│   │
│   ├── utils/                       # Utilidades, exportadores y clientes
│   │   ├── docxExporter.ts          # Exportador profesional a Word (.docx/.doc)
│   │   ├── geminiClient.ts          # Cliente frontend para Gemini
│   │   ├── nemContextCache.ts       # Prompt Caching para optimización de tokens y costo
│   │   ├── pdfExporter.ts           # Exportador profesional a PDF vectorizado
│   │   ├── planManager.ts           # Gestión de créditos, suscripciones y planes
│   │   ├── storage.ts               # Persistencia local y en la nube
│   │   └── supabaseClient.ts        # Cliente de Supabase Auth y PostgreSQL
│   │
│   ├── App.tsx                      # Componente principal con enrutamiento de vistas
│   ├── index.css                    # Estilos globales y temas con Tailwind CSS v4
│   ├── main.tsx                     # Punto de entrada de React
│   └── types.ts                     # Definiciones de tipos TypeScript
│
├── .env.example                     # Plantilla de variables de entorno
├── .gitignore                       # Archivos ignorados por git
├── metadata.json                    # Metadatos de la aplicación
├── package.json                     # Dependencias y scripts de construcción
├── server.ts                        # Servidor Express Full-Stack para desarrollo local / contenedor
├── tsconfig.json                    # Configuración de TypeScript
├── vercel.json                      # Configuración de despliegue en Vercel
└── vite.config.ts                   # Configuración del empaquetador Vite
```

---

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 19, TypeScript, Vite 6, Tailwind CSS v4, Lucide React, Motion.
- **Backend / Serverless**: Express 4, Vercel Serverless Functions, Node.js.
- **Inteligencia Artificial**: Google Gemini API (`@google/genai` con Context/Prompt Caching).
- **Base de Datos & Auth**: Supabase PostgreSQL & Supabase Auth (`@supabase/supabase-js`).
- **Pasarela de Pagos**: Mercado Pago SDK (`mercadopago` con Webhooks y Checkout Pro).
- **Exportación de Documentos**: jsPDF, html2canvas, html2pdf.js, generador nativo DOCX/Word.

---

## 📄 Licencia

Este proyecto está distribuido bajo la licencia MIT.
