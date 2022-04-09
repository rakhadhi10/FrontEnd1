import * as types from "./types";

const initialState = {
  auditor: {
    data: [],
    loading: false,
    error: null,
  },
  auditee: {
    data: [],
    loading: false,
    error: null,
  },
  branch: {
    data: [],
    loading: false,
    error: null,
  },
  orgehWithBranch: {
    orgeh: [],
    branchMap: {},
    loading: false,
    error: null,
  },
  sbp: {
    data: [],
    loading: false,
    error: null,
  },
  branchChildren: {
    data: [],
    lastBranchCode: null,
    loading: false,
    error: null,
  },
  orgeh: {
    data: [],
    lastOrgehCode: null,
    loading: false,
    error: null,
  },
};

export default function searchReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.SEARCH_AUDITOR_START:
      return {
        ...state,
        auditor: {
          ...state.auditor,
          loading: true,
          error: null,
          data: [],
        },
      };
    case types.SEARCH_AUDITOR_SUCCESS:
      return {
        ...state,
        auditor: {
          ...state.auditor,
          loading: false,
          error: null,
          data: payload,
        },
      };
    case types.SEARCH_AUDITOR_FAIL:
      return {
        ...state,
        auditor: {
          ...state.auditor,
          loading: false,
          error: payload,
        },
      };

    case types.SEARCH_AUDITEE_START:
      return {
        ...state,
        auditee: {
          ...state.auditee,
          loading: true,
          error: null,
          data: [],
        },
      };
    case types.SEARCH_AUDITEE_SUCCESS:
      return {
        ...state,
        auditee: {
          ...state.auditee,
          loading: false,
          error: null,
          data: payload,
        },
      };
    case types.SEARCH_AUDITEE_FAIL:
      return {
        ...state,
        auditee: {
          ...state.auditee,
          loading: false,
          error: payload,
        },
      };

    case types.SEARCH_BRANCH_START:
      return {
        ...state,
        branch: {
          ...state.branch,
          loading: true,
          error: null,
          data: [],
        },
      };
    case types.SEARCH_BRANCH_SUCCESS:
      return {
        ...state,
        branch: {
          ...state.branch,
          loading: false,
          error: null,
          data: payload,
        },
      };
    case types.SEARCH_BRANCH_FAIL:
      return {
        ...state,
        branch: {
          ...state.branch,
          loading: false,
          error: payload,
        },
      };
    case types.SET_BRANCH:
      return {
        ...state,
        branch: {
          ...state.branch,
          data: payload,
        },
      };

    case types.SEARCH_ORGEH_START:
      return {
        ...state,
        orgeh: {
          ...state.orgeh,
          loading: true,
          error: null,
          data: [],
        },
      };
    case types.SEARCH_ORGEH_SUCCESS:
      return {
        ...state,
        orgeh: {
          ...state.orgeh,
          loading: false,
          error: null,
          data: payload.data,
          lastOrgehCode: payload.lastOrgehCode,
        },
      };
    case types.SEARCH_ORGEH_FAIL:
      return {
        ...state,
        orgeh: {
          ...state.orgeh,
          loading: false,
          error: payload,
        },
      };

    case types.SEARCH_ORGEH_BRANCH_START:
      return {
        ...state,
        orgehWithBranch: {
          ...state.orgehWithBranch,
          loading: true,
          error: null,
          orgeh: [],
          branchMap: {},
        },
      };
    case types.SEARCH_ORGEH_BRANCH_SUCCESS:
      return {
        ...state,
        orgehWithBranch: {
          ...state.orgehWithBranch,
          loading: false,
          error: null,
          orgeh: payload.orgeh,
          branchMap: payload.branchMap,
        },
      };
    case types.SEARCH_ORGEH_BRANCH_FAIL:
      return {
        ...state,
        orgehWithBranch: {
          ...state.orgehWithBranch,
          loading: false,
          error: payload,
        },
      };

    case types.SEARCH_SBP_START:
      return {
        ...state,
        sbp: {
          ...state.sbp,
          loading: true,
          error: null,
          data: [],
        },
      };
    case types.SEARCH_SBP_SUCCESS:
      return {
        ...state,
        sbp: {
          ...state.sbp,
          loading: false,
          error: null,
          data: payload,
        },
      };
    case types.SEARCH_SBP_FAIL:
      return {
        ...state,
        sbp: {
          ...state.sbp,
          loading: false,
          error: payload,
        },
      };

    case types.SEARCH_BRANCH_CHILDREN_START:
      return {
        ...state,
        branchChildren: {
          ...state.branchChildren,
          loading: true,
          error: null,
          data: [],
        },
      };
    case types.SEARCH_BRANCH_CHILDREN_SUCCESS:
      return {
        ...state,
        branchChildren: {
          ...state.branchChildren,
          loading: false,
          error: null,
          data: payload.data,
          lastBranchCode: payload.lastBranchCode,
        },
      };
    case types.SEARCH_BRANCH_CHILDREN_FAIL:
      return {
        ...state,
        branchChildren: {
          ...state.branchChildren,
          loading: false,
          error: payload,
        },
      };

    default:
      return state;
  }
}
