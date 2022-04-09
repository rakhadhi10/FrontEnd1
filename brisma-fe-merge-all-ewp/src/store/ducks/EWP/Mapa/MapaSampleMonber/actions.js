import { getToken } from "../../../auth/selectors";
import * as types from "./types";

export const fetchMapaSampleMonber =
  (mcr_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_MAPA_SAMPLE_MONBER_START });
    const { error, data } = await api.getMapaSampleMonber(
      getToken(getState()),
      mcr_id
    );
    if (!error)
      dispatch({
        type: types.FETCH_MAPA_SAMPLE_MONBER_SUCCESSFUL,
        payload: data,
      });
    else
      dispatch({ type: types.FETCH_MAPA_SAMPLE_MONBER_FAILED, payload: error });
    return !error;
  };

export const fetchPoolSampleMonber = () => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_POOL_SAMPLE_MONBER_START });
  const { error, data } = await api.getPoolSampleMonber(getToken(getState()));
  if (!error)
    dispatch({
      type: types.FETCH_POOL_SAMPLE_MONBER_SUCCESSFUL,
      payload: data,
    });
  else
    dispatch({ type: types.FETCH_POOL_SAMPLE_MONBER_FAILED, payload: error });
  return !error;
};

export const fetchContentPoolSampleMonber =
  (mcr_id, pool_monber_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_CONTENT_MAPA_SAMPLE_MONBER_START });
    const { error, data } = await api.getContentPoolSampleMonber(
      getToken(getState()),
      mcr_id,
      pool_monber_id
    );
    if (!error)
      dispatch({
        type: types.FETCH_CONTENT_MAPA_SAMPLE_MONBER_SUCCESSFUL,
        payload: data,
      });
    else
      dispatch({
        type: types.FETCH_CONTENT_MAPA_SAMPLE_MONBER_FAILED,
        payload: error,
      });
    return !error;
  };

export const submitUpdateMapaSampleMonber =
  (mcr_id, body) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_UPDATE_MAPA_SAMPLE_MONBER_START });
    const { error } = await api.patchMapaSampleMonber(
      getToken(getState()),
      mcr_id,
      body
    );
    if (!error)
      dispatch({ type: types.SUBMIT_UPDATE_MAPA_SAMPLE_MONBER_SUCCESSFUL });
    else
      dispatch({
        type: types.SUBMIT_UPDATE_MAPA_SAMPLE_MONBER_FAILED,
        payload: error,
      });
    return error;
  };

export const removeMapaSampleMonber =
  (mcr_id, body) => async (dispatch, getState, api) => {
    dispatch({ type: types.DELETE_MAPA_SAMPLE_MONBER_START });
    const { error } = await api.deleteMapaSampleMonber(
      getToken(getState()),
      mcr_id,
      body
    );
    if (!error) dispatch({ type: types.DELETE_MAPA_SAMPLE_MONBER_SUCCESSFUL });
    else
      dispatch({
        type: types.DELETE_MAPA_SAMPLE_MONBER_FAILED,
        payload: error,
      });
    return error;
  };
