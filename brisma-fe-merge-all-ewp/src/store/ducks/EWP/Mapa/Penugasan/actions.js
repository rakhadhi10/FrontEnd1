import { getToken } from "../../../auth/selectors";
import * as types from "./types";

export const fetchMapaPenugasan = (mapa_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_START });
  const { error, data } = await api.getMapaPenugasan(getToken(getState()), mapa_id);
  if (!error) dispatch({ type: types.FETCH_SUCCESSFUL, payload: data });
  else dispatch({ type: types.FETCH_FAILED, payload: error });
  return !error;
};

export const fetchSummaryMapaPenugasan = (mapa_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_SUMMARY_START });
  const { error, data } = await api.getSummaryMapaPenugasan(getToken(getState()), mapa_id);
  if (!error) dispatch({ type: types.FETCH_SUMMARY_SUCCESSFUL, payload: data });
  else dispatch({ type: types.FETCH_SUMMARY_FAILED, payload: error });
  return !error;
};

export const fetchMapaSamplePenugasan = (mcr_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_MAPA_SAMPLE_START });
  const { error, data } = await api.getMapaSamplePenugasan(getToken(getState()), mcr_id);
  if (!error) dispatch({ type: types.FETCH_MAPA_SAMPLE_SUCCESSFUL, payload: data });
  else dispatch({ type: types.FETCH_MAPA_SAMPLE_FAILED, payload: error });
  return !error;
};

export const submitAuditorPenugasan = (body) => async (dispatch, getState, api) => {
  dispatch({ type: types.SUBMIT_AUDITOR_START });
  const { error } = await api.patchSetAuditorPenugasan(getToken(getState()), body);
  if (!error) dispatch({ type: types.SUBMIT_AUDITOR_SUCCESSFUL });
  else dispatch({ type: types.SUBMIT_AUDITOR_FAILED, payload: error });
  return error;
};
