# Updated Code Bundle (Copy/Paste Friendly)

Copy each section into the matching file path in VS Code.

## `src/App.js`

```jsx
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from './GlobalStyle';
import Layout from './components/layout';
import PokeModal from './components/modal';
import Navbar from './scenes/navbar';
import Account from './scenes/account';
import Toast from './components/toast';
import PokeRoutes from "./router/router";
import EditAccount from "./scenes/account/editAccount";
import DeleteAccount from "./scenes/account/deleteAccount";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useContext, useEffect } from "react";
import { toastContext } from "./contexts/toastContext";
import { pokeContext } from "./contexts/pokeContext";

function App() {
  const { setToast } = useContext(toastContext)
  const { setPokemons } = useContext(pokeContext)

  const initConnection = async () => {
    try {
      const conn = new HubConnectionBuilder()
      .withUrl("https://www.pokedexneaime.store/pokemonHub")
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    conn.on("CapturePokemonFailed", (data) => {
      setToast({
        open: true,
        title: "Info!",
        message: data.message,
        type: "info"
      })
    })

    conn.on("PokemonCaptured", (data) => {
      setPokemons((prev) => ({
        ...prev,
        captured: [...prev.captured, {
          pokemonName: data.pokemonName,
          username: data.user.username,
          capturedAt: data.capturedAt
        }]
      }))

      setToast({
        open: true,
        title: "Success!",
        message: `${data.user.username} captured ${data.pokemonName}`,
        type: "info"
      })
    })

    conn.on("PokemonReleased", (data) => {
      setToast({
        open: true,
        title: "Success!",
        message: `Someone released ${data.pokemonName}!`,
        type: "info"
      })

      setPokemons((prev) => ({
        ...prev,
        captured: prev.captured.filter(x => x.pokemonName !== data.pokemonName)
      }))
    })

    conn.on("ReleasePokemonFailed", (data) => {
      setToast({
        open: true,
        title: "Info!",
        message: data.message,
        type: "info"
      })
    })

    conn.on("PokemonNotReleased", (data) => {
      setToast({
        open: true,
        title: "Info!",
        message: data.message,
        type: "info"
      })
    })

    await conn.start();
    } catch (error) {
      console.warn("SignalR connection could not start", error);
    }
  };

  useEffect(() => {
    initConnection();
  }, []);

  return (
    <Router>
      <Layout>
        <GlobalStyle />
        <PokeModal />
        <Navbar />
        <PokeRoutes />
        <Account />
        <EditAccount />
        <DeleteAccount />
        <Toast />
      </Layout>
    </Router>
  );
}

export default App;

```

## `src/GlobalStyle.jsx`

```jsx
import { createGlobalStyle } from "styled-components";
import colors from "./constants/colors.js";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    scroll-behavior: smooth;
  }

  :root {
    --accent-color: ${colors.types.psychic};
    --accent-soft: ${colors.types.psychic}66;

    --text-primary: #ffffff;
    --text-secondary: ${colors.gray[400]};
    --text-muted: #9eacd5;

    --surface-strong: ${colors.blue[900]};
    --surface-base: ${colors.black};
    --surface-soft: #02030a;
    --surface-card: rgba(16, 24, 48, 0.58);
    --surface-elevated: rgba(255, 255, 255, 0.08);

    --border-subtle: rgba(255, 255, 255, 0.16);
    --focus-ring: rgba(123, 92, 255, 0.35);

    --button-text: #ffffff;
    --overlay-bg: rgba(255, 255, 255, 0.2);
    --input-bg: rgba(255, 255, 255, 0.95);
    --input-border: rgba(20, 34, 68, 0.2);

    --scene-glow-a: rgba(123, 92, 255, 0.24);
    --scene-glow-b: rgba(65, 216, 255, 0.18);
    --scene-grain-opacity: 0.04;
    --scene-vignette-opacity: 0.16;

    --motion-fast: 0.2s;
    --motion-base: 0.35s;
    --motion-slow: 0.5s;
  }

  body[data-theme="light"] {
    --text-primary: #0a1122;
    --text-secondary: #2f4163;
    --text-muted: #506189;

    --surface-strong: #dfe8ff;
    --surface-base: #f4f8ff;
    --surface-soft: #cfdcff;
    --surface-card: rgba(255, 255, 255, 0.92);
    --surface-elevated: rgba(10, 17, 34, 0.05);

    --border-subtle: rgba(21, 41, 76, 0.16);
    --focus-ring: rgba(67, 112, 196, 0.25);

    --overlay-bg: rgba(12, 24, 47, 0.14);
    --input-bg: rgba(255, 255, 255, 0.98);
    --input-border: rgba(30, 58, 110, 0.18);
    --button-text: #ffffff;
  }

  body[data-scene="stadium"] {
    --scene-glow-a: rgba(246, 196, 69, 0.2);
    --scene-glow-b: rgba(86, 180, 255, 0.2);
  }

  body[data-scene="crystal"] {
    --scene-glow-a: rgba(150, 217, 214, 0.24);
    --scene-glow-b: rgba(169, 143, 243, 0.2);
  }

  body[data-scene="forest"] {
    --scene-glow-a: rgba(122, 199, 76, 0.24);
    --scene-glow-b: rgba(226, 191, 101, 0.2);
  }

  body[data-season="halloween"] {
    --accent-color: ${colors.types.ghost};
    --accent-soft: ${colors.types.ghost}66;
  }

  body[data-season="summer"] {
    --accent-color: ${colors.types.water};
    --accent-soft: ${colors.types.water}66;
  }

  body[data-season="championship"] {
    --accent-color: ${colors.semantic.warning};
    --accent-soft: ${colors.semantic.warning}66;
  }

  body[data-contrast="high"] {
    --text-secondary: var(--text-primary);
    --text-muted: var(--text-primary);
    --border-subtle: rgba(255, 255, 255, 0.36);
    --focus-ring: rgba(255, 255, 255, 0.52);
  }

  body[data-motion="reduced"] {
    --motion-fast: 0.01ms;
    --motion-base: 0.01ms;
    --motion-slow: 0.01ms;
    --scene-grain-opacity: 0.02;
    --scene-vignette-opacity: 0.12;
  }

  body {
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    background:
      radial-gradient(circle at 10% 15%, var(--scene-glow-a), transparent 36%),
      radial-gradient(circle at 80% 10%, var(--scene-glow-b), transparent 32%),
      linear-gradient(165deg, var(--surface-strong) 0%, var(--surface-base) 60%, var(--surface-soft) 100%);
    color: var(--text-primary);
    max-width: 100vw;
    overflow-x: hidden;
    transition: background var(--motion-slow) ease, color var(--motion-base) ease;
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    background-image: radial-gradient(circle at 20% 25%, rgba(255,255,255,0.15) 0 1px, transparent 1px),
      radial-gradient(circle at 70% 60%, rgba(255,255,255,0.11) 0 1px, transparent 1px);
    background-size: 6px 6px, 8px 8px;
    opacity: var(--scene-grain-opacity);
    z-index: 1;
  }

  body::after {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(circle at center, transparent 50%, rgba(0, 0, 0, 0.5) 100%);
    opacity: var(--scene-vignette-opacity);
    z-index: 1;
  }

  body[data-motion="standard"] {
    animation: gradientFloat 10s ease-in-out infinite;
  }

  @keyframes gradientFloat {
    0% {
      background-position: 0% 0%, 100% 0%, 0% 0%;
    }

    50% {
      background-position: 6% 4%, 94% 6%, 0% 0%;
    }

    100% {
      background-position: 0% 0%, 100% 0%, 0% 0%;
    }
  }

  h1, h2,h3,h4,h5,h6 {
    font-family: "Comic Neue", cursive;
  }

  img{
    overflow-clip-margin: content-box;
    overflow: clip;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    vertical-align: middle;
    image-rendering: crisp-edges;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default GlobalStyle;

```

