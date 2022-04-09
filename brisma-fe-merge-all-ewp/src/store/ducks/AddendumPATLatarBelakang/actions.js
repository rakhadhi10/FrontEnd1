import { getToken } from "../auth/selectors";
import * as types from "./types";

export const fetchLatarBelakang =
  (pat_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_START });
    const { error, data } = await api.getLatarBelakangAddendum(
      getToken(getState()),
      pat_id,
    );

    if (!error) dispatch({ type: types.FETCH_SUCCESSFUL, payload: data });
    else
      dispatch({
        type: types.FETCH_FAILED,
        payload: error,
      });

    return !error;
  };

export const postLatarBelakang =
  (pat_id, content, alasan_adendum) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_START });
    const form = {
      pat_id,
      part: "latar_belakang",
      alasan_adendum,
      sesudah: {
        latar_belakang: content,
      },
    };

    const { error } = await api.updateAddendum(getToken(getState()), form);
    if (!error) dispatch({ type: types.SUBMIT_SUCCESSFUL });
    else
      dispatch({
        type: types.SUBMIT_FAILED,
        payload: error,
      });

    return !error;
  };

export const reset = (pat_id) => async (dispatch, getState, api) => {
  const { error } = await api.resetAddendum(
    getToken(getState()),
    "latar_belakang",
    pat_id,
  );
  return !error;
};
