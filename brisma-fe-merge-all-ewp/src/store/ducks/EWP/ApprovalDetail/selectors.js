export const approvalEwpDetailState = (state) => state.approval_detail_ewp;

export const getApprovalDetail = (state) => approvalEwpDetailState(state).data;

export const getLoading = (state) => approvalEwpDetailState(state).loading;
export const getError = (state) => approvalEwpDetailState(state).error;
