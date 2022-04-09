import * as types from "./types";

const initialState = {
  loading: false,
  error: null,
  ewps: {
    current_page: 1,
    total_page: 1,
    list_project: [],
  },
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
  dataPat: {
    name: "",
    tahun: 0,
    uka: "",
    total_pat: 0,
    total_pat_audited: 0,
    total_pat_notaudited: 0,
    list_pat: [],
  },
  loadingPat: false,
  errorPat: null,
  selectedJadwalAudit: null,
  modal: false,
  createLoading: false,
  createError: null,
  createData: null,
  currentProject: {},
  currentProjectError: null,
  currentProjectLoading: false,
  auditSource: "",
  nonPATProjectType: "",
  projectData: null,
};

export default function createEwpReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_START:
      return { ...state, loading: true, error: null };
    case types.FETCH_SUCCESSFUL:
      return { ...state, loading: false, ewps: payload };
    case types.FETCH_FAILED:
      return { ...state, loading: false, error: payload };

    case types.FETCH_PAT_START:
      return { ...state, loadingPat: true, errorPat: null };
    case types.FETCH_PAT_SUCCESSFUL:
      return {
        ...state,
        loadingPat: false,
        dataPat: payload,
      };
    case types.FETCH_PAT_FAILED:
      return { ...state, loadingPat: false, errorPat: payload };

    case types.CREATE_START:
      return {
        ...state,
        createLoading: true,
        createError: null,
        projectData: payload,
      };
    case types.CREATE_SUCCESSFUL:
      return { ...state, createLoading: false, createData: payload };
    case types.CREATE_FAILED:
      return { ...state, createLoading: false, createError: payload };

    case types.DISABLE_START:
      return { ...state, loading: true };
    case types.DISABLE_SUCCESSFUL:
      return { ...state, loading: false };
    case types.DISABLE_FAILED:
      return { ...state, loading: false };

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

    case types.CURRENT_PROJECT_START:
      return {
        ...state,
        currentProjectLoading: true,
        currentProjectError: null,
      };
    case types.CURRENT_PROJECT_SUCCESFUL:
      return {
        ...state,
        currentProjectLoading: false,
        currentProject: payload,
      };
    case types.CURRENT_PROJECT_FAILED:
      return {
        ...state,
        currentProjectLoading: false,
        currentProjectError: payload,
      };

    case types.SET_AUDIT_SOURCE:
      return {
        ...state,
        auditSource: payload,
      };

    case types.SET_JADWAL_AUDIT:
      return {
        ...state,
        selectedJadwalAudit: payload,
      };

    case types.SET_NON_PAT_PROJECT_TYPE:
      return {
        ...state,
        nonPATProjectType: payload,
      };

    default:
      return state;
  }
}