## `src/assets/svg/logo.svg`

```xml
<svg width="360" height="120" viewBox="0 0 360 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="wordmarkGradient" x1="48" y1="24" x2="340" y2="108" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFD65A"/>
      <stop offset="0.45" stop-color="#FF5F9E"/>
      <stop offset="1" stop-color="#7B5CFF"/>
    </linearGradient>
    <linearGradient id="pokeballRing" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#41D8FF"/>
      <stop offset="1" stop-color="#4F8DFF"/>
    </linearGradient>
    <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="3.5" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <g filter="url(#softGlow)">
    <circle cx="52" cy="60" r="38" fill="#0A1026" stroke="url(#pokeballRing)" stroke-width="6"/>
    <path d="M20 60C20 42.327 34.327 28 52 28C69.673 28 84 42.327 84 60H20Z" fill="#FF5F9E"/>
    <path d="M20 60H84" stroke="#F4F6FF" stroke-width="7"/>
    <circle cx="52" cy="60" r="12" fill="#F4F6FF" stroke="#1D2F58" stroke-width="5"/>
    <circle cx="52" cy="60" r="4" fill="#4F8DFF"/>
  </g>

  <text x="102" y="58" fill="url(#wordmarkGradient)" font-family="'Comic Neue', sans-serif" font-size="44" font-weight="700" letter-spacing="1.4">
    PokeRealm
  </text>
  <text x="104" y="86" fill="#AAB7DA" font-family="'Montserrat', sans-serif" font-size="14" letter-spacing="4.2">
    EXPLORE • COLLECT • BATTLE
  </text>
</svg>

```

## `src/components/card/components/index.jsx`

```jsx
import styled from "styled-components";

const Card = styled.div`
  background: ${(props) => props.$bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 380px;
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  position: relative;
  cursor: pointer;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25);
  transition: transform var(--motion-base) ease,
    box-shadow var(--motion-base) ease,
    border-color var(--motion-fast) ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 30px rgba(0, 0, 0, 0.35);
    border-color: var(--accent-soft);
  }

  &:focus-visible {
    outline: 3px solid var(--focus-ring);
    outline-offset: 3px;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
    height: auto;
  }
`;

export { Card };

```

## `src/components/card/index.jsx`

