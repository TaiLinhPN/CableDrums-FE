import { Form, Input } from "antd";
import { useState } from "react";
import { setEmail, setStateAuth } from "../../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { loginApi } from "../../../api/authApi";
import { socket } from "../../../utils/socket";
import {
  messageError,
  messageSuccess,
  messageWaning,
} from "../../../utils/notify";
import { useNavigate } from "react-router-dom";
import { setUserReducer } from "../../../redux/slice/useSlice";
import { setAccessToken } from "../../../utils/storage";

interface LoginFormProps {
  setOpenLogin: (x: boolean) => void;
}
const LoginForm = ({ setOpenLogin }: LoginFormProps) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [userLogin, setUserLogin] = useState<any>({
    email: "",
    password: "",
  });
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
        socket.emit("user-connect", data.user._id);
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        dispatch(setEmail(userLogin.email));
        messageWaning("You must reset password for the first login");
        setOpenLogin(false);
      } else {
        console.log("Error login:", error);
        messageError(error);
      }
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
  return (
    <Form className="form-login" onFinish={handleSubmitLogin}>
      <h1 className="head">Log in</h1>
      <div>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input
            placeholder="Your email?"
            className={"input-login"}
            name="email"
            value={userLogin.email}
            onChange={handleInputChangeLogin}
          />
        </Form.Item>
      </div>

      <div>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
        >
          <Input.Password
            placeholder="Password?"
            className={"input-login"}
            name="password"
            value={userLogin.password}
            onChange={handleInputChangeLogin}
          />
        </Form.Item>
      </div>
      <a style={{ marginBottom: "10px" }} onClick={() => setOpenLogin(false)}>
        Forgot password?
      </a>
      <button className="button-login">Log in</button>
    </Form>
  );
};

export default LoginForm;
