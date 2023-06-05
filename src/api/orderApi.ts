import api, { apiConfig } from "./api";

const GET_ALL_ORDER_URL = "/api/order/get-all";


export const getAllOrderApi = async () => {
  return await api.get(apiConfig.baseURL + GET_ALL_ORDER_URL);
};