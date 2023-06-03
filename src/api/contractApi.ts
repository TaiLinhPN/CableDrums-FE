import api, { apiConfig } from "./api";

const GET_ALL_CONTRACT_URL = "/api/contract/get-all";


export const getAllContractApi = async () => {
  return await api.get(apiConfig.baseURL + GET_ALL_CONTRACT_URL);
};