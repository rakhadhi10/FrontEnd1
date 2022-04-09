import PropTypes from "prop-types";
import { Avatar, Typography } from "antd";

export default function Comment({ avatar, nama, waktu, komentar }) {
  return (
    <div className="rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar src={avatar} alt="My Avatar" />
          <p className="font-semibold ">{nama}</p>
        </div>
        <p><Typography.Text type="secondary">{waktu}</Typography.Text></p>
      </div>
      <div className="pt-2">
        {komentar}
      </div>
    </div>
  );
}

Comment.propTypes = {
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

Comment.defaultProps = {
  onSubmit: () => null
}