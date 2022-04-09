import { getToken } from "../../../auth/selectors";
import { getNote } from "./selectors";
import * as types from "./types";

export const fetchAnalisisPerencanaan =
  (mapa_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_START });
    const { error, data } = await api.getApaPicMapa(
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

export const postAnalisisPerencanaan =
  (mapa_id, content) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_START });
    const { error } = await api.postApaPicMapa(
      getToken(getState()),
      mapa_id,
      content
    );
    if (!error) dispatch({ type: types.SUBMIT_SUCCESSFUL });
    else
      dispatch({
        type: types.SUBMIT_FAILED,
        payload: error,
      });

    return !error;
  };

export const fetchAnalyzing = (mapa_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_ANALYZING_START });
  const { data, error } = await api.getAnalyzing(getToken(getState()), mapa_id);
  console.log(data);
  if (!error)
    dispatch({ type: types.FETCH_ANALYZING_SUCCESSFUL, payload: data });
  else
    dispatch({
      type: types.FETCH_ANALYZING_FAILED,
      payload: error,
    });

  return !error;
};

export const fetchAktivitas =
  (mapa_id, uker_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_AKTIVITAS_START });
    const { data, error } = await api.getAktivitas(
      getToken(getState()),
      mapa_id,
      uker_id
    );
    if (!error)
      dispatch({ type: types.FETCH_AKTIVITAS_SUCCESSFUL, payload: data });
    else
      dispatch({
        type: types.FETCH_AKTIVITAS_FAILED,
        payload: error,
      });

    return !error;
  };

export const fetchSubAktivitas =
  (mapa_id, aktivitas_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_SUB_AKTIVITAS_START });
    const { data, error } = await api.getSubAktivitas(
      getToken(getState()),
      mapa_id,
      aktivitas_id
    );
    if (!error)
      dispatch({ type: types.FETCH_SUB_AKTIVITAS_SUCCESSFUL, payload: data });
    else
      dispatch({
        type: types.FETCH_SUB_AKTIVITAS_FAILED,
        payload: error,
      });

    return !error;
  };

export const deleteSubAktivitas =
  (aktivitas_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.DELETE_SUB_AKTIVITAS_START });
    const { error } = await api.delSubAktivitas(
      getToken(getState()),
      aktivitas_id
    );
    if (!error) dispatch({ type: types.DELETE_SUB_AKTIVITAS_SUCCESSFUL });
    else
      dispatch({
        type: types.DELETE_SUB_AKTIVITAS_FAILED,
        payload: error,
      });

    return !error;
  };

export const submitAnalisaAktivitas =
  (mapa_id, body) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_ANALISA_AKTIVITAS_START });
    const { error, status } = await api.postAnalisaAktivitas(
      getToken(getState()),
      mapa_id,
      body
    );
    if (!error) dispatch({ type: types.SUBMIT_ANALISA_AKTIVITAS_SUCCESSFUL });
    else
      dispatch({ type: types.SUBMIT_ANALISA_AKTIVITAS_FAILED, payload: error });
    return status;
  };

export const fetchAnalisaRisk =
  (mapa_id, sub_aktivitas_kode) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_ANALISA_RISK_START });
    const { error, data } = await api.getMapaMCR(
      getToken(getState()),
      mapa_id,
      sub_aktivitas_kode
    );
    if (!error)
      dispatch({ type: types.FETCH_ANALISA_RISK_SUCCESSFUL, payload: data });
    else dispatch({ type: types.FETCH_ANALISA_RISK_FAILED, payload: error });
    return !error;
  };

export const fetchBreadcrumbAktivitas =
  (filter) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_BREADCRUMB_AKTIVITAS_START });
    const { error, data } = await api.getReffAktivitasSubAktivitas(
      getToken(getState()),
      filter
    );
    console.log(data);
    if (!error)
      dispatch({
        type: types.FETCH_BREADCRUMB_AKTIVITAS_SUCCESSFUL,
        payload: data,
      });
    else
      dispatch({
        type: types.FETCH_BREADCRUMB_AKTIVITAS_FAILED,
        payload: error,
      });
    return !error;
  };

