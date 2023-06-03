import { createSlice } from "@reduxjs/toolkit";

export interface userData {
  userId: string;
  name: string;
  email: string;
  userType:
    | "admin"
    | "planner"
    | "supplyVendor"
    | "projectContractor";
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

export const { setUserReducer } = userSlice.actions;

export default userSlice;
