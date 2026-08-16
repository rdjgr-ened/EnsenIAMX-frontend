import { PlanTier, BillingCycle, CreditActionType, UserSubscription, PlanFeatureConfig, PaywallReason } from "../types";

export const PLAN_CONFIGS: Record<PlanTier, PlanFeatureConfig> = {
  gratuito: {
    id: "gratuito",
    name: "Prueba Gratuita",
    badgeLabel: "Prueba Gratuita",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-300",
    priceMonthly: 0,
    priceQuarterly: 0,
    priceYearly: 0,
    creditsPerMonth: 20,
    isInitialOnly: true,
    historyDays: 7,
    historyLabel: "7 días",
    bitacoraLimit: 0,
    allowGroups: false,
    allowBitacora: false,
    allowClassTracking: false,
    allowEvaluationFormat: false,
    allowContinuousEvaluation: false,
    description: "Ideal para conocer y probar la plataforma con 20 créditos de bienvenida.",
    features: [
      "20 créditos de bienvenida (únicos)",
      "Historial de guardado: 7 días",
      "Diseño de planeaciones didácticas",
      "Generación de exámenes y programa analítico",
      "Adecuación curricular (BAP/TDAH/AS) incluida",
    ],
  },
  basico: {
    id: "basico",
    name: "Plan Básico",
    badgeLabel: "Plan Básico",
    badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
    priceMonthly: 49,
    priceQuarterly: 129,
    priceYearly: 499,
    creditsPerMonth: 50,
    historyDays: 30,
    historyLabel: "30 días",
    bitacoraLimit: 5,
    allowGroups: true,
    allowBitacora: true,
    allowClassTracking: false,
    allowEvaluationFormat: false,
    allowContinuousEvaluation: false,
    description: "Para docentes que requieren planeaciones constantes y gestión de grupos.",
    features: [
      "50 créditos cada mes",
      "Historial de guardado: 30 días",
      "Registrar grupos y alumnos",
      "Bitácora de incidencias (hasta 5 registros)",
      "Todas las herramientas de IA generativa",
    ],
  },
  oro: {
    id: "oro",
    name: "Plan Oro",
    badgeLabel: "Plan Oro",
    badgeColor: "bg-amber-50 text-amber-900 border-amber-300",
    priceMonthly: 99,
    priceQuarterly: 249,
    priceYearly: 799,
    creditsPerMonth: 100,
    historyDays: 90,
    historyLabel: "3 meses",
    bitacoraLimit: 15,
    allowGroups: true,
    allowBitacora: true,
    allowClassTracking: true,
    allowEvaluationFormat: false,
    allowContinuousEvaluation: false,
    description: "Recomendado para docentes con múltiples grupos que necesitan seguimiento de clases.",
    features: [
      "100 créditos cada mes",
      "Historial de guardado: 3 meses",
      "Seguimiento de clases de proyectos",
      "Bitácora de incidencias (hasta 15 registros)",
      "Registrar grupos y alumnos ilimitados",
    ],
  },
  platino: {
    id: "platino",
    name: "Plan Platino",
    badgeLabel: "Plan Platino",
    badgeColor: "bg-purple-50 text-purple-900 border-purple-300",
    priceMonthly: 149,
    priceQuarterly: 399,
    priceYearly: 999,
    creditsPerMonth: 300,
    historyDays: 365,
    historyLabel: "12 meses",
    bitacoraLimit: Infinity,
    allowGroups: true,
    allowBitacora: true,
    allowClassTracking: true,
    allowEvaluationFormat: true,
    allowContinuousEvaluation: true,
    description: "Acceso total sin restricciones, con evaluación continua y máxima capacidad de créditos.",
    features: [
      "300 créditos cada mes",
      "Historial de guardado: 12 meses",
      "Formato de Evaluación (Google Sheets / Excel)",
      "Evaluación Continua automatizada",
      "Bitácora de incidencias ILIMITADA",
      "Seguimiento de clases de proyectos",
    ],
  },
};

export const CREDIT_COSTS: Record<CreditActionType, number> = {
  disenar_planeacion: 10,
  adecuacion_curricular: 0,
  disenar_examenes: 10,
  programa_analitico: 10,
  hoja_trabajo: 5,
  instrumento_evaluacion: 5,
  modificar_planeacion: 5,
  crear_contenidos: 5,
  asistente_chatbot: 2,
  sugerir_contenidos: 2,
};

