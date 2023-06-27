import { apiConfig } from "./api";
import { api } from "./interceptors";

const GET_ALL_NOTIFICATION_URL = "/api/notification/get-all";
const DELETE_NOTIFICATION_URL = "/api/notification/delete/";
const MARK_NOTIFICATION_AS_READ_URL = "/api/notification/mark-as-read/";

export const getAllNotificationApi = async () => {
  return await api.get(apiConfig.baseURL + GET_ALL_NOTIFICATION_URL);
};

export const deleteNotificationApi = async (id: string) => {
  return await api.get(apiConfig.baseURL + DELETE_NOTIFICATION_URL + id);
};

export const markNotificationAsReadApi = async (id: string) => {
  return await api.get(apiConfig.baseURL + MARK_NOTIFICATION_AS_READ_URL + id);
};
