import * as types from "./types";

const initialState = {
    loading: false,
    error: false,
    message: "",
    messageUpdate: "",
    loadingUpdate: "",
    errorUpdate: "",
    data: [],
};


export default function kkptRekomendasiReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.CREATE_KKPT_REKOMENDASI_START:
            return {
                ...state,
                loadingUpdate: true,
                messageUpdate: "waiting...",

            }
        case types.CREATE_KKPT_REKOMENDASI_SUCCESS:
            return {
                ...state,
                loadingUpdate: false,
                messageUpdate: "Updated Success",
            }
        case types.CREATE_KKPT_REKOMENDASI_FAILED:
            return {
                ...state,
                loadingUpdate: false,
                errorUpdate: true,
                messageUpdate: "Gagal update Data REKOMENDASI",
            }

        case types.DELETE_KKPT_REKOMENDASI_START:
            return {
                ...state,
                loadingUpdate: true,

            }
        case types.DELETE_KKPT_REKOMENDASI_SUCCESS:
            return {
                ...state,
                loadingUpdate: false,
                messageUpdate: "Deleted Success",
            }
        case types.DELETE_KKPT_REKOMENDASI_FAILED:
            return {
                ...state,
                loadingUpdate: false,
                errorUpdate: true,
                messageUpdate: "Gagal Deleted Data REKOMENDASI",
            }
        case types.GET_KKPT_REKOMENDASI_START:
            return {
                ...state,
                loading: true,
                message: "Mohon menunggu sedang diproses",
            }
        case types.GET_KKPT_REKOMENDASI_SUCCESS:

            return {
                ...state,
                loading: false,
                message: "berhasil menampilkan data rekomendasi Kkpt ",
                data: actions.payload,

            }
        case types.GET_KKPT_REKOMENDASI_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
                message: "Terjadi Kesalahan dalam proses menapilkan data REKOMENDASI",
            }


        default:
            return state;
    }

}