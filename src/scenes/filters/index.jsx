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
    // eslint-disable-next-line
  }, [filters]);

}

export default Filters;
