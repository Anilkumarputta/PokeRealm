import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: auto;
  position: relative;
  width: min(1200px, 100%);
  padding: 12px 20px;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    padding: 10px 16px;
  }
`;

export { PageContainer };
