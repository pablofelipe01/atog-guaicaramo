import type { Metadata } from "next";
import NuestrosBufalos from "@/components/hato/NuestrosBufalos";

export const metadata: Metadata = {
  title: "Nuestros Búfalos · Hato Guaicaramo",
  description: "No trabajamos el búfalo como una especie más. Lo integramos como un sistema productivo real: carne, leche y trabajo.",
};

export default function NuestrosBufalosPage() {
  return (
    <div data-screen-label="Nuestros Búfalos · Hato Guaicaramo">
      <main style={{ paddingTop: 0 }}>
        <NuestrosBufalos />
      </main>
    </div>
  );
}
