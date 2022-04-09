export const createPATState = state => state.create_pat;

export const getFilters = (state) => createPATState(state).filters;
export const getLoading = (state) => createPATState(state).loading;
export const getError = (state) => createPATState(state).error;
export const getPATs = (state) => createPATState(state).pats;

export const getModalVisible = (state) => createPATState(state).modal;

export const getPageInfo = (state) => createPATState(state).page;
export const getCurrentPage = (state) => getPageInfo(state).currentPage;
export const getTotalPage = (state) => getPageInfo(state).totalPage;
export const getItemPerPage = (state) => getPageInfo(state).perPage;

