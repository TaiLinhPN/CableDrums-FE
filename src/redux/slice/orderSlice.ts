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
  orderName: string;
  contract: {
    _id: string;
    contractName: string;
  };
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
  orders: [] as Order[],
  isLoading: false,
  isSet: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderData: (state, action) => {
      state.orders = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSet: (state, action) => {
      state.isSet = action.payload;
    },
    setNewOrder: (state, action) => {
      state.orders = [action.payload, ...state.orders];
    },

    updateOrder: (state, action) => {
      const indexToUpdate = state.orders.findIndex(
        (obj) => obj._id === action.payload._id
      );
      if (indexToUpdate !== -1) {
        state.orders[indexToUpdate] = action.payload;
      }
    },
  },
});

export const { setOrderData, setLoading, setSet, setNewOrder, updateOrder } =
  orderSlice.actions;
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
