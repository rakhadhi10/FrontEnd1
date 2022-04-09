import * as types from "./types";

const initialState = {
  loading: false,
  error: null,
  data: null,
  // data: {
  //   pic_latar_belakang_tujuan: null,
  //   pic_sumber_informasi: null,
  //   pic_tim_audit: null,
  //   pic_jadwal_audit: null,
  //   pic_jadwal_sbp: null,
  //   pic_anggaran: null,
  //   pic_document: null,
  //   pat_name: null,
  //   tahun: null,
  //   riwayat_adendum: null,
  //   status_kode: null,
  //   nama_status: null,
  //   nama_persetujuan: null,
  //   kode: null,
  //   uka_nama: null,
  //   status_pat: null,
  // },
};

export default function patProjectReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_STATUS_START:
      return { ...state, loading: true };
    case types.FETCH_STATUS_SUCCESS:
      return { ...state, loading: false, data: payload };
    case types.FETCH_STATUS_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}
