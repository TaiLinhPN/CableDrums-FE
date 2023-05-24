import { createSlice } from "@reduxjs/toolkit";

export interface userData {
  userId: string;
  name: string;
  email: string;
  avatar: string;
}
const initialState = {
  userId: "",
  name: "",
  email: "",
  avatar: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserReducer(state, action) {
      state.userId = action.payload._id;
      state.email = action.payload.email;
      state.name = action.payload.username;
      state.avatar = action.payload.avatar;
    },
  },
});

const { setUserReducer } = userSlice.actions;

export const setUser = (userData: userData) => async (dispatch: Function) => {
  dispatch(setUserReducer(userData));
};

export default userSlice;
