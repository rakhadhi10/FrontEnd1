import { getToken } from "../auth/selectors";
import { getCurrentPage, getFilters } from "./selectors";
import * as types from "./types";

export const openModal = () => ({ type: types.OPEN_MODAL });
export const closeModal = () => ({ type: types.CLOSE_MODAL });

export const changePage = (page) => ({ type: types.CHANGE_PAGE, payload: page })

export const updateFilterForm = (filters) => ({ type: types.UPDATE_FILTER_FORM, payload: filters });
export const updateSortBy = (value) => ({ type: types.UPDATE_SORT_BY, payload: value })

export const fetchPATs = () => async (dispatch, getState, api) => {  
	dispatch({ type: types.FETCH_START });

  const { data, page, error } = await api.getAllPATForReference(
		getToken(getState()),
		getCurrentPage(getState()),
		getFilters(getState()),
	);
  
  if (!error)
		dispatch({ type: types.FETCH_SUCCESSFUL, payload: {data, page} });
	else
		dispatch({
			type: types.FETCH_FAILED,
			payload: error,
		});
}

export const createPAT = (tahun_pat) => async (dispatch, getState, api) => {
	dispatch({ type: types.CREATE_START });

	const { error } = await api.createPAT(getToken(getState()), tahun_pat);

	if (!error)
		dispatch({ type: types.CREATE_SUCCESSFUL });
	else
		dispatch({
			type: types.CREATE_FAILED,
			payload: error,
		});

  return !error
};