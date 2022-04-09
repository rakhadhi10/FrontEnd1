import * as types from "./types";

const initialState = {
  loading: false,
  error: null,
  sort_by: null,
  filters: {
    project_name: null,
    tahun: null,
    status_document: null,
    status_persetujuan: null,
    sortBy: null,
  },
  projects: [
    {
      id: null,
      pat_name: null,
      tahun: null,
      riwayat_adendum: null,
      status_kode: null,
      nama_status: null,
      nama_persetujuan: null,
      kode: null,
      uka_nama: null,
    },
  ],
  page: {
    currentPage: 1,
    totalPage: 1,
    perPage: 9,
    previousPage: null,
    nextPage: null,
  },
  modal: false,
  selected_pat_id: null,
  makersLoading: false,
  makersError: null,
  makers: {},
};

export default function patListProjectsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_PROJECTS_START:
      return { ...state, loading: true, error: null };
    case types.FETCH_PROJECTS_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        projects: payload.data,
        page: {
          ...payload.page,
          currentPage: state.page.currentPage,
        },
      };
    case types.FETCH_PROJECTS_FAILED:
      return { ...state, loading: false, error: action.payload };

    case types.FETCH_MAKERS_START:
      return { ...state, makersLoading: true };
    case types.FETCH_MAKERS_SUCCESSFUL:
      return { ...state, makersLoading: false, makers: action.payload };
    case types.FETCH_MAKERS_FAILED:
      return { ...state, makersLoading: false, makersError: action.payload };

    case types.UPDATE_MAKERS:
      return { ...state, makers: action.payload };

    case types.CHANGE_SELECTED_PAT_ID:
      return { ...state, selected_pat_id: action.payload };
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
