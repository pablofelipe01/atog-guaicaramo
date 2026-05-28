'use client'

import { SectionTitle } from "./primitivos";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const sellos = [
  { name: "CIA Melhoramento", src: "/assets/certs/cia-melhoramento.png" },
  { name: "100% Precoce",     src: "/assets/certs/100-precoce.png"      },
  { name: "100% Genômica",    src: "/assets/certs/100-genomica.png"     },
  { name: "CESUG",            src: "/assets/certs/cesug.png"            },
  { name: "USDA Organic",     src: "/assets/certs/usda-organic.png"     },
];

export default function Sellos() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  const secPad  = isMobile ? "0 20px" : isTablet ? "0 32px" : "0 56px";
  const gridCols = isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(3, 1fr)" : "repeat(5, 1fr)";

  return (
    <section style={{ background: "var(--g-bg)", padding: "80px 0" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: secPad }}>
        <SectionTitle color="var(--g-verde-500)">Nuestros sellos de excelencia</SectionTitle>
        <div style={{
          display: "grid",
          gridTemplateColumns: gridCols,
          gap: isMobile ? 16 : 24,
          alignItems: "center", justifyItems: "center", marginTop: 56,
        }}>
          {sellos.map((s) => (
            <div key={s.name} style={{
              height: isMobile ? 110 : 160,
              display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px",
            }}>
              <img src={s.src} alt={s.name} style={{
                maxHeight: "100%", maxWidth: "100%", objectFit: "contain",
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
