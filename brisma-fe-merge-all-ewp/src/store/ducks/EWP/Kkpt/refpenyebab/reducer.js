import * as types from "./types";

const initialState = {
    loadingRef: false,
    errorRef: false,
    messageRef: "",
    dataRef: []
};


export default function kkptReferencePenyebabReducer(state = initialState, actions) {

    switch (actions.type) {
        case types.GET_REFERENCE_KKPT_PENYEBAB_START:
            return {
                ...state,
                loadingRef: true
            }
        case types.GET_REFERENCE_KKPT_PENYEBAB_SUCCESS:
            return {
                ...state,
                loadingRef: false,
                messageRef: "Berhasil Menampilkan List Penyebab",
                dataRef: actions.payload
            }
        case types.GET_REFERENCE_KKPT_PENYEBAB_FAILED:
            return {
                ...state,
                loadingRef: false,
                errorRef: true,
                messageRef: "error ni",
            }

        default:
            return state;
    }

}