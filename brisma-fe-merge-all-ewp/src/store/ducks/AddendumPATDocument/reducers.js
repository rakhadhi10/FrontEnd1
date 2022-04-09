import * as types from "./types";

const initialState = {
  info: {
    loading: false,
    error: null,
    pn_maker_akhir: null,
    pn_maker_pusat: null,
    is_final: false,
    stc_status_kode: "1",
    stc_persetujuan_kode: "101",
    checkers_ukas: [],
    signers_ukas: [],
    checkers_pusats: [],
    signers_pusats: [],
    logs: [],
  },
  // Bentuk json log persetujuan
  // {
  //   "id": 1,
  //   "from": null,
  //   "to": null,
  //   "pat_id": 1,
  //   "note": "Approve 17113",
  //   "is_approved": true
  // }
  form_uka: { checkers: [undefined], signers: [undefined] },
  form_pusat: { checkers: [undefined], signers: [undefined] },
  alasan: undefined,
  comments: [],
  ref_bab_pat_kode: 1,
  document_content: [],
};

export default function addendumPatDocumentReducer(
  state = initialState,
  action,
) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_INFO_START:
      return {
        ...state,
        info: {
          ...state.info,
          loading: true,
          error: null,
        },
      };
    case types.FETCH_INFO_SUCCESSFUL:
      return {
        ...state,
        info: {
          ...state.info,
          ...payload,
          loading: false,
        },
      };
    case types.FETCH_INFO_FAILED:
      return {
        ...state,
        info: {
          ...state.info,
          loading: false,
          error: payload,
        },
      };

    case types.FETCH_DOCUMENT_START:
      return {
        ...state,
        document_content: {
          ...state.document_content,
          loading: true,
          error: null,
        },
      };
    case types.FETCH_DOCUMENT_SUCCESSFUL:
      return {
        ...state,
        document_content: {
          ...state.document_content,
          ...payload,
          loading: false,
        },
      };
    case types.FETCH_DOCUMENT_FAILED:
      return {
        ...state,
        document_content: {
          ...state.document_content,
          loading: false,
          error: payload,
        },
      };

    case types.UPDATE_FORM_UKA:
      return { ...state, form_uka: payload };
    case types.UPDATE_FORM_PUSAT:
      return { ...state, form_pusat: payload };
    case types.UPDATE_ALASAN:
      return { ...state, alasan: payload };
    case types.UPDATE_COMMENTS:
      return { ...state, comments: payload };
    case types.UPDATE_REF_BAB_PAT_KODE:
      return { ...state, ref_bab_pat_kode: payload };

    default:
      return state;
  }
}
