import * as types from "./types";

const initialState = {
  loading: false,
  error: null,
  data: [],
};

export default function approvalEwpDetailReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
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
