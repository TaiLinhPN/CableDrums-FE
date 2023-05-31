import api, { apiConfig } from "./api";

const FIND_USER_URL = "/api/user/find";
const GET_ALL_USER_URL = "/api/user/get-all";
const DELETE_USER_URL = "/api/user/delete/";
const CREATE_USER_URL = "/api/user/create";
const RESET_PASSWORD_URL = "/api/user/reset-password";

export interface FindUserData {
  query: string;
}

export interface CreateUserApi {
  email: string;
  username: string;
  userType: UserType | null;
}

export interface ResetPasswordApi {
  email: string;
  password: string;
}
export type UserType = "admin" | "planner" | "supplyVendor" | "projectContractor";

export const findUserApi = async (data: FindUserData) => {
  return await api.post(apiConfig.baseURL + FIND_USER_URL, data);
};

export const getAllUsersApi = async () => {
  return await api.get(apiConfig.baseURL + GET_ALL_USER_URL);
};

export const removeUserApi = async (userIs: string) => {
  return await api.delete(apiConfig.baseURL + DELETE_USER_URL + userIs);
};

export const createUserApi = async (data: CreateUserApi) => {
  return await api.post(apiConfig.baseURL + CREATE_USER_URL, data);
};

export const resetPasswordApi = async (data: ResetPasswordApi) => {
  return await api.post(apiConfig.baseURL + RESET_PASSWORD_URL, data);
};
