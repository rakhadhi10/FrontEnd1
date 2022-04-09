import * as types from "./types";

const initialState = {
  loading: false,
  error: null,
  filters: {
    tim_name: undefined,
    nama_ma: undefined,
    nama_kta: undefined,
    nama_ata: undefined,
    nama_uker: undefined,
    sortBy: undefined,
  },
  teams: [
    {
      id: null,
      nama: null,
      atas: [
        {
          id: null,
          pn: null,
          name: null,
          uker: [
            {
              orgeh: null,
              orgeh_name: null,
              branch: null,
              branch_name: null,
            },
          ],
        },
      ],
    },
  ],
  page: {
    currentPage: 1,
    totalPage: 1,
    perPage: 9,
    previousPage: null,
    nextPage: null,
  },
  modal: {
    create: false,
    edit: false,
  },
  deleteLoading: false,
  deleteError: null,
  formLoading: false,
  formError: null,
  form: {
    nama_tim_audit: undefined,
    ma: undefined,
    kta: undefined,
    atas: [
      {
        nama: undefined,
        saved: false,
        uker: [{ orgeh: undefined, branch: undefined }],
      },
    ],
  },
  editFormLoading: false,
  editFormError: null,
  edit: {
    currentTeamId: null,
    deletedAtaIds: [],
    editedAtaIds: [],
    team: null,
    fetchLoading: false,
    fetchError: null,
  },
};

export default function AddendumPatTimAuditReducer(
  state = initialState,
  action,
) {
  const { type, payload } = action;

  switch (type) {
    case types.SUBMIT_START:
      return { ...state, formLoading: true, formError: null };
    case types.SUBMIT_SUCCESSFUL:
      return { ...state, formLoading: false, formError: null };
    case types.SUBMIT_FAILED:
      return { ...state, formLoading: false, formError: payload };

    case types.SUBMIT_EDIT_START:
      return { ...state, editFormLoading: true, editFormError: null };
    case types.SUBMIT_EDIT_SUCCESSFUL:
      return { ...state, editFormLoading: false, editFormError: null };
    case types.SUBMIT_EDIT_FAILED:
      return { ...state, editFormLoading: false, formError: payload };

    case types.UPDATE_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          ...payload,
        },
      };

    case types.FETCH_START:
      return { ...state, loading: true, error: null };
    case types.FETCH_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        teams: payload.teams,
        page: {
          ...payload.page,
          currentPage: state.page.currentPage,
        },
      };
    case types.FETCH_FAILED:
      return { ...state, loading: false, error: payload };

    case types.DELETE_START:
      return { ...state, deleteLoading: true };
    case types.DELETE_SUCCESSFUL:
      return {
        ...state,
        deleteLoading: false,
        deleteError: null,
        teams: state.teams.filter((team) => team.id !== payload),
      };
    case types.DELETE_FAILED:
      return { ...state, deleteLoading: false, deleteError: payload };

    case types.OPEN_CREATE_MODAL:
      return { ...state, modal: { ...state.modal, create: true } };
    case types.CLOSE_CREATE_MODAL:
      return {
        ...state,
        modal: { ...state.modal, create: false },
        form: { ...initialState.form },
      };

    case types.OPEN_EDIT_MODAL:
      return { ...state, modal: { ...state.modal, edit: true } };
    case types.CLOSE_EDIT_MODAL:
      return {
        ...state,
        modal: { ...state.modal, edit: false },
        form: { ...initialState.form },
        edit: {
          ...state.edit,
          deletedAtaIds: [],
          editedAtaIds: [],
        },
      };

    case types.SET_CURRENT_EDITED_TEAM_ID:
      return {
        ...state,
        edit: {
          ...state.edit,
          currentTeamId: payload,
        },
      };

    case types.CHANGE_PAGE:
      return { ...state, page: { ...state.page, currentPage: payload } };

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
    default:
      return state;
  }
}
