import {
  LandingContainer,
  LeftSide,
  PokeImage,
  PokeName,
  RightSide,
} from "./components";
import pokeApi from "../../services/pokeApi";
import { useEffect, useState } from "react";
import colors, { createGradient } from "./../../constants/colors";
import { Row, TypeMarker, Column, Button } from "../../components/common";
import icons from "../../constants/icons";
import { PageContainer } from "../pokemons/components";
import GraphData from "./../../components/graphData/index";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import AudioPlayer from "../../components/audioPlayer";

const LandingPage = () => {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const [pokemon, setPokemon] = useState({});
  const [data, setData] = useState({
    color: null,
    pokeImage: null,
    audio: null,
  });

  const getRandomPokemon = async () => {
    const pokemon = await pokeApi.getRandomPokemon();
    if (pokemon) {
      setPokemon(pokemon);
      const pokeType = pokemon?.types?.find((x) => {
        return x.slot === 1;
      });

      if (pokeType) {
        setData((prev) => ({
          ...prev,
          pokeImage: pokemon?.sprites?.other["official-artwork"]?.front_default,
          color: colors.types[pokeType.type.name],
          audio: pokemon?.cries?.latest,
        }));
      }
    }
  };

  useEffect(() => {
    getRandomPokemon();
  }, []);

  return (
    <PageContainer
      style={{
        marginTop: desktop ? "" : "25%",
      }}
    >
      <LandingContainer
        background={() => createGradient(data.color)}
        style={{
          flexDirection: desktop ? "row" : "column-reverse",
        }}
      >
        <LeftSide>
          <PokeName>
            {pokemon?.name && pokemon?.name?.replaceAll("-", " ")}
          </PokeName>
          <Row gap="8px" width={"max-content"}>
            {pokemon?.types?.map((type) => (
              <TypeMarker
                key={type.slot}
                bg={colors.types[type.type.name]}
                rounded={true}
              >
                <img src={icons[type.type.name]} alt={type.type.name} />
              </TypeMarker>
            ))}
          </Row>
          {pokemon?.stats && (
            <Column
              width={desktop ? "50%" : "100%"}
              align={"flex-start"}
              style={{
                padding: desktop ? "" : "0 16px",
              }}
            >
              <GraphData
                icon="heart-pulse"
                value={pokemon?.stats[0]?.base_stat}
              />
              <GraphData
                icon={"hand-fist"}
                value={pokemon?.stats[1].base_stat}
              />
              <GraphData
                icon={"shield-halved"}
                value={pokemon?.stats[2].base_stat}
              />
              <GraphData icon={"khanda"} value={pokemon?.stats[3].base_stat} />
              <GraphData
                icon={"shield-heart"}
                value={pokemon?.stats[4].base_stat}
              />
              <GraphData
                icon={"gauge-high"}
                value={pokemon?.stats[5].base_stat}
              />
            </Column>
          )}

          {pokemon?.cries?.latest && (
            <Row
              justify={"flex-start"}
              style={{
                paddingLeft: desktop ? "" : "16px",
              }}
            >
              <AudioPlayer
                audio={pokemon?.cries?.latest}
                style={{
                  alignSelf: "fle-start",
                  justifySelf: "flex-start",
                }}
              />
            </Row>
          )}

          <Button onClick={getRandomPokemon}>Get Another Pokemon</Button>
        </LeftSide>
        <RightSide>
          <PokeImage src={data.pokeImage} loading="lazy" draggable="false" />
        </RightSide>
      </LandingContainer>
    </PageContainer>
  );
};

export default LandingPage;
