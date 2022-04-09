export const patSumberInformasiState = (state) =>
  state.addendum_pat_sumber_informasi;

export const getSumberInformasi = (state) =>
  patSumberInformasiState(state).data;
export const getLoading = (state) => patSumberInformasiState(state).loading;
export const getError = (state) => patSumberInformasiState(state).error;

export const getSubmitLoading = (state) =>
  patSumberInformasiState(state).submitLoading;
export const getSubmitError = (state) =>
  patSumberInformasiState(state).submitError;
