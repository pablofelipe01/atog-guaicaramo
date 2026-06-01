/* Testimoniales — "Ganaderos que van ganando" — carousel sorted newest → oldest */

function Testimoniales() {
  // Raw data. `date` is YYYY-MM-DD so we can sort newest-first deterministically.
  // Each `instagram` is the post URL the "Ver más" pill opens in a new tab.
  const rawItems = [
    {
      date: "2026-05-14",
      name: "Andrés Quintero",
      grad: "linear-gradient(160deg,#c8b48a,#7a5e36,#1a1410)",
      body: <>Cambiamos toda la línea de toros a <strong>Nelore CIA</strong>. Los terneros nacen más livianos, más fuertes y los destetes subieron 18 kilos. Inversión que se pagó sola.</>,
      instagram: "https://www.instagram.com/hatoguaicaramo/",
    },
    {
      date: "2026-04-02",
      name: "Pedro Gómez Jaramillo",
      grad: "linear-gradient(160deg,#e8d4a4,#9a7a4a,#3a2818)",
      body: <>En Villanueva, un <strong>productor confió</strong> en nuestro 75% Nelore… y hoy los números, la facilidad de parto y el vigor al nacer cuentan la historia por él.</>,
      instagram: "https://www.instagram.com/hatoguaicaramo/",
    },
    {
      date: "2026-02-18",
      name: "Ezequiel Carvajal",
      grad: "linear-gradient(160deg,#d6c7a8,#a08756,#2a2418)",
      body: <>Ezequiel activó un nuevo nivel de su hato. Adquirió un <strong>toro Nelore Ciclo Corto</strong>. Mira esas crías: pura potencia. ¿Usted qué espera para adquirir nuestra genética?</>,
      instagram: "https://www.instagram.com/hatoguaicaramo/",
    },
    {
      date: "2025-11-22",
      name: "Carlos Mendoza",
      grad: "linear-gradient(160deg,#b8c0a0,#5a6850,#1a2120)",
      body: <>Tres ciclos con <strong>Nelore CIA</strong>. La precocidad cambió el negocio. Cerramos ciclos seis meses antes y la rentabilidad subió.</>,
      instagram: "https://www.instagram.com/hatoguaicaramo/",
    },
    {
      date: "2025-09-08",
      name: "María Fernanda Ríos",
      grad: "linear-gradient(160deg,#dfd4b6,#8a6b3e,#2a1f14)",
      body: <>Las <strong>búfalas de leche</strong> del Hato nos cambiaron la finca. Producción estable todo el año y una calidad de leche que el comprador paga con gusto.</>,
      instagram: "https://www.instagram.com/hatoguaicaramo/",
    },
    {
      date: "2025-06-30",
      name: "Hernando Castro",
      grad: "linear-gradient(160deg,#a8b298,#4a5640,#181f18)",
      body: <>Compré preñeces <strong>Nelore × Brahman 75%</strong> y la transición del hato fue suave. Genética seria, asesoría seria. Cero improvisación.</>,
      instagram: "https://www.instagram.com/hatoguaicaramo/",
    },
    {
      date: "2025-03-12",
      name: "Luis Beltrán",
      grad: "linear-gradient(160deg,#c4ad84,#704f2a,#2a1f10)",
      body: <>La <strong>sal proteinada</strong> de Guaicaramo no es solo alimento, es un sistema. Mis vacas paren mejor y los terneros crecen sin parar.</>,
      instagram: "https://www.instagram.com/hatoguaicaramo/",
    },
  ];

  // Sort newest → oldest. Re-runs only if the array changes.
  const items = React.useMemo(
    () => [...rawItems].sort((a, b) => b.date.localeCompare(a.date)),
    []
  );

  const [perPage, setPerPage] = React.useState(getPerPage());
  React.useEffect(() => {
    const onResize = () => setPerPage(getPerPage());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  function getPerPage() {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 720) return 1;
    if (window.innerWidth < 1080) return 2;
    return 3;
  }

  const [idx, setIdx] = React.useState(0);
  const maxIdx = Math.max(0, items.length - perPage);

  // Clamp idx if perPage changes
  React.useEffect(() => {
    if (idx > maxIdx) setIdx(maxIdx);
  }, [maxIdx, idx]);

  const goPrev = () => setIdx((i) => Math.max(0, i - 1));
  const goNext = () => setIdx((i) => Math.min(maxIdx, i + 1));

  // Track translate: shift by (100 / perPage * idx)% — cards are perPage per visible row
  const cardWidthPct = 100 / perPage;
  const offsetPct = idx * cardWidthPct;

  return (
    <section style={{
      background: "var(--g-verde-400)",
      padding: "80px 0",
    }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 56px" }}>

        {/* Centered title */}
        <div style={{ textAlign: "center" }}>
          <SectionTitle color="var(--g-beige)" align="center">Ganaderos que van ganando</SectionTitle>
        </div>

        {/* Carousel viewport with arrows on the sides */}
        <div style={{
          position: "relative",
          marginTop: 56,
        }}>
          {/* Side arrows — subtle, dynamic */}
          <SideArrow dir="left"  onClick={goPrev} disabled={idx === 0}     label="Testimonial anterior"/>
          <SideArrow dir="right" onClick={goNext} disabled={idx === maxIdx} label="Testimonial siguiente"/>

          {/* Viewport */}
          <div style={{
            overflow: "hidden",
            marginLeft: -14, marginRight: -14, /* compensate inner gutter */
          }}>
            <div style={{
              display: "flex",
              transform: `translateX(-${offsetPct}%)`,
              transition: "transform 520ms cubic-bezier(.4,.05,.2,1)",
              willChange: "transform",
            }}>
              {items.map((it, i) => (
                <div key={it.name + it.date} style={{
                  flex: `0 0 ${cardWidthPct}%`,
                  padding: "0 14px",
                  boxSizing: "border-box",
                }}>
                  <TestimonialCard {...it} active={i >= idx && i < idx + perPage} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Counter + Dot indicators */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: 14, marginTop: 36,
        }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
            {Array.from({ length: maxIdx + 1 }).map((_, i) => (
              <button key={i}
                aria-label={`Ir al testimonial ${i + 1}`}
                onClick={() => setIdx(i)}
                style={{
                  width: idx === i ? 28 : 8, height: 8,
                  borderRadius: 999,
                  background: idx === i ? "var(--g-beige)" : "rgba(249,246,232,0.4)",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "all 280ms var(--g-ease-soft)",
                }}
              />
            ))}
          </div>
          <div style={{
            fontFamily: "var(--g-font-sans)", fontSize: 11,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "var(--g-beige)", opacity: 0.7,
          }}>
            {String(idx + 1).padStart(2,"0")} · {String(items.length).padStart(2,"0")}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ name, grad, body, instagram, date, active }) {
  // Format date as e.g. "Abril 2026"
  const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  const d = new Date(date);
  const dateLabel = `${months[d.getMonth()]} ${d.getFullYear()}`;

  return (
    <article style={{
      position: "relative", paddingTop: 70,
      opacity: active ? 1 : 0.55,
      transition: "opacity 360ms var(--g-ease-soft)",
    }}>
      {/* Circular portrait */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 130, height: 130, borderRadius: "50%",
        background: grad,
        border: "3px solid var(--g-petroleo-700)",
        zIndex: 2,
      }}/>
      <div style={{
        background: "var(--g-beige)",
        borderRadius: 22,
        padding: "82px 28px 30px",
        textAlign: "center",
        minHeight: 380,
        display: "flex", flexDirection: "column",
        boxShadow: "0 8px 22px rgba(8,16,26,0.12)",
      }}>
        <div style={{
          fontFamily: "var(--g-font-sans)", fontSize: 10,
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: "var(--g-cafe-700)", marginBottom: 6,
        }}>{dateLabel}</div>

        <h3 style={{
          fontFamily: "var(--g-font-display)", fontSize: 22, lineHeight: 1.15,
          color: "var(--g-petroleo-700)", fontWeight: 400, margin: "0 0 14px",
        }}>{name}</h3>

        <p style={{
          fontFamily: "var(--g-font-sans)", fontSize: 15, lineHeight: 1.55,
          color: "var(--g-fg)", margin: "0 0 24px", textWrap: "pretty", flex: 1,
        }}>{body}</p>

        <div>
          <a href={instagram} target="_blank" rel="noopener noreferrer"
             style={{ textDecoration: "none", display: "inline-block" }}>
            <HatoBtn variant="pillDark" size="md">
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
                Ver más
              </span>
            </HatoBtn>
          </a>
        </div>
      </div>
    </article>
  );
}

function SideArrow({ dir, onClick, disabled, label }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const side = dir === "left" ? { left: -32 } : { right: -32 };
  const slide = hover && !disabled ? (dir === "left" ? "translateX(-6px)" : "translateX(6px)") : "";
  const scale  = press && !disabled ? "scale(0.92)" : (hover && !disabled ? "scale(1.08)" : "scale(1)");
  return (
    <button
      onClick={onClick} disabled={disabled} aria-label={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        position: "absolute", top: "50%",
        ...side,
        width: 56, height: 56, borderRadius: 999,
        border: "none", padding: 0,
        background: "transparent",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.30 : 1,
        transform: `translateY(-50%)`,
        zIndex: 5,
      }}>
      {/* Outer pulse ring — fades out on hover */}
      <span aria-hidden="true" style={{
        position: "absolute", inset: 0, borderRadius: 999,
        border: "1px solid rgba(249,246,232,0.55)",
        opacity: disabled ? 0 : (hover ? 0 : 1),
        animation: disabled ? "none" : "hatoSideArrowPulse 2.4s ease-out infinite",
        transition: "opacity 240ms var(--g-ease-soft)",
        pointerEvents: "none",
      }}/>

      {/* Inner circle */}
      <span aria-hidden="true" style={{
        position: "absolute", inset: 0, borderRadius: 999,
        background: disabled ? "transparent" : (hover ? "var(--g-beige)" : "rgba(249,246,232,0.12)"),
        backdropFilter: disabled ? "none" : "blur(6px)",
        boxShadow: hover && !disabled
          ? "0 10px 28px rgba(8,16,26,0.28), 0 0 0 6px rgba(249,246,232,0.10)"
          : "none",
        transform: scale,
        transition: "all 280ms var(--g-ease-soft)",
        pointerEvents: "none",
      }}/>

      {/* Arrow icon */}
      <span style={{
        position: "absolute", inset: 0,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        color: disabled ? "rgba(249,246,232,0.4)" : (hover ? "var(--g-petroleo-700)" : "var(--g-beige)"),
        transform: `${scale} ${slide}`,
        transition: "all 320ms var(--g-ease-soft)",
        pointerEvents: "none",
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {dir === "left" ? <path d="M15 18l-6-6 6-6"/> : <path d="M9 6l6 6-6 6"/>}
        </svg>
      </span>
    </button>
  );
}

/* Keyframes for the side-arrow pulse — injected once on first render */
if (typeof document !== "undefined" && !document.getElementById("hato-sidearrow-keyframes")) {
  const s = document.createElement("style");
  s.id = "hato-sidearrow-keyframes";
  s.textContent = `
    @keyframes hatoSideArrowPulse {
      0%   { transform: scale(1);    opacity: 0.6; }
      70%  { transform: scale(1.35); opacity: 0;   }
      100% { transform: scale(1.35); opacity: 0;   }
    }
  `;
  document.head.appendChild(s);
}

window.Testimoniales = Testimoniales;
