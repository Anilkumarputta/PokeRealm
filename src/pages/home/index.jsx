import Controls from "../../scenes/controls";
import Filters from "../../scenes/filters";
import Footer from "../../scenes/footer";
import LandingPage from "../../scenes/landing";
import Pokemons from "../../scenes/pokemons";

const HomePage = () => {
  return (
    <>
      <LandingPage />
      <Filters />
      <Pokemons />
      <Controls />
      <Footer />
    </>
  );
};

export default HomePage;
