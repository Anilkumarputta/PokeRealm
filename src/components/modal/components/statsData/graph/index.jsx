import styled from "styled-components";
import colors from "../../../../../constants/colors";
import { useEffect, useState } from "react";

const BarContainer = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${colors.black};
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  padding: 2px;
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

const Graph = ({ value }) => {
  const [data, setData] = useState({
    percentage: null,
    color: null,
  });

  const calculatePercentage = () => {
    const result = (value / 200) * 100;
    if (result > 50) {
      setData((prev) => ({
        ...prev,
        color: "#00ff00",
      }));
    } else if (result > 30) {
      setData((prev) => ({
        ...prev,
        color: "#fffa50",
      }));
    } else {
      setData((prev) => ({
        ...prev,
        color: "#ff0000",
      }));
    }

    setData((prev) => ({
      ...prev,
      percentage: result,
    }));
  };

  useEffect(() => {
    calculatePercentage();
  }, []);

  return (
    <BarContainer>
      <Bar width={`${data.percentage}%`} color={data.color} />
    </BarContainer>
  );
};

export default Graph;
