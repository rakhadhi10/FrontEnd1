import * as types from "./types";

const initialState = {
  aiw: {
    loading: false,
    error: null,
    data: {},
  },
  aiti: {
    loading: false,
    error: null,
    data: {},
  },
  aikp: {
    loading: false,
    error: null,
    data: {},
  },
};

export default function addendumPatTargetAuditReducer(
  state = initialState,
  action,
) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_AIW_START:
      return {
        ...state,
        aiw: {
          ...state.aiw,
          loading: true,
          error: null,
        },
      };
    case types.FETCH_AIW_SUCCESSFUL:
      return {
        ...state,
        aiw: {
          ...state.aiw,
          loading: false,
          data: payload,
        },
      };
    case types.FETCH_AIW_FAILED:
      return {
        ...state,
        aiw: {
          ...state.aiw,
          loading: false,
          error: payload,
        },
      };

    case types.FETCH_AITI_START:
      return {
        ...state,
        aiti: {
          ...state.aiti,
          loading: true,
          error: null,
        },
      };
    case types.FETCH_AITI_SUCCESSFUL:
      return {
        ...state,
        aiti: {
          ...state.aiti,
          loading: false,
          data: payload,
        },
      };
    case types.FETCH_AITI_FAILED:
      return {
        ...state,
        aiti: {
          ...state.aiti,
          loading: false,
          error: payload,
        },
      };

    case types.FETCH_AIKP_START:
      return {
        ...state,
        aikp: {
          ...state.aikp,
          loading: true,
          error: null,
        },
      };
    case types.FETCH_AIKP_SUCCESSFUL:
      return {
        ...state,
        aikp: {
          ...state.aikp,
          loading: false,
          data: payload,
        },
      };
    case types.FETCH_AIKP_FAILED:
      return {
        ...state,
        aikp: {
          ...state.aikp,
          loading: false,
          error: payload,
        },
      };

    default:
      return state;
  }
}
