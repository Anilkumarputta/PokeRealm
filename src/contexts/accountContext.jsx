import { createContext, useEffect, useState } from "react";
import serverApi from "../services/serverApi";

export const accountContext = createContext();

const emptyUser = {
  id: 0,
  name: null,
  username: null,
  token: null,
  captured: [],
};

const persistSession = (user) => {
  if (!user?.token) {
    sessionStorage.clear();
    return;
  }

  sessionStorage.setItem("token", user.token);
  sessionStorage.setItem("user", user.username);
  sessionStorage.setItem("id", user.id);
  sessionStorage.setItem("name", user.name);
};

const getSessionUser = () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return null;
  }

  return {
    id: sessionStorage.getItem("id"),
    name: sessionStorage.getItem("name"),
    username: sessionStorage.getItem("user"),
    token,
  };
};

export const AccountContextProvider = ({ children }) => {
  const [accountData, setAccountData] = useState({
    modalOpen: false,
    isLogged: false,
    user: emptyUser,
    editAccount: false,
    deleteAccount: false,
    authLoading: true,
  });

  const syncUserState = (user) => {
    setAccountData((prev) => ({
      ...prev,
      isLogged: Boolean(user?.token),
      user: user
        ? {
            id: user.id,
            name: user.name,
            username: user.username,
            token: user.token,
          }
        : emptyUser,
    }));
  };

  const login = async (credentials) => {
    const res = await serverApi.loginUser(credentials);
    if (res?.status && res?.data) {
      persistSession(res.data);
      syncUserState(res.data);
      window.dispatchEvent(new Event("auth-changed"));
    }

    return res;
  };

  const register = async (data) => {
    const res = await serverApi.registerUser(data);
    if (res?.status && res?.data) {
      persistSession(res.data);
      syncUserState(res.data);
      window.dispatchEvent(new Event("auth-changed"));
    }

    return res;
  };

  const logout = () => {
    sessionStorage.clear();
    window.dispatchEvent(new Event("auth-changed"));
    setAccountData((prev) => ({
      ...prev,
      user: emptyUser,
      editAccount: false,
      deleteAccount: false,
      isLogged: false,
      modalOpen: false,
    }));
    return true;
  };

  useEffect(() => {
    const hydrateSession = () => {
      const user = getSessionUser();
      syncUserState(user);
      setAccountData((prev) => ({ ...prev, authLoading: false }));
    };

    hydrateSession();
    window.addEventListener("auth-changed", hydrateSession);
    return () => window.removeEventListener("auth-changed", hydrateSession);
  }, []);

  return (
    <accountContext.Provider
      value={{ accountData, setAccountData, login, register, logout }}
    >
      {children}
    </accountContext.Provider>
  );
};
