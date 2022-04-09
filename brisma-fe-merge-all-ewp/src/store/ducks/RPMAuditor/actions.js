import { getToken } from "../auth/selectors";
import { getAssignProjectId, getKKPTDetails } from "./selectors";
import * as types from "./types";

export const openAssignModal = (project_id) => async (dispatch) => {
  dispatch({ type: types.OPEN_ASSIGN_MODAL, payload: project_id });
  return await dispatch(fetchMCS(project_id));
};
export const closeAssignModal = () => ({ type: types.CLOSE_ASSIGN_MODAL });

export const openDetailsModal = (project_id) => async (dispatch) => {
  dispatch({ type: types.OPEN_DETAILS_MODAL });
  return await dispatch(fetchProjectDetails(project_id));
};

export const closeDetailsModal = () => ({ type: types.CLOSE_DETAILS_MODAL });

export const fetchProjects = () => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_PROJECTS_START });
  const { error, data } = await api.getAllRPMProjects(getToken(getState()));

  if (!error)
    dispatch({ type: types.FETCH_PROJECTS_SUCCESSFUL, payload: data });
  else dispatch({ type: types.FETCH_PROJECTS_FAILED, payload: error });

  return !error;
};

export const fetchProjectDetails =
  (project_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_PROJECT_DETAILS_START });
    const { error, data } = await api.getProjectDetails(
      getToken(getState()),
      project_id,
    );

    if (!error) {
      dispatch({ type: types.FETCH_PROJECT_DETAILS_SUCCESSFUL, payload: data });
    } else
      dispatch({ type: types.FETCH_PROJECT_DETAILS_FAILED, payload: error });

    return !error;
  };

export const fetchMCS = (project_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_MCS_START });
  const { error, data } = await api.getMCS(getToken(getState()), project_id);

  if (!error) {
    const mapData = {
      makers: data.makers_auditor || [],
      checkers: data.checkers_auditor || [],
      signers: data.signers_auditor || [],
    };
    dispatch({ type: types.FETCH_MCS_SUCCESSFUL, payload: mapData });
  } else dispatch({ type: types.FETCH_MCS_FAILED, payload: error });

  return !error;
};

export const updateMCS = (form) => async (dispatch, getState, api) => {
  dispatch({ type: types.UPDATE_MCS_START });
  const project_rpm_id = getAssignProjectId(getState());
  const { error } = await api.updateMCS(getToken(getState()), project_rpm_id, {
    ...form,
  });

  if (!error) {
    dispatch({ type: types.UPDATE_MCS_SUCCESSFUL });
  } else dispatch({ type: types.UPDATE_MCS_FAILED });

  return !error;
};

export const fetchAllKKPT = (project_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_KKPT_START });
  const { error, data } = await api.getAllKKPT(
    getToken(getState()),
    project_id,
  );

  if (!error) {
    dispatch({ type: types.FETCH_KKPT_SUCCESSFUL, payload: data });
  } else dispatch({ type: types.FETCH_KKPT_FAILED, payload: error });

  return !error;
};

export const fetchSuratDetails =
  (kkpt_id, project_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_KKPT_DETAILS_START });
    const { error, data } = await api.getSuratDetails(
      getToken(getState()),
      kkpt_id,
      project_id,
    );
    const { error: mcsError, data: mcsData } = await api.getMCS(
      getToken(getState()),
      project_id,
    );

    if (!error || !mcsError) {
      dispatch({
        type: types.FETCH_KKPT_DETAILS_SUCCESSFUL,
        payload: { ...getKKPTDetails(getState()), mcs: mcsData, surat: data },
      });
    } else dispatch({ type: types.FETCH_KKPT_DETAILS_FAILED, payload: error });

    return !error || !mcsError;
  };

export const fetchKKPTDetails =
  (kkpt_id, project_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_KKPT_DETAILS_START });
    const { error, data } = await api.getKKPTDetails(
      getToken(getState()),
      kkpt_id,
      project_id,
    );
    const { error: mcsError, data: mcsData } = await api.getMCS(
      getToken(getState()),
      project_id,
    );
    const { error: suratError, data: suratData } = await api.getSuratDetails(
      getToken(getState()),
      kkpt_id,
      project_id,
    );

    if (!error && !mcsError && !suratError) {
      dispatch({
        type: types.FETCH_KKPT_DETAILS_SUCCESSFUL,
        payload: { kkpt: data, mcs: mcsData, surat: suratData },
      });
    } else dispatch({ type: types.FETCH_KKPT_DETAILS_FAILED, payload: error });

    return !error && !mcsError && !suratError;
  };

