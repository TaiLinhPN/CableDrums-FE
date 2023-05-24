import api, { apiConfig } from "./api";

const FIND_USER_URL = "/api/user/find";

export interface FindUserData {
  query: string;
}
export const findUserApi = async (data: FindUserData) => {
  return await api.post(apiConfig.baseURL + FIND_USER_URL, data);
};