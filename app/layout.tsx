import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALERTA",
  description: "Sistema inteligente de monitoramento IoT para prevenção de quedas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}