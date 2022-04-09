import { getToken } from "../../../auth/selectors";
import * as types from "./types";

export const fetchMapaSampleFile = (mcr_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_MAPA_SAMPLE_FILE_START });
  const { error, data } = await api.getMapaSampleFile(getToken(getState()), mcr_id);
  if (!error) dispatch({ type: types.FETCH_MAPA_SAMPLE_FILE_SUCCESSFUL, payload: data });
  else dispatch({ type: types.FETCH_MAPA_SAMPLE_FILE_FAILED, payload: error });
  return !error;
};

export const fetchPoolSampleFile = (mcr_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_POOL_SAMPLE_FILE_START });
  const { error, data } = await api.getPoolSampleFile(getToken(getState()), mcr_id);
  if (!error) dispatch({ type: types.FETCH_POOL_SAMPLE_FILE_SUCCESSFUL, payload: data });
  else dispatch({ type: types.FETCH_POOL_SAMPLE_FILE_FAILED, payload: error });
  return !error;
};

export const submitUploadSampleFile =
  (mapa_id, mcr_id, file, desc) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_UPLOAD_SAMPLE_FILE_START });
    const { error } = await api.postUploadSampleFile(
      getToken(getState()),
      mapa_id,
      mcr_id,
      file,
      desc
    );
    if (!error) dispatch({ type: types.SUBMIT_UPLOAD_SAMPLE_FILE_SUCCESSFUL });
    else dispatch({ type: types.SUBMIT_UPLOAD_SAMPLE_FILE_FAILED, payload: error });
    return error;
  };

export const submitUpdateMapaSampleFile = (body) => async (dispatch, getState, api) => {
  dispatch({ type: types.SUBMIT_UPDATE_MAPA_SAMPLE_FILE_START });
  const { error } = await api.patchUpdateMapaSampleFile(getToken(getState()), body);
  if (!error) dispatch({ type: types.SUBMIT_UPDATE_MAPA_SAMPLE_FILE_SUCCESSFUL });
  else dispatch({ type: types.SUBMIT_UPDATE_MAPA_SAMPLE_FILE_FAILED, payload: error });
  return error;
};

export const submitSaveMapaSampleFile = (mcr_id, body) => async (dispatch, getState, api) => {
  dispatch({ type: types.SUBMIT_SAVE_MAPA_SAMPLE_FILE_START });
  const { error } = await api.postSaveMapaSampleFile(getToken(getState()), mcr_id, body);
  if (!error) dispatch({ type: types.SUBMIT_SAVE_MAPA_SAMPLE_FILE_SUCCESSFUL });
  else dispatch({ type: types.SUBMIT_SAVE_MAPA_SAMPLE_FILE_FAILED, payload: error });
  return error;
};

export const removeMapaSampleFile = (mcr_id, body) => async (dispatch, getState, api) => {
  dispatch({ type: types.DELETE_MAPA_SAMPLE_FILE_START });
  const { error } = await api.deleteMapaSampleFile(getToken(getState()), mcr_id, body);
  if (!error) dispatch({ type: types.DELETE_MAPA_SAMPLE_FILE_SUCCESSFUL });
  else dispatch({ type: types.DELETE_MAPA_SAMPLE_FILE_FAILED, payload: error });
  return error;
};

export const removePoolSampleFile = (file_pool_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.DELETE_POOL_SAMPLE_FILE_START });
  const { data, error } = await api.deletePoolSampleFile(getToken(getState()), file_pool_id);
  console.log(data);
  if (!error) dispatch({ type: types.DELETE_POOL_SAMPLE_FILE_SUCCESSFUL });
  else dispatch({ type: types.DELETE_POOL_SAMPLE_FILE_FAILED, payload: data.histories });
  return { error: error, data: data };
};
