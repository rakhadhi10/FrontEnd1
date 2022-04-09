import { getToken } from "../auth/selectors";
import {
  getRefEchannelFetched,
  getRefKategoriAnggaranFetched,
  getRefTeamsFetched,
  getRefTemaAuditFetched,
  getRefTipeAuditFetched,
  getRefTipeObjekFetched,
} from "./selectors";
import * as types from "./types";

export const fetchRefTipeAudit = (uka) => async (dispatch, getState, api) => {
  if (getRefTipeAuditFetched(getState())) return;

  dispatch({ type: types.FETCH_TIPE_AUDIT_START });
  const { error, data } = await api.getRefTipeAudit(getToken(getState()), uka);

  if (!error)
    dispatch({ type: types.FETCH_TIPE_AUDIT_SUCCESSFUL, payload: data });
  else dispatch({ type: types.FETCH_TIPE_AUDIT_FAILED, payload: error });

  return !error;
};

export const fetchRefTemaAudit = () => async (dispatch, getState, api) => {
  if (getRefTemaAuditFetched(getState())) return;

  dispatch({ type: types.FETCH_TEMA_AUDIT_START });
  const { error, data } = await api.getRefTemaAudit(getToken(getState()));

  if (!error)
    dispatch({ type: types.FETCH_TEMA_AUDIT_SUCCESSFUL, payload: data });
  else
    dispatch({
      type: types.FETCH_TEMA_AUDIT_FAILED,
      payload: "Error when fetching tema audit reference",
    });

  return !error;
};

export const fetchRefTipeObjek = () => async (dispatch, getState, api) => {
  if (getRefTipeObjekFetched(getState())) return;

  dispatch({ type: types.FETCH_TIPE_OBJEK_START });
  const { error, data } = await api.getRefTipeObjek(getToken(getState()));

  if (!error)
    dispatch({ type: types.FETCH_TIPE_OBJEK_SUCCESSFUL, payload: data });
  else
    dispatch({
      type: types.FETCH_TIPE_OBJEK_FAILED,
      payload: "Error when fetching tipe objek reference",
    });

  return !error;
};

export const fetchRefKategoriAnggaran =
  () => async (dispatch, getState, api) => {
    if (getRefKategoriAnggaranFetched(getState())) return;

    dispatch({ type: types.FETCH_KATEGORI_ANGGARAN_START });
    const { error, data } = await api.getRefKategoriAnggaran(
      getToken(getState())
    );
    if (!error)
      dispatch({
        type: types.FETCH_KATEGORI_ANGGARAN_SUCCESSFUL,
        payload: data,
      });
    else
      dispatch({
        type: types.FETCH_KATEGORI_ANGGARAN_FAILED,
        payload: "Error when fetching kategori anggaran reference",
      });

    return !error;
  };

export const fetchRefTeams = (pat_id) => async (dispatch, getState, api) => {
  if (getRefTeamsFetched(getState())) return;

  dispatch({ type: types.FETCH_TEAMS_START });
  const { error, data } = await api.getRefTeams(getToken(getState()), pat_id);
  if (!error) dispatch({ type: types.FETCH_TEAMS_SUCCESSFUL, payload: data });
  else
    dispatch({
      type: types.FETCH_TEAMS_FAILED,
      payload: "Error when fetching teams reference",
    });

  return !error;
};

export const fetchRefTeamsAddendum =
  (pat_id) => async (dispatch, getState, api) => {
    if (getRefTeamsFetched(getState())) return;

    dispatch({ type: types.FETCH_TEAMS_ADDENDUM_START });
    const { error, data } = await api.getRefTeamsAddendum(
      getToken(getState()),
      pat_id
    );
    if (!error)
      dispatch({ type: types.FETCH_TEAMS_ADDENDUM_SUCCESSFUL, payload: data });
    else
      dispatch({
        type: types.FETCH_TEAMS_ADDENDUM_FAILED,
        payload: "Error when fetching teams reference",
      });

    return !error;
  };

export const fetchRefEchannel = () => async (dispatch, getState, api) => {
  if (getRefEchannelFetched(getState())) return;

  dispatch({ type: types.FETCH_ECHANNEL_START });
  const { error, data } = await api.getRefEchannel(getToken(getState()));
  if (!error)
    dispatch({ type: types.FETCH_ECHANNEL_SUCCESSFUL, payload: data });
  else
    dispatch({
      type: types.FETCH_ECHANNEL_FAILED,
      payload: "Error when fetching e-channel reference",
    });

  return !error;
};

export const fetchRefUko = () => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_UKO_START });
  const { error, data } = await api.getReffTypeUko(getToken(getState()));
  console.log(data);
  if (!error) dispatch({ type: types.FETCH_UKO_SUCCESSFUL, payload: data });
  else
    dispatch({
      type: types.FETCH_UKO_FAILED,
      payload: "Error when fetching UKO reference",
    });

  return !error;
};
