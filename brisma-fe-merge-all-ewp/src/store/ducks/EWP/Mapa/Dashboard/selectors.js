export const mapaDashboard = (state) => state.mapa_dashboard;

export const getAuditInfo = (state) => mapaDashboard(state).data;
export const getLoading = (state) => mapaDashboard(state).loading;
export const getError = (state) => mapaDashboard(state).error;
export const getMapaInfo = (state) => mapaDashboard(state).data;
export const getPosisi = (state) => mapaDashboard(state).posisi;
