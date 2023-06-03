import { createSlice } from "@reduxjs/toolkit";
import { clearAllStorage } from "../../utils/storage";


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

export const { setStateAuth } = authSlice.actions;

export const logout = () => async (dispatch: Function) => {
  clearAllStorage();
  dispatch(setStateAuth("isLogout"));
  // window.location.reload();
};

export const resetPassword = () => async (dispatch: Function) => {
  dispatch(setStateAuth("isLogout"));
};
export default authSlice;
