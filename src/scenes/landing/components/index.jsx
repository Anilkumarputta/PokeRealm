import styled, { keyframes } from "styled-components";
import colors from "../../../constants/colors";

const drift = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, -10px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`;

const glowDrift = keyframes`
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(6px, -8px, 0) scale(1.03);
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
`;

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
  position: relative;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    width: clamp(300px, 42vw, 680px);
    height: clamp(300px, 42vw, 680px);
    border-radius: 50%;
    background: radial-gradient(circle, var(--accent-soft) 0%, transparent 70%);
    filter: blur(2px);
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    width: clamp(160px, 15vw, 260px);
    height: clamp(160px, 15vw, 260px);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.24) 0%, transparent 72%);
    top: 12%;
    right: 8%;
    filter: blur(4px);
    z-index: 0;
  }

  body[data-motion="standard"] &::before,
  body[data-motion="standard"] &::after {
    animation: ${glowDrift} 10s ease-in-out infinite;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;

const FeaturedBadge = styled.span`
  color: white;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 700;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid var(--border-subtle);
  background: linear-gradient(130deg, var(--accent-color) 0%, rgba(10, 16, 38, 0.8) 100%);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
`;

const HeroSubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 16px;
  letter-spacing: 0.4px;
  margin-top: -8px;
`;

const PokeImage = styled.img`
  position: relative;
  z-index: 1;
  width: clamp(340px, 40vw, 700px);
  max-width: 100%;
  filter: drop-shadow(0 48px 24px rgba(0, 0, 0, 0.35));
  transition: transform var(--motion-slow) ease;

  &:hover {
    transform: translateY(-8px) scale(1.02);
  }

  body[data-motion="standard"] & {
    animation: ${drift} 9s ease-in-out infinite;
  }

  @media screen and (max-width: 768px) {
    width: min(94vw, 600px);
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

export {
  LandingContainer,
  LeftSide,
  RightSide,
  FeaturedBadge,
  HeroSubtitle,
  PokeImage,
  PokeName,
  PokeBall,
};
