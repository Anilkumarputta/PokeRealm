import { Row } from "../common";
import DataBar from "./dataBar";

const GraphData = ({ icon, value, compact = false }) => {
  return (
    <Row
      gap={compact ? "6px" : "8px"}
      width={"100%"}
      justify={"flex-start"}
      style={{
        margin: compact ? "2px 0" : "4px 0",
        color: "var(--text-secondary)",
        fontSize: compact ? "12px" : "14px",
      }}
    >
      <i className={`fa-solid fa-${icon}`}></i>
      <p>{value}</p>

      <DataBar value={value} compact={compact} />
    </Row>
  );
};

export default GraphData;
