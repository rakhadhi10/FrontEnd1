export const patAIWJadwalAuditState = (state) =>
  state.addendum_pat_aiw_jadwal_audit;

export const getJadwalAudit = (state) => patAIWJadwalAuditState(state).jadwal;
export const getLoading = (state) => patAIWJadwalAuditState(state).loading;
export const getError = (state) => patAIWJadwalAuditState(state).error;
export const getFilters = (state) => patAIWJadwalAuditState(state).filters;

export const getCreateModal = (state) =>
  patAIWJadwalAuditState(state).modal.create;
export const getEditModal = (state) => patAIWJadwalAuditState(state).modal.edit;

export const getFormError = (state) => patAIWJadwalAuditState(state).formError;
export const getFormLoading = (state) =>
  patAIWJadwalAuditState(state).formLoading;

export const getCurrentStep = (state) =>
  patAIWJadwalAuditState(state).currentStep;
export const getCurrentEditedId = (state) =>
  patAIWJadwalAuditState(state).currentEditedId;

export const getFormStepOne = (state) =>
  patAIWJadwalAuditState(state).step["0"].form;
export const getFormStepTwo = (state) =>
  patAIWJadwalAuditState(state).step["1"].form;
export const getFormStepThree = (state) =>
  patAIWJadwalAuditState(state).step["2"];

export const getSelectedTim = (state) => getFormStepOne(state).tim;
export const getSelectedTipeAudit = (state) => getFormStepOne(state).tipe_audit;
export const getSelectedTemaAudit = (state) => getFormStepOne(state).tema;
export const getUkerInduk = (state) => getFormStepOne(state).uker;

export const getRows = (state) => getFormStepTwo(state).rows;
export const getSpecialTematikRows = (state) =>
  getFormStepTwo(state).specialTematikRows;
export const getEchannels = (state) => getFormStepTwo(state).echannels;

export const getRegulerModal = (state) =>
  patAIWJadwalAuditState(state).step["1"].modal.reguler;
export const getSpesialTematikModal = (state) =>
  patAIWJadwalAuditState(state).step["1"].modal.spesialTematik;

export const getBiayaKegiatan = (state) =>
  getFormStepThree(state).biaya_kegiatan;
export const getBiayaDinas = (state) => getFormStepThree(state).biaya_dinas;

export const getPageInfo = (state) => patAIWJadwalAuditState(state).page;
export const getCurrentPage = (state) => getPageInfo(state).currentPage;
export const getTotalPage = (state) => getPageInfo(state).totalPage;
export const getItemPerPage = (state) => getPageInfo(state).perPage;
