/* Nuestros Búfalos — full-bleed petróleo banner with herd on left, text on right */

function Bufalos() {
  HatoLucide();
  return (
    <section id="bufalos" style={{
      background: "var(--g-bg)",
      padding: "80px 0 80px",
      position: "relative", overflow: "visible"
    }}>
      <div style={{
        position: "relative",
        width: "100%",
        overflow: "visible",
        lineHeight: 0
      }}>
        {/* Full-bleed banner image — dark blue with buffalo herd on the left */}
        <img src="assets/photography/bufalos-banda-azul.png"
        alt="Manada de búfalas del Hato Guaicaramo"
        style={{ display: "block", width: "100%", height: "auto" }} />

        {/* Cut-out buffalo head — large, anchored bottom-left, horns extending above */}
        <img src="assets/photography/bufalo-recortado.png"
        alt="Búfalo del Hato Guaicaramo"
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: "min(150%, 560px)",
          width: "auto",
          maxWidth: "52%",
          objectFit: "contain", objectPosition: "left bottom",
          pointerEvents: "none",
          zIndex: 2
        }} />

        {/* Text overlay — right-aligned over the dark blue right portion */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          padding: "0 clamp(24px, 6vw, 96px)",
          lineHeight: 1.55, alignItems: "center", justifyContent: "flex-end"
        }}>
          <div style={{
            maxWidth: 560, color: "var(--g-beige)", textAlign: "right",
            display: "flex", flexDirection: "column", alignItems: "flex-end"
          }}>
            <h2 style={{
              fontFamily: "var(--g-font-display)",
              fontSize: "clamp(28px, 2.6vw, 38px)",
              lineHeight: 1.05, letterSpacing: "0.005em", textTransform: "uppercase",
              color: "var(--g-beige)", fontWeight: 400,
              margin: "0 0 clamp(14px, 2vw, 24px)",
              paddingBottom: 6, borderBottom: "1.5px solid var(--g-beige)",
              display: "inline-block", whiteSpace: "nowrap"
            }}>
              Nuestros Búfalos
            </h2>
            <p style={{
              fontFamily: "var(--g-font-sans)",

              lineHeight: 1.55, color: "var(--g-beige)",
              margin: 0, textWrap: "pretty", fontSize: "24px"
            }}>
              Producimos <strong>carne y leche</strong> con una lógica clara:
              genética que funciona, nutrición que sostiene el sistema y manejo
              que mantiene la producción estable todo el año.
            </p>
            <div style={{ marginTop: "clamp(18px, 2.5vw, 32px)" }}>
              <HatoBtn variant="pillLight" size="lg">Ver más</HatoBtn>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

window.Bufalos = Bufalos;