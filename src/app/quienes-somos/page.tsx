import type { Metadata } from "next";
import QuienesSomos from "@/components/hato/QuienesSomos";

export const metadata: Metadata = {
  title: "Quiénes Somos · Hato Guaicaramo",
};

export default function QuienesSomosPage() {
  return (
    <div data-screen-label="Quiénes Somos · Hato Guaicaramo">
      <main style={{ paddingTop: 76 }}>
        <QuienesSomos />
      </main>
    </div>
  );
}
