import { createContext, useState } from "react";

export const modalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  return (
    <modalContext.Provider
      value={{ modal, setModal, data: modalData, setData: setModalData }}
    >
      {children}
    </modalContext.Provider>
  );
};
