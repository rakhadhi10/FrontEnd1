import * as types from "./types";

const initialState = {
  loading: false,
  error: null,
  data: [],
  loadingSummary: false,
  errorSummary: null,
  dataSummary: [],
  loadingMapaSample: false,
  errorMapaSample: null,
  dataMapaSample: [],
  loadingSubmitAuditor: false,
  errorSubmitAuditor: null,
};

export default function mapaPenugasanReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_START:
      return { ...state, loading: true };
    case types.FETCH_SUCCESSFUL:
      return { ...state, loading: false, data: payload };
    case types.FETCH_FAILED:
      return { ...state, loading: false, error: payload };

    case types.FETCH_SUMMARY_START:
      return { ...state, loadingSummary: true };
    case types.FETCH_SUMMARY_SUCCESSFUL:
      return { ...state, loadingSummary: false, dataSummary: payload };
    case types.FETCH_SUMMARY_FAILED:
      return { ...state, loadingSummary: false, errorSummary: payload };

    case types.FETCH_MAPA_SAMPLE_START:
      return { ...state, loadingMapaSample: true };
    case types.FETCH_MAPA_SAMPLE_SUCCESSFUL:
      return { ...state, loadingMapaSample: false, dataMapaSample: payload };
    case types.FETCH_MAPA_SAMPLE_FAILED:
      return { ...state, loadingMapaSample: false, errorMapaSample: payload };

    case types.SUBMIT_AUDITOR_START:
      return { ...state, loadingSubmitAuditor: true, errorSubmitAuditor: null };
    case types.SUBMIT_AUDITOR_SUCCESSFUL:
      return { ...state, loadingSubmitAuditor: false, errorSubmitAuditor: null };
    case types.SUBMIT_AUDITOR_FAILED:
      return { ...state, loadingSubmitAuditor: false, errorSubmitAuditor: payload };

    default:
      return state;
  }
}
