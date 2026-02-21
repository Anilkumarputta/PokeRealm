import { Column, Row } from "../../components/common";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const Footer = () => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const scrollToSection = (sectionId) => {
    if (sectionId === "explore") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const pillButtonStyle = {
    background: "rgba(255, 255, 255, 0.14)",
    border: "1px solid rgba(255, 255, 255, 0.22)",
    borderRadius: "999px",
    padding: "5px 10px",
    fontSize: "12px",
    fontWeight: 600,
    color: "#f4f8ff",
    cursor: "pointer",
  };

  return (
    <Row width="100%" align="center" justify="center" style={{ padding: "18px 16px 20px" }}>
      <Row
        width="min(1200px, 100%)"
        justify="space-between"
        style={{
          background:
            "linear-gradient(130deg, rgba(14, 26, 58, 0.96) 0%, rgba(32, 64, 126, 0.9) 52%, rgba(122, 91, 255, 0.86) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "18px",
          padding: desktop ? "16px 18px" : "14px",
          boxShadow: "0 14px 30px rgba(2, 8, 24, 0.32)",
          flexWrap: "wrap",
          gap: "12px",
          color: "#f4f8ff",
        }}
      >
        <Column width={desktop ? "auto" : "100%"} align="flex-start" gap="4px">
          <span
            style={{
              fontSize: desktop ? "18px" : "16px",
              fontWeight: 700,
              letterSpacing: "0.3px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <i className="fa-solid fa-bolt"></i> PokeRealm
          </span>
          <span style={{ fontSize: "13px", color: "rgba(233, 241, 255, 0.86)" }}>
            Your colorful Pokemon explorer
          </span>
        </Column>

        <Row
          width={desktop ? "auto" : "100%"}
          gap="8px"
          justify={desktop ? "center" : "flex-start"}
          style={{ flexWrap: "wrap" }}
        >
          <button
            type="button"
            onClick={() => scrollToSection("explore")}
            style={pillButtonStyle}
          >
            <i className="fa-solid fa-earth-americas"></i> Explore
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("filters")}
            style={pillButtonStyle}
          >
            <i className="fa-solid fa-filter"></i> Filter
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("collection")}
            style={pillButtonStyle}
          >
            <i className="fa-solid fa-gamepad"></i> Capture
          </button>
        </Row>

        <Row width={desktop ? "auto" : "100%"} justify={desktop ? "flex-end" : "space-between"}>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            title="Back to top"
            aria-label="Back to top"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.28)",
              background: "rgba(255, 255, 255, 0.16)",
              color: "#ffffff",
              borderRadius: "999px",
              width: "38px",
              height: "38px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "15px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            <span aria-hidden="true" style={{ fontSize: "22px", lineHeight: 1 }}>
              ↑
            </span>
          </button>
        </Row>

        <Row
          width="100%"
          justify="space-between"
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            paddingTop: "10px",
            color: "rgba(235, 242, 255, 0.84)",
            fontSize: "12px",
            flexWrap: "wrap",
            gap: "6px",
          }}
        >
          <span>&copy; {new Date().getFullYear()} PokeRealm</span>
          <span>Built for Pokemon fans</span>
        </Row>
      </Row>
    </Row>
  );
};

export default Footer;
