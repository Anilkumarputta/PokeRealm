import { styled } from "styled-components";
import colors, { createGradient } from "../../../constants/colors";

const AccountModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  background: ${createGradient(colors.types.ground, colors.blue[900])};
  width: min(450px, 92vw);
  min-height: 350px;
  max-height: min(92vh, 760px);
  overflow-y: auto;
  border-radius: 6px;
  box-shadow: 0 8px 32px 0 rgba(8, 8, 8, 0.37);
  position: relative;
  margin: 0;

  @media (max-width: 768px) {
    width: 92%;
    max-height: 92vh;
    padding: 24px 14px;

    p {
      font-size: 14px;
    }
  }
`;

export { AccountModalStyle };
