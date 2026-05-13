"use client";

import { useState, useEffect, useCallback } from "react";
import type { SensorLog, FallAlert } from "@/types";

interface UseFallDetectionReturn {
  activeAlert: FallAlert | null;
  dismissAlert: () => void;
  respondToAlert: () => void;
}

// Detecta se a mensagem do Flask é um evento de queda
function isFallEvent(log: SensorLog): boolean {
  return log.tipo === "ALERTA" && log.msg.toUpperCase().includes("QUEDA");
}

export function useFallDetection(): UseFallDetectionReturn {
  const [activeAlert, setActiveAlert] = useState<FallAlert | null>(null);
  const [lastChecked, setLastChecked] = useState<string | null>(null);

  const checkForFall = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8080/api/logs");
      if (!response.ok) return;

      const logs: SensorLog[] = await response.json();

      // Pega o log mais recente
      const latest = logs[0];
      if (!latest) return;

      // Evita disparar o mesmo alerta duas vezes
      if (latest.hora === lastChecked) return;

      if (isFallEvent(latest)) {
        setLastChecked(latest.hora);
        setActiveAlert({
          id: `alert-${Date.now()}`,
          patientId: "patient-001",       // mock — 1 colete na demo
          patientName: "Carlos Eduardo",   // mock — paciente da demo
          location: "Ala B • Quarto 102", // mock
          detectedAt: new Date(),
          status: "pending",
        });
      }
    } catch {
      // Flask offline — falha silenciosa, não quebra o painel
    }
  }, [lastChecked]);

  useEffect(() => {
    // Polling a cada 2s — alertas de queda exigem resposta rápida
    const interval = setInterval(checkForFall, 2000);
    return () => clearInterval(interval);
  }, [checkForFall]);

  const dismissAlert = useCallback(() => {
    setActiveAlert((prev) =>
      prev ? { ...prev, status: "dismissed" } : null
    );
    setTimeout(() => setActiveAlert(null), 300);
  }, []);

  const respondToAlert = useCallback(() => {
    setActiveAlert((prev) =>
      prev ? { ...prev, status: "responded", respondedAt: new Date() } : null
    );
    setTimeout(() => setActiveAlert(null), 300);
  }, []);

  return { activeAlert, dismissAlert, respondToAlert };
}