export const auditInfoEwpState = (state) => state.audit_info_ewp;

export const getLoading = (state) => auditInfoEwpState(state).loading;
export const getError = (state) => auditInfoEwpState(state).error;
export const getSubmitLoading = (state) =>
  auditInfoEwpState(state).submitLoading;
export const getSubmitError = (state) => auditInfoEwpState(state).submitError;
export const getAuditInfo = (state) => auditInfoEwpState(state).data;
