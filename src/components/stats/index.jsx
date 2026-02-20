import styled from "styled-components";
import { Column } from "../common";

const StatsName = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media screen and (max-width: 768px) {
    font-size: 11px;
  }
`;

const StatsValue = styled.h2`
  font-size: 16px;
  color: var(--text-primary);
  font-weight: 700;
  margin: 0;

  @media screen and (max-width: 768px) {
    font-size: 14px;
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
