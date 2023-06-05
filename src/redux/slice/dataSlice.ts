import { createSlice } from "@reduxjs/toolkit";
import { Contract } from "../../hooks/useContractData";
import { Order } from "../../hooks/useOrderData";

interface InitialState {
    contract: Contract[]
    order: Order[]
}

const initialState: InitialState = {
  contract: [],
  order: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setContractData(state, action) {
      state.contract = action.payload;
    },
    setOrderData(state, action) {
      state.contract = action.payload;
    },
  },
});

export const { setContractData, setOrderData } = dataSlice.actions;
export default dataSlice;