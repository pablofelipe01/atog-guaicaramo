/* NUESTROS BÚFALOS — editorial, animado e innovador.
   Paleta dedicada: SOLO la gama azul petróleo del sistema (claros + oscuros) + beige.
   Secciones: Hero · Sistema · Búfalos de trabajo · Búfalas para leche · Búfalos para carne · CTA */

const { useState: bUse, useEffect: bEff, useRef: bRef } = React;

/* ---------- Reveal-on-scroll ---------- */
function useNBReveal(opts = {}) {
  const ref = bRef(null);
  const [seen, setSeen] = bUse(false);
  bEff(() => {
    const el = ref.current;
    if (!el) return;
    let alive = true;
    const reveal = () => { if (alive) { setSeen(true); cleanup(); } };
    const check = () => {
      if (!alive || !el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh * 0.9 && r.bottom > 0) reveal();
    };
    const onScroll = () => requestAnimationFrame(check);
    const cleanup = () => {
      alive = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearInterval(t);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Measure after layout settles.
    requestAnimationFrame(() => requestAnimationFrame(check));
    // Safety re-check for throttled environments — only reveals if the element
    // is actually within the viewport, so below-the-fold sections stay hidden
    // until the user scrolls them in (preserving the entrance animation).
    const t = setInterval(check, 400);
    return cleanup;
  }, []);
  return [ref, seen];
}

function NBReveal({ children, delay = 0, as = "div", y = 18, dur = 760, style }) {
  const [ref, seen] = useNBReveal();
  const Tag = as;
  return (
    <Tag ref={ref} style={{
      opacity: seen ? 1 : 0,
      transform: seen ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity ${dur}ms var(--g-ease-soft) ${delay}ms, transform ${dur}ms var(--g-ease-soft) ${delay}ms`,
      ...style,
    }}>{children}</Tag>
  );
}

/* ---------- Animated number counter ---------- */
function NBCount({ to, dur = 1600, decimals = 0, sep = false, prefix = "", suffix = "" }) {
  const [ref, seen] = useNBReveal({ threshold: 0.4 });
  const [val, setVal] = bUse(0);
  bEff(() => {
    if (!seen) return;
    let raf, start, finished = false;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setVal(to * ease(p));
      if (p < 1) raf = requestAnimationFrame(step);
      else finished = true;
    };
    raf = requestAnimationFrame(step);
    // Guarantee the final value even if rAF is throttled/never fires.
    const snap = setTimeout(() => { if (!finished) setVal(to); }, dur + 120);
    return () => { cancelAnimationFrame(raf); clearTimeout(snap); };
  }, [seen]);
  let out = val.toFixed(decimals);
  if (sep) out = Number(out).toLocaleString("es-CO");
  return <span ref={ref}>{prefix}{out}{suffix}</span>;
}

/* ---------- Word-rise heading line ---------- */
function NBRiseLine({ text, delay = 0, color, italic = false, size }) {
  const [ref, seen] = useNBReveal({ threshold: 0.3 });
  const words = text.split(" ");
  return (
    <div ref={ref} style={{
      fontFamily: "var(--g-font-display)",
      fontSize: size || "clamp(40px, 6.4vw, 96px)",
      lineHeight: 1.04, letterSpacing: "-0.022em",
      color: color || "var(--g-beige)",
      fontStyle: italic ? "italic" : "normal", fontWeight: 400, margin: 0,
    }}>
      {words.map((w, wi) => (
        <span key={wi} style={{
          display: "inline-block",
          clipPath: "polygon(-100% 0, 200% 0, 200% 100%, -100% 100%)",
          verticalAlign: "top",
          paddingTop: "0.32em", paddingBottom: "0.32em",
          marginTop: "-0.32em", marginBottom: "-0.32em",
          lineHeight: 1.04,
          marginRight: wi === words.length - 1 ? 0 : "0.28em",
        }}>
          <span style={{
            display: "inline-block",
            transform: seen ? "translateY(0) skewY(0)" : "translateY(112%) skewY(6deg)",
            opacity: seen ? 1 : 0,
            filter: seen ? "blur(0)" : "blur(6px)",
            transition: `transform 900ms cubic-bezier(.2,.7,.2,1) ${delay + wi * 90}ms, opacity 900ms ${delay + wi * 90}ms, filter 900ms ${delay + wi * 90}ms`,
          }}>{w}</span>
        </span>
      ))}
    </div>
  );
}

/* ===================================================================== */
function NuestrosBufalos() {
  HatoLucide();
  return (
    <>
      <style>{`
        @keyframes nb-floatBg { 0%{transform:translate3d(0,0,0) scale(1.04)} 100%{transform:translate3d(-3%,2%,0) scale(1.12)} }
        @keyframes nb-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes nb-scrollCue { 0%{transform:translateY(0);opacity:.9} 50%{transform:translateY(9px);opacity:.35} 100%{transform:translateY(0);opacity:.9} }
        @keyframes nb-scrollDot { 0%{transform:translateY(0);opacity:0} 30%{opacity:1} 75%{transform:translateY(13px);opacity:0} 100%{opacity:0} }
        @keyframes nb-cueFloat { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(7px)} }
        @keyframes nb-drip { 0%{transform:translateY(-6px);opacity:0} 25%{opacity:1} 100%{transform:translateY(26px);opacity:0} }
        @keyframes nb-pulseDot { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(.55);opacity:.5} }
        @keyframes nb-slowSpin { to { transform: rotate(360deg); } }
      `}</style>
      <BufHero />
      <SistemaIntro />
      <PilaresIndex />
      <BufalosTrabajo />
      <BufalasLeche />
      <BufalosCarne />
      <BufalosCTA />
    </>
  );
}

/* =====================================================================
   HERO
===================================================================== */
function BufHero() {
  return (
    <section style={{
      position: "relative", minHeight: "100vh",
      background: "var(--g-petroleo-900)", color: "var(--g-beige)",
      overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center",
    }}>
      {/* Backdrop image */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('assets/photography/bufalos-pastura-cordillera.jpg')",
        backgroundSize: "cover", backgroundPosition: "center",
        animation: "nb-floatBg 22s ease-in-out infinite alternate",
      }}/>
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(8,16,26,0.78) 0%, rgba(8,16,26,0.42) 38%, rgba(8,16,26,0.72) 78%, rgba(8,16,26,0.96) 100%)",
      }}/>
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at 78% 30%, rgba(61,79,114,0.30), transparent 52%)",
      }}/>

      <div style={{ position: "relative", maxWidth: 1440, margin: "0 auto", width: "100%", padding: "120px 56px 56px", flex: "1 0 auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <NBReveal>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 14, marginBottom: 26,
            fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500,
            letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--g-petroleo-200)",
          }}>
            <span style={{ width: 40, height: 1, background: "var(--g-petroleo-200)" }}/>
            Hato Guaicaramo · Sistema bufalino
          </div>
        </NBReveal>

        <h1 style={{ margin: 0 }}>
          <NBRiseLine text="Nuestros" color="rgba(249,246,232,0.62)" size="clamp(28px, 4vw, 58px)" />
          <NBRiseLine text="Búfalos" delay={120} size="clamp(64px, 11vw, 168px)" />
        </h1>

        <NBReveal delay={520}>
          <p style={{
            marginTop: 30, maxWidth: "44ch",
            fontFamily: "var(--g-font-sans)", fontSize: "clamp(16px, 1.5vw, 21px)",
            lineHeight: 1.6, color: "rgba(249,246,232,0.86)", textWrap: "pretty",
          }}>
            No trabajamos el búfalo como una especie más.
            Lo integramos como un <strong style={{ color: "var(--g-beige)" }}>sistema productivo real</strong>.
          </p>
        </NBReveal>
      </div>

      {/* Scroll hint — subtle floating capsule */}
      <div aria-hidden style={{
        position: "absolute", bottom: 38, left: "50%", zIndex: 3,
        animation: "nb-cueFloat 3s ease-in-out infinite",
        width: 27, height: 43, borderRadius: 999,
        border: "1.5px solid rgba(249,246,232,0.45)",
        display: "flex", justifyContent: "center", paddingTop: 8,
      }}>
        <span style={{ width: 4, height: 8, borderRadius: 999, background: "rgba(249,246,232,0.85)", animation: "nb-scrollDot 1.9s ease-in-out infinite" }}/>
      </div>
    </section>
  );
}

/* =====================================================================
   SISTEMA — manifest intro (light)
===================================================================== */
function SistemaIntro() {
  const pillars = [
    { icon: "dna", k: "Genética", d: "que funciona" },
    { icon: "leaf", k: "Nutrición", d: "que sostiene el sistema" },
    { icon: "settings-2", k: "Manejo", d: "que estabiliza la producción" },
  ];
  bEff(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <section style={{ background: "var(--g-bg)", padding: "clamp(80px,11vw,150px) 0", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(90deg, transparent calc(50% - .5px), rgba(61,79,114,0.05) calc(50% - .5px), rgba(61,79,114,0.05) calc(50% + .5px), transparent calc(50% + .5px))",
        pointerEvents: "none",
      }}/>
      <div style={{ position: "relative", maxWidth: 1440, margin: "0 auto", padding: "0 56px" }}>
        <div style={{ maxWidth: 1080 }}>
          <NBReveal>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 14, marginBottom: 30,
              fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--g-petroleo-700)",
            }}>
              <span style={{ width: 28, height: 1, background: "var(--g-petroleo-700)" }}/>
              El enfoque
            </div>
          </NBReveal>
          <NBRiseLine text="Producimos carne y leche" color="var(--g-petroleo-900)" size="clamp(34px, 5vw, 78px)" />
          <NBRiseLine text="con una lógica clara." delay={120} color="var(--g-petroleo-700)" italic size="clamp(34px, 5vw, 78px)" />
        </div>

        <div style={{
          marginTop: "clamp(48px,6vw,84px)",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 1,
          background: "var(--g-line)", border: "1px solid var(--g-line)", borderRadius: 18, overflow: "hidden",
        }}>
          {pillars.map((p, i) => (
            <NBReveal key={p.k} delay={i * 110} style={{ background: "var(--g-bg-elevated)" }}>
              <div style={{ padding: "34px 30px 38px", height: "100%" }}>
                <span style={{
                  display: "inline-flex", width: 46, height: 46, borderRadius: 12,
                  background: "var(--g-petroleo-50)", color: "var(--g-petroleo-700)",
                  alignItems: "center", justifyContent: "center", marginBottom: 22,
                }}>
                  <i data-lucide={p.icon} style={{ width: 22, height: 22 }}/>
                </span>
                <div style={{
                  fontFamily: "var(--g-font-display)", fontSize: 30, lineHeight: 1.05,
                  color: "var(--g-petroleo-900)", marginBottom: 6,
                }}>{p.k}</div>
                <div style={{ fontFamily: "var(--g-font-sans)", fontSize: 15, color: "var(--g-cafe-700)" }}>{p.d}</div>
              </div>
            </NBReveal>
          ))}
        </div>

        <NBReveal delay={200}>
          <p style={{
            marginTop: "clamp(40px,5vw,64px)", maxWidth: "60ch",
            fontFamily: "var(--g-font-sans)", fontSize: "clamp(16px,1.5vw,19px)",
            lineHeight: 1.7, color: "var(--g-cafe-700)", textWrap: "pretty",
          }}>
            Manejo que mantiene la producción estable todo el año — y tres frentes
            que se sostienen entre sí dentro de un mismo modelo.
          </p>
        </NBReveal>
      </div>
    </section>
  );
}

/* =====================================================================
   ÍNDICE DE PILARES
===================================================================== */
function PilaresIndex() {
  const items = [
    { n: "01", t: "Búfalos de trabajo", d: "Fuerza · resistencia · docilidad" },
    { n: "02", t: "Búfalas para leche", d: "Tecnología · registro · gestión" },
    { n: "03", t: "Búfalos para carne", d: "Nutrición · genética · manejo" },
  ];
  return (
    <section style={{ background: "var(--g-petroleo-900)", color: "var(--g-beige)", padding: "clamp(54px,7vw,90px) 0" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 56px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 0 }}>
          {items.map((it, i) => (
            <NBReveal key={it.n} delay={i * 110} style={{
              padding: "8px 36px", borderLeft: i === 0 ? "none" : "1px solid rgba(249,246,232,0.16)",
            }}>
              <div style={{
                fontFamily: "var(--g-font-display)", fontSize: 15, letterSpacing: "0.12em",
                color: "var(--g-petroleo-200)", marginBottom: 14,
              }}>{it.n}</div>
              <div style={{ fontFamily: "var(--g-font-display)", fontSize: "clamp(24px,2.4vw,34px)", lineHeight: 1.08, marginBottom: 10 }}>{it.t}</div>
              <div style={{ fontFamily: "var(--g-font-sans)", fontSize: 13, letterSpacing: "0.04em", color: "rgba(249,246,232,0.62)", textTransform: "uppercase" }}>{it.d}</div>
            </NBReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   01 · BÚFALOS DE TRABAJO
===================================================================== */
function BufalosTrabajo() {
  const traits = [
    { k: "Fuerza", v: 96, d: "Tracción y capacidad operativa" },
    { k: "Resistencia", v: 92, d: "Adaptados a sistemas rurales exigentes" },
    { k: "Docilidad", v: 88, d: "Manejo seguro y predecible" },
  ];
  return (
    <section style={{ background: "var(--g-bg)", padding: "clamp(90px,11vw,150px) 0", overflow: "hidden" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 56px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr", gap: "clamp(40px,5vw,88px)", alignItems: "center" }} className="nb-split">
          {/* Image with tilt */}
          <NBTiltPhoto src="assets/photography/bufalo-trabajo-palma.jpg" badge="Búfalos de trabajo" tag="01" objectPosition="center" />

          {/* Copy */}
          <div>
            <NBReveal>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 18 }}>
                <span style={{ fontFamily: "var(--g-font-display)", fontSize: "clamp(40px,5vw,64px)", color: "var(--g-petroleo-200)", lineHeight: 1 }}>01</span>
                <span style={{ fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--g-petroleo-700)" }}>Línea de trabajo</span>
              </div>
            </NBReveal>
            <NBReveal delay={80}>
              <h2 style={{
                fontFamily: "var(--g-font-display)", fontSize: "clamp(34px,4.4vw,62px)", lineHeight: 1.02,
                letterSpacing: "-0.02em", color: "var(--g-petroleo-900)", fontWeight: 400, margin: "0 0 24px", textWrap: "balance",
              }}>
                Fuerza, resistencia y <em style={{ fontStyle: "italic", color: "var(--g-petroleo-700)" }}>adaptabilidad</em>.
              </h2>
            </NBReveal>
            <NBReveal delay={160}>
              <p style={{
                fontFamily: "var(--g-font-sans)", fontSize: 17, lineHeight: 1.7, color: "var(--g-cafe-700)",
                margin: "0 0 36px", maxWidth: "52ch", textWrap: "pretty",
              }}>
                Desarrollamos una línea específica de búfalos de trabajo, adaptados a
                sistemas productivos rurales que requieren <strong style={{ color: "var(--g-petroleo-900)", fontWeight: 500 }}>tracción,
                capacidad operativa y docilidad</strong>.
              </p>
            </NBReveal>

            {/* Animated trait meters */}
            <div style={{ display: "grid", gap: 22 }}>
              {traits.map((t, i) => (
                <NBTraitMeter key={t.k} {...t} delay={i * 120} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 900px){ .nb-split{ grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

function NBTraitMeter({ k, v, d, delay }) {
  const [ref, seen] = useNBReveal({ threshold: 0.5 });
  return (
    <div ref={ref}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <span style={{ fontFamily: "var(--g-font-display)", fontSize: 22, color: "var(--g-petroleo-900)" }}>{k}</span>
        <span style={{ fontFamily: "var(--g-font-sans)", fontSize: 13, color: "var(--g-cafe-700)" }}>{d}</span>
      </div>
      <div style={{ height: 6, borderRadius: 6, background: "var(--g-stone-100)", overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 6,
          width: seen ? `${v}%` : "0%",
          background: "linear-gradient(90deg, var(--g-petroleo-500), var(--g-petroleo-200))",
          transition: `width 1100ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        }}/>
      </div>
    </div>
  );
}

