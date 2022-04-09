export const mapaLatarBelakangState = (state) => state.mapa_latar_belakang;

export const getLatarBelakang = (state) => mapaLatarBelakangState(state).data.latar_belakang;
export const getPIC = (state) => mapaLatarBelakangState(state).data.pic_latar_belakang_tujuan;
export const getCreatedAt = (state) => mapaLatarBelakangState(state).data.createdAt;
export const getUpdatedAt = (state) => mapaLatarBelakangState(state).data.updatedAt;

export const getLoading = (state) => mapaLatarBelakangState(state).loading;
export const getError = (state) => mapaLatarBelakangState(state).error;

export const getSubmitLoading = (state) => mapaLatarBelakangState(state).submitLoading;
export const getSubmitError = (state) => mapaLatarBelakangState(state).submitError;
