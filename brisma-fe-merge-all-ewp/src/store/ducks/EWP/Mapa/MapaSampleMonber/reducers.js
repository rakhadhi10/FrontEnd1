import * as types from "./types";

const initialState = {
  dataMapaSampleMonber: [],
  loadingMapaSampleMonber: false,
  errorMapaSampleMonber: null,

  dataPoolSampleMonber: [],
  loadingPoolSampleMonber: false,
  errorPoolSampleMonber: null,

  dataContentPoolSampleMonber: {
    nama_database: "",
    nama_tabel: "",
    jumlah_baris: 0,
    poolMBR: {},
    existingSample: [],
    content: [],
  },

  loadingContentPoolSampleMonber: false,
  errorContentPoolSampleMonber: null,

  loadingUpdateMapaSampleMonber: false,
  errorUpdateMapaSampleMonber: null,

  loadingDeleteMapaSampleMonber: false,
  errorDeleteMapaSampleMonber: null,
};

export default function mapaSampleMonberReducers(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_MAPA_SAMPLE_MONBER_START:
      return { ...state, loadingMapaSampleMonber: true };
    case types.FETCH_MAPA_SAMPLE_MONBER_SUCCESSFUL:
      return {
        ...state,
        loadingMapaSampleMonber: false,
        dataMapaSampleMonber: payload,
      };
    case types.FETCH_MAPA_SAMPLE_MONBER_FAILED:
      return {
        ...state,
        loadingMapaSampleMonber: false,
        errorMapaSampleMonber: payload,
      };

    case types.FETCH_POOL_SAMPLE_MONBER_START:
      return { ...state, loadingPoolSampleMonber: true };
    case types.FETCH_POOL_SAMPLE_MONBER_SUCCESSFUL:
      return {
        ...state,
        loadingPoolSampleMonber: false,
        dataPoolSampleMonber: payload,
      };
    case types.FETCH_POOL_SAMPLE_MONBER_FAILED:
      return {
        ...state,
        loadingPoolSampleMonber: false,
        errorPoolSampleMonber: payload,
      };

    case types.FETCH_CONTENT_MAPA_SAMPLE_MONBER_START:
      return { ...state, loadingContentPoolSampleMonber: true };
    case types.FETCH_CONTENT_MAPA_SAMPLE_MONBER_SUCCESSFUL:
      return {
        ...state,
        loadingContentPoolSampleMonber: false,
        dataContentPoolSampleMonber: payload,
      };
    case types.FETCH_CONTENT_MAPA_SAMPLE_MONBER_FAILED:
      return {
        ...state,
        loadingContentPoolSampleMonber: false,
        errorContentPoolSampleMonber: payload,
      };

    case types.SUBMIT_UPDATE_MAPA_SAMPLE_MONBER_START:
      return { ...state, loadingUpdateMapaSampleMonber: true };
    case types.SUBMIT_UPDATE_MAPA_SAMPLE_MONBER_SUCCESSFUL:
      return {
        ...state,
        loadingUpdateMapaSampleMonber: false,
        errorUpdateMapaSampleMonber: null,
      };
    case types.SUBMIT_UPDATE_MAPA_SAMPLE_MONBER_FAILED:
      return {
        ...state,
        loadingUpdateMapaSampleMonber: false,
        errorUpdateMapaSampleMonber: payload,
      };

    case types.DELETE_MAPA_SAMPLE_MONBER_START:
      return { ...state, loadingDeleteMapaSampleMonber: true };
    case types.DELETE_MAPA_SAMPLE_MONBER_SUCCESSFUL:
      return { ...state, loadingDeleteMapaSampleMonber: false };
    case types.DELETE_MAPA_SAMPLE_MONBER_FAILED:
      return {
        ...state,
        loadingDeleteMapaSampleMonber: false,
        errorDeleteMapaSampleMonber: payload,
      };

    default:
      return state;
  }
}
