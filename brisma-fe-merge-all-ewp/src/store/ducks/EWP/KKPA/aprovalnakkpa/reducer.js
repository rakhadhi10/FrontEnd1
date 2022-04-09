import * as types from "./types";

const initialState = {
    loading: true,
    error: false,
    message: "",
};


export default function approvalKkpaReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.LOADING_APPROVAL:
            return {
                ...state,
                loading: true,
                error: false,
                message: "Permintaan Sedang Di Proses"
            }
        case types.LOADING_NA:
            return {
                ...state,
                loading: true,
                error: false,
                message: "Permintaan Sedang Di Proses"
            }
        case types.SEND_APPROVAL:
            return {
                ...state,
                loading: false,
                error: false,
                message: "Berhasil Melakukan Approval"
            }
        case types.FAILED_APPROVAL:
            return {
                ...state,
                loading: false,
                error: true,
                message: "Gagal Melakukan Approval"
            }
        case types.FAILED_NA:
            return {
                ...state,
                loading: false,
                error: true,
                message: "Gagal Melakukan Proses NA"
            }
        case types.SEND_NA:
            return {
                ...state,
                loading: false,
                error: false,
                message: "Berhasil Memproses"
            }


        default:
            return state;
    }

}