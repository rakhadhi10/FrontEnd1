import {
  getCode,
  prepareCreateTimAuditBody,
  prepareNewAtas,
  prepareUpdateTimAudit,
} from "../../../api/utils";
import { getToken } from "../auth/selectors";
import {
  getCurrentEditedTeamId,
  getCurrentPage,
  getDeletedAtaIds,
  getFilters,
  getForm,
} from "./selectors";
import * as types from "./types";

export const updateForm = (newForm) => {
  return {
    type: types.UPDATE_FORM,
    payload: newForm,
  };
};

export const submitForm = (pat_id) => async (dispatch, getState, api) => {
  const form = getForm(getState());

  dispatch({ type: types.SUBMIT_START });

  const mappedForm = prepareCreateTimAuditBody(pat_id, form);
  const { error } = await api.createTimAudit(getToken(getState()), mappedForm);

  if (!error) {
    dispatch({ type: types.SUBMIT_SUCCESSFUL });
  } else {
    dispatch({ type: types.SUBMIT_FAILED, payload: error });
  }

  return !error;
};

export const deleteTimAudit = (id) => async (dispatch, getState, api) => {
  dispatch({ type: types.DELETE_START });

  const { error } = await api.deleteTimAudit(getToken(getState()), id);

  if (!error) {
    dispatch({ type: types.DELETE_SUCCESSFUL, payload: id });
  } else {
    dispatch({ type: types.DELETE_FAILED, payload: error });
  }

  return !error;
};

export const addDeletedAta = (ata_id) => ({
  type: types.ADD_DELETED_ATA,
  payload: ata_id,
});
export const setCurrentEditedTeamId = (team_id) => ({
  type: types.SET_CURRENT_EDITED_TEAM_ID,
  payload: team_id,
});

export const submitEditForm = (pat_id) => async (dispatch, getState, api) => {
  const form = getForm(getState());

  dispatch({ type: types.SUBMIT_EDIT_START });

  const mappedForm = prepareCreateTimAuditBody(pat_id, form);
  mappedForm.tim_audit_id = form.id;
  const { error } = await api.updateTimAudit(getToken(getState()), mappedForm);

  if (!error) {
    dispatch({ type: types.SUBMIT_EDIT_SUCCESSFUL });
  } else {
    dispatch({ type: types.SUBMIT_EDIT_FAILED, payload: error });
  }

  return !error;
  // const form = getForm(getState());

  // dispatch({ type: types.SUBMIT_EDIT_START });

  // const atas_ukers = form.atas.map((ata) => {
  //   let uker_binaans = [];
  //   ata.uker.forEach((u) => {
  //     if (!u) return;
  //     uker_binaans.push({
  //       orgeh: getCode(u.orgeh),
  //       branch: getCode(u.branch),
  //     });
  //   });
  //   const a = {
  //     pn: ata.name.pn,
  //     nama: ata.name.nama,
  //     jabatan: ata.name.jabatan,
  //     uker_binaans,
  //   };
  //   return a;
  // });
  // const final = {
  //   pat_id,
  //   tim_audit_id: form.id,
  //   name: form.name,
  //   pn_ma: form.ma,
  //   pn_kta: form.kta,
  //   atas_ukers,
  // };

  // const { error } = await api.updateTimAudit(getToken(getState()), final);
  // if (!error) {
  //   dispatch({ type: types.SUBMIT_EDIT_SUCCESSFUL });
  // } else {
  //   dispatch({ type: types.SUBMIT_EDIT_FAILED, payload: error });
  // }

  // return !error;
};

/**
 * @deprecated Since single api update tim audit. Use submitEditForm instead.
 */
