import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { getAllContractApi } from "../../api/contractApi";

export interface Contract {
  _id: string;
  contractName: string;
  supplyVendor: {
    _id: string;
    username: string;
  };
  cableDrumCount: number;
  cableDelivered: number;
  cableRequired: number;
  expireAt: string;
  createAt: string;
}

const initialState = {
  contracts: [] as Contract[],
  contractToCreateOrder: {} as Contract,
  isLoading: false,
  isSet: false,
};

const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    setContractData: (state, action) => {
      state.contracts = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSet: (state, action) => {
      state.isSet = action.payload;
    },
    setNewContract: (state, action) => {
      state.contracts = [action.payload, ...state.contracts];
    },
    removeContract: (state, action) => {
      state.contracts = state.contracts.filter(
        (contract) => contract._id !== action.payload
      );
    },
    setContractToCreateOrder: (state, action) => {
      state.contractToCreateOrder = action.payload;
    },
    updateContractWhenNewOrder: (state, action) => {
      const { contractId, cableRequired } = action.payload;

      const contractIndex = state.contracts.findIndex(
        (contract) => contract._id === contractId
      );

      if (contractIndex !== -1) {
        state.contracts[contractIndex] = {
          ...state.contracts[contractIndex],
          cableRequired,
        };
      }
    },
    updateContractWhenOrderCompleted: (state, action) => {
      const { contractId, cableDelivered, cableRequired } = action.payload;
      console.log(contractId, cableDelivered, cableRequired);

      const contractIndex = state.contracts.findIndex(
        (contract) => contract._id === contractId
      );

      if (contractIndex !== -1) {
        state.contracts[contractIndex] = {
          ...state.contracts[contractIndex],
          cableDelivered,
          cableRequired,
        };
      }
    },
  },
});

export const {
  setContractData,
  setLoading,
  setSet,
  setNewContract,
  removeContract,
  setContractToCreateOrder,
  updateContractWhenNewOrder,
  updateContractWhenOrderCompleted,
} = contractSlice.actions;
export default contractSlice;

export const fetchContractData =
  () => async (dispatch: Dispatch, isSet: boolean) => {
    if (!isSet) {
      dispatch(setLoading(true));
      const response = await getAllContractApi();
      if (response.status === 201) {
        dispatch(setContractData(response.data.data));
        dispatch(setLoading(false));
        dispatch(setSet(true));
      }
    }
  };
