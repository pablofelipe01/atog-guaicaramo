'use client'

import { useState, useEffect } from "react";
import { HatoBtn } from "./primitivos";
import { useBreakpoint } from "@/hooks/useBreakpoint";

type HeroSlide = {
  photo: string;
  label: string;
  copy: React.ReactNode;
};

const HERO_SLIDES: HeroSlide[] = [
  {
    photo: "/assets/photography/hero-nelore-hato.jpg",
    label: "Nelore CIA · ganado para el trópico",
    copy: <>Somos una empresa ganadera <br />especializada en <span>genética de talla mundial</span> y en la creación de sistemas eficientes de producción animal para el trópico.</>,
  },
  {
    photo: "/assets/photography/bufalos-pastura-cordillera.jpg",
    label: "Búfalos Mediterráneos",
    copy: <>En Hato Guaicaramo no trabajamos el búfalo como una especie más.<br />Lo integramos como un sistema productivo real.</>,
  },
  {
    photo: "/assets/photography/bufalas-pastoreo.jpg",
    label: "Pastoreo rotacional",
    copy: <>Aquí no formulamos productos.<br /><span>Diseñamos resultados.</span></>,
  },
  {
    photo: "/assets/photography/ordeno-bufalas.jpg",
    label: "Hato lechero de búfalas",
    copy: <>Aquí la producción no se deja al azar.<br /><span>Se controla. Se sostiene. Se construye.</span></>,
  },
];

export default function HatoHero() {
  const [idx, setIdx] = useState(0);
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);

  const hPad = isMobile ? 20 : isTablet ? 32 : 56;
  const vPad = isMobile ? 80 : 110;

  return (
    <section style={{
      position: "relative",
      height: "100vh",
      minHeight: isMobile ? 580 : 700,
      maxHeight: 900,
      overflow: "hidden",
      background: "#1a2120",
    }} id="quienes">

      {/* Slides */}
      {HERO_SLIDES.map((s, i) => (
        <div key={i} style={{
          position: "absolute", inset: 0,
          opacity: i === idx ? 1 : 0,
          transition: "opacity 800ms var(--g-ease-soft)",
        }}>
          <img src={s.photo} alt={s.label} style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%", objectFit: "cover",
            filter: "saturate(0.92) contrast(1.03) brightness(0.82)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, rgba(8,16,26,0.55) 0%, rgba(8,16,26,0.30) 30%, rgba(8,16,26,0.35) 60%, rgba(8,16,26,0.80) 100%)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(95deg, rgba(8,16,26,0.65) 0%, rgba(8,16,26,0.35) 40%, rgba(8,16,26,0.0) 70%)",
          }} />
        </div>
      ))}

      {/* Copy overlay */}
      <div style={{
        position: "absolute",
        left: hPad, right: hPad, bottom: vPad, top: vPad,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        overflow: "hidden",
      }}>
        <div style={{ maxWidth: isMobile ? "100%" : 760 }}>
          <h1 style={{
            fontFamily: "var(--g-font-display)",
            fontSize: isMobile ? "clamp(22px, 7vw, 32px)" : "clamp(28px, 3.5vw, 58px)",
            lineHeight: 1.18, letterSpacing: "-0.012em",
            color: "var(--g-beige)", fontWeight: 400, margin: 0,
            textWrap: "pretty",
            textShadow: "0 2px 18px rgba(8,16,26,0.45)",
          }}>
            {HERO_SLIDES[idx].copy}
          </h1>
          <div style={{ marginTop: isMobile ? 20 : 32 }}>
            <HatoBtn variant="pillLight" size={isMobile ? "md" : "lg"}>Ver más</HatoBtn>
          </div>
        </div>

        {/* Carousel dots */}
        <div style={{
          marginTop: isMobile ? 32 : 52,
          display: "flex", gap: 12, alignItems: "center",
          fontFamily: "var(--g-font-sans)", fontSize: 11,
        }}>
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{
              width: i === idx ? 22 : 8, height: 8, borderRadius: 999,
              background: i === idx ? "var(--g-beige)" : "rgba(249,246,232,0.4)",
              border: "none", padding: 0, cursor: "pointer",
              transition: "all 200ms var(--g-ease-soft)",
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}
