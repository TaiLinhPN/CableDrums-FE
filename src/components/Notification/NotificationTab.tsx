import { useState } from "react";
import {
  Notification,
  deleteNotification,
  markNotificationAsRead,
} from "../../redux/slice/notificationSlice";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";

interface NotificationTabProps {
  notification: Notification;
}
const NotificationTab = ({ notification }: NotificationTabProps) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleOnclick = () => {
     markAsRead();
  };

  const markAsRead = () => {
    if (!notification.isRead)
      markNotificationAsRead(notification._id)(dispatch);
  };

  const remove = () => {
    deleteNotification(notification._id)(dispatch);
  };
  return (
    <div
      className="bg-gray-100 mb-2 p-2 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleOnclick}
    >
      {!notification.isRead && (
        <div className="bg-maize h-full w-1 absolute top-0 right-0"></div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-maize rounded-full" />
          <div className="font-medium">{notification.sender.username}</div>
        </div>
        <div className="text-xs">{notification.createdAt}</div>
      </div>
      <div className="relative">
        {isHovered && (
          <FaTrash
            onClick={remove}
            className="hover:text-red absolute top-2/5 left-1/6 "
            size={"1em"}
          />
        )}

        <div className="ml-11">{notification.content}</div>
      </div>
    </div>
  );
};

export default NotificationTab;
