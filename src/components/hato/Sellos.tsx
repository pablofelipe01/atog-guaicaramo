'use client'

import { SectionTitle } from "./primitivos";

const sellos = [
  { name: "CIA Melhoramento", src: "/assets/certs/cia-melhoramento.png" },
  { name: "100% Precoce",     src: "/assets/certs/100-precoce.png"      },
  { name: "100% Genômica",    src: "/assets/certs/100-genomica.png"     },
  { name: "CESUG",            src: "/assets/certs/cesug.png"            },
  { name: "USDA Organic",     src: "/assets/certs/usda-organic.png"     },
];

export default function Sellos() {
  return (
    <section style={{ background: "var(--g-bg)", padding: "80px 0" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 56px" }}>
        <SectionTitle color="var(--g-verde-500)">Nuestros sellos de excelencia</SectionTitle>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24,
          alignItems: "center", justifyItems: "center", marginTop: 56,
        }}>
          {sellos.map((s) => (
            <div key={s.name} style={{
              height: 160, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px",
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
