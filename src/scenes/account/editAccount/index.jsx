import { useContext, useEffect, useState } from "react";
import {
  Button,
  CloseButton,
  Column,
  Overlay,
} from "../../../components/common";
import { AccountModalStyle } from "../components";
import { accountContext } from "../../../contexts/accountContext";
import InputGroup from "./../../../components/inputGroup/index";
import serverApi from "../../../services/serverApi";
import { toastContext } from "../../../contexts/toastContext";
import Loading from "../../../components/loading";
import { loadingContext } from "../../../contexts/loadingContext";

const EditAccount = () => {
  const { accountData, setAccountData } = useContext(accountContext);
  const { loading, setLoading } = useContext(loadingContext);
  const { setToast } = useContext(toastContext);
  const [newData, setNewData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const closeModal = () => {
    setAccountData((prev) => ({
      ...prev,
      editAccount: false,
    }));
  };

  const updateAccount = async () => {
    try {
      setLoading(true);
      const res = await serverApi.updateAccount(newData);
      if (res.status) {
        setAccountData((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            name: newData.name,
            username: newData.username,
          },
        }));
        setToast({
          open: true,
          title: "Success",
          message: res.message,
          type: "success",
        });
        closeModal();
      } else {
        setToast({
          open: true,
          title: "Error",
          message: res.message,
          type: "error",
        });
      }
    } catch (error) {
      setToast({
        open: true,
        title: "Error",
        message: error.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accountData.editAccount) {
      setNewData({
        name: accountData.user.name,
        username: accountData.user.username,
        password: "",
      });
    }
  }, [accountData.editAccount]);

  if (!accountData.editAccount) return null;

  return (
    <Overlay onClick={closeModal}>
      <AccountModalStyle
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {loading ? (
          <Loading />
        ) : (
          <>
            <CloseButton
              className="fa-solid fa-circle-xmark"
              onClick={closeModal}
            ></CloseButton>
            <h1>Edit Account</h1>

            <form
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Column gap={"16px"} width={"90%"} style={{ marginTop: "32px" }}>
                <InputGroup
                  data={{
                    label: "Name",
                    value: newData.name,
                    onChange: (e) =>
                      setNewData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      })),
                  }}
                />
                <InputGroup
                  data={{
                    label: "Username",
                    value: newData.username,
                    onChange: (e) =>
                      setNewData((prev) => ({
                        ...prev,
                        username: e.target.value,
                      })),
                  }}
                />

                <hr
                  style={{
                    width: "80%",
                  }}
                />

                <InputGroup
                  data={{
                    label: "New Password",
                    value: newData.password,
                    onChange: (e) =>
                      setNewData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      })),
                  }}
                  type="password"
                />
              </Column>
              <Button
                type="button"
                style={{
                  width: "90%",
                  marginTop: "32px",
                }}
                onClick={updateAccount}
              >
                <i className="fa-solid fa-check"></i>
                Save Changes
              </Button>
            </form>
          </>
        )}
      </AccountModalStyle>
    </Overlay>
  );
};

export default EditAccount;
