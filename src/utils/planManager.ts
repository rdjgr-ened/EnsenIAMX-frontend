import { UserSubscription, CreditActionType, PlanTier } from "../types";

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface PlanDetails {
  id: PlanTier;
  name: string;
  badge?: string;
  priceMonthly: number;
  priceQuarterly?: number;
  priceAnnual?: number;
  credits: number;
  description: string;
  features: PlanFeature[];
  maxSavedPlans: number;
  allowExportPDF: boolean;
  allowExportWord: boolean;
  prioritySupport: boolean;
}

export const CREDIT_COSTS: Record<CreditActionType | string, number> = {
  disenar_planeacion: 10,
  generar_planeacion: 10,
  instrumento_evaluacion: 5,
  hoja_trabajo: 5,
  modificar_planeacion: 5,
  crear_examen: 5,
  programa_analitico: 10,
  sugerir_contenidos: 2,
  crear_contenido: 5,
  bitacora_incidencia: 3,
  organizador_escolar: 2,
};

export const PLANS_CONFIG: Record<PlanTier, PlanDetails> = {
  gratuito: {
    id: "gratuito",
    name: "Prueba Gratuita",
    priceMonthly: 0,
    credits: 20,
    description: "Para explorar la plataforma y probar la generación de proyectos.",
    maxSavedPlans: 3,
    allowExportPDF: true,
    allowExportWord: false,
    prioritySupport: false,
    features: [
      { text: "20 créditos de bienvenida", included: true },
      { text: "Diseño de proyectos NEM", included: true },
      { text: "Exportación a PDF", included: true },
      { text: "Hasta 3 planeaciones guardadas", included: true },
      { text: "Exportación a Word (DOCX)", included: false },
      { text: "Historial e impresiones ilimitadas", included: false },
    ],
  },
  basico: {
    id: "basico",
    name: "Plan Básico",
    badge: "Popular",
    priceMonthly: 99,
    priceQuarterly: 249,
    priceAnnual: 899,
    credits: 100,
    description: "Ideal para docentes que buscan agilizar sus planeaciones semanales.",
    maxSavedPlans: 15,
    allowExportPDF: true,
    allowExportWord: true,
    prioritySupport: false,
    features: [
      { text: "100 créditos mensuales", included: true },
      { text: "Diseño de proyectos y exámenes", included: true },
      { text: "Exportación a PDF y Word", included: true },
      { text: "Hasta 15 planeaciones guardadas", included: true },
      { text: "Sugeridor de contenidos NEM", included: true },
      { text: "Soporte prioritario", included: false },
    ],
  },
  oro: {
    id: "oro",
    name: "Plan Oro",
    badge: "Recomendado",
    priceMonthly: 199,
    priceQuarterly: 499,
    priceAnnual: 1799,
    credits: 300,
    description: "Para maestros que requieren uso intensivo y todas las herramientas.",
    maxSavedPlans: 50,
    allowExportPDF: true,
    allowExportWord: true,
    prioritySupport: true,
    features: [
      { text: "300 créditos mensuales", included: true },
      { text: "Acceso ilimitado a todos los módulos", included: true },
      { text: "Programa Analítico y Exámenes", included: true },
      { text: "Exportación completa en Word y PDF", included: true },
      { text: "Hasta 50 planeaciones guardadas", included: true },
      { text: "Soporte técnico prioritario", included: true },
    ],
  },
  platino: {
    id: "platino",
    name: "Plan Platino",
    badge: "Ilimitado",
    priceMonthly: 399,
    priceQuarterly: 999,
    priceAnnual: 3499,
    credits: 1000,
    description: "Para directivos, asesores técnicos o docentes de múltiples escuelas.",
    maxSavedPlans: 999,
    allowExportPDF: true,
    allowExportWord: true,
    prioritySupport: true,
    features: [
      { text: "1,000 créditos mensuales", included: true },
      { text: "Todos los módulos y formatos", included: true },
      { text: "Multi-escuela y bitácoras avanzadas", included: true },
      { text: "Almacenamiento ilimitado", included: true },
      { text: "Exportación ilimitada Word/PDF", included: true },
      { text: "Atención personalizada vía Whatsapp", included: true },
    ],
  },
};

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  popular?: boolean;
}

