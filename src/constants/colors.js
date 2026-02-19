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
