export const patProjectState = (state) => state.pat_project;
export const getAllStatus = (state) => patProjectState(state).data;
export const getLoading = (state) => patProjectState(state).loading;
export const getError = (state) => patProjectState(state).error;

export const getAddendumStatus = (state) => getAllStatus(state).addendum_status;
export const getAddendumDetail = (state) =>
  getAddendumStatus(state).adendum_detail;
export const getMakerAddendum = (state) => {
  const addendum_detail = getAddendumDetail(state);
  if (!addendum_detail) return null;
  return addendum_detail.by;
};
export const getMakerAddendumPN = (state) => {
  const by = getMakerAddendum(state);
  if (!by) return null;
  return by.pn;
};
