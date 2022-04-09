export const patJadwalSbpState = (state) => state.pat_jadwal_sbp;

export const getJadwalSbp = (state) => patJadwalSbpState(state).jadwal;
export const getLoading = (state) => patJadwalSbpState(state).loading;
export const getError = (state) => patJadwalSbpState(state).error;
export const getFilters = (state) => patJadwalSbpState(state).filters;

export const getCurrentStep = (state) => patJadwalSbpState(state).currentStep;
export const getCreateModal = (state) => patJadwalSbpState(state).modal.create;
export const getEditModal = (state) => patJadwalSbpState(state).modal.edit;

export const getFormStepOne = (state) =>
  patJadwalSbpState(state).step["0"].form;
export const getFormStepTwo = (state) =>
  patJadwalSbpState(state).step["1"].form;
export const getFormStepThree = (state) => patJadwalSbpState(state).step["2"];

export const getPembicara = (state) => getFormStepTwo(state).pn_pembicara;
export const getPenanggungJawab = (state) =>
  getFormStepTwo(state).pn_penanggung_jawab;

export const getBiayaDinas = (state) => getFormStepThree(state).biaya_dinas;
export const getBiayaKegiatan = (state) =>
  getFormStepThree(state).biaya_kegiatan;

export const getFormLoading = (state) => patJadwalSbpState(state).formLoading;
export const getFormError = (state) => patJadwalSbpState(state).formError;
export const getDeleteLoading = (state) =>
  patJadwalSbpState(state).deleteLoading;

export const getPageInfo = (state) => patJadwalSbpState(state).page;
export const getCurrentPage = (state) => getPageInfo(state).currentPage;
export const getTotalPage = (state) => getPageInfo(state).totalPage;
export const getItemPerPage = (state) => getPageInfo(state).perPage;

export const getEditFormError = (state) =>
  patJadwalSbpState(state).editFormError;
export const getEditFormLoading = (state) =>
  patJadwalSbpState(state).editFormLoading;
export const getEditState = (state) => patJadwalSbpState(state).edit;
export const getCurrentEditedId = (state) => getEditState(state).currentId;
export const getEditFetchLoading = (state) => getEditState(state).fetchLoading;
export const getEditFetchError = (state) => getEditState(state).fetchError;
