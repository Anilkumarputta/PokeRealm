import pokeball from "../../assets/img/pokeball.png";
import styled from "styled-components";
import { Column } from "../common";

const LoadingImage = styled.img`
  animation: rotate 2s infinite linear;
  width: 58px;
  height: 58px;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => {
  return (
    <Column
      width="100%"
      gap="10px"
      style={{
        minHeight: "180px",
        border: "1px solid var(--border-subtle)",
        borderRadius: "14px",
        background: "var(--surface-panel)",
        justifyContent: "center",
      }}
    >
      <LoadingImage src={pokeball} alt="loading" />
      <p style={{ margin: 0, color: "var(--text-secondary)", fontWeight: 600 }}>Loading Pokemon...</p>
    </Column>
  );
};

export default Loading;
