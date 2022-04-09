export const patListProjectsState = state => state.pat_list_projects;

export const getModalVisible = (state) => patListProjectsState(state).modal;

export const getProjects = (state) => patListProjectsState(state).projects;
export const getLoading = (state) => patListProjectsState(state).loading;
export const getError = (state) => patListProjectsState(state).error;
export const getFilters = (state) => patListProjectsState(state).filters;

export const getMakers = (state) => patListProjectsState(state).makers;
export const getMakersLoading = (state) => patListProjectsState(state).makersLoading;
export const getSelectedPATId = (state) => patListProjectsState(state).selected_pat_id;

export const getPageInfo = (state) => patListProjectsState(state).page;
export const getCurrentPage = (state) => getPageInfo(state).currentPage;
export const getTotalPage = (state) => getPageInfo(state).totalPage;
export const getItemPerPage = (state) => getPageInfo(state).perPage;