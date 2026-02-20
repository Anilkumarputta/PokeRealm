import { PageContainer } from "../../scenes/pokemons/components";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Button, Column, PageTitle, Row, StatsTitle } from "../../components/common";
import PersonalInfo from "./components/personalInfo";
import { accountContext } from "../../contexts/accountContext";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import serverApi from "../../services/serverApi";
import { loadingContext } from "../../contexts/loadingContext";
import PokeCard from "../../components/card";
import { Navigate } from "react-router-dom";

const PAGE_SIZE = 10;

const AccountPage = () => {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const { accountData, setAccountData, logout } = useContext(accountContext);
  const { setLoading } = useContext(loadingContext);
  const [redirect, setRedirect] = useState(false);
  const [pokemonsCaptured, setPokemonsCaptured] = useState([]);

  const getPokemonsCaptured = useCallback(async () => {
    try {
      setLoading(true);
      const captured = await serverApi.getCapturedPokemonsByUser(accountData.user.id);
      if (captured) {
        setPokemonsCaptured(captured);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [accountData.user.id, setLoading]);

  const handleLogout = () => {
    if (logout()) {
      setRedirect(true);
    }
  };

  const cards = useMemo(() => {
    return pokemonsCaptured.map((pokemon) => ({
      name: pokemon.pokemonName,
      url: `https://pokeapi.co/api/v2/pokemon/${pokemon.pokemonName}`,
    }));
  }, [pokemonsCaptured]);

  useEffect(() => {
    if (accountData.user.id) {
      getPokemonsCaptured();
    }
  }, [accountData.user.id, getPokemonsCaptured]);

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <PageContainer style={{ width: "100%" }}>
      <Column width={desktop ? "90%" : "100%"} gap="24px" align="flex-start">
        <PageTitle>Account</PageTitle>

        <Row
          width="100%"
          gap="16px"
          style={{
            flexDirection: desktop ? "row" : "column",
            alignItems: desktop ? "center" : "flex-start",
          }}
        >
          <PersonalInfo title="Name" value={accountData.user.name ?? "-"} />
          <PersonalInfo title="Username" value={accountData.user.username ?? "-"} />
          <PersonalInfo title="Captured" value={pokemonsCaptured.length} />
        </Row>

        <Row
          width="100%"
          gap="12px"
          style={{
            flexDirection: desktop ? "row" : "column",
            justifyContent: "flex-start",
          }}
        >
          <Button
            style={{ width: desktop ? "180px" : "100%" }}
            onClick={() =>
              setAccountData((prev) => ({
                ...prev,
                editAccount: true,
              }))
            }
          >
            <i className="fa-solid fa-pen-to-square"></i> Edit Account
          </Button>

          <Button
            style={{ width: desktop ? "180px" : "100%" }}
            onClick={() =>
              setAccountData((prev) => ({
                ...prev,
                deleteAccount: true,
              }))
            }
          >
            <i className="fa-solid fa-trash"></i> Delete Account
          </Button>

          <Button style={{ width: desktop ? "180px" : "100%" }} onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </Button>
        </Row>

        <Column width="100%" align="flex-start" gap="16px">
          <StatsTitle>
            <i className="fa-solid fa-bullseye"></i> Captured Pokemon ({pokemonsCaptured.length})
          </StatsTitle>

          {cards.length === 0 ? (
            <p>No captured Pokemon yet.</p>
          ) : (
            <Row width="100%" gap="16px" style={{ flexWrap: "wrap", justifyContent: "flex-start" }}>
              {cards.slice(0, PAGE_SIZE * 5).map((pokemon) => (
                <PokeCard key={pokemon.name} data={pokemon} canRelease={true} />
              ))}
            </Row>
          )}
        </Column>
      </Column>
    </PageContainer>
  );
};

export default AccountPage;
