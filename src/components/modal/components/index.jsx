import styled from "styled-components";

const ModalContainer = styled.div`
  background: ${(props) => props.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: min(450px, 92vw);
  min-height: 350px;
  max-height: min(92vh, 760px);
  overflow-y: auto;
  border-radius: 6px;
  box-shadow: 0 8px 32px 0 rgba(8, 8, 8, 0.37);
  position: relative;
  padding: 16px 8px;
  margin: 0;

  @media screen and (max-width: 768px) {
    width: 92%;
    max-height: 92vh;
    padding: 14px 8px;
  }
`;

const PhysioData = styled.div`
  display: flex;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  width: 100%;
  gap: 16px;
  align-items: center;
  justify-content: space-evenly;
  padding: 8px;
  margin: 10px 0;
  flex-wrap: wrap;
  row-gap: 12px;
`;

export { ModalContainer, PhysioData };
