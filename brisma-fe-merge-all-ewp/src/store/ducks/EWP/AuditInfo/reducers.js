import * as types from "./types";

const initialState = {
  loading: false,
  error: null,
  submitLoading: false,
  submitError: null,
  data: [],
};

export default function auditInfoEwpReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.SUBMIT_START:
      return { ...state, submitLoading: true, submitError: null };
    case types.SUBMIT_SUCCESSFUL:
      return { ...state, submitLoading: false, submitError: null };
    case types.SUBMIT_FAILED:
      return { ...state, submitLoading: false, submitError: payload };

    case types.FETCH_START:
      return { ...state, loading: true };
    case types.FETCH_SUCCESSFUL:
      return { ...state, loading: false, data: payload };
    case types.FETCH_FAILED:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}
