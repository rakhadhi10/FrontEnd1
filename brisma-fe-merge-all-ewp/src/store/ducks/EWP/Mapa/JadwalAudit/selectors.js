export const mapaJadwalAudit = (state) => state.mapa_jadwal_audit;

export const getData = (state) => mapaJadwalAudit(state).data;
export const getLoading = (state) => mapaJadwalAudit(state).loading;
export const getError = (state) => mapaJadwalAudit(state).error;

export const getSubmitLoading = (state) => mapaJadwalAudit(state).submitLoading;
export const getSubmitError = (state) => mapaJadwalAudit(state).submitError;
