'use client'

import { useState, useEffect, useRef } from "react";
import { HatoBtn } from "./primitivos";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { HatoIcon } from "./primitivos";

export default function Genetica() {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setVis(true); return; }
    const io = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }); },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const enter = (delay: number) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "translateY(0)" : "translateY(26px)",
    transition: `opacity 0.7s var(--g-ease-out) ${delay}ms, transform 0.7s var(--g-ease-out) ${delay}ms`,
  });

  const pad = isMobile ? "0 20px" : isTablet ? "0 clamp(24px, 4vw, 48px)" : "0 clamp(24px, 6vw, 96px)";

  return (
    <section id="genetica" ref={ref} style={{ background: "var(--g-bg)", padding: isMobile ? "40px 0 0" : "0 0 80px 0", position: "relative" }}>
      <style>{`
        @keyframes g-spin  { to { transform: rotate(360deg); } }
        @keyframes g-pulse { 0%,100% { opacity:.5; transform:scaleX(1); } 50% { opacity:1; transform:scaleX(1.04); } }
      `}</style>

      <div style={{
        position: "relative", width: "100%", overflow: "hidden",
        minHeight: isMobile ? "auto" : "clamp(480px, 50vw, 640px)",
        lineHeight: 0,
      }}>
        {/* Background: band image */}
        {isMobile ? (
          <img
            src="/assets/photography/nelore-banda-verde.png"
            alt="Manada Nelore CIA"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        ) : (
          <>
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "url('/assets/photography/nelore-banda-verde.png')",
              backgroundSize: "cover", backgroundPosition: "center",
            }} />
            {/* Verde wash */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(100deg, rgba(43,55,47,0.92) 0%, rgba(62,76,64,0.78) 34%, rgba(98,119,97,0.30) 62%, rgba(98,119,97,0.04) 100%)",
            }} />

            {/* Ghost CIA wordmark */}
            <div aria-hidden style={{
              position: "absolute", left: "-2%", bottom: "-6%",
              fontFamily: "var(--g-font-display)", fontSize: "clamp(120px, 22vw, 320px)",
              lineHeight: 0.8, color: "rgba(249,246,232,0.06)", letterSpacing: "-0.03em",
              pointerEvents: "none", whiteSpace: "nowrap", userSelect: "none",
            }}>CIA</div>

            {/* Cut-out Nelore bull */}
            <img
              src="/assets/photography/nelore-recortado.png"
              alt="Ejemplar Nelore CIA"
              style={{
                position: "absolute", right: "2%", bottom: 0,
                height: isTablet ? "min(120%, 440px)" : "min(140%, 580px)",
                width: "auto", maxWidth: isTablet ? "42%" : "50%",
                objectFit: "contain", objectPosition: "right bottom",
                filter: "drop-shadow(-18px 22px 30px rgba(8,16,26,0.35))",
                opacity: vis ? 1 : 0, transition: "opacity 0.9s var(--g-ease-out) 0.15s",
                pointerEvents: "none", zIndex: 2,
              }}
            />

            {/* Rotating CIA seal */}
            <div aria-hidden style={{
              position: "absolute",
              top: "clamp(20px, 5vw, 56px)",
              right: isTablet ? "clamp(20px, 4vw, 48px)" : "clamp(20px, 6vw, 80px)",
              width: "clamp(80px, 11vw, 138px)", height: "clamp(80px, 11vw, 138px)",
              zIndex: 3,
              opacity: vis ? 1 : 0, transform: vis ? "scale(1)" : "scale(0.7)",
              transition: "opacity 0.8s var(--g-ease-out) 0.5s, transform 0.8s var(--g-ease-out) 0.5s",
            }}>
              <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%", animation: "g-spin 26s linear infinite" }}>
                <defs><path id="g-seal" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" /></defs>
                <text fill="var(--g-beige)" style={{ fontFamily: "var(--g-font-sans)", fontSize: "16px", fontWeight: 600, letterSpacing: "0.22em" }}>
                  <textPath href="#g-seal" startOffset="0">  PROGRAMA · CICLO CORTO · NELORE ·  </textPath>
                </text>
              </svg>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                <HatoIcon name="dna" size={isTablet ? 24 : 30} color="var(--g-beige)" />
              </div>
            </div>

            {/* Text overlay */}
            <div style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center",
              padding: pad, zIndex: 4,
            }}>
              <div style={{ maxWidth: isTablet ? 440 : 600, color: "var(--g-beige)" }}>
                {/* Eyebrow chip */}
                <div style={{ ...enter(0), display: "inline-flex", alignItems: "center", gap: 9,
                  padding: "7px 16px 7px 13px", borderRadius: "var(--g-radius-pill)",
                  background: "rgba(249,246,232,0.14)", border: "1px solid rgba(249,246,232,0.30)",
                  backdropFilter: "blur(4px)", marginBottom: "clamp(16px,2vw,22px)" }}>
                  <HatoIcon name="sparkles" size={16} color="var(--g-cafe-200)" />
                  <span style={{ fontFamily: "var(--g-font-sans)", fontSize: 12.5, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" }}>Genética de talla mundial</span>
                </div>

                {/* Title */}
                <h2 style={{ ...enter(90), fontFamily: "var(--g-font-display)",
                  fontSize: isTablet ? "clamp(32px, 4.4vw, 56px)" : "clamp(40px, 5.4vw, 76px)",
                  lineHeight: 0.98, letterSpacing: "-0.01em",
                  color: "var(--g-beige)", fontWeight: 400, margin: 0 }}>
                  Nelore CIA<br /><span style={{ color: "var(--g-cafe-200)" }}>Ciclo Corto</span>
                </h2>

                {/* Animated accent rule */}
                <div style={{ ...enter(160), height: 3, width: "clamp(120px, 16vw, 200px)",
                  background: "linear-gradient(90deg, var(--g-cafe-200), rgba(249,246,232,0))",
                  transformOrigin: "left", margin: "clamp(16px,2.4vw,26px) 0",
                  animation: vis ? "g-pulse 3.4s var(--g-ease-soft) infinite 0.9s" : "none" }} />

                {/* Body */}
                <p style={{ ...enter(220), fontFamily: "var(--g-font-sans)", lineHeight: 1.55,
                  color: "var(--g-beige)", margin: 0, textWrap: "pretty",
                  fontSize: isTablet ? "clamp(15px, 1.4vw, 18px)" : "clamp(17px, 1.5vw, 22px)", maxWidth: "44ch" }}>
                  Invertimos en <strong>genética de talla mundial</strong> que{" "}
                  <strong>reduce los ciclos de producción</strong> y acelera los resultados.
                  Trabajamos bajo el <strong>programa de Mejoramiento genético CIA</strong>.
                </p>

                {/* CTA */}
                <div style={{ ...enter(380), marginTop: "clamp(22px, 3vw, 36px)" }}>
                  <HatoBtn variant="pillLight" size="lg" href="/genetica-talla-mundial">Ver más</HatoBtn>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Mobile text block — below image */}
      {isMobile && (
        <div style={{ background: "var(--g-verde-800)", padding: "28px 20px 36px" }}>
          <div style={{ color: "var(--g-beige)" }}>
            <p style={{ fontFamily: "var(--g-font-sans)", fontSize: 12.5, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--g-cafe-200)", marginBottom: 14 }}>
              Genética de talla mundial
            </p>
            <h2 style={{ fontFamily: "var(--g-font-display)", fontSize: "clamp(28px, 7vw, 40px)", lineHeight: 1.0, color: "var(--g-beige)", fontWeight: 400, margin: "0 0 16px" }}>
              Nelore CIA<br /><span style={{ color: "var(--g-cafe-200)" }}>Ciclo Corto</span>
            </h2>
            <p style={{ fontFamily: "var(--g-font-sans)", fontSize: 16, lineHeight: 1.55, color: "var(--g-beige)", margin: "0 0 24px", textWrap: "pretty" }}>
              Invertimos en <strong>genética de talla mundial</strong> que{" "}
              <strong>reduce los ciclos de producción</strong> y acelera los resultados.
              Trabajamos bajo el <strong>programa de Mejoramiento genético CIA</strong>.
            </p>
            <HatoBtn variant="pillLight" size="md" href="/genetica-talla-mundial">Ver más</HatoBtn>
          </div>
        </div>
      )}
    </section>
  );
}
