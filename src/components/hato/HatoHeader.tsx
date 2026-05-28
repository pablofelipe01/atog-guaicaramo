'use client'

import { useState, useEffect } from "react";
import { HatoWordmark } from "./primitivos";

interface HatoHeaderProps {
  onNavigate: (id: string) => void;
  active: string;
  inverse?: boolean;
  forceLight?: boolean;
}

const items = [
  { id: "quienes",  label: "QUIÉNES SOMOS",             href: "/quienes-somos" },
  { id: "practicas",label: "NUESTRAS BUENAS PRÁCTICAS"                         },
  { id: "genetica", label: "GENÉTICA DE TALLA MUNDIAL"                         },
  { id: "bufalos",  label: "NUESTROS BÚFALOS"                                  },
  { id: "nutricion",label: "NUTRICIÓN ANIMAL",           href: "/nutricion-animal" },
];

export default function HatoHeader({ onNavigate, active, inverse = true, forceLight = false }: HatoHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  const onLight = forceLight || scrolled;
  const logoInverse = !onLight;
  const linkColor = onLight ? "var(--g-petroleo-700)" : "var(--g-beige)";

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: onLight ? "rgba(249,246,232,0.95)" : "transparent",
      backdropFilter: onLight ? "blur(12px)" : "none",
      borderBottom: onLight ? "1px solid var(--g-line)" : "1px solid transparent",
      transition: "all 220ms var(--g-ease-soft)",
    }}>
      <div style={{
        maxWidth: 1440, margin: "0 auto", padding: "20px 56px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32,
      }}>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("top"); }} style={{ textDecoration: "none" }}>
          <HatoWordmark height={52} inverse={logoInverse} />
        </a>
        <nav style={{ display: "flex", alignItems: "center", gap: 30, flexWrap: "nowrap" }}>
          {items.map((it) => (
            <a
              key={it.id}
              href={it.href || "#" + it.id}
              onClick={(e) => {
                if (it.href) return; /* external/relative link — let the browser navigate */
                e.preventDefault();
                onNavigate(it.id);
              }}
              style={{
                fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500,
                color: linkColor, textDecoration: "none", padding: "6px 0",
                letterSpacing: "0.03em", whiteSpace: "nowrap",
              }}
            >
              {it.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
