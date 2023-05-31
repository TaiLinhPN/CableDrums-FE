import { useSelector } from "react-redux";
import "../assets/css/authStyle.css";
import ResetPasswordForm from "../components/Auth/ResetPasswordForm";
import { RootState } from "../redux/store";
import LoginForm from "../components/Auth/LoginForm";

const AuthPage = () => {
  const stateAuth = useSelector((state:RootState) => state.auth.stateAuth);
  return (
    <div className="login-body">
      <p className="company-name">
        <span>EnergySure tech</span> Energy Corporation
      </p>
      {stateAuth=== "isLogout"? <LoginForm /> : <ResetPasswordForm/>}
      
    </div>
  );
};

export default AuthPage;
