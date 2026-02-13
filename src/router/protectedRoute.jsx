import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const { accountData } = useContext(accountContext);

  if (accountData.authLoading) {
    return null;
  }

  return accountData.isLogged ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;
