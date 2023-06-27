import { Dispatch, createSlice } from "@reduxjs/toolkit";
import {
  deleteNotificationApi,
  getAllNotificationApi,
  markNotificationAsReadApi,
} from "../../api/notificationApi";

export interface Notification {
  _id: string;
  sender: {
    _id: string;
    username: string;
  };
  userId: string;
  content: string;
  isRead: boolean;
  isDeleted: boolean;
  createdAt: string;
}

const initialState = {
  notifications: [] as Notification[],
  isLoading: false,
  isSet: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationData: (state, action) => {
      state.notifications = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSet: (state, action) => {
      state.isSet = action.payload;
    },
    setNewNotification: (state, action) => {
      state.notifications = [action.payload, ...state.notifications];
    },

    updateNotificationIsRead: (state, action) => {
      const indexToUpdate = state.notifications.findIndex(
        (obj) => obj._id === action.payload
      );
      if (indexToUpdate !== -1) {
        state.notifications[indexToUpdate].isRead =
          !state.notifications[indexToUpdate].isRead;
      }
    },
    removeNotification: (state, action) => {
 
      state.notifications = state.notifications.filter(
        (notification) => notification._id !== action.payload
      );
    },
  },
});

export const {
  setNotificationData,
  setLoading,
  setSet,
  setNewNotification,
  removeNotification,
  updateNotificationIsRead,
} = notificationSlice.actions;
export default notificationSlice;

export const fetchNotificationData =
  () => async (dispatch: Dispatch, isSet: boolean) => {
    if (!isSet) {
      dispatch(setLoading(true));
      try {
        const response = await getAllNotificationApi();
        if (response.status === 200) {
          dispatch(setNotificationData(response.data.data as Notification));
          dispatch(setLoading(false));
          dispatch(setSet(true));
        }
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
      }
    }
  };

export const markNotificationAsRead =
  (notificationId: string) => async (dispatch: Dispatch) => {
    try {
      const response = await markNotificationAsReadApi(notificationId);
      if (response.status === 200) {
        dispatch(updateNotificationIsRead(notificationId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const deleteNotification =
    (notificationId: string) => async (dispatch: Dispatch) => {
      try {
        const response = await deleteNotificationApi(notificationId);
        if (response.status === 200) {
          dispatch(removeNotification(notificationId));
        }
      } catch (error) {
        console.log(error);
      }
    };