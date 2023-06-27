import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { fetchNotificationData } from "../../redux/slice/notificationSlice";
import NotificationTab from "./NotificationTab";
import Loading from "../Loading";

const Notification = () => {
  const dispatch = useDispatch();
  const { notifications, isLoading, isSet } = useSelector(
    (state: RootState) => state.notification
  );

  useEffect(() => {
    fetchNotificationData()(dispatch, isSet);
  }, []);

  console.log(notifications);

  return (
    <div >
      {notifications.map((notification, index) => (
        <NotificationTab
          key={index}
          notification={notification}
        ></NotificationTab>
      ))}
      <Loading
        isLoading={isLoading}
        dataLength={notifications.length}
        text="No notification found."
      />
    </div>
  );
};

export default Notification;