```jsx
import colors, { createGradient } from "../../constants/colors";
import { useContext, useEffect, useState } from "react";
import pokeApi from "../../services/pokeApi";
import { Row, PokeProfile, Name, TypeMarker, Button } from "../common";
import Stats from "../stats";
import { modalContext } from "../../contexts/modalContext";
import icons from "../../constants/icons";
import { loadingContext } from "../../contexts/loadingContext";
import Loading from "../loading";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { pokeContext } from "../../contexts/pokeContext";
import { Card } from "./components";
import pokeball from "../../assets/img/pokeball.png";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { accountContext } from "../../contexts/accountContext";

const PokeCard = ({ data, canRelease }) => {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const { setModal, setData } = useContext(modalContext);
  const { loading, setLoading } = useContext(loadingContext);
  const { pokemons } = useContext(pokeContext);
  const { accountData } = useContext(accountContext);
  const [pokeData, setPokeData] = useState();

  const [aux, setAux] = useState({
    color: null,
    image: [],
  });

  const verifyCapture = async (name) => {
    const captured = pokemons.captured.find((x) => x.pokemonName === name);
    if (captured) {
      return {
        captured: true,
        username: captured.user.username,
        capturedAt: captured.capturedAt,
      };
    }
  };

  const getPokemon = async () => {
    setLoading(true);
    try {
      const response = await pokeApi.getPokemon(data.url);
      if (response) {
        const captured = await verifyCapture(response.name);
        setPokeData((prev) => ({ ...prev, ...response, captured: captured }));
        const pokeType = response?.types?.find((x) => x.slot === 1);
        setAux((prev) => ({
          ...prev,
          color: colors.types[pokeType?.type?.name],
        }));
      } else {
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    setData(pokeData);
    setModal(true);
  };

  const releasePokemon = async (e) => {
    e.stopPropagation();
    setLoading(true);

    const conn = new HubConnectionBuilder()
      .withUrl("https://www.pokedexneaime.store/pokemonHub")
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    await conn.start();
    await conn.invoke("ReleasePokemon", {
      userId: parseInt(accountData.user.id),
      pokemonName: data.name,
    });
    setLoading(false);
    window.location.reload();
  };

  useEffect(() => {
    getPokemon();
  }, [data.url, pokemons.captured]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Card
      $bg={createGradient(aux.color, colors.blue[900])}
      onClick={handleClick}
      tabIndex={0}
    >
      {pokeData?.captured && (
        <img
          src={pokeball}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            width: "20px",
            height: "20px",
          }}
        />
      )}

      <PokeProfile
        src={pokeData?.sprites?.other?.["official-artwork"]?.front_default}
        style={{
          top: desktop ? "-60%" : "",
        }}
      />
      <Name> ● {data?.name?.replaceAll("-", " ")} ● </Name>

      <Row
        width={"100%"}
        style={{
          marginTop: "10px",
        }}
      >
        {pokeData?.types?.map((type) => (
          <TypeMarker key={type.slot} bg={colors.types[type.type.name]}>
            <img src={icons[type.type.name]} /> {type.type.name}
          </TypeMarker>
        ))}
      </Row>

      <Row
        justify={"space-evenly"}
        gap={"16px"}
        width={"100%"}
        style={{
          marginTop: "15px",
        }}
      >
        <Stats
          icon={"ruler"}
          name={"Altura"}
          value={pokeData?.height}
          unit={"m"}
        />
        <Stats
          icon={"weight"}
          name={"Peso"}
          value={pokeData?.weight}
          unit={"Kg"}
        />
      </Row>

      {canRelease && (
        <Button
          style={{
            position: "absolute",
            top: "0px",
            right: "10px",
            height: "30px",
            backgroundColor: colors.types.fighting,
            marginTop: "16px",
            padding: desktop ? "" : "5px",
          }}
          onClick={releasePokemon}
        >
          <i className="fa-solid fa-ban"></i>
        </Button>
      )}
    </Card>
  );
};

export default PokeCard;

```

## `src/components/common/index.jsx`

```jsx
import styled from "styled-components";
import colors from "../../constants/colors";

const Logo = styled.img`
  height: 70px;
  animation: logoPulse var(--motion-slow) ease-out;

  @keyframes logoPulse {
    0% {
      transform: scale(0.92);
      filter: drop-shadow(0 0 0 rgba(123, 92, 255, 0));
    }

    65% {
      transform: scale(1.03);
      filter: drop-shadow(0 0 12px var(--accent-soft));
    }

    100% {
      transform: scale(1);
      filter: drop-shadow(0 0 0 rgba(123, 92, 255, 0));
    }
  }

  @media screen and (max-width: 768px) {
    height: 60px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${(props) => props.align ?? "center"};
  justify-content: ${(props) => props.justify ?? "space-evenly"};
  gap: ${(props) => props.gap ?? "0"};
  width: ${(props) => props.width ?? "100%"};
`;

const Column = styled(Row)`
  flex-direction: column;
  width: ${(props) => props.width ?? "auto"};
`;

const Button = styled.button`
  background: linear-gradient(135deg, var(--accent-color, ${colors.accent.violet}) 0%, ${colors.blue[600]} 100%);
  border-radius: 6px;
  border: none;
  color: var(--button-text);
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  position: relative;
  gap: 8px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -130%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
    transform: skewX(-22deg);
    transition: left var(--motion-base) ease;
  }

  &:hover::before {
    left: 130%;
  }

  &:hover {
    background: linear-gradient(135deg, var(--accent-color, ${colors.accent.violet}) 0%, ${colors.blue[700]} 100%);
  }

  &:active {
    background: linear-gradient(135deg, ${colors.blue[800]} 0%, var(--accent-color, ${colors.accent.violet}) 100%);
  }

  &:focus-visible {
    outline: 3px solid var(--focus-ring);
    outline-offset: 2px;
  }

  &:disabled {
    background: ${colors.gray[400]};
    cursor: not-allowed;
  }
`;

const PokeProfile = styled.img`
  position: absolute;
  transform: scale(0.5);
  top: -50%;

  @media (max-width: 320px) {
    transform: scale(0.4);
    top: -150%;
  }

  @media (max-width: 768px) {
    transform: scale(0.4);
    top: -100%;
  }

  @media (max-width: 415px) {
    transform: scale(0.4);
    top: -100%;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    transform: scale(0.6);
    top: -60%;
  }

  @media (min-width: 1024px) and (max-width: 1365px) {
    transform: scale(0.5);
    top: -100%;
  }
`;

const Name = styled.h2`
  color: var(--text-primary);
  font-size: 30px;
  text-transform: capitalize;
  text-align: center;
  margin-top: ${(props) => props.marginTop ?? "30%"};
  word-wrap: break-word;
  white-space: nowrap;
`;

const TypeMarker = styled.div`
  background: ${(props) => props.bg};
  color: white;
  border-radius: ${(props) => (props.rounded ? "50%" : "6px")};
  padding: 8px;
  margin: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-transform: uppercase;
  font-weight: 600;

  img {
    width: ${(props) => props.width ?? "20px"};
    height: ${(props) => props.height ?? "20px"};
  }
`;

const OutlinedBtn = styled.button`
  background: transparent;
  border: 1px solid ${(props) => props.border ?? "white"};
  border-radius: 6px;
  height: 45px;
  color: ${(props) => props.color ?? "white"};
  padding: 0 16px;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.border ?? "white"};
    color: ${(props) => props.color ?? "black"};
  }
