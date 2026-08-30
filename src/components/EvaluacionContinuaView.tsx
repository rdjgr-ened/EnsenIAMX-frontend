import React, { useState, useEffect } from "react";
import { CompletePlan, UserSubscription, PlanTier } from "../types";
import { ArrowLeft, Save, Loader2, CheckCircle2 } from "lucide-react";
import { saveEvaluacionContinua, getEvaluacionContinua, isSupabaseConfigured } from "../utils/supabaseClient";

interface EvaluacionContinuaProps {
  planeacionesGuardadas: CompletePlan[];
  gruposGuardados: any[];
  onBack: () => void;
  subscription?: UserSubscription;
}

export default function EvaluacionContinuaView({
  planeacionesGuardadas,
  gruposGuardados,
  onBack,
  subscription
}: EvaluacionContinuaProps) {
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");
  const [evalData, setEvalData] = useState<any>({});
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // 1. Cargar datos desde Supabase al seleccionar un grupo
  useEffect(() => {
    if (!selectedGroupId || !isSupabaseConfigured) return;
    
    const userProfileStr = localStorage.getItem("nem_secundaria_profile");
    const userId = userProfileStr ? JSON.parse(userProfileStr)?.id : null;
    if (!userId) return;

    getEvaluacionContinua(userId, subscription?.plan || "gratuito", selectedGroupId)
      .then(data => {
        if (data && data.length > 0) {
          // Si ya hay datos en la nube, los mostramos
          setEvalData(data[0].contenido_json);
        } else {
          // Si es nuevo, inicializamos vacío
          setEvalData({ groupId: selectedGroupId, alumnos: [] });
        }
      });
  }, [selectedGroupId, subscription]);

  // 2. Función de guardado MANUAL (Adiós errores de guardado automático)
  const handleSaveToCloud = async () => {
    if (!selectedGroupId || !isSupabaseConfigured) return;
    
    const userProfileStr = localStorage.getItem("nem_secundaria_profile");
    const userId = userProfileStr ? JSON.parse(userProfileStr)?.id : null;
    if (!userId) return;

    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await saveEvaluacionContinua({
        grupo_id: selectedGroupId,
        user_id: userId,
        contenido_json: evalData
      }, subscription?.plan || "gratuito");
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error al guardar:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ENCABEZADO Y CONTROLES */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <h2 className="font-black text-slate-800 text-lg uppercase tracking-wider">Evaluación Continua</h2>
          </div>
          <button onClick={onBack} className="px-3 py-2 rounded-xl text-xs font-black uppercase text-slate-700 hover:bg-slate-100 transition flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" /><span>Volver</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">1. Selecciona el Grupo</label>
            <select
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium outline-none"
            >
              <option value="">-- Elige un grupo --</option>
              {gruposGuardados.map(g => (
                <option key={g.id} value={g.id}>{g.grado} {g.grupo} - {g.disciplina}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end justify-end">
            <button
              onClick={handleSaveToCloud}
              disabled={!selectedGroupId || isSaving}
              className={`px-8 py-3.5 font-extrabold text-sm uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 shadow-md ${
                saveSuccess ? "bg-emerald-600 text-white" : "bg-mex-maroon hover:bg-mex-maroon/90 text-white disabled:bg-slate-300"
              }`}
            >
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : saveSuccess ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
              <span>{isSaving ? "Guardando..." : saveSuccess ? "¡Guardado en la Nube!" : "Guardar Calificaciones"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* AQUÍ VA EL CÓDIGO DE TU TABLA DE CALIFICACIONES (El que ya tienes en OrganizadorEscolar) */}
      {selectedGroupId && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           {/* Pega aquí la interfaz de la tabla que me mostraste en la imagen anterior */}
           <p className="text-center text-slate-500 font-bold py-10">Aquí va tu tabla de alumnos...</p>
        </div>
      )}
    </div>
  );
}