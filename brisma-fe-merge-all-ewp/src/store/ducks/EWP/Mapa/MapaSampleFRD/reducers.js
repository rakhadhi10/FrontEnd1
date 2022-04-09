import * as types from "./types";

const initialState = {
  dataMapaSampleFRD: [],
  loadingMapaSampleFRD: false,
  errorMapaSampleFRD: null,

  dataPoolSampleFRD: [],
  loadingPoolSampleFRD: false,
  errorPoolSampleFRD: null,

  dataContentPoolSampleFRD: {
    nama_database: "",
    nama_tabel: "",
    jumlah_baris: 0,
    poolFRD: {},
    existingSample: [],
    content: [],
  },

  loadingContentPoolSampleFRD: false,
  errorContentPoolSampleFRD: null,

  loadingUpdateMapaSampleFRD: false,
  errorUpdateMapaSampleFRD: null,

  loadingDeleteMapaSampleFRD: false,
  errorDeleteMapaSampleFRD: null,
};

export default function mapaSampleFRDReducers(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_MAPA_SAMPLE_FRD_START:
      return { ...state, loadingMapaSampleFRD: true };
    case types.FETCH_MAPA_SAMPLE_FRD_SUCCESSFUL:
      return {
        ...state,
        loadingMapaSampleFRD: false,
        dataMapaSampleFRD: payload,
      };
    case types.FETCH_MAPA_SAMPLE_FRD_FAILED:
      return {
        ...state,
        loadingMapaSampleFRD: false,
        errorMapaSampleFRD: payload,
      };

    case types.FETCH_POOL_SAMPLE_FRD_START:
      return { ...state, loadingPoolSampleFRD: true };
    case types.FETCH_POOL_SAMPLE_FRD_SUCCESSFUL:
      return {
        ...state,
        loadingPoolSampleFRD: false,
        dataPoolSampleFRD: payload,
      };
    case types.FETCH_POOL_SAMPLE_FRD_FAILED:
      return {
        ...state,
        loadingPoolSampleFRD: false,
        errorPoolSampleFRD: payload,
      };

    case types.FETCH_CONTENT_MAPA_SAMPLE_FRD_START:
      return { ...state, loadingContentPoolSampleFRD: true };
    case types.FETCH_CONTENT_MAPA_SAMPLE_FRD_SUCCESSFUL:
      return {
        ...state,
        loadingContentPoolSampleFRD: false,
        dataContentPoolSampleFRD: payload,
      };
    case types.FETCH_CONTENT_MAPA_SAMPLE_FRD_FAILED:
      return {
        ...state,
        loadingContentPoolSampleFRD: false,
        errorContentPoolSampleFRD: payload,
      };

    case types.SUBMIT_UPDATE_MAPA_SAMPLE_FRD_START:
      return { ...state, loadingUpdateMapaSampleFRD: true };
    case types.SUBMIT_UPDATE_MAPA_SAMPLE_FRD_SUCCESSFUL:
      return {
        ...state,
        loadingUpdateMapaSampleFRD: false,
        errorUpdateMapaSampleFRD: null,
      };
    case types.SUBMIT_UPDATE_MAPA_SAMPLE_FRD_FAILED:
      return {
        ...state,
        loadingUpdateMapaSampleFRD: false,
        errorUpdateMapaSampleFRD: payload,
      };

    case types.DELETE_MAPA_SAMPLE_FRD_START:
      return { ...state, loadingDeleteMapaSampleFRD: true };
    case types.DELETE_MAPA_SAMPLE_FRD_SUCCESSFUL:
      return { ...state, loadingDeleteMapaSampleFRD: false };
    case types.DELETE_MAPA_SAMPLE_FRD_FAILED:
      return {
        ...state,
        loadingDeleteMapaSampleFRD: false,
        errorDeleteMapaSampleFRD: payload,
      };

    default:
      return state;
  }
}
