import { getToken } from "../auth/selectors";
import * as types from "./types";

export const fetchDocumentHistory =
  (pat_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_DOCUMENTS_START });

    const { error, data } = await api.getDocumentHistory(
      getToken(getState()),
      pat_id,
    );

    if (!error) {
      dispatch({
        type: types.FETCH_DOCUMENTS_SUCCESSFUL,
        payload: data,
      });
    } else {
      dispatch({ type: types.FETCH_DOCUMENTS_FAILED, payload: error });
    }

    return !error;
  };
