import { getToken } from "../../../auth/selectors";
import * as types from "./types";

export const fetchJadwalAudit = (mapa_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_START });
  const { error, data } = await api.getMapaJadwalAudit(getToken(getState()), mapa_id);
  if (!error) dispatch({ type: types.FETCH_SUCCESSFUL, payload: data });
  else
    dispatch({
      type: types.FETCH_FAILED,
      payload: error,
    });
  return !error;
};

export const submitJadwalAudit = (mapa_id, body) => async (dispatch, getState, api) => {
  dispatch({ type: types.SUBMIT_START });
  const { status, error } = await api.postMapaJadwalAudit(getToken(getState()), mapa_id, body);
  if (!error) dispatch({ type: types.SUBMIT_SUCCESSFUL });
  else
    dispatch({
      type: types.SUBMIT_FAILED,
      payload: error,
    });
  return status;
};
