"use client";

import { useState } from "react";
import { X, Save } from "lucide-react";
import type { MedicalRecord, RiskLevel, Patient } from "@/types";

interface MedicalRecordModalProps {
  patient: Patient;
  existingRecord: MedicalRecord | null;
  onSave: (record: MedicalRecord) => void;
  onClose: () => void;
}

const riskOptions: { value: RiskLevel; label: string; color: string }[] = [
  { value: "low", label: "Baixo", color: "bg-emerald-500" },
  { value: "medium", label: "Médio", color: "bg-amber-400" },
  { value: "high", label: "Alto", color: "bg-red-500" },
];

export function MedicalRecordModal({
  patient,
  existingRecord,
  onSave,
  onClose,
}: MedicalRecordModalProps) {
  const [riskLevel, setRiskLevel] = useState<RiskLevel>(
    existingRecord?.riskLevel ?? "low"
  );
  const [responsible, setResponsible] = useState(
    existingRecord?.responsible ?? ""
  );
  const [observations, setObservations] = useState(
    existingRecord?.observations ?? ""
  );

  function handleSave() {
    onSave({ riskLevel, responsible, observations });
    onClose();
  }

  const initials = patient.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

          {/* Cabeçalho */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="text-slate-800 font-bold text-base">
              Registrar Informações Médicas
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Corpo */}
          <div className="px-6 py-5 flex flex-col gap-5">

            {/* Paciente + grau de risco */}
            <div className="flex items-start justify-between gap-4">

              {/* Paciente */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                  Paciente
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[10px] font-bold">
                      {initials}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    {patient.name}
                  </span>
                </div>
              </div>

              {/* Grau de risco */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                  Grau de Risco
                </span>
                <div className="flex items-center gap-1">
                  {riskOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setRiskLevel(option.value)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        riskLevel === option.value
                          ? `${option.color} text-white border-transparent`
                          : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          riskLevel === option.value
                            ? "bg-white"
                            : option.color
                        }`}
                      />
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Responsável técnico */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600">
                Responsável Técnico
                <span className="text-slate-400 font-normal ml-1">
                  (opcional)
                </span>
              </label>
              <input
                type="text"
                value={responsible}
                onChange={(e) => setResponsible(e.target.value)}
                placeholder="Nome do médico ou enfermeiro chefe"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:border-slate-400 transition-colors"
              />
            </div>

            {/* Observações clínicas */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600">
                Observações Clínicas
              </label>
              <textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Descreva sinais vitais, histórico recente ou recomendações específicas..."
                rows={4}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:border-slate-400 transition-colors resize-none"
              />
            </div>

          </div>

          {/* Rodapé */}
          <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-100">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm text-slate-500 hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition-colors"
            >
              <Save size={14} />
              Salvar Informações
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

