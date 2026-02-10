import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from './GlobalStyle';
import Layout from './components/layout';
import PokeModal from './components/modal';
import Navbar from './scenes/navbar';
import Account from './scenes/account';
import Toast from './components/toast';
import PokeRoutes from "./router/router";
import EditAccount from "./scenes/account/editAccount";
import DeleteAccount from "./scenes/account/deleteAccount";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useContext, useEffect } from "react";
import { toastContext } from "./contexts/toastContext";
import { pokeContext } from "./contexts/pokeContext";

function App() {
  const { setToast } = useContext(toastContext)
  const { setPokemons } = useContext(pokeContext)

  const initConnection = async () => {
    const conn = new HubConnectionBuilder()
      .withUrl("https://www.pokedexneaime.store/pokemonHub")
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    conn.on("CapturePokemonFailed", (data) => {
      setToast({
        open: true,
        title: "Info!",
        message: data.message,
        type: "info"
      })
    })

    conn.on("PokemonCaptured", (data) => {
      setPokemons((prev) => ({
        ...prev,
        captured: [...prev.captured, {
          pokemonName: data.pokemonName,
          username: data.user.username,
          capturedAt: data.capturedAt
        }]
      }))

      setToast({
        open: true,
        title: "Success!",
        message: `${data.user.username} captured ${data.pokemonName}`,
        type: "info"
      })
    })

    conn.on("PokemonReleased", (data) => {
      setToast({
        open: true,
        title: "Success!",
        message: `Someone released ${data.pokemonName}!`,
        type: "info"
      })

      setPokemons((prev) => ({
        ...prev,
        captured: prev.captured.filter(x => x.pokemonName !== data.pokemonName)
      }))
    })

    conn.on("ReleasePokemonFailed", (data) => {
      setToast({
        open: true,
        title: "Info!",
        message: data.message,
        type: "info"
      })
    })

    conn.on("PokemonNotReleased", (data) => {
      setToast({
        open: true,
        title: "Info!",
        message: data.message,
        type: "info"
      })
    })

    await conn.start();
  };

  useEffect(() => {
    initConnection();
  }, []);

  return (
    <Router>
      <Layout>
        <GlobalStyle />
        <PokeModal />
        <Navbar />
        <PokeRoutes />
        <Account />
        <EditAccount />
        <DeleteAccount />
        <Toast />
      </Layout>
    </Router>
  );
}

export default App;
