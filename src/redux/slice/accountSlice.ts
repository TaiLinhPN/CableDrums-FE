import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { getAllUsersApi } from "../../api/userApi";

export interface Account {
  _id: string;
  username: string;
  email: string;
  userType: string;
}

const initialState = {
  accounts: [] as Account[],
  readyToRemoveAccount: {} as Account,
  isLoading: false,
  isSet: false,
  isOpenModalCreate: false,
  isOpenModalRemove: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccountData: (state, action) => {
      state.accounts = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSet: (state, action) => {
      state.isSet = action.payload;
    },
    setNewAccount: (state, action) => {
      state.accounts = [action.payload, ...state.accounts];
    },
    removeAccount: (state, action) => {
      state.accounts = state.accounts.filter(
        (account) => account._id !== action.payload
      );
    },
    setReadyToRemoveAccount: (state, action) => {
      state.readyToRemoveAccount = action.payload;
    },
    setOpenModalCreate: (state, action) => {
      state.isOpenModalCreate = action.payload;
    },

    setOpenModalRemove: (state, action) => {
      state.isOpenModalRemove = action.payload;
    },
  },
});

export const {
  setAccountData,
  setLoading,
  setSet,
  setNewAccount,
  removeAccount,
  setReadyToRemoveAccount,
  setOpenModalCreate,
  setOpenModalRemove,
} = accountSlice.actions;
export default accountSlice;

export const fetchAccountData =
  () => async (dispatch: Dispatch, isSet: boolean) => {
    console.log(123);

    if (!isSet) {
      dispatch(setLoading(true));
      const response = await getAllUsersApi();
      if (response.status === 201) {
        dispatch(setAccountData(response.data.data));
        dispatch(setLoading(false));
        dispatch(setSet(true));
      }
    }
  };
