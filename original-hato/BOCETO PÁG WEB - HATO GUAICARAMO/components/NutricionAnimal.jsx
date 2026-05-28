/* Nutrición Animal — sal proteinada + pastos Brachiaria humidicola
   Interactive, animated editorial layout following the Hato design system.
   The NutricionHero (video background) is preserved unchanged. */

const { useState: nUse, useEffect: nEff, useRef: nRef, useMemo: nMemo } = React;

/* ---------- Reveal-on-scroll primitive ---------- */
function useReveal(opts = {}) {
  const ref = nRef(null);
  const [seen, setSeen] = nUse(false);
  nEff(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        });
      },
      { threshold: opts.threshold ?? 0.18, rootMargin: opts.rootMargin ?? "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

function Reveal({ children, delay = 0, as = "div", y = 16, dur = 720, style }) {
  const [ref, seen] = useReveal();
  const Tag = as;
  return (
    <Tag
      ref={ref}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity ${dur}ms var(--g-ease-soft) ${delay}ms, transform ${dur}ms var(--g-ease-soft) ${delay}ms`,
        ...style
      }}>
      
      {children}
    </Tag>);

}

/* ---------- Component ---------- */
function NutricionAnimal() {
  HatoLucide();

  return (
    <>
      <NutricionHero />
      <FabricaIntro />
      <ManifestoFabrica />
      <SalProteinada />
      <PastosBrachiaria />
    </>);

}

/* =====================================================================
   1 · NUESTRA FÁBRICA — manifest intro
===================================================================== */
function FabricaIntro() {
  return (
    <section
      id="nutricion"
      style={{
        position: "relative",
        background: "var(--g-bg)",
        padding: "120px 0 80px",
        borderTop: "1px solid var(--g-line)",
        overflow: "hidden"
      }}>
      
      {/* Faint editorial column lines */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
          "linear-gradient(90deg, transparent calc(50% - 0.5px), rgba(98,119,97,0.06) calc(50% - 0.5px), rgba(98,119,97,0.06) calc(50% + 0.5px), transparent calc(50% + 0.5px))",
          pointerEvents: "none"
        }} />
      

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 56px", position: "relative" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 1fr",
            gap: 96,
            alignItems: "center"
          }}>
          
          {/* LEFT */}
          <div>
            <Reveal>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  fontFamily: "var(--g-font-sans)",

                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--g-verde-700)",
                  marginBottom: 28, fontSize: "12px"
                }}>
                
                <span
                  style={{
                    display: "inline-block",
                    width: 28,
                    height: 1,
                    background: "var(--g-verde-700)"
                  }} />
                
                Nuestra fábrica
              </div>
            </Reveal>

            <h2
              style={{
                fontFamily: "var(--g-font-display)",
                fontSize: "clamp(40px, 5.2vw, 76px)",
                lineHeight: 1.02,
                letterSpacing: "-0.022em",
                color: "var(--g-petroleo-900)",
                fontWeight: 400,
                margin: "0 0 36px",
                textWrap: "balance"
              }}>
              
              <Reveal delay={60} as="span" style={{ display: "block" }}>
                En nuestra fábrica
              </Reveal>
              <Reveal delay={160} as="span" style={{ display: "block" }}>
                no solo mezclamos
              </Reveal>
              <Reveal delay={260} as="span" style={{ display: "block", fontStyle: "italic", color: "var(--g-verde-700)" }}>
                alimento.
              </Reveal>
            </h2>

            <Reveal delay={420}>
              <p
                style={{
                  fontFamily: "var(--g-font-sans)",
                  fontSize: 17,
                  lineHeight: 1.65,
                  color: "var(--g-cafe-700)",
                  margin: "0 0 24px",
                  maxWidth: "52ch",
                  textWrap: "pretty"
                }}>
                
                Mezclamos experiencia, precisión y propósito. La planta nace de una
                necesidad real: mejorar nuestros índices reproductivos, elevar la
                productividad y aumentar la carga animal con{" "}
                <em style={{ color: "var(--g-petroleo-900)", fontStyle: "italic" }}>
                  resultados medibles, no promesas
                </em>
                .
              </p>
            </Reveal>

            <Reveal delay={520}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 24,
                  marginTop: 44,
                  paddingTop: 32,
                  borderTop: "1px dashed var(--g-line)"
                }}>
                
                {[
                { k: "Reproducción", v: "+ Índices" },
                { k: "Productividad", v: "Medible" },
                { k: "Carga animal", v: "Sostenida" }].
                map((s) =>
                <div key={s.k}>
                    <div
                    style={{
                      fontFamily: "var(--g-font-sans)",
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--g-fg-subtle)",
                      marginBottom: 8
                    }}>
                    
                      {s.k}
                    </div>
                    <div
                    style={{
                      fontFamily: "var(--g-font-display)",
                      fontSize: 22,
                      color: "var(--g-petroleo-900)",
                      lineHeight: 1.1
                    }}>
                    
                      {s.v}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          {/* RIGHT — floating photo with badge */}
          <FloatingPhoto />
        </div>
      </div>
    </section>);

}

function FloatingPhoto() {
  const [ref, seen] = useReveal();
  const [tilt, setTilt] = nUse({ x: 0, y: 0 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x, y });
  };
  const onLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: "relative",
        aspectRatio: "4 / 5",
        opacity: seen ? 1 : 0,
        transform: `translateY(${seen ? 0 : 24}px) perspective(1200px) rotateX(${tilt.y * -4}deg) rotateY(${tilt.x * 4}deg)`,
        transition: "opacity 900ms var(--g-ease-soft), transform 600ms var(--g-ease-soft)",
        transformStyle: "preserve-3d"
      }}>
      
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 14,
          overflow: "hidden",
          background: "var(--g-stone-100)",
          boxShadow: "0 30px 80px rgba(8,16,26,0.18)"
        }}>
        
        <img
          src="assets/photography/bufalas-pastoreo.jpg"
          alt="Fábrica de nutrición Hato Guaicaramo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(1.06) translate(${tilt.x * -10}px, ${tilt.y * -10}px)`,
            transition: "transform 600ms var(--g-ease-soft)"
          }} />
        
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
            "linear-gradient(180deg, transparent 55%, rgba(8,16,26,0.55) 100%)"
          }} />
        
      </div>

      {/* Floating quote chip */}
      <div
        style={{
          position: "absolute",
          left: -28,
          bottom: 36,
          width: "82%",
          background: "var(--g-petroleo-800)",
          color: "var(--g-beige)",
          borderRadius: 14,
          padding: "22px 26px",
          boxShadow: "0 24px 48px rgba(8,16,26,0.28)",
          transform: "translateZ(40px)"
        }}>
        
        <div
          style={{
            fontFamily: "var(--g-font-sans)",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--g-verde-300)",
            marginBottom: 10
          }}>
          
          Filosofía
        </div>
        <div
          style={{
            fontFamily: "var(--g-font-display)",
            fontSize: 22,
            lineHeight: 1.2,
            fontStyle: "italic",
            textWrap: "balance"
          }}>
          
          Lo que come el animal define su futuro.
        </div>
      </div>

      {/* Floating numeric stat top-right */}
      <div
        style={{
          position: "absolute",
          top: 24,
          right: -28,
          background: "var(--g-beige)",
          border: "1px solid var(--g-line)",
          borderRadius: 14,
          padding: "16px 20px",
          boxShadow: "0 16px 40px rgba(8,16,26,0.10)",
          transform: "translateZ(60px)",
          minWidth: 160
        }}>
        
        <div
          style={{
            fontFamily: "var(--g-font-sans)",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--g-verde-700)",
            marginBottom: 6
          }}>
          
          Planta propia
        </div>
        <div
          style={{
            fontFamily: "var(--g-font-display)",
            fontSize: 28,
            color: "var(--g-petroleo-900)",
            lineHeight: 1
          }}>
          
          100 %
        </div>
        <div
          style={{
            fontFamily: "var(--g-font-sans)",
            fontSize: 12,
            color: "var(--g-cafe-700)",
            marginTop: 4
          }}>
          
          formulación in-situ
        </div>
      </div>
    </div>);

}

