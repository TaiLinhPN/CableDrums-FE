import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import MainLayout from "../layout/MainLayout";
import AccountTable from "../pages/MainPage";

const RouterApp = () => {
  return (
    <div>
      <Routes>
        <Route path="/">
          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              <Route path="" element={<AccountTable />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default RouterApp;
