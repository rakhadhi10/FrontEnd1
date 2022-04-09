export const mapaTujuanState = (state) => state.mapa_tujuan;

export const getTujuan = (state) => mapaTujuanState(state).data.tujuan;
export const getPIC = (state) => mapaTujuanState(state).data.pic_tujuan;
export const getCreatedAt = (state) => mapaTujuanState(state).data.createdAt;
export const getUpdatedAt = (state) => mapaTujuanState(state).data.updatedAt;

export const getLoading = (state) => mapaTujuanState(state).loading;
export const getError = (state) => mapaTujuanState(state).error;

export const getSubmitLoading = (state) => mapaTujuanState(state).submitLoading;
export const getSubmitError = (state) => mapaTujuanState(state).submitError;
