import { useSelector } from "react-redux";
import AuthPage from "../pages/AuthPage";
import { Outlet } from "react-router-dom";
import { RootState } from "../redux/store";



const PrivateRoute = () => {
  const stateAuth = useSelector((state: RootState) => state.auth.stateAuth);

  if (stateAuth === "isLogin") {
    return <Outlet />;
  } else {
    return <AuthPage />;
  }
};

export default PrivateRoute;
