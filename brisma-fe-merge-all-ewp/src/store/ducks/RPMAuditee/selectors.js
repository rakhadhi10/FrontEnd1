export const rpmAuditeeState = (state) => state.rpm_auditee;

export const rpmAuditeeProjectsState = (state) =>
  rpmAuditeeState(state).projects;
export const getAuditeeProjectsLoading = (state) =>
  rpmAuditeeProjectsState(state).loading;
export const getAuditeeProjectsError = (state) =>
  rpmAuditeeProjectsState(state).error;
export const getAuditeeProjects = (state) =>
  rpmAuditeeProjectsState(state).data;

export const rpmAuditeeAssignState = (state) => rpmAuditeeState(state).assign;
export const getAssignProjectId = (state) =>
  rpmAuditeeAssignState(state).project_id;
export const getAssignLoading = (state) => rpmAuditeeAssignState(state).loading;
export const getAssignUpdateLoading = (state) =>
  rpmAuditeeAssignState(state).updateLoading;
export const getAssignError = (state) => rpmAuditeeAssignState(state).error;
export const getAssignMCS = (state) => rpmAuditeeAssignState(state).data;
export const getAssignModalOpen = (state) => rpmAuditeeAssignState(state).modal;

export const rpmAuditeeDetailsState = (state) => rpmAuditeeState(state).details;
export const getDetailsModalOpen = (state) =>
  rpmAuditeeDetailsState(state).modal;
export const getDetailsLoading = (state) =>
  rpmAuditeeDetailsState(state).loading;
export const getDetailsError = (state) => rpmAuditeeDetailsState(state).error;
export const getDetails = (state) => rpmAuditeeDetailsState(state).data;

export const rpmAuditeeKKPTState = (state) => rpmAuditeeState(state).kkpts;
export const getKKPTLoading = (state) => rpmAuditeeKKPTState(state).loading;
export const getKKPTError = (state) => rpmAuditeeKKPTState(state).error;
export const getKKPT = (state) => rpmAuditeeKKPTState(state).data.kkpt;
export const getKKPTMCS = (state) => rpmAuditeeKKPTState(state).data.mcs;

export const rpmAuditeeKKPTDetailsState = (state) =>
  rpmAuditeeState(state).kkpt_details;
export const getKKPTDetailsLoading = (state) =>
  rpmAuditeeKKPTDetailsState(state).loading;
export const getKKPTDetailsError = (state) =>
  rpmAuditeeKKPTDetailsState(state).error;
export const getKKPTDetails = (state) =>
  rpmAuditeeKKPTDetailsState(state).data.kkpt;
export const getKKPTDetailsMCS = (state) =>
  rpmAuditeeKKPTDetailsState(state).data.mcs;
export const getKKPTDetailsSurat = (state) =>
  rpmAuditeeKKPTDetailsState(state).data.surat;

export const rpmAuditeeDocumentsState = (state) =>
  rpmAuditeeState(state).documents;
export const getAuditeeDocumentsLoading = (state) =>
  rpmAuditeeDocumentsState(state).loading;
export const getAuditeeDocumentsError = (state) =>
  rpmAuditeeDocumentsState(state).error;
export const getAuditeeDocuments = (state) =>
  rpmAuditeeDocumentsState(state).data;
