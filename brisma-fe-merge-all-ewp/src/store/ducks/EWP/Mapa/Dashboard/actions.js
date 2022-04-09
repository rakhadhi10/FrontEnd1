import { getToken } from "../../../auth/selectors";
import * as types from "./types";

export const fetchDashboard = (project_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_START });
  const { error, data } = await api.getDashboardMapa(getToken(getState()), project_id);

  if (!error) dispatch({ type: types.FETCH_SUCCESSFUL, payload: data });
  else
    dispatch({
      type: types.FETCH_FAILED,
      payload: error,
    });

  return !error;
};

export const setPosisi = (posisi) => ({
  type: types.SET_POSISI,
  payload: posisi,
});
