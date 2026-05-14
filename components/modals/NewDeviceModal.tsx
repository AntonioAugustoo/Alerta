"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Cpu } from "lucide-react";
import type { RiskLevel } from "@/types";

interface NewDeviceModalProps {
  onClose?: () => void;
}

const riskOptions: { value: RiskLevel; label: string; color: string }[] = [
  { value: "low", label: "Baixo Risco", color: "bg-emerald-500" },
  { value: "medium", label: "Médio Risco", color: "bg-amber-400" },
  { value: "high", label: "Alto Risco", color: "bg-red-500" },
];

export function NewDeviceModal({ onClose }: NewDeviceModalProps) {
  const router = useRouter();
  const [mac, setMac] = useState("");
  const [chipId, setChipId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [riskLevel, setRiskLevel] = useState<RiskLevel>("low");

  function handleClose() {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  }

  function handleSubmit() {
    console.log({ mac, chipId, patientName, riskLevel });
    handleClose();
  }

  const isValid = mac.trim() !== "" && patientName.trim() !== "";

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

          {/* Cabeçalho */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="text-slate-800 font-bold text-base">
              Vincular Novo ALERTA
            </h2>
            <button
              onClick={handleClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Corpo */}
          <div className="px-6 py-5 flex flex-col gap-5">

            {/* MAC Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600">
                Identificador Principal (MAC)
              </label>
              <input
                type="text"
                value={mac}
                onChange={(e) => setMac(e.target.value)}
                placeholder="Ex: 24:0A:C4:9A:58:33"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:border-slate-400 transition-colors font-mono"
              />
            </div>

            {/* Chip ID */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600">
                Chip ID
                <span className="text-slate-400 font-normal ml-1">
                  (opcional)
                </span>
              </label>
              <div className="relative">
                <Cpu
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={chipId}
                  onChange={(e) => setChipId(e.target.value)}
                  placeholder="ID do chip"
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:border-slate-400 transition-colors"
                />
              </div>
            </div>

            {/* Nome do paciente */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600">
                Nome do Paciente
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Digite o nome para vincular ao colete"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:border-slate-400 transition-colors"
              />
            </div>

            {/* Grau de risco */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-slate-600">
                Grau de Risco do Paciente
              </label>
              <div className="flex items-center gap-2">
                {riskOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setRiskLevel(option.value)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                      riskLevel === option.value
                        ? `${option.color} text-white border-transparent`
                        : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
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

          {/* Rodapé */}
          <div className="flex flex-col gap-2 px-6 py-4 border-t border-slate-100">
            <button
              onClick={handleSubmit}
              disabled={!isValid}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                isValid
                  ? "bg-slate-800 hover:bg-slate-700 text-white"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Cpu size={15} />
              Registrar Dispositivo
            </button>
            <p className="text-center text-slate-400 text-xs">
              Ao registrar, o dispositivo iniciará o pareamento automaticamente.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
