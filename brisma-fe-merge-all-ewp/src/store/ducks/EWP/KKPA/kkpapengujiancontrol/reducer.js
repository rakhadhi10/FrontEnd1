import * as types from "./types";

const initialState = {
    loading: false,
    error: false,
    message: "",
    data: {}
};


export default function kkpaPengujianControlSaveReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.SAVE_PENGUJIAN_KKPA_START:
            return {
                ...state,
                loading: true,
                message: "Mohon menunggu sedang diproses"
            }
        case types.SAVE_PENGUJIAN_KKPA_SUCCESS:

            return {
                ...state,
                loading: false,
                message: "Insert pengujian control Kkpt Successfully",
            }
        case types.SAVE_PENGUJIAN_KKPA_FAILED:

            return {
                ...state,
                loading: false,
                error: true,
                message: "Terjadi Kesalahan",
            }

        default:
            return state;
    }

}