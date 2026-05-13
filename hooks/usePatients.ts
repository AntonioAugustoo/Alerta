"use client";

import { useState, useEffect } from "react";
import type { Patient, DashboardMetrics } from "@/types";
import { MOCK_PATIENTS, calculateMetrics } from "@/lib/mock-data";

interface UsePatientsReturn {
  patients: Patient[];
  metrics: DashboardMetrics;
  isLoading: boolean;
}

export function usePatients(): UsePatientsReturn {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Dados mockados para demonstração na feira
    // A integração real acontece via useFallDetection (alertas do ESP32)
    const load = () => {
      setPatients(MOCK_PATIENTS);
      setIsLoading(false);
    };

    load();

    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  return {
    patients,
    metrics: calculateMetrics(patients),
    isLoading,
  };
}