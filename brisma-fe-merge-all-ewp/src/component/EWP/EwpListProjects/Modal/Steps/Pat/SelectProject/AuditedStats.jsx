import { Typography } from "antd";
import PropTypes from "prop-types";

export default function AuditedStats({ num, percent }){
  return (
    <div className="flex flex-col items-center">
      <p className="text-4xl text-primary-blue">{num}</p>
      <p><Typography.Text type="secondary">{percent}%</Typography.Text></p>
      <p className="text-lg text-primary-blue">Audited</p>
    </div>
  );
}

AuditedStats.defaultProps = {
  num: 0,
  percent: 0
}

AuditedStats.propTypes = {
  num: PropTypes.number,
  percent: PropTypes.number
}