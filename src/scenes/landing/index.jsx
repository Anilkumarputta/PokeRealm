
import { Column, Row, StatsTitle } from "../../components/common";
import { useContext } from "react";
import { themeContext } from "../../contexts/themeContext";

const Landing = () => {
  const { theme } = useContext(themeContext);
  return (
    <Column width={"100%"} align={"center"} gap={"32px"}>
      <Row width={"100%"} justify={"center"}>
        <img
          src={require("../../assets/img/icons/pokeball.png")}
          alt="Pokeball"
          style={{ width: 120, marginTop: 32 }}
        />
      </Row>
      <StatsTitle style={{ color: theme.accent, fontSize: 32 }}>
        Welcome to PokéRealm!
      </StatsTitle>
      <p style={{ color: theme.text, fontSize: 18, textAlign: "center" }}>
        Explore, search, and manage your favorite Pokémon. Use the filters to find Pokémon by type, habitat, or name. Capture and manage your collection, and enjoy a modern, responsive interface!
      </p>
    </Column>
  );
};

export default Landing;
