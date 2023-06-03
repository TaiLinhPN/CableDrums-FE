import api, { apiConfig } from "./api";

const LOGIN_URL = "/api/auth/login";
const CHECK_LOGIN_API = "/api/auth/check-login";
const RESET_PASSWORD_URL = "/api/auth/reset-password";


export interface LoginData {
  email: string;
  password: string;
}

export interface ResetPasswordApi {
  email: string;
  password: string;
}

export const loginApi = async (data: LoginData) => {
  return await api.post(apiConfig.baseURL + LOGIN_URL, data);
};

export const resetPasswordApi = async (data: ResetPasswordApi) => {
  return await api.post(apiConfig.baseURL + RESET_PASSWORD_URL, data);
};

export const checkLoginApi = async () => {
  return await api.get(apiConfig.baseURL + CHECK_LOGIN_API);
};
