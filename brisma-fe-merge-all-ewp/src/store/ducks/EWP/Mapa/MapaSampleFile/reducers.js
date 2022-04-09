import * as types from "./types";

const initialState = {
  dataMapaSampleFILE: [],
  loadingMapaSampleFILE: false,
  errorMapaSampleFILE: null,

  dataPoolSampleFILE: [],
  loadingPoolSampleFILE: false,
  errorPoolSampleFILE: null,

  loadingUploadSampleFILE: false,
  errorUploadSampleFILE: null,

  loadingUpdateMapaSampleFILE: false,
  errorUpdateMapaSampleFILE: null,

  loadingSaveMapaSampleFILE: false,
  errorSaveMapaSampleFILE: null,

  loadingDeleteMapaSampleFILE: false,
  errorDeleteMapaSampleFILE: [],

  loadingDeletePoolSampleFILE: false,
  errorDeletePoolSampleFILE: null,
};

export default function mapaSampleFILEReducers(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_MAPA_SAMPLE_FILE_START:
      return { ...state, loadingMapaSampleFILE: true };
    case types.FETCH_MAPA_SAMPLE_FILE_SUCCESSFUL:
      return { ...state, loadingMapaSampleFILE: false, dataMapaSampleFILE: payload };
    case types.FETCH_MAPA_SAMPLE_FILE_FAILED:
      return { ...state, loadingMapaSampleFILE: false, errorMapaSampleFILE: payload };

    case types.FETCH_POOL_SAMPLE_FILE_START:
      return { ...state, loadingPoolSampleFILE: true };
    case types.FETCH_POOL_SAMPLE_FILE_SUCCESSFUL:
      return { ...state, loadingPoolSampleFILE: false, dataPoolSampleFILE: payload };
    case types.FETCH_POOL_SAMPLE_FILE_FAILED:
      return { ...state, loadingPoolSampleFILE: false, errorPoolSampleFILE: payload };

    case types.SUBMIT_UPLOAD_SAMPLE_FILE_START:
      return { ...state, loadingUploadSampleFILE: true };
    case types.SUBMIT_UPLOAD_SAMPLE_FILE_SUCCESSFUL:
      return { ...state, loadingUploadSampleFILE: false, errorUploadSampleFILE: null };
    case types.SUBMIT_UPLOAD_SAMPLE_FILE_FAILED:
      return { ...state, loadingUploadSampleFILE: false, errorUploadSampleFILE: payload };

    case types.SUBMIT_UPDATE_MAPA_SAMPLE_FILE_START:
      return { ...state, loadingUpdateMapaSampleFILE: true };
    case types.SUBMIT_UPDATE_MAPA_SAMPLE_FILE_SUCCESSFUL:
      return { ...state, loadingUpdateMapaSampleFILE: false, errorUpdateMapaSampleFILE: null };
    case types.SUBMIT_UPDATE_MAPA_SAMPLE_FILE_FAILED:
      return { ...state, loadingUpdateMapaSampleFILE: false, errorUpdateMapaSampleFILE: payload };

    case types.SUBMIT_SAVE_MAPA_SAMPLE_FILE_START:
      return { ...state, loadingSaveMapaSampleFILE: true };
    case types.SUBMIT_SAVE_MAPA_SAMPLE_FILE_SUCCESSFUL:
      return { ...state, loadingSaveMapaSampleFILE: false, errorSaveMapaSampleFILE: null };
    case types.SUBMIT_SAVE_MAPA_SAMPLE_FILE_FAILED:
      return { ...state, loadingSaveMapaSampleFILE: false, errorSaveMapaSampleFILE: payload };

    case types.DELETE_MAPA_SAMPLE_FILE_START:
      return { ...state, loadingDeleteMapaSampleFILE: true };
    case types.DELETE_MAPA_SAMPLE_FILE_SUCCESSFUL:
      return { ...state, loadingDeleteMapaSampleFILE: false };
    case types.DELETE_MAPA_SAMPLE_FILE_FAILED:
      return { ...state, loadingDeleteMapaSampleFILE: false, errorDeleteMapaSampleFILE: payload };

    case types.DELETE_POOL_SAMPLE_FILE_START:
      return { ...state, loadingDeletePoolSampleFILE: true };
    case types.DELETE_POOL_SAMPLE_FILE_SUCCESSFUL:
      return { ...state, loadingDeletePoolSampleFILE: false, errorDeletePoolSampleFILE: null };
    case types.DELETE_POOL_SAMPLE_FILE_FAILED:
      return { ...state, loadingDeletePoolSampleFILE: false, errorDeletePoolSampleFILE: payload };

    default:
      return state;
  }
}
