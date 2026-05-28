'use client'

import { HatoBtn } from "./primitivos";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function Bufalos() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  const textBlock = (
    <div style={{
      maxWidth: isMobile ? "100%" : 560,
      color: "var(--g-beige)",
      textAlign: isMobile ? "left" : "right",
      display: "flex", flexDirection: "column",
      alignItems: isMobile ? "flex-start" : "flex-end",
    }}>
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
        Nuestros Búfalos
      </h2>
      <p style={{
        fontFamily: "var(--g-font-sans)",
        lineHeight: 1.55, color: "var(--g-beige)",
        margin: 0, textWrap: "pretty",
        fontSize: isMobile ? "17px" : isTablet ? "18px" : "24px",
      }}>
        Producimos <strong>carne y leche</strong> con una lógica clara:
        genética que funciona, nutrición que sostiene el sistema y manejo
        que mantiene la producción estable todo el año.
      </p>
      <div style={{ marginTop: isMobile ? "20px" : "clamp(18px, 2.5vw, 32px)" }}>
        <HatoBtn variant="pillLight" size={isMobile ? "md" : "lg"}>Ver más</HatoBtn>
      </div>
    </div>
  );

  return (
    <section id="bufalos" style={{
      background: "var(--g-bg)",
      padding: isMobile ? "40px 0 0" : "80px 0 80px",
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
          src="/assets/photography/bufalos-banda-azul.png"
          alt="Manada de búfalas del Hato Guaicaramo"
          style={{ display: "block", width: "100%", height: "auto" }}
        />

        {/* Cut-out buffalo — tablet y desktop únicamente */}
        {!isMobile && (
          <img
            src="/assets/photography/bufalo-recortado.png"
            alt="Búfalo del Hato Guaicaramo"
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              height: isTablet ? "min(120%, 420px)" : "min(150%, 560px)",
              width: "auto",
              maxWidth: isTablet ? "44%" : "52%",
              objectFit: "contain", objectPosition: "left bottom",
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
            lineHeight: 1.55, alignItems: "center", justifyContent: "flex-end",
          }}>
            {textBlock}
          </div>
        )}
      </div>

      {/* Text block móvil — debajo de la imagen */}
      {isMobile && (
        <div style={{ background: "var(--g-petroleo-700)", padding: "28px 20px 36px" }}>
          {textBlock}
        </div>
      )}
    </section>
  );
}
