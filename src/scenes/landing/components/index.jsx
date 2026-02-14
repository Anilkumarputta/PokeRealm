import styled from "styled-components";
import colors from "../../../constants/colors";
import { Column, Row } from "../../../components/common";

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
          Discover, collect, and battle Pokémon in a vibrant, real-time world.<br />
          Customize your theme, explore habitats, and compete with friends.
        </div>
      </Row>
      <Row justify={"center"} gap={"16px"}>
@@ -39,52 +41,50 @@ const LandingComponents = () => {
          <i className="fas fa-palette" style={{ color: "var(--accent-color)", fontSize: "24px" }} />
          &nbsp; Personalize your experience with unique themes and accents.
        </div>
        <div
          style={{
            background: "var(--surface-base)",
            borderRadius: "12px",
            padding: "24px 32px",
            boxShadow: "0 2px 8px rgba(123,92,255,0.10)",
            color: "var(--text-secondary)",
            fontSize: "18px",
            fontWeight: 400,
            textAlign: "center",
            maxWidth: "500px",
          }}
        >
          <i className="fas fa-globe" style={{ color: "var(--accent-color)", fontSize: "24px" }} />
          &nbsp; Explore diverse habitats and catch rare Pokémon.
        </div>
      </Row>
    </Column>
  );
};

export default LandingComponents;

const LandingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  background: ${(props) => props.background ?? colors.black};
  width: 100vw;
  gap: 1.5rem;
  min-height: 80vh;
  overflow-x: hidden;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 2rem;
  }
`;

const LeftSide = styled.div`
  order: 1;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
