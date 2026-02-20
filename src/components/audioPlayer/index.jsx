import styled from "styled-components";
import { useCallback, useEffect, useRef } from "react";
import { Button, Row } from "../common";

const Player = styled(Button)`
  border-radius: 50%;
  padding: 8px;
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AudioPlayer = ({ audio, width }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audio) {
      return undefined;
    }

    const sound = new Audio(audio);
    sound.preload = "auto";
    sound.load();
    audioRef.current = sound;

    return () => {
      sound.pause();
      audioRef.current = null;
    };
  }, [audio]);

  const warmAudio = useCallback(() => {
    if (!audioRef.current) {
      return;
    }

    if (audioRef.current.readyState < 2) {
      audioRef.current.load();
    }
  }, []);

  const playAudio = useCallback(async () => {
    try {
      const sound = audioRef.current ?? new Audio(audio);
      sound.preload = "auto";
      if (sound.readyState < 2) {
        sound.load();
      }

      sound.currentTime = 0;
      await sound.play();
      audioRef.current = sound;
    } catch (error) {
      console.error(error);
    }
  }, [audio]);

  return (
    <Row width={width} gap={"8px"} justify={"flex-start"}>
      <Player onMouseEnter={warmAudio} onFocus={warmAudio} onClick={playAudio}>
        <i className="fa-solid fa-play"></i>
      </Player>
      Play Cry
    </Row>
  );
};

export default AudioPlayer;
