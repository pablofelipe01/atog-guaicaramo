/* Quiénes Somos — extended "about" module, follows Hato design system strictly */

function QuienesSomos() {
  HatoLucide();

  return (
    <div id="quienes" style={{ background: "var(--g-bg)" }}>

      {/* 1 · HERO — image left, copy right, dense */}
      <section style={{
        position: "relative",
        backgroundImage: "linear-gradient(rgba(249,246,232,0.92), rgba(249,246,232,0.92)), url('assets/photography/bufalas-grupo-pastura.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "32px 56px 56px",
        borderBottom: "1px solid var(--g-line)"
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "0.95fr 1.05fr",
            gap: 64, alignItems: "stretch", minHeight: 480
          }}>
            {/* Image side with floating metric chip */}
            <div style={{ position: "relative", ...qsRise(0) }}>
              <div style={{
                position: "relative", height: "100%", minHeight: 460,
                borderRadius: 14, overflow: "hidden",
                background: "var(--g-stone-100)"
              }}>
                <img src="assets/photography/hero-nelore-hato.jpg"
                alt="Hato Guaicaramo — sabana llanera"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />

                {/* Floating "Ver video" button */}
                <a href="https://www.instagram.com/hatoguaicaramo/" target="_blank" rel="noopener noreferrer"
                style={{
                  position: "absolute", left: 20, bottom: 20,
                  textDecoration: "none",
                  animation: "qsFloat 5s ease-in-out infinite"
                }}>
                  <VideoCtaButton />
                </a>
              </div>
            </div>

            {/* Copy side */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", ...qsRise(1) }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--g-verde-500)", marginBottom: 20
              }}>
                <span style={{ width: 24, height: 1, background: "var(--g-verde-500)" }} />
                Sobre nosotros
              </div>

              <h1 style={{
                fontFamily: "var(--g-font-display)",
                fontSize: "clamp(44px, 5vw, 72px)",
                lineHeight: 1.02, letterSpacing: "-0.022em",
                color: "var(--g-verde-800)", fontWeight: 400, margin: 0,
                textWrap: "balance"
              }}>
                Hato <em style={{ fontStyle: "italic", color: "var(--g-verde-700)" }}>Guaicaramo.</em>
              </h1>

              <p style={{
                marginTop: 20,
                fontFamily: "var(--g-font-sans)", fontSize: 17, lineHeight: 1.55,
                color: "var(--g-fg-muted)", maxWidth: "52ch", textWrap: "pretty"
              }}>
                Empresa ganadera especializada en genética de talla mundial y sistemas
                eficientes de producción animal para el trópico colombiano.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · QUIÉNES SOMOS — split layout: title left, copy right */}
      <section style={{
        position: "relative",
        backgroundImage: "linear-gradient(rgba(183,173,145,0.88), rgba(183,173,145,0.88)), url('assets/photography/bufalos-pastura-cordillera.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        padding: "72px 56px",
        borderTop: "1px solid var(--g-line)"
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 64,
            alignItems: "start"
          }}>
            <div style={{ ...qsRise(0) }}>
              <div style={{
                fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--g-petroleo-900)", marginBottom: 20
              }}>Quiénes somos</div>

              <h2 style={{
                fontFamily: "var(--g-font-display)",
                fontSize: "clamp(32px, 3.4vw, 48px)",
                lineHeight: 1.02, letterSpacing: "-0.018em",
                color: "var(--g-petroleo-900)", fontWeight: 400, margin: 0
              }}>
                Genética, nutrición y manejo.{" "}
                <em style={{ color: "var(--g-beige)", fontStyle: "italic" }}>
                  El sistema completo.
                </em>
              </h2>

              {/* Pillar pills — denser, inline */}
              <div style={{
                marginTop: 32, display: "flex", flexWrap: "wrap", gap: 10
              }}>
                {[
                { icon: "flask-conical", label: "Genética mundial" },
                { icon: "trending-up", label: "Más kg / ha" },
                { icon: "layers", label: "Enfoque integral" }].
                map((p) =>
                <PillarChip key={p.label} icon={p.icon} label={p.label} />
                )}
              </div>
            </div>

            <div style={{ display: "grid", gap: 18, ...qsRise(2) }}>
              <p style={{
                fontFamily: "var(--g-font-sans)", fontSize: 17, lineHeight: 1.6,
                color: "var(--g-petroleo-900)", margin: 0, textWrap: "pretty"
              }}>
                Somos una empresa ganadera especializada en <strong style={{ color: "var(--g-beige)" }}>genética de talla mundial</strong> y
                en la creación de sistemas eficientes de producción animal para el trópico.
              </p>
              <p style={{
                fontFamily: "var(--g-font-sans)", fontSize: 16, lineHeight: 1.6,
                color: "var(--g-petroleo-800)", margin: 0, textWrap: "pretty"
              }}>
                Nuestro propósito es claro: contribuir con el desarrollo del trópico,
                produciendo más kilos de carne y litros de leche por hectárea, con un
                enfoque social, ambiental y económico.
              </p>
              <p style={{
                fontFamily: "var(--g-font-sans)", fontSize: 16, lineHeight: 1.6,
                color: "var(--g-petroleo-900)", margin: 0, textWrap: "pretty"
              }}>
                Invertimos en genética, nutrición y manejo porque entendemos que la
                <strong style={{ color: "var(--g-beige)" }}> rentabilidad está en los ciclos productivos</strong>, no en la improvisación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 + 4 · MÉTRICAS con íconos integrados */}
      <section style={{
        position: "relative",
        backgroundImage: "linear-gradient(rgba(249,246,232,0.91), rgba(249,246,232,0.91)), url('assets/photography/bufalas-pastoreo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        padding: "72px 56px",
        borderTop: "1px solid var(--g-line)"
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Capability strip — 5 floating icons */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24,
            textAlign: "center"
          }}>
            {[
            { name: "flask-conical", label: "Genética",       color: "#233653", delay: "0s" },
            { name: "sprout",        label: "Sabana",         color: "#627761", delay: "0.6s" },
            { name: "heart-pulse",   label: "Bienestar",      color: "#9AAD99", delay: "1.2s" },
            { name: "award",         label: "Calidad",        color: "#B7AD91", delay: "0.3s" },
            { name: "leaf",          label: "Sostenibilidad", color: "#233653", delay: "0.9s" }].
            map((it) =>
            <div key={it.label} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 12
            }}>
                <span style={{
                width: 56, height: 56, borderRadius: 999,
                border: "1px solid " + it.color,
                background: it.color,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                color: "var(--g-beige)",
                animation: `qsFloat 4.2s ease-in-out ${it.delay} infinite`
              }}>
                  <HatoIcon name={it.name} size={24} />
                </span>
                <div style={{
                fontFamily: "var(--g-font-sans)", fontSize: 11, fontWeight: 500,
                letterSpacing: "0.10em", textTransform: "uppercase",
                color: it.color
              }}>{it.label}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5 · MISIÓN Y VISIÓN — interactive flip-style cards */}
      <section style={{
        position: "relative",
        backgroundColor: "var(--g-verde-500)",
        backgroundImage: "linear-gradient(rgba(98,119,97,0.90), rgba(98,119,97,0.90)), url('assets/photography/nelore-grupo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        padding: "72px 56px",
        borderTop: "1px solid var(--g-verde-600)"
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{
            display: "flex", alignItems: "baseline", gap: 18, marginBottom: 32,
            ...qsRise(0)
          }}>
            <div style={{
              fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--g-beige)"
            }}>Propósito</div>
            <span style={{ flex: 1, height: 1, background: "rgba(249,246,232,0.4)" }} />
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22
          }}>
            {[
            {
              icon: "target",
              title: "Misión",
              body: "Guaicaramo es una empresa dedicada al desarrollo de la agroindustria, con énfasis en la palma de aceite y sus derivados, comprometida con la sostenibilidad, la comunidad, sus empleados, socios y clientes, siguiendo principios de calidad y eficiencia."
            },
            {
              icon: "eye",
              title: "Visión",
              body: "Ser una empresa líder reconocida en Colombia en el sector de la palma de aceite, biocombustibles, ganadería, derivados lácteos y agricultura, satisfaciendo mercados nacionales e internacionales en beneficio de los clientes, la comunidad y sus socios."
            }].
            map((card, i) => <MisionVisionCard key={card.title} {...card} delay={i} />)}
          </div>
        </div>
      </section>

      {/* 6 · VALORES CORPORATIVOS — hoverable cards with reveal */}
      <section style={{
        position: "relative",
        backgroundImage: "linear-gradient(rgba(249,246,232,0.90), rgba(249,246,232,0.90)), url('assets/photography/bufalas-grupo-pastura.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        padding: "72px 56px",
        borderTop: "1px solid var(--g-line)"
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            gap: 32, flexWrap: "wrap", marginBottom: 32
          }}>
            <div>
              <div style={{
                fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--g-verde-700)", marginBottom: 12
              }}>Valores corporativos</div>
              <h2 style={{
                fontFamily: "var(--g-font-display)",
                fontSize: "clamp(28px, 3vw, 40px)",
                lineHeight: 1.05, color: "var(--g-verde-800)", fontWeight: 400,
                margin: 0, maxWidth: "20ch"
              }}>
                Cuatro principios que <em style={{ color: "var(--g-verde-700)", fontStyle: "italic" }}>guían</em> cada decisión.
              </h2>
            </div>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18
          }}>
            {[
            { icon: "flame",        num: "01", title: "Pasión",         desc: "Caminamos hacia la excelencia en cada acción.",                    tone: "#233653", tint: "rgba(35,54,83,0.16)" },
            { icon: "shield-check", num: "02", title: "Transparencia",  desc: "Promovemos la confianza en todas las partes interesadas.",        tone: "#627761", tint: "rgba(98,119,97,0.18)" },
            { icon: "rocket",       num: "03", title: "Emprendimiento", desc: "Retamos al statu quo en toda la organización.",                  tone: "#9AAD99", tint: "rgba(154,173,153,0.28)" },
            { icon: "compass",      num: "04", title: "Liderazgo",      desc: "Motivamos, inspiramos y empoderamos para encontrar soluciones.", tone: "#B7AD91", tint: "rgba(183,173,145,0.28)" }].
            map((v, i) => <ValorCard key={v.title} {...v} delay={i} />)}
          </div>
        </div>
      </section>

      {/* 7 · CITA EDITORIAL — bigger, centered, with quote glyph */}
      <section style={{
        position: "relative",
        backgroundImage: "linear-gradient(rgba(40,55,42,0.88), rgba(40,55,42,0.88)), url('assets/photography/bufalo-trabajo-palma.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        padding: "96px 56px",
        borderTop: "1px solid var(--g-verde-800)", overflow: "hidden"
      }}>
        {/* Huge background quote glyph */}
        <span aria-hidden="true" style={{
          position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
          fontFamily: "var(--g-font-display)", fontSize: 360, lineHeight: 1,
          color: "var(--g-verde-700)", opacity: 0.35, pointerEvents: "none",
          userSelect: "none"
        }}>"</span>

        <div style={{
          maxWidth: 880, margin: "0 auto", position: "relative", textAlign: "center"
        }}>
          <p style={{
            fontFamily: "var(--g-font-display)",
            fontSize: "clamp(28px, 3vw, 40px)",
            lineHeight: 1.25, letterSpacing: "-0.012em",
            color: "var(--g-beige)", fontWeight: 400, fontStyle: "italic",
            margin: 0, textWrap: "pretty"
          }}>
            La rentabilidad está en los <em style={{ fontStyle: "italic", color: "var(--g-cafe-300)" }}>ciclos productivos</em>, no en la improvisación.
          </p>
          <div style={{
            marginTop: 28, display: "inline-flex", alignItems: "center", gap: 12,
            fontFamily: "var(--g-font-sans)", fontSize: 11, fontWeight: 500,
            letterSpacing: "0.20em", textTransform: "uppercase",
            color: "var(--g-cafe-300)"
          }}>
            <span style={{ width: 32, height: 1, background: "var(--g-cafe-400)" }} />
            Filosofía Guaicaramo
            <span style={{ width: 32, height: 1, background: "var(--g-cafe-400)" }} />
          </div>
        </div>
      </section>

      {/* Animations */}
      <style>{`
        @keyframes qsFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes qsFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes qsCount {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes qsPlayPulse {
          0%   { transform: scale(1);   opacity: 0.55; }
          70%  { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(1.35); opacity: 0; }
        }
      `}</style>
    </div>);

}

