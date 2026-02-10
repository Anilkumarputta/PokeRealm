import { habitats } from '../constants/habitats';

const url = "https://pokeapi.co/api/v2/"
const itemsPerPage = 10
const options = {
  get: {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
}


const pokeApi = {
  getPokemon: async (endpoint) => {
    const a = await fetch(endpoint, options.get)
    const b = await a.json()
    return b;
  },
  getPokemonsByHabitat: async (habitat) => {
    try {
      const id = habitats.findIndex(h => h === habitat) + 1
      const a = await fetch(`${url}pokemon-habitat/${id}`, options.get)
      const b = await a.json()
      return b;
    } catch (error) {
      console.error(error)
      return false
    }
  },
  getPokemonsByType: async (type) => {
    try {
      const a = await fetch(`${url}type/${type.toLowerCase()}`, options.get)
      const b = await a.json()
      return b.pokemon;
    } catch (error) {
      console.error(error)
      return false
    }
  },
  filterPokemonByHabitat: async (habitat) => {
    const res = await pokeApi.getPokemonsByHabitat(habitat);
    return res ? res.pokemon_species : [];
  },
  filterPokemonByType: async (type, data = [], res) => {
    const pokemonsByType = await pokeApi.getPokemonsByType(type);
    if (!pokemonsByType) {
      return [];
    }

    if (data.length === 0) {
      return pokemonsByType;
    }

    const dataNames = new Set(data.map(pokemon => pokemon.name));
    return pokemonsByType.filter(pokemon => dataNames.has(pokemon.pokemon.name));
  },
  getFilteredPokemons: async (filters, offset = 0, data = []) => {
    const res = {
      count: 0,
      next: 0,
      previous: 0,
      results: [],
      all: [],
    };

    try {
      if (filters.name) {
        const targetData = res.results.length === 0 ? data : res.results;
        res.all = targetData.filter(pokemon => pokemon.name.includes(filters.name.toLowerCase()));
      }

      if (filters.habitat) {
        const aux = []
        const a = await pokeApi.filterPokemonByHabitat(filters.habitat);
        if (res.all.length === 0) {
          console.clear()
          a.map((pokemon) => aux.push({ name: pokemon.name, url: pokemon.url.replace("-species", "") }));
        } else {
          const dataNames = new Set(res.all.map(pokemon => pokemon.name));
          const aux = []
          a.filter(pokemon => {
            if (dataNames.has(pokemon.name)) {
              aux.push({ name: pokemon.name, url: pokemon.url })
            }
          });
        }
        res.all = aux;
      }
      if (filters.type) {
        const a = await pokeApi.filterPokemonByType(filters.type, data);
        if (res.all.length === 0 && (!filters.habitat && !filters.name)) {
          a.map((pokemon) => res.all.push({ name: pokemon.pokemon.name, url: pokemon.pokemon.url }));
        } else {
          const dataNames = new Set(res.all.map(pokemon => pokemon.name));
          const aux = []
          a.filter(pokemon => {
            if (dataNames.has(pokemon.pokemon.name)) {
              aux.push({ name: pokemon.pokemon.name, url: pokemon.pokemon.url })
            }
          });
          res.all = aux;
        }
      }

      res.count = res.all.length;
      res.results = res.all.slice(offset, offset + itemsPerPage);
      res.next = offset + itemsPerPage < res.all.length ? offset + itemsPerPage : null;
      res.previous = offset > 0 ? offset - itemsPerPage : null;

      return res;
    } catch (error) {
      console.error(error);
      return res;
    }
  },
  getRandomPokemon: async () => {
    try {
      const random = Math.floor(Math.random() * 1010)
      const a = await fetch(`${url}pokemon/${random}`, options.get)
      const b = await a.json()
      return b;
    } catch (error) {
      console.error(error)
      return false
    }
  },
  getAllPokemons: async () => {
    try {
      const a = await fetch(`${url}pokemon?limit=100000&offset=0`, options.get)
      const b = await a.json()
      const res = {
        count: b.count,
        next: itemsPerPage,
        previous: null,
        results: b.results
      }
      return res;
    } catch (error) {
      console.error(error)
      return false
    }
  },
}

export default pokeApi