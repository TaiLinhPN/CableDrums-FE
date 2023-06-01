import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import MainLayout from "../layout/MainLayout";
import MainPage from "../pages/MainPage";

const RouterApp = () => {
  return (
    <Routes>
      <Route path="/">
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="" element={<MainPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default RouterApp;
