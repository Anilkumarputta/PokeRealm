import styled from "styled-components";
import colors from "../../constants/colors";

const Logo = styled.img`
  height: 70px;
  animation: logoPulse var(--motion-slow) ease-out;

  @keyframes logoPulse {
    0% {
      transform: scale(0.92);
      filter: drop-shadow(0 0 0 rgba(123, 92, 255, 0));
    }

    65% {
      transform: scale(1.03);
      filter: drop-shadow(0 0 12px var(--accent-soft));
    }

    100% {
      transform: scale(1);
      filter: drop-shadow(0 0 0 rgba(123, 92, 255, 0));
    }
  }

  @media screen and (max-width: 768px) {
    height: 60px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${(props) => props.align ?? "center"};
  justify-content: ${(props) => props.justify ?? "space-evenly"};
  gap: ${(props) => props.gap ?? "0"};
  width: ${(props) => props.width ?? "100%"};
`;

const Column = styled(Row)`
  flex-direction: column;
  width: ${(props) => props.width ?? "auto"};
`;

const Button = styled.button`
  background: linear-gradient(135deg, var(--accent-color, ${colors.accent.violet}) 0%, ${colors.blue[600]} 100%);
  border-radius: 6px;
  border: none;
  color: var(--button-text);
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  position: relative;
  gap: 8px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -130%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
    transform: skewX(-22deg);
    transition: left var(--motion-base) ease;
  }

  &:hover::before {
    left: 130%;
  }

  &:hover {
    background: linear-gradient(135deg, var(--accent-color, ${colors.accent.violet}) 0%, ${colors.blue[700]} 100%);
  }

  &:active {
    background: linear-gradient(135deg, ${colors.blue[800]} 0%, var(--accent-color, ${colors.accent.violet}) 100%);
  }

  &:focus-visible {
    outline: 3px solid var(--focus-ring);
    outline-offset: 2px;
  }

  &:disabled {
    background: ${colors.gray[400]};
    cursor: not-allowed;
  }
`;

const PokeProfile = styled.img`
  position: absolute;
  transform: scale(0.5);
  top: -50%;

  @media (max-width: 320px) {
    transform: scale(0.4);
    top: -150%;
  }

  @media (max-width: 768px) {
    transform: scale(0.4);
    top: -100%;
  }

  @media (max-width: 415px) {
    transform: scale(0.4);
    top: -100%;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    transform: scale(0.6);
    top: -60%;
  }

  @media (min-width: 1024px) and (max-width: 1365px) {
    transform: scale(0.5);
    top: -100%;
  }
`;

const Name = styled.h2`
  color: var(--text-primary);
  font-size: 30px;
  text-transform: capitalize;
  text-align: center;
  margin-top: ${(props) => props.marginTop ?? "30%"};
  word-wrap: break-word;
  white-space: nowrap;
`;

const TypeMarker = styled.div`
  background: ${(props) => props.bg};
  color: white;
  border-radius: ${(props) => (props.rounded ? "50%" : "6px")};
  padding: 8px;
  margin: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-transform: uppercase;
  font-weight: 600;

  img {
    width: ${(props) => props.width ?? "20px"};
    height: ${(props) => props.height ?? "20px"};
  }
`;

const OutlinedBtn = styled.button`
  background: transparent;
  border: 1px solid ${(props) => props.border ?? "white"};
  border-radius: 6px;
  height: 45px;
  color: ${(props) => props.color ?? "white"};
  padding: 0 16px;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.border ?? "white"};
    color: ${(props) => props.color ?? "black"};
  }
`;

const StatsTitle = styled.h2`
  color: var(--text-primary);
  font-size: 20px;
  text-transform: uppercase;
  margin-bottom: 8px;

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const PokeCode = styled.p`
  color: var(--text-secondary);
  font-size: 16px;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const Overlay = styled.div`
  background: var(--overlay-bg);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000000000000;
  width: 100vw;
  max-width: 100vw;
`;

const CloseButton = styled.i`
  position: absolute;
  top: 8px;
  right: 8px;
  color: var(--text-primary);
  cursor: pointer;
`;

const Input = styled.input`
  height: 45px;
  background-color: var(--input-bg);
  border: 1px solid var(--input-border);
  box-sizing: border-box;
  border-radius: 6px;
  padding: 5px 10px;
  width: 100%;
  outline: none;
  font-size: 16px;
  position: relative;

  &:focus {
    border: 1px solid var(--accent-color);
    box-shadow: 0 0 0 3px var(--focus-ring);
  }

  i {
    position: absolute;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
  }
`;

const PageTitle = styled.h1`
  color: var(--text-primary);
  font-size: 40px;
  margin-bottom: 8px;

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`;

export {
  Row,
  Button,
  Column,
  PokeProfile,
  Name,
  Logo,
  TypeMarker,
  StatsTitle,
  PokeCode,
  OutlinedBtn,
  Overlay,
  CloseButton,
  Input,
  PageTitle,
};
