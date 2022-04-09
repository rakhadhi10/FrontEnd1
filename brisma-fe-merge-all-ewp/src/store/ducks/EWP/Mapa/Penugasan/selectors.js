export const mapaPenugasan = (state) => state.mapa_penugasan;

export const getData = (state) => mapaPenugasan(state).data;
export const getLoading = (state) => mapaPenugasan(state).loading;
export const getError = (state) => mapaPenugasan(state).error;

export const getDataSummary = (state) => mapaPenugasan(state).dataSummary;
export const getLoadingSummary = (state) => mapaPenugasan(state).loadingSummary;
export const getErrorSummary = (state) => mapaPenugasan(state).errorSummary;

export const getDataMapaSample = (state) => mapaPenugasan(state).dataMapaSample;
export const getLoadingMapaSample = (state) => mapaPenugasan(state).loadingMapaSample;
export const getErrorMapaSample = (state) => mapaPenugasan(state).errorMapaSample;

export const getLoadingSubmitAuditor = (state) => mapaPenugasan(state).loadingSubmitAuditor;
export const getErrorSubmitAuditor = (state) => mapaPenugasan(state).errorSubmitAuditor;
