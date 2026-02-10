import { createContext, useState } from "react";

export const filterContext = createContext();

export const FilterContextProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    type: null,
    habitat: null,
    name: null,
  });

  return (
    <filterContext.Provider value={{ filters, setFilters }}>
      {children}
    </filterContext.Provider>
  );
};
