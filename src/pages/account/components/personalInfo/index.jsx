import { InfoText, InfoTitle } from "..";
import { Column } from "../../../../components/common";

const PersonalInfo = ({ title, value }) => {
  return (
    <Column
      width={"min(100%, 220px)"}
      gap={"8px"}
      align={"flex-start"}
      style={{ overflowWrap: "anywhere" }}
    >
      <InfoTitle>{title}: </InfoTitle>
      <InfoText>{value}</InfoText>
    </Column>
  );
};

export default PersonalInfo;
