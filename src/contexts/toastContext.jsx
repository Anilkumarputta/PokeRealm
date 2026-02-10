import { createContext, useState } from "react";

export const toastContext = createContext();

export const ToastContextProvider = ({ children }) => {
  const [toast, setToast] = useState({
    open: false,
    title: "Teste",
    message: "teste",
    type: "info",
  });

  return (
    <toastContext.Provider value={{ toast, setToast }}>
      {children}
    </toastContext.Provider>
  );
};
