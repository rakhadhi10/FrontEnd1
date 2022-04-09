export const patSumberInformasiState = state => state.pat_sumber_informasi

export const getLatarBelakang = (state) => patSumberInformasiState(state).data.sumber_informasi;
export const getPIC = (state) => patSumberInformasiState(state).data.pic_sumber_informasi;
export const getCreatedAt = (state) => patSumberInformasiState(state).data.createdAt;
export const getUpdatedAt = (state) => patSumberInformasiState(state).data.updatedAt;

export const getLoading = (state) => patSumberInformasiState(state).loading;
export const getError = (state) => patSumberInformasiState(state).error;

export const getSubmitLoading = (state) => patSumberInformasiState(state).submitLoading;
export const getSubmitError = (state) => patSumberInformasiState(state).submitError;