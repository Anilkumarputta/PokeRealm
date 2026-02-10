import { createContext, useEffect, useState } from "react";

export const accountContext = createContext();

export const AccountContextProvider = ({ children }) => {
  const [accountData, setAccountData] = useState({
    modalOpen: false,
    isLogged: false,
    user: {
      id: 0,
      name: null,
      username: null,
      token: null,
      captured: [],
    },
    editAccount: false,
    deleteAccount: false,
  });

  const logout = () => {
    sessionStorage.clear();
    setAccountData({
      user: {
        id: 0,
        name: null,
        username: null,
      },
      editAccount: false,
      deleteAccount: false,
      isLogged: false,
    });
    return true;
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setAccountData((prev) => ({
        ...prev,
        isLogged: true,
        user: {
          id: sessionStorage.getItem("id"),
          name: sessionStorage.getItem("name"),
          username: sessionStorage.getItem("user"),
        },
      }));
    }
  }, []);

  return (
    <accountContext.Provider value={{ accountData, setAccountData, logout }}>
      {children}
    </accountContext.Provider>
  );
};
