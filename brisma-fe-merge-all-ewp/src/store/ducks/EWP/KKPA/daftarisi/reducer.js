import * as types from "./types";

const initialState = {
    loading: false,
    error: false,
    message: "",
    data: []
};


export default function daftarIsiReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.FETCH_DAFTAR_ISI_START:
            return {
                ...state,
                loading: true
            }
        case types.FECTH_DAFTAR_ISI_SUCCESS:
            return {
                ...state,
                loading: false,
                message: "Ref Bab Daftar Isi",
                data: actions.payload
            }
        case types.FETCH_DAFTAR_ISI_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
                message: "error ni",
            }

        default:
            return state;
    }

}