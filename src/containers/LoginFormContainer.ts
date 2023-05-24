import { connect } from "react-redux";
// import { RootState } from "../redux/store";
import LoginForm from "../layout/Auth/LoginForm";
import { login } from "../redux/slice/authSlice";
const mapActionToLogin = {
 login
};
const mapStateToProps = (
    // state: RootState
) => {
  return {
    // isSignUp: state.stateLoginPage.isSignUp,
    // showOtpInput: state.stateLoginPage.showOtpInput,
  };
};

export default connect(mapStateToProps, mapActionToLogin)(LoginForm);
