import { prepareCreateAddendumTimAuditBody } from "../../../api/utils";
import { getToken } from "../auth/selectors";
import { getCurrentPage, getFilters, getForm } from "./selectors";
import * as types from "./types";

export const updateForm = (newForm) => {
  return {
    type: types.UPDATE_FORM,
    payload: newForm,
  };
};

export const submitForm =
  (pat_id, alasan_adendum) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_START });

    const form = getForm(getState());

    const mappedForm = prepareCreateAddendumTimAuditBody(pat_id, "new", form);
    const result = {
      pat_id,
      part: "tim_audit",
      alasan_adendum,
      sesudah: mappedForm,
    };

    const { error } = await api.updateAddendum(getToken(getState()), result);

    if (!error) {
      dispatch({ type: types.SUBMIT_SUCCESSFUL });
    } else {
      dispatch({ type: types.SUBMIT_FAILED, payload: error });
    }

    return !error;
  };

export const submitEditForm =
  (pat_id, alasan_adendum) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_EDIT_START });

    const form = getForm(getState());

    const sesudah = prepareCreateAddendumTimAuditBody(pat_id, form.id, form);

    const result = {
      pat_id,
      part: "tim_audit",
      alasan_adendum,
      sesudah,
    };

    const { error } = await api.updateAddendum(getToken(getState()), result);

    if (!error) {
      dispatch({ type: types.SUBMIT_EDIT_SUCCESSFUL });
    } else {
      dispatch({ type: types.SUBMIT_EDIT_FAILED, payload: error });
    }

    return !error;
  };

export const deleteTimAudit =
  (id, pat_id) => async (dispatch, getState, api) => {
    const input = {
      part: "tim_audit",
      pat_id,
      tim_audit_id: id,
    };
    dispatch({ type: types.DELETE_START });

    const { error } = await api.deleteAddendum(getToken(getState()), input);

    if (!error) {
      dispatch({ type: types.DELETE_SUCCESSFUL, payload: id });
    } else {
      dispatch({ type: types.DELETE_FAILED, payload: error });
    }

    return !error;
  };

export const setCurrentEditedTeamId = (team_id) => ({
  type: types.SET_CURRENT_EDITED_TEAM_ID,
  payload: team_id,
});

export const fetchAllTimAudit = (pat_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_START });

  const {
    data,
    detailPage: page,
    error,
  } = await api.getAllTimAuditAddendum(
    getToken(getState()),
    pat_id,
    getCurrentPage(getState()),
    getFilters(getState()),
  );

  if (!error) {
    dispatch({
      type: types.FETCH_SUCCESSFUL,
      payload: { teams: data, page },
    });
  } else {
    dispatch({
      type: types.FETCH_FAILED,
      payload: error,
    });
  }

  return !error;
};

export const openCreateModal = () => ({ type: types.OPEN_CREATE_MODAL });
export const closeCreateModal = () => ({ type: types.CLOSE_CREATE_MODAL });
export const openEditModal = (initValue) => (dispatch, _) => {
  const init = { ...initValue };
  init.ma = {
    nama: initValue.nama_ma,
    pn: initValue.pn_ma,
    jabatan: initValue.jabatan_ma,
  };
  init.kta = {
    nama: initValue.nama_kta,
    pn: initValue.pn_kta,
    jabatan: initValue.jabatan_kta,
  };
  if (init.atas) {
    init.atas = initValue.atas.map((ata) => {
      const newUker = ata.uker.map((u) => {
        return {
          orgeh: {
            child: u.orgeh,
            my_name: u.orgeh_name,
          },
          branch: {
            branch: u.branch,
            brdesc: u.branch_name,
          },
        };
      });
      return {
        nama: {
          id: ata.id,
          pn: ata.pn,
          nama: ata.name || ata.nama,
          jabatan: ata.jabatan,
        },
        uker: newUker,
      };
    });
  }
  dispatch({ type: types.UPDATE_FORM, payload: init });
  dispatch(setCurrentEditedTeamId(init.id));
  dispatch({ type: types.OPEN_EDIT_MODAL });
};
export const closeEditModal = () => ({ type: types.CLOSE_EDIT_MODAL });

export const changePage = (page) => ({
  type: types.CHANGE_PAGE,
  payload: page,
});

export const updateFilterForm = (filters) => ({
  type: types.UPDATE_FILTER_FORM,
  payload: filters,
});

export const updateSortBy = (value) => ({
  type: types.UPDATE_SORT_BY,
  payload: value,
});

export const reset = (pat_id) => async (dispatch, getState, api) => {
  const { error } = await api.resetAddendum(
    getToken(getState()),
    "tim_audit",
    pat_id,
  );
  return !error;
};
