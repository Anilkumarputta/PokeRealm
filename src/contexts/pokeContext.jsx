import { createContext, useState } from "react";
import serverApi from "../services/serverApi";
import pokeApi from "../services/pokeApi";

export const pokeContext = createContext();

export const PokeContextProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState({
    count: 0,
    next: 10,
    previous: null,
    results: [],
    all: [],
    captured: [],
  });

  const getCapturedPokemons = async () => {
    const res = await serverApi.getCapturedPokemons();
    if (res.data) {
      setPokemons((prev) => ({
        ...prev,
        captured: res.data,
      }));
    }
  };

  const getData = async () => {
    const res = await pokeApi.getAllPokemons();
    if (res) {
      await getCapturedPokemons();
      setPokemons((prev) => ({
        ...prev,
        count: res.count,
        next: 10,
        previous: null,
        results: res.results.slice(0, 10),
        all: res.results,
        fixed: res.results,
      }));
    }
  };

  const refreshPokemons = () => {
    return pokemons;
  };

  return (
    <pokeContext.Provider
      value={{
        pokemons,
        setPokemons,
        getData,
        getPokemons: refreshPokemons,
      }}
    >
      {children}
    </pokeContext.Provider>
  );
};