export const CREDIT_PACKAGES: CreditPackage[] = [
  { id: "pack_50", name: "Paquete Recarga", credits: 50, price: 49 },
  { id: "pack_150", name: "Paquete Pro", credits: 150, price: 119, popular: true },
  { id: "pack_400", name: "Paquete Escolar", credits: 400, price: 279 },
];

const STORAGE_KEY = "nem_user_subscription";

export function getInitialSubscription(): UserSubscription {
  return {
    plan: "gratuito",
    credits: 20,
    billingCycle: "mensual",
    updatedAt: new Date().toISOString(),
  };
}

export function loadUserSubscription(): UserSubscription {
  if (typeof window === "undefined") return getInitialSubscription();
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return { ...getInitialSubscription(), ...JSON.parse(saved) };
    } catch (e) {
      return getInitialSubscription();
    }
  }
  return getInitialSubscription();
}

export function saveSubscriptionToStorage(sub: UserSubscription): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...sub, updatedAt: new Date().toISOString() }));
  }
}

export function getActionCreditCost(action: CreditActionType | string): number {
  return CREDIT_COSTS[action] ?? 5;
}

export function hasEnoughCredits(sub: UserSubscription, action: CreditActionType | string): boolean {
  return sub.credits >= getActionCreditCost(action);
}

export function deductCreditsFromState(
  currentSub: UserSubscription,
  action: CreditActionType | string
): { success: boolean; newSubscription?: UserSubscription; cost: number } {
  const cost = getActionCreditCost(action);
  if (currentSub.credits < cost) return { success: false, cost };

  const newSub: UserSubscription = {
    ...currentSub,
    credits: currentSub.credits - cost,
    updatedAt: new Date().toISOString(),
  };
  saveSubscriptionToStorage(newSub);
  return { success: true, newSubscription: newSub, cost };
}

export function addCreditsToUser(currentSub: UserSubscription, amount: number): UserSubscription {
  const updated: UserSubscription = {
    ...currentSub,
    credits: currentSub.credits + amount,
    updatedAt: new Date().toISOString(),
  };
  saveSubscriptionToStorage(updated);
  return updated;
}

export function updateUserPlan(
  currentSub: UserSubscription,
  newPlan: PlanTier,
  cycle: "mensual" | "trimestral" | "anual" = "mensual"
): UserSubscription {
  const planConfig = PLANS_CONFIG[newPlan] || PLANS_CONFIG.gratuito;
  const updated: UserSubscription = {
    ...currentSub,
    plan: newPlan,
    credits: planConfig.credits,
    billingCycle: cycle,
    updatedAt: new Date().toISOString(),
  };
  saveSubscriptionToStorage(updated);
  return updated;
}

export function canExportToFormat(sub: UserSubscription, format: "pdf" | "word"): boolean {
  const planDetails = PLANS_CONFIG[sub.plan] || PLANS_CONFIG.gratuito;
  return format === "pdf" ? planDetails.allowExportPDF : planDetails.allowExportWord;
}

export function getPlanLimits(planTier: PlanTier): PlanDetails {
  return PLANS_CONFIG[planTier] || PLANS_CONFIG.gratuito;
}

export const PLAN_CONFIGS = PLANS_CONFIG;
export function checkFeatureAccess(subscription: any, featureKey?: string): boolean {
  if (!subscription) return false;
  const plan = (subscription.plan || "gratuito").toLowerCase();
  
  // Los planes superiores tienen acceso total a las funciones avanzadas
  if (plan === "platino" || plan === "oro" || plan === "basico") {
    return true;
  }
  
  // Para el plan gratuito, puedes definir restricciones si lo deseas
  return true;
}
export function checkBitacoraLimit(subscription: any, currentCount?: number): boolean {
  return true;
}

export function checkExamLimit(subscription: any, currentCount?: number): boolean {
  return true;
}

export function checkPlaneacionLimit(subscription: any, currentCount?: number): boolean {
  return true;
}
export function upgradeUserPlan(currentSub: any, newTier: string, billingCycle?: string): any {
  return {
    ...(currentSub || {}),
    plan: newTier,
    billingCycle: billingCycle || "monthly",
    status: "active"
  };
}

export const CREDIT_ACTIONS_INFO = {
  PLANEACION: { label: "Generar Planeación", cost: 1 },
  EXAMEN: { label: "Crear Examen", cost: 1 },
  BITACORA: { label: "Bitácora", cost: 1 },
};