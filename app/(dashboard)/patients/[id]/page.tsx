"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { MOCK_PATIENTS } from "@/lib/mock-data";
import { PatientHeader } from "@/components/patients/PatientHeader";
import { TelemetryCard } from "@/components/patients/TelemetryCard";
import { MedicalRecordCard } from "@/components/patients/MedicalRecordCard";
import { MedicalRecordModal } from "@/components/patients/MedicalRecordModal";
import type { MedicalRecord } from "@/types";

export default function PatientPage() {
  const { id } = useParams<{ id: string }>();
  const patient = MOCK_PATIENTS.find((p) => p.id === id);

  const [medicalRecord, setMedicalRecord] = useState<MedicalRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!patient) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Paciente não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 h-full">

      {/* Modal de ficha médica */}
      {isModalOpen && (
        <MedicalRecordModal
          patient={patient}
          existingRecord={medicalRecord}
          onSave={(record) => setMedicalRecord(record)}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Cabeçalho do paciente */}
      <PatientHeader
        patient={patient}
        onEditMedicalRecord={() => setIsModalOpen(true)}
      />

      {/* Conteúdo principal — telemetria + prontuário */}
      <div className="grid grid-cols-2 gap-6 flex-1">
        <TelemetryCard patient={patient} />
        <MedicalRecordCard
          record={medicalRecord}
          onAdd={() => setIsModalOpen(true)}
        />
      </div>

    </div>
  );
}