function NBTiltPhoto({ src, badge, tag, objectPosition = "center" }) {
  const [ref, seen] = useNBReveal();
  const [tilt, setTilt] = bUse({ x: 0, y: 0 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })} style={{
      position: "relative", aspectRatio: "4 / 5",
      opacity: seen ? 1 : 0,
      transform: `translateY(${seen ? 0 : 26}px) perspective(1200px) rotateX(${tilt.y * -4}deg) rotateY(${tilt.x * 4}deg)`,
      transition: "opacity 900ms var(--g-ease-soft), transform 500ms var(--g-ease-soft)",
      transformStyle: "preserve-3d",
    }}>
      <div style={{
        position: "absolute", inset: 0, borderRadius: 20, overflow: "hidden",
        background: "var(--g-stone-100)", boxShadow: "0 30px 80px rgba(8,16,26,0.22)",
      }}>
        <img src={src} alt={badge} style={{
          width: "100%", height: "100%", objectFit: "cover", objectPosition,
          transform: `scale(1.07) translate(${tilt.x * -10}px, ${tilt.y * -10}px)`,
          transition: "transform 600ms var(--g-ease-soft)",
        }}/>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 55%, rgba(8,16,26,0.5) 100%)" }}/>
      </div>
      {/* Badge */}
      <div style={{
        position: "absolute", left: -22, bottom: 30, background: "var(--g-beige)", border: "1px solid var(--g-line)",
        borderRadius: 14, padding: "14px 20px", boxShadow: "0 18px 40px rgba(8,16,26,0.14)", transform: "translateZ(60px)",
      }}>
        <div style={{ fontFamily: "var(--g-font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--g-petroleo-700)", marginBottom: 4 }}>Hato Guaicaramo</div>
        <div style={{ fontFamily: "var(--g-font-display)", fontSize: 19, color: "var(--g-petroleo-900)" }}>{badge}</div>
      </div>
    </div>
  );
}

