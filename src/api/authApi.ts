import api, { apiConfig } from "./api";

const LOGIN_URL = "/api/auth/login";


export interface LoginData {
  email: string;
  password: string;
}



export const loginApi = async (data: LoginData) => {
  return await api.post(apiConfig.baseURL + LOGIN_URL, data);
};


