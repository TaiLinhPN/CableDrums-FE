import { useSelector } from "react-redux";
import AuthPage from "../pages/AuthPage";
import { Outlet } from "react-router-dom";
import { RootState } from "../redux/store";
import { socket } from "../utils/socket";

const PrivateRoute = () => {
  const stateAuth = useSelector((state: RootState) => state.auth.stateAuth);
  const userId = useSelector((state: RootState) => state.user.userId);

  if (stateAuth === "isLogin") {
    socket.emit("user-connect", userId);
    return <Outlet />;
  } else {
    return <AuthPage />;
  }
};

export default PrivateRoute;
