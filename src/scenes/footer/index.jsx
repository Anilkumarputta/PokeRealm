import { Row } from "../../components/common";

const Footer = () => {
  return (
    <Row
      width={"100vw"}
      align="center"
      style={{
        background: "rgba(0,0,0,0.1)",
        padding: "16px 0",
        position: "fixed",
        bottom: 0,
        left: 0,
        zIndex: 100,
      }}
    >
      <span style={{ color: "#888" }}>
        &copy; {new Date().getFullYear()} PokéRealm. All rights reserved.
      </span>
    </Row>
  );
};

export default Footer;
    </Row>
