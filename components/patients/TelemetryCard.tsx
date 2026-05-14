import { Wifi, Battery, Timer, AlertTriangle } from "lucide-react";
import type { Patient } from "@/types";

interface TelemetryCardProps {
  patient: Patient;
}

const statusConfig = {
  moving: {
    label: "Em Movimento",
    description: "O paciente está caminhando pela ala.",
    icon: "🚶",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  stopped: {
    label: "Parado",
    description: "O paciente está sem movimento.",
    icon: "🧍",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  fall_detected: {
    label: "Queda Detectada",
    description: "Alerta ativo — resposta necessária.",
    icon: "🚨",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-100",
  },
  offline: {
    label: "Offline",
    description: "Colete sem conexão Wi-Fi.",
    icon: "📵",
    color: "text-slate-500",
    bg: "bg-slate-50",
    border: "border-slate-100",
  },
};

function WifiStrength({ signal }: { signal: number }) {
  // Converte dBm em qualidade descritiva
  const quality =
    signal >= -60
      ? { label: "Excelente", color: "text-emerald-500" }
      : signal >= -70
      ? { label: "Bom", color: "text-emerald-400" }
      : signal >= -80
      ? { label: "Fraco", color: "text-amber-500" }
      : { label: "Crítico", color: "text-red-500" };

  return (
    <div className="flex flex-col items-center gap-1">
      <Wifi size={22} className={quality.color} />
      <span className={`text-xs font-semibold ${quality.color}`}>
        {signal} dBm
      </span>
      <span className="text-[10px] text-slate-400 uppercase tracking-wide">
        {quality.label}
      </span>
    </div>
  );
}

function BatteryLevel({ level }: { level: number }) {
  const isCritical = level < 20;
  const color = isCritical ? "text-red-500" : "text-slate-700";

  return (
    <div className="flex flex-col items-center gap-1">
      <Battery
        size={22}
        className={isCritical ? "text-red-500" : "text-slate-600"}
      />
      <span className={`text-2xl font-black tabular-nums ${color}`}>
        {level}%
      </span>
      {isCritical && (
        <span className="text-[10px] text-red-500 font-semibold uppercase tracking-wide">
          Crítico
        </span>
      )}
    </div>
  );
}

export function TelemetryCard({ patient }: TelemetryCardProps) {
  const status = statusConfig[patient.status];

  // Mock de telemetria — será substituído por dados reais do Flask
  const telemetry = {
    timeInActivity: "00:45:12",
    fallsThisMonth: 0,
    lastUpdate: "Agora",
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-6">

      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wifi size={16} className="text-slate-400" />
          <span className="text-sm font-semibold text-slate-700">
            Telemetria em Tempo Real
          </span>
        </div>
        <span className="text-[11px] text-slate-400 uppercase tracking-wide">
          Atualizado: {telemetry.lastUpdate}
        </span>
      </div>

      {/* Bateria + Wi-Fi */}
      <div className="flex items-center justify-around bg-slate-50 rounded-xl p-4 border border-slate-100">
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">
            Bateria
          </span>
          <BatteryLevel level={patient.battery} />
        </div>

        <div className="w-px h-12 bg-slate-200" />

        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">
            Sinal Wi-Fi
          </span>
          <WifiStrength signal={-65} />
        </div>
      </div>

      {/* Tempo na atividade + quedas */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2 text-slate-500">
            <Timer size={15} />
            <span className="text-xs">Tempo na atividade atual</span>
          </div>
          <span className="text-sm font-bold text-slate-800 tabular-nums">
            {telemetry.timeInActivity}
          </span>
        </div>

        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2 text-slate-500">
            <AlertTriangle size={15} />
            <span className="text-xs">Quedas registradas (mês)</span>
          </div>
          <span
            className={`text-sm font-bold tabular-nums ${
              telemetry.fallsThisMonth > 0 ? "text-red-500" : "text-slate-800"
            }`}
          >
            {telemetry.fallsThisMonth}
          </span>
        </div>
      </div>

      {/* Status de atividade */}
      <div
        className={`rounded-xl p-4 border ${status.bg} ${status.border} flex items-center gap-4`}
      >
        <span className="text-3xl">{status.icon}</span>
        <div>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-0.5">
            Status de Atividade
          </p>
          <p className={`text-xl font-black ${status.color}`}>
            {status.label}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {status.description}
          </p>
        </div>
      </div>

    </div>
  );
}