export const patLatarBelakangState = (state) =>
  state.addendum_pat_latar_belakang;

export const getLatarBelakang = (state) => patLatarBelakangState(state).data;
export const getLoading = (state) => patLatarBelakangState(state).loading;
export const getError = (state) => patLatarBelakangState(state).error;

export const getSubmitLoading = (state) =>
  patLatarBelakangState(state).submitLoading;
export const getSubmitError = (state) =>
  patLatarBelakangState(state).submitError;