/* === Interactive sub-components === */

function VideoCtaButton() {
  const [h, setH] = React.useState(false);
  return (
    <span
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        position: "relative",
        display: "inline-flex", alignItems: "center", gap: 12,
        padding: "12px 20px 12px 12px",
        background: "rgba(249,246,232,0.94)",
        backdropFilter: "blur(8px)",
        border: "1px solid " + (h ? "var(--g-verde-500)" : "var(--g-line)"),
        borderRadius: 999,
        boxShadow: h ? "0 14px 30px rgba(8,16,26,0.18)" : "0 6px 16px rgba(8,16,26,0.10)",
        transition: "all 240ms var(--g-ease-soft)",
        transform: h ? "translateY(-2px)" : "none",
        cursor: "pointer", width: "281px", height: "48px"
      }}>
      {/* Play icon with pulsing ring */}
      <span style={{
        position: "relative",
        width: 42, height: 42, borderRadius: 999,
        background: "var(--g-verde-500)", color: "var(--g-beige)",
        display: "inline-flex", alignItems: "center", justifyContent: "center"
      }}>
        <span aria-hidden="true" style={{
          position: "absolute", inset: 0, borderRadius: 999,
          border: "1px solid var(--g-verde-500)",
          animation: "qsPlayPulse 2.2s ease-out infinite"
        }} />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>

      <span>
        <span style={{
          display: "block",
          fontFamily: "var(--g-font-sans)", fontSize: 10,
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: "var(--g-cafe-700)", marginBottom: 2
        }}>CONOCE NUESTRA HISTORIA</span>
        <span style={{
          display: "block",
          fontFamily: "var(--g-font-display)", fontSize: 17,
          color: h ? "var(--g-verde-700)" : "var(--g-verde-800)",
          lineHeight: 1.1,
          transition: "color 240ms var(--g-ease-soft)"
        }}>Ver video</span>
      </span>
    </span>);

}

