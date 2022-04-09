import { getToken } from "../../auth/selectors";
import * as types from "./types";

export const postAuditInfoEwp =
  (mapa_id, dataPost) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_START });
    const { error } = await api.postAuditInfoEwp(
      getToken(getState()),
      mapa_id,
      dataPost
    );
    if (!error) dispatch({ type: types.SUBMIT_SUCCESSFUL });
    else
      dispatch({
        type: types.SUBMIT_FAILED,
        payload: error,
      });

    return !error;
  };

export const getAuditInfoEwp =
  (project_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_START });
    const { error, data } = await api.getAuditInfoEwp(
      getToken(getState()),
      project_id
    );
    console.log(data);
    if (!error) dispatch({ type: types.FETCH_SUCCESSFUL, payload: data });
    else
      dispatch({
        type: types.FETCH_FAILED,
        payload: error,
      });

    return !error;
  };
