import { useContext } from "react";
import { Button, Row } from "../../components/common";
import { pokeContext } from "../../contexts/pokeContext";

const Controls = () => {
  const { pokemons, setPokemons } = useContext(pokeContext);



    const handlePrev = () => {
      setPokemons((prev) => ({
        ...prev,
        offset: prev.offset - 10,
      }));
      getData();
    };

    const handleNext = () => {
      setPokemons((prev) => ({
        ...prev,
        offset: prev.offset + 10,
      }));
      getData();
    };
  if (!pokemons) {
    return null;
  }

  return (
    <Row
      width={"100vw"}
      align="space-between"
      style={{
        marginTop: "32px",
      }}
    >
      <Button onClick={getPreviousPokemons} disabled={!pokemons.previous}>
        <Button
          onClick={handlePrev}
          disabled={pokemons.offset === 0}
          style={{ minWidth: 100 }}
        >
          <i className="fa fa-arrow-left"></i> Prev
        </Button>
        <Button
          onClick={handleNext}
          disabled={pokemons.offset + 10 >= pokemons.count}
          style={{ minWidth: 100 }}
        >
          Next <i className="fa fa-arrow-right"></i>
        </Button>
  );
};

export default Controls;
