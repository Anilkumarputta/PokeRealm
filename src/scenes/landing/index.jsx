
import { useContext } from "react";
import { Button, Column, Logo, Row } from "../../components/common";
import { themeContext } from "../../contexts/themeContext";
import { useNavigate } from "react-router-dom";
import LandingComponents from "./components";
import logo from "../../assets/svg/logo.svg";

const Landing = () => {
  const { accentType, cycleAccentType } = useContext(themeContext);
  const navigate = useNavigate();

  return (
    <Column width={"100vw"} gap={"32px"} style={{ minHeight: "100vh" }}>
      <Row justify={"center"} gap={"16px"} style={{ marginTop: "64px" }}>
        <Logo src={logo} alt="PokéRealm Logo" />
        <Button
          style={{
            background: `linear-gradient(135deg, var(--accent-color) 0%, var(--accent-soft) 100%)`,
            color: "white",
            fontWeight: 600,
            fontSize: "18px",
            padding: "12px 32px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(123,92,255,0.15)",
          }}
          onClick={() => navigate("/home")}
        >
          Enter PokéRealm
        </Button>
      </Row>
      <LandingComponents />
      <Row justify={"center"} gap={"8px"} style={{ marginBottom: "32px" }}>
        <Button
          style={{
            background: `linear-gradient(135deg, var(--accent-color) 0%, var(--accent-soft) 100%)`,
            color: "white",
            fontWeight: 600,
            fontSize: "16px",
            padding: "8px 24px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(123,92,255,0.15)",
          }}
          onClick={cycleAccentType}
        >
          Try a new accent: {accentType}
        </Button>
      </Row>
    </Column>
  );
};

export default Landing;
