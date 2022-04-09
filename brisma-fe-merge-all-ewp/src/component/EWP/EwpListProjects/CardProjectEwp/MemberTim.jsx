import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';

const MemberTim = ({ name, position }) => {
  let color = "";

  switch (position) {
    case "ma":
      color = "blue";
      break;
    case "kta":
      color = "red";
      break;
    case "ata":
      color = "green";
      break;
    default:
      color = "green";
      break;
  }

  return (
    <div className="flex items-center gap-2">
      <Avatar
        className={`bg-primary-${color}`}
        icon={<UserOutlined />}
        size="small"
      />
      <p className={`text-primary-${color}`}>{name}</p>
    </div>
  );
};

export default MemberTim;
