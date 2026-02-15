import { PageContainer } from "./components";
import PokeCard from "../../components/card";
import { Name, Row } from "../../components/common";
import { useContext } from "react";
import { pokeContext } from "../../contexts/pokeContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const Pokemons = () => {
  const desktop = useMediaQuery("(min-width: 1024px)");
    return (
      <Column width={"100%"} gap={"32px"}>
        <Row width={"100%"} gap={"16px"} style={{ flexWrap: "wrap" }}>
          {loading ? (
            <Loading />
          ) : pokemons.results.length > 0 ? (
            pokemons.results.map((pokemon) => <Card key={pokemon.name} data={pokemon} />)
          ) : (
            <StatsTitle>No Pokémons found.</StatsTitle>
          )}
        </Row>
      </Column>
    );
};

export default Pokemons;
export default Pokemons;
