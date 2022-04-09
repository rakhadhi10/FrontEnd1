export const approvalEwpState = (state) => state.approval_ewp;

export const getApproval = (state) =>
  approvalEwpState(state).data.list_ewp_new_approval;
export const getApprovalHistory = (state) =>
  approvalEwpState(state).data.list_ewp_history_approval;
export const getApprovalInfo = (state) => approvalEwpState(state).data.info;

export const getLoading = (state) => approvalEwpState(state).loading;
export const getError = (state) => approvalEwpState(state).error;

export const getSubmitLoading = (state) =>
  approvalEwpState(state).submitLoading;
export const getSubmitError = (state) => approvalEwpState(state).submitError;
