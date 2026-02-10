import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home";
import ProtectedRoute from "./protectedRoute";
import AccountPage from './../pages/account/index';

const PokeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/account" element={<ProtectedRoute Component={AccountPage} />} />
    </Routes>
  );
};

export default PokeRoutes;
