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
