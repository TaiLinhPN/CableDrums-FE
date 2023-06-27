import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import MainLayout from "../layout/MainLayout";
import MainPage from "../pages/MainPage";
import AuthPage from "../pages/AuthPage";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import NotFoundPage from "../pages/NotFoundPage";
import AccountPage from "../pages/AccountPage";
import ContractPage from "../pages/ContractPage";
import OrderPage from "../pages/OrderPage";

const RouterApp = () => {
  const { userType } = useSelector((state: RootState) => state.user);

  return (
    <Routes>
      <Route path="/">
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="" element={<MainPage />}>
              <Route path="/" element={<Navigate to="/request" />} />
              {userType === "admin" && (
                <Route path="/account" element={<AccountPage />} />
              )}
              {(userType === "admin" ||
                userType === "planner" ||
                userType === "supplyVendor") && (
                <Route path="/contract" element={<ContractPage />} />
              )}
              {(userType === "admin" ||
                userType === "planner" ||
                userType === "supplyVendor" ||
                userType === "projectContractor") && (
                <Route path="/request" element={<OrderPage />} />
              )}
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="/login" element={<AuthPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RouterApp;
