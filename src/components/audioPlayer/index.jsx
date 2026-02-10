import styled from "styled-components";
import { Button, Row } from "../common";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const Player = styled(Button)`
  border-radius: 50%;
  padding: 8px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AudioPlayer = ({ audio, width }) => {
  const desktop = useMediaQuery("(min-width: 1024px)");

  const playAudio = () => {
    const sound = new Audio(audio);
    sound.play();
  };

  return (
    <Row width={width} gap={"8px"} justify={"flex-start"}>
      <Player onClick={playAudio}>
        <i className="fa-solid fa-play"></i>
      </Player>
      Play Cry
    </Row>
  );
};

export default AudioPlayer;
