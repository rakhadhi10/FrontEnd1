import { getToken } from "../../auth/selectors";
import * as types from "./types";

export const fetchApprovalEwp = () => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_START });
  const { error, data } = await api.getApprovalEwp(getToken(getState()));

  if (!error) dispatch({ type: types.FETCH_SUCCESSFUL, payload: data });
  else
    dispatch({
      type: types.FETCH_FAILED,
      payload: error,
    });

  return !error;
};

export const postApprovalEwp =
  (dataForm) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_START });
    const { error } = await api.postApprovalEwp(getToken(getState()), dataForm);
    if (!error) dispatch({ type: types.SUBMIT_SUCCESSFUL });
    else
      dispatch({
        type: types.SUBMIT_FAILED,
        payload: error,
      });

    return !error;
  };