/* =====================================================================
   2 · MANIFESTO — dark band
===================================================================== */
function ManifestoFabrica() {
  const lines = [
  { t: "Aquí no formulamos productos.", strike: true },
  { t: "Diseñamos resultados.", accent: true }];

  return (
    <section
      style={{
        position: "relative",
        background: "var(--g-petroleo-900)",
        color: "var(--g-beige)",
        padding: "140px 0",
        overflow: "hidden"
      }}>
      
      {/* Background animated grain */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
          "radial-gradient(circle at 20% 30%, rgba(98,119,97,0.22), transparent 45%), radial-gradient(circle at 80% 70%, rgba(183,173,145,0.14), transparent 50%)",
          animation: "g-floatBg 16s ease-in-out infinite alternate"
        }} />
      
      <style>{`
        @keyframes g-floatBg {
          0%   { transform: translate3d(0,0,0) scale(1); }
          100% { transform: translate3d(-3%,2%,0) scale(1.08); }
        }
        @keyframes g-slowSpin { to { transform: rotate(360deg); } }
        @keyframes g-pulseRing {
          0%   { transform: scale(1);   opacity: 0.55; }
          70%  { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        @keyframes g-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes g-wordRise {
          0%   { transform: translateY(110%) skewY(6deg); opacity: 0; filter: blur(6px); }
          60%  { opacity: 1; filter: blur(0); }
          100% { transform: translateY(0)    skewY(0);    opacity: 1; filter: blur(0); }
        }
        @keyframes g-rule {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      <div style={{ position: "relative", maxWidth: 1440, margin: "0 auto", padding: "0 56px", textAlign: "center" }}>
        {/* Animated horizontal rule above the manifest */}
        <Reveal>
          <div
            aria-hidden
            style={{
              width: 80,
              height: 1,
              background: "var(--g-verde-300)",
              margin: "0 auto 44px",
              transformOrigin: "center",
              animation: "g-rule 900ms cubic-bezier(.2,.7,.2,1) 120ms both"
            }} />
          
        </Reveal>

        <Reveal>
          <div
            style={{
              fontFamily: "var(--g-font-sans)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--g-verde-300)",
              marginBottom: 40
            }}>


          </div>
        </Reveal>

        {lines.map((l, lineIdx) => {
          const baseDelay = lineIdx * 240;
          const words = l.t.split(" ");
          return (
            <Reveal key={lineIdx}>
              <div
                style={{
                  fontFamily: "var(--g-font-display)",
                  fontSize: "clamp(42px, 6.4vw, 96px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.022em",
                  color: l.accent ? "var(--g-verde-300)" : "var(--g-beige)",
                  fontStyle: l.accent ? "italic" : "normal",
                  fontWeight: 400,
                  margin: "0 0 8px"
                }}>
                {words.map((w, wi) =>
                <span key={wi} style={{
                  display: "inline-block",
                  clipPath: "polygon(-100% 0, 200% 0, 200% 100%, -100% 100%)",
                  verticalAlign: "top",
                  paddingTop: "0.35em",
                  paddingBottom: "0.35em",
                  marginTop: "-0.35em",
                  marginBottom: "-0.35em",
                  lineHeight: 1.05,
                  marginRight: wi === words.length - 1 ? 0 : "0.28em"
                }}>
                    <span style={{
                    display: "inline-block",
                    animation: `g-wordRise 900ms cubic-bezier(.2,.7,.2,1) ${baseDelay + wi * 90}ms both`
                  }}>
                      {w}
                    </span>
                  </span>
                )}
              </div>
            </Reveal>);

        })}

        <Reveal delay={520}>
          <p
            style={{
              fontFamily: "var(--g-font-sans)",
              fontSize: 16,
              lineHeight: 1.7,
              color: "rgba(249,246,232,0.78)",
              maxWidth: 58 + "ch",
              margin: "44px auto 0",
              textWrap: "pretty"
            }}>Mejor reproducción, mayor productividad, más carga animal por hectárea. Una planta integrada al modelo productivo.



          </p>
        </Reveal>
      </div>
    </section>);

}

/* =====================================================================
   3 · SAL PROTEINADA — interactive composition wheel
===================================================================== */
const SAL_INGREDIENTS = [
{ k: "Torta de palmiste", d: "Energía y proteína vegetal", icon: "leaf" },
{ k: "Sal marina", d: "Macroelementos y palatabilidad", icon: "droplet" },
{ k: "Torta de soya", d: "Proteína de alta calidad", icon: "sprout" },
{ k: "Urea", d: "Nitrógeno no proteico para rumen", icon: "atom" },
{ k: "Harina de arroz", d: "Energía y digestibilidad", icon: "wheat" },
{ k: "Fosfato monocálcico", d: "Fósforo y calcio biodisponibles", icon: "diamond" },
{ k: "Carbonato de calcio", d: "Mineralización ósea y reproducción", icon: "circle-dot" },
{ k: "Azufre molido", d: "Síntesis de proteína microbiana", icon: "flame" }];


function SalProteinada() {
  const [active, setActive] = nUse(0);
  const [auto, setAuto] = nUse(true);

  nEff(() => {
    if (!auto) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % SAL_INGREDIENTS.length);
    }, 2600);
    return () => clearInterval(id);
  }, [auto]);

  nEff(() => {
    if (window.lucide) window.lucide.createIcons();
  });

  return (
    <section
      style={{
        position: "relative",
        background: "var(--g-bg)",
        padding: "140px 0 120px",
        overflow: "hidden"
      }}>
      
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 56px" }}>
        {/* Section header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: 96,
            alignItems: "end",
            marginBottom: 80
          }}>
          
          <Reveal>
            <div
              style={{
                fontFamily: "var(--g-font-sans)",

                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--g-verde-700)", fontSize: "12px"
              }}> PRODUCTO


            </div>
          </Reveal>
          <div style={{ borderBottom: "1px dashed var(--g-line)", paddingBottom: 4 }}>
            <Reveal delay={120}>
              <h2
                style={{
                  fontFamily: "var(--g-font-display)",
                  fontSize: "clamp(44px, 6vw, 92px)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.024em",
                  color: "var(--g-petroleo-900)",
                  fontWeight: 400,
                  margin: 0,
                  textTransform: "uppercase"
                }}>
                
                Sal <em style={{ fontStyle: "italic", color: "var(--g-verde-700)" }}>Proteinada</em>
              </h2>
            </Reveal>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.05fr",
            gap: 80,
            alignItems: "center"
          }}>
          
          {/* LEFT — manifest copy */}
          <div>
            <Reveal>
              <div
                style={{
                  fontFamily: "var(--g-font-display)",
                  fontSize: "clamp(26px, 2.6vw, 36px)",
                  lineHeight: 1.18,
                  letterSpacing: "-0.012em",
                  color: "var(--g-petroleo-900)",
                  fontStyle: "italic",
                  margin: "0 0 28px",
                  textWrap: "balance"
                }}>
                
                No es un suplemento.<br />
                <span style={{ color: "var(--g-verde-700)" }}>Es parte del sistema productivo.</span>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p
                style={{
                  fontFamily: "var(--g-font-sans)",
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: "var(--g-cafe-700)",
                  margin: "0 0 18px",
                  maxWidth: "54ch",
                  textWrap: "pretty"
                }}>
                
                La sal proteinada acompaña al animal{" "}
                <em style={{ color: "var(--g-petroleo-900)", fontStyle: "italic" }}>
                  desde la madre hasta la cría
                </em>
                . No es consumo ocasional — es nutrición integrada al modelo productivo.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <p
                style={{
                  fontFamily: "var(--g-font-sans)",
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: "var(--g-cafe-700)",
                  margin: 0,
                  maxWidth: "54ch",
                  textWrap: "pretty"
                }}>
                
                Esto no es solo alimento. Es un sistema que impulsa{" "}
                <strong style={{ color: "var(--g-petroleo-900)", fontWeight: 500 }}>
                  genética, eficiencia y productividad
                </strong>
                .
              </p>
            </Reveal>

            {/* Active ingredient detail */}
            <Reveal delay={320}>
              <div
                style={{
                  marginTop: 44,
                  padding: "24px 28px",
                  background: "var(--g-bg-elevated, var(--g-stone-50))",
                  border: "1px solid var(--g-line)",
                  borderRadius: 14,
                  minHeight: 132,
                  position: "relative",
                  overflow: "hidden"
                }}>
                
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: 3,
                    width: `${(active + 1) / SAL_INGREDIENTS.length * 100}%`,
                    background: "var(--g-verde-500)",
                    transition: "width 600ms var(--g-ease-soft)"
                  }} />
                
                <div
                  style={{
                    fontFamily: "var(--g-font-sans)",
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--g-verde-700)",
                    marginBottom: 10
                  }}>
                  
                  Ingrediente {String(active + 1).padStart(2, "0")} de {SAL_INGREDIENTS.length}
                </div>
                <div
                  key={active}
                  style={{
                    animation: "g-fadeUp 500ms var(--g-ease-soft) both"
                  }}>
                  
                  <div
                    style={{
                      fontFamily: "var(--g-font-display)",
                      fontSize: 28,
                      lineHeight: 1.1,
                      color: "var(--g-petroleo-900)",
                      marginBottom: 6
                    }}>
                    
                    {SAL_INGREDIENTS[active].k}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--g-font-sans)",
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: "var(--g-cafe-700)"
                    }}>
                    
                    {SAL_INGREDIENTS[active].d}
                  </div>
                </div>
                <style>{`
                  @keyframes g-fadeUp {
                    from { opacity: 0; transform: translateY(8px); }
                    to   { opacity: 1; transform: translateY(0); }
                  }
                  @keyframes g-shimmer {
                    0%   { left: -40%; }
                    60%  { left: 110%; }
                    100% { left: 110%; }
                  }
                  @keyframes g-traceDash {
                    0%   { stroke-dashoffset: 0; }
                    100% { stroke-dashoffset: -2380; }
                  }
                  @keyframes g-pulseCorner {
                    0%, 100% { opacity: 0.55; transform: scale(1) rotate(var(--r,0deg)); }
                    50%      { opacity: 1;    transform: scale(1.1); }
                  }
                  @keyframes g-floatBag {
                    0%, 100% { transform: translate(-50%, -50%) translateY(0); }
                    50%      { transform: translate(-50%, -50%) translateY(-8px); }
                  }
                `}</style>
              </div>
            </Reveal>

            {/* Ingredient chips — clickable list */}
            <Reveal delay={420}>
              <IngredientChips
                ingredients={SAL_INGREDIENTS}
                active={active}
                onHover={(i) => {
                  setAuto(false);
                  setActive(i);
                }}
                onLeave={() => setAuto(true)} />
              
            </Reveal>
          </div>

          {/* RIGHT — product bag with VacayToro label */}
          <SalBag
            active={active}
            ingredients={SAL_INGREDIENTS}
            onHover={(i) => {
              setAuto(false);
              setActive(i);
            }}
            onLeave={() => setAuto(true)} />
          
        </div>
      </div>
    </section>);

}

function IngredientWheel({ active, onHover, onLeave }) {
  const N = SAL_INGREDIENTS.length;
  const R = 220; // radius
  const size = 560;
  const center = size / 2;
  const [ref, seen] = useReveal();

  return (
    <div
      ref={ref}
      onMouseLeave={onLeave}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1",
        maxWidth: size,
        margin: "0 auto",
        opacity: seen ? 1 : 0,
        transform: `scale(${seen ? 1 : 0.92})`,
        transition: "opacity 900ms var(--g-ease-soft), transform 900ms var(--g-ease-soft)"
      }}>
      
      {/* Concentric circles */}
      <svg viewBox={`0 0 ${size} ${size}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7E9579" />
            <stop offset="100%" stopColor="#3F4F3F" />
          </radialGradient>
        </defs>
        <circle cx={center} cy={center} r={R + 60} fill="none" stroke="rgba(98,119,97,0.10)" strokeDasharray="2 6" />
        <circle cx={center} cy={center} r={R + 28} fill="none" stroke="rgba(98,119,97,0.18)" />
        <circle cx={center} cy={center} r={R - 4} fill="none" stroke="rgba(98,119,97,0.10)" />

        {/* Connector lines from center to active node */}
        {SAL_INGREDIENTS.map((_, i) => {
          const a = i / N * Math.PI * 2 - Math.PI / 2;
          const x = center + Math.cos(a) * R;
          const y = center + Math.sin(a) * R;
          const isActive = i === active;
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke={isActive ? "var(--g-verde-500)" : "rgba(98,119,97,0.18)"}
              strokeWidth={isActive ? 1.5 : 0.75}
              style={{ transition: "all 400ms var(--g-ease-soft)" }} />);


        })}

        {/* Center disc */}
        <circle cx={center} cy={center} r={76} fill="url(#centerGrad)" />
        <circle
          cx={center}
          cy={center}
          r={76}
          fill="none"
          stroke="rgba(249,246,232,0.4)"
          strokeDasharray="3 4"
          style={{
            transformOrigin: `${center}px ${center}px`,
            animation: "g-slowSpin 30s linear infinite"
          }} />
        

        {/* Pulse ring */}
        <circle
          cx={center}
          cy={center}
          r={88}
          fill="none"
          stroke="var(--g-verde-300)"
          strokeWidth="1.5"
          style={{
            transformOrigin: `${center}px ${center}px`,
            animation: "g-pulseRing 3.2s ease-out infinite"
          }} />
        
      </svg>

      {/* Center label */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "var(--g-beige)",
          pointerEvents: "none",
          width: 152
        }}>
        
        <div
          style={{
            fontFamily: "var(--g-font-sans)",
            fontSize: 9,
            fontWeight: 500,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--g-verde-300)",
            marginBottom: 6
          }}>
          
          Mezcla
        </div>
        <div
          style={{
            fontFamily: "var(--g-font-display)",
            fontSize: 22,
            lineHeight: 1,
            fontStyle: "italic"
          }}>
          
          Sal proteinada
        </div>
        <div
          style={{
            marginTop: 8,
            fontFamily: "var(--g-font-sans)",
            fontSize: 11,
            color: "rgba(249,246,232,0.7)"
          }}>
          
          + conocimiento de campo
        </div>
      </div>

      {/* Ingredient nodes positioned absolutely */}
      {SAL_INGREDIENTS.map((ing, i) => {
        const a = i / N * Math.PI * 2 - Math.PI / 2;
        const x = 50 + Math.cos(a) * R * 100 / size;
        const y = 50 + Math.sin(a) * R * 100 / size;
        const isActive = i === active;
        return (
          <button
            key={ing.k}
            onMouseEnter={() => onHover(i)}
            onFocus={() => onHover(i)}
            aria-label={ing.k}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              transform: `translate(-50%, -50%) scale(${isActive ? 1.18 : 1})`,
              width: 64,
              height: 64,
              borderRadius: "50%",
              border: `1.5px solid ${isActive ? "var(--g-verde-500)" : "var(--g-line)"}`,
              background: isActive ? "var(--g-verde-500)" : "var(--g-beige)",
              color: isActive ? "var(--g-beige)" : "var(--g-petroleo-800)",
              cursor: "pointer",
              boxShadow: isActive ?
              "0 14px 28px rgba(98,119,97,0.35), 0 0 0 6px rgba(98,119,97,0.18)" :
              "0 4px 12px rgba(8,16,26,0.10)",
              transition: "all 380ms var(--g-ease-soft)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0
            }}>
            
            <i data-lucide={ing.icon} style={{ width: 22, height: 22 }} />
          </button>);

      })}

      {/* Ingredient labels (radiating outward, above the nodes) */}
      {SAL_INGREDIENTS.map((ing, i) => {
        const a = i / N * Math.PI * 2 - Math.PI / 2;
        const Ro = R + 56;
        const x = 50 + Math.cos(a) * Ro * 100 / size;
        const y = 50 + Math.sin(a) * Ro * 100 / size;
        const isActive = i === active;
        return (
          <div
            key={ing.k + "-l"}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
              fontFamily: "var(--g-font-sans)",
              fontSize: 11,
              fontWeight: isActive ? 600 : 500,
              letterSpacing: "0.04em",
              color: isActive ? "var(--g-verde-700)" : "var(--g-cafe-700)",
              opacity: isActive ? 1 : 0.7,
              textAlign: "center",
              width: 110,
              pointerEvents: "none",
              transition: "all 380ms var(--g-ease-soft)",
              textTransform: "uppercase"
            }}>
            
            {ing.k}
          </div>);

      })}
    </div>);

}

