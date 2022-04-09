import * as types from "./types";

const initialState = {
  loading: false,
  error: null,
  data: {
    sumber_informasi: null,
    pic_sumber_informasi_tujuan: {
      pn: null,
      nama: null,
      jabatan: null,
    },
    createdAt: null,
    updatedAt: null,
  },
  submitLoading: false,
  submitError: null,
};

export default function mapaSumberInformasiReducer(
  state = initialState,
  action
) {
  const { type, payload } = action;

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
