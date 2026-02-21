import {
  LandingContainer,
  LeftSide,
  FeaturedBadge,
  HeroSubtitle,
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

const Landing = () => {
  const tablet = useMediaQuery("(min-width: 768px)");
  const desktop = useMediaQuery("(min-width: 1024px)");
  const [pokemon, setPokemon] = useState({});
  const [data, setData] = useState({
    color: null,
    pokeImage: null,
  });
  const heroName = pokemon?.name?.replaceAll("-", " ");
  const primaryStats = pokemon?.stats?.slice(0, 4) ?? [];

  const getRandomPokemon = async () => {
    const nextPokemon = await pokeApi.getRandomPokemon();
    if (!nextPokemon) {
      return;
    }

    setPokemon(nextPokemon);
    const pokeType = nextPokemon?.types?.find((x) => x.slot === 1);

    if (pokeType) {
      setData((prev) => ({
        ...prev,
        pokeImage: nextPokemon?.sprites?.other["official-artwork"]?.front_default,
        color: colors.types[pokeType.type.name],
      }));
    }
  };

  useEffect(() => {
    getRandomPokemon();
  }, []);

  return (
    <PageContainer id="explore" style={{ paddingBottom: desktop ? "12px" : "8px" }}>
      <LandingContainer
        background={createGradient(data.color)}
        style={{
          flexDirection: tablet ? "row" : "column-reverse",
        }}
      >
        <LeftSide>
          <FeaturedBadge>Featured Pokemon</FeaturedBadge>
          <PokeName>{heroName || "Loading Pokemon..."}</PokeName>
          <HeroSubtitle>Today&apos;s spotlight Pokemon</HeroSubtitle>
          <Row gap="6px" width="max-content" justify="flex-start">
            {pokemon?.types?.map((type) => (
              <TypeMarker key={type.slot} bg={colors.types[type.type.name]} rounded={true}>
                <img src={icons[type.type.name]} alt={type.type.name} />
              </TypeMarker>
            ))}
          </Row>
          {primaryStats.length > 0 && (
            <Column
              width={tablet ? "56%" : "100%"}
              align="flex-start"
              style={{
                padding: 0,
              }}
            >
              <GraphData icon="heart-pulse" value={primaryStats[0]?.base_stat} compact={true} />
              <GraphData icon="hand-fist" value={primaryStats[1]?.base_stat} compact={true} />
              <GraphData icon="shield-halved" value={primaryStats[2]?.base_stat} compact={true} />
              <GraphData icon="gauge-high" value={primaryStats[3]?.base_stat} compact={true} />
            </Column>
          )}

          {pokemon?.cries?.latest && (
            <Row
              justify="flex-start"
              style={{
                paddingLeft: 0,
              }}
            >
              <AudioPlayer
                audio={pokemon?.cries?.latest}
                style={{
                  alignSelf: "flex-start",
                  justifySelf: "flex-start",
                }}
              />
            </Row>
          )}

          <Button onClick={getRandomPokemon}>New Random Pokemon</Button>
        </LeftSide>
        <RightSide>
          <PokeImage src={data.pokeImage} loading="lazy" draggable="false" />
        </RightSide>
      </LandingContainer>
    </PageContainer>
  );
};

export default Landing;
