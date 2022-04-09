import { getToken } from "../auth/selectors";
import { getAttendance } from "./selectors";
import * as types from "./types";

export const createNegosiasi =
  (project_rpm_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_STATUS_START });
    const { error, data } = await api.createNegosiasi(
      getToken(getState()),
      project_rpm_id,
    );

    if (!error) {
      dispatch({
        type: types.FETCH_STATUS_SUCCESSFUL,
        payload: data,
      });
    } else dispatch({ type: types.FETCH_STATUS_FAILED, payload: error });

    return !error;
  };

export const fetchAttendance =
  (project_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_ATTENDANCE_START });
    const { error, data } = await api.getAllAttendance(
      getToken(getState()),
      project_id,
    );

    if (!error) {
      dispatch({
        type: types.FETCH_ATTENDANCE_SUCCESSFUL,
        payload: {
          attendance: data.attandence || [],
          is_closed: data.is_closed,
        },
      });
    } else dispatch({ type: types.FETCH_ATTENDANCE_FAILED, payload: error });

    return !error;
  };

export const closeAttendance =
  (project_id) => async (dispatch, getState, api) => {
    const { error } = await api.closeAttendance(
      getToken(getState()),
      project_id,
    );

    return error;
  };

export const loginAttendance =
  (pn, password, project_id) => async (dispatch, getState, api) => {
    const { error } = await api.loginAttendance(
      getToken(getState()),
      pn,
      password,
      project_id,
    );

    return error;
  };

export const deleteAttendance =
  (pn, project_id) => async (dispatch, getState, api) => {
    const { error } = await api.deleteAttendance(
      getToken(getState()),
      project_id,
      pn,
    );

    if (!error) {
      const filterAttendance = [...getAttendance(getState())].filter(
        (a) => a.pn !== pn,
      );
      dispatch({ type: types.UPDATE_ATTENDANCE, payload: filterAttendance });
    }

    return error;
  };

export const fetchTimAudit =
  (project_rpm_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_TIM_AUDIT_START });
    const { error, data } = await api.getTimAudit(
      getToken(getState()),
      project_rpm_id,
    );

    if (!error) {
      dispatch({
        type: types.FETCH_TIM_AUDIT_SUCCESSFUL,
        payload: data,
      });
    } else dispatch({ type: types.FETCH_TIM_AUDIT_FAILED, payload: error });

    return !error;
  };

export const fetchNotulen =
  (project_rpm_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_NOTULEN_START });
    const { error, data } = await api.getNotulen(
      getToken(getState()),
      project_rpm_id,
    );

    await dispatch(fetchTimAudit(project_rpm_id));

    if (!error) {
      dispatch({
        type: types.FETCH_NOTULEN_SUCCESSFUL,
        payload: { data: data.data, log: data.log },
      });
    } else dispatch({ type: types.FETCH_NOTULEN_FAILED, payload: error });

    return !error;
  };

export const approveRejectNotulen =
  (project_rpm_id, isApproved, note) => async (dispatch, getState, api) => {
    const form = {
      project_rpm_id,
      approve: isApproved,
      note,
    };
    const { error } = await api.updateNotulen(getToken(getState()), form);
    return error;
  };

export const assignATANotulen =
  (project_rpm_id, ata_penanggung_jawab) => async (dispatch, getState, api) => {
    const form = {
      project_rpm_id,
      ata_penanggung_jawab,
    };
    const { error } = await api.updateNotulen(getToken(getState()), form);
    return error;
  };

export const sendToKTANotulen =
  (project_rpm_id, isi_notulen_rapat) => async (dispatch, getState, api) => {
    const form = {
      project_rpm_id,
      isi_notulen_rapat,
    };
    const { error } = await api.updateNotulen(getToken(getState()), form);
    return error;
  };

export const fetchKKPTNego =
  (project_rpm_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_KKPT_NEGO_START });
    const { error, data } = await api.getKKPTNego(
      getToken(getState()),
      project_rpm_id,
    );

    if (!error) {
      dispatch({
        type: types.FETCH_KKPT_NEGO_SUCCESSFUL,
        payload: data.data,
      });
    } else dispatch({ type: types.FETCH_KKPT_NEGO_FAILED, payload: error });

    return !error;
  };

export const fetchActionPlanNego =
  (project_rpm_id, kkpt_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_ACTION_PLAN_START });
    const { error, data } = await api.getActionPlanNego(
      getToken(getState()),
      project_rpm_id,
      kkpt_id,
    );

    if (!error) {
      await dispatch(fetchTimAudit(project_rpm_id));

      dispatch({
        type: types.FETCH_ACTION_PLAN_SUCCESSFUL,
        payload: { data: data.data, log: data.log },
      });
    } else dispatch({ type: types.FETCH_ACTION_PLAN_FAILED, payload: error });

    return !error;
  };

export const approveRejectNego =
  (project_rpm_id, kkpt_id, isApproved, note) =>
  async (dispatch, getState, api) => {
    const { error } = await api.approveRejectNego(
      getToken(getState()),
      Number(project_rpm_id),
      Number(kkpt_id),
      isApproved,
      note,
    );

    return error;
  };

export const addNegosiasi =
  (project_rpm_id, kkpt_id, rekomendasi) => async (dispatch, getState, api) => {
    const newRekomendasi = rekomendasi
      .map((r) => {
        const plans = r.action_plan.map((a) => ({
          ...a,
          id: String(a.id).includes("new") ? "new" : a.id,
        }));
        return {
          ...r,
          id: String(r.id).includes("new") ? "new" : r.id,
          action_plan: plans,
        };
      })
      .filter((r) => r.action_plan && r.action_plan.length > 0);
    // console.log({
    //   project_rpm_id,
    //   kkpt_id,
    //   newRekomendasi,
    // });
    const { error } = await api.addNegosiasi(
      getToken(getState()),
      Number(project_rpm_id),
      Number(kkpt_id),
      newRekomendasi,
    );
    return !error;
  };

export const fetchBeritaAcara =
  (project_rpm_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_BERITA_ACARA_START });
    const { error, data } = await api.getBeritaAcara(
      getToken(getState()),
      project_rpm_id,
    );

    await dispatch(fetchTimAudit(project_rpm_id));

    if (!error) {
      dispatch({
        type: types.FETCH_BERITA_ACARA_SUCCESSFUL,
        payload: { data: data.data, log: data.log },
      });
    } else dispatch({ type: types.FETCH_BERITA_ACARA_FAILED, payload: error });

    return !error;
  };

export const assignATAPICBeritaAcara =
  (project_rpm_id, ata_penanggung_jawab, pimpinan_uker_auditee) =>
  async (dispatch, getState, api) => {
    const form = {
      project_rpm_id,
      ata_penanggung_jawab,
      pimpinan_uker_auditee,
    };
    const { error } = await api.updateBeritaAcara(getToken(getState()), form);
    return error;
  };

export const sendToKTABeritaAcara =
  (project_rpm_id, isi_berita_acara) => async (dispatch, getState, api) => {
    const form = {
      project_rpm_id,
      isi_berita_acara,
    };
    const { error } = await api.updateBeritaAcara(getToken(getState()), form);
    return error;
  };

export const approveRejectBeritaAcara =
  (project_rpm_id, isApproved, note) => async (dispatch, getState, api) => {
    const form = {
      project_rpm_id,
      approve: isApproved,
      note,
    };
    const { error } = await api.updateBeritaAcara(getToken(getState()), form);
    return error;
  };
