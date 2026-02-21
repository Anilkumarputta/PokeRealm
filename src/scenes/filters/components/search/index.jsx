import { useContext, useEffect, useRef } from "react";
import { Row, Input } from "../../../../components/common";
import { filterContext } from "./../../../../contexts/filterContext";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";

const Search = () => {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const { filters, setFilters } = useContext(filterContext);
  const nameRef = useRef(null);

  const handleChange = () => {
    setFilters({ ...filters, name: nameRef?.current?.value?.trim().toLowerCase() });
  };

  useEffect(() => {
    if (!filters.name) {
      nameRef.current.value = "";
    }
  }, [filters.name]);

  return (
    <Row
      width={desktop ? "auto" : "100%"}
      gap={"8px"}
      style={{
        flex: desktop ? 1 : "initial",
      }}
    >
      <Input
        type="text"
        placeholder="Search by name"
        width={"100%"}
        ref={nameRef}
        onChange={handleChange}
      />
    </Row>
  );
};

export default Search;
