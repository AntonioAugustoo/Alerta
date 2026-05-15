"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface UnitContextType {
  unitName: string;
  setUnitName: (name: string) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const UnitContext = createContext<UnitContextType>({
  unitName: "",
  setUnitName: () => {},
  darkMode: false,
  setDarkMode: () => {},
});

export function UnitProvider({ children }: { children: React.ReactNode }) {
  const [unitName, setUnitName] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Aplica o tema no <html> quando darkMode muda
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
  }, [darkMode]);

  return (
    <UnitContext.Provider value={{ unitName, setUnitName, darkMode, setDarkMode }}>
      {children}
    </UnitContext.Provider>
  );
}

export function useUnit() {
  return useContext(UnitContext);
}