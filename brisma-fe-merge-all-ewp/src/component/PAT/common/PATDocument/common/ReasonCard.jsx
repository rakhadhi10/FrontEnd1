import PropTypes from "prop-types";
import { Typography } from "antd";
import ApprovalStatusPill from "./ApprovalStatusPill";

export default function ReasonCard({ nama, status, waktu, alasan }){
  return (
    <div>
      <div className="grid grid-cols-4 items-center">
        <div className="grid grid-cols-3 items-center gap-2 col-span-3">
          <p className="col-span-2 font-semibold">{nama}</p>
          <ApprovalStatusPill 
            status={status} 
            classes={"justify-self-start"}
          />
        </div>
        <p className="justify-self-end"><Typography.Text type="secondary">{waktu}</Typography.Text></p>
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