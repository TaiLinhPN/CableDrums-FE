import { connect } from "react-redux";
import RegisterForm from "../layout/Auth/RegisterForm";
import { setEmail, setShowOtpInput } from "../redux/slice/stateLoginPageSlice";

const mapActionToLogin = {
  setShowOtpInput,
  setEmail,
};
const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapActionToLogin)(RegisterForm);
