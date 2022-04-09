import * as types from "./types";

const initialState = {
  loading: false,
  error: null,
  data: {
    approver: null,
    reason_approval: [],
    daftar_isi: [],
    data: [],
  },
  dataKomen: [],
  loadingKomen: false,
  errorKomen: null,
  loadingSubmitKomen: false,
  errorSubmitKomen: null,
  loadingSubmitCloseKomen: false,
  errorSubmitCloseKomen: null,
  loadingApproval: false,
  errorApproval: null,
  reason: "",
  catatan: [],
};

export default function mapaDokumen(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_START:
      return { ...state, loading: true };
    case types.FETCH_SUCCESSFUL:
      return { ...state, loading: false, data: payload };
    case types.FETCH_FAILED:
      return { ...state, loading: false, error: payload };

    case types.FETCH_KOMEN_START:
      return { ...state, loadingKomen: true };
    case types.FETCH_KOMEN_SUCCESSFUL:
      return { ...state, loadingKomen: false, dataKomen: payload };
    case types.FETCH_KOMEN_FAILED:
      return { ...state, loadingKomen: false, errorKomen: payload };

    case types.SUBMIT_KOMEN_START:
      return { ...state, loadingSubmitKomen: true };
    case types.SUBMIT_KOMEN_SUCCESSFUL:
      return { ...state, loadingSubmitKomen: false, errorSubmitKomen: null };
    case types.SUBMIT_KOMEN_FAILED:
      return { ...state, loadingSubmitKomen: false, errorSubmitKomen: payload };

    case types.SUBMIT_CLOSE_KOMEN_START:
      return { ...state, loadingSubmitCloseKomen: true };
    case types.SUBMIT_CLOSE_KOMEN_SUCCESSFUL:
      return {
        ...state,
        loadingSubmitCloseKomen: false,
        errorSubmitCloseKomen: null,
      };
    case types.SUBMIT_CLOSE_KOMEN_FAILED:
      return {
        ...state,
        loadingSubmitCloseKomen: false,
        errorSubmitCloseKomen: payload,
      };

    case types.SUBMIT_APPROVAL_DOC_START:
      return { ...state, loadingApproval: true };
    case types.SUBMIT_APPROVAL_DOC_SUCCESSFUL:
      return {
        ...state,
        loadingApproval: false,
        errorApproval: null,
        reason: "",
        catatan: payload,
      };
    case types.SUBMIT_APPROVAL_DOC_FAILED:
      return { ...state, loadingApproval: false, errorApproval: payload };

    case types.SET_REASON:
      return { ...state, reason: payload };
    default:
      return state;
  }
}
