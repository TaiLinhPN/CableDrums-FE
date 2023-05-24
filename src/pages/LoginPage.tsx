import "../assets/css/authStyle.css";
import LoginForm from "../containers/LoginFormContainer";

const LoginPage = () => {
  return (
    <div className="login-body">
      <p className="company-name">
        <span>EnergySure tech</span> Energy Corporation
      </p>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
