import { getToken } from "../../../auth/selectors";
import * as types from "./types";

export const fetchMapaSampleFRD =
  (mcr_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_MAPA_SAMPLE_FRD_START });
    const { error, data } = await api.getMapaSampleFRD(
      getToken(getState()),
      mcr_id
    );
    if (!error)
      dispatch({
        type: types.FETCH_MAPA_SAMPLE_FRD_SUCCESSFUL,
        payload: data,
      });
    else dispatch({ type: types.FETCH_MAPA_SAMPLE_FRD_FAILED, payload: error });
    return !error;
  };

export const fetchPoolSampleFRD = () => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_POOL_SAMPLE_FRD_START });
  const { error, data } = await api.getPoolSampleFRD(getToken(getState()));
  if (!error)
    dispatch({
      type: types.FETCH_POOL_SAMPLE_FRD_SUCCESSFUL,
      payload: data,
    });
  else dispatch({ type: types.FETCH_POOL_SAMPLE_FRD_FAILED, payload: error });
  return !error;
};

export const fetchContentPoolSampleFRD =
  (mcr_id, pool_frd_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_CONTENT_MAPA_SAMPLE_FRD_START });
    const { error, data } = await api.getContentPoolSampleFRD(
      getToken(getState()),
      mcr_id,
      pool_frd_id
    );
    if (!error)
      dispatch({
        type: types.FETCH_CONTENT_MAPA_SAMPLE_FRD_SUCCESSFUL,
        payload: data,
      });
    else
      dispatch({
        type: types.FETCH_CONTENT_MAPA_SAMPLE_FRD_FAILED,
        payload: error,
      });
    return !error;
  };

export const submitUpdateMapaSampleFRD =
  (mcr_id, body) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_UPDATE_MAPA_SAMPLE_FRD_START });
    const { error } = await api.patchMapaSampleFRD(
      getToken(getState()),
      mcr_id,
      body
    );
    if (!error)
      dispatch({ type: types.SUBMIT_UPDATE_MAPA_SAMPLE_FRD_SUCCESSFUL });
    else
      dispatch({
        type: types.SUBMIT_UPDATE_MAPA_SAMPLE_FRD_FAILED,
        payload: error,
      });
    return error;
  };

export const removeMapaSampleFRD =
  (mcr_id, body) => async (dispatch, getState, api) => {
    dispatch({ type: types.DELETE_MAPA_SAMPLE_FRD_START });
    const { error } = await api.deleteMapaSampleFRD(
      getToken(getState()),
      mcr_id,
      body
    );
    if (!error) dispatch({ type: types.DELETE_MAPA_SAMPLE_FRD_SUCCESSFUL });
    else
      dispatch({
        type: types.DELETE_MAPA_SAMPLE_FRD_FAILED,
        payload: error,
      });
    return error;
  };
