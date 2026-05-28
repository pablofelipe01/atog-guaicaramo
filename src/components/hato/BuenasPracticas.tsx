'use client'

import { useState } from "react";
import { HatoBtn, SectionTitle } from "./primitivos";

const practices = [
  { id: "riegos",   title: "Riegos",                       photo: "/assets/photography/bufalas-pastoreo.jpg" },
  { id: "vacuna",   title: "Vacunación y desparasitación", photo: "/assets/photography/testimonio-trabajador-bufalo.jpg" },
  { id: "insem",    title: "Inseminación artificial",      photo: "/assets/photography/nelore-ejemplar.jpg" },
  { id: "pastoreo", title: "Pastoreo rotacional",          photo: "/assets/photography/bufalas-grupo-pastura.jpg" },
];

export default function BuenasPracticas() {
  return (
    <section id="practicas" style={{
      position: "relative",
      backgroundColor: "#bdb997",
      backgroundImage: "url('/assets/photography/buenas-practicas-bg.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      padding: "80px 0 80px",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, transparent 0%, rgba(249,246,232,0.18) 60%, rgba(249,246,232,0.40) 100%)",
        pointerEvents: "none",
      }} />
      <div style={{ position: "relative", maxWidth: 1440, margin: "0 auto", padding: "0 56px" }}>
        <SectionTitle color="var(--g-petroleo-900)">Nuestras buenas prácticas</SectionTitle>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 22, marginTop: 72,
        }}>
          {practices.map((p, i) => <PracticeCard key={p.id} {...p} delay={i * 60} />)}
        </div>
      </div>
    </section>
  );
}

function PracticeCard({ title, photo, delay }: { title: string; photo: string; delay: number }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        position: "relative", paddingTop: 80,
        transform: hover ? "translateY(-4px)" : "none",
        transition: "transform 240ms var(--g-ease-soft)",
      }}
    >
      {/* Circular photo, extending above the card */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 156, height: 156, borderRadius: "50%",
        border: "3px solid var(--g-beige)",
        boxShadow: "0 6px 20px rgba(8,16,26,0.18)",
        overflow: "hidden", zIndex: 2,
      }}>
        <img src={photo} alt={title} style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          filter: "saturate(0.94) contrast(1.03)",
        }} />
      </div>

      {/* The card — asymmetric tear-drop: large top corners, normal bottom */}
      <div style={{
        background: "var(--g-beige)",
        borderRadius: "120px 120px 14px 14px",
        padding: "104px 24px 28px",
        textAlign: "center",
        width: "100%",
        boxShadow: hover ? "0 12px 28px rgba(8,16,26,0.14)" : "0 4px 12px rgba(8,16,26,0.08)",
        transition: "box-shadow 240ms var(--g-ease-soft)",
        minHeight: 240,
      }}>
        <h3 style={{
          fontFamily: "var(--g-font-display)", fontSize: 20, lineHeight: 1.15,
          letterSpacing: "0.005em", color: "var(--g-petroleo-900)", fontWeight: 400,
          margin: "0 0 22px", textTransform: "uppercase",
        }}>
          {title}
        </h3>
        <HatoBtn variant="pillMuted" size="sm">Ver más</HatoBtn>
      </div>
    </div>
  );
}
