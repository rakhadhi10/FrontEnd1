export const mapaTimAuditState = (state) => state.mapa_tim_audit;

export const getDataTimAudit = (state) => mapaTimAuditState(state).data;

export const getLoading = (state) => mapaTimAuditState(state).loading;
export const getError = (state) => mapaTimAuditState(state).error;

export const getSubmitLoading = (state) =>
  mapaTimAuditState(state).submitLoading;
export const getSubmitError = (state) => mapaTimAuditState(state).submitError;
