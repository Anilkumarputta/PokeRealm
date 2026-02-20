import { useContext } from "react";
import { Button, Row } from "../../components/common";
import { pokeContext } from "../../contexts/pokeContext";

const PAGE_SIZE = 12;

const Controls = () => {
  const { pokemons, setPokemons } = useContext(pokeContext);

  const currentOffset = Math.max(
    0,
    pokemons?.offset ?? (pokemons?.previous !== null ? pokemons.previous + PAGE_SIZE : 0)
  );
  const totalPages = Math.max(1, Math.ceil((pokemons?.count ?? 0) / PAGE_SIZE));
  const currentPage = Math.min(totalPages, Math.floor(currentOffset / PAGE_SIZE) + 1);

  const setPage = (nextOffset) => {
    const safeOffset = Math.max(0, nextOffset);

    setPokemons((prev) => {
      const nextResults = (prev.all ?? []).slice(safeOffset, safeOffset + PAGE_SIZE);
      return {
        ...prev,
        offset: safeOffset,
        results: nextResults,
        previous: safeOffset > 0 ? safeOffset - PAGE_SIZE : null,
        next: safeOffset + PAGE_SIZE < prev.count ? safeOffset + PAGE_SIZE : null,
      };
    });
  };

  if (!pokemons || !pokemons.all || (pokemons.count ?? 0) === 0) {
    return null;
  }

  return (
    <Row
      width="100%"
      justify="center"
      style={{
        marginTop: "8px",
        padding: "0 20px 8px",
        boxSizing: "border-box",
      }}
    >
      <Row
        width="min(1200px, 100%)"
        justify="space-between"
        style={{
          background: "var(--surface-panel)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "14px",
          padding: "10px 12px",
        }}
      >
        <Button onClick={() => setPage(currentOffset - PAGE_SIZE)} disabled={currentOffset === 0}>
          <i className="fa fa-arrow-left"></i> Prev
        </Button>

        <span
          style={{
            color: "var(--text-secondary)",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          Page {currentPage} / {totalPages}
        </span>

        <Button
          onClick={() => setPage(currentOffset + PAGE_SIZE)}
          disabled={currentOffset + PAGE_SIZE >= (pokemons.count ?? 0)}
        >
          Next <i className="fa fa-arrow-right"></i>
        </Button>
      </Row>
    </Row>
  );
};

export default Controls;
