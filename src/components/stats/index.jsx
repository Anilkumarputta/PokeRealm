import styled from "styled-components";
import { Column } from "../common";

const StatsName = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const StatsValue = styled.h2`
  font-size: 24px;
  color: white;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const Stats = ({ name, icon, value, unit }) => {
  const val = parseFloat(value) / 10;

  return (
    <Column>
      <StatsValue>
        {unit === "m" ? val : value} {unit}
      </StatsValue>
      <StatsName>
        <i className={`fa-solid fa-${icon}`}></i>
        {name}
      </StatsName>
    </Column>
  );
};

export default Stats;
