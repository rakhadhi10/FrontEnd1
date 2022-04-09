import * as types from "./types";

const initialState = {
  data: null,
  loading: false,
  error: null,
  submitLoading: false,
  submitError: null,
  updateLoading: false,
  updateError: null,
  deleteLoading: false,
  deleteError: null,
  dataTipeAnggaran: [],
  loadingTipeAnggaran: false,
  errorTipeAnggaran: null,
};

export default function mapaAnggaran(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_START:
      return { ...state, loading: true };
    case types.FETCH_SUCCESSFUL:
      return { ...state, loading: false, data: payload };
    case types.FETCH_FAILED:
      return { ...state, loading: false, error: payload };

    case types.FETCH_INIT_START:
      return { ...state, loading: true };
    case types.FETCH_INIT_SUCCESSFUL:
      return { ...state, loading: false, data: payload };
    case types.FETCH_INIT_FAILED:
      return { ...state, loading: false, error: payload };

    case types.SUBMIT_START:
      return { ...state, submitLoading: true };
    case types.SUBMIT_SUCCESSFUL:
      return { ...state, submitLoading: false, submitError: null };
    case types.SUBMIT_FAILED:
      return { ...state, submitLoading: false, submitError: payload };

    case types.UPDATE_START:
      return { ...state, updateLoading: true };
    case types.UPDATE_SUCCESSFUL:
      return { ...state, updateLoading: false, updateError: null };
    case types.UPDATE_FAILED:
      return { ...state, updateLoading: false, updateError: payload };

    case types.DELETE_START:
      return { ...state, deleteLoading: true };
    case types.DELETE_SUCCESSFUL:
      return { ...state, deleteLoading: false, deleteError: null };
    case types.DELETE_FAILED:
      return { ...state, deleteLoading: false, deleteError: payload };

    case types.FETCH_TIPE_ANGGARAN_START:
      return { ...state, loadingTipeAnggaran: true };
    case types.FETCH_TIPE_ANGGARAN_SUCCESSFUL:
      return { ...state, loadingTipeAnggaran: false, dataTipeAnggaran: payload };
    case types.FETCH_TIPE_ANGGARAN_FAILED:
      return { ...state, loadingTipeAnggaran: false, errorTipeAnggaran: payload };
    default:
      return state;
  }
}
