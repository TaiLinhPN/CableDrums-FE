import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  getAccessToken,
  setAccessToken,
} from "../utils/storage";

interface ApiConfig extends AxiosRequestConfig {
  baseURL: string;
  timeout: number;
  headers?: {
    [key: string]: string;
  };
}
export const apiConfig: ApiConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:4001",
  timeout: 10000,
};

const api = axios.create(apiConfig);

api.interceptors.request.use(async (config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  async (response: AxiosResponse) => {
   const { data } = response;

    if (data && data.token && data.token.accessToken) {
      const { accessToken } = data.token;
      setAccessToken(accessToken);
    }

    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
    }
    throw error;
  }
);

export default api;
