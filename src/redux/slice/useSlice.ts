import { createSlice } from "@reduxjs/toolkit";

export interface userData {
  userId: string;
  name: string;
  email: string;
  userType: string;
}
const initialState = {
  userId: "",
  name: "",
  email: "",
  userType: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserReducer(state, action) {
      state.userId = action.payload._id;
      state.email = action.payload.email;
      state.name = action.payload.username;
      state.userType = action.payload.userType;
    },
  },
});

const { setUserReducer } = userSlice.actions;

export const setUser = (userData: userData) => async (dispatch: Function) => {
  dispatch(setUserReducer(userData));
};

export default userSlice;
