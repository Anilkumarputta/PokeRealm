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
      let res;
      if (filters.name || filters.type || filters.habitat) {
        res = await pokeApi.getFilteredPokemons(filters, 0, pokemons.fixed);
      } else {
        await getData();
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
