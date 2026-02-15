import Controls from "../../scenes/controls";
import Filters from "../../scenes/filters";
import Footer from "../../scenes/footer";
import Landing from "../../scenes/landing";
import Pokemons from "../../scenes/pokemons";

const HomePage = () => {
  return (
    <>
      <Landing />
      <Filters />
      <Pokemons />
      <Controls />
      <Footer />
    </>
  );
};
  
    return (
      <Column width={"100%"} gap={"32px"}>
        <Filters />
        <Pokemons />
        <Controls />
      </Column>
    );
  };

  export default HomePage;
