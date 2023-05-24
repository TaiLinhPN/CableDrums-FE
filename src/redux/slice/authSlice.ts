import { createSlice } from "@reduxjs/toolkit";
import { loginApi, LoginData } from "../../api/authApi";
import { messageError, messageSuccess } from "../../utils/notifi";
import { socket } from "../../utils/socket";
import { clearAllStorage } from "../../utils/storage";
import { setUser } from "./useSlice";

interface initialStateProps {
  isLogin: boolean
}

const initialState: initialStateProps = {
  isLogin: false
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
     setLogin: (state) => {
      state.isLogin = true;
    },
    setLogOut: (state) => {
      state.isLogin = false;
    },
  }
})

const { setLogin, setLogOut } = authSlice.actions;

export const login = (user: LoginData) => async (dispatch: Function) => {
  try {
    const response = await loginApi(user);
    if (response.status === 200) {
      const { data } = response.data

      console.log(data);
      
      
      messageSuccess("Login successful, welcome");
      dispatch(setLogin());
      dispatch(setUser(data.user));
      socket.emit("user-connect", data.user._id);
    }
  } catch (error: any) {
    console.log(error);
    messageError(error);
  }
};

export const logout = () => async (dispatch: Function) => {
  clearAllStorage();
  dispatch(setLogOut());
  window.location.reload();
};

export default authSlice