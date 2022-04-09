import * as types from "./types";

const initialState = {
	loading: false,
	error: null,
  pats: [],
	filters: {
		name: null,
		jangka_tahun: null,
    sortBy: null,
	},
	page: {
		currentPage: 1,
		totalPage: 1,
		perPage: 12,
		previousPage: null,
		nextPage: null,
	},
	modal: false,
  createLoading: false,
  createError: null
};

export default function createPATReducer(state = initialState, action){
  const { type, payload } = action

  switch (type) {
		case types.FETCH_START:
			return { ...state, loading: true, error: null };
		case types.FETCH_SUCCESSFUL:
			return {
				...state,
				loading: false,
				pats: payload.data,
				page: {
					...payload.page,
					currentPage: state.page.currentPage,
				},
			};
		case types.FETCH_FAILED:
			return { ...state, loading: false, error: payload };

		case types.CREATE_START:
			return { ...state, createLoading: true, createError: null };
		case types.CREATE_SUCCESSFUL:
			return { ...state, createLoading: false };
		case types.CREATE_FAILED:
			return { ...state, createLoading: false, createError: payload };

		case types.OPEN_MODAL:
			return { ...state, modal: true };
		case types.CLOSE_MODAL:
			return { ...state, modal: false };

		case types.UPDATE_FILTER_FORM:
			return {
				...state,
				filters: {
					...state.filters,
					...payload,
				},
			};
		case types.UPDATE_SORT_BY:
			return {
				...state,
				filters: {
					...state.filters,
					sortBy: payload,
				},
			};
		case types.CHANGE_PAGE:
			return { ...state, page: { ...state.page, currentPage: payload } };
		default:
			return state;
	}
}