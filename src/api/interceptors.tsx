// trick 
import axios, { AxiosResponse } from "axios";
import { apiConfig } from "./api";
import { useDispatch } from "react-redux";
import { clearAllStorage, getAccessToken } from "../utils/storage";
import { setStateAuth } from "../redux/slice/authSlice";

const api = axios.create(apiConfig);

function Interceptors() {
  const dispatch = useDispatch();
  api.interceptors.request.use(async (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error) => {
      if (error.response && error.response.status === 403) {
        clearAllStorage();
        dispatch(setStateAuth("isLogOut"));
      }
      throw error;
    }
  );

  return <div></div>;
}
export { api };

export default Interceptors;
