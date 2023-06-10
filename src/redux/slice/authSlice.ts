import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  stateAuth: StateAuth;
  emailResetPassword: string
}
export type StateAuth = "isLogin" | "isLogout" 

const initialState: InitialState = {
  stateAuth: "isLogout",
  emailResetPassword: ""
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStateAuth: (state, action) => {
      state.stateAuth = action.payload;
    },
    setEmail: (state, action) => {
      state.emailResetPassword = action.payload;
    },
  },
});

export const { setStateAuth, setEmail } = authSlice.actions;

export default authSlice;
