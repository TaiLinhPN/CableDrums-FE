import { connect } from "react-redux";
import { RootState } from "../redux/store";
import PrivateRoute from "../routes/PrivateRoute";


const mapStateToProps = (state: RootState) => {
    return {
      isLogin: state.auth.isLogin
  };
};

export default connect(mapStateToProps)(PrivateRoute);