function HeroPillar({ icon, badge, value }) {
  const [h, setH] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      tabIndex={0}
      style={{
        position: "relative",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        padding: "14px 12px 16px",
        background: h ? "rgba(249,246,232,0.85)" : "transparent",
        backdropFilter: h ? "blur(8px)" : "none",
        borderRadius: 12,
        border: "1px solid " + (h ? "var(--g-verde-300)" : "transparent"),
        transition: "all 220ms var(--g-ease-soft)",
        transform: h ? "translateY(-2px)" : "none",
        cursor: "default"
      }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <span style={{
          width: 38, height: 38, borderRadius: 999,
          background: h ? "var(--g-verde-500)" : "var(--g-verde-50)",
          color: h ? "var(--g-beige)" : "var(--g-verde-700)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          transition: "all 220ms var(--g-ease-soft)"
        }}>
          <HatoIcon name={icon} size={18} />
        </span>
        <span style={{
          width: 24, height: 24, borderRadius: 999,
          background: "var(--g-cafe-100)", color: "var(--g-cafe-700)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          transform: h ? "translateX(2px) rotate(8deg)" : "none",
          transition: "transform 280ms var(--g-ease-soft)"
        }}>
          <HatoIcon name={badge} size={12} />
        </span>
      </div>
      <div style={{
        fontFamily: "var(--g-font-display)", fontSize: 18,
        color: h ? "var(--g-verde-800)" : "var(--g-cafe-700)",
        fontWeight: 400, lineHeight: 1.1,
        textAlign: "center",
        transition: "color 220ms var(--g-ease-soft)"
      }}>{value}</div>
    </div>);

}

function PillarChip({ icon, label }) {
  const [h, setH] = React.useState(false);
  return (
    <span onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      fontFamily: "var(--g-font-sans)", fontSize: 13, fontWeight: 500,
      color: h ? "var(--g-beige)" : "var(--g-verde-700)",
      background: h ? "var(--g-verde-500)" : "var(--g-beige)",
      border: "1px solid " + (h ? "var(--g-verde-500)" : "var(--g-verde-200)"),
      borderRadius: 999, padding: "10px 16px",
      transition: "all 220ms var(--g-ease-soft)",
      cursor: "default"
    }}>
      <HatoIcon name={icon} size={14} />
      {label}
    </span>);

}

function MetricCard({ icon, num, label, delay }) {
  const [h, setH] = React.useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    style={{
      background: h ? "var(--g-petroleo-700)" : "rgba(249,246,232,0.72)",
      backdropFilter: h ? "none" : "blur(10px)",
      WebkitBackdropFilter: h ? "none" : "blur(10px)",
      border: "1px solid " + (h ? "var(--g-petroleo-700)" : "rgba(255,255,255,0.6)"),
      borderRadius: 14, padding: "28px 24px",
      transition: "all 280ms var(--g-ease-soft)",
      transform: h ? "translateY(-4px)" : "none",
      cursor: "default",
      boxShadow: h ? "0 16px 30px rgba(8,16,26,0.18)" : "0 4px 14px rgba(8,16,26,0.05)",
      ...qsRise(delay)
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{
          fontFamily: "var(--g-font-display)",
          fontSize: "clamp(36px, 3.6vw, 52px)",
          lineHeight: 1, letterSpacing: "-0.025em",
          color: h ? "var(--g-beige)" : "var(--g-verde-700)", fontWeight: 400,
          transition: "color 280ms var(--g-ease-soft)"
        }}>{num}</span>
        <span style={{
          color: h ? "var(--g-verde-300)" : "var(--g-cafe-500)",
          transition: "color 280ms var(--g-ease-soft)"
        }}>
          <HatoIcon name={icon} size={22} />
        </span>
      </div>
      <div style={{
        marginTop: 14, paddingTop: 14,
        borderTop: "1px solid " + (h ? "rgba(249,246,232,0.18)" : "var(--g-line)"),
        fontFamily: "var(--g-font-sans)", fontSize: 12,
        letterSpacing: "0.04em",
        color: h ? "rgba(249,246,232,0.75)" : "var(--g-fg-muted)",
        transition: "all 280ms var(--g-ease-soft)"
      }}>{label}</div>
    </div>);

}