export const approveActionPlanMaker =
  (
    project_rpm_id,
    kkpt_id,
    rekomendasi_kkpt,
    action_plan_kkpt,
    hasil_evaluasi,
  ) =>
  async (dispatch, getState, api) => {
    const { error } = await api.approveActionPlanMakerAuditor(
      getToken(getState()),
      project_rpm_id,
      kkpt_id,
      rekomendasi_kkpt,
      action_plan_kkpt,
      hasil_evaluasi,
    );

    return !error;
  };

export const approveActionPlanChecker =
  (
    project_rpm_id,
    kkpt_id,
    rekomendasi_kkpt,
    action_plan_kkpt,
    isApproved,
    alasan,
  ) =>
  async (dispatch, getState, api) => {
    const { error } = await api.approveActionPlanChecker(
      getToken(getState()),
      project_rpm_id,
      kkpt_id,
      rekomendasi_kkpt,
      action_plan_kkpt,
      isApproved,
      alasan,
    );

    return !error;
  };

export const rejectActionPlanChecker =
  (
    project_rpm_id,
    kkpt_id,
    rekomendasi_kkpt,
    action_plan_kkpt,
    isApproved,
    alasan,
  ) =>
  async (dispatch, getState, api) => {
    const { error } = await api.rejectActionPlanChecker(
      getToken(getState()),
      project_rpm_id,
      kkpt_id,
      rekomendasi_kkpt,
      action_plan_kkpt,
      isApproved,
      alasan,
    );

    return !error;
  };

export const approveActionPlanSigner =
  (
    project_rpm_id,
    kkpt_id,
    rekomendasi_kkpt,
    action_plan_kkpt,
    isApproved,
    alasan,
  ) =>
  async (dispatch, getState, api) => {
    const { error } = await api.approveActionPlanSigner(
      getToken(getState()),
      project_rpm_id,
      kkpt_id,
      rekomendasi_kkpt,
      action_plan_kkpt,
      isApproved,
      alasan,
    );

    return !error;
  };

export const rejectActionPlanSigner =
  (
    project_rpm_id,
    kkpt_id,
    rekomendasi_kkpt,
    action_plan_kkpt,
    isApproved,
    alasan,
  ) =>
  async (dispatch, getState, api) => {
    const { error } = await api.rejectActionPlanSigner(
      getToken(getState()),
      project_rpm_id,
      kkpt_id,
      rekomendasi_kkpt,
      action_plan_kkpt,
      isApproved,
      alasan,
    );

    return !error;
  };

export const approveSuratMaker =
  (project_rpm_id, kkpt_id, text) => async (dispatch, getState, api) => {
    const { error } = await api.approveSuratMaker(
      getToken(getState()),
      project_rpm_id,
      kkpt_id,
      text,
    );

    return !error;
  };

export const approveSuratChecker =
  (project_rpm_id, kkpt_id, note) => async (dispatch, getState, api) => {
    const { error } = await api.approveSuratChecker(
      getToken(getState()),
      project_rpm_id,
      kkpt_id,
      note,
    );

    return !error;
  };

export const rejectSuratChecker =
  (project_rpm_id, kkpt_id, note) => async (dispatch, getState, api) => {
    const { error } = await api.rejectSuratChecker(
      getToken(getState()),
      project_rpm_id,
      kkpt_id,
      note,
    );

    return !error;
  };

export const approveSuratSigner =
  (project_rpm_id, kkpt_id, note) => async (dispatch, getState, api) => {
    const { error } = await api.approveSuratSigner(
      getToken(getState()),
      project_rpm_id,
      kkpt_id,
      note,
    );

    return !error;
  };

export const rejectSuratSigner =
  (project_rpm_id, kkpt_id, note) => async (dispatch, getState, api) => {
    const { error } = await api.rejectSuratSigner(
      getToken(getState()),
      project_rpm_id,
      kkpt_id,
      note,
    );

    return !error;
  };

export const approveAllAuditor =
  (project_rpm_id, kkpt_id, note) => async (dispatch, getState, api) => {
    const { error } = await api.approveAllAuditee(
      getToken(getState()),
      project_rpm_id,
      kkpt_id,
      note,
    );

    return !error;
  };

export const createNegosiasi =
  (project_rpm_id) => async (dispatch, getState, api) => {
    const { error } = await api.createNegosiasi(
      getToken(getState()),
      project_rpm_id,
    );

    return !error;
  };

export const fetchAllDocuments =
  (project_rpm_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_DOCUMENTS_START });

    const { error, data } = await api.getAllDocuments(
      getToken(getState()),
      project_rpm_id,
    );

    if (!error) {
      dispatch({ type: types.FETCH_DOCUMENTS_SUCCESSFUL, payload: data });
    } else {
      dispatch({ type: types.FETCH_DOCUMENTS_FAILED, payload: error });
    }

    return !error;
  };
