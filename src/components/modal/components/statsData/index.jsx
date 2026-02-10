import { Row } from "../../../common";
import Graph from "./graph";

const StatsData = ({ icon, value, name }) => {
  return (
    <Row
      gap={"8px"}
      width={"90%"}
      justify={"flex-start"}
      style={{
        margin: "8px 0",
      }}
    >
      <i className={`fa-solid fa-${icon}`}></i>
      <p
        style={{
          color: "white",
          fontWeight: "500",
        }}
      >
        {value}
      </p>
      <Graph value={value} />
    </Row>
  );
};

export default StatsData;
