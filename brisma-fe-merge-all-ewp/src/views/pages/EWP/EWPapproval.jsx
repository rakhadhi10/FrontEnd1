import React, { useEffect } from "react";
import { CardStatus } from "../../../component/CardStatus";
import TableApproval from "../../../component/EWP/EwpApproval/TableApproval";
import AppLayout from "../../../layouts/AppLayout";
import { fetchApprovalEwp } from "../../../store/ducks/EWP/Approval/actions";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  getError,
  getLoading,
  getApproval,
  getApprovalHistory,
  getApprovalInfo,
} from "../../../store/ducks/EWP/Approval/selectors";
import withAuth from "../../routes/hoc/withAuth";
import withRole from "../../routes/hoc/withRole";
import { pat_content } from "../../routes/allowedRoles";

function EwpApproval({
  fetchApprovalEwp,
  loading,
  error,
  dataApproval,
  dataApprovalHistory,
  dataApprovalInfo,
}) {
  useEffect(() => fetchApprovalEwp(), [fetchApprovalEwp]);
  console.log(dataApproval);
  return (
    <AppLayout title="EWP">
      <div className="flex flex-col justify-start">
        <div className="flex flex-row justify-center gap-6">
          <CardStatus type="success" title="Approve">
            {dataApprovalInfo.approved}
          </CardStatus>
          <CardStatus type="danger" title="Reject">
            {dataApprovalInfo.rejected}
          </CardStatus>
          <CardStatus type="primary" title="New">
            {dataApprovalInfo.new}
          </CardStatus>
        </div>
        <div className="flex flex-col gap-3 justify-between flex-wrap py-8">
          <TableApproval data={dataApproval} type="incoming" />
          <TableApproval data={dataApprovalHistory} type="history" />
        </div>
      </div>
    </AppLayout>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: getLoading(state),
    error: getError(state),
    dataApproval: getApproval(state),
    dataApprovalHistory: getApprovalHistory(state),
    dataApprovalInfo: getApprovalInfo(state),
  };
};

const mapDispachToProps = {
  fetchApprovalEwp: fetchApprovalEwp,
};

export default compose(
  withAuth,
  withRole(pat_content),
  connect(mapStateToProps, mapDispachToProps)
)(EwpApproval);
