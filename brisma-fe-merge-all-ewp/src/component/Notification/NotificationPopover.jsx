import { Popover } from "antd";
import MarkAsRead from "./MarkAsRead";
import NotificationContainer from "./NotifixationContainer";

export default function NotificationPopover({ children, ...rest }){
  return (
    <Popover
      title={<MarkAsRead />}
      placement="bottom"
      content={<NotificationContainer />}
      trigger="click"
      {...rest}
    >
      {children}
    </Popover>
  );
}