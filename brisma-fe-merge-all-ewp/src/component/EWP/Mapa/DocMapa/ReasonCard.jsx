import PropTypes from "prop-types";
import { Typography } from "antd";
import ApprovalStatusPill from "./ApprovalStatusPill";

export default function ReasonCard({ nama, status, waktu, alasan }){
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold">{nama}</p>
          <ApprovalStatusPill status={status} />
        </div>
        <p><Typography.Text type="secondary">{waktu}</Typography.Text></p>
      </div>
      <p><Typography.Text type="secondary">{alasan}</Typography.Text></p>
    </div>
  );
}

ReasonCard.propTypes = {
  nama: PropTypes.string,
  status: PropTypes.string,
  waktu: PropTypes.string,
  alasan: PropTypes.string
}