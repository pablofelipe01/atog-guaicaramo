/* HatoHeader — full-bleed hero overlays it; transparent until scroll */

function HatoHeader({ onNavigate, active, inverse = true, forceLight = false }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const f = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", f);return () => window.removeEventListener("scroll", f);
  }, []);

  const items = [
  { id: "quienes", label: "QUIÉNES SOMOS", href: "quienes-somos.html" },
  { id: "practicas", label: "NUESTRAS BUENAS PRÁCTICAS", href: "buenas-practicas.html" },
  { id: "genetica", label: "GENÉTICA DE TALLA MUNDIAL", href: "genetica-talla-mundial.html" },
  { id: "bufalos", label: "NUESTROS BÚFALOS", href: "nuestros-bufalos.html" },
  { id: "nutricion", label: "NUTRICIÓN ANIMAL", href: "nutricion-animal.html" }];


  const onLight = forceLight || scrolled;
  const logoInverse = !onLight;
  const linkColor = onLight ? "var(--g-petroleo-700)" : "var(--g-beige)";

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: onLight ? "rgba(249,246,232,0.95)" : "transparent",
      backdropFilter: onLight ? "blur(12px)" : "none",
      borderBottom: onLight ? "1px solid var(--g-line)" : "1px solid transparent",
      transition: "all 220ms var(--g-ease-soft)"
    }}>
      <div style={{
        maxWidth: 1440, margin: "0 auto", padding: "20px 56px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32
      }}>
        <a href="#" onClick={(e) => {e.preventDefault();onNavigate("top");}} style={{ textDecoration: "none" }}>
          <HatoWordmark height={52} inverse={logoInverse} />
        </a>
        <nav style={{ display: "flex", alignItems: "center", gap: 30, flexWrap: "nowrap" }}>
          {items.map((it) =>
          <a key={it.id}
          href={it.href || "#" + it.id}
          onClick={(e) => {
            if (it.href) return; /* external/relative link — let the browser navigate */
            e.preventDefault();
            onNavigate(it.id);
          }}
          style={{
            fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500,
            color: linkColor, textDecoration: "none", padding: "6px 0",
            letterSpacing: "0.03em", whiteSpace: "nowrap"
          }}>
              {it.label}
            </a>
          )}
        </nav>
      </div>
    </header>);

}

window.HatoHeader = HatoHeader;