/* SalBag — Realistic mockup of the Sal Proteinada polypropylene sack.
   The artwork (HG logo, "Hato Guaicaramo", "Sal Proteinada", VacayToro line)
   is already printed on the sack image. We present the sack with a subtle
   parallax + reveal animation and pair it with a "Composición" caption that
   updates with the active ingredient. */

(function () {
  const { useState, useEffect, useRef } = React;

  function useTilt() {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const onMove = (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      setTilt({ x, y });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    return { tilt, onMove, onLeave };
  }

  function useReveal(threshold = 0.2) {
    const ref = useRef(null);
    const [seen, setSeen] = useState(false);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && (setSeen(true), io.disconnect())),
        { threshold, rootMargin: "0px 0px -8% 0px" }
      );
      io.observe(el);
      return () => io.disconnect();
    }, []);
    return [ref, seen];
  }

  function SalBag({ active = 0, ingredients = [], onLeave = () => {} }) {
    const { tilt, onMove, onLeave: tiltLeave } = useTilt();
    const [stageRef, seen] = useReveal();
    const cur = ingredients[active] || {};

    // Subtle 3D-ish parallax on the bag itself
    const rx = tilt.y * -5;
    const ry = tilt.x * 7;
    const ty = tilt.y * 6;

    return (
      <div
        ref={stageRef}
        onMouseMove={onMove}
        onMouseLeave={() => { tiltLeave(); onLeave(); }}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1.18",
          maxWidth: 560,
          margin: "0 auto",
          perspective: "1800px",
          opacity: seen ? 1 : 0,
          transform: `translateY(${seen ? 0 : 30}px)`,
          transition: "opacity 1100ms var(--g-ease-soft), transform 1100ms var(--g-ease-soft)",
        }}
      >
        {/* Soft floor shadow — anchors the bag to the page */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            bottom: "10%",
            width: "62%",
            height: "5%",
            transform: `translateX(-50%) scaleX(${1 + Math.abs(tilt.x) * 0.08})`,
            background:
              "radial-gradient(50% 100% at 50% 50%, rgba(20,26,38,0.32) 0%, rgba(20,26,38,0.12) 50%, transparent 78%)",
            filter: "blur(12px)",
            transition: "transform 400ms var(--g-ease-soft)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* The sack mockup — multiply blends the white background into the
            page beige so only the sack reads. The polypropylene picks up a
            faint warm cast which suits the rest of the palette. */}
        <div
          style={{
            position: "absolute",
            inset: "0 0 14% 0",
            transformStyle: "preserve-3d",
            transform: `rotateX(${rx}deg) rotateY(${ry}deg) translateY(${ty}px)`,
            transition: "transform 280ms var(--g-ease-soft)",
            zIndex: 1,
          }}
        >
          <img
            src="assets/illustrations/sal-proteinada-bag-transparent.png"
            alt="Costal Sal Proteinada Hato Guaicaramo"
            draggable={false}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center bottom",
              userSelect: "none",
              filter:
                "drop-shadow(0 26px 38px rgba(8,16,26,0.22)) " +
                "drop-shadow(0 10px 14px rgba(8,16,26,0.10))",
            }}
          />
        </div>

        {/* "Composición" caption pinned below the sack */}
        <div
          style={{
            position: "absolute",
            left: "10%",
            right: "10%",
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            padding: "10px 18px",
            background: "var(--g-bg-elevated, #fff)",
            border: "1px solid var(--g-line)",
            borderRadius: 999,
            boxShadow: "0 12px 28px rgba(8,16,26,0.10)",
            zIndex: 2,
            opacity: seen ? 1 : 0,
            transform: `translateY(${seen ? 0 : 12}px)`,
            transition:
              "opacity 700ms var(--g-ease-soft) 280ms, transform 700ms var(--g-ease-soft) 280ms",
          }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "var(--g-petroleo-600)",
              whiteSpace: "nowrap",
            }}
          >
            Composición
          </span>
          <span
            aria-hidden
            style={{
              width: 1,
              height: 16,
              background: "var(--g-line-strong)",
            }}
          />
          <span
            key={active}
            style={{
              fontFamily: "var(--g-font-display)",
              fontStyle: "italic",
              fontSize: "clamp(14px, 1.6vw, 18px)",
              color: "var(--g-verde-700)",
              animation: "salBag-fade 500ms var(--g-ease-soft) both",
              flex: 1,
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {cur.k || "—"}
          </span>
        </div>

        <style>{`
          @keyframes salBag-fade {
            from { opacity: 0; transform: translateX(6px); }
            to   { opacity: 1; transform: translateX(0); }
          }
        `}</style>
      </div>
    );
  }

  /* ---------- Ingredient chips (used in left column) ---------- */
  function IngredientChips({ ingredients, active, onHover, onLeave }) {
    return (
      <div
        onMouseLeave={onLeave}
        style={{
          marginTop: 28,
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {ingredients.map((ing, i) => {
          const isActive = i === active;
          return (
            <button
              key={ing.k}
              onMouseEnter={() => onHover(i)}
              onFocus={() => onHover(i)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 12px 7px 7px",
                background: isActive ? "var(--g-verde-500)" : "var(--g-bg-elevated, #fff)",
                color: isActive ? "var(--g-beige)" : "var(--g-petroleo-700)",
                border: `1px solid ${isActive ? "var(--g-verde-500)" : "var(--g-line)"}`,
                borderRadius: 999,
                cursor: "pointer",
                fontFamily: "var(--g-font-sans)",
                fontSize: 12,
                fontWeight: 500,
                whiteSpace: "nowrap",
                boxShadow: isActive
                  ? "0 6px 14px rgba(98,119,97,0.28)"
                  : "0 2px 6px rgba(8,16,26,0.06)",
                transition: "all 240ms var(--g-ease-soft)",
                transform: isActive ? "translateY(-1px)" : "translateY(0)",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: isActive ? "rgba(249,246,232,0.18)" : "var(--g-verde-50)",
                  color: isActive ? "var(--g-beige)" : "var(--g-verde-700)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--g-font-display)",
                  fontSize: 11,
                  fontStyle: "italic",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {ing.k}
            </button>
          );
        })}
      </div>
    );
  }

  window.SalBag = SalBag;
  window.IngredientChips = IngredientChips;
})();
