import { getToken } from "../../../auth/selectors";
import * as types from "./types";

export const fetchTimAudit = (mapa_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_START });
  const { error, data } = await api.getTimAuditMapa(getToken(getState()), mapa_id);
  console.log(data);
  if (!error) dispatch({ type: types.FETCH_SUCCESSFUL, payload: data });
  else
    dispatch({
      type: types.FETCH_FAILED,
      payload: error,
    });

  return !error;
};

export const postTimAudit = (mapa_id, values) => async (dispatch, getState, api) => {
  dispatch({ type: types.SUBMIT_START });
  const { error } = await api.postTimAuditMapa(getToken(getState()), mapa_id, values);
  if (!error) dispatch({ type: types.SUBMIT_SUCCESSFUL });
  else
    dispatch({
      type: types.SUBMIT_FAILED,
      payload: error,
    });

  return !error;
};
