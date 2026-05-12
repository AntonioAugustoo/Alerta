import { Patient } from "@/types";

export function usePatients(): { patients: Patient[]; isLoading: boolean } {
  return { patients: [], isLoading: false };
}