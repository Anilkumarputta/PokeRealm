import { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  CloseButton,
  Column,
  Input,
  Overlay,
  Row,
} from "../../../components/common";
import { AccountModalStyle } from "../components";
import { accountContext } from "../../../contexts/accountContext";
import colors from "../../../constants/colors";
import serverApi from "../../../services/serverApi";
import { loadingContext } from "./../../../contexts/loadingContext";
import { toastContext } from "./../../../contexts/toastContext";
import Loading from "../../../components/loading";
import { Navigate } from "react-router-dom";

const DeleteAccount = () => {
  const { accountData, setAccountData, logout } = useContext(accountContext);
  const { loading, setLoading } = useContext(loadingContext);
  const { setToast } = useContext(toastContext);
  const [form, setForm] = useState("confirm");
  const [redirect, setRedirect] = useState(false);
  const passwordRef = useRef(null);

  const closeModal = () => {
    setAccountData((prev) => ({
      ...prev,
      deleteAccount: false,
    }));
  };

  const deleteAccount = async () => {
    if (!passwordRef.current.value) {
      setToast({
        open: true,
        title: "Error",
        message: "Please enter your password.",
        type: "error",
      });
      return;
    }
    try {
      setLoading(true);
      const res = await serverApi.deleteAccount(passwordRef.current.value);
      if (res) {
        logout();
        setRedirect(true);
        setLoading(false);
      } else {
        setToast({
          open: true,
          title: "Error",
          message: "An error occurred. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setForm("confirm");
  }, [accountData.deleteAccount]);

  if (!accountData.deleteAccount) return null;

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
      {redirect && <Navigate to={"/"} />}
      <AccountModalStyle
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseButton
          className="fa-solid fa-circle-xmark"
          onClick={closeModal}
        ></CloseButton>
        <Column width={"100%"} gap={"16px"}>
          <h1>Delete Account</h1>

          {form === "confirm" ? (
            <>
              <p>
                Are you sure you want to delete your account?
                <br />
                <strong>This action is irreversible.</strong>
              </p>

              <Row
                gap={"16px"}
                style={{
                  marginTop: "8px",
                }}
              >
                <Button
                  style={{
                    width: "100%",
                    backgroundColor: colors.types.fighting,
                  }}
                  onClick={() => setForm("password")}
                >
                  <i className="fa-solid fa-trash"></i> Delete Account
                </Button>
                <Button style={{ width: "100%" }} onClick={closeModal}>
                  <i className="fa-solid fa-circle-xmark"></i> Cancel
                </Button>
              </Row>
            </>
          ) : (
            <>
              <p>
                Please enter your password to confirm the deletion of your
                account.
              </p>

              <Input type="password" ref={passwordRef} />

              <Button onClick={deleteAccount}>
                <i className="fa-solid fa-trash"></i> Confirm Deletion
              </Button>
            </>
          )}
        </Column>
      </AccountModalStyle>
    </Overlay>
  );
};

export default DeleteAccount;
