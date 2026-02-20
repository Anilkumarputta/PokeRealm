import { useCallback, useContext, useEffect } from "react";
import { Button, Column, OutlinedBtn, Row, StatsTitle } from "../../components/common";
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

  const handleClick = useCallback(async () => {
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
          next: null,
          previous: null,
        }));
        return;
      }

      if (res.results.length > 0) {
        setPokemons((prev) => ({
          ...prev,
          all: res.all,
          results: res.results,
          offset: 0,
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
          next: null,
          previous: null,
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [filters, getData, pokemons.fixed, setLoading, setPokemons]);

  const handleClearFilters = async () => {
    setLoading(true);
    setFilters({
      type: null,
      habitat: null,
      name: null,
    });
    try {
      await getData();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        await getData();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Column
      id="filters"
      width="100%"
      gap="14px"
      style={{
        maxWidth: "1200px",
        padding: desktop ? "4px 20px" : "0 16px",
        scrollMarginTop: "calc(var(--navbar-height) + 10px)",
      }}
    >
      <Column
        width="100%"
        gap="12px"
        align="flex-start"
        style={{
          background: "var(--surface-panel)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "16px",
          padding: desktop ? "14px" : "12px",
          boxShadow: "0 12px 30px rgba(4, 9, 24, 0.22)",
        }}
      >
        <StatsTitle>
          <i className="fa-solid fa-magnifying-glass"></i> Find Pokemon
        </StatsTitle>

        <Row
          width="100%"
          gap="8px"
          style={{
            flexDirection: desktop ? "row" : "column",
          }}
        >
          <Row gap="8px" width={desktop ? "44%" : "100%"}>
            <HabitatsDropdown name="Habitats" data={habitats} />
            <TypesDropdown name="Types" data={types} />
          </Row>

          <Search />

          <Button
            style={{
              minHeight: "42px",
              width: desktop ? "140px" : "100%",
            }}
            onClick={handleClick}
          >
            <i className="fa fa-search"></i> Search
          </Button>
        </Row>

        {(filters.type || filters.habitat || filters.name) && (
          <Column width="100%" gap="8px" align="flex-start">
            <Row width="100%" justify="space-between" gap={desktop ? "8px" : "10px"}>
              <Row
                gap={desktop ? "8px" : "6px"}
                width="auto"
                style={{ flexWrap: "wrap", justifyContent: "flex-start" }}
              >
                {filters.type && <SelectedFilter name={filters.type} type="type" />}
                {filters.habitat && <SelectedFilter name={filters.habitat} type="habitat" />}
                {filters.name && <SelectedFilter name={filters.name} type="name" />}
              </Row>

              <OutlinedBtn
                style={{
                  opacity: 0.9,
                }}
                onClick={handleClearFilters}
              >
                Clear Filters
              </OutlinedBtn>
            </Row>
          </Column>
        )}
      </Column>

      <Row width="100%" justify="flex-start">
        {pokemons.count > 0 && (
          <StatsTitle
            style={{
              textAlign: "left",
              margin: 0,
            }}
          >
            <i className="fa-solid fa-clipboard-list" /> {pokemons.count} Pokemons found
          </StatsTitle>
        )}
      </Row>
    </Column>
  );
};

export default Filters;