/* =====================================================================
   02 · BÚFALAS PARA LECHE — dark stats theatre
===================================================================== */
function BufalasLeche() {
  return (
    <section style={{ position: "relative", background: "var(--g-petroleo-900)", color: "var(--g-beige)", padding: "clamp(96px,12vw,160px) 0", overflow: "hidden" }}>
      <div aria-hidden style={{
        position: "absolute", inset: 0, backgroundImage: "url('assets/photography/ordeno-bufalas.jpg')",
        backgroundSize: "cover", backgroundPosition: "center", opacity: 0.16, filter: "saturate(0.8)",
      }}/>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 22% 20%, rgba(61,79,114,0.28), transparent 50%)" }}/>

      <div style={{ position: "relative", maxWidth: 1440, margin: "0 auto", padding: "0 56px" }}>
        <NBReveal>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 22 }}>
            <span style={{ fontFamily: "var(--g-font-display)", fontSize: "clamp(40px,5vw,64px)", color: "var(--g-petroleo-200)", lineHeight: 1 }}>02</span>
            <span style={{ fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--g-petroleo-200)" }}>Búfalas para leche</span>
          </div>
        </NBReveal>

        <div className="nb-split" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "clamp(36px,5vw,72px)", alignItems: "center", marginBottom: "clamp(48px,6vw,80px)" }}>
          <div style={{ maxWidth: 1000 }}>
            <NBRiseLine text="La producción no se" size="clamp(34px,5.4vw,84px)" />
            <NBRiseLine text="deja al azar." delay={120} color="var(--g-petroleo-200)" italic size="clamp(34px,5.4vw,84px)" />
          </div>
          <NBReveal delay={160}>
            <image-slot id="bufalas-leche-foto" shape="rounded" radius="16"
              placeholder="Arrastra aquí una imagen de las búfalas lecheras"
              style={{ display: "block", width: "100%", height: "clamp(260px, 30vw, 380px)", border: "1px solid rgba(249,246,232,0.18)" }}>
            </image-slot>
          </NBReveal>
        </div>

        {/* Big animated stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 1,
          background: "rgba(249,246,232,0.14)", border: "1px solid rgba(249,246,232,0.14)", borderRadius: 18, overflow: "hidden",
        }}>
          {[
            { val: <NBCount to={2} />, u: "salas de ordeño", note: "Tecnología de punta" },
            { val: <><NBCount to={950} sep />+</>, u: "búfalas ordeñadas", note: "2 veces al día" },
            { val: <NBCount to={4500} sep />, u: "litros diarios", note: "Producción cercana" },
            { val: <><NBCount to={5} decimals={0} /> L</>, u: "promedio por animal", note: "Medido y registrado" },
          ].map((s, i) => (
            <NBReveal key={i} delay={i * 110} style={{ background: "rgba(8,16,26,0.5)" }}>
              <div style={{ padding: "34px 28px 32px" }}>
                <div style={{ fontFamily: "var(--g-font-display)", fontSize: "clamp(44px,5vw,72px)", lineHeight: 0.95, color: "var(--g-beige)", letterSpacing: "-0.02em" }}>{s.val}</div>
                <div style={{ fontFamily: "var(--g-font-sans)", fontSize: 14, color: "var(--g-petroleo-200)", marginTop: 12, marginBottom: 4 }}>{s.u}</div>
                <div style={{ fontFamily: "var(--g-font-sans)", fontSize: 12, color: "rgba(249,246,232,0.55)" }}>{s.note}</div>
              </div>
            </NBReveal>
          ))}
        </div>

        {/* Lifecycle steps + closing manifest */}
        <div style={{ marginTop: "clamp(54px,6vw,96px)", textAlign: "center" }}>
          <NBReveal>
            <p style={{
              fontFamily: "var(--g-font-sans)", fontSize: 17, lineHeight: 1.7, color: "rgba(249,246,232,0.84)",
              margin: "0 auto clamp(28px,4vw,52px)", maxWidth: "56ch", textWrap: "pretty",
            }}>
              Cada búfala está identificada. Sabemos cuánto produce, cómo responde
              al manejo y cómo se comporta dentro del sistema.
            </p>
          </NBReveal>

          {/* Closing manifest words — centered, large */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "baseline", gap: "0.1em 0.5em" }}>
            {["Se controla.", "Se sostiene.", "Se construye."].map((w, i) => (
              <NBRiseLine key={w} text={w} delay={i * 130} color={i === 2 ? "var(--g-petroleo-200)" : "var(--g-beige)"} italic={i === 2} size="clamp(38px,6.2vw,92px)" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   03 · BÚFALOS PARA CARNE
===================================================================== */
function BufalosCarne() {
  const linea = [
    { k: "Machos de levante", d: "Crecimiento eficiente bajo manejo planificado.", icon: "trending-up" },
    { k: "Toros reproductores", d: "75% mediterráneos, de búfalas élite de nuestros ordeños.", icon: "award" },
    { k: "Bubillas preñadas", d: "Hembras de reposición listas para el sistema.", icon: "sprout" },
  ];
  bEff(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <section style={{ background: "var(--g-bg)", padding: "clamp(90px,11vw,150px) 0", overflow: "hidden" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 56px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: "clamp(40px,5vw,88px)", alignItems: "center", marginBottom: "clamp(56px,7vw,96px)" }} className="nb-split">
          {/* Copy */}
          <div>
            <NBReveal>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 18 }}>
                <span style={{ fontFamily: "var(--g-font-display)", fontSize: "clamp(40px,5vw,64px)", color: "var(--g-petroleo-200)", lineHeight: 1 }}>03</span>
                <span style={{ fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--g-petroleo-700)" }}>Búfalos para carne</span>
              </div>
            </NBReveal>
            <NBReveal delay={80}>
              <h2 style={{
                fontFamily: "var(--g-font-display)", fontSize: "clamp(34px,4.6vw,66px)", lineHeight: 1.02,
                letterSpacing: "-0.02em", color: "var(--g-petroleo-900)", fontWeight: 400, margin: "0 0 24px", textWrap: "balance",
              }}>
                Una especie <em style={{ fontStyle: "italic", color: "var(--g-petroleo-700)" }}>altamente eficiente</em>.
              </h2>
            </NBReveal>
            <NBReveal delay={160}>
              <p style={{ fontFamily: "var(--g-font-sans)", fontSize: 17, lineHeight: 1.7, color: "var(--g-cafe-700)", margin: "0 0 28px", maxWidth: "52ch", textWrap: "pretty" }}>
                Lo desarrollamos bajo un sistema basado en <strong style={{ color: "var(--g-petroleo-900)", fontWeight: 500 }}>nutrición
                estratégica, genética funcional y manejo planificado</strong>.
              </p>
            </NBReveal>
            {/* Soporte chips */}
            <NBReveal delay={240}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {["Sal proteinada propia", "Pasto Brachiaria Humidicola"].map((c) => (
                  <span key={c} style={{
                    display: "inline-flex", alignItems: "center", gap: 8, background: "var(--g-petroleo-50)",
                    color: "var(--g-petroleo-700)", borderRadius: 999, padding: "9px 16px",
                    fontFamily: "var(--g-font-sans)", fontSize: 13, fontWeight: 500,
                  }}>
                    <span style={{ width: 7, height: 7, borderRadius: 7, background: "var(--g-petroleo-500)", animation: "nb-pulseDot 2.4s ease-in-out infinite" }}/>
                    {c}
                  </span>
                ))}
              </div>
            </NBReveal>
          </div>

          {/* Image */}
          <NBTiltPhoto src="assets/photography/bufalas-grupo-pastura.jpg" badge="Búfalos para carne" tag="03" objectPosition="center" />
        </div>

        {/* Línea productiva cards */}
        <NBReveal>
          <div style={{
            display: "flex", alignItems: "center", gap: 16, marginBottom: 30,
            fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.22em",
            textTransform: "uppercase", color: "var(--g-petroleo-700)",
          }}>
            <span style={{ width: 28, height: 1, background: "var(--g-petroleo-700)" }}/>
            Nuestra línea productiva
          </div>
        </NBReveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {linea.map((l, i) => (
            <NBLineaCard key={l.k} {...l} n={i + 1} delay={i * 110} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NBLineaCard({ k, d, icon, n, delay }) {
  const [hover, setHover] = bUse(false);
  return (
    <NBReveal delay={delay}>
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
        position: "relative", background: "var(--g-bg-elevated)", border: "1px solid var(--g-line)",
        borderRadius: 18, padding: "30px 28px 32px", height: "100%",
        transform: hover ? "translateY(-6px)" : "none",
        boxShadow: hover ? "0 18px 40px -12px rgba(8,16,26,0.2)" : "0 6px 18px -10px rgba(8,16,26,0.14)",
        transition: "transform 300ms var(--g-ease-out), box-shadow 300ms var(--g-ease-out)",
        overflow: "hidden",
      }}>
        <span style={{
          position: "relative", display: "inline-flex", width: 46, height: 46, borderRadius: 12,
          background: "var(--g-petroleo-50)", color: "var(--g-petroleo-700)", alignItems: "center", justifyContent: "center", marginBottom: 22,
        }}>
          <i data-lucide={icon} style={{ width: 22, height: 22 }}/>
        </span>
        <div style={{ position: "relative", fontFamily: "var(--g-font-display)", fontSize: 24, lineHeight: 1.1, color: "var(--g-petroleo-900)", marginBottom: 10 }}>{k}</div>
        <div style={{ position: "relative", fontFamily: "var(--g-font-sans)", fontSize: 15, lineHeight: 1.55, color: "var(--g-cafe-700)", textWrap: "pretty" }}>{d}</div>
      </div>
    </NBReveal>
  );
}

/* =====================================================================
   CTA
===================================================================== */
function BufalosCTA() {
  return (
    <section style={{ position: "relative", background: "var(--g-petroleo-900)", color: "var(--g-beige)", padding: "clamp(80px,10vw,130px) 0", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 120%, rgba(61,79,114,0.32), transparent 60%)" }}/>
      <div style={{ position: "relative", maxWidth: 1000, margin: "0 auto", padding: "0 56px", textAlign: "center" }}>
        <NBRiseLine text="Aquí la producción se construye." color="var(--g-beige)" size="clamp(32px,4.6vw,68px)" />
        <NBReveal delay={260}>
          <div style={{ marginTop: 38, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <NBCtaLink href="index.html#bufalos" solid>Volver al inicio</NBCtaLink>
            <NBCtaLink href="nutricion-animal.html">Nutrición animal</NBCtaLink>
          </div>
        </NBReveal>
      </div>
    </section>
  );
}

function NBCtaLink({ href, children, solid = false }) {
  const [h, setH] = bUse(false);
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    fontFamily: "var(--g-font-sans)", fontSize: 15, fontWeight: 500, letterSpacing: "0.02em",
    padding: "14px 28px", borderRadius: 999, textDecoration: "none",
    transition: "all 200ms var(--g-ease-soft)", border: "1px solid transparent",
  };
  const solidStyle = {
    background: h ? "#ffffff" : "var(--g-beige)", color: "var(--g-petroleo-800)",
    transform: h ? "translateY(-2px)" : "none", boxShadow: h ? "0 14px 30px rgba(8,16,26,0.32)" : "0 6px 16px rgba(8,16,26,0.2)",
  };
  const outlineStyle = {
    background: h ? "rgba(249,246,232,0.12)" : "transparent",
    color: "var(--g-beige)", border: "1px solid rgba(249,246,232,0.42)",
  };
  return (
    <a href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ ...base, ...(solid ? solidStyle : outlineStyle) }}>{children}</a>
  );
}

window.NuestrosBufalos = NuestrosBufalos;
