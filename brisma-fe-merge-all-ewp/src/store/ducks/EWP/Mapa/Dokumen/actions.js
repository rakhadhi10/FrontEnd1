import { getToken } from "../../../auth/selectors";
import { getReason } from "./selectors";
import * as types from "./types";

export const fetchMapaDokumen =
  (mapa_id, params) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_START });
    const { error, data } = await api.getDokumenMapa(
      getToken(getState()),
      mapa_id,
      params
    );
    if (!error) dispatch({ type: types.FETCH_SUCCESSFUL, payload: data });
    else dispatch({ type: types.FETCH_FAILED, payload: error });
    return error;
  };

export const fetchKomenMapaDokumen =
  (mapa_id, bab) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_KOMEN_START });
    const { error, data } = await api.getKomenMapaDokumen(
      getToken(getState()),
      mapa_id,
      bab
    );
    if (!error) dispatch({ type: types.FETCH_KOMEN_SUCCESSFUL, payload: data });
    else dispatch({ type: types.FETCH_KOMEN_FAILED, payload: error });
    return error;
  };

export const submitKomenMapaDokumen =
  (mapa_id, body) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_KOMEN_START });
    const { error } = await api.postKomenMapaDokumen(
      getToken(getState()),
      mapa_id,
      body
    );
    if (!error) dispatch({ type: types.SUBMIT_KOMEN_SUCCESSFUL });
    else dispatch({ type: types.SUBMIT_KOMEN_FAILED, payload: error });
    return error;
  };

export const submitCloseKomenMapaDokumen =
  (mapa_id, parent_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_CLOSE_KOMEN_START });
    const { error } = await api.patchCloseKomenMapaDokumen(
      getToken(getState()),
      mapa_id,
      parent_id
    );
    if (!error) dispatch({ type: types.SUBMIT_CLOSE_KOMEN_SUCCESSFUL });
    else dispatch({ type: types.SUBMIT_CLOSE_KOMEN_FAILED, payload: error });
    return error;
  };

export const submitApprovalMapaDoc =
  (mapa_id, body) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_APPROVAL_DOC_START });
    const newBody = { ...body, note: getReason(getState()) };
    const { data, message, error } = await api.postApprovalMapaDoc(
      getToken(getState()),
      mapa_id,
      newBody
    );
    if (!error)
      dispatch({ type: types.SUBMIT_APPROVAL_DOC_SUCCESSFUL, payload: data });
    else dispatch({ type: types.SUBMIT_APPROVAL_DOC_FAILED, payload: error });
    return { error: error, message: message };
  };

export const setReason = (note) => ({
  type: types.SET_REASON,
  payload: note,
});
