/* Buenas Prácticas — circular photo extending above asymmetric tear-drop card */

function BuenasPracticas() {
  HatoLucide();
  const practices = [
    { id: "riegos",   title: "Riegos",                       photo: "assets/photography/bufalas-pastoreo.jpg", anchor: "bp-02" },
    { id: "vacuna",   title: "Vacunación y desparasitación", photo: "assets/photography/testimonio-trabajador-bufalo.jpg", anchor: "bp-03" },
    { id: "insem",    title: "Inseminación artificial",      photo: "assets/photography/nelore-ejemplar.jpg", anchor: "bp-04" },
    { id: "pastoreo", title: "Pastoreo rotacional",          photo: "assets/photography/bufalas-grupo-pastura.jpg", anchor: "bp-01" },
  ];

  return (
    <section id="practicas" style={{
      position: "relative",
      backgroundColor: "#bdb997",
      backgroundImage: "url('assets/photography/buenas-practicas-bg.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      padding: "80px 0 80px",
      overflow: "hidden",
    }}>
      {/* Soft fade so the title sits on a calmer base */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, transparent 0%, rgba(249,246,232,0.18) 60%, rgba(249,246,232,0.40) 100%)",
        pointerEvents: "none",
      }}/>
      <div style={{ position: "relative", maxWidth: 1440, margin: "0 auto", padding: "0 56px" }}>
        <SectionTitle color="var(--g-petroleo-900)">Nuestras buenas prácticas</SectionTitle>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 22, marginTop: 72,
        }}>
          {practices.map((p, i) => <PracticeCard key={p.id} {...p} index={i} delay={i * 60} />)}
        </div>
      </div>
    </section>
  );
}

function PracticeCard({ title, photo, delay, index, anchor }) {
  const [hover, setHover] = React.useState(false);
  // Modern, clean card: uniform generous radius, centered content. The whole
  // card lifts and rounds up a touch on hover for a lively, contemporary feel.
  const radius = hover ? 30 : 24;
  return (
    <a
      href={"buenas-practicas.html" + (anchor ? "#" + anchor : "")}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        transform: hover ? "translateY(-6px)" : "none",
        transition: "transform 300ms var(--g-ease-out)",
        cursor: "pointer", textDecoration: "none", display: "block",
    }}>
      {/* The card — light, airy; everything lives inside it */}
      <div style={{
        background: "var(--g-bg-elevated)",
        border: "1px solid var(--g-line)",
        borderRadius: radius,
        padding: "30px 26px 30px",
        textAlign: "center",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: hover
          ? "0 18px 40px -12px rgba(8,16,26,0.22)"
          : "0 6px 18px -10px rgba(8,16,26,0.16)",
        transition: "box-shadow 300ms var(--g-ease-out), border-radius 300ms var(--g-ease-out)",
        minHeight: 308,
      }}>
        {/* Circular photo, inside the card; subtle zoom on hover */}
        <div style={{
          width: 132, height: 132, borderRadius: "50%",
          boxShadow: "0 0 0 1px var(--g-line)",
          overflow: "hidden", flexShrink: 0,
        }}>
          <img src={photo} alt={title} style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            filter: "saturate(0.96) contrast(1.02)",
            transform: hover ? "scale(1.08)" : "scale(1)",
            transition: "transform 600ms var(--g-ease-out)",
          }}/>
        </div>

        {/* Thin accent rule that grows on hover */}
        <div style={{
          height: 2, marginTop: 20, borderRadius: 2,
          width: hover ? 44 : 26, background: "var(--g-verde-300)",
          transition: "width 300ms var(--g-ease-out)",
        }}/>

        <h3 style={{
          fontFamily: "var(--g-font-display)", fontSize: 19, lineHeight: 1.2,
          letterSpacing: "0.01em", color: "var(--g-petroleo-900)", fontWeight: 400,
          margin: "14px 0 16px", textTransform: "uppercase",
        }}>
          {title}
        </h3>

        {/* Lightweight "Ver más" link with sliding arrow */}
        <span style={{
          marginTop: "auto",
          display: "inline-flex", alignItems: "center", gap: 7,
          fontFamily: "var(--g-font-sans)", fontSize: 12.5, fontWeight: 600,
          letterSpacing: "0.05em", textTransform: "uppercase",
          color: hover ? "var(--g-verde-700)" : "var(--g-verde-500)",
          transition: "color 200ms var(--g-ease-soft)",
        }}>
          Ver más
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{
              transform: hover ? "translateX(5px)" : "none",
              transition: "transform 280ms var(--g-ease-out)",
            }}>
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </span>
      </div>
    </a>
  );
}

window.BuenasPracticas = BuenasPracticas;
