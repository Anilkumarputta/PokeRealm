import pokeball from "../../assets/img/pokeball.png";
import styled from "styled-components";
import { Card } from "../card/components";

const LoadingImage = styled.img`
  animation: rotate 5s infinite linear;
  width: 100px;
  height: 100px;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => {
  return (
    <Card
      style={{
        border: "none",
      }}
    >
      <LoadingImage src={pokeball} alt="loading" />
    </Card>
  );
};

export default Loading;
