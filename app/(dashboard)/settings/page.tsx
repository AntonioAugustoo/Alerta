"use client";

import { SettingsForm } from "@/components/settings/SettingsForm";
import { useUnit } from "@/lib/unit-context";

export default function SettingsPage() {
  const { setUnitName } = useUnit();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-slate-800 font-black text-2xl">
          Configurações do Sistema
        </h2>
        <p className="text-slate-400 text-sm">
          Gerencie as preferências da unidade e relatórios de monitoramento
        </p>
      </div>
      <SettingsForm onUnitNameChange={setUnitName} />
    </div>
  );
}