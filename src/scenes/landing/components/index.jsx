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
import styled from "styled-components";
import colors from "../../../constants/colors";

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
  justify-content: center;
  gap: 16px;

  @media screen and (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;

const RightSide = styled(LeftSide)`
  order: 2;
  width: 40%;

  @media screen and (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;

const PokeImage = styled.img`
  filter: drop-shadow(5px 50px 15px rgba(0, 0, 0, 0.3));

  @media screen and (max-width: 768px) {
    width: 90%;
    align-self: center;
    justify-self: center;
  }
`;

const PokeName = styled.h1`
  color: white;
  font-size: 60px;

  @media screen and (max-width: 768px) {
    font-size: 40px;
  }
`;

const PokeBall = styled.img`
  position: absolute;
  bottom: 0;
  z-index: 10000;
  width: 200px;
  transform: translateX(-50%);
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
`;

export { LandingContainer, LeftSide, RightSide, PokeImage, PokeName, PokeBall };
