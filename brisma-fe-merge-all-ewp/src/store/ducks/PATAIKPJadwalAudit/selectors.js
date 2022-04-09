export const patAIKPJadwalAuditState = (state) => state.pat_aikp_jadwal_audit;

export const getJadwalAudit = (state) => patAIKPJadwalAuditState(state).jadwal;
export const getLoading = (state) => patAIKPJadwalAuditState(state).loading;
export const getError = (state) => patAIKPJadwalAuditState(state).error;
export const getFilters = (state) => patAIKPJadwalAuditState(state).filters;

export const getCreateModal = (state) =>
  patAIKPJadwalAuditState(state).modal.create;
export const getEditModal = (state) =>
  patAIKPJadwalAuditState(state).modal.edit;

export const getCurrentStep = (state) =>
  patAIKPJadwalAuditState(state).currentStep;
export const getCurrentEditedId = (state) =>
  patAIKPJadwalAuditState(state).currentEditedId;

export const getFormError = (state) => patAIKPJadwalAuditState(state).formError;
export const getFormLoading = (state) =>
  patAIKPJadwalAuditState(state).formLoading;
export const getFormStepOne = (state) =>
  patAIKPJadwalAuditState(state).step["0"].form;
export const getFormStepTwo = (state) =>
  patAIKPJadwalAuditState(state).step["1"].form;
export const getFormStepThree = (state) =>
  patAIKPJadwalAuditState(state).step["2"];

export const getSelectedTim = (state) => getFormStepOne(state).tim;
export const getSelectedTipeAudit = (state) => getFormStepOne(state).tipe_audit;
export const getSelectedTemaAudit = (state) => getFormStepOne(state).tema;
export const getUkerInduk = (state) => getFormStepOne(state).uker;

export const getRows = (state) => getFormStepTwo(state).rows;
export const getSpecialTematikRows = (state) =>
  getFormStepTwo(state).specialTematikRows;
export const getEchannels = (state) => getFormStepTwo(state).echannels;

export const getRegulerModal = (state) =>
  patAIKPJadwalAuditState(state).step["1"].modal.reguler;
export const getSpesialTematikModal = (state) =>
  patAIKPJadwalAuditState(state).step["1"].modal.spesialTematik;

export const getBiayaKegiatan = (state) =>
  getFormStepThree(state).biaya_kegiatan;
export const getBiayaDinas = (state) => getFormStepThree(state).biaya_dinas;

export const getPageInfo = (state) => patAIKPJadwalAuditState(state).page;
export const getCurrentPage = (state) => getPageInfo(state).currentPage;
export const getTotalPage = (state) => getPageInfo(state).totalPage;
export const getItemPerPage = (state) => getPageInfo(state).perPage;
