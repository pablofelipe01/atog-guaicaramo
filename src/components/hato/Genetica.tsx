'use client'

import { HatoBtn } from "./primitivos";

export default function Genetica() {
  return (
    <section id="genetica" style={{
      background: "var(--g-bg)",
      padding: "80px 0",
      position: "relative", overflow: "visible",
    }}>
      <div style={{
        position: "relative",
        width: "100%",
        overflow: "visible",
        lineHeight: 0,
      }}>
        {/* Full-bleed banner image — green-tinted Nelore herd */}
        <img
          src="/assets/photography/nelore-banda-verde.png"
          alt="Manada Nelore CIA en pastura verde"
          style={{ display: "block", width: "100%", height: "auto" }}
        />

        {/* Cut-out Nelore bull — large, anchored bottom-right, horns extending above */}
        <img
          src="/assets/photography/nelore-recortado.png"
          alt="Ejemplar Nelore CIA"
          style={{
            position: "absolute",
            right: "3%",
            bottom: 0,
            height: "min(135%, 540px)",
            width: "auto",
            maxWidth: "48%",
            objectFit: "contain", objectPosition: "right bottom",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Text overlay — sits on top of the green banner, left-aligned */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          padding: "0 clamp(24px, 6vw, 96px)",
          lineHeight: 1.55, alignItems: "center",
        }}>
          <div style={{ maxWidth: 560, color: "var(--g-beige)" }}>
            <h2 style={{
              fontFamily: "var(--g-font-display)",
              fontSize: "clamp(28px, 2.6vw, 38px)",
              lineHeight: 1.05, letterSpacing: "0.005em", textTransform: "uppercase",
              color: "var(--g-beige)", fontWeight: 400,
              margin: "0 0 clamp(14px, 2vw, 24px)",
              paddingBottom: 6, borderBottom: "1.5px solid var(--g-beige)",
              display: "inline-block", whiteSpace: "nowrap",
            }}>
              Nelore CIA Ciclo Corto
            </h2>
            <p style={{
              fontFamily: "var(--g-font-sans)",
              lineHeight: 1.55, color: "var(--g-beige)",
              margin: 0, textWrap: "pretty", fontSize: "24px",
            }}>
              Invertimos en <strong>genética de talla mundial</strong> que{" "}
              <strong>reduce los ciclos de producción</strong> y acelera los resultados.<br />
              Trabajamos bajo el <strong>programa de Mejoramiento genético CIA</strong>.
            </p>
            <div style={{ marginTop: "clamp(18px, 2.5vw, 32px)" }}>
              <HatoBtn variant="pillLight" size="lg">Ver más</HatoBtn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
