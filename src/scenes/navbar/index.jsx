import { Button, Logo, Row } from "../../components/common";
import logo from "../../assets/svg/logo.svg";
import colors from "../../constants/colors";
import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { accountContext } from "../../contexts/accountContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const { accountData, setAccountData } = useContext(accountContext);
  const [logoSize, setLogoSize] = useState(desktop ? "80px" : "60px");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setLogoSize(desktop ? "50px" : "45px");
      } else {
        setLogoSize(desktop ? "80px" : "60px");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Row
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999999,
        backgroundColor: colors.black,
        padding: "16px 0",
      }}
      width={"100vw"}
    >
      <Link to="/">
        <Logo
          src={logo}
          style={{
            height: logoSize,
            transition: "height 0.5s",
          }}
        />
      </Link>

      {accountData.isLogged ? (
        <Link to="/account" style={{ position: "absolute", right: "5%" }}>
          <Button
            style={{
              borderRadius: "50%",
            }}
          >
            <i class="fa-solid fa-user"></i>
          </Button>
        </Link>
      ) : (
        <Button
          style={{
            position: "absolute",
            right: "5%",
          }}
          onClick={() =>
            setAccountData((prev) => ({ ...prev, modalOpen: true }))
          }
        >
          Login
        </Button>
      )}
    </Row>
  );
};

export default Navbar;
