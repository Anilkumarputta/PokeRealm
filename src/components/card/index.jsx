import colors, { createGradient } from "../../constants/colors";
import { useCallback, useContext, useEffect, useState } from "react";
import pokeApi from "../../services/pokeApi";
import { Row, Name, TypeMarker, Button } from "../common";
import Stats from "../stats";
import { modalContext } from "../../contexts/modalContext";
import icons from "../../constants/icons";
import { loadingContext } from "../../contexts/loadingContext";
import Loading from "../loading";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { pokeContext } from "../../contexts/pokeContext";
import { Card } from "./components";
import pokeball from "../../assets/img/pokeball.png";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { accountContext } from "../../contexts/accountContext";

const PokeCard = ({ data, canRelease }) => {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const { setModal, setData } = useContext(modalContext);
  const { loading, setLoading } = useContext(loadingContext);
  const { pokemons } = useContext(pokeContext);
  const { accountData } = useContext(accountContext);
  const [pokeData, setPokeData] = useState();
  const [aux, setAux] = useState({ color: null, image: [] });

  const getPokemon = useCallback(async () => {
    setLoading(true);
    try {
      const response = await pokeApi.getPokemon(data.url);
      if (!response) return;
      const captured = pokemons.captured.find((x) => x.pokemonName === response.name);
      setPokeData((prev) => ({
        ...prev,
        ...response,
        captured: captured
          ? {
              captured: true,
              username: captured.user.username,
              capturedAt: captured.capturedAt,
            }
          : null,
      }));
      const pokeType = response?.types?.find((x) => x.slot === 1);
      setAux((prev) => ({ ...prev, color: colors.types[pokeType?.type?.name] }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [data.url, pokemons.captured, setLoading]);

  const handleClick = () => {
    setData(pokeData);
    setModal(true);
  };

  const releasePokemon = async (e) => {
    e.stopPropagation();
    setLoading(true);
    const conn = new HubConnectionBuilder()
      .withUrl("https://www.pokedexneaime.store/pokemonHub")
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();
    await conn.start();
    await conn.invoke("ReleasePokemon", {
      userId: parseInt(accountData.user.id),
      pokemonName: data.name,
    });
    setLoading(false);
    window.location.reload();
  };

  useEffect(() => {
    getPokemon();
  }, [getPokemon]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Card bg={createGradient(aux.color, colors.blue[900])} onClick={handleClick}>
      {pokeData?.captured && (
        <img
          src={pokeball}
          alt="Captured"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            width: "20px",
            height: "20px",
          }}
        />
      )}
      <Name> ● {data?.name?.replaceAll("-", " ")} ● </Name>
      <Row width={"100%"} style={{ marginTop: "10px" }}>
        {pokeData?.types?.map((type) => (
          <TypeMarker key={type.slot} bg={colors.types[type.type.name]}>
            <img src={icons[type.type.name]} alt={type.type.name} /> {type.type.name}
          </TypeMarker>
        ))}
      </Row>
      <Row
        justify={"space-evenly"}
        gap={"16px"}
        width={"100%"}
        style={{
          marginTop: "15px",
        }}
      >
        <Stats icon={"ruler"} name={"Altura"} value={pokeData?.height} unit={"m"} />
        <Stats icon={"weight"} name={"Peso"} value={pokeData?.weight} unit={"Kg"} />
      </Row>
      {canRelease && (
        <Button
          style={{
            position: "absolute",
            top: "0px",
            right: "10px",
            height: "30px",
            backgroundColor: colors.types.fighting,
            marginTop: "16px",
            padding: desktop ? "" : "5px",
          }}
          onClick={releasePokemon}
        >
          <i className="fa-solid fa-ban"></i>
        </Button>
      )}
    </Card>
  );
};

export default PokeCard;
