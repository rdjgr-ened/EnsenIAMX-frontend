import React from "react";
import { CompletePlan } from "../types";
import { ArrowRight, FolderKanban } from "lucide-react";

interface HistorySidebarProps {
  plans: CompletePlan[];
  onSelectPlan: (plan: CompletePlan) => void;
  onDeletePlan: (id: string) => void;
  currentPlanId?: string;
  onOpenOrganizador?: (folder?: "planeaciones" | "grupos" | "bitacora" | "seguimiento" | "evaluacion") => void;
}

export default function HistorySidebar({ plans, onSelectPlan, onDeletePlan, currentPlanId, onOpenOrganizador }: HistorySidebarProps) {
  return (
    <div id="history-sidebar" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col space-y-4">
      {/* Prominent Organizer Access Card */}
      {onOpenOrganizador && (
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => onOpenOrganizador("planeaciones")}
            className="w-full p-4 bg-gradient-to-br from-mex-maroon via-[#541221] to-[#1f2e3d] hover:opacity-95 text-white rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-between transition shadow-md cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
                <FolderKanban className="w-6 h-6 text-mex-gold group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-left">
                <span className="block text-sm font-black text-white tracking-wide">Organizador Escolar</span>
                <span className="text-[10px] text-mex-gold font-bold block mt-0.5">Gestión y Archivero Escolar</span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-mex-gold group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
            <ul className="text-xs text-slate-700 font-bold space-y-1.5">
              <li 
                onClick={() => onOpenOrganizador("planeaciones")}
                className="flex items-center justify-between hover:text-mex-maroon cursor-pointer transition p-1 rounded hover:bg-white"
              >
                <span>1. Mis Planeaciones</span>
              </li>
              <li 
                onClick={() => onOpenOrganizador("grupos")}
                className="flex items-center justify-between hover:text-blue-600 cursor-pointer transition p-1 rounded hover:bg-white"
              >
                <span>2. Mis Grupos</span>
              </li>
              <li 
                onClick={() => onOpenOrganizador("bitacora")}
                className="flex items-center justify-between hover:text-rose-600 cursor-pointer transition p-1 rounded hover:bg-white"
              >
                <span>3. Bitácora de Incidencias</span>
              </li>
              <li 
                onClick={() => onOpenOrganizador("seguimiento")}
                className="flex items-center justify-between hover:text-emerald-600 cursor-pointer transition p-1 rounded hover:bg-white"
              >
                <span>4. Seguimiento de Clases</span>
              </li>
              <li 
                onClick={() => onOpenOrganizador("evaluacion")}
                className="flex items-center justify-between hover:text-amber-600 cursor-pointer transition p-1 rounded hover:bg-white"
              >
                <span>5. Evaluación Continua</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

