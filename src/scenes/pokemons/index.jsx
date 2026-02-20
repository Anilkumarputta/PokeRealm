import { useContext } from "react";
import PokeCard from "../../components/card";
import Loading from "../../components/loading";
import { Column, Row, StatsTitle } from "../../components/common";
import { loadingContext } from "../../contexts/loadingContext";
import { pokeContext } from "../../contexts/pokeContext";
import { PageContainer } from "./components";

const Pokemons = () => {
  const { pokemons } = useContext(pokeContext);
  const { loading } = useContext(loadingContext);
  const total = pokemons?.count ?? 0;
  const visibleCount = pokemons?.results?.length ?? 0;

  return (
    <PageContainer>
      <Column
        id="collection"
        width="100%"
        gap="12px"
        style={{
          background: "var(--surface-panel)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "18px",
          padding: "14px",
          boxShadow: "0 14px 30px rgba(2, 8, 24, 0.28)",
          scrollMarginTop: "calc(var(--navbar-height) + 10px)",
        }}
      >
        <Row
          width="100%"
          justify="space-between"
          gap="8px"
          style={{
            flexWrap: "wrap",
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
            paddingBottom: "10px",
          }}
        >
          <Column width="auto" align="flex-start" gap="2px">
            <StatsTitle style={{ marginBottom: 0 }}>
              <i className="fa-solid fa-dragon"></i> Project Collection
            </StatsTitle>
            <span style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
              Showing {visibleCount} of {total} Pokemons
            </span>
          </Column>

          <Row width="auto" gap="8px" justify="flex-end">
            <span
              style={{
                border: "1px solid rgba(255, 255, 255, 0.2)",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "999px",
                padding: "5px 10px",
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              Live Collection
            </span>
          </Row>
        </Row>

        <Row
          width="100%"
          gap="16px"
          style={{
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: "1080px",
            margin: "0 auto",
            minHeight: "220px",
            paddingTop: "4px",
          }}
        >
          {loading ? (
            <Loading />
          ) : pokemons?.results?.length > 0 ? (
            pokemons.results.map((pokemon) => <PokeCard key={pokemon.name} data={pokemon} />)
          ) : (
            <StatsTitle>No Pokemons found.</StatsTitle>
          )}
        </Row>
      </Column>
    </PageContainer>
  );
};

export default Pokemons;
