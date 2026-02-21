import { useEffect, useRef, useState } from "react";
import { Button } from "../common";

const ExportMenu = ({ items = [], label = "Export", title = "Open export options", style = {} }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleItemClick = (item) => {
    if (item.disabled || typeof item.onClick !== "function") {
      return;
    }

    item.onClick();
    setOpen(false);
  };

  return (
    <div ref={menuRef} style={{ position: "relative" }}>
      <Button
        onClick={() => setOpen((prev) => !prev)}
        style={{
          minHeight: "34px",
          padding: "0 10px",
          fontSize: "12px",
          borderRadius: "10px",
          ...style,
        }}
        title={title}
      >
        <i className="fa-solid fa-download"></i> {label}{" "}
        <i className={`fa-solid fa-chevron-${open ? "up" : "down"}`}></i>
      </Button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            minWidth: "min(180px, calc(100vw - 24px))",
            maxWidth: "min(220px, calc(100vw - 24px))",
            background: "var(--surface-panel)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "12px",
            boxShadow: "0 12px 22px rgba(0, 0, 0, 0.28)",
            padding: "6px",
            zIndex: 30,
          }}
        >
          {items.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => handleItemClick(item)}
              disabled={Boolean(item.disabled)}
              style={{
                width: "100%",
                textAlign: "left",
                border: "none",
                background: "transparent",
                color: "var(--text-primary)",
                padding: "8px 10px",
                borderRadius: "8px",
                cursor: item.disabled ? "not-allowed" : "pointer",
                opacity: item.disabled ? 0.5 : 1,
              }}
            >
              {item.icon && <i className={item.icon}></i>} {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExportMenu;