export const submitEditedTimAudit =
  (pat_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_EDIT_START });
    const currentEditedTeamId = getCurrentEditedTeamId(getState());

    // Delete atas
    const ataIds = getDeletedAtaIds(getState());
    if (ataIds.length !== 0) {
      const { error } = await api.deleteAtas(
        getToken(getState()),
        currentEditedTeamId,
        ataIds,
      );
      if (error) {
        console.log("Error when DELETING atas: ", error);
        dispatch({
          type: types.SUBMIT_EDIT_FAILED,
          payload: "Error when DELETING atas",
        });
        return false;
      }
    }

    // Create atas
    const newAtas = getForm(getState()).atas.filter((ata) => ata.new);
    if (newAtas.length !== 0) {
      const readyForm = prepareNewAtas(currentEditedTeamId, newAtas);
      const { error } = await api.createAtas(
        getToken(getState()),
        currentEditedTeamId,
        readyForm,
      );
      if (error) {
        console.log("Error when CREATING atas: ", error);
        dispatch({
          type: types.SUBMIT_EDIT_FAILED,
          payload: "Error when CREATING atas",
        });
        return false;
      }
    }

    // Create uker for existing ata
    getForm(getState()).atas.forEach(async (ata) => {
      if (!ata.name.id) {
        return;
      }
      let newUkers = [];
      ata.uker.forEach((uker) => {
        if (!uker.id) {
          newUkers.push({
            orgeh: getCode(uker.orgeh),
            branch: getCode(uker.branch),
          });
        }
      });
      if (newUkers.length !== 0) {
        const { error } = await api.createUker(
          getToken(getState()),
          ata.name.id,
          currentEditedTeamId,
          newUkers,
        );
        if (error) {
          console.log("Error when CREATING UKER FOR ATA: ", error);
          dispatch({
            type: types.SUBMIT_EDIT_FAILED,
            payload: "Error when CREATING UKER FOR ATA",
          });
          return false;
        }
      }
    });

    // Update existing uker/ata
    const readyUpdateForm = prepareUpdateTimAudit(
      pat_id,
      getCurrentEditedTeamId(getState()),
      getForm(getState()),
    );
    const { error } = await api.updateTimAudit(
      getToken(getState()),
      readyUpdateForm,
    );
    if (error) {
      console.log("Error when UPDATING tim audit: ", error);
      dispatch({
        type: types.SUBMIT_EDIT_FAILED,
        payload: "Error when UPDATING tim audit",
      });
      return false;
    }

    dispatch({ type: types.SUBMIT_EDIT_SUCCESSFUL });
    return true;
  };

export const fetchAllTimAudit = (pat_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_START });

  const {
    data,
    detailPage: page,
    error,
  } = await api.getAllTimAudit(
    getToken(getState()),
    pat_id,
    getCurrentPage(getState()),
    getFilters(getState()),
  );

  if (!error) {
    dispatch({
      type: types.FETCH_SUCCESSFUL,
      payload: { teams: data.tim_audit, page },
    });
  } else {
    dispatch({
      type: types.FETCH_FAILED,
      payload: error,
    });
  }

  return !error;
};

export const fetchTimAuditById =
  (pat_id, tim_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_TEAM_BY_ID_START });

    const { data, error } = await api.getTimAuditById(
      getToken(getState()),
      pat_id,
      tim_id,
    );

    if (!error) {
      dispatch({ type: types.FETCH_TEAM_BY_ID_SUCCESSFUL, payload: data });
      dispatch(updateForm(testFunc(data)));
    } else {
      dispatch({
        type: types.FETCH_TEAM_BY_ID_FAILED,
        payload: error,
      });
    }

    return !error;
  };

const testFunc = (form) => {
  const init = { ...form };
  init.ma = {
    nama: init.nama_ma,
    pn: init.pn_ma,
    jabatan: init.jabatan_ma,
  };
  init.kta = {
    nama: init.nama_kta,
    pn: init.pn_kta,
    jabatan: init.jabatan_kta,
  };
  if (init.atas) {
    init.atas = init.atas.map((ata) => ({
      name: {
        id: ata.id,
        pn: ata.pn,
        nama: ata.name,
        jabatan: ata.jabatan,
      },
      uker: ata.uker,
    }));
  }
  return init;
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
          nama: ata.name,
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
