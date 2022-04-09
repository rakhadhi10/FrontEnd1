export const patAnggaranState = state => state.pat_anggaran;

export const getData = state => patAnggaranState(state).data;
export const getLoading = (state) => patAnggaranState(state).loading;
export const getError = (state) => patAnggaranState(state).error;
export const getFilters = (state) => patAnggaranState(state).filters;

export const getCreateModal = (state) => patAnggaranState(state).modal.create;
export const getEditModal = (state) => patAnggaranState(state).modal.edit;

export const getCurrentStep = (state) => patAnggaranState(state).currentStep;
export const getFormStepOne = (state) => patAnggaranState(state).step["0"].form;

export const getAnggota = (state) => patAnggaranState(state).step["1"].anggota;

export const getFormStepThree = (state) => patAnggaranState(state).step["2"];
export const getBiayaDinas = (state) => getFormStepThree(state).biaya_dinas;
export const getBiayaKegiatan = (state) => getFormStepThree(state).biaya_kegiatan;

export const getFormLoading = (state) => patAnggaranState(state).formLoading;
export const getDeleteLoading = (state) => patAnggaranState(state).deleteLoading;

export const getPageInfo = (state) => patAnggaranState(state).page;
export const getCurrentPage = (state) => getPageInfo(state).currentPage;
export const getTotalPage = (state) => getPageInfo(state).totalPage;
export const getItemPerPage = (state) => getPageInfo(state).perPage;

export const getEditFormError = (state) => patAnggaranState(state).editFormError;
export const getEditFormLoading = (state) => patAnggaranState(state).editFormLoading;
export const getEditState = (state) => patAnggaranState(state).edit;
export const getCurrentEditedId = (state) => getEditState(state).currentId;
export const getEditFetchLoading = (state) => getEditState(state).fetchLoading;
export const getEditFetchError = (state) => getEditState(state).fetchError;