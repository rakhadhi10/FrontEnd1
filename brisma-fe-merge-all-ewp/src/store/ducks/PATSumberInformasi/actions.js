import { getToken } from "../auth/selectors";
import * as types from "./types";

export const fetchSumberInformasi =
  (pat_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_START });
    const { error, data } = await api.getSumberInformasi(
      getToken(getState()),
      pat_id,
    );
    if (!error) {
      dispatch({ type: types.FETCH_SUCCESSFUL, payload: data });
    } else
      dispatch({
        type: types.FETCH_FAILED,
        payload: error,
      });

    return !error;
  };

export const postSumberInformasi =
  (pat_id, content) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_START });
    const { error } = await api.postSumberInformasi(
      getToken(getState()),
      pat_id,
      content,
    );
    if (!error) dispatch({ type: types.SUBMIT_SUCCESSFUL });
    else
      dispatch({
        type: types.SUBMIT_FAILED,
        payload: error,
      });

    return !error;
  };
