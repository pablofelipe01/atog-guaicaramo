import HatoHero from "@/components/hato/HatoHero";
import BuenasPracticas from "@/components/hato/BuenasPracticas";
import Genetica from "@/components/hato/Genetica";
import Bufalos from "@/components/hato/Bufalos";
import Sellos from "@/components/hato/Sellos";
import Testimoniales from "@/components/hato/Testimoniales";

export default function HomePage() {
  return (
    <div data-screen-label="Hato Guaicaramo · Web">
      <HatoHero />
      <BuenasPracticas />
      <Genetica />
      <Bufalos />
      <Sellos />
      <Testimoniales />
    </div>
  );
}
