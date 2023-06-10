import { AxiosRequestConfig } from "axios";

interface ApiConfig extends AxiosRequestConfig {
  baseURL: string;
  timeout: number;
  headers?: {
    [key: string]: string;
  };
}
export const apiConfig: ApiConfig = {
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:4001",
  timeout: 10000,
};

// const api = axios.create(apiConfig);

// api.interceptors.request.use(async (config) => {
//   const accessToken = getAccessToken();
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//    (response: AxiosResponse) => {
//     return response;
//   },
//   async (error) => {
//     if (error.response && error.response.status === 403) {
//       window.location.href = "/login";
//     }
//     throw error;
//   }
// );

// export default api;

