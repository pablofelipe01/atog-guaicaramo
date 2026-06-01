import type { Metadata } from "next";
import BuenasPracticasPage from "@/components/hato/BuenasPracticasPage";

export const metadata: Metadata = {
  title: "Nuestras Buenas Prácticas · Hato Guaicaramo",
  description: "Cuatro prácticas que sostienen la productividad, la salud y la sostenibilidad del hato: pastoreo rotacional, riegos, vacunación e inseminación.",
};

export default function BuenasPracticasRoute() {
  return (
    <div data-screen-label="Buenas Prácticas · Hato Guaicaramo">
      <main style={{ paddingTop: 0 }}>
        <BuenasPracticasPage />
      </main>
    </div>
  );
}
