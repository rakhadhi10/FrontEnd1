import * as types from "./types";

const initialState = {
    loading: false,
    error: false,
    message: "",
    data: {},
    loadingResiko: false,
    errorResiko: false,
    tipe_resiko: [],
    loadingFocus: false,
    errorFocus: false,
    focus_audit: [],
    loadingProduk: false,
    errorProduk: false,
    produk: []

};


export default function kkptInfoSaveReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.SAVE_INFO_KKPT_START:
            return {
                ...state,
                loading: true,
                message: "Mohon menunggu sedang diproses"
            }
        case types.SAVE_INFO_KKPT_SUCCESS:

            return {
                ...state,
                loading: false,
                message: "Insert Info Kkpt Successfully",
                data: actions.payload
            }
        case types.SAVE_INFO_KKPT_FAILED:

            return {
                ...state,
                loading: false,
                error: true,
                message: "Terjadi Kesalahan",
            }
        case types.GET_TIPE_RESIKO_START:
            return {
                ...state,
                loadingResiko: true,
            }
        case types.GET_TIPE_RESIKO_SUCCESS:
            return {
                ...state,
                loadingResiko: false,
                tipe_resiko: actions.payload
            }
        case types.GET_TIPE_RESIKO_FAILED:
            return {
                ...state,
                loadingResiko: false,
                errorResiko: true
            }
        case types.GET_FOCUS_AUDIT_START:
            return {
                ...state,
                loadingFocus: true,
            }
        case types.GET_FOCUS_AUDIT_SUCCESS:
            return {
                ...state,
                loadingFocus: false,
                focus_audit: actions.payload
            }
        case types.GET_FOCUS_AUDIT_FAILED:
            return {
                ...state,
                loadingFocus: false,
                errorFocus: true
            }
        case types.GET_PRODUK_START:
            return {
                ...state,
                loadingProduk: true,
            }
        case types.GET_PRODUK_SUCCESS:
            return {
                ...state,
                loadingProduk: false,
                produk: actions.payload
            }
        case types.GET_PRODUK_FAILED:
            return {
                ...state,
                loadingProduk: false,
                errorProduk: true
            }

        default:
            return state;
    }

}