function MisionVisionCard({ icon, title, body, delay }) {
  const [h, setH] = React.useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    style={{
      position: "relative",
      overflow: "visible",
      borderRadius: 20,
      padding: "40px 36px",
      background: "var(--g-beige)",
      border: "2px solid " + (h ? "var(--g-verde-600)" : "rgba(98,119,97,0.2)"),
      transition: "all 380ms var(--g-ease-out)",
      transform: h ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
      boxShadow: h
        ? "0 24px 48px rgba(98,119,97,0.25), 0 0 0 1px rgba(249,246,232,0.5)"
        : "0 4px 16px rgba(98,119,97,0.08)",
      cursor: "pointer",
      minHeight: 300,
      display: "flex",
      flexDirection: "column",
      ...qsRise(delay)
    }}>
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Icon */}
        <div style={{
          width: 64, height: 64,
          borderRadius: 999,
          background: h ? "var(--g-verde-500)" : "var(--g-verde-100)",
          color: h ? "var(--g-beige)" : "var(--g-verde-600)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
          boxShadow: h ? "0 8px 20px rgba(98,119,97,0.20)" : "none",
          transform: h ? "scale(1.08)" : "scale(1)",
          transition: "all 340ms var(--g-ease-out)",
        }}>
          <HatoIcon name={icon} size={30} />
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "var(--g-font-display)",
          fontSize: 32,
          lineHeight: 1.1,
          letterSpacing: "-0.015em",
          color: h ? "var(--g-verde-700)" : "var(--g-verde-600)",
          fontWeight: 400,
          margin: "0 0 20px 0",
          transition: "color 300ms var(--g-ease-out)",
        }}>
          {title}
        </h3>

        {/* Decorative line */}
        <div style={{
          height: 3,
          width: h ? 52 : 32,
          background: h ? "var(--g-verde-500)" : "rgba(98,119,97,0.3)",
          borderRadius: 2,
          marginBottom: 24,
          transition: "all 340ms var(--g-ease-out)",
        }}/>

        {/* Body */}
        <p style={{
          fontFamily: "var(--g-font-sans)",
          fontSize: 15,
          lineHeight: 1.7,
          color: "var(--g-petroleo-700)",
          margin: 0,
          textWrap: "pretty",
          flex: 1,
        }}>
          {body}
        </p>
      </div>

      {/* Bottom accent */}
      <div style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
        height: 4,
        background: h ? "var(--g-verde-500)" : "transparent",
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        transition: "all 340ms var(--g-ease-out)",
      }}/>
    </div>);
}