`;

const StatsTitle = styled.h2`
  color: var(--text-primary);
  font-size: 20px;
  text-transform: uppercase;
  margin-bottom: 8px;

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const PokeCode = styled.p`
  color: var(--text-secondary);
  font-size: 16px;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const Overlay = styled.div`
  background: var(--overlay-bg);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000000000000;
  width: 100vw;
  max-width: 100vw;
`;

const CloseButton = styled.i`
  position: absolute;
  top: 8px;
  right: 8px;
  color: var(--text-primary);
  cursor: pointer;
`;

const Input = styled.input`
  height: 45px;
  background-color: var(--input-bg);
  border: 1px solid var(--input-border);
  box-sizing: border-box;
  border-radius: 6px;
  padding: 5px 10px;
  width: 100%;
  outline: none;
  font-size: 16px;
  position: relative;

  &:focus {
    border: 1px solid var(--accent-color);
    box-shadow: 0 0 0 3px var(--focus-ring);
  }

  i {
    position: absolute;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
  }
`;

const PageTitle = styled.h1`
  color: var(--text-primary);
  font-size: 40px;
  margin-bottom: 8px;

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`;

export {
  Row,
  Button,
  Column,
  PokeProfile,
  Name,
  Logo,
  TypeMarker,
  StatsTitle,
  PokeCode,
  OutlinedBtn,
  Overlay,
  CloseButton,
  Input,
  PageTitle,
};

```

## `src/constants/colors.js`

```jsx
const colors = {
  black: "#04060f",
  blue: {
    900: "#0a1026",
    800: "#1d2f58",
    700: "#315fa8",
    600: "#4f8dff",
  },
  gray: {
    400: "#d0d9f5",
    300: "#e0e7ff",
    200: "#ecf1ff",
    100: "#f8faff",
  },
  accent: {
    violet: "#7b5cff",
    cyan: "#41d8ff",
    rose: "#ff5f9e",
  },
  semantic: {
    success: "#29d17d",
    warning: "#f6c445",
    danger: "#f25d70",
    info: "#56b4ff",
  },
  types: {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  },
};

const createGradient = (color, bg) => {
  const base = bg ?? "var(--surface-strong, #0a1026)";
  const highlight = color ?? "var(--accent-color, #7b5cff)";
  return `linear-gradient(170deg, ${base} 0%, var(--surface-base, #04060f) 55%, ${highlight} 100%)`;
};

export { createGradient };

export default colors;

```

## `src/contexts/accountContext.jsx`

```jsx
import { createContext, useEffect, useState } from "react";

export const accountContext = createContext();

export const AccountContextProvider = ({ children }) => {
  const [accountData, setAccountData] = useState({
    modalOpen: false,
    isLogged: false,
    user: {
      id: 0,
      name: null,
      username: null,
      token: null,
      captured: [],
    },
    editAccount: false,
    deleteAccount: false,
  });

  const logout = () => {
    sessionStorage.clear();
    window.dispatchEvent(new Event("auth-changed"));
    setAccountData({
      user: {
        id: 0,
        name: null,
        username: null,
      },
      editAccount: false,
      deleteAccount: false,
      isLogged: false,
    });
    return true;
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setAccountData((prev) => ({
        ...prev,
        isLogged: true,
        user: {
          id: sessionStorage.getItem("id"),
          name: sessionStorage.getItem("name"),
          username: sessionStorage.getItem("user"),
        },
      }));
    }
  }, []);

  return (
    <accountContext.Provider value={{ accountData, setAccountData, logout }}>
      {children}
    </accountContext.Provider>
  );
};

```

## `src/contexts/themeContext.jsx`

```jsx
import { createContext, useEffect, useRef, useState } from "react";
import colors from "../constants/colors";
import serverApi from "../services/serverApi";

const themeContext = createContext();

const THEME_STORAGE_KEY = "pokerealm-theme-mode";
const ACCENT_STORAGE_KEY = "pokerealm-theme-accent";
const CONTRAST_STORAGE_KEY = "pokerealm-contrast-mode";
const MOTION_STORAGE_KEY = "pokerealm-motion-mode";
const SCENE_STORAGE_KEY = "pokerealm-background-scene";
const SEASON_STORAGE_KEY = "pokerealm-season-theme";
const SOUND_STORAGE_KEY = "pokerealm-sound-pack";

const scenes = ["nebula", "stadium", "crystal", "forest"];
const seasonalThemes = ["default", "halloween", "summer", "championship"];
const soundPacks = ["off", "nebula", "forest"];

const readStoredPreference = (key, validator, fallback) => {
  const stored = localStorage.getItem(key);
  if (validator(stored)) {
    return stored;
  }

  return fallback;
};

const ThemeContextProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() =>
    readStoredPreference(
      THEME_STORAGE_KEY,
      (value) => value === "light" || value === "dark",
      "dark"
    )
  );

  const [accentType, setAccentType] = useState(() =>
    readStoredPreference(
      ACCENT_STORAGE_KEY,
      (value) => Boolean(value && colors.types[value]),
      "psychic"
    )
  );

  const [contrastMode, setContrastMode] = useState(() =>
    readStoredPreference(
      CONTRAST_STORAGE_KEY,
      (value) => value === "standard" || value === "high",
      "standard"
    )
  );

  const [motionMode, setMotionMode] = useState(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return readStoredPreference(
        MOTION_STORAGE_KEY,
        (value) => value === "standard" || value === "reduced",
        "reduced"
      );
    }

    return readStoredPreference(
      MOTION_STORAGE_KEY,
      (value) => value === "standard" || value === "reduced",
      "standard"
    );
  });

  const [backgroundScene, setBackgroundScene] = useState(() =>
    readStoredPreference(SCENE_STORAGE_KEY, (value) => scenes.includes(value), "nebula")
  );

  const [seasonTheme, setSeasonTheme] = useState(() =>
    readStoredPreference(
      SEASON_STORAGE_KEY,
      (value) => seasonalThemes.includes(value),
      "default"
    )
  );

  const [soundPack, setSoundPack] = useState(() =>
    readStoredPreference(SOUND_STORAGE_KEY, (value) => soundPacks.includes(value), "off")
  );

  const audioContextRef = useRef(null);
  const ambientIntervalRef = useRef(null);

  const cycleValue = (items, current, setter) => {
    const currentIndex = items.findIndex((x) => x === current);
    const nextIndex = (currentIndex + 1) % items.length;
    setter(items[nextIndex]);
  };

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const cycleAccentType = () => {
    const accentKeys = ["psychic", "water", "fire", "grass", "electric", "dragon"];
    cycleValue(accentKeys, accentType, setAccentType);
  };

  const toggleContrast = () => {
    setContrastMode((prev) => (prev === "standard" ? "high" : "standard"));
  };

  const toggleMotion = () => {
    setMotionMode((prev) => (prev === "standard" ? "reduced" : "standard"));
  };

  const cycleBackgroundScene = () => {
    cycleValue(scenes, backgroundScene, setBackgroundScene);
  };

  const cycleSeasonTheme = () => {
    cycleValue(seasonalThemes, seasonTheme, setSeasonTheme);
  };

  const cycleSoundPack = () => {
    cycleValue(soundPacks, soundPack, setSoundPack);
  };

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    document.body.dataset.theme = themeMode;
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem(ACCENT_STORAGE_KEY, accentType);
    const accentHex = colors.types[accentType] ?? colors.types.psychic;

    document.documentElement.style.setProperty("--accent-color", accentHex);
    document.documentElement.style.setProperty("--accent-soft", `${accentHex}66`);
  }, [accentType]);

  useEffect(() => {
    localStorage.setItem(CONTRAST_STORAGE_KEY, contrastMode);
    document.body.dataset.contrast = contrastMode;
  }, [contrastMode]);

  useEffect(() => {
    localStorage.setItem(MOTION_STORAGE_KEY, motionMode);
    document.body.dataset.motion = motionMode;
  }, [motionMode]);

  useEffect(() => {
    localStorage.setItem(SCENE_STORAGE_KEY, backgroundScene);
    document.body.dataset.scene = backgroundScene;
  }, [backgroundScene]);

  useEffect(() => {
    localStorage.setItem(SEASON_STORAGE_KEY, seasonTheme);
    document.body.dataset.season = seasonTheme;
  }, [seasonTheme]);

  useEffect(() => {
    localStorage.setItem(SOUND_STORAGE_KEY, soundPack);
  }, [soundPack]);

  useEffect(() => {
    const clearAmbient = () => {
      if (ambientIntervalRef.current) {
        clearInterval(ambientIntervalRef.current);
        ambientIntervalRef.current = null;
      }
    };

    if (soundPack === "off" || motionMode === "reduced") {
      clearAmbient();
      return;
    }

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      const ctx = audioContextRef.current;
      const frequencies = soundPack === "forest" ? [196, 247, 294] : [220, 261.6, 329.6];

      const playPulse = () => {
        if (ctx.state === "suspended") {
          ctx.resume();
        }

        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(
          frequencies[Math.floor(Math.random() * frequencies.length)],
          ctx.currentTime
        );

        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.018, ctx.currentTime + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

        oscillator.connect(gain);
        gain.connect(ctx.destination);
        oscillator.start();
        oscillator.stop(ctx.currentTime + 2.0);
      };

      playPulse();
      ambientIntervalRef.current = setInterval(playPulse, 9500);
    } catch (error) {
      clearAmbient();
    }

    return clearAmbient;
  }, [soundPack, motionMode]);

  useEffect(() => {
    let saveTimeout;

    const savePreferences = async () => {
      if (!sessionStorage.getItem("token")) {
        return;
      }

      saveTimeout = setTimeout(async () => {
        await serverApi.saveThemePreferences({
          themeMode,
          accentType,
          contrastMode,
          motionMode,
          backgroundScene,
          seasonTheme,
          soundPack,
        });
      }, 700);
    };

    savePreferences();

    return () => {
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }
    };
  }, [
    themeMode,
    accentType,
    contrastMode,
    motionMode,
    backgroundScene,
    seasonTheme,
    soundPack,
  ]);

  useEffect(() => {
    const hydratePreferences = async () => {
      const hasToken = sessionStorage.getItem("token");
      if (!hasToken) {
        return;
      }

      const serverPreferences = await serverApi.getThemePreferences();
      if (!serverPreferences?.status || !serverPreferences.data) {
        return;
      }

      const prefs = serverPreferences.data;
      if (prefs.themeMode === "light" || prefs.themeMode === "dark") {
        setThemeMode(prefs.themeMode);
      }

      if (prefs.accentType && colors.types[prefs.accentType]) {
        setAccentType(prefs.accentType);
      }

      if (prefs.contrastMode === "standard" || prefs.contrastMode === "high") {
        setContrastMode(prefs.contrastMode);
      }

      if (prefs.motionMode === "standard" || prefs.motionMode === "reduced") {
        setMotionMode(prefs.motionMode);
      }

      if (scenes.includes(prefs.backgroundScene)) {
        setBackgroundScene(prefs.backgroundScene);
      }

      if (seasonalThemes.includes(prefs.seasonTheme)) {
        setSeasonTheme(prefs.seasonTheme);
      }

      if (soundPacks.includes(prefs.soundPack)) {
        setSoundPack(prefs.soundPack);
      }
    };

    const handleAuthChanged = () => {
      hydratePreferences();
    };

    hydratePreferences();
    window.addEventListener("auth-changed", handleAuthChanged);
    return () => window.removeEventListener("auth-changed", handleAuthChanged);
  }, []);

  return (
    <themeContext.Provider
      value={{
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
        accentColor: colors.types[accentType],
      }}
    >
      {children}
    </themeContext.Provider>
  );
};

