import styled from "styled-components";
import colors from "../../../constants/colors";

const LandingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => props.background ?? colors.black};
  width: 100%;
  max-width: 1200px;
  gap: 20px;
  min-height: clamp(380px, 54vh, 560px);
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 14px 36px rgba(2, 7, 20, 0.35);
  padding: 20px;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    min-height: auto;
    border-radius: 12px;
    padding: 16px;
  }
`;

const LeftSide = styled.div`
  order: 1;
  width: 48%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;

  @media screen and (max-width: 768px) {
    width: 100%;
    align-items: flex-start;
  }
`;

const RightSide = styled(LeftSide)`
  order: 2;
  width: 50%;
  position: relative;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;

const FeaturedBadge = styled.span`
  color: white;
  font-size: 11px;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--border-subtle);
  background: linear-gradient(130deg, var(--accent-color) 0%, rgba(14, 32, 72, 0.7) 100%);
`;

const HeroSubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 13px;
  letter-spacing: 0.4px;
  margin: 0;
`;

const PokeImage = styled.img`
  position: relative;
  z-index: 1;
  width: clamp(320px, 40vw, 540px);
  max-width: 100%;
  max-height: 430px;
  object-fit: contain;
  filter: drop-shadow(0 12px 14px rgba(0, 0, 0, 0.28));

  @media screen and (max-width: 768px) {
    width: min(100%, 360px);
    max-height: 340px;
    align-self: center;
  }
`;

const PokeName = styled.h1`
  color: white;
  font-size: clamp(24px, 3.2vw, 36px);
  line-height: 1.05;
  margin: 0;

  @media screen and (max-width: 768px) {
    font-size: 28px;
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