function IngredientChips({ ingredients, active, onHover, onLeave }) {
  return (
    <div
      onMouseLeave={onLeave}
      style={{
        marginTop: 32,
        display: "flex",
        flexWrap: "wrap",
        gap: 8
      }}>
      {ingredients.map((ing, i) => {
        const isActive = i === active;
        return (
          <button
            key={ing.k}
            onMouseEnter={() => onHover(i)}
            onFocus={() => onHover(i)}
            style={{
              fontFamily: "var(--g-font-sans)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.04em",
              color: isActive ? "var(--g-beige)" : "var(--g-petroleo-800)",
              background: isActive ? "var(--g-verde-500)" : "transparent",
              border: "1px solid " + (isActive ? "var(--g-verde-500)" : "var(--g-line)"),
              borderRadius: 999,
              padding: "8px 14px",
              cursor: "pointer",
              transition: "all 280ms var(--g-ease-soft)",
              display: "inline-flex",
              alignItems: "center",
              gap: 8
            }}>
            <i data-lucide={ing.icon} style={{ width: 13, height: 13 }} />
            {ing.k}
          </button>);

      })}
    </div>);

}

function SalBag({ active, ingredients, onHover, onLeave }) {
  const [ref, seen] = useReveal();
  const [tilt, setTilt] = nUse({ x: 0, y: 0 });
  const [btnHover, setBtnHover] = nUse(false);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x, y });
  };
  const handleLeave = () => {
    setTilt({ x: 0, y: 0 });
    onLeave && onLeave();
  };

  return (
    <div ref={ref} style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
      opacity: seen ? 1 : 0,
      transform: `translateY(${seen ? 0 : 24}px)`,
      transition: "opacity 900ms var(--g-ease-soft), transform 600ms var(--g-ease-soft)"
    }}>
      {/* Tilt stage — holds the bag image */}
      <div
        onMouseMove={onMove}
        onMouseLeave={handleLeave}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 820,
          aspectRatio: "1024 / 700",
          transform: `perspective(1200px) rotateX(${tilt.y * -3}deg) rotateY(${tilt.x * 3}deg)`,
          transition: "transform 600ms var(--g-ease-soft)",
          transformStyle: "preserve-3d"
        }}>
        <img
          src="assets/photography/sal-proteinada-sacks.png"
          alt="Sacos de Sal Proteinada Hato Guaicaramo"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) translate(${tilt.x * -10}px, ${tilt.y * -10}px)`,
            width: "118%",
            height: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0 30px 50px rgba(8,16,26,0.22))",
            transition: "transform 600ms var(--g-ease-soft)",
            pointerEvents: "none"
          }} />
      </div>

      {/* Download PDF CTA */}
      <a
        href="assets/sal-proteinada-ficha.pdf"
        download="Hato-Guaicaramo-Sal-Proteinada.pdf"
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        style={{
          display: "inline-flex", alignItems: "center", gap: 12,

          background: btnHover ? "var(--g-petroleo-900)" : "var(--g-petroleo-800)",
          color: "var(--g-beige)",
          textDecoration: "none",
          borderRadius: 999,
          fontFamily: "var(--g-font-sans)",
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "0.04em",
          boxShadow: btnHover ?
          "0 18px 36px rgba(8,16,26,0.30)" :
          "0 8px 20px rgba(8,16,26,0.18)",
          transform: btnHover ? "translateY(-2px)" : "translateY(0)",
          transition: "all 240ms var(--g-ease-soft)", height: "60px", flexDirection: "row", padding: "15px 22px 14px 18px"
        }}>
        {/* Download icon */}
        <span style={{
          width: 28, height: 28, borderRadius: 999,
          background: "var(--g-verde-500)",
          color: "var(--g-beige)",
          display: "inline-flex", alignItems: "center", justifyContent: "center"
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v12" />
            <path d="M7 10l5 5 5-5" />
            <path d="M5 21h14" />
          </svg>
        </span>
        <span style={{ display: "inline-flex", flexDirection: "column", lineHeight: 1.15 }}>
          <span style={{
            fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(249,246,232,0.55)"
          }}>Ficha técnica · PDF</span>
          <span style={{ fontFamily: "var(--g-font-display)", fontSize: 17, marginTop: 2 }}>
            Descargar ficha técnica de raciones
          </span>
        </span>
      </a>
    </div>);

}

/* =====================================================================
   4 · PASTOS BRACHIARIA HUMIDICOLA — rotation diagram
===================================================================== */
function PastosBrachiaria() {
  const SECTORS = 6;
  const DAYS_PER_SECTOR = 28; // 28 days grazing per potrero
  const TICK_MS = 220; // a "day" tick in the demo loop

  // Day in the cycle (1..168). When a sector finishes its 28 days, the next one
  // begins. The mapping below stays consistent for the rotation arm + center text.
  const [day, setDay] = nUse(1);
  const grazing = Math.floor((day - 1) / DAYS_PER_SECTOR);
  const dayInSector = (day - 1) % DAYS_PER_SECTOR + 1;
  const totalDays = SECTORS * DAYS_PER_SECTOR;

  nEff(() => {
    const id = setInterval(() => setDay((d) => d % totalDays + 1), TICK_MS);
    return () => clearInterval(id);
  }, [totalDays]);

  return (
    <section
      style={{
        position: "relative",
        background: "var(--g-petroleo-900)",
        color: "var(--g-beige)",
        padding: "140px 0 0",
        overflow: "hidden"
      }}>
      
      {/* Faint photo backdrop */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('assets/photography/pastura-amanecer.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.18,
          filter: "saturate(0.8)"
        }} />
      
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
          "linear-gradient(180deg, rgba(8,16,26,0.85) 0%, rgba(8,16,26,0.75) 60%, rgba(8,16,26,0.95) 100%)"
        }} />
      

      <div style={{ position: "relative", maxWidth: 1440, margin: "0 auto", padding: "0 56px" }}>
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: 96,
            alignItems: "end",
            marginBottom: 80
          }}>
          
          <Reveal>
            <div
              style={{
                fontFamily: "var(--g-font-sans)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--g-verde-300)"
              }}>PASTOS


            </div>
          </Reveal>
          <div style={{ borderBottom: "1px dashed rgba(249,246,232,0.18)", paddingBottom: 4 }}>
            <Reveal delay={120}>
              <h2
                style={{
                  fontFamily: "var(--g-font-display)",
                  fontSize: "clamp(40px, 5.4vw, 84px)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.024em",
                  color: "var(--g-beige)",
                  fontWeight: 400,
                  margin: 0,
                  textTransform: "uppercase"
                }}>
                
                Barichara <em style={{ fontStyle: "italic", color: "var(--g-verde-300)" }}>HUMIDÍCOLA</em>
              </h2>
            </Reveal>
          </div>
        </div>

        {/* Body — diagram + copy */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 96,
            alignItems: "center",
            paddingBottom: 120
          }}>
          
          {/* Rotation diagram */}
          <PastureRotation
            grazing={grazing}
            sectors={SECTORS}
            day={day}
            dayInSector={dayInSector}
            daysPerSector={DAYS_PER_SECTOR}
            totalDays={totalDays} />
          

          {/* Copy */}
          <div>
            <Reveal>
              <div
                style={{
                  fontFamily: "var(--g-font-display)",
                  fontSize: "clamp(28px, 2.8vw, 40px)",
                  lineHeight: 1.18,
                  letterSpacing: "-0.014em",
                  color: "var(--g-beige)",
                  fontStyle: "italic",
                  margin: "0 0 28px",
                  textWrap: "balance"
                }}>
                
                Nuestro pasto es <span style={{ color: "var(--g-verde-300)" }}>la base de todo</span>.
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p
                style={{
                  fontFamily: "var(--g-font-sans)",
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: "rgba(249,246,232,0.82)",
                  margin: "0 0 18px",
                  maxWidth: "52ch",
                  textWrap: "pretty"
                }}>
                
                Lo cuidamos y rotamos para garantizar forraje fresco y nutritivo,
                optimizando crecimiento y reproducción. Cada potrero descansa, se
                recupera y vuelve a producir en el momento preciso.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div
                style={{
                  marginTop: 36,
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 4,
                  borderTop: "1px solid rgba(249,246,232,0.12)",
                  borderLeft: "1px solid rgba(249,246,232,0.12)"
                }}>
                
                {[
                { k: "Rotación", v: "Planificada" },
                { k: "Forraje", v: "Fresco continuo" },
                { k: "Carga animal", v: "Estable" },
                { k: "Recuperación", v: "Medida" }].
                map((s) =>
                <div
                  key={s.k}
                  style={{
                    padding: "20px 18px",
                    borderRight: "1px solid rgba(249,246,232,0.12)",
                    borderBottom: "1px solid rgba(249,246,232,0.12)"
                  }}>
                  
                    <div
                    style={{
                      fontFamily: "var(--g-font-sans)",
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--g-verde-300)",
                      marginBottom: 6
                    }}>
                    
                      {s.k}
                    </div>
                    <div
                    style={{
                      fontFamily: "var(--g-font-display)",
                      fontSize: 20,
                      lineHeight: 1.1,
                      color: "var(--g-beige)"
                    }}>
                    
                      {s.v}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Closing image band — pastura that fades from the dark section above
                                    into the beige footer below */}
      <div
        style={{
          position: "relative",
          width: "100%",
          marginTop: 200,
          aspectRatio: "24 / 9",
          maxHeight: 460,
          overflow: "hidden"
        }}>
        <img
          src="assets/photography/pastura-sabana.jpg"
          alt="Pastura llanera con cielo abierto"
          loading="lazy"
          decoding="async"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 92%"
          }} />
        

        {/* Top gradient: blend down from the petróleo-900 section above */}
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            background:
            "linear-gradient(180deg, #08101A 0%, rgba(8,16,26,0.65) 14%, rgba(8,16,26,0.18) 32%, transparent 55%)",
            pointerEvents: "none"
          }} />
        
      </div>
    </section>);

}

function PastureRotation({ grazing, sectors, day, dayInSector, daysPerSector, totalDays }) {
  const size = 520;
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = 230;
  const rInner = 90;
  const [ref, seen] = useReveal();
  const [hovered, setHovered] = nUse(null);

  // Sector colors — each pasture state: GRAZING, RECOVERING (next), REST.
  // We model: grazing=current, +1 = recovering, others = rested/ready.
  const sectorState = (i) => {
    const diff = (i - grazing + sectors) % sectors;
    if (diff === 0) return { fill: "var(--g-verde-500)", label: "Pastoreo", txt: "var(--g-beige)" };
    if (diff === 1) return { fill: "rgba(183,173,145,0.55)", label: "Recuperación", txt: "var(--g-petroleo-900)" };
    return { fill: "rgba(154,173,153,0.22)", label: "En reposo", txt: "var(--g-beige)" };
  };

  // Days from "now" (in this potrero) until this sector becomes the grazing one.
  // diff=0 → currently grazing (dayInSector / daysPerSector days in)
  // diff=1 → next; sits for (daysPerSector - dayInSector) more days
  // diff=k → waits (k-1)*daysPerSector + (daysPerSector - dayInSector) more days
  const daysUntilGrazing = (i) => {
    const diff = (i - grazing + sectors) % sectors;
    if (diff === 0) return 0;
    return (diff - 1) * daysPerSector + (daysPerSector - dayInSector + 1);
  };

  const nextSector = (grazing + 1) % sectors;

  const arcPath = (i) => {
    const startAng = i / sectors * Math.PI * 2 - Math.PI / 2;
    const endAng = (i + 1) / sectors * Math.PI * 2 - Math.PI / 2;
    const xs1 = cx + Math.cos(startAng) * rOuter;
    const ys1 = cy + Math.sin(startAng) * rOuter;
    const xe1 = cx + Math.cos(endAng) * rOuter;
    const ye1 = cy + Math.sin(endAng) * rOuter;
    const xs2 = cx + Math.cos(startAng) * rInner;
    const ys2 = cy + Math.sin(startAng) * rInner;
    const xe2 = cx + Math.cos(endAng) * rInner;
    const ye2 = cy + Math.sin(endAng) * rInner;
    return `M ${xs1} ${ys1} A ${rOuter} ${rOuter} 0 0 1 ${xe1} ${ye1} L ${xe2} ${ye2} A ${rInner} ${rInner} 0 0 0 ${xs2} ${ys2} Z`;
  };

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        aspectRatio: "1 / 1",
        maxWidth: size,
        margin: "0 auto",
        opacity: seen ? 1 : 0,
        transform: `scale(${seen ? 1 : 0.92}) rotate(${seen ? 0 : -8}deg)`,
        transition: "opacity 900ms var(--g-ease-soft), transform 900ms var(--g-ease-soft)"
      }}>
      
      <svg viewBox={`0 0 ${size} ${size}`} style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <radialGradient id="pastureCenter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1f3050" />
            <stop offset="100%" stopColor="#0d1726" />
          </radialGradient>
        </defs>

        {/* Outer dashed ring */}
        <circle cx={cx} cy={cy} r={rOuter + 24} fill="none" stroke="rgba(249,246,232,0.14)" strokeDasharray="2 8" />

        {/* Sectors */}
        {Array.from({ length: sectors }).map((_, i) => {
          const s = sectorState(i);
          const isHover = hovered === i;
          return (
            <g key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered((h) => h === i ? null : h)}
            style={{ cursor: "default" }}>
              <path
                d={arcPath(i)}
                fill={s.fill}
                stroke="var(--g-petroleo-900)"
                strokeWidth="2"
                style={{
                  transition: "fill 700ms var(--g-ease-soft), filter 200ms var(--g-ease-soft)",
                  filter: isHover ? "brightness(1.18)" : "none"
                }} />

              {/* sector number */}
              {(() => {
                const ang = (i + 0.5) / sectors * Math.PI * 2 - Math.PI / 2;
                const tr = (rOuter + rInner) / 2;
                const tx = cx + Math.cos(ang) * tr;
                const ty = cy + Math.sin(ang) * tr;
                return (
                  <text
                    x={tx}
                    y={ty}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontFamily="var(--g-font-display)"
                    fontSize="22"
                    fill={s.txt}
                    style={{ transition: "fill 700ms var(--g-ease-soft)", pointerEvents: "none" }}>

                    {String(i + 1).padStart(2, "0")}
                  </text>);

              })()}
            </g>);

        })}

        {/* Center disc */}
        <circle cx={cx} cy={cy} r={rInner - 4} fill="url(#pastureCenter)" stroke="rgba(249,246,232,0.18)" />

        {/* Rotating indicator arm pointing to grazing sector */}
        <g
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            transform: `rotate(${(grazing + 0.5) * (360 / sectors)}deg)`,
            transition: "transform 900ms var(--g-ease-soft)"
          }}>
          
          <line x1={cx} y1={cy} x2={cx} y2={cy - rOuter + 4} stroke="var(--g-verde-300)" strokeWidth="2" />
          <circle cx={cx} cy={cy - rOuter + 4} r={6} fill="var(--g-verde-300)" />
        </g>
        <circle cx={cx} cy={cy} r={6} fill="var(--g-verde-300)" />
      </svg>

      {/* Center: white line-art buffalo */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "none",
          width: 150,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
        <img
          src="assets/photography/bufalo-line-white.png"
          alt="Búfalo"
          style={{
            width: 96, height: "auto", display: "block",
            opacity: 0.92,
            filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.35))",
          }}
        />
      </div>

      {/* Per-sector hover tooltip */}
      {hovered != null && (() => {
        const s = sectorState(hovered);
        const wait = daysUntilGrazing(hovered);
        return (
          <div
            style={{
              position: "absolute",
              top: -8,
              left: "50%",
              transform: "translate(-50%, -100%)",
              background: "var(--g-beige)",
              color: "var(--g-petroleo-900)",
              padding: "10px 14px",
              borderRadius: 10,
              fontFamily: "var(--g-font-sans)",
              fontSize: 12,
              whiteSpace: "nowrap",
              boxShadow: "0 14px 30px rgba(0,0,0,0.35)",
              zIndex: 3,
              pointerEvents: "none"
            }}>
            <div style={{
              fontSize: 9, letterSpacing: "0.20em", textTransform: "uppercase",
              color: "var(--g-verde-700)", marginBottom: 3
            }}>
              Potrero {String(hovered + 1).padStart(2, "0")}
            </div>
            <div style={{ fontWeight: 500, marginBottom: 2 }}>{s.label}</div>
            <div style={{ color: "var(--g-cafe-700)", fontSize: 11 }}>
              {wait === 0 ?
              `Día ${dayInSector} de ${daysPerSector}` :
              `En ${wait} días entra al pastoreo`}
            </div>
          </div>);

      })()}

      {/* PASTO BÚFALOS — rotation regimes (below wheel, premium spacing) */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: -260,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          width: 480,
          maxWidth: "100%",
        }}>
        {[
          {
            kind: "Con fertiriego",
            grazing: "1 día",
            rest: "20 días",
            tone: "var(--g-verde-500)",
          },
          {
            kind: "Sin fertiriego",
            grazing: "1–2 días",
            rest: "30–35 días",
            tone: "rgba(183,173,145,0.85)",
          },
        ].map((r) => (
          <div key={r.kind} style={{
            background: "linear-gradient(180deg, rgba(249,246,232,0.06) 0%, rgba(249,246,232,0.02) 100%)",
            border: "1px solid rgba(249,246,232,0.14)",
            borderLeft: "3px solid " + r.tone,
            borderRadius: 10,
            padding: "16px 18px",
            position: "relative",
            boxShadow: "0 18px 36px rgba(0,0,0,0.25)",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              marginBottom: 14, paddingBottom: 12,
              borderBottom: "1px dashed rgba(249,246,232,0.16)",
            }}>
              <span style={{
                width: 10, height: 10, borderRadius: 999, background: r.tone,
                flexShrink: 0,
              }}/>
              <div style={{
                fontFamily: "var(--g-font-sans)",
                fontSize: 11, fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--g-beige)",
              }}>
                {r.kind}
              </div>
            </div>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14,
              fontFamily: "var(--g-font-sans)",
              fontSize: 11,
              color: "rgba(249,246,232,0.82)",
            }}>
              <span>
                <span style={{ display: "block", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.55, marginBottom: 4 }}>Pastoreo</span>
                <b style={{ fontFamily: "var(--g-font-display)", fontWeight: 400, fontSize: 19, color: "var(--g-beige)", lineHeight: 1 }}>{r.grazing}</b>
              </span>
              <span>
                <span style={{ display: "block", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.55, marginBottom: 4 }}>Descanso</span>
                <b style={{ fontFamily: "var(--g-font-display)", fontWeight: 400, fontSize: 19, color: "var(--g-beige)", lineHeight: 1 }}>{r.rest}</b>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Section header label */}
      <div
        style={{
          position: "absolute",
          left: 0, right: 0,
          bottom: -34,
          textAlign: "center",
          fontFamily: "var(--g-font-sans)",
          fontSize: 10,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "var(--g-verde-300)",
        }}>
        Pasto · Búfalos
      </div>

      {/* Legend bottom */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -76,
          display: "flex",
          justifyContent: "center",
          gap: 24,
          fontFamily: "var(--g-font-sans)",
          fontSize: 11,
          letterSpacing: "0.06em",
          color: "rgba(249,246,232,0.78)"
        }}>

        {[
        { c: "var(--g-verde-500)", l: "Pastoreo", d: "Vacas comiendo" },
        { c: "rgba(183,173,145,0.85)", l: "Recuperación", d: "Próximo turno" },
        { c: "rgba(154,173,153,0.35)", l: "En reposo", d: "Forraje creciendo" }].
        map((it) =>
        <div key={it.l} style={{ display: "flex", alignItems: "center", gap: 8 }} title={it.d}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: it.c, display: "inline-block" }} />
            {it.l}
          </div>
        )}
      </div>
    </div>);

}

/* =====================================================================
   HERO — full-bleed video (preserved from original)
===================================================================== */
function NutricionHero() {
  const videoRef = nRef(null);

  nEff(() => {
    const v = videoRef.current;
    if (!v) return;
    const restart = () => {
      try {
        v.currentTime = 0;
        const p = v.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      } catch (_) {}
    };
    const onVisibility = () => {if (!document.hidden) restart();};
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", restart);
    window.addEventListener("focus", restart);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", restart);
      window.removeEventListener("focus", restart);
    };
  }, []);

  return (
    <section className="video-hero" style={{
      position: "relative",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      background: "#0d130f"
    }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="assets/photography/bufalos-pastura-cordillera.jpg"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          filter: "brightness(0.55)",
          zIndex: 0
        }}>
        <source src="DJI_0837.MP4" type="video/mp4" />
      </video>

      <div style={{
        position: "relative", zIndex: 2,
        height: "100%",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center",
        padding: "0 32px"
      }}>
        <h1 style={{
          fontFamily: "var(--g-font-display)",
          fontSize: "clamp(48px, 7vw, 108px)",
          lineHeight: 1.05, letterSpacing: "-0.018em",
          color: "var(--g-beige)", fontWeight: 400,
          margin: "0 0 28px",
          textWrap: "balance", maxWidth: "16ch"
        }}>
          Alimentación que <em style={{
            fontStyle: "italic",
            color: "#C7D4B5"
          }}>transforma</em> vidas
        </h1>

        <p style={{
          fontFamily: "var(--g-font-sans)",
          fontSize: "clamp(15px, 1.15vw, 18px)",
          lineHeight: 1.55,
          color: "rgba(249,246,232,0.88)",
          margin: 0,
          maxWidth: "54ch",
          textWrap: "pretty"
        }}>
          Soluciones nutricionales de alto rendimiento para el bienestar y productividad de su ganado.
        </p>

        {/* Scroll hint */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            color: "rgba(249,246,232,0.7)",
            fontFamily: "var(--g-font-sans)",
            fontSize: 10,
            letterSpacing: "0.24em",
            textTransform: "uppercase"
          }}>
          
          Descubra
          <span
            style={{
              width: 1,
              height: 36,
              background: "rgba(249,246,232,0.5)",
              animation: "g-scrollHint 2.2s ease-in-out infinite",
              transformOrigin: "top"
            }} />
          
          <style>{`
            @keyframes g-scrollHint {
              0%   { transform: scaleY(0); opacity: 0; }
              40%  { transform: scaleY(1); opacity: 1; }
              100% { transform: scaleY(1) translateY(20px); opacity: 0; }
            }
          `}</style>
        </div>
      </div>
    </section>);

}

window.NutricionAnimal = NutricionAnimal;