export const patAITIJadwalAuditState = (state) =>
  state.addendum_pat_aiti_jadwal_audit;

export const getJadwalAudit = (state) => patAITIJadwalAuditState(state).jadwal;
export const getLoading = (state) => patAITIJadwalAuditState(state).loading;
export const getError = (state) => patAITIJadwalAuditState(state).error;
export const getFilters = (state) => patAITIJadwalAuditState(state).filters;

export const getCreateModal = (state) =>
  patAITIJadwalAuditState(state).modal.create;
export const getEditModal = (state) =>
  patAITIJadwalAuditState(state).modal.edit;

export const getCurrentStep = (state) =>
  patAITIJadwalAuditState(state).currentStep;
export const getCurrentEditedId = (state) =>
  patAITIJadwalAuditState(state).currentEditedId;

export const getFormError = (state) => patAITIJadwalAuditState(state).formError;
export const getFormLoading = (state) =>
  patAITIJadwalAuditState(state).formLoading;
export const getFormStepOne = (state) =>
  patAITIJadwalAuditState(state).step["0"].form;
export const getFormStepTwo = (state) =>
  patAITIJadwalAuditState(state).step["1"].form;
export const getFormStepThree = (state) =>
  patAITIJadwalAuditState(state).step["2"];

export const getSelectedTim = (state) => getFormStepOne(state).tim;
export const getSelectedTipeAudit = (state) => getFormStepOne(state).tipe_audit;
export const getSelectedTemaAudit = (state) => getFormStepOne(state).tema;

export const getRows = (state) => getFormStepTwo(state).rows;
export const getEchannels = (state) => getFormStepTwo(state).echannels;

export const getBiayaKegiatan = (state) =>
  getFormStepThree(state).biaya_kegiatan;
export const getBiayaDinas = (state) => getFormStepThree(state).biaya_dinas;

export const getPageInfo = (state) => patAITIJadwalAuditState(state).page;
export const getCurrentPage = (state) => getPageInfo(state).currentPage;
export const getTotalPage = (state) => getPageInfo(state).totalPage;
export const getItemPerPage = (state) => getPageInfo(state).perPage;
