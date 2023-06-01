import { createSlice } from "@reduxjs/toolkit";
import { LoginData, loginApi } from "../../api/authApi";
import { clearAllStorage } from "../../utils/storage";
import { setUser } from "./useSlice";
import {
  messageError,
  messageSuccess,
  messageWaning,
} from "../../utils/notify";
import { socket } from "../../utils/socket";

interface InitialState {
  stateAuth: StateAuth;
}
export type StateAuth = "isLogin" | "isLogout" | "isResetPassword";

const initialState: InitialState = {
  stateAuth: "isLogout",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStateAuth: (state, action) => {
      state.stateAuth = action.payload;
    },
  },
});

const { setStateAuth } = authSlice.actions;
export { setStateAuth };

export const login = (user: LoginData) => async (dispatch: Function) => {
  try {
    const response = await loginApi(user);
    const { data } = response.data;
    console.log(response.status);

    if (response.status === 200) {
      dispatch(setStateAuth("isLogin"));
      dispatch(setUser(data.user));

      messageSuccess("Login successful, welcome");
      socket.emit("user-connect", data.user._id);
    }
  } catch (error:any) {
    if (error.response.status === 400) {
      dispatch(setStateAuth("isResetPassword"));
      messageWaning("You must reset password for the first login");
    }
    console.log("Error login:", error);
    messageError(error);
  }
};

export const logout = () => async (dispatch: Function) => {
  clearAllStorage();
  dispatch(setStateAuth("isLogout"));
  window.location.reload();
};

export const resetPassword = () => async (dispatch: Function) => {
  dispatch(setStateAuth("isLogout"));
};
export default authSlice;
