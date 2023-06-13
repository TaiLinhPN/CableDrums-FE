import "../assets/css/authStyle.css";
import ResetPasswordForm from "../components/Form/Auth/ResetPasswordForm";
import LoginForm from "../components/Form/Auth/LoginForm";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";

const AuthPage = () => {
  const state = useSelector((state: RootState) => state);
  const [isOpenLogin, setOpenLogin] = useState(true);
  return (
    <div className="login-body">
      {state.auth.stateAuth === "isLogin" && state.user.userId !== "" && (
        <Navigate to="/"></Navigate>
      )}
      <p className="company-name">
        <span>EnergySure tech</span> Energy Corporation
      </p>
      <div className="form-container ">
        {isOpenLogin ? (
          <LoginForm setOpenLogin={setOpenLogin} />
        ) : (
          <ResetPasswordForm setOpenLogin={setOpenLogin} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
