import { getToken } from "../auth/selectors";
import * as types from "./types";

export const fetchSumberInformasi =
  (pat_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_START });
    const { error, data } = await api.getSumberInformasiAddendum(
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

export const postSumberInformasi =
  (pat_id, content, alasan_adendum) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_START });
    const form = {
      pat_id,
      part: "sumber_informasi",
      alasan_adendum,
      sesudah: {
        sumber_informasi: content,
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
    "sumber_informasi",
    pat_id,
  );
  return !error;
};