export const CREDIT_ACTIONS_INFO: Record<CreditActionType, { cost: number; label: string; description: string }> = {
  disenar_planeacion: { 
    cost: 10, 
    label: "Diseñar planeación", 
    description: "Genera la secuencia didáctica completa con Gemini" 
  },
  adecuacion_curricular: { 
    cost: 0, 
    label: "Adecuación curricular", 
    description: "Incluida en el diseño de planeación sin costo adicional" 
  },
  disenar_examenes: { 
    cost: 10, 
    label: "Diseñar exámenes", 
    description: "Genera examen con reactivos diagnósticos/trimestrales y clave" 
  },
  programa_analitico: { 
    cost: 10, 
    label: "Programa analítico", 
    description: "Estructura el programa analítico integrado y codiseño" 
  },
  hoja_trabajo: { 
    cost: 5, 
    label: "Hoja de trabajo", 
    description: "Genera ejercicios imprimibles para los alumnos" 
  },
  instrumento_evaluacion: { 
    cost: 5, 
    label: "Instrumento de evaluación", 
    description: "Genera rúbrica, lista de cotejo o escala estimativa" 
  },
  modificar_planeacion: { 
    cost: 5, 
    label: "Modificar planeación con IA", 
    description: "Reajusta la secuencia didáctica con instrucciones pedagógicas" 
  },
  crear_contenidos: { 
    cost: 5, 
    label: "Crear contenidos", 
    description: "Diseña nuevo Contenido y PDA de codiseño curricular" 
  },
  asistente_chatbot: { 
    cost: 2, 
    label: "Asistente ChatBot", 
    description: "Consulta y edición interactiva con el asistente" 
  },
  sugerir_contenidos: { 
    cost: 2, 
    label: "Sugerir contenidos", 
    description: "Sugiere contenidos y PDAs sintéticos según la problemática" 
  },
};

// ==================== PAQUETES DE RECARGA DE CRÉDITOS ====================
export const CREDIT_PACKAGES: import("../types").CreditPackage[] = [
  {
    id: "pack_30",
    name: "Paquete Básico",
    credits: 30,
    price: 29,
    savings: "",
    description: "Ideal para 3 proyectos o planeaciones completas inmediatas.",
  },
  {
    id: "pack_80",
    name: "Paquete Docente Pro",
    credits: 80,
    price: 69,
    popular: true,
    savings: "Ahorra 20%",
    description: "Para 8 planeaciones didácticas, exámenes o instrumentos.",
  },
  {
    id: "pack_200",
    name: "Paquete Trimestral",
    credits: 200,
    price: 149,
    savings: "Ahorra 35%",
    description: "Excelente para cubrir todo un trimestre académico con holgura.",
  },
  {
    id: "pack_500",
    name: "Megapack Institucional",
    credits: 500,
    price: 299,
    savings: "Ahorra 50%",
    description: "Máxima capacidad para múltiples asignaturas, grupos y exámenes.",
  },
];

export const getPlanPrice = (plan: PlanTier, cycle: BillingCycle = "mensual"): number => {
  const cfg = PLAN_CONFIGS[plan];
  if (!cfg) return 0;
  if (cycle === "anual") return cfg.priceYearly;
  if (cycle === "trimestral") return cfg.priceQuarterly;
  return cfg.priceMonthly;
};

export const getPlanPeriodLabel = (cycle: BillingCycle = "mensual"): string => {
  if (cycle === "anual") return "año";
  if (cycle === "trimestral") return "3 meses";
  return "mes";
};

export const PLANS_CONFIG = PLAN_CONFIGS;

const STORAGE_KEY = "nem_user_subscription";

export const getInitialSubscription = (): UserSubscription => {
  return {
    plan: "gratuito",
    credits: 20,
    billingCycle: "mensual",
    planStartDate: new Date().toISOString(),
    lastCreditRenewalDate: new Date().toISOString(),
    historyDays: 7,
  };
};

export const loadUserSubscription = (): UserSubscription => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.plan && PLAN_CONFIGS[parsed.plan as PlanTier]) {
        return parsed as UserSubscription;
      }
    }
  } catch (e) {
    console.error("Error reading subscription from localStorage:", e);
  }
  const initial = getInitialSubscription();
  saveUserSubscription(initial);
  return initial;
};

export const saveUserSubscription = (sub: UserSubscription): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sub));
  } catch (e) {
    console.error("Error saving subscription:", e);
  }
};

export const saveSubscriptionToStorage = saveUserSubscription;

export const hasEnoughCredits = (action: CreditActionType, currentCredits: number): boolean => {
  const cost = CREDIT_COSTS[action] ?? 0;
  return currentCredits >= cost;
};

