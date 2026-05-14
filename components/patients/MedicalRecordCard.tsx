import { FileText, Plus } from "lucide-react";
import type { MedicalRecord } from "@/types";

interface MedicalRecordCardProps {
  record: MedicalRecord | null;
  onAdd: () => void;
}

const riskConfig = {
  low: {
    label: "Baixo Risco",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-100",
    dot: "bg-emerald-500",
  },
  medium: {
    label: "Médio Risco",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-100",
    dot: "bg-amber-400",
  },
  high: {
    label: "Alto Risco",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-100",
    dot: "bg-red-500",
  },
};

export function MedicalRecordCard({ record, onAdd }: MedicalRecordCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-5">

      {/* Cabeçalho */}
      <div className="flex items-center gap-2">
        <FileText size={16} className="text-slate-400" />
        <span className="text-sm font-semibold text-slate-700">
          Informações do Prontuário
        </span>
      </div>

      {/* Sem ficha — botão de adicionar */}
      {!record ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 py-10">
          <button
            onClick={onAdd}
            className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all hover:scale-105"
          >
            <Plus size={22} className="text-slate-500" />
          </button>
          <p className="text-sm text-slate-400">
            Adicionar Informações Médicas
          </p>
        </div>
      ) : (
        // Com ficha — exibe os dados
        <div className="flex flex-col gap-4">

          {/* Grau de risco */}
          {(() => {
            const risk = riskConfig[record.riskLevel];
            return (
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${risk.bg} ${risk.border}`}
              >
                <div className={`w-2.5 h-2.5 rounded-full ${risk.dot}`} />
                <span className={`text-sm font-bold ${risk.text}`}>
                  {risk.label}
                </span>
              </div>
            );
          })()}

          {/* Responsável técnico */}
          {record.responsible && (
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                Responsável Técnico
              </span>
              <span className="text-sm font-semibold text-slate-700">
                {record.responsible}
              </span>
            </div>
          )}

          {/* Observações clínicas */}
          {record.observations && (
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                Observações Clínicas
              </span>
              <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-xl p-3 border border-slate-100">
                {record.observations}
              </p>
            </div>
          )}

        </div>
      )}

    </div>
  );
}