import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { accountContext } from "../contexts/accountContext";

const ProtectedRoute = ({ Component }) => {
  const { accountData } = useContext(accountContext);

  if (accountData.authLoading) {
    return null;
  }

  return accountData.isLogged ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;
