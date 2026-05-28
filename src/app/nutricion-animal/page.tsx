import type { Metadata } from "next";
import NutricionAnimal from "@/components/hato/NutricionAnimal";

export const metadata: Metadata = {
  title: "Nutrición Animal · Hato Guaicaramo",
  description: "Nuestra fábrica de nutrición animal: sal proteinada y pastos Brachiaria humidicola. Aquí no formulamos productos — diseñamos resultados.",
};

export default function NutricionAnimalPage() {
  return (
    <div data-screen-label="Nutrición Animal · Hato Guaicaramo">
      <main style={{ paddingTop: 0 }}>
        <NutricionAnimal />
      </main>
    </div>
  );
}
