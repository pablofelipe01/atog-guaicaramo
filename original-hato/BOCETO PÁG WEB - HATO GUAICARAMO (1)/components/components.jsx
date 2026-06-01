/* Hato — shared primitives (website kit) */
const { useState: hUse, useEffect: hEff } = React;

function HatoLucide() {
  hEff(() => { if (window.lucide) window.lucide.createIcons(); });
}

function HatoIcon({ name, size = 22, color = "currentColor", style }) {
  return <i data-lucide={name} style={{ width: size, height: size, color, ...style }} />;
}

function HatoBtn({ children, variant = "primary", onClick, size = "md", href }) {
  const [h, setH] = hUse(false);
  const sizes = {
    sm: { padding: "7px 14px", fontSize: 12 },
    md: { padding: "11px 22px", fontSize: 14 },
    lg: { padding: "14px 28px", fontSize: 15 },
  };
  const variants = {
    primary: { background: h ? "var(--g-petroleo-700)" : "var(--g-petroleo-600)", color: "var(--g-beige)" },
    secondary: { background: h ? "var(--g-verde-700)" : "var(--g-verde-500)", color: "var(--g-beige)" },
    outline: { background: h ? "var(--g-cafe-100)" : "transparent", color: "var(--g-petroleo-700)", border: "1px solid var(--g-line-strong)" },
    invertedOutline: { background: h ? "rgba(249,246,232,0.12)" : "transparent", color: "var(--g-beige)", border: "1px solid rgba(249,246,232,0.4)" },
    ghost: { background: h ? "var(--g-cafe-100)" : "transparent", color: "var(--g-petroleo-700)" },

    /* Prototype-matched pill variants */
    pillLight: { background: h ? "#fffef5" : "var(--g-beige)", color: "var(--g-verde-500)", border: "1px solid rgba(0,0,0,0.06)", padding: "10px 26px" },
    pillDark:  { background: h ? "var(--g-petroleo-700)" : "var(--g-petroleo-800)", color: "var(--g-beige)", border: "1px solid var(--g-petroleo-800)", padding: "10px 24px" },
    pillMuted: { background: h ? "var(--g-cafe-500)" : "var(--g-cafe-400)", color: "var(--g-petroleo-900)", border: "none", padding: "6px 18px" },
  };
  const Tag = href ? "a" : "button";
  return (
    <Tag href={href} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        fontFamily: "var(--g-font-sans)", fontWeight: 500, borderRadius: 999,
        border: "1px solid transparent", cursor: "pointer", transition: "all 180ms var(--g-ease-soft)",
        lineHeight: 1, display: "inline-flex", alignItems: "center", gap: 8,
        textDecoration: "none", whiteSpace: "nowrap",
        ...sizes[size], ...variants[variant],
      }}>
      {children}
    </Tag>
  );
}

function HatoWordmark({ size = 22, inverse = false, height }) {
  // Real brand logo (monogram + wordmark stacked).
  // Aspect ratio 5491×2948 ≈ 1.862. `height` overrides; otherwise derived from `size`.
  const h = height ?? size * 2.9;
  const src = inverse
    ? "assets/logo-hato-negativo.png"
    : "assets/logo-hato-positivo.png";
  return (
    <img
      src={src}
      alt="Hato Guaicaramo"
      style={{
        display: "block",
        height: h,
        width: "auto",
        objectFit: "contain",
        userSelect: "none",
      }}
      draggable={false}
    />
  );
}

function HatoEyebrow({ children, inverse = false }) {
  return (
    <div style={{
      fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500,
      letterSpacing: "0.16em", textTransform: "uppercase",
      color: inverse ? "var(--g-verde-300)" : "var(--g-verde-500)",
    }}>{children}</div>
  );
}

/* Manifest — the brand's signature stacked single-line statements */
function Manifest({ lines, color = "var(--g-petroleo-800)", size = 28 }) {
  return (
    <div style={{ display: "grid", gap: 4 }}>
      {lines.map((l, i) => (
        <div key={i} style={{
          fontFamily: "var(--g-font-display)", fontSize: size,
          lineHeight: 1.1, letterSpacing: "-0.015em", color, fontWeight: 400,
        }}>
          {l}
        </div>
      ))}
    </div>
  );
}

/* Section wrapper for consistent rhythm */
function Section({ children, bg = "var(--g-bg)", id, pad = "96px 0" }) {
  return (
    <section id={id} style={{ background: bg, padding: pad }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        {children}
      </div>
    </section>
  );
}

/* Section title — Albra serif uppercase + underline, the brand's section-header pattern */
function SectionTitle({ children, color = "var(--g-verde-500)", align = "center" }) {
  return (
    <div style={{ textAlign: align, marginBottom: 56 }}>
      <h2 style={{
        display: "inline-block",
        fontFamily: "var(--g-font-display)", fontSize: "clamp(24px, 3vw, 40px)",
        lineHeight: 1.05, letterSpacing: "0.005em",
        color, fontWeight: 400, textTransform: "uppercase",
        margin: 0, paddingBottom: 6, borderBottom: "1.5px solid currentColor",
        whiteSpace: "nowrap",
      }}>
        {children}
      </h2>
    </div>
  );
}

Object.assign(window, { HatoIcon, HatoLucide, HatoBtn, HatoWordmark, HatoEyebrow, Manifest, Section, SectionTitle });
