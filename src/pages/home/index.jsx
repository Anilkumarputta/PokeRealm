
import Controls from "../../scenes/controls";
import Filters from "../../scenes/filters";
import Footer from "../../scenes/footer";
import Landing from "../../scenes/landing";
import Pokemons from "../../scenes/pokemons";
import { Column } from "../../components/common";

const HomePage = () => {
  return (
    <Column
      width="100%"
      gap="10px"
      style={{
        alignItems: "center",
        paddingTop: "8px",
      }}
    >
      <Landing />
      <Filters />
      <Pokemons />
      <Controls />
      <Footer />
    </Column>
  );
};

export default HomePage;
