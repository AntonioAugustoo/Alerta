
export type PatientStatus = "moving" | "stopped" | "fall_detected" | "offline";

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
  wifiSignal: number;
}