import colors from "./colors";

const types = {
  normal: {
    name: "Normal",
    color: colors.types.normal,
    weakness: ["fighting"]
  },
  fire: {
    name: "Fire",
    color: colors.types.fire,
    weakness: ["water", "rock", "ground"]
  },
  water: {
    name: "Water",
    color: colors.types.water,
    weakness: ["electric", "grass"]
  },
  grass: {
    name: "Grass",
    color: colors.types.grass,
    weakness: ["fire", "ice", "poison", "flying", "bug"]
  },
  electric: {
    name: "Electric",
    color: colors.types.electric,
    weakness: ["ground"]
  },
  ice: {
    name: "Ice",
    color: colors.types.ice,
    weakness: ["fire", "fighting", "rock", "steel"]
  },
  fighting: {
    name: "Fighting",
    color: colors.types.fighting,
    weakness: ["flying", "psychic", "fairy"]
  },
  poison: {
    name: "Poison",
    color: colors.types.poison,
    weakness: ["ground", "psychic"]
  },
  ground: {
    name: "Ground",
    color: colors.types.ground,
    weakness: ["water", "grass", "ice"]
  },
  flying: {
    name: "Flying",
    color: colors.types.flying,
    weakness: ["electric", "ice", "rock"]
  },
  psychic: {
    name: "Psychic",
    color: colors.types.psychic,
    weakness: ["bug", "ghost", "dark"]
  },
  bug: {
    name: "Bug",
    color: colors.types.bug,
    weakness: ["fire", "flying", "rock"]
  },
  rock: {
    name: "Rock",
    color: colors.types.rock,
    weakness: ["water", "grass", "fighting", "ground", "steel"]
  },
  ghost: {
    name: "Ghost",
    color: colors.types.ghost,
    weakness: ["ghost", "dark"]
  },
  dragon: {
    name: "Dragon",
    color: colors.types.dragon,
    weakness: ["ice", "dragon", "fairy"]
  },
  dark: {
    name: "Dark",
    color: colors.types.dark,
    weakness: ["fighting", "bug", "fairy"]
  },
  steel: {
    name: "Steel",
    color: colors.types.steel,
    weakness: ["fire", "fighting", "ground"]
  },
  fairy: {
    name: "Fairy",
    color: colors.types.fairy,
    weakness: ["poison", "steel"]
  }
}

export default types;