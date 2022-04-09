import { getToken } from "../auth/selectors";
import * as types from "./types";

export const fetchStatus = (pat_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_STATUS_START });
  const patStatus = api.getPATStatus(getToken(getState()), pat_id);
  const addendumStatus = api.getAddendumStatus(getToken(getState()), pat_id);
  const [
    { error: errorPat, data: dataPat },
    { error: errAddendum, data: dataAddendum },
  ] = await Promise.all([patStatus, addendumStatus]);

  if (!errorPat && !errAddendum)
    dispatch({
      type: types.FETCH_STATUS_SUCCESS,
      payload: { ...dataPat, addendum_status: { ...dataAddendum } },
    });
  else
    dispatch({
      type: types.FETCH_STATUS_FAIL,
      payload: errorPat || errAddendum,
    });
  return !errorPat && !errAddendum;
};

export const createAddendum =
  (pat_id, by = {}) =>
  async (dispatch, getState, api) => {
    const { error } = await api.createAddendum(
      getToken(getState()),
      pat_id,
      by,
    );

    return error;
  };
