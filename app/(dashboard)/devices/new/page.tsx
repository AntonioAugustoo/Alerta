"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { NewDeviceModal } from "@/components/modals/NewDeviceModal";

export default function NewDevicePage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  function handleClose() {
    setIsOpen(false);
    router.push("/");
  }

  return (
    <>
      {isOpen && <NewDeviceModal onClose={handleClose} />}
    </>
  );
}