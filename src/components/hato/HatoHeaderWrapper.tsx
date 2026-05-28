'use client'

import { usePathname, useRouter } from "next/navigation";
import HatoHeader from "./HatoHeader";

export default function HatoHeaderWrapper() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const active =
    pathname === "/quienes-somos"   ? "quienes"   :
    pathname === "/nutricion-animal" ? "nutricion" :
    "quienes";

  const onNavigate = (id: string) => {
    if (!isHome) {
      if (id === "top" || id === "home") { router.push("/"); return; }
      router.push("/#" + id);
      return;
    }
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const t = document.getElementById(id);
    if (t) {
      const y = t.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return <HatoHeader active={active} onNavigate={onNavigate} forceLight={!isHome} />;
}
