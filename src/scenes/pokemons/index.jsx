import { PageContainer } from "./components";
import PokeCard from "../../components/card";
import { Name, Row } from "../../components/common";
import { useContext } from "react";
import { pokeContext } from "../../contexts/pokeContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const Pokemons = () => {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const { pokemons } = useContext(pokeContext);

  return (
    <PageContainer>
      <Row
        style={{
          flexWrap: "wrap",
          gap: "100px 16px",
          marginTop: desktop ? "" : "32px",
        }}
      >
        {pokemons.results.length === 0 ? (
          <Name>
            No results found... <i className="fa-solid fa-ghost" />
          </Name>
        ) : (
          pokemons.results.map((pokemon, index) => (
            <PokeCard key={index} data={pokemon} />
          ))
        )}
      </Row>
    </PageContainer>
  );
};

export default Pokemons;
