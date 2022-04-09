import { Typography } from "antd";
import PropTypes from "prop-types";

export default function NonAuditedStats({ num, percent }) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-4xl text-primary-red">{num}</p>
      <p><Typography.Text type="secondary">{percent}%</Typography.Text></p>
      <p className="text-lg text-primary-red">Not Audited</p>
    </div>
  );
}

NonAuditedStats.defaultProps = {
  num: 0,
  percent: 0
}

NonAuditedStats.propTypes = {
  num: PropTypes.number,
  percent: PropTypes.number
}