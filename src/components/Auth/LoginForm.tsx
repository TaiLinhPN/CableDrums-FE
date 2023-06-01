import { Form, Input } from "antd";
import { useState } from "react";
import { login, setStateAuth } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [userLogin, setUserLogin] = useState<any>({
    email: "",
    password: "",
  });
  const handleSubmitLogin = () => {
    login(userLogin)(dispatch);
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
      <a
        style={{ marginBottom: "10px" }}
        onClick={() => dispatch(setStateAuth("isResetPassword"))}
      >
        Forgot password?
      </a>
      <button className="button-login">Log in</button>
    </Form>
  );
};

export default LoginForm;
