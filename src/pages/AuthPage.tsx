import "../assets/css/authStyle.css";
import ResetPasswordForm from "../components/Auth/ResetPasswordForm";
import LoginForm from "../components/Auth/LoginForm";
import { useState } from "react";

const AuthPage = () => {
  const [isOpenLogin, setOpenLogin] = useState(true)
  return (
    <div className="login-body">
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
