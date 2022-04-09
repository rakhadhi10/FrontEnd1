import { getToken } from "../auth/selectors";
import { getCurrentPage, getFilters, getMakers } from "./selectors";
import * as types from "./types";

export const openModal = (pat_id) => (dispatch, _, api) => {
  dispatch({ type: types.OPEN_MODAL });
  dispatch({ type: types.CHANGE_SELECTED_PAT_ID, payload: pat_id });
};
export const closeModal = () => ({ type: types.CLOSE_MODAL });
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

export const fetchProjects = () => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_PROJECTS_START });

  const { data, page, error } = await api.getAllPAT(
    getToken(getState()),
    getCurrentPage(getState()),
    getFilters(getState()),
  );
  if (!error)
    dispatch({
      type: types.FETCH_PROJECTS_SUCCESSFUL,
      payload: { data, page },
    });
  else
    dispatch({
      type: types.FETCH_PROJECTS_FAILED,
      payload: error,
    });
};

export const fetchMakers = (pat_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_MAKERS_START });
  const { error, data } = await api.getPATMakers(getToken(getState()), pat_id);

  if (!error) {
    const mappedData = {
      pic_latar_belakang_tujuan: data.maker_latar_belakang,
      pic_sumber_informasi: data.maker_sumber_informasi,
      pic_maker_tim_audit: data.maker_tim_audit,
      pic_jadwal_audit: data.maker_jadwal_audit,
      pic_jadwal_sbp: data.maker_jadwal_sbp,
      pic_kegiatan_lain: data.kegiatan_lain,
    };
    dispatch({
      type: types.FETCH_MAKERS_SUCCESSFUL,
      payload: mappedData,
    });
  } else
    dispatch({
      type: types.FETCH_MAKERS_SUCCESSFUL,
      makersError: error,
    });
};

export const postMakers = (pat_id) => async (dispatch, getState, api) => {
  const makers = getMakers(getState());
  const newMakers = { pat_id };
  Object.keys(makers).forEach((k) => {
    const current = makers[k];
    if (Array.isArray(current)) {
      makers[k].forEach((m) => {
        if (!m.pnBefore) return;
        if (!newMakers[k]) newMakers[k] = [];
        newMakers[k].push([m.pnBefore, { ...m }]);
      });
    }
  });
  newMakers.pic_latar_belakang_tujuan = makers.pic_latar_belakang_tujuan;
  newMakers.pic_sumber_informasi = makers.pic_sumber_informasi;
  const { error } = await api.updatePATMakers(
    getToken(getState()),
    pat_id,
    newMakers,
  );

  return error;
};

export const updateMakers =
  (kategori, pnBefore, objAfter) => async (dispatch, getState, api) => {
    const makers = { ...getMakers(getState()) };
    if (Array.isArray(makers[kategori])) {
      const newObjAfter = {
        pnBefore,
        ...objAfter,
      };
      makers[kategori] = makers[kategori].filter(
        (k) => Number(k.pn) !== Number(pnBefore),
      );
      makers[kategori].push(newObjAfter);
    } else {
      makers[kategori] = objAfter;
    }

    dispatch({ type: types.UPDATE_MAKERS, payload: makers });
  };
