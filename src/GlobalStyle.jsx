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
import { createGlobalStyle } from "styled-components";
import colors from "./constants/colors.js";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    scroll-behavior: smooth;
  }

  body {
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    background-color: ${colors.black};
    color: white;
    max-width: 100vw;
    overflow-x: hidden;
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

`;

export default GlobalStyle;
