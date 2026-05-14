"use client";

import Link from "next/link";
import { ArrowLeft, Unlink, Pencil } from "lucide-react";
import type { Patient } from "@/types";

interface PatientHeaderProps {
  patient: Patient;
  onEditMedicalRecord: () => void;
}

const statusConfig = {
  moving: { label: "Online", dot: "bg-emerald-400" },
  stopped: { label: "Online", dot: "bg-emerald-400" },
  fall_detected: { label: "Online", dot: "bg-red-400" },
  offline: { label: "Offline", dot: "bg-slate-400" },
};

export function PatientHeader({ patient, onEditMedicalRecord }: PatientHeaderProps) {
  const status = statusConfig[patient.status];

  return (
    <div className="flex flex-col gap-4">

      {/* Linha superior — voltar + título */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm transition-colors"
        >
          <ArrowLeft size={15} />
          Retornar para o Painel
        </Link>
        <span className="text-slate-400 text-sm font-medium">
          Monitoramento de Colete
        </span>
      </div>

      {/* Linha principal — info do paciente + botões */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-5 flex items-center justify-between">

        {/* Esquerda — badge colete + nome + localização */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-2">
            {/* Badge colete ativo */}
            <div className="flex items-center gap-2">
              <span className="bg-slate-800 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                Colete Ativo: {patient.deviceId}
              </span>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${status.dot} animate-pulse`} />
                <span className="text-xs text-emerald-500 font-medium">
                  {status.label}
                </span>
              </div>
            </div>

            {/* Nome + localização */}
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">
                  {patient.name
                    .split(" ")
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-800">
                  {patient.name}
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Internação: {patient.ward} • {patient.room}
                  {patient.bedId ? ` • ID: ${patient.bedId}` : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Direita — botões de ação */}
        <div className="flex items-center gap-2">
          <button
            onClick={onEditMedicalRecord}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-sm font-medium transition-all"
          >
            <Pencil size={14} />
            Editar Ficha
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 text-sm font-medium transition-all">
            <Unlink size={14} />
            Desvincular Colete
          </button>
        </div>

      </div>
    </div>
  );
}