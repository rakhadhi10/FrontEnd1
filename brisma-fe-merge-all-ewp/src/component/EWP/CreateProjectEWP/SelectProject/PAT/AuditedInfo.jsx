import { Typography } from "antd";
import React from "react";
import { connect } from "react-redux";
import {
  getTotalAudited,
  getTotalNotAudited,
  getTotalPAT,
} from "../../../../../store/ducks/EWP/CreateEWP/selectors";

function AuditedInfo({ total, audited, notAudited }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex flex-col items-center">
        <p className="text-4xl text-primary-blue">{audited}</p>
        <p>
          <Typography.Text type="secondary">
            {((audited / total) * 100).toFixed(1)}%
          </Typography.Text>
        </p>
        <p className="text-lg text-primary-blue">Audited</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-4xl text-primary-red">{notAudited}</p>
        <p>
          <Typography.Text type="secondary">
            {((notAudited / total) * 100).toFixed(1)}%
          </Typography.Text>
        </p>
        <p className="text-lg text-primary-red">Not Audited</p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    total: getTotalPAT(state),
    audited: getTotalAudited(state),
    notAudited: getTotalNotAudited(state),
  };
};

export default connect(mapStateToProps, null)(AuditedInfo);
