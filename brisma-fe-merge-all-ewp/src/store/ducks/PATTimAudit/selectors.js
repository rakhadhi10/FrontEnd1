export const patTimAuditState = state => state.pat_tim_audit;

export const getCreateModal = (state) => patTimAuditState(state).modal.create;
export const getEditModal = (state) => patTimAuditState(state).modal.edit;

export const getAllTimAudit = (state) => patTimAuditState(state).teams;
export const getLoading = (state) => patTimAuditState(state).loading;
export const getError = (state) => patTimAuditState(state).error;
export const getFilters = (state) => patTimAuditState(state).filters

export const getForm = (state) => patTimAuditState(state).form;
export const getFormLoading = (state) => patTimAuditState(state).formLoading;
export const getFormError = (state) => patTimAuditState(state).formError;

export const getDeleteLoading = (state) => patTimAuditState(state).deleteLoading;

export const getPageInfo = (state) => patTimAuditState(state).page;
export const getCurrentPage = (state) => getPageInfo(state).currentPage;
export const getTotalPage = (state) => getPageInfo(state).totalPage;
export const getItemPerPage = (state) => getPageInfo(state).perPage;

export const getEditFormError = (state) => patTimAuditState(state).editFormError;
export const getEditFormLoading = (state) => patTimAuditState(state).editFormLoading;
export const getEditState = (state) => patTimAuditState(state).edit;
export const getDeletedAtaIds = (state) => getEditState(state).deletedAtaIds
export const getCurrentEditedTeamId = (state) => getEditState(state).currentTeamId;
export const getCurrentEditedTeam = (state) => getEditState(state).team;
export const getEditTeamFetchLoading = (state) => getEditState(state).fetchLoading;
export const getEditTeamFetchError = (state) => getEditState(state).fetchError;