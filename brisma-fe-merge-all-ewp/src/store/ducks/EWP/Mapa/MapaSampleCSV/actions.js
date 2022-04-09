import { getToken } from "../../../auth/selectors";
import * as types from "./types";

export const fetchMapaSampleCSV = (mcr_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_MAPA_SAMPLE_CSV_START });
  const { error, data } = await api.getMapaSampleCSV(getToken(getState()), mcr_id);
  if (!error) dispatch({ type: types.FETCH_MAPA_SAMPLE_CSV_SUCCESSFUL, payload: data });
  else dispatch({ type: types.FETCH_MAPA_SAMPLE_CSV_FAILED, payload: error });
  return !error;
};

export const fetchPoolSampleCSV = () => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_POOL_SAMPLE_CSV_START });
  const { error, data } = await api.getPoolSampleCSV(getToken(getState()));
  if (!error) dispatch({ type: types.FETCH_POOL_SAMPLE_CSV_SUCCESSFUL, payload: data });
  else dispatch({ type: types.FETCH_POOL_SAMPLE_CSV_FAILED, payload: error });
  return !error;
};

export const fetchContentPoolSampleCSV = (mcr_id, body) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_CONTENT_POOL_SAMPLE_CSV_START });
  const { error, data } = await api.getContentPoolSampleCSV(getToken(getState()), mcr_id, body);
  if (!error) dispatch({ type: types.FETCH_CONTENT_POOL_SAMPLE_CSV_SUCCESSFUL, payload: data });
  else dispatch({ type: types.FETCH_CONTENT_POOL_SAMPLE_CSV_FAILED, payload: error });
  return !error;
};

export const submitPoolMapaSampleCSV =
  (mapa_id, mcr_id, file, body) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_UPLOAD_SAMPLE_CSV_START });
    const { error } = await api.postPoolMapaSampleCSV(
      getToken(getState()),
      mapa_id,
      mcr_id,
      file,
      body
    );
    if (!error) dispatch({ type: types.SUBMIT_UPLOAD_SAMPLE_CSV_SUCCESSFUL });
    else dispatch({ type: types.SUBMIT_UPLOAD_SAMPLE_CSV_FAILED, payload: error });
    return error;
  };

export const submitUpdateMapaSampleCSV = (mcr_id, body) => async (dispatch, getState, api) => {
  dispatch({ type: types.SUBMIT_UPDATE_MAPA_SAMPLE_CSV_START });
  const { error } = await api.patchUpdateMapaSampleCSV(getToken(getState()), mcr_id, body);
  if (!error) dispatch({ type: types.SUBMIT_UPDATE_MAPA_SAMPLE_CSV_SUCCESSFUL });
  else dispatch({ type: types.SUBMIT_UPDATE_MAPA_SAMPLE_CSV_FAILED, payload: error });
  return error;
};

export const removeMapaSampleCSV = (mcr_id, body) => async (dispatch, getState, api) => {
  dispatch({ type: types.DELETE_MAPA_SAMPLE_CSV_START });
  const { error } = await api.deleteMapaSampleCSV(getToken(getState()), mcr_id, body);
  if (!error) dispatch({ type: types.DELETE_MAPA_SAMPLE_CSV_SUCCESSFUL });
  else dispatch({ type: types.DELETE_MAPA_SAMPLE_CSV_FAILED, payload: error });
  return error;
};

export const removePoolSampleCSV = (csv_pool_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.DELETE_POOL_SAMPLE_CSV_START });
  const { data, error } = await api.deletePoolSampleCSV(getToken(getState()), csv_pool_id);
  console.log(data);
  if (!error) dispatch({ type: types.DELETE_POOL_SAMPLE_CSV_SUCCESSFUL });
  else dispatch({ type: types.DELETE_POOL_SAMPLE_CSV_FAILED, payload: data.histories });
  return { error: error, data: data };
};
