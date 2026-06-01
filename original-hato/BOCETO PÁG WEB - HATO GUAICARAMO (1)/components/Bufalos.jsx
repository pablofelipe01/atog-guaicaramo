/* Nuestros Búfalos — dynamic layered petróleo banner: blue wash + animated seal,
   staggered entrance, depth-floated cut-out buffalo on the left, text on the right.
   Keeps the same blue herd background, the same buffalo cut-out, the same copy. */

function Bufalos() {
  HatoLucide();
  const ref = React.useRef(null);
  const [vis, setVis] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setVis(true); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } });
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => { if (vis && window.lucide) window.lucide.createIcons(); }, [vis]);

  const enter = (delay) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "translateY(0)" : "translateY(26px)",
    transition: `opacity 0.7s var(--g-ease-out) ${delay}ms, transform 0.7s var(--g-ease-out) ${delay}ms`,
  });

  return (
    <section id="bufalos" ref={ref} style={{ background: "var(--g-bg)", padding: "80px 0", position: "relative" }}>
      <style>{`
        @keyframes b-spin { to { transform: rotate(-360deg); } }
        @keyframes b-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes b-pulse { 0%,100% { opacity: .5; transform: scaleX(1); } 50% { opacity: 1; transform: scaleX(1.04); } }
      `}</style>

      <div style={{ position: "relative", width: "100%", overflow: "hidden", minHeight: "clamp(480px, 50vw, 640px)" }}>
        {/* Blue herd banner — kept as the background image/color */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('assets/photography/bufalos-banda-azul.png')",
          backgroundSize: "cover", backgroundPosition: "center",
        }} />
        {/* Petróleo wash — deepens the right for legibility, keeps the banner's blue */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(260deg, rgba(8,16,26,0.93) 0%, rgba(18,28,45,0.80) 34%, rgba(35,54,83,0.30) 62%, rgba(35,54,83,0.04) 100%)",
        }} />

        {/* Oversized ghost wordmark behind everything */}
        <div aria-hidden="true" style={{
          position: "absolute", right: "-1%", bottom: "-7%",
          fontFamily: "var(--g-font-display)", fontSize: "clamp(90px, 16vw, 240px)",
          lineHeight: 0.8, color: "rgba(249,246,232,0.05)", letterSpacing: "-0.02em",
          pointerEvents: "none", whiteSpace: "nowrap", userSelect: "none",
        }}>BÚFALOS</div>

        {/* Cut-out buffalo — kept, now floated with depth */}
        <img src="assets/photography/bufalo-recortado.png" alt="Búfalo del Hato Guaicaramo"
          style={{
            position: "absolute", left: 0, bottom: 0,
            height: "min(150%, 560px)", width: "auto", maxWidth: "52%",
            objectFit: "contain", objectPosition: "left bottom",
            filter: "drop-shadow(18px 22px 30px rgba(8,16,26,0.45))",
            opacity: vis ? 1 : 0, transition: "opacity 0.9s var(--g-ease-out) 0.15s",
            pointerEvents: "none", zIndex: 2,
          }} />

        {/* Rotating seal — anchored top-left over the dark sky */}
        <div aria-hidden="true" style={{
          position: "absolute", top: "clamp(20px, 5vw, 56px)", left: "clamp(20px, 6vw, 80px)",
          width: "clamp(96px, 11vw, 138px)", height: "clamp(96px, 11vw, 138px)", zIndex: 3,
          opacity: vis ? 1 : 0, transform: vis ? "scale(1)" : "scale(0.7)",
          transition: "opacity 0.8s var(--g-ease-out) 0.5s, transform 0.8s var(--g-ease-out) 0.5s",
        }}>
          <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%", animation: "b-spin 26s linear infinite" }}>
            <defs><path id="b-seal" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" /></defs>
            <text fill="var(--g-beige)" style={{ fontFamily: "var(--g-font-sans)", fontSize: "16px", fontWeight: 600, letterSpacing: "0.20em" }}>
              <textPath href="#b-seal" startOffset="0">HATO GUAICARAMO · BÚFALOS · CARNE · </textPath>
            </text>
          </svg>
          <i data-lucide="beef" style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            width: "clamp(26px,3vw,34px)", height: "clamp(26px,3vw,34px)", color: "var(--g-beige)",
          }}></i>
        </div>

        {/* Text + content overlay — right-aligned */}
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "flex-end",
          padding: "0 clamp(24px, 6vw, 96px)", zIndex: 4,
        }}>
          <div style={{ maxWidth: 600, color: "var(--g-beige)", textAlign: "right",
            display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            {/* Eyebrow chip */}
            <div style={{ ...enter(0), display: "inline-flex", alignItems: "center", gap: 9,
              padding: "7px 13px 7px 16px", borderRadius: "var(--g-radius-pill)",
              background: "rgba(249,246,232,0.12)", border: "1px solid rgba(249,246,232,0.28)",
              backdropFilter: "blur(4px)", marginBottom: "clamp(16px,2vw,22px)" }}>
              <span style={{ fontFamily: "var(--g-font-sans)", fontSize: 12.5, fontWeight: 600,
                letterSpacing: "0.16em", textTransform: "uppercase" }}>Carne y leche</span>
              <i data-lucide="droplets" style={{ width: 16, height: 16, color: "var(--g-cafe-200)" }}></i>
            </div>

            {/* Display title */}
            <h2 style={{ ...enter(90), fontFamily: "var(--g-font-display)",
              fontSize: "clamp(40px, 5.4vw, 76px)", lineHeight: 0.98, letterSpacing: "-0.01em",
              textTransform: "uppercase", color: "var(--g-beige)", fontWeight: 400, margin: 0 }}>
              Nuestros<br /><span style={{ color: "var(--g-cafe-200)" }}>Búfalos</span>
            </h2>

            {/* Animated accent rule */}
            <div style={{ ...enter(160), height: 3, width: "clamp(120px, 16vw, 200px)",
              background: "linear-gradient(270deg, var(--g-cafe-200), rgba(249,246,232,0))",
              transformOrigin: "right", margin: "clamp(16px,2.4vw,26px) 0",
              animation: vis ? "b-pulse 3.4s var(--g-ease-soft) infinite 0.9s" : "none" }} />

            {/* Body copy — same information */}
            <p style={{ ...enter(220), fontFamily: "var(--g-font-sans)", lineHeight: 1.55,
              color: "var(--g-beige)", margin: 0, textWrap: "pretty",
              fontSize: "clamp(17px, 1.5vw, 22px)", maxWidth: "46ch" }}>
              Producimos <strong>carne y leche</strong> con una lógica clara:
              genética que funciona, nutrición que sostiene el sistema y manejo
              que mantiene la producción estable todo el año.
            </p>

            {/* CTA */}
            <div style={{ ...enter(300), marginTop: "clamp(22px, 3vw, 36px)" }}>
              <HatoBtn variant="pillLight" size="lg" href="nuestros-bufalos.html">Ver más</HatoBtn>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

window.Bufalos = Bufalos;
