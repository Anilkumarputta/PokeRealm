import { Column, Row } from "../../../components/common";

const cardStyle = {
  background: "var(--surface-base)",
  borderRadius: "12px",
  padding: "24px 32px",
  boxShadow: "0 2px 8px rgba(123,92,255,0.10)",
  color: "var(--text-secondary)",
  fontSize: "18px",
  fontWeight: 400,
  textAlign: "center",
  maxWidth: "500px",
};

const LandingComponents = () => {
  return (
    <Column width={"100%"} gap={"32px"} style={{ marginTop: "32px" }}>
      <Row justify={"center"} gap={"16px"}>
        <div
          style={{
            background: "var(--surface-strong)",
            borderRadius: "12px",
            padding: "32px 48px",
            boxShadow: "0 2px 8px rgba(123,92,255,0.15)",
            color: "var(--text-primary)",
            fontSize: "22px",
            fontWeight: 600,
            textAlign: "center",
            maxWidth: "600px",
          }}
        >
          Welcome to PokéRealm!<br />
          Discover, collect, and battle Pokémon in a vibrant, real-time world.
          <br />
          Customize your theme, explore habitats, and compete with friends.
        </div>
      </Row>
      <Row justify={"center"} gap={"16px"}>
        <div style={cardStyle}>
          <i
            className="fas fa-palette"
            style={{ color: "var(--accent-color)", fontSize: "24px" }}
          />
          &nbsp; Personalize your experience with unique themes and accents.
        </div>
        <div style={cardStyle}>
          <i
            className="fas fa-globe"
            style={{ color: "var(--accent-color)", fontSize: "24px" }}
          />
          &nbsp; Explore diverse habitats and catch rare Pokémon.
        </div>
      </Row>
    </Column>
  );
};

export default LandingComponents;
