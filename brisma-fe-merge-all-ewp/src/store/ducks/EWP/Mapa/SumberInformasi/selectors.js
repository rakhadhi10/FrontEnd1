export const mapaSumberInformasiState = (state) => state.mapa_sumber_informasi;

export const getSumberInformasi = (state) => mapaSumberInformasiState(state).data.sumber_informasi;
export const getPIC = (state) => mapaSumberInformasiState(state).data.pic_sumber_informasi_tujuan;
export const getCreatedAt = (state) => mapaSumberInformasiState(state).data.createdAt;
export const getUpdatedAt = (state) => mapaSumberInformasiState(state).data.updatedAt;

export const getLoading = (state) => mapaSumberInformasiState(state).loading;
export const getError = (state) => mapaSumberInformasiState(state).error;

export const getSubmitLoading = (state) => mapaSumberInformasiState(state).submitLoading;
export const getSubmitError = (state) => mapaSumberInformasiState(state).submitError;
