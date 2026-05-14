import type {
  Patient,
  DashboardMetrics,
  DeviceNotification,
} from "@/types";

// ============================================================
// PACIENTES
// ============================================================

export const MOCK_PATIENTS: Patient[] = [
  {
    id: "patient-001",
    name: "Carlos Eduardo",
    ward: "Ala B",
    room: "Quarto 102",
    status: "moving",
    riskLevel: "medium",
    deviceId: "#C2044",
    battery: 83,
    bedId: "B102-A",
  },
  {
    id: "patient-002",
    name: "Maria Helena",
    ward: "Ala A",
    room: "Quarto 205",
    status: "stopped",
    riskLevel: "low",
    deviceId: "#AA812",
    battery: 45,
    bedId: "A205-B",
  },
  {
    id: "patient-003",
    name: "Roberto Silva",
    ward: "Ala B",
    room: "Quarto 108",
    status: "moving",
    riskLevel: "high",
    deviceId: "#B2301",
    battery: 98,
    bedId: "B108-C",
  },
  {
    id: "patient-004",
    name: "Ana Beatriz",
    ward: "Ala C",
    room: "Quarto 312",
    status: "stopped",
    riskLevel: "high",
    deviceId: "#DB022",
    battery: 12, // ⚠️ crítico — vai aparecer em vermelho na UI
    bedId: "C312-D",
  },
  {
    id: "patient-005",
    name: "Helena Ramos",
    ward: "Ala A",
    room: "Quarto 202",
    status: "stopped",
    riskLevel: "low",
    deviceId: "#LS521",
    battery: 82,
    bedId: "A202-E",
  },
];

// ============================================================
// MÉTRICAS DO PAINEL
// ============================================================

/**
 * Calculado dinamicamente a partir dos pacientes.
 * Quando o fetch real chegar, essa função recebe
 * o array do banco e devolve as métricas — sem mudar nada nos componentes.
 */
export function calculateMetrics(patients: Patient[]): DashboardMetrics {
  return {
    totalOnline: patients.filter((p) => p.status !== "offline").length,
    inMotion: patients.filter((p) => p.status === "moving").length,
    falls: patients.filter((p) => p.status === "fall_detected").length,
  };
}

// ============================================================
// NOTIFICAÇÕES DA BARRA INFERIOR
// ============================================================

export const MOCK_NOTIFICATIONS: DeviceNotification[] = [
  {
    id: "notif-001",
    type: "battery",
    message: "Trocar bateria em 3h",
    deviceId: "#C2044",
  },
  {
    id: "notif-002",
    type: "firmware",
    message: "Firmware v2.4 — Update agendado para 02:10",
    deviceId: "#C2044",
    scheduledFor: "02:10",
  },
];