import { PageContainer } from "../../scenes/pokemons/components";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Button, Column, PageTitle, Row } from "../../components/common";
import PersonalInfo from "./components/personalInfo";
import colors from "../../constants/colors";
import { accountContext } from "../../contexts/accountContext";
import { useContext, useEffect, useState } from "react";
import serverApi from "../../services/serverApi";
import { loadingContext } from "../../contexts/loadingContext";
import PokeCard from "../../components/card";
import { Navigate } from "react-router-dom";

const AccountPage = () => {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const { accountData, setAccountData, logout } = useContext(accountContext);
  const { loading, setLoading } = useContext(loadingContext);
  const [redirect, setRedirect] = useState(false);
  const [pokemonsCaptured, setPokemonsCaptured] = useState([]);

  const getPokemonsCaptured = async () => {
    try {
      setLoading(true);
      var captured = await serverApi.getCapturedPokemonsByUser(
        accountData.user.id
      );
      if (captured) {
        setPokemonsCaptured(captured);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (logout()) {
      setRedirect(true);
    }
  };

  useEffect(() => {
    if (accountData.user.id) {
      getPokemonsCaptured();
    }
  }, [accountData.user.id]);

  return (
    <PageContainer
      style={{
        marginTop: desktop ? "" : "25%",
      }}
    >
      {redirect && <Navigate to={"/"} />}
      <Column width={"95%"} gap={"32px"}>
        <Column width={"100%"} gap={"8px"} align={"flex-start"}>
          <Row width={"100%"} justify={"flex-start"}>
            <PageTitle>My PokéAccount</PageTitle>
          </Row>
          <Row width={"100%"} justify={"space-between"}>
            <Row width={"max-content"} gap={"8px"}>
              <Button
                style={{
                  borderRadius: "50%",
                  height: "30px",
                  width: "30px",
                  padding: "0",
                }}
                onClick={() => {
                  setAccountData((prev) => ({
                    ...prev,
                    editAccount: true,
                  }));
                }}
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </Button>
              <Button
                style={{
                  borderRadius: "50%",
                  height: "30px",
                  width: "30px",
                  padding: "0",
                  backgroundColor: colors.types.fire,
                }}
                onClick={handleLogout}
              >
                <i class="fa-solid fa-right-from-bracket"></i>
              </Button>
            </Row>
            <Button
              style={{
                borderRadius: "50%",
                height: "30px",
                width: "30px",
                padding: "0",
                backgroundColor: colors.types.fighting,
              }}
              onClick={() => {
                setAccountData((prev) => ({
                  ...prev,
                  deleteAccount: true,
                }));
              }}
            >
              <i class="fa-solid fa-trash"></i>
            </Button>
          </Row>
        </Column>

        <Column width={"100%"} gap={"16px"}>
          <Row width={"100%"} justify={"flex-start"}>
            <h2
              style={{
                textDecoration: "underline",
                textDecorationColor: colors.types.ground,
                textDecorationThickness: "2px",
              }}
            >
              Personal Information
            </h2>
          </Row>

          <Row
            width={"100%"}
            justify={"flex-start"}
            gap={"32px"}
            style={{
              flexWrap: "wrap",
            }}
          >
            <PersonalInfo title={"Name"} value={accountData.user.name} />
            <PersonalInfo
              title={"Username"}
              value={accountData.user.username}
            />
            <PersonalInfo
              title={"Pokémons Captured"}
              value={pokemonsCaptured.length}
            />
          </Row>
        </Column>
        <Column width={"100%"} gap={"64px"}>
          <Row width={"100%"} justify={"flex-start"}>
            <h2
              style={{
                textDecoration: "underline",
                textDecorationColor: colors.types.ground,
                textDecorationThickness: "2px",
                marginBottom: "32px",
              }}
            >
              My Pokémon Collection
            </h2>
          </Row>
          <Row
            width={"100%"}
            justify={"flex-start"}
            gap={"104px 8px"}
            style={{
              flexWrap: "wrap",
            }}
          >
            {pokemonsCaptured.length > 0 ? (
              pokemonsCaptured.map((pokemon, index) => (
                <PokeCard
                  key={index}
                  data={{
                    name: pokemon.pokemonName,
                    url: pokemon.pokemonUrl,
                  }}
                  canRelease={true}
                />
              ))
            ) : (
              <h3>You haven't captured any Pokémon yet...</h3>
            )}
          </Row>
        </Column>
      </Column>
    </PageContainer>
  );
};

export default AccountPage;
