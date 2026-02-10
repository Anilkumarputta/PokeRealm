import styled from "styled-components";

const ModalContainer = styled.div`
  background: ${(props) => props.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 450px;
  min-height: 350px;
  border-radius: 6px;
  box-shadow: 0 8px 32px 0 rgba(8, 8, 8, 0.37);
  position: relative;
  padding: 16px 8px;
  margin: 0;

  @media screen and (max-width: 768px) {
    width: 90%;
    max-height: 95%;
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
`;

export { ModalContainer, PhysioData };
