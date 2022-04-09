import * as types from "./types";

const initialState = {
    loading: false,
    error: false,
    message: "",
    data: {}
};


export default function kkptKondisiSaveReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.SAVE_KONDISI_KKPT_START:
            return {
                ...state,
                loading: true,
                message: "Mohon menunggu sedang diproses"
            }
        case types.SAVE_KONDISI_KKPT_SUCCESS:

            return {
                ...state,
                loading: false,
                message: "Insert KONDISI Kkpt Successfully",
                data: actions.payload
            }
        case types.SAVE_KONDISI_KKPT_FAILED:

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