import * as types from "./types";

const initialState = {
  projects: {
    loading: false,
    error: null,
    data: [],
  },
  details: {
    modal: false,
    loading: false,
    error: null,
    data: {},
  },
  kkpts: {
    loading: false,
    error: null,
    data: {
      kkpt: [],
      mcs: {},
    },
  },
  kkpt_details: {
    loading: false,
    error: null,
    data: {
      kkpt: [],
      mcs: {},
      surat: {},
    },
  },
  assign: {
    modal: false,
    project_id: null,
    loading: false,
    error: null,
    updateLoading: false,
    data: {},
  },
  documents: {
    loading: false,
    error: null,
    data: [],
  },
};

export default function rpmAuditeeReducers(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_PROJECTS_START:
      return {
        ...state,
        projects: {
          ...state.projects,
          loading: true,
          error: null,
        },
      };
    case types.FETCH_PROJECTS_SUCCESSFUL:
      return {
        ...state,
        projects: {
          ...state.projects,
          loading: false,
          data: payload,
        },
      };
    case types.FETCH_PROJECTS_FAILED:
      return {
        ...state,
        projects: {
          ...state.projects,
          loading: false,
          error: payload,
        },
      };

    case types.FETCH_PROJECT_DETAILS_START:
      return {
        ...state,
        details: {
          ...state.details,
          loading: true,
          error: null,
        },
      };
    case types.FETCH_PROJECT_DETAILS_SUCCESSFUL:
      return {
        ...state,
        details: {
          ...state.details,
          loading: false,
          data: payload,
        },
      };
    case types.FETCH_PROJECT_DETAILS_FAILED:
      return {
        ...state,
        details: {
          ...state.details,
          loading: false,
          error: payload,
        },
      };

    case types.FETCH_KKPT_START:
      return {
        ...state,
        kkpts: {
          ...state.kkpts,
          loading: true,
          error: null,
        },
      };
    case types.FETCH_KKPT_SUCCESSFUL:
      return {
        ...state,
        kkpts: {
          ...state.kkpts,
          loading: false,
          data: payload,
        },
      };
    case types.FETCH_KKPT_FAILED:
      return {
        ...state,
        kkpts: {
          ...state.kkpts,
          loading: false,
          error: payload,
        },
      };

    case types.FETCH_KKPT_DETAILS_START:
      return {
        ...state,
        kkpt_details: {
          ...state.kkpt_details,
          loading: true,
          error: null,
        },
      };
    case types.FETCH_KKPT_DETAILS_SUCCESSFUL:
      return {
        ...state,
        kkpt_details: {
          ...state.kkpt_details,
          loading: false,
          data: payload,
        },
      };
    case types.FETCH_KKPT_DETAILS_FAILED:
      return {
        ...state,
        kkpt_details: {
          ...state.kkpt_details,
          loading: false,
          error: payload,
        },
      };

    case types.OPEN_ASSIGN_MODAL:
      return {
        ...state,
        assign: {
          ...state.assign,
          modal: true,
          project_id: payload,
        },
      };
    case types.CLOSE_ASSIGN_MODAL:
      return {
        ...state,
        assign: {
          ...state.assign,
          modal: false,
        },
      };
    case types.OPEN_DETAILS_MODAL:
      return {
        ...state,
        details: {
          ...state.details,
          modal: true,
        },
      };
    case types.CLOSE_DETAILS_MODAL:
      return {
        ...state,
        details: {
          ...state.details,
          modal: false,
        },
      };

    case types.FETCH_MCS_START:
      return {
        ...state,
        assign: {
          ...state.assign,
          loading: true,
          error: null,
        },
      };
    case types.FETCH_MCS_SUCCESSFUL:
      return {
        ...state,
        assign: {
          ...state.assign,
          loading: false,
          error: null,
          data: payload,
        },
      };
    case types.FETCH_MCS_FAILED:
      return {
        ...state,
        assign: {
          ...state.assign,
          loading: false,
          error: payload,
        },
      };
    case types.UPDATE_MCS_START:
      return {
        ...state,
        assign: {
          ...state.assign,
          updateLoading: true,
        },
      };
    case types.UPDATE_MCS_SUCCESSFUL:
      return {
        ...state,
        assign: {
          ...state.assign,
          updateLoading: false,
        },
      };
    case types.UPDATE_MCS_FAILED:
      return {
        ...state,
        assign: {
          ...state.assign,
          updateLoading: false,
        },
      };

    case types.FETCH_DOCUMENTS_START:
      return {
        ...state,
        documents: {
          ...state.documents,
          loading: true,
          error: null,
        },
      };
    case types.FETCH_DOCUMENTS_SUCCESSFUL:
      return {
        ...state,
        documents: {
          ...state.documents,
          loading: false,
          data: payload,
        },
      };
    case types.FETCH_DOCUMENTS_FAILED:
      return {
        ...state,
        documents: {
          ...state.documents,
          loading: false,
          error: payload,
        },
      };
    default:
      return state;
  }
}
