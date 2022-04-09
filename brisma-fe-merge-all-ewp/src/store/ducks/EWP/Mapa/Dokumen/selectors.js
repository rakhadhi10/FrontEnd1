export const mapaDokumen = (state) => state.mapa_dokumen;

export const getLoading = (state) => mapaDokumen(state).loading;
export const getError = (state) => mapaDokumen(state).error;
export const getDataBab = (state) => mapaDokumen(state).data.data;
export const getDaftarIsi = (state) => mapaDokumen(state).data.daftar_isi;
export const getApprover = (state) => mapaDokumen(state).data.approver;
export const getReasonApproval = (state) =>
  mapaDokumen(state).data.reason_approval;

export const getLoadingKomen = (state) => mapaDokumen(state).loadingKomen;
export const getErrorKomen = (state) => mapaDokumen(state).errorKomen;
export const getDataKomen = (state) => mapaDokumen(state).dataKomen;

export const getLoadingSubmitKomen = (state) =>
  mapaDokumen(state).loadingSubmitKomen;
export const getErrorSubmitKomen = (state) =>
  mapaDokumen(state).errorSubmitKomen;

export const getLoadingSubmitCloseKomen = (state) =>
  mapaDokumen(state).loadingSubmitCloseKomen;
export const getErrorSubmitCloseKomen = (state) =>
  mapaDokumen(state).errorSubmitCloseKomen;

export const getLoadingApproval = (state) => mapaDokumen(state).loadingApproval;
export const getErrorApproval = (state) => mapaDokumen(state).errorApproval;

export const getReason = (state) => mapaDokumen(state).reason;
export const getCatatan = (state) => mapaDokumen(state).catatan;
