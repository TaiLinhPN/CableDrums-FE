import { useState } from "react";
import { useForm } from "react-hook-form";
import { setStateAuth } from "../../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { loginApi } from "../../../api/authApi";
import {
  messageError,
  messageSuccess,
  messageWaning,
} from "../../../utils/notify";
import { useNavigate } from "react-router-dom";
import { setUserReducer } from "../../../redux/slice/useSlice";
import { setAccessToken } from "../../../utils/storage";
import {
  emailValidator,
  passwordValidator,
} from "../../../utils/formValidators/login";

export interface LoginFormProps {
  setOpenLogin: (x: boolean) => void;
}

export interface FormData {
  email: string;
  password: string;
}

const LoginForm = ({ setOpenLogin }: LoginFormProps) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [userLogin, setUserLogin] = useState<any>({
    email: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<FormData>();

  const handleSubmitLogin = async () => {
    try {
      const response = await loginApi(userLogin);
      const { data } = response.data;
      console.log(response.status);

      if (response.status === 200) {
        setAccessToken(data.token.accessToken);
        dispatch(setStateAuth("isLogin"));
        dispatch(setUserReducer(data.user));
        Navigate("/");
        messageSuccess("Login successful, welcome");
      }
    } catch (error: any) {
      // if (error.response.status === 400) {
      //   dispatch(setEmail(userLogin.email));
      //   messageWaning("You must reset password for the first login");
      //   setOpenLogin(false);
      // } else {
      //   console.log("Error login:", error);
      messageError(error);
      // }
    }
  };

  const handleInputChangeLogin = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  if (errors.email?.message) {
    messageWaning(errors.email.message);
    errors.email = undefined;
  }
  if (errors.password?.message) {
    messageWaning(errors.password.message);
    errors.password = undefined;
  }
  return (
    <form className="form-login" onSubmit={handleSubmit(handleSubmitLogin)}>
      <h1 className="head">Log in</h1>
      <div>
        <input
          className={"input-login mb-4 rounded-lg"}
          type="email"
          placeholder="Email"
          {...register("email", { required: true, validate: emailValidator })}
          value={userLogin.email}
          onChange={handleInputChangeLogin}
        />
      </div>
      <div>
        <input
          className={"input-login  mb-4 rounded-lg"}
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
            validate: passwordValidator,
          })}
          value={userLogin.password}
          onChange={handleInputChangeLogin}
        />
      </div>
      <a style={{ marginBottom: "10px" }} onClick={() => setOpenLogin(false)}>
        Forgot password?
      </a>
      <button className="button-login">Log in</button>
    </form>
  );
};

export default LoginForm;
