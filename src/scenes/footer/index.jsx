import { Row } from "../../components/common";

const Footer = () => {
  return (
    <Row
      style={{
        margin: "30px 0",
      }}
    >
      <p>
        Made with ❤️ by{" "}
        <a
          href="https://beatrizneaime.com"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "#f6f6f6",
            marginRight: "8px",
          }}
        >
          Beatriz Neaime
        </a>
        - 2024
      </p>
    </Row>
  );
};

export default Footer;
