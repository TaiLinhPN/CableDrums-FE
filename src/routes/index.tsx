import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import MainLayout from "../layout/MainLayout";
import MainPage from "../pages/MainPage";
import AuthPage from "../pages/AuthPage";
import OrderTable from "../components/Table/OrderTable";
import ContractTable from "../components/Table/ContractTable";
import AccountTable from "../components/Table/AccountTable";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import NotFoundPage from "../pages/NotFoundPage";
import WelcomePage from "../pages/WelcomePage";

const RouterApp = () => {
  const { userType } = useSelector((state: RootState) => state.user);

  return (
    <Routes>
      <Route path="/">
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="" element={<MainPage />}>
              <Route path="/" element={<WelcomePage />} />
              {userType === "admin" && (
                <>
                  <Route path="/order" element={<OrderTable />} />
                  <Route path="/contract" element={<ContractTable />} />
                  <Route path="/account" element={<AccountTable />} />
                </>
              )}
              {(userType === "planner" || userType === "supplyVendor") && (
                <>
                  <Route path="/order" element={<OrderTable />} />
                  <Route path="/contract" element={<ContractTable />} />
                </>
              )}
              {userType === "projectContractor" && (
                <Route path="/order" element={<OrderTable />} />
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