export const submitAnalisaRisk =
  (mapa_id, body) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_ANALISA_RISK_START });
    const { error, status } = await api.postUpdateMapaMCR(
      getToken(getState()),
      mapa_id,
      body
    );
    if (!error) dispatch({ type: types.SUBMIT_ANALISA_RISK_SUCCESSFUL });
    else dispatch({ type: types.SUBMIT_ANALISA_RISK_FAILED, payload: error });
    return status;
  };

export const submitProgramAudit =
  (mapa_id, body) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_PROGRAM_AUDIT_START });
    const { error, status } = await api.postMcrProgramAudit(
      getToken(getState()),
      mapa_id,
      body
    );
    if (!error) dispatch({ type: types.SUBMIT_PROGRAM_AUDIT_SUCCESSFUL });
    else dispatch({ type: types.SUBMIT_PROGRAM_AUDIT_FAILED, payload: error });
    return status;
  };

export const submitKriteriaAudit =
  (mapa_id, body) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_KRITERIA_AUDIT_START });
    const { error, status } = await api.postMcrKriteriaAudit(
      getToken(getState()),
      mapa_id,
      body
    );
    if (!error) dispatch({ type: types.SUBMIT_KRITERIA_AUDIT_SUCCESSFUL });
    else dispatch({ type: types.SUBMIT_KRITERIA_AUDIT_FAILED, payload: error });
    return status;
  };

export const fetchMapaAnalizingSummary =
  (mapa_id, params) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_SUMMARY_START });
    const { error, data } = await api.getMapaAnalizingSummary(
      getToken(getState()),
      mapa_id,
      params
    );
    if (!error)
      dispatch({ type: types.FETCH_SUMMARY_SUCCESSFUL, payload: data });
    else dispatch({ type: types.FETCH_SUMMARY_FAILED, payload: error });
    return error;
  };

export const fetchMapaSample =
  (mapa_id, mcr_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_MAPA_SAMPLE_START });
    const { error, data } = await api.getMapaSample(
      getToken(getState()),
      mapa_id,
      mcr_id
    );

    if (!error)
      dispatch({ type: types.FETCH_MAPA_SAMPLE_SUCCESSFUL, payload: data });
    else
      dispatch({
        type: types.FETCH_MAPA_SAMPLE_FAILED,
        payload: error,
      });

    return !error;
  };

export const fetchTeknikSample = () => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_TEKNIK_SAMPLE_START });
  const { error, data } = await api.getTeknikSample(getToken(getState()));

  if (!error)
    dispatch({ type: types.FETCH_TEKNIK_SAMPLE_SUCCESSFUL, payload: data });
  else
    dispatch({
      type: types.FETCH_TEKNIK_SAMPLE_FAILED,
      payload: error,
    });

  return !error;
};

export const submitMapaSample =
  (mapa_id, body) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_MAPA_SAMPLE_START });
    const { error } = await api.postMapaSample(
      getToken(getState()),
      mapa_id,
      body
    );
    if (!error) dispatch({ type: types.SUBMIT_MAPA_SAMPLE_SUCCESSFUL });
    else dispatch({ type: types.SUBMIT_MAPA_SAMPLE_FAILED, payload: error });
    return error;
  };

export const submitApprovalAnalisa =
  (mapa_id, body) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_APPROVAL_START });
    const newBody = { ...body, alasan: getNote(getState()) };
    const { error } = await api.postApprovalAnalisa(
      getToken(getState()),
      mapa_id,
      newBody
    );
    if (!error) dispatch({ type: types.SUBMIT_APPROVAL_SUCCESSFUL });
    else dispatch({ type: types.SUBMIT_APPROVAL_FAILED, payload: error });
    return error;
  };

export const fetchCommentApprovalAnalisa =
  (mapa_id, params) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_COMMENT_APPROVAL_START });
    const { error, data } = await api.getCommentApprovalAnalisa(
      getToken(getState()),
      mapa_id,
      params
    );
    if (!error)
      dispatch({
        type: types.FETCH_COMMENT_APPROVAL_SUCCESSFUL,
        payload: data,
      });
    else
      dispatch({ type: types.FETCH_COMMENT_APPROVAL_FAILED, payload: error });
    return error;
  };

export const setNote = (note) => ({
  type: types.SET_NOTE_REJECT,
  payload: note,
});