function ValorCard({ icon, num, title, desc, tone, tint, delay }) {
  const [flipped, setFlipped] = React.useState(false);
  const toggle = () => setFlipped((f) => !f);
  return (
    <div
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={toggle}
      onKeyDown={(e) => {if (e.key === "Enter" || e.key === " ") {e.preventDefault();toggle();}}}
      tabIndex={0}
      role="button"
      aria-pressed={flipped}
      aria-label={`${title} — ${desc}`}
      style={{
        position: "relative",
        minHeight: 220,
        perspective: 1200,
        cursor: "pointer",
        ...qsRise(delay)
      }}>
      <div style={{
        position: "relative", width: "100%", height: "100%", minHeight: 220,
        transformStyle: "preserve-3d",
        transition: "transform 600ms cubic-bezier(.4,.05,.2,1)",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)"
      }}>

        {/* FRONT — title only */}
        <div style={{
          position: "absolute", inset: 0,
          background: tone || "rgba(249,246,232,0.78)",
          border: "1px solid " + (tone || "rgba(255,255,255,0.55)"),
          borderRadius: 14, padding: "28px 24px",
          overflow: "hidden",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          boxShadow: "0 14px 30px rgba(8,16,26,0.18)"
        }}>
          {/* Big number watermark */}
          <span aria-hidden="true" style={{
            position: "absolute", top: 16, right: 18,
            fontFamily: "var(--g-font-display)", fontSize: 38,
            color: "rgba(249,246,232,0.85)", lineHeight: 1
          }}>{num}</span>

          <span style={{
            width: 48, height: 48, borderRadius: 999,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            background: "rgba(249,246,232,0.22)",
            color: "var(--g-beige)",
            alignSelf: "flex-start"
          }}>
            <HatoIcon name={icon} size={22} />
          </span>

          <div style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
            textAlign: "center"
          }}>
            <h3 style={{
              fontFamily: "var(--g-font-display)",
              fontSize: "clamp(34px, 2.6vw, 42px)",
              lineHeight: 1.0, letterSpacing: "-0.018em",
              color: "var(--g-beige)", fontWeight: 400, margin: 0
            }}>{title}</h3>
          </div>
        </div>

        {/* BACK — description */}
        <div style={{
          position: "absolute", inset: 0,
          background: tone || "var(--g-verde-500)",
          border: "1px solid " + (tone || "var(--g-verde-500)"),
          borderRadius: 14, padding: "28px 24px",
          overflow: "hidden",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          boxShadow: "0 16px 40px rgba(8,16,26,0.22)"
        }}>
          <span aria-hidden="true" style={{
            position: "absolute", top: 16, right: 18,
            fontFamily: "var(--g-font-display)", fontSize: 38,
            color: "rgba(249,246,232,0.35)", lineHeight: 1
          }}>{num}</span>

          <span style={{
            width: 48, height: 48, borderRadius: 999,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            background: "rgba(249,246,232,0.18)", color: "var(--g-beige)",
            alignSelf: "flex-start"
          }}>
            <HatoIcon name={icon} size={22} />
          </span>

          <div style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
            textAlign: "center"
          }}>
            <p style={{
              fontFamily: "var(--g-font-sans)", fontSize: 16, lineHeight: 1.55,
              color: "var(--g-beige)", margin: 0, textWrap: "pretty", fontWeight: 400
            }}>{desc}</p>
          </div>
        </div>
      </div>
    </div>);

}

/* fadeUp helper — staggered animation-delay */
function qsRise(i = 0) {
  return {
    animation: `qsFadeUp 700ms cubic-bezier(.4,.05,.2,1) ${0.08 * i}s both`
  };
}

window.QuienesSomos = QuienesSomos;