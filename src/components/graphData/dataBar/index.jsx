import styled from "styled-components";
import { useEffect, useState } from "react";

const BarContainer = styled.div`
  width: 100%;
  height: 16px;
  background: #eee;
  border-radius: 10px;
  overflow: hidden;
`;

const Bar = styled.div`
  height: 100%;
  width: ${(props) => props.width};
  border-radius: 10px;
  transition: width 0.5s ease;
  background-color: ${(props) => props.color};

  @keyframes width {
    from {
      width: 0;
    }
    to {
      width: ${(props) => props.width};
    }
  }
`;

const DataBar = ({ value }) => {
  const [data, setData] = useState({
    percentage: 0,
    color: "#bbb",
  });

  useEffect(() => {
    const result = (value / 200) * 100;
    if (result > 60) {
      setData({ percentage: result, color: "#00ff00" });
    } else if (result > 30) {
      setData({ percentage: result, color: "#fffa50" });
    } else {
      setData({ percentage: result, color: "#ff0000" });
    }
  }, [value]);

  return (
    <BarContainer>
      <Bar width={`${data.percentage}%`} color={data.color} />
    </BarContainer>
  );
};

export default DataBar;
