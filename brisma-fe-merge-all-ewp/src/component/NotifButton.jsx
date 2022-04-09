import React from "react";
import { Badge } from "antd";
import { FaRegBell } from "react-icons/fa";
import NotificationPopover from "./Notification/NotificationPopover";

const NotifButton = () => {
  return (
    <div className="cursor-pointer flex items-center">
      <NotificationPopover >
        <Badge dot color="#3C64B1">
          <FaRegBell className="text-secondary-light-black hover:text-primary-blue text-lg" />
        </Badge>
      </NotificationPopover>
    </div>
  );
};

export default NotifButton




