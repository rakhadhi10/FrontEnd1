export const patTargetAuditState = (state) => state.addendum_pat_target_audit;

export const getTargetAuditAIWState = (state) => patTargetAuditState(state).aiw;
export const getTargetAuditAIWLoading = (state) =>
  getTargetAuditAIWState(state).loading;
export const getTargetAuditAIWError = (state) =>
  getTargetAuditAIWState(state).error;
export const getTargetAuditAIW = (state) => getTargetAuditAIWState(state).data;

export const getTargetAuditAITIState = (state) =>
  patTargetAuditState(state).aiti;
export const getTargetAuditAITILoading = (state) =>
  getTargetAuditAITIState(state).loading;
export const getTargetAuditAITIError = (state) =>
  getTargetAuditAITIState(state).error;
export const getTargetAuditAITI = (state) =>
  getTargetAuditAITIState(state).data;

export const getTargetAuditAIKPState = (state) =>
  patTargetAuditState(state).aikp;
export const getTargetAuditAIKPLoading = (state) =>
  getTargetAuditAIKPState(state).loading;
export const getTargetAuditAIKPError = (state) =>
  getTargetAuditAIKPState(state).error;
export const getTargetAuditAIKP = (state) =>
  getTargetAuditAIKPState(state).data;
