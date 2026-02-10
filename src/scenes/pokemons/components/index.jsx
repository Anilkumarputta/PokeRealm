import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  position: relative;
  margin-top: 10%;
  width: 100vw;
  padding: 20px;

  @media screen and (max-width: 768px) {
    margin-top: 20%;
  }
`;

export { PageContainer };
