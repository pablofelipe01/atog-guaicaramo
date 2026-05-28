'use client'

import { HatoBtn } from "./primitivos";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function Genetica() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  const textBlock = (
    <div style={{ maxWidth: isMobile ? "100%" : 560, color: "var(--g-beige)" }}>
      <h2 style={{
        fontFamily: "var(--g-font-display)",
        fontSize: isMobile ? "clamp(20px, 6vw, 28px)" : "clamp(28px, 2.6vw, 38px)",
        lineHeight: 1.05, letterSpacing: "0.005em", textTransform: "uppercase",
        color: "var(--g-beige)", fontWeight: 400,
        margin: `0 0 ${isMobile ? "14px" : "clamp(14px, 2vw, 24px)"}`,
        paddingBottom: 6, borderBottom: "1.5px solid var(--g-beige)",
        display: "inline-block",
        whiteSpace: isMobile ? "normal" : "nowrap",
      }}>
        Nelore CIA Ciclo Corto
      </h2>
      <p style={{
        fontFamily: "var(--g-font-sans)",
        lineHeight: 1.55, color: "var(--g-beige)",
        margin: 0, textWrap: "pretty",
        fontSize: isMobile ? "17px" : isTablet ? "18px" : "24px",
      }}>
        Invertimos en <strong>genética de talla mundial</strong> que{" "}
        <strong>reduce los ciclos de producción</strong> y acelera los resultados.<br />
        Trabajamos bajo el <strong>programa de Mejoramiento genético CIA</strong>.
      </p>
      <div style={{ marginTop: isMobile ? "20px" : "clamp(18px, 2.5vw, 32px)" }}>
        <HatoBtn variant="pillLight" size={isMobile ? "md" : "lg"}>Ver más</HatoBtn>
      </div>
    </div>
  );

  return (
    <section id="genetica" style={{
      background: "var(--g-bg)",
      padding: isMobile ? "40px 0 0" : "80px 0",
      position: "relative", overflow: "visible",
    }}>
      <div style={{
        position: "relative",
        width: "100%",
        overflow: "visible",
        lineHeight: 0,
      }}>
        {/* Full-bleed banner */}
        <img
          src="/assets/photography/nelore-banda-verde.png"
          alt="Manada Nelore CIA en pastura verde"
          style={{ display: "block", width: "100%", height: "auto" }}
        />

        {/* Cut-out Nelore — tablet y desktop únicamente */}
        {!isMobile && (
          <img
            src="/assets/photography/nelore-recortado.png"
            alt="Ejemplar Nelore CIA"
            style={{
              position: "absolute",
              right: "3%",
              bottom: 0,
              height: isTablet ? "min(110%, 400px)" : "min(135%, 540px)",
              width: "auto",
              maxWidth: isTablet ? "42%" : "48%",
              objectFit: "contain", objectPosition: "right bottom",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        )}

        {/* Text overlay — tablet y desktop únicamente */}
        {!isMobile && (
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            padding: `0 ${isTablet ? "24px" : "clamp(24px, 6vw, 96px)"}`,
            lineHeight: 1.55, alignItems: "center",
          }}>
            {textBlock}
          </div>
        )}
      </div>

      {/* Text block móvil — debajo de la imagen */}
      {isMobile && (
        <div style={{ background: "var(--g-verde-800)", padding: "28px 20px 36px" }}>
          {textBlock}
        </div>
      )}
    </section>
  );
}
