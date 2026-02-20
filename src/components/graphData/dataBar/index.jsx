import styled from "styled-components";
import { useEffect, useState } from "react";

const BarContainer = styled.div`
  width: 100%;
  height: ${(props) => (props.compact ? "8px" : "10px")};
  background: rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  overflow: hidden;
`;

const Bar = styled.div`
  height: 100%;
  width: ${(props) => props.width};
  border-radius: 999px;
  transition: width 0.5s ease;
  background: ${(props) => props.color};

  @keyframes width {
    from {
      width: 0;
    }
    to {
      width: ${(props) => props.width};
    }
  }
`;

const DataBar = ({ value, compact = false }) => {
  const [data, setData] = useState({
    percentage: 0,
    color: "#bbb",
  });

  useEffect(() => {
    const result = (value / 200) * 100;
    if (result > 60) {
      setData({ percentage: result, color: "linear-gradient(90deg, #2add8b 0%, #7ee96c 100%)" });
    } else if (result > 30) {
      setData({ percentage: result, color: "linear-gradient(90deg, #ffc44d 0%, #ffe57f 100%)" });
    } else {
      setData({ percentage: result, color: "linear-gradient(90deg, #ff5f80 0%, #ff8b54 100%)" });
    }
  }, [value]);

  return (
    <BarContainer compact={compact}>
      <Bar width={`${data.percentage}%`} color={data.color} />
    </BarContainer>
  );
};

export default DataBar;
