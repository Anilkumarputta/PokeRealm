const colors = {
  black: "#000000",
  blue: {
    900: "#060b14",
    800: "##1c365e",
    700: "#356169",
    600: "#225aa7"
  },
  gray: {
    400: "#B0B0B0",
    300: "#C4C4C4",
    200: "#E0E0E0",
    100: "#F5F5F5"
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
    fairy: "#D685AD"
  }
}

const createGradient = (color, bg) => {
  return `linear-gradient(180deg, ${bg ?? colors.black} 34%, ${color} 100%)`;
}

export { createGradient };

export default colors;