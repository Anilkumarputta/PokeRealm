import styled from "styled-components";
import colors from "../../constants/colors";

const Logo = styled.img`
  height: 52px;
  width: auto;
  max-width: 100%;
  display: block;
  filter: drop-shadow(0 6px 8px rgba(0, 0, 0, 0.22));

  @media screen and (max-width: 768px) {
    height: 42px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${(props) => props.align ?? "center"};
  justify-content: ${(props) => props.justify ?? "center"};
  gap: ${(props) => props.gap ?? "0"};
  width: ${(props) => props.width ?? "100%"};
`;

const Column = styled(Row)`
  flex-direction: column;
  width: ${(props) => props.width ?? "auto"};
`;

const Button = styled.button`
  background: linear-gradient(
    135deg,
    var(--accent-color, ${colors.accent.violet}) 0%,
    ${colors.blue[600]} 100%
  );
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: var(--button-text);
  padding: 8px 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  position: relative;
  gap: 8px;
  font-weight: 600;
  letter-spacing: 0.2px;
  transition: transform var(--motion-fast) ease, box-shadow var(--motion-fast) ease;
  box-shadow: 0 6px 16px rgba(28, 72, 150, 0.35);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(28, 72, 150, 0.42);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 3px solid var(--focus-ring);
    outline-offset: 2px;
  }

  &:disabled {
    background: ${colors.gray[400]};
    border-color: transparent;
    box-shadow: none;
    cursor: not-allowed;
  }
`;

const Name = styled.h2`
  color: var(--text-primary);
  font-size: 22px;
  line-height: 1.2;
  text-transform: capitalize;
  text-align: center;
  margin-top: ${(props) => props.marginTop ?? "0"};
  word-wrap: break-word;
  white-space: normal;
`;

const TypeMarker = styled.div`
  background: ${(props) => props.bg};
  color: white;
  border-radius: ${(props) => (props.rounded ? "999px" : "10px")};
  padding: 6px 8px;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;

  img {
    width: ${(props) => props.width ?? "16px"};
    height: ${(props) => props.height ?? "16px"};
  }
`;

const OutlinedBtn = styled.button`
  background: transparent;
  border: 1px solid ${(props) => props.border ?? "var(--border-subtle)"};
  border-radius: 12px;
  height: 40px;
  color: ${(props) => props.color ?? "var(--text-primary)"};
  padding: 0 14px;
  cursor: pointer;
  font-weight: 600;
  transition: all var(--motion-fast) ease;

  &:hover {
    background: var(--surface-elevated);
  }
`;

const StatsTitle = styled.h2`
  color: var(--text-primary);
  font-size: 18px;
  text-transform: none;
  font-weight: 700;
  letter-spacing: 0.2px;
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
  height: 42px;
  background-color: var(--input-bg);
  border: 1px solid var(--input-border);
  box-sizing: border-box;
  border-radius: 12px;
  padding: 6px 12px;
  width: 100%;
  outline: none;
  font-size: 15px;
  color: var(--text-primary);
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
  font-size: 34px;
  margin-bottom: 8px;

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`;





export {
  Row,
  Button,
  Column,
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
