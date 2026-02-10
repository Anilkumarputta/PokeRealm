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