export const deductCreditsFromState = (
  param1: UserSubscription | CreditActionType,
  param2?: CreditActionType | UserSubscription
): { success: boolean; updatedSub: UserSubscription; newSubscription: UserSubscription; required: number; current: number } => {
  let sub: UserSubscription;
  let action: CreditActionType;

  if (typeof param1 === "string") {
    action = param1 as CreditActionType;
    sub = (param2 as UserSubscription) || loadUserSubscription();
  } else {
    sub = param1 as UserSubscription;
    action = param2 as CreditActionType;
  }

  const cost = CREDIT_COSTS[action] ?? 0;
  if (!sub || sub.credits < cost) {
    const fallback = sub || getInitialSubscription();
    return {
      success: false,
      updatedSub: fallback,
      newSubscription: fallback,
      required: cost,
      current: sub ? sub.credits : 0,
    };
  }

  const newCredits = Math.max(0, sub.credits - cost);
  const updated: UserSubscription = {
    ...sub,
    credits: newCredits,
  };
  saveUserSubscription(updated);
  return {
    success: true,
    updatedSub: updated,
    newSubscription: updated,
    required: cost,
    current: newCredits,
  };
};

export const upgradeUserPlan = (
  newPlan: PlanTier,
  billingCycle: BillingCycle = "mensual",
  currentSub?: UserSubscription
): UserSubscription => {
  const baseSub = currentSub || loadUserSubscription();
  const planCfg = PLAN_CONFIGS[newPlan];
  const newCredits = planCfg.creditsPerMonth;
  const updated: UserSubscription = {
    ...baseSub,
    plan: newPlan,
    credits: newCredits,
    billingCycle,
    planStartDate: new Date().toISOString(),
    lastCreditRenewalDate: new Date().toISOString(),
    historyDays: planCfg.historyDays,
  };
  saveUserSubscription(updated);
  return updated;
};

export const updateUserPlan = (
  currentSub: UserSubscription,
  newPlan: PlanTier,
  billingCycle: BillingCycle = "mensual"
): UserSubscription => {
  return upgradeUserPlan(newPlan, billingCycle, currentSub);
};

export const addExtraCredits = (
  amount: number,
  currentSub: UserSubscription
): UserSubscription => {
  const updated: UserSubscription = {
    ...currentSub,
    credits: currentSub.credits + amount,
  };
  saveUserSubscription(updated);
  return updated;
};

export const checkFeatureAccess = (
  feature: "groups" | "bitacora" | "classTracking" | "evaluationFormat" | "continuousEvaluation",
  plan: PlanTier
): { allowed: boolean; requiredPlan: PlanTier; message: string } => {
  const cfg = PLAN_CONFIGS[plan];

  switch (feature) {
    case "groups":
      if (!cfg.allowGroups) {
        return {
          allowed: false,
          requiredPlan: "basico",
          message: "El registro y administración de grupos está disponible desde el Plan Básico en adelante.",
        };
      }
      return { allowed: true, requiredPlan: "basico", message: "" };

    case "bitacora":
      if (!cfg.allowBitacora) {
        return {
          allowed: false,
          requiredPlan: "basico",
          message: "La Bitácora de Incidencias Escolares está disponible desde el Plan Básico en adelante.",
        };
      }
      return { allowed: true, requiredPlan: "basico", message: "" };

    case "classTracking":
      if (!cfg.allowClassTracking) {
        return {
          allowed: false,
          requiredPlan: "oro",
          message: "El Seguimiento de Clases es una función exclusiva para el Plan Oro y Plan Platino.",
        };
      }
      return { allowed: true, requiredPlan: "oro", message: "" };

    case "evaluationFormat":
      if (!cfg.allowEvaluationFormat) {
        return {
          allowed: false,
          requiredPlan: "platino",
          message: "El Formato de Evaluación (Google Sheets / Excel) es exclusivo del Plan Platino.",
        };
      }
      return { allowed: true, requiredPlan: "platino", message: "" };

    case "continuousEvaluation":
      if (!cfg.allowContinuousEvaluation) {
        return {
          allowed: false,
          requiredPlan: "platino",
          message: "La Evaluación Continua automatizada es una función exclusiva del Plan Platino.",
        };
      }
      return { allowed: true, requiredPlan: "platino", message: "" };

    default:
      return { allowed: true, requiredPlan: "gratuito", message: "" };
  }
};

export const checkBitacoraLimit = (
  currentCount: number,
  plan: PlanTier
): { allowed: boolean; maxAllowed: number; requiredPlan: PlanTier; message: string } => {
  const cfg = PLAN_CONFIGS[plan];

  if (!cfg.allowBitacora) {
    return {
      allowed: false,
      maxAllowed: 0,
      requiredPlan: "basico",
      message: "La Bitácora de Incidencias no está disponible en la Prueba Gratuita.",
    };
  }

  if (currentCount >= cfg.bitacoraLimit) {
    const nextPlan: PlanTier = plan === "basico" ? "oro" : "platino";
    return {
      allowed: false,
      maxAllowed: cfg.bitacoraLimit,
      requiredPlan: nextPlan,
      message: `Has alcanzado el límite máximo de ${cfg.bitacoraLimit} registros de bitácora permitidos en tu ${cfg.name}.`,
    };
  }

  return {
    allowed: true,
    maxAllowed: cfg.bitacoraLimit,
    requiredPlan: plan,
    message: "",
  };
};
