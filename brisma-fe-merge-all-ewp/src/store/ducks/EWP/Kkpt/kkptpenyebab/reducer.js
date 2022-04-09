import * as types from "./types";

const initialState = {
    loading: false,
    error: false,
    message: "",
    data: [],
    dataPn: []
};


export default function kkptPenyebabReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.CREATE_KKPT_PENYEBAB_START:
            return {
                ...state,
                loading: true,
                message: "waiting...",
                data: state.data
            }
        case types.CREATE_KKPT_PENYEBAB_SUCCESS:
            return {
                ...state,
                loading: false,
                message: "Created Success",
                data: state.data
            }
        case types.CREATE_KKPT_PENYEBAB_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
                message: "Gagal Create Data Penyebab",
                data: state.data
            }
        case types.GET_KKPT_PENYEBAB_START:
            return {
                ...state,
                loading: true,
                message: "Mohon menunggu sedang diproses",
            }
        case types.GET_KKPT_PENYEBAB_SUCCESS:
            const { dataAllGet, dataPn } = actions.payload
            return {
                ...state,
                loading: false,
                message: "berhasil menampilkan data penyebab Kkpt ",
                data: dataAllGet,
                dataPn: dataPn
            }
        case types.GET_KKPT_PENYEBAB_FAILED:

            return {
                ...state,
                loading: false,
                error: true,
                message: "Terjadi Kesalahan dalam proses menapilkan data penyebab",
            }
        case types.DELETE_KKPT_PENYEBAB_START:
            return {
                ...state,
                loading: true,
                message: "Mohon menunggu sedang diproses",
            }
        case types.DELETE_KKPT_PENYEBAB_SUCCESS:

            return {
                ...state,
                loading: false,
                message: "deleted success",
            }
        case types.DELETE_KKPT_PENYEBAB_FAILED:

            return {
                ...state,
                loading: false,
                error: true,
                message: "deleted unsuccess",
            }

        default:
            return state;
    }

}