import * as types from "./types";

const initialState = {
  dataMapaSampleCSV: [],
  loadingMapaSampleCSV: false,
  errorMapaSampleCSV: null,

  dataPoolSampleCSV: [],
  loadingPoolSampleCSV: false,
  errorPoolSampleCSV: null,

  dataContentPoolSampleCSV: [],
  loadingContentPoolSampleCSV: false,
  errorContentPoolSampleCSV: null,

  loadingUploadSampleCSV: false,
  errorUploadSampleCSV: null,

  loadingUpdateMapaSampleCSV: false,
  errorUpdateMapaSampleCSV: null,

  loadingDeleteMapaSampleCSV: false,
  errorDeleteMapaSampleCSV: [],

  loadingDeletePoolSampleCSV: false,
  errorDeletePoolSampleCSV: null,
};

export default function mapaSampleCSVReducers(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_MAPA_SAMPLE_CSV_START:
      return { ...state, loadingMapaSampleCSV: true };
    case types.FETCH_MAPA_SAMPLE_CSV_SUCCESSFUL:
      return { ...state, loadingMapaSampleCSV: false, dataMapaSampleCSV: payload };
    case types.FETCH_MAPA_SAMPLE_CSV_FAILED:
      return { ...state, loadingMapaSampleCSV: false, errorMapaSampleCSV: payload };

    case types.FETCH_POOL_SAMPLE_CSV_START:
      return { ...state, loadingPoolSampleCSV: true };
    case types.FETCH_POOL_SAMPLE_CSV_SUCCESSFUL:
      return { ...state, loadingPoolSampleCSV: false, dataPoolSampleCSV: payload };
    case types.FETCH_POOL_SAMPLE_CSV_FAILED:
      return { ...state, loadingPoolSampleCSV: false, errorPoolSampleCSV: payload };

    case types.FETCH_CONTENT_POOL_SAMPLE_CSV_START:
      return { ...state, loadingContentPoolSampleCSV: true };
    case types.FETCH_CONTENT_POOL_SAMPLE_CSV_SUCCESSFUL:
      return { ...state, loadingContentPoolSampleCSV: false, dataContentPoolSampleCSV: payload };
    case types.FETCH_CONTENT_POOL_SAMPLE_CSV_FAILED:
      return { ...state, loadingContentPoolSampleCSV: false, errorContentPoolSampleCSV: payload };

    case types.SUBMIT_UPLOAD_SAMPLE_CSV_START:
      return { ...state, loadingUploadSampleCSV: true };
    case types.SUBMIT_UPLOAD_SAMPLE_CSV_SUCCESSFUL:
      return { ...state, loadingUploadSampleCSV: false, errorUploadSampleCSV: null };
    case types.SUBMIT_UPLOAD_SAMPLE_CSV_FAILED:
      return { ...state, loadingUploadSampleCSV: false, errorUploadSampleCSV: payload };

    case types.SUBMIT_UPDATE_MAPA_SAMPLE_CSV_START:
      return { ...state, loadingUpdateMapaSampleCSV: true };
    case types.SUBMIT_UPDATE_MAPA_SAMPLE_CSV_SUCCESSFUL:
      return { ...state, loadingUpdateMapaSampleCSV: false, errorUpdateMapaSampleCSV: null };
    case types.SUBMIT_UPDATE_MAPA_SAMPLE_CSV_FAILED:
      return { ...state, loadingUpdateMapaSampleCSV: false, errorUpdateMapaSampleCSV: payload };

    case types.DELETE_MAPA_SAMPLE_CSV_START:
      return { ...state, loadingDeleteMapaSampleCSV: true };
    case types.DELETE_MAPA_SAMPLE_CSV_SUCCESSFUL:
      return { ...state, loadingDeleteMapaSampleCSV: false };
    case types.DELETE_MAPA_SAMPLE_CSV_FAILED:
      return { ...state, loadingDeleteMapaSampleCSV: false, errorDeleteMapaSampleCSV: payload };

    case types.DELETE_POOL_SAMPLE_CSV_START:
      return { ...state, loadingDeletePoolSampleCSV: true };
    case types.DELETE_POOL_SAMPLE_CSV_SUCCESSFUL:
      return { ...state, loadingDeletePoolSampleCSV: false, errorDeletePoolSampleCSV: null };
    case types.DELETE_POOL_SAMPLE_CSV_FAILED:
      return { ...state, loadingDeletePoolSampleCSV: false, errorDeletePoolSampleCSV: payload };

    default:
      return state;
  }
}
