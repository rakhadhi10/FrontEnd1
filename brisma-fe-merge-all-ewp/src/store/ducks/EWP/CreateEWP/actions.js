import { getToken } from "../../auth/selectors";
import * as types from "./types";

export const openModal = () => ({ type: types.OPEN_MODAL });
export const closeModal = () => ({ type: types.CLOSE_MODAL });

export const changePage = (page) => ({
  type: types.CHANGE_PAGE,
  payload: page,
});

export const updateFilterForm = (filters) => ({
  type: types.UPDATE_FILTER_FORM,
  payload: filters,
});
export const updateSortBy = (value) => ({
  type: types.UPDATE_SORT_BY,
  payload: value,
});

export const setAuditSource = (source) => ({
  type: types.SET_AUDIT_SOURCE,
  payload: source,
});

export const setJadwalAudit = (data) => ({
  type: types.SET_JADWAL_AUDIT,
  payload: data,
});

export const setNonPATProjectType = (data) => ({
  type: types.SET_NON_PAT_PROJECT_TYPE,
  payload: data,
});

export const currentProject = (id) => async (dispatch, getState, api) => {
  dispatch({ type: types.CURRENT_PROJECT_START });
  const { data, error } = await api.getSingleEwp(getToken(getState()), id);
  console.log(data);
  if (!error)
    dispatch({ type: types.CURRENT_PROJECT_SUCCESFUL, payload: data });
  else dispatch({ type: types.CURRENT_PROJECT_FAILED, payload: error });
  return error;
};

export const fetchEWPs = (filters) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_START });

  const { data, error } = await api.getEwp(getToken(getState()), filters);
  console.log(data);
  if (!error) dispatch({ type: types.FETCH_SUCCESSFUL, payload: data });
  else
    dispatch({
      type: types.FETCH_FAILED,
      payload: error,
    });
  return error;
};

export const fetchPats = (params) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_PAT_START });
  const { data, error } = await api.getPatEwp(getToken(getState()), params);
  if (!error) {
    dispatch({
      type: types.FETCH_PAT_SUCCESSFUL,
      payload: data,
    });
  } else {
    console.log(error);
    dispatch({
      type: types.FETCH_PAT_FAILED,
      payload: error,
    });
  }
};

export const createEwp = (dataEwp) => async (dispatch, getState, api) => {
  dispatch({ type: types.CREATE_START, payload: dataEwp });
  const { error, data } = await api.postEwp(getToken(getState()), dataEwp);
  if (!error) dispatch({ type: types.CREATE_SUCCESSFUL, payload: data });
  else
    dispatch({
      type: types.CREATE_FAILED,
      payload: error,
    });

  return error;
};

export const disabledEwp = (dataEwp) => async (dispatch, getState, api) => {
  dispatch({ type: types.DISABLE_START });
  const { error } = await api.patchDisableEwp(getToken(getState()), dataEwp);
  if (!error) dispatch({ type: types.DISABLE_SUCCESSFUL });
  else
    dispatch({
      type: types.DISABLE_FAILED,
      payload: error,
    });

  return !error;
};
