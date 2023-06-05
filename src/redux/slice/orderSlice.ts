import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { getAllOrderApi } from "../../api/orderApi";

export interface Order {
  supplyVendor: {
    _id: string;
    username: string;
  };
  planner: {
    _id: string;
    username: string;
  };
  projectContractor: {
    _id: string;
    username: string;
  };
  _id: string;
  contractId: string;
  cableDrumsToWithdraw: number;
  status: string;
  notes: {
    username: string;
    time: string;
    message?: string;
  }[];
  createdAt: string;
}

const initialState = {
  data: [] as Order[],
  isLoading: false,
  isSet: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSet: (state, action) => {
      state.isSet = action.payload;
    },
  },
});

export const { setOrderData, setLoading, setSet } = orderSlice.actions;
export default orderSlice;

export const fetchOrderData =
  () => async (dispatch: Dispatch, isSet: boolean) => {
      if (!isSet) {
      dispatch(setLoading(true));
      const response = await getAllOrderApi();
      if (response.status === 201) {
        dispatch(setOrderData(response.data.data));
        dispatch(setLoading(false));
        dispatch(setSet(true));
      }
    }
  };
