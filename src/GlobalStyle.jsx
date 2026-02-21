import { createGlobalStyle } from "styled-components";
import colors from "./constants/colors.js";

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  :root {
    --accent-color: ${colors.types.psychic};
    --accent-soft: ${colors.types.psychic}66;

    --text-primary: #f6f8ff;
    --text-secondary: #c7d5ff;
    --text-muted: #9fb2df;

    --surface-strong: #12295f;
    --surface-base: #070d20;
    --surface-soft: #0c1736;
    --surface-card: rgba(9, 17, 40, 0.84);
    --surface-panel: rgba(13, 24, 52, 0.8);
    --surface-elevated: rgba(255, 255, 255, 0.09);

    --border-subtle: rgba(255, 255, 255, 0.16);
    --focus-ring: rgba(107, 179, 255, 0.38);

    --button-text: #ffffff;
    --overlay-bg: rgba(255, 255, 255, 0.2);
    --input-bg: rgba(9, 18, 42, 0.94);
    --input-border: rgba(150, 189, 255, 0.24);

    --scene-glow-a: rgba(123, 92, 255, 0.24);
    --scene-glow-b: rgba(65, 216, 255, 0.18);
    --scene-grain-opacity: 0.04;
    --scene-vignette-opacity: 0.16;

    --motion-fast: 0.2s;
    --motion-base: 0.35s;
    --motion-slow: 0.5s;

    --page-gutter: clamp(12px, 2.6vw, 22px);
    --navbar-height: 122px;
  }

  body[data-theme="light"] {
    --text-primary: #101f43;
    --text-secondary: #2e4378;
    --text-muted: #4f6493;

    --surface-strong: #c7dbff;
    --surface-base: #e8f1ff;
    --surface-soft: #d7e4ff;
    --surface-card: rgba(255, 255, 255, 0.9);
    --surface-panel: rgba(255, 255, 255, 0.86);
    --surface-elevated: rgba(10, 17, 34, 0.06);

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
    margin: 0;
    min-height: 100vh;
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    line-height: 1.45;
    background:
      radial-gradient(circle at 8% 12%, rgba(116, 174, 255, 0.26), transparent 32%),
      radial-gradient(circle at 88% 6%, rgba(120, 86, 255, 0.24), transparent 30%),
      linear-gradient(165deg, var(--surface-strong) 0%, var(--surface-base) 62%, var(--surface-soft) 100%);
    color: var(--text-primary);
    overflow-x: hidden;
    transition: color var(--motion-base) ease;
  }

  #root {
    position: relative;
    z-index: 2;
    width: 100%;
    min-height: 100vh;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Comic Neue", cursive;
    margin: 0;
  }

  img {
    overflow-clip-margin: content-box;
    overflow: clip;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    vertical-align: middle;
    image-rendering: crisp-edges;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  @media screen and (max-width: 1024px) {
    :root {
      --navbar-height: 114px;
    }
  }

  @media screen and (max-width: 768px) {
    :root {
      --navbar-height: 108px;
    }
  }

  @media screen and (max-width: 540px) {
    :root {
      --navbar-height: 156px;
      --page-gutter: 12px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default GlobalStyle;
