import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Logo, Row } from "../../components/common";
import { themeContext } from "../../contexts/themeContext";
import { accountContext } from "../../contexts/accountContext";
import { pokeContext } from "../../contexts/pokeContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import logo from "../../assets/svg/logo.svg";

const Navbar = () => {
  const {
    accentColor,
    themeMode,
    accentType,
    contrastMode,
    motionMode,
    backgroundScene,
    seasonTheme,
    soundPack,
    toggleTheme,
    cycleAccentType,
    toggleContrast,
    toggleMotion,
    cycleBackgroundScene,
    cycleSeasonTheme,
    cycleSoundPack,
  } = useContext(themeContext);

  const { accountData, logout } = useContext(accountContext);
  const { pokemons } = useContext(pokeContext);
  const navigate = useNavigate(); // Keep this line as is
  const desktop = useMediaQuery("(min-width: 1024px)");

  const [logoSize, setLogoSize] = useState(desktop ? "80px" : "60px");

  const prestige = useMemo(() => {
    const capturedCount = pokemons?.captured?.length ?? 0;

    if (capturedCount >= 150) {
      return { label: "Champion", color: "#f6c445" };
    }

    if (capturedCount >= 50) {
      return { label: "Elite", color: "#56b4ff" };
    }

    if (capturedCount >= 10) {
      return { label: "Rookie", color: "#29d17d" };
    }

    return { label: "Starter", color: "#aab7da" };
  }, [pokemons?.captured?.length]);

  useEffect(() => {
    setLogoSize(desktop ? "80px" : "60px");
  }, [desktop]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setLogoSize(desktop ? "50px" : "45px");
      } else {
        setLogoSize(desktop ? "80px" : "60px");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [desktop]);

  return (
    <Row
      justify={"space-between"}
      align={"center"}
      style={{
        background: `linear-gradient(90deg, var(--surface-strong) 0%, var(--accent-soft) 100%)`,
        padding: desktop ? "16px 32px" : "12px 16px",
        boxShadow: "0 2px 8px rgba(123,92,255,0.10)",
        borderRadius: "0 0 12px 12px",
        minHeight: desktop ? "80px" : "68px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Link to="/" title="Go to home">
        <Logo src={logo} alt="PokéRealm Logo" style={{ height: logoSize, transition: "height 0.3s" }} />
      </Link>

      <Row gap={desktop ? "10px" : "6px"} style={{ flexWrap: "wrap", justifyContent: "flex-end" }}>
        <Button
          title={`Switch to ${themeMode === "dark" ? "light" : "dark"} mode`}
          style={{
            height: desktop ? "40px" : "34px",
            padding: desktop ? "0 10px" : "0 8px",
            fontSize: desktop ? "12px" : "10px",
          }}
          onClick={toggleTheme}
        >
          {themeMode === "dark" ? "☀ Light" : "🌙 Dark"}
        </Button>

        <Button
          title={`Accent type: ${accentType}`}
          style={{
            height: desktop ? "40px" : "34px",
            padding: desktop ? "0 10px" : "0 8px",
            fontSize: desktop ? "12px" : "10px",
            textTransform: "capitalize",
            border: `1px solid ${accentColor}`,
          }}
          onClick={cycleAccentType}
        >
          {accentType}
        </Button>

        {desktop && (
          <>
            <Button title={`Background scene: ${backgroundScene}`} style={{ height: "40px", padding: "0 10px", fontSize: "12px", textTransform: "capitalize" }} onClick={cycleBackgroundScene}>
              {backgroundScene}
            </Button>
            <Button title={`Seasonal event theme: ${seasonTheme}`} style={{ height: "40px", padding: "0 10px", fontSize: "12px", textTransform: "capitalize" }} onClick={cycleSeasonTheme}>
              {seasonTheme}
            </Button>
            <Button title={`Ambient sound pack: ${soundPack}`} style={{ height: "40px", padding: "0 10px", fontSize: "12px", textTransform: "capitalize" }} onClick={cycleSoundPack}>
              {soundPack}
            </Button>
          </>
        )}

        <Button title="Toggle high contrast mode" style={{ height: desktop ? "40px" : "34px", padding: desktop ? "0 10px" : "0 8px", fontSize: desktop ? "12px" : "10px" }} onClick={toggleContrast}>
          {contrastMode === "high" ? "HC On" : "HC Off"}
        </Button>

        <Button title="Toggle reduced motion" style={{ height: desktop ? "40px" : "34px", padding: desktop ? "0 10px" : "0 8px", fontSize: desktop ? "12px" : "10px" }} onClick={toggleMotion}>
          {motionMode === "reduced" ? "Motion Off" : "Motion On"}
        </Button>

        {accountData.isLogged ? (
          <>
            <Link to="/account" title={`Prestige: ${prestige.label}`}>
              <Button
                style={{
                  borderRadius: "50%",
                  width: desktop ? "45px" : "40px",
                  height: desktop ? "45px" : "40px",
                  minWidth: desktop ? "45px" : "40px",
                  padding: 0,
                  border: `2px solid ${prestige.color}`,
                  boxShadow: `0 0 10px ${prestige.color}55`,
                }}
              >
                <i className="fa-solid fa-user" />
              </Button>
            </Link>
            <Button
              style={{
                height: desktop ? "40px" : "34px",
                padding: desktop ? "0 14px" : "0 10px",
              }}
              onClick={() => {
                logout();
                navigate("/landing");
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            style={{
              height: desktop ? "40px" : "34px",
              padding: desktop ? "0 14px" : "0 10px",
            }}
            onClick={() => navigate("/account")}
          >
            Login
          </Button>
        )}
      </Row>
    </Row>
  );
};

export default Navbar;
