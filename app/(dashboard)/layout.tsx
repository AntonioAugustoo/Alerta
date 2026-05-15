import { Sidebar } from "@/components/layout/Sidebar";
import { UnitProvider } from "@/lib/unit-context";

export default function DashboardLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <UnitProvider>
      <div style={{ backgroundColor: "var(--bg-body)" }} className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6 flex flex-col">
          {children}
        </main>
        {modal}
      </div>
    </UnitProvider>
  );
}