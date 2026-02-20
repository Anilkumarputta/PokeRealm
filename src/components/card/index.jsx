import colors, { createGradient } from "../../constants/colors";
import { useCallback, useContext, useEffect, useState } from "react";
import pokeApi from "../../services/pokeApi";
import { Row, Name, TypeMarker, Button } from "../common";
import Stats from "../stats";
import { modalContext } from "../../contexts/modalContext";
import icons from "../../constants/icons";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { pokeContext } from "../../contexts/pokeContext";
import { Card } from "./components";
import pokeball from "../../assets/img/pokeball.png";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { accountContext } from "../../contexts/accountContext";

const PokeCard = ({ data, canRelease }) => {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const { setModal, setData } = useContext(modalContext);
  const { pokemons } = useContext(pokeContext);
  const { accountData } = useContext(accountContext);
  const [pokeData, setPokeData] = useState(null);
  const [cardLoading, setCardLoading] = useState(true);
  const [releasing, setReleasing] = useState(false);
  const [aux, setAux] = useState({ color: null, image: [] });

  const getPokemon = useCallback(async () => {
    setCardLoading(true);
    try {
      const response = await pokeApi.getPokemon(data.url);
      if (response) {
        const captured = pokemons.captured.find((x) => x.pokemonName === response.name);
        setPokeData((prev) => ({
          ...prev,
          ...response,
          captured: captured
            ? {
                captured: true,
                username: captured.user?.username ?? captured.username,
                capturedAt: captured.capturedAt,
              }
            : null,
        }));
        const pokeType = response?.types?.find((x) => x.slot === 1);
        setAux((prev) => ({ ...prev, color: colors.types[pokeType?.type?.name] }));
      } else {
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCardLoading(false);
    }
  }, [data.url, pokemons.captured]);

  const handleClick = () => {
    if (!pokeData) {
      return;
    }

    setData(pokeData);
    setModal(true);
  };

  const releasePokemon = async (e) => {
    e.stopPropagation();
    setReleasing(true);
    try {
      const conn = new HubConnectionBuilder()
        .withUrl("https://www.pokedexneaime.store/pokemonHub")
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();
      await conn.start();
      await conn.invoke("ReleasePokemon", {
        userId: parseInt(accountData.user.id, 10),
        pokemonName: data.name,
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setReleasing(false);
    }
  };

  useEffect(() => {
    getPokemon();
  }, [getPokemon]);

  if (cardLoading && !pokeData) {
    return (
      <Card
        $bg={createGradient(colors.blue[700], colors.blue[900])}
        style={{ cursor: "default", justifyContent: "center" }}
      >
        <Name marginTop="0" style={{ fontSize: "18px" }}>
          {data?.name?.replaceAll("-", " ")}
        </Name>
        <p style={{ opacity: 0.85 }}>Loading details...</p>
      </Card>
    );
  }

  const artwork =
    pokeData?.sprites?.other?.["official-artwork"]?.front_default ??
    pokeData?.sprites?.front_default;

  return (
    <Card
      $bg={createGradient(aux.color, colors.blue[900])}
      onClick={handleClick}
      tabIndex={0}
    >
      {pokeData?.captured && (
        <img
          src={pokeball}
          alt="Captured"
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            width: "22px",
            height: "22px",
          }}
        />
      )}
      <Name marginTop="0" style={{ fontSize: desktop ? "22px" : "19px" }}>
        {data?.name?.replaceAll("-", " ")}
      </Name>
      {artwork && (
        <img
          className="poke-artwork"
          src={artwork}
          alt={pokeData?.name ?? data?.name}
          loading="lazy"
          style={{
            width: desktop ? "min(80%, 228px)" : "min(84%, 184px)",
            maxHeight: desktop ? "228px" : "184px",
            height: "auto",
            objectFit: "contain",
            marginTop: "12px",
            filter: "drop-shadow(0 12px 14px rgba(0, 0, 0, 0.34))",
          }}
        />
      )}
      <Row
        width={"100%"}
        style={{
          marginTop: "10px",
          flexWrap: "wrap",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        {pokeData?.types?.map((type) => (
          <TypeMarker key={type.slot} bg={colors.types[type.type.name]}>
            <img src={icons[type.type.name]} alt={type.type.name} /> {type.type.name}
          </TypeMarker>
        ))}
      </Row>
      <Row
        justify={"space-between"}
        gap={"10px"}
        width={"100%"}
        style={{
          marginTop: "12px",
          borderTop: "1px solid rgba(255, 255, 255, 0.16)",
          paddingTop: "12px",
          zIndex: 1,
        }}
      >
        <Stats icon={"ruler"} name={"Height"} value={pokeData?.height} unit={"m"} />
        <Stats icon={"weight"} name={"Weight"} value={pokeData?.weight} unit={"Kg"} />
      </Row>
      {canRelease && (
        <Button
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            minHeight: "30px",
            backgroundColor: colors.types.fighting,
            padding: desktop ? "0 10px" : "0 8px",
            opacity: releasing ? 0.7 : 1,
            borderRadius: "10px",
          }}
          disabled={releasing}
          onClick={releasePokemon}
        >
          <i className="fa-solid fa-ban"></i> Release
        </Button>
      )}
    </Card>
  );
};

export default PokeCard;
