import { useContext, useState } from "react";
import types from "../../../../../constants/types";
import icons from "../../../../../constants/icons";
import {
  DropdownBtn,
  DropdownContainer,
  DropdownItem,
  DropdownList,
} from "../common.jsx";
import { filterContext } from "../../../../../contexts/filterContext.jsx";

const TypesDropdown = ({ name }) => {
  const { setFilters } = useContext(filterContext);
  const [active, setActive] = useState(false);

  const handleCheck = (type) => {
    setFilters((prev) => ({
      ...prev,
      type: type.name,
    }));

    setActive(false);
  };

  return (
    <DropdownContainer>
      <DropdownBtn
        onClick={() => {
          setActive(!active);
        }}
      >
        {name}
        <span>
          <i className={`fas fa-chevron-${active ? "up" : "down"}`} />
        </span>
      </DropdownBtn>
      <DropdownList className={active ? "active" : ""}>
        {active &&
          Object.keys(types).map((type, index) => (
            <DropdownItem
              key={index}
              value={type.name}
              bg={types[type].color}
              onClick={() => {
                handleCheck(types[type]);
              }}
            >
              <img src={icons[type]} alt={type} />
              {types[type].name}
            </DropdownItem>
          ))}
      </DropdownList>
    </DropdownContainer>
  );
};

export default TypesDropdown;
