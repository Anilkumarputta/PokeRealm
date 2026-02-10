import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  return sessionStorage.getItem("token") ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;
