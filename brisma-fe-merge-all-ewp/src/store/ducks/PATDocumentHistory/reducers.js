import * as types from "./types";

const initialState = {
  loading: false,
  error: null,
  data: [],
  // {
  // 	"id": 1,
  // 	"pat_id": 1,
  // 	"dokumen": "PAT AIW Medan",
  // 	"tanggal_document": "2022-02-07T07:09:34.902Z",
  // 	"adendum_no": 0,
  // 	"nama_lampiran": "PAT AIW Medan",
  // 	"document_location": "./public/document/N-1.pdf",
  // 	"createdAt": "2022-02-07T07:09:34.902Z",
  // 	"updatedAt": "2022-02-07T07:09:34.902Z"
  // }
};

export default function patDocumentHistoryReducer(
  state = initialState,
  action,
) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_DOCUMENTS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FETCH_DOCUMENTS_SUCCESSFUL:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case types.FETCH_DOCUMENTS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
}
