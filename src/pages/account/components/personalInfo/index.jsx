import { InfoText, InfoTitle } from "..";
import { Column } from "../../../../components/common";

const PersonalInfo = ({ title, value }) => {
  return (
    <Column width={"max-content"} gap={"8px"} align={"flex-start"}>
      <InfoTitle>{title}: </InfoTitle>
      <InfoText>{value}</InfoText>
    </Column>
  );
};

export default PersonalInfo;
