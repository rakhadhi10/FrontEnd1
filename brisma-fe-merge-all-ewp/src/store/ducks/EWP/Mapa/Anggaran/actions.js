import { getToken } from "../../../auth/selectors";
import * as types from "./types";

export const fetchAnggaran = (mapa_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_START });
  const { error, data } = await api.getMapaAnggaran(getToken(getState()), mapa_id);
  if (!error) dispatch({ type: types.FETCH_SUCCESSFUL, payload: data });
  else dispatch({ type: types.FETCH_FAILED, payload: error });
  return !error;
};

export const fetchAnggaranInit = (mapa_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_INIT_START });
  const { error, data } = await api.getMapaAnggaranInit(getToken(getState()), mapa_id);
  if (!error) dispatch({ type: types.FETCH_INIT_SUCCESSFUL, payload: data });
  else dispatch({ type: types.FETCH_INIT_FAILED, payload: error });
  return !error;
};

export const submitAnggaran = (mapa_id, body) => async (dispatch, getState, api) => {
  dispatch({ type: types.SUBMIT_START });
  const { error, status } = await api.postMapaAnggaran(getToken(getState()), mapa_id, body);
  if (!error) dispatch({ type: types.SUBMIT_SUCCESSFUL });
  else dispatch({ type: types.SUBMIT_FAILED, payload: error });
  return status;
};

export const fetchTipeAnggaran = () => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_TIPE_ANGGARAN_START });
  const { error, data } = await api.getTipeAnggaran(getToken(getState()));
  if (!error) dispatch({ type: types.FETCH_TIPE_ANGGARAN_SUCCESSFUL, payload: data });
  else dispatch({ type: types.FETCH_TIPE_ANGGARAN_FAILED, payload: error });
  return !error;
};

export const updateAnggaran =
  (mapa_id, mapa_anggaran_id, body) => async (dispatch, getState, api) => {
    dispatch({ type: types.UPDATE_START });
    const { error, status } = await api.putMapaAnggaran(
      getToken(getState()),
      mapa_id,
      mapa_anggaran_id,
      body
    );
    if (!error) dispatch({ type: types.UPDATE_SUCCESSFUL });
    else dispatch({ type: types.UPDATE_FAILED, payload: error });
    return status;
  };

export const deleteAnggaran = (mapa_id, mapa_anggaran_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.DELETE_START });
  const { error, status } = await api.deleteMapaAnggaran(
    getToken(getState()),
    mapa_id,
    mapa_anggaran_id
  );
  if (!error) dispatch({ type: types.DELETE_SUCCESSFUL });
  else dispatch({ type: types.DELETE_FAILED, payload: error });
  return status;
};
