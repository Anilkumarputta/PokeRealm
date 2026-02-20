import { useContext } from "react";
import { Button, TypeMarker } from "../../../../components/common";
import { filterContext } from "../../../../contexts/filterContext";
import icons from "../../../../constants/icons";
import colors from "../../../../constants/colors";

const SelectedFilter = ({ name, type }) => {
  const { setFilters } = useContext(filterContext);

  const handleRemove = () => {
    setFilters((prev) => ({
      ...prev,
      [type]: "",
    }));
  };

  return (
    <Button
      onClick={handleRemove}
      title={`Remove ${type} filter`}
      style={{
        minHeight: "34px",
        padding: "4px 10px",
        fontSize: "12px",
        borderRadius: "999px",
      }}
    >
      {icons[name.toLowerCase()] && (
        <TypeMarker
          bg={colors.types[name.toLowerCase()]}
          rounded={true}
          width={"10px"}
          height={"10px"}
        >
          <img src={icons[name.toLowerCase()]} alt={type} />
        </TypeMarker>
      )}
      {name}
      <i className="fas fa-times" />
    </Button>
  );
};

export default SelectedFilter;
