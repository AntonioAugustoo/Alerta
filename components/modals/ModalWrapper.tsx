"use client";

import { useRouter } from "next/navigation";

interface ModalWrapperProps {
  children: React.ReactNode;
}

export function ModalWrapper({ children }: ModalWrapperProps) {
  const router = useRouter();

  function handleClose() {
    router.back();
  }

  return (
    <>
      {/* Overlay clicável para fechar */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={handleClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Injeta onClose nos filhos */}
        {children}
      </div>
    </>
  );
}