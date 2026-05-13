// ============================================================
// DOMÍNIO: PACIENTE (mock para demonstração)
// ============================================================

export type PatientStatus =
  | "moving"
  | "stopped"
  | "fall_detected"
  | "offline";

export type RiskLevel = "low" | "medium" | "high";

export interface Patient {
  id: string;
  name: string;
  ward: string;
  room: string;
  status: PatientStatus;
  riskLevel: RiskLevel;
  deviceId: string;
  battery: number;
  avatarUrl?: string;
}

// ============================================================
// DOMÍNIO: ALERTA DE QUEDA
// ============================================================

export type AlertStatus =
  | "pending"
  | "responded"
  | "dismissed";

export interface FallAlert {
  id: string;
  patientId: string;
  patientName: string;
  location: string;       // "Ala B • Quarto 102"
  detectedAt: Date;
  status: AlertStatus;
  respondedBy?: string;
  respondedAt?: Date;
}

// ============================================================
// DOMÍNIO: EVENTO DO SENSOR (vindo do Flask)
// ============================================================

export type SensorEventType = "INFO" | "ALERTA" | "COMANDO";


export interface SensorLog {
  hora: string;           // "14:23:01"
  tipo: SensorEventType;
  msg: string;            // "🚨 QUEDA DETECTADA: ..."
}

/**
 * Formato que o Flask recebe do ESP32 em POST /api/sensor
 */
export interface SensorPayload {
  status: string;         // "QUEDA_CONFIRMADA", "NORMAL", etc.
  accMagnitude: number;   // magnitude da aceleração em m/s²
  checkpoint: number;     // ID sequencial do pacote
}

// ============================================================
// DOMÍNIO: MÉTRICAS DO PAINEL
// ============================================================

export interface DashboardMetrics {
  totalOnline: number;
  inMotion: number;
  falls: number;
}

// ============================================================
// DOMÍNIO: NOTIFICAÇÕES DA BARRA INFERIOR
// ============================================================

export type NotificationType = "maintenance" | "firmware" | "battery";

export interface DeviceNotification {
  id: string;
  type: NotificationType;
  message: string;
  deviceId: string;
  scheduledFor?: string;
}