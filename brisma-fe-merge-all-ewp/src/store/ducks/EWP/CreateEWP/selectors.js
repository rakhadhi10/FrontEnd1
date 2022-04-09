export const createEwpState = (state) => state.create_ewp;

export const getFilters = (state) => createEwpState(state).filters;
export const getLoading = (state) => createEwpState(state).loading;
export const getError = (state) => createEwpState(state).error;
export const getEwps = (state) => createEwpState(state).ewps.list_project;

export const getPats = (state) => createEwpState(state).dataPat;
export const getSelectedJadwalAudit = (state) =>
  createEwpState(state).selectedJadwalAudit;
export const getTahunPAT = (state) => getPats(state).tahun;
export const getTotalPAT = (state) => getPats(state).total_pat;
export const getListJadwalAudit = (state) => getPats(state).list_pat;
export const getTotalAudited = (state) => getPats(state).total_pat_audited;
export const getTotalNotAudited = (state) =>
  getPats(state).total_pat_notaudited;
export const getLoadingPat = (state) => createEwpState(state).loadingPat;
export const getErrorPat = (state) => createEwpState(state).errorPat;

export const getNonPATProjectType = (state) =>
  createEwpState(state).nonPATProjectType;

export const getNamaProjects = (state) => createEwpState(state).namaProject;
export const getModalVisible = (state) => createEwpState(state).modal;

export const getPageInfo = (state) => createEwpState(state).page;
export const getCurrentPage = (state) =>
  createEwpState(state).ewps.current_page;
export const getTotalPage = (state) => createEwpState(state).ewps.total_page;
export const getItemPerPage = (state) => getPageInfo(state).perPage;

export const getCreateLoading = (state) => createEwpState(state).createLoading;
export const getCreateError = (state) => createEwpState(state).createError;
export const getCreateData = (state) => createEwpState(state).createData;
export const getProjectData = (state) => createEwpState(state).projectData;

export const getCurrentProject = (state) =>
  createEwpState(state).currentProject;
export const getCurrentProjectLoading = (state) =>
  createEwpState(state).currentProjectLoading;
export const getCurrentProjectError = (state) =>
  createEwpState(state).currentProjectError;
export const getCurrentTimAudit = (state) =>
  createEwpState(state).currentProject.info_team_audit;
export const getCurrentProjectId = (state) =>
  createEwpState(state).currentProject.project_id;
export const getCurrentEWPId = (state) =>
  createEwpState(state).currentProject.id;

export const getAuditSource = (state) => createEwpState(state).auditSource;
