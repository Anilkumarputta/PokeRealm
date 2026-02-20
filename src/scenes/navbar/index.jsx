import { useContext, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Logo, Row } from "../../components/common";
import ExportMenu from "../../components/exportMenu";
import logo from "../../assets/svg/logo.svg";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { accountContext } from "../../contexts/accountContext";
import { themeContext } from "../../contexts/themeContext";
import { pokeContext } from "../../contexts/pokeContext";

const downloadTextFile = (filename, content, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

const escapeCsv = (value) => {
  if (value === null || value === undefined) {
    return "";
  }

  const valueAsString = String(value);
  if (/[",\n]/.test(valueAsString)) {
    return `"${valueAsString.replace(/"/g, '""')}"`;
  }

  return valueAsString;
};

const Navbar = () => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const { accountData, setAccountData, logout } = useContext(accountContext);
  const { pokemons } = useContext(pokeContext);
  const { themeMode } = useContext(themeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const exportDate = new Date().toISOString().slice(0, 10);

  const exportRows = useMemo(() => {
    const source = pokemons?.all?.length > 0 ? pokemons.all : pokemons?.results ?? [];
    const capturedMap = new Map(
      (pokemons?.captured ?? []).map((item) => [item.pokemonName?.toLowerCase(), item])
    );

    return source.map((pokemon) => {
      const captured = capturedMap.get(pokemon.name?.toLowerCase());
      return {
        name: pokemon.name ?? "",
        url: pokemon.url ?? "",
        captured: Boolean(captured),
        capturedBy: captured ? captured.user?.username ?? captured.username ?? "" : "",
        capturedAt: captured?.capturedAt ?? "",
      };
    });
  }, [pokemons?.all, pokemons?.results, pokemons?.captured]);

  const capturedExportRows = useMemo(
    () => exportRows.filter((item) => item.captured),
    [exportRows]
  );

  const exportAsJson = (rows, scope = "collection") => {
    if (rows.length === 0) {
      return;
    }

    const payload = {
      exportedAt: new Date().toISOString(),
      total: rows.length,
      items: rows,
    };

    downloadTextFile(
      `pokerealm-${scope}-${exportDate}.json`,
      JSON.stringify(payload, null, 2),
      "application/json;charset=utf-8"
    );
  };

  const exportAsCsv = (rows, scope = "collection") => {
    if (rows.length === 0) {
      return;
    }

    const headers = ["name", "url", "captured", "capturedBy", "capturedAt"];
    const csvRows = rows.map((item) => headers.map((header) => escapeCsv(item[header])).join(","));
    const csv = [headers.join(","), ...csvRows].join("\n");

    downloadTextFile(
      `pokerealm-${scope}-${exportDate}.csv`,
      csv,
      "text/csv;charset=utf-8"
    );
  };

  const handleHomeNav = (event) => {
    if (location.pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigate("/");
  };

  const handleLogout = () => {
    const didLogout = logout();
    if (didLogout) {
      navigate("/");
    }
  };

  return (
    <Row
      as="header"
      justify="center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background:
          themeMode === "light"
            ? "rgba(236, 244, 255, 0.92)"
            : "rgba(10, 18, 42, 0.88)",
        borderBottom: "1px solid var(--border-subtle)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: "0 3px 14px rgba(0, 0, 0, 0.2)",
      }}
      width="100%"
    >
      <div
        style={{
          width: "min(1160px, 100%)",
          padding: desktop ? "10px 16px" : "8px 10px",
          display: "flex",
          flexDirection: "column",
          gap: desktop ? "8px" : "6px",
        }}
      >
        <Row width="100%" justify="space-between">
          <Link
            to="/"
            onClick={handleHomeNav}
            title="Go to PokeRealm home"
            aria-label="Go to PokeRealm home"
            style={{
              display: "inline-flex",
              alignItems: "center",
              borderRadius: "12px",
              padding: desktop ? "4px 8px" : "2px 6px",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              background:
                themeMode === "light"
                  ? "rgba(255, 255, 255, 0.7)"
                  : "rgba(255, 255, 255, 0.08)",
            }}
          >
            <Logo
              src={logo}
              alt="PokeRealm logo"
              style={{
                height: desktop ? "54px" : "44px",
              }}
            />
          </Link>

          <Row width="auto" gap={desktop ? "8px" : "6px"} justify="flex-end">
            <ExportMenu
              title="Open export options"
              style={{
                minHeight: desktop ? "38px" : "34px",
                padding: desktop ? "0 12px" : "0 10px",
                fontSize: desktop ? "13px" : "12px",
              }}
              items={[
                {
                  key: "collection-csv",
                  label: "Collection CSV",
                  icon: "fa-solid fa-file-csv",
                  disabled: exportRows.length === 0,
                  onClick: () => exportAsCsv(exportRows, "collection"),
                },
                {
                  key: "collection-json",
                  label: "Collection JSON",
                  icon: "fa-solid fa-file-code",
                  disabled: exportRows.length === 0,
                  onClick: () => exportAsJson(exportRows, "collection"),
                },
                {
                  key: "captured-csv",
                  label: "Captured CSV",
                  icon: "fa-solid fa-file-csv",
                  disabled: capturedExportRows.length === 0,
                  onClick: () => exportAsCsv(capturedExportRows, "captured"),
                },
                {
                  key: "captured-json",
                  label: "Captured JSON",
                  icon: "fa-solid fa-file-code",
                  disabled: capturedExportRows.length === 0,
                  onClick: () => exportAsJson(capturedExportRows, "captured"),
                },
              ]}
            />

            {accountData.isLogged ? (
              <Button
                style={{
                  minHeight: desktop ? "38px" : "34px",
                  padding: desktop ? "0 12px" : "0 10px",
                  fontSize: desktop ? "13px" : "12px",
                }}
                onClick={handleLogout}
              >
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </Button>
            ) : (
              <Button
                style={{
                  minHeight: desktop ? "38px" : "34px",
                  padding: desktop ? "0 12px" : "0 10px",
                  fontSize: desktop ? "13px" : "12px",
                }}
                onClick={() => setAccountData((prev) => ({ ...prev, modalOpen: true }))}
              >
                Login
              </Button>
            )}
          </Row>
        </Row>
      </div>
    </Row>
  );
};

export default Navbar;
