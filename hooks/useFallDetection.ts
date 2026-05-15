"use client";

import { useState, useEffect, useCallback } from "react";
import type { SensorLog, FallAlert } from "@/types";

interface UseFallDetectionReturn {
  activeAlert: FallAlert | null;
  dismissAlert: () => void;
  respondToAlert: () => void;
}

function isFallEvent(log: SensorLog): boolean {
  return log.tipo === "ALERTA" && log.msg.toUpperCase().includes("QUEDA");
}

const MOCK_FALL_ALERT: FallAlert = {
  id: `alert-test`,
  patientId: "patient-001",
  patientName: "Carlos Eduardo",
  location: "Ala B • Quarto 102",
  detectedAt: new Date(),
  status: "pending",
};

export function useFallDetection(): UseFallDetectionReturn {
  const [activeAlert, setActiveAlert] = useState<FallAlert | null>(null);
  const [lastChecked, setLastChecked] = useState<string | null>(null);

  // Listener para teste sem Flask
  useEffect(() => {
    function handleTestAlert() {
      setActiveAlert({ ...MOCK_FALL_ALERT, detectedAt: new Date(), id: `alert-${Date.now()}` });
    }
    window.addEventListener("test-fall-alert", handleTestAlert);
    return () => window.removeEventListener("test-fall-alert", handleTestAlert);
  }, []);

  const checkForFall = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8080/api/logs");
      if (!response.ok) return;
      const logs: SensorLog[] = await response.json();
      const latest = logs[0];
      if (!latest || latest.hora === lastChecked) return;
      if (isFallEvent(latest)) {
        setLastChecked(latest.hora);
        setActiveAlert({
          id: `alert-${Date.now()}`,
          patientId: "patient-001",
          patientName: "Carlos Eduardo",
          location: "Ala B • Quarto 102",
          detectedAt: new Date(),
          status: "pending",
        });
      }
    } catch {
      // Flask offline — falha silenciosa
    }
  }, [lastChecked]);

  useEffect(() => {
    const interval = setInterval(checkForFall, 2000);
    return () => clearInterval(interval);
  }, [checkForFall]);

  const dismissAlert = useCallback(() => {
    setActiveAlert(null);
  }, []);

  const respondToAlert = useCallback(() => {
    setActiveAlert(null);
  }, []);

  return { activeAlert, dismissAlert, respondToAlert };
}