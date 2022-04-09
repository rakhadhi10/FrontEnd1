import PropTypes from "prop-types";
import { Avatar, Typography } from "antd";

export default function NotificationItem({ avatarSrc, content, timestamp }){
  return (
    <div className="flex items-start gap-2 justify-between">
      <Avatar size="large" />
      <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
      <p><Typography.Text type="secondary">3h ago</Typography.Text></p>
    </div>
  )
}

NotificationItem.propTypes = {
  avatarSrc: PropTypes.string,
  content: PropTypes.string,
  timestamp: PropTypes.string
}