export const patLatarBelakangState = state => state.pat_latar_belakang

export const getLatarBelakang = (state) => patLatarBelakangState(state).data.latar_belakang;
export const getPIC = (state) => patLatarBelakangState(state).data.pic_latar_belakang_tujuan;
export const getCreatedAt = (state) => patLatarBelakangState(state).data.createdAt;
export const getUpdatedAt = (state) => patLatarBelakangState(state).data.updatedAt;

export const getLoading = (state) => patLatarBelakangState(state).loading;
export const getError = (state) => patLatarBelakangState(state).error;

export const getSubmitLoading = (state) => patLatarBelakangState(state).submitLoading;
export const getSubmitError = (state) => patLatarBelakangState(state).submitError;
