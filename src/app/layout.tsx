import type { Metadata } from "next";
import "./globals.css";
import HatoHeaderWrapper from "@/components/hato/HatoHeaderWrapper";
import HatoFooter from "@/components/hato/HatoFooter";

export const metadata: Metadata = {
  title: "Hato Guaicaramo · Genética de talla mundial para el trópico",
  description: "Empresa ganadera especializada en genética de talla mundial y sistemas eficientes de producción animal para el trópico. Maní, Casanare.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <HatoHeaderWrapper />
        {children}
        <HatoFooter />
      </body>
    </html>
  );
}
