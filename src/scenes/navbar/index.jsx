import { useContext } from "react";
import { Button, Logo, Row } from "../../components/common";
import { themeContext } from "../../contexts/themeContext";
import { accountContext } from "../../contexts/accountContext";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const {
    accentColor,
    themeMode,
    accentType,
    contrast,
    motion,
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
  const navigate = useNavigate();

  return (
    <Row
      justify={"space-between"}
      align={"center"}
      style={{
        background: `linear-gradient(90deg, var(--surface-strong) 0%, var(--accent-soft) 100%)`,
        padding: "16px 32px",
        boxShadow: "0 2px 8px rgba(123,92,255,0.10)",
        borderRadius: "0 0 12px 12px",
        minHeight: "80px",
      }}
    >
      <Logo src={require("../../assets/svg/logo.svg")} alt="PokéRealm Logo" />
      <Row gap={"16px"}>
        {accountData.isLogged ? (
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
            onClick={() => {
              logout();
              navigate("/landing");
            }}
          >
            Logout
          </Button>
        ) : (
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
            onClick={() => navigate("/account")}
          >
            Login
          </Button>
        )}
      </Row>
    </Row>
  );


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
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setLogoSize(desktop ? "50px" : "45px");
      } else {
        setLogoSize(desktop ? "80px" : "60px");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Row
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999999,
        backgroundColor: colors.black,
        padding: "16px 0",
      }}
      width={"100vw"}
    >
      <Link to="/">
        <Logo
          src={logo}
          style={{
            height: logoSize,
            transition: "height 0.5s",
          }}
        />
      </Link>

      <Row
        width={"auto"}
        gap={desktop ? "8px" : "6px"}
        style={{ position: "absolute", right: "5%" }}
      >
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
            <Button
              title={`Background scene: ${backgroundScene}`}
              style={{
                height: "40px",
                padding: "0 10px",
                fontSize: "12px",
                textTransform: "capitalize",
              }}
              onClick={cycleBackgroundScene}
            >
              {backgroundScene}
            </Button>

            <Button
              title={`Seasonal event theme: ${seasonTheme}`}
              style={{
                height: "40px",
                padding: "0 10px",
                fontSize: "12px",
                textTransform: "capitalize",
              }}
              onClick={cycleSeasonTheme}
            >
              {seasonTheme}
            </Button>

            <Button
              title={`Ambient sound pack: ${soundPack}`}
              style={{
                height: "40px",
                padding: "0 10px",
                fontSize: "12px",
                textTransform: "capitalize",
              }}
              onClick={cycleSoundPack}
            >
              {soundPack}
            </Button>
          </>
        )}

        <Button
          title="Toggle high contrast mode"
          style={{
            height: desktop ? "40px" : "34px",
            padding: desktop ? "0 10px" : "0 8px",
            fontSize: desktop ? "12px" : "10px",
          }}
          onClick={toggleContrast}
        >
          {contrastMode === "high" ? "HC On" : "HC Off"}
        </Button>

        <Button
          title="Toggle reduced motion"
          style={{
            height: desktop ? "40px" : "34px",
            padding: desktop ? "0 10px" : "0 8px",
            fontSize: desktop ? "12px" : "10px",
          }}
          onClick={toggleMotion}
        >
          {motionMode === "reduced" ? "Motion Off" : "Motion On"}
        </Button>

        {accountData.isLogged ? (
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
              <i className="fa-solid fa-user"></i>
            </Button>
          </Link>
        ) : (
          <Button
            style={{
              height: desktop ? "45px" : "40px",
            }}
            onClick={() =>
              setAccountData((prev) => ({ ...prev, modalOpen: true }))
            }
          >
            Login
          </Button>
        )}
      </Row>
    </Row>
  );
};

export default Navbar;
