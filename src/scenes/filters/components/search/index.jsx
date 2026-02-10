import { useContext, useEffect, useRef } from "react";
import { Row, Input } from "../../../../components/common";
import { filterContext } from "./../../../../contexts/filterContext";
import { pokeContext } from "../../../../contexts/pokeContext";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";

const Search = () => {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const { filters, setFilters } = useContext(filterContext);
  const { getData } = useContext(pokeContext);
  const nameRef = useRef(null);

  const handleBlur = () => {
    setFilters({ ...filters, name: nameRef?.current?.value });
  };

  const clearSearch = () => {
    if (!filters.name || !filters.habitat) {
      getData();
    }
    setFilters({ ...filters, name: null });
    nameRef.current.value = null;
  };

  useEffect(() => {
    if (!filters.name) {
      nameRef.current.value = null;
    }
  }, [filters.name]);

  return (
    <Row width={desktop ? "50%" : "100%"} gap={"8px"}>
      <Input
        type="text"
        placeholder="Search"
        width={"90%"}
        ref={nameRef}
        onBlur={handleBlur}
      />
    </Row>
  );
};

export default Search;
