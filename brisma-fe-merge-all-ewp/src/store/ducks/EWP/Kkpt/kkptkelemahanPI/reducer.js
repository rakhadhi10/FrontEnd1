import * as types from "./types";

const initialState = {
    loading: false,
    error: false,
    message: "",
    data: {}
};


export default function kkptKelemahanSaveReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.SAVE_KELEMAHAN_KKPT_START:
            return {
                ...state,
                loading: true,
                message: "Mohon menunggu sedang diproses"
            }
        case types.SAVE_KELEMAHAN_KKPT_SUCCESS:

            return {
                ...state,
                loading: false,
                message: "Insert Kelemahan Kkpt Successfully",
                data: actions.payload
            }
        case types.SAVE_KELEMAHAN_KKPT_FAILED:

            return {
                ...state,
                loading: false,
                error: true,
                message: "Terjadi Kesalahan dalam proses insert kpi",
            }

        default:
            return state;
    }

}