import * as types from "./types";

const initialState = {
  loading: false,
  error: null,
  data: {
    list_ewp_new_approval: [],
    list_ewp_history_approval: [],
    info: [],
  },
  submitLoading: false,
  submitError: null,
};

export default function approvalEwpReducer(state = initialState, action) {
  const { type, payload, payload_detail } = action;

  switch (type) {
    case types.FETCH_START:
      return { ...state, loading: true };
    case types.FETCH_SUCCESSFUL:
      return { ...state, loading: false, data: payload };
    case types.FETCH_FAILED:
      return { ...state, loading: false, error: payload };

    case types.SUBMIT_START:
      return { ...state, submitLoading: true, submitError: null };
    case types.SUBMIT_SUCCESSFUL:
      return { ...state, submitLoading: false, submitError: null };
    case types.SUBMIT_FAILED:
      return { ...state, submitLoading: false, submitError: payload };
    default:
      return state;
  }
}
