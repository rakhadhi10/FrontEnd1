import { getToken } from "../../../auth/selectors";
import * as types from "./types";

export const fetchTujuan = (mapa_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_START });
  const { error, data } = await api.getTujuanMapa(getToken(getState()), mapa_id);

  if (!error) dispatch({ type: types.FETCH_SUCCESSFUL, payload: data });
  else
    dispatch({
      type: types.FETCH_FAILED,
      payload: error,
    });

  return !error;
};

export const postTujuan = (mapa_id, content) => async (dispatch, getState, api) => {
  dispatch({ type: types.SUBMIT_START });
  const { error } = await api.postTujuanMapa(getToken(getState()), mapa_id, content);
  if (!error) dispatch({ type: types.SUBMIT_SUCCESSFUL });
  else
    dispatch({
      type: types.SUBMIT_FAILED,
      payload: error,
    });

  return !error;
};
