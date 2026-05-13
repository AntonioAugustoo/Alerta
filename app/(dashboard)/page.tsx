"use client";

import { useState } from "react";
import { usePatients } from "@/hooks/usePatients";
import { useFallDetection } from "@/hooks/useFallDetection";
import { PatientCard } from "@/components/dashboard/PatientCard";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { FallAlertModal } from "@/components/dashboard/FallAlertModal";
import { Search, LayoutGrid, List } from "lucide-react";
import { MOCK_NOTIFICATIONS } from "@/lib/mock-data";

const notificationIcons: Record<string, string> = {
  battery: "🔋",
  firmware: "↻",
  maintenance: "🔔",
};

export default function DashboardPage() {
  const { patients, metrics, isLoading } = usePatients();
  const { activeAlert, respondToAlert, dismissAlert } = useFallDetection();
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.deviceId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full gap-6">

      {/* POP-UP DE QUEDA — sobrepõe tudo quando ativo */}
      {activeAlert && (
        <FallAlertModal
          alert={activeAlert}
          onRespond={respondToAlert}
          onDismiss={dismissAlert}
        />
      )}

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-slate-800 font-semibold text-lg">
          Painel Geral — Monitoramento em Tempo Real
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm">
            <Search size={14} className="text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar paciente ou ID do colete..."
              className="text-sm text-slate-700 outline-none w-64 placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 transition-colors ${
                viewMode === "grid"
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-50"
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 transition-colors ${
                viewMode === "list"
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-50"
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* BOTÃO DE TESTE — remover antes da apresentação */}
      {process.env.NODE_ENV === "development" && (
        <button
          onClick={() => {
            fetch("http://localhost:8080/api/sensor", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                status: "QUEDA_CONFIRMADA",
                accMagnitude: 24.3,
                checkpoint: 99,
              }),
            }).catch(() => {
              console.warn("Flask offline — testando modal diretamente");
            });
          }}
          className="self-start bg-red-100 hover:bg-red-200 text-red-600 text-xs font-medium px-3 py-1.5 rounded-lg border border-red-200"
        >
          🧪 Simular Queda (dev only)
        </button>
      )}

      {/* MÉTRICAS */}
      <div className="flex items-center gap-4">
        <MetricCard
          label="Total Online"
          value={metrics.totalOnline}
          highlight="default"
        />
        <MetricCard
          label="Em Movimento"
          value={metrics.inMotion}
          highlight="success"
        />
        <MetricCard
          label="Quedas"
          value={metrics.falls}
          highlight={metrics.falls > 0 ? "danger" : "success"}
        />
      </div>

      {/* GRID DE PACIENTES */}
      {isLoading ? (
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm p-4 h-40 animate-pulse border border-slate-100"
            />
          ))}
        </div>
      ) : filteredPatients.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-slate-400 text-sm">
            Nenhum paciente encontrado para &quot;{search}&quot;
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-3 gap-4"
              : "flex flex-col gap-3"
          }
        >
          {filteredPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      )}

      {/* BARRA DE NOTIFICAÇÕES */}
      <div className="mt-auto bg-slate-900 rounded-xl px-5 py-3 flex items-center gap-6">
        <span className="text-slate-400 text-xs font-medium uppercase tracking-widest flex-shrink-0">
          🔔 Próximas Manutenções
        </span>
        <div className="flex items-center gap-6 flex-1 overflow-hidden">
          {MOCK_NOTIFICATIONS.map((notif) => (
            <span
              key={notif.id}
              className="text-slate-300 text-xs flex items-center gap-1 whitespace-nowrap"
            >
              {notificationIcons[notif.type]} {notif.message}
            </span>
          ))}
        </div>
        <button className="bg-sky-500 hover:bg-sky-600 transition-colors text-white text-xs font-medium px-4 py-2 rounded-lg flex-shrink-0">
          Ver Todos os Dispositivos
        </button>
      </div>

    </div>
  );
}
