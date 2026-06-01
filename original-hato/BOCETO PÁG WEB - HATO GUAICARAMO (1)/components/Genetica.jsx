/* Genética Nelore CIA — dynamic layered banner: verde wash + animated CIA seal,
   staggered entrance, floating benefit chips, depth-floated cut-out Nelore.
   Keeps the same green herd background, the same bull cut-out, the same copy. */

function Genetica() {
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
    <section id="genetica" ref={ref} style={{ background: "var(--g-bg)", padding: "80px 0", position: "relative" }}>
      <style>{`
        @keyframes g-spin { to { transform: rotate(360deg); } }
        @keyframes g-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes g-pulse { 0%,100% { opacity: .5; transform: scaleX(1); } 50% { opacity: 1; transform: scaleX(1.04); } }
        .g-chip:hover { background: var(--g-beige) !important; transform: translateY(-3px); }
      `}</style>

      <div style={{ position: "relative", width: "100%", overflow: "hidden", minHeight: "clamp(480px, 50vw, 640px)" }}>
        {/* Green herd banner — kept as the background image/color */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('assets/photography/nelore-banda-verde.png')",
          backgroundSize: "cover", backgroundPosition: "center",
        }} />
        {/* Verde wash — deepens the left for legibility, keeps the banner's green */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(100deg, rgba(43,55,47,0.92) 0%, rgba(62,76,64,0.78) 34%, rgba(98,119,97,0.30) 62%, rgba(98,119,97,0.04) 100%)",
        }} />

        {/* Oversized ghost wordmark behind everything */}
        <div aria-hidden="true" style={{
          position: "absolute", left: "-2%", bottom: "-6%",
          fontFamily: "var(--g-font-display)", fontSize: "clamp(120px, 22vw, 320px)",
          lineHeight: 0.8, color: "rgba(249,246,232,0.06)", letterSpacing: "-0.03em",
          pointerEvents: "none", whiteSpace: "nowrap", userSelect: "none",
        }}>CIA</div>

        {/* Cut-out Nelore bull — kept, now floated with depth */}
        <img src="assets/photography/nelore-recortado.png" alt="Ejemplar Nelore CIA"
          style={{
            position: "absolute", right: "2%", bottom: 0,
            height: "min(140%, 580px)", width: "auto", maxWidth: "50%",
            objectFit: "contain", objectPosition: "right bottom",
            filter: "drop-shadow(-18px 22px 30px rgba(8,16,26,0.35))",
            opacity: vis ? 1 : 0, transition: "opacity 0.9s var(--g-ease-out) 0.15s",
            pointerEvents: "none", zIndex: 2,
          }} />

        {/* Rotating CIA seal — anchored top-right over the herd */}
        <div aria-hidden="true" style={{
          position: "absolute", top: "clamp(20px, 5vw, 56px)", right: "clamp(20px, 6vw, 80px)",
          width: "clamp(96px, 11vw, 138px)", height: "clamp(96px, 11vw, 138px)", zIndex: 3,
          opacity: vis ? 1 : 0, transform: vis ? "scale(1)" : "scale(0.7)",
          transition: "opacity 0.8s var(--g-ease-out) 0.5s, transform 0.8s var(--g-ease-out) 0.5s",
        }}>
          <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%", animation: "g-spin 26s linear infinite" }}>
            <defs><path id="g-seal" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" /></defs>
            <text fill="var(--g-beige)" style={{ fontFamily: "var(--g-font-sans)", fontSize: "16px", fontWeight: 600, letterSpacing: "0.22em" }}>
              <textPath href="#g-seal" startOffset="0">  PROGRAMA · CICLO CORTO · NELORE ·  </textPath>
            </text>
          </svg>
          <i data-lucide="dna" style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            width: "clamp(26px,3vw,34px)", height: "clamp(26px,3vw,34px)", color: "var(--g-beige)",
          }}></i>
        </div>

        {/* Text + content overlay */}
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center",
          padding: "0 clamp(24px, 6vw, 96px)", zIndex: 4,
        }}>
          <div style={{ maxWidth: 600, color: "var(--g-beige)" }}>
            {/* Eyebrow chip */}
            <div style={{ ...enter(0), display: "inline-flex", alignItems: "center", gap: 9,
              padding: "7px 16px 7px 13px", borderRadius: "var(--g-radius-pill)",
              background: "rgba(249,246,232,0.14)", border: "1px solid rgba(249,246,232,0.30)",
              backdropFilter: "blur(4px)", marginBottom: "clamp(16px,2vw,22px)" }}>
              <i data-lucide="sparkles" style={{ width: 16, height: 16, color: "var(--g-cafe-200)" }}></i>
              <span style={{ fontFamily: "var(--g-font-sans)", fontSize: 12.5, fontWeight: 600,
                letterSpacing: "0.16em", textTransform: "uppercase" }}>Genética de talla mundial</span>
            </div>

            {/* Display title */}
            <h2 style={{ ...enter(90), fontFamily: "var(--g-font-display)",
              fontSize: "clamp(40px, 5.4vw, 76px)", lineHeight: 0.98, letterSpacing: "-0.01em",
              textTransform: "uppercase", color: "var(--g-beige)", fontWeight: 400, margin: 0 }}>
              Nelore CIA<br /><span style={{ color: "var(--g-cafe-200)" }}>Ciclo Corto</span>
            </h2>

            {/* Animated accent rule */}
            <div style={{ ...enter(160), height: 3, width: "clamp(120px, 16vw, 200px)",
              background: "linear-gradient(90deg, var(--g-cafe-200), rgba(249,246,232,0))",
              transformOrigin: "left", margin: "clamp(16px,2.4vw,26px) 0",
              animation: vis ? "g-pulse 3.4s var(--g-ease-soft) infinite 0.9s" : "none" }} />

            {/* Body copy — same information */}
            <p style={{ ...enter(220), fontFamily: "var(--g-font-sans)", lineHeight: 1.55,
              color: "var(--g-beige)", margin: 0, textWrap: "pretty",
              fontSize: "clamp(17px, 1.5vw, 22px)", maxWidth: "44ch" }}>
              Invertimos en <strong>genética de talla mundial</strong> que{" "}
              <strong>reduce los ciclos de producción</strong> y acelera los resultados.
              Trabajamos bajo el <strong>programa de Mejoramiento genético CIA</strong>.
            </p>

            {/* CTA */}
            <div style={{ ...enter(380), marginTop: "clamp(22px, 3vw, 36px)" }}>
              <HatoBtn variant="pillLight" size="lg" href="genetica-talla-mundial.html">Ver más</HatoBtn>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

window.Genetica = Genetica;
