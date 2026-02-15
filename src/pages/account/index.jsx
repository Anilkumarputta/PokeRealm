import { PageContainer } from "../../scenes/pokemons/components";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Button, Column, PageTitle, Row } from "../../components/common";
import PersonalInfo from "./components/personalInfo";
import colors from "../../constants/colors";
import { accountContext } from "../../contexts/accountContext";
import { useCallback, useContext, useEffect, useState } from "react";
import serverApi from "../../services/serverApi";
import { loadingContext } from "../../contexts/loadingContext";
import PokeCard from "../../components/card";
import { Navigate } from "react-router-dom";

const AccountPage = () => {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const { accountData, setAccountData, logout } = useContext(accountContext);
  const { setLoading } = useContext(loadingContext);
  const [redirect, setRedirect] = useState(false);
  const [pokemonsCaptured, setPokemonsCaptured] = useState([]);

  const getPokemonsCaptured = useCallback(async () => {
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
  }, [accountData.user.id, setLoading]);

  const handleLogout = () => {
    if (logout()) {
      setRedirect(true);
    }
  };

  useEffect(() => {
    if (accountData.user.id) {
      getPokemonsCaptured();
    }
  }, [accountData.user.id, getPokemonsCaptured]);

  return (
    <Column width={"100%"} gap={"32px"}>
      <Account />
    </Column>
  );

export default AccountPage;
};

export default AccountPage;
