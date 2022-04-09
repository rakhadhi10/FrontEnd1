export const authState = (state) => state.auth;

export const getToken = (state) => authState(state).token;
export const getLoading = (state) => authState(state).loading;
export const getRefreshLoading = (state) => authState(state).refreshLoading;
export const getError = (state) => authState(state).error;
export const getUser = (state) => authState(state).user;
export const getUserPN = (state) => getUser(state).pn;
export const getUserName = (state) => getUser(state).fullName;
export const getUserJabatan = (state) => getUser(state).jabatan;
export const getUserRoleCodes = (state) => getUser(state).role_kode;
export const getUserFirstRole = (state) => getUser(state).nama_role[0];
export const getUserUkaName = (state) => getUser(state).uka_name;
export const getUserUkaKode = (state) => getUser(state).uka_kode;
export const getEselon = (state) => getUser(state).eselon;
