import { apiConfig } from "./api";
import { api } from "./interceptors";

const GET_ALL_ORDER_URL = "/api/order/get-all";
const CREATE_ORDER_URL = "/api/order/create";
const UPDATE_ORDER_URL = "/api/order/update/";

interface DataCreateOrder {
  contractId: string;
  projectContractorId: string;
  cableDrumsToWithdraw: string;
}

interface DataUpdateOrder {
  status: string;
  note?: string;
}

export const getAllOrderApi = async () => {
  return await api.get(apiConfig.baseURL + GET_ALL_ORDER_URL);
};

export const createOrderApi = async (data: DataCreateOrder) => {
  return await api.post(apiConfig.baseURL + CREATE_ORDER_URL,data);
};

export const updateOrderApi = async (data: DataUpdateOrder, orderId: string) => {
  return await api.post(apiConfig.baseURL + UPDATE_ORDER_URL + orderId, data);
};
