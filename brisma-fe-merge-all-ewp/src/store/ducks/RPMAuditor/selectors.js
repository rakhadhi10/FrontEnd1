export const rpmAuditorState = (state) => state.rpm_auditor;

export const rpmAuditorProjectsState = (state) =>
  rpmAuditorState(state).projects;
export const getAuditorProjectsLoading = (state) =>
  rpmAuditorProjectsState(state).loading;
export const getAuditorProjectsError = (state) =>
  rpmAuditorProjectsState(state).error;
export const getAuditorProjects = (state) =>
  rpmAuditorProjectsState(state).data;

export const rpmAuditorAssignState = (state) => rpmAuditorState(state).assign;
export const getAssignProjectId = (state) =>
  rpmAuditorAssignState(state).project_id;
export const getAssignLoading = (state) => rpmAuditorAssignState(state).loading;
export const getAssignUpdateLoading = (state) =>
  rpmAuditorAssignState(state).updateLoading;
export const getAssignError = (state) => rpmAuditorAssignState(state).error;
export const getAssignMCS = (state) => rpmAuditorAssignState(state).data;
export const getAssignModalOpen = (state) => rpmAuditorAssignState(state).modal;

export const rpmAuditorDetailsState = (state) => rpmAuditorState(state).details;
export const getDetailsModalOpen = (state) =>
  rpmAuditorDetailsState(state).modal;
export const getDetailsLoading = (state) =>
  rpmAuditorDetailsState(state).loading;
export const getDetailsError = (state) => rpmAuditorDetailsState(state).error;
export const getDetails = (state) => rpmAuditorDetailsState(state).data;

export const rpmAuditorKKPTState = (state) => rpmAuditorState(state).kkpts;
export const getKKPTLoading = (state) => rpmAuditorKKPTState(state).loading;
export const getKKPTError = (state) => rpmAuditorKKPTState(state).error;
export const getKKPT = (state) => rpmAuditorKKPTState(state).data.kkpt;
export const getKKPTMCS = (state) => rpmAuditorKKPTState(state).data.mcs;

export const rpmAuditorKKPTDetailsState = (state) =>
  rpmAuditorState(state).kkpt_details;
export const getKKPTDetailsLoading = (state) =>
  rpmAuditorKKPTDetailsState(state).loading;
export const getKKPTDetailsError = (state) =>
  rpmAuditorKKPTDetailsState(state).error;
export const getKKPTDetails = (state) =>
  rpmAuditorKKPTDetailsState(state).data.kkpt;
export const getKKPTDetailsMCS = (state) =>
  rpmAuditorKKPTDetailsState(state).data.mcs;
export const getKKPTDetailsSurat = (state) =>
  rpmAuditorKKPTDetailsState(state).data.surat;

export const rpmAuditorDocumentsState = (state) =>
  rpmAuditorState(state).documents;
export const getAuditorDocumentsLoading = (state) =>
  rpmAuditorDocumentsState(state).loading;
export const getAuditorDocumentsError = (state) =>
  rpmAuditorDocumentsState(state).error;
export const getAuditorDocuments = (state) =>
  rpmAuditorDocumentsState(state).data;
