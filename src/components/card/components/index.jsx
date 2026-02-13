import styled from "styled-components";

const Card = styled.div`
  background: ${(props) => props.$bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 380px;
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  position: relative;
  cursor: pointer;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25);
  transition: transform var(--motion-base) ease,
    box-shadow var(--motion-base) ease,
    border-color var(--motion-fast) ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 30px rgba(0, 0, 0, 0.35);
    border-color: var(--accent-soft);
  }

  &:focus-visible {
    outline: 3px solid var(--focus-ring);
    outline-offset: 3px;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
    height: auto;
  }
`;

export { Card };
import styled from "styled-components";

const Card = styled.div`
  background: ${(props) => props.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 380px;
  border: 1px solid black;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  position: relative;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    width: 90%;
    height: auto;
  }
`;

export { Card };
