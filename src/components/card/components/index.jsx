import styled from "styled-components";

const Card = styled.div`
  background:
    linear-gradient(150deg, rgba(255, 255, 255, 0.08) 0%, rgba(5, 10, 24, 0.18) 100%),
    ${(props) => props.$bg ?? "var(--surface-card)"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 312px;
  min-height: 372px;
  height: auto;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  margin: 0;
  padding: 16px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.28);
  transition: transform var(--motion-base) ease,
    box-shadow var(--motion-base) ease,
    border-color var(--motion-fast) ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #56b4ff 0%, #7b5cff 50%, #f95587 100%);
    opacity: 0.92;
  }

  &::after {
    content: "";
    position: absolute;
    left: -20%;
    right: -20%;
    bottom: -40%;
    height: 44%;
    pointer-events: none;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
    opacity: 0.22;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 30px rgba(0, 0, 0, 0.34);
    border-color: rgba(255, 255, 255, 0.28);
  }

  .poke-artwork {
    position: relative;
    z-index: 1;
    transition: transform var(--motion-base) ease;
  }

  &:hover .poke-artwork {
    transform: scale(1.04);
  }

  &:focus-visible {
    outline: 3px solid var(--focus-ring);
    outline-offset: 3px;
  }

  @media screen and (max-width: 1200px) {
    width: calc(33.333% - 12px);
    min-width: 260px;
  }

  @media screen and (max-width: 900px) {
    width: calc(50% - 10px);
    min-width: 0;
  }

  @media screen and (max-width: 560px) {
    width: 100%;
    height: auto;
  }
`;

export { Card };
