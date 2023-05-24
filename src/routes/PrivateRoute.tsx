import { ReactNode } from "react";
// import { useNavigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

interface PrivateRouteProp {
  children: ReactNode;
  isLogin: boolean;
}

const PrivateRoute = (props: PrivateRouteProp) => {
  // const navigation = useNavigate();

  const auth = props.isLogin;
  if (!auth) {
    console.log("please login");
  }
  return <>{auth ? props.children : <LoginPage />}</>;
};

export default PrivateRoute;
