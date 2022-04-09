import { getToken } from "../../auth/selectors";
import * as types from "./types";

export const fetchApprovalDetailEwp =
  (mapa_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_START });
    const { error, data } = await api.getApprovalDetailEwp(
      getToken(getState()),
      mapa_id
    );

    if (!error) dispatch({ type: types.FETCH_SUCCESSFUL, payload: data });
    else
      dispatch({
        type: types.FETCH_FAILED,
        payload: error,
      });

    return !error;
  };
