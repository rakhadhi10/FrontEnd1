export const mapaAnggaran = (state) => state.mapa_anggaran;

export const getData = (state) => mapaAnggaran(state).data;
export const getLoading = (state) => mapaAnggaran(state).loading;
export const getError = (state) => mapaAnggaran(state).error;

export const getSubmitLoading = (state) => mapaAnggaran(state).submitLoading;
export const getSubmitError = (state) => mapaAnggaran(state).submitError;

export const getUpdateLoading = (state) => mapaAnggaran(state).updateLoading;
export const getUpdateError = (state) => mapaAnggaran(state).updateError;

export const getDeleteLoading = (state) => mapaAnggaran(state).deleteLoading;
export const getDeleteError = (state) => mapaAnggaran(state).deleteError;

export const getTipeAnggaranData = (state) => mapaAnggaran(state).dataTipeAnggaran;
export const getTipeAnggaranLoading = (state) => mapaAnggaran(state).loadingTipeAnggaran;
export const getTipeAnggaranError = (state) => mapaAnggaran(state).errorTipeAnggaran;
