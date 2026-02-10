import { useContext, useState } from "react";
import {
  Button,
  CloseButton,
  Column,
  Overlay,
  StatsTitle,
} from "../../components/common";
import { accountContext } from "../../contexts/accountContext";
import { AccountModalStyle } from "./components";
import InputGroup from "../../components/inputGroup";
import serverApi from "../../services/serverApi";
import { loadingContext } from "./../../contexts/loadingContext";
import Loading from "../../components/loading";
import { toastContext } from "../../contexts/toastContext";

const Account = () => {
  const { accountData, setAccountData } = useContext(accountContext);
  const { loading, setLoading } = useContext(loadingContext);
  const { setToast } = useContext(toastContext);
  const [form, setForm] = useState("sign-in");
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [signUpData, setSignUpData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const closeModal = () => {
    setAccountData((prev) => ({
      ...prev,
      modalOpen: false,
    }));
  };

  const setContextData = (res) => {
    setAccountData((prev) => ({
      ...prev,
      modalOpen: false,
      isLogged: true,
      user: {
        id: res.id,
        name: res.name,
        username: res.username,
        token: res.token,
      },
    }));
  };

  const signUp = async () => {
    setLoading(true);
    const res = await serverApi.registerUser(signUpData);
    if (res.status) {
      setToast({
        open: true,
        title: "Success!",
        message: "User successfully registered!",
        type: "success",
      });
      setContextData(res.data);
    } else {
      setToast({
        open: true,
        title: "Error!",
        message: res.message,
        type: "error",
      });
    }
    setLoading(false);
  };

  const signIn = async () => {
    setLoading(true);
    const res = await serverApi.loginUser(loginData);
    if (res.status) {
      setToast({
        open: true,
        title: "Success!",
        message: "User successfully logged in!",
        type: "success",
      });
      setContextData(res.data);
    } else {
      setToast({
        open: true,
        title: "Error!",
        message: res.message,
        type: "error",
      });
    }
    setLoading(false);
  };

  if (!accountData.modalOpen) {
    return null;
  }

  if (loading) {
    return (
      <Overlay>
        <AccountModalStyle>
          <Loading />
        </AccountModalStyle>
      </Overlay>
    );
  }

  return (
    <Overlay onClick={closeModal}>
      <AccountModalStyle onClick={(e) => e.stopPropagation()}>
        <CloseButton
          className="fa-solid fa-circle-xmark"
          onClick={closeModal}
        ></CloseButton>
        <h1>Account</h1>

        {form === "sign-in" && (
          <Column gap={"16px"} width={"90%"} style={{ marginTop: "32px" }}>
            <StatsTitle style={{ alignSelf: "flex-start" }}>
              <i className="fa-solid fa-user"></i> Sign-in
            </StatsTitle>

            <InputGroup
              data={{
                label: "Username",
                placeholder: "Ash123",
                value: loginData.username,
                onChange: (e) =>
                  setLoginData((prev) => ({
                    ...prev,
                    username: e.target.value,
                  })),
              }}
            />
            <InputGroup
              data={{
                label: "Password",
                placeholder: "********",
                value: loginData.password,
                onChange: (e) =>
                  setLoginData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  })),
                type: "password",
              }}
            />
            <Button style={{ width: "100%" }} onClick={signIn}>
              <i className="fa-solid fa-sign-in"></i> Sign-in
            </Button>

            <p>
              Don't have an account?{" "}
              <span
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
                onClick={() => setForm("sign-up")}
              >
                Sign-up
              </span>
            </p>
          </Column>
        )}

        {form === "sign-up" && (
          <Column gap={"16px"} width={"90%"} style={{ marginTop: "32px" }}>
            <StatsTitle style={{ alignSelf: "flex-start" }}>
              <i className="fa-solid fa-user"></i> Sign-up
            </StatsTitle>

            <InputGroup
              data={{
                label: "Name",
                placeholder: "Ash123",
                value: signUpData.name,
                onChange: (e) =>
                  setSignUpData((prev) => ({ ...prev, name: e.target.value })),
              }}
            />
            <InputGroup
              data={{
                label: "Username",
                placeholder: "Ash123",
                value: signUpData.username,
                onChange: (e) =>
                  setSignUpData((prev) => ({
                    ...prev,
                    username: e.target.value,
                  })),
              }}
            />
            <InputGroup
              data={{
                label: "Password",
                placeholder: "********",
                value: signUpData.password,
                type: "password",
                onChange: (e) =>
                  setSignUpData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  })),
              }}
            />
            <Button style={{ width: "100%" }} onClick={signUp}>
              <i className="fa-solid fa-sign-in"></i> Sign-up
            </Button>

            <p>
              Already have an account?{" "}
              <span
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
                onClick={() => setForm("sign-in")}
              >
                Sign-in
              </span>
            </p>
          </Column>
        )}
      </AccountModalStyle>
    </Overlay>
  );
};

export default Account;