export { themeContext, ThemeContextProvider };

```

## `src/index.js`

```jsx
import ReactDOM from 'react-dom/client';
import App from './App';
import { ModalContextProvider } from './contexts/modalContext';
import { FilterContextProvider } from './contexts/filterContext';
import { PokeContextProvider } from './contexts/pokeContext';
import { LoadingContextProvider } from './contexts/loadingContext';
import { AccountContextProvider } from './contexts/accountContext';
import { ToastContextProvider } from './contexts/toastContext';
import { ThemeContextProvider } from './contexts/themeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeContextProvider>
  <ToastContextProvider>
    <PokeContextProvider>
      <ModalContextProvider>
        <FilterContextProvider>
          <LoadingContextProvider>
            <AccountContextProvider>
              <App />
            </AccountContextProvider>
          </LoadingContextProvider>
        </FilterContextProvider>
      </ModalContextProvider>
    </PokeContextProvider>
  </ToastContextProvider>
</ThemeContextProvider>
);


```

## `src/scenes/filters/index.jsx`

```jsx
import { useContext, useEffect } from "react";
import {
  Button,
  Column,
  OutlinedBtn,
  Row,
  StatsTitle,
} from "../../components/common";
import types from "../../constants/types";
import TypesDropdown from "./components/dropdown/types";
import Search from "./components/search";
import { filterContext } from "../../contexts/filterContext";
import { habitats } from "../../constants/habitats";
import HabitatsDropdown from "./components/dropdown/habitats";
import SelectedFilter from "./components/selectedFilter";
import pokeApi from "../../services/pokeApi";
import { pokeContext } from "../../contexts/pokeContext";
import { loadingContext } from "./../../contexts/loadingContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const Filters = () => {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const { filters, setFilters } = useContext(filterContext);
  const { pokemons, setPokemons, getData } = useContext(pokeContext);
  const { setLoading } = useContext(loadingContext);

  const handleClick = async () => {
    setLoading(true);
    try {
      if (!filters.name && !filters.type && !filters.habitat) {
        await getData();
        return;
      }

      const res = await pokeApi.getFilteredPokemons(filters, 0, pokemons.fixed);
      if (!res) {
        setPokemons((prev) => ({
          ...prev,
          all: [],
          results: [],
          offset: 0,
          count: 0,
          next: 0,
          previous: 0,
        }));
        return;
      }

      if (res.results.length > 0) {
        setPokemons((prev) => ({
          ...prev,
          all: res.all,
          results: res.results.slice(0, 10),
          offset: 10,
          count: res.count,
          next: res.next,
          previous: res.previous,
        }));
      } else {
        setPokemons((prev) => ({
          ...prev,
          all: [],
          results: [],
          offset: 0,
          count: 0,
          next: 0,
          previous: 0,
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    getData();
    setFilters({
      type: null,
      habitat: null,
      name: null,
    });
    return;
  };

  useEffect(() => {
    handleClick();
  }, [filters]);

  return (
    <Column width={"100%"} gap={"32px"}>
      <Row
        width={"95%"}
        gap={"8px"}
        style={{
          flexDirection: desktop ? "row" : "column",
          marginTop: desktop ? "0" : "32px",
        }}
      >
        <Row gap={"8px"} width={desktop ? "50%" : "100%"}>
          <HabitatsDropdown name={"Habitats"} data={habitats} />
          <TypesDropdown name={"Types"} data={types} />
        </Row>
        <Search />
        <Button
          style={{
            height: "45px",
            width: desktop ? "10%" : "100%",
          }}
          onClick={handleClick}
        >
          <i className="fa fa-search"></i>
        </Button>
      </Row>

      {(filters.type || filters.habitat || filters.name) && (
        <Column
          width={"90%"}
          gap={"8px"}
          align={"flex-start"}
          style={{
            marginBottom: desktop ? "" : "32px",
          }}
        >
          <StatsTitle>
            <i className="fas fa-filter"></i> Filters
          </StatsTitle>
          <Row
            width={"100%"}
            justify={"space-between"}
            gap={desktop ? 0 : "8px"}
          >
            <Row gap={desktop ? "8px" : "4px"} width={"max-content"}>
              {filters.type && (
                <SelectedFilter name={filters.type} type={"type"} />
              )}
              {filters.habitat && (
                <SelectedFilter name={filters.habitat} type={"habitat"} />
              )}
              {filters.name && (
                <SelectedFilter name={filters.name} type={"name"} />
              )}
            </Row>
            <OutlinedBtn
              style={{
                opacity: 0.8,
              }}
              onClick={handleClearFilters}
            >
              {desktop ? " Clear Filters" : "Clear"}
            </OutlinedBtn>
          </Row>
        </Column>
      )}

      <Row>
        {pokemons.count > 0 && (
          <StatsTitle
            style={{
              textAlign: "left",
              alignSelf: "flex-start",
              width: "90%",
            }}
          >
            <i className="fa-solid fa-clipboard-list" /> {pokemons.count}{" "}
            Pokemons found
          </StatsTitle>
        )}
      </Row>
    </Column>
  );
};

export default Filters;

```

## `src/scenes/landing/components/index.jsx`

```jsx
import styled, { keyframes } from "styled-components";
import colors from "../../../constants/colors";

const drift = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, -10px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`;

const glowDrift = keyframes`
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(6px, -8px, 0) scale(1.03);
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
`;

const LandingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  background: ${(props) => props.background ?? colors.black};
  width: 100vw;
  gap: 1.5rem;
  min-height: 80vh;
  overflow-x: hidden;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 2rem;
  }
`;

const LeftSide = styled.div`
  order: 1;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 16px;

  @media screen and (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;

const RightSide = styled(LeftSide)`
  order: 2;
  width: 40%;
  position: relative;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    width: clamp(300px, 42vw, 680px);
    height: clamp(300px, 42vw, 680px);
    border-radius: 50%;
    background: radial-gradient(circle, var(--accent-soft) 0%, transparent 70%);
    filter: blur(2px);
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    width: clamp(160px, 15vw, 260px);
    height: clamp(160px, 15vw, 260px);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.24) 0%, transparent 72%);
    top: 12%;
    right: 8%;
    filter: blur(4px);
    z-index: 0;
  }

  body[data-motion="standard"] &::before,
  body[data-motion="standard"] &::after {
    animation: ${glowDrift} 10s ease-in-out infinite;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;

const FeaturedBadge = styled.span`
  color: white;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 700;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid var(--border-subtle);
  background: linear-gradient(130deg, var(--accent-color) 0%, rgba(10, 16, 38, 0.8) 100%);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
`;

const HeroSubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 16px;
  letter-spacing: 0.4px;
  margin-top: -8px;
`;

const PokeImage = styled.img`
  position: relative;
  z-index: 1;
  width: clamp(340px, 40vw, 700px);
  max-width: 100%;
  filter: drop-shadow(0 48px 24px rgba(0, 0, 0, 0.35));
  transition: transform var(--motion-slow) ease;

  &:hover {
    transform: translateY(-8px) scale(1.02);
  }

  body[data-motion="standard"] & {
    animation: ${drift} 9s ease-in-out infinite;
  }

  @media screen and (max-width: 768px) {
    width: min(94vw, 600px);
    align-self: center;
    justify-self: center;
  }
`;

const PokeName = styled.h1`
  color: white;
  font-size: 60px;

  @media screen and (max-width: 768px) {
    font-size: 40px;
  }
`;

const PokeBall = styled.img`
  position: absolute;
  bottom: 0;
  z-index: 10000;
  width: 200px;
  transform: translateX(-50%);
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
`;

export {
  LandingContainer,
  LeftSide,
  RightSide,
  FeaturedBadge,
  HeroSubtitle,
  PokeImage,
  PokeName,
  PokeBall,
};

```

## `src/scenes/landing/index.jsx`

```jsx
import {
  LandingContainer,
  LeftSide,
  FeaturedBadge,
  HeroSubtitle,
  PokeImage,
  PokeName,
  RightSide,
} from "./components";
import pokeApi from "../../services/pokeApi";
import { useEffect, useState } from "react";
import colors, { createGradient } from "./../../constants/colors";
import { Row, TypeMarker, Column, Button } from "../../components/common";
import icons from "../../constants/icons";
import { PageContainer } from "../pokemons/components";
import GraphData from "./../../components/graphData/index";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import AudioPlayer from "../../components/audioPlayer";

const LandingPage = () => {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const [pokemon, setPokemon] = useState({});
  const [data, setData] = useState({
    color: null,
    pokeImage: null,
    audio: null,
  });

  const getRandomPokemon = async () => {
    const pokemon = await pokeApi.getRandomPokemon();
    if (pokemon) {
      setPokemon(pokemon);
      const pokeType = pokemon?.types?.find((x) => {
        return x.slot === 1;
      });

      if (pokeType) {
        setData((prev) => ({
          ...prev,
          pokeImage: pokemon?.sprites?.other["official-artwork"]?.front_default,
          color: colors.types[pokeType.type.name],
          audio: pokemon?.cries?.latest,
        }));
      }
    }
  };

  useEffect(() => {
    getRandomPokemon();
  }, []);

  return (
    <PageContainer
      style={{
        marginTop: desktop ? "" : "25%",
      }}
    >
      <LandingContainer
        background={() => createGradient(data.color)}
        style={{
          flexDirection: desktop ? "row" : "column-reverse",
        }}
      >
        <LeftSide>
          <FeaturedBadge>Featured Pokémon</FeaturedBadge>
          <PokeName>
            {pokemon?.name && pokemon?.name?.replaceAll("-", " ")}
          </PokeName>
          <HeroSubtitle>Today's spotlight Pokémon</HeroSubtitle>
          <Row gap="8px" width={"max-content"}>
            {pokemon?.types?.map((type) => (
              <TypeMarker
                key={type.slot}
                bg={colors.types[type.type.name]}
                rounded={true}
              >
                <img src={icons[type.type.name]} alt={type.type.name} />
              </TypeMarker>
            ))}
          </Row>
          {pokemon?.stats && (
            <Column
              width={desktop ? "50%" : "100%"}
              align={"flex-start"}
              style={{
                padding: desktop ? "" : "0 16px",
              }}
            >
              <GraphData
                icon="heart-pulse"
                value={pokemon?.stats[0]?.base_stat}
              />
              <GraphData
                icon={"hand-fist"}
                value={pokemon?.stats[1].base_stat}
              />
              <GraphData
                icon={"shield-halved"}
                value={pokemon?.stats[2].base_stat}
              />
              <GraphData icon={"khanda"} value={pokemon?.stats[3].base_stat} />
              <GraphData
                icon={"shield-heart"}
                value={pokemon?.stats[4].base_stat}
              />
              <GraphData
                icon={"gauge-high"}
                value={pokemon?.stats[5].base_stat}
              />
            </Column>
          )}

          {pokemon?.cries?.latest && (
            <Row
              justify={"flex-start"}
              style={{
                paddingLeft: desktop ? "" : "16px",
              }}
            >
              <AudioPlayer
                audio={pokemon?.cries?.latest}
                style={{
                  alignSelf: "fle-start",
                  justifySelf: "flex-start",
                }}
              />
            </Row>
          )}

          <Button onClick={getRandomPokemon}>Get Another Pokemon</Button>
        </LeftSide>
        <RightSide>
          <PokeImage src={data.pokeImage} loading="lazy" draggable="false" />
        </RightSide>
      </LandingContainer>
    </PageContainer>
  );
};

export default LandingPage;

```

## `src/scenes/navbar/index.jsx`

```jsx
import { Button, Logo, Row } from "../../components/common";
import logo from "../../assets/svg/logo.svg";
import { useContext, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { accountContext } from "../../contexts/accountContext";
import { Link } from "react-router-dom";
import { themeContext } from "../../contexts/themeContext";
import { pokeContext } from "../../contexts/pokeContext";

const Navbar = () => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const { accountData, setAccountData } = useContext(accountContext);
  const { pokemons } = useContext(pokeContext);
  const {
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
    accentColor,
  } = useContext(themeContext);
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
  }, [desktop]);

  return (
    <Row
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999999,
        background:
          themeMode === "light"
            ? "linear-gradient(180deg, rgba(246, 250, 255, 0.92) 0%, rgba(236, 243, 255, 0.58) 100%)"
            : "linear-gradient(180deg, rgba(4, 6, 15, 0.95) 0%, rgba(4, 6, 15, 0.55) 100%)",
        borderBottom: "1px solid var(--border-subtle)",
        backdropFilter: "blur(8px)",
        padding: "16px 0",
      }}
      width={"100vw"}
    >
      <Link to="/">
        <Logo
          src={logo}
          style={{
            height: logoSize,
            transition: "height var(--motion-slow)",
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

```

## `src/services/serverApi.js`

```jsx
const url = "https://www.pokedexneaime.store/"

const withAuthHeaders = (method = "GET", body = null) => ({
  method,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
  ...(body ? { body: JSON.stringify(body) } : {}),
})

const serverApi = {
  registerUser: async (data) => {
    try {
      const a = await fetch(`${url}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const b = await a.json()
      if (a.status !== 200) {
        return { message: b.message, status: false }
      }
      if (b.token) {
        sessionStorage.clear()
        sessionStorage.setItem("token", b.token)
        sessionStorage.setItem("user", b.username)
        sessionStorage.setItem("id", b.id)
        sessionStorage.setItem("name", b.name)
        window.dispatchEvent(new Event("auth-changed"))
      }
      return { message: "Signed-up in successfully!", status: true, data: b }
    } catch (error) {
      console.error(error)
      return false
    }
  },
  loginUser: async (data) => {
    try {
      const a = await fetch(`${url}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const b = await a.json()
      if (a.status !== 200) {
        return { message: b.message, status: false }
      }
      sessionStorage.clear()
      sessionStorage.setItem("token", b.token)
      sessionStorage.setItem("user", b.username)
      sessionStorage.setItem("id", b.id)
      sessionStorage.setItem("name", b.name)
      window.dispatchEvent(new Event("auth-changed"))
      return { message: "Logged in successfully!", status: true, data: b }
    } catch (error) {
      return { message: error, status: false }
    }
  },
  getCapturedPokemons: async () => {
    try {
      const a = await fetch(`${url}pokemon/captured`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const b = await a.json()

      if (a.status !== 200) {
        return { message: b.message, status: false }
      }

      return { message: "Pokemons fetched successfully!", status: true, data: b }
    } catch (error) {
      console.error(error)
      return false
    }
  },
  capturePokemon: async (pokemonName) => {
    try {
      const a = await fetch(
        `${url}pokemon/capture`,
        withAuthHeaders("POST", {
          pokemonName: pokemonName,
          userId: sessionStorage.getItem("id"),
        })
      )
      const b = await a.json()

      if (a.status === 200) {
        return { message: b.message, status: true }
      } else if (a.status === 401) {
        return { message: "Unauthorized", status: false }
      }

    } catch (error) {
      console.error(error)
      return false
    }
  },
  getCapturedPokemonsByUser: async (userId) => {
    try {
      const a = await fetch(`${url}pokemon/captured-by/${userId}`, withAuthHeaders("GET"))
      const b = await a.json()
      return b;
    } catch (error) {
      console.error(error)
      return false
    }
  },
  updateAccount: async (data) => {
    try {
      const a = await fetch(
        `${url}user/update`,
        withAuthHeaders("PATCH", {
          id: sessionStorage.getItem("id"),
          name: data.name,
          username: data.username,
          password: data.password,
        })
      )
      const b = await a.json()

      if (a.status === 200) {
        sessionStorage.setItem("user", b.username)
        sessionStorage.setItem("name", b.name)
        return { message: "Account updated successfully!", status: true }
      } else {
        return { message: b.message, status: false }
      }
    } catch (error) {
      console.error(error);
      return error
    }
  },
  getThemePreferences: async () => {
    try {
      const a = await fetch(`${url}user/preferences/theme`, withAuthHeaders("GET"))
      if (a.status !== 200) {
        return false
      }

      const b = await a.json()
      return { status: true, data: b }
    } catch (error) {
      return false
    }
  },
  saveThemePreferences: async (preferences) => {
    try {
      const a = await fetch(
        `${url}user/preferences/theme`,
        withAuthHeaders("PATCH", preferences)
      )

      if (a.status !== 200) {
        return false
      }

      return true
    } catch (error) {
      return false
    }
  },
  deleteAccount: async (password) => {
    try {
      const a = await fetch(
        `${url}user/delete`,
        withAuthHeaders("DELETE", {
          id: sessionStorage.getItem("id"),
          password: password,
        })
      )
      const b = await a.json()

      if (a.status !== 200) {
        return { message: b.message, status: false }
      }

      sessionStorage.clear()
      return { message: "Account deleted successfully!", status: true }

    } catch (error) {
      console.error(error)
      return false
    }
  }
}

export default serverApi;

```