import { Patient } from "@/types";

interface PatientCardProps {
  patient: Patient;
}

export function PatientCard({ patient }: PatientCardProps) {
  return <div>{patient.name}</div>;
}