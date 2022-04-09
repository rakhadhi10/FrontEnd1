import * as types from "./types";

const initialState = {
    loading: false,
    error: false,
    message: "",
    data: {}
};


export default function kkptKriteriaSaveReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.SAVE_KRITERIA_KKPT_START:
            return {
                ...state,
                loading: true,
                message: "Mohon menunggu sedang diproses"
            }
        case types.SAVE_KRITERIA_KKPT_SUCCESS:

            return {
                ...state,
                loading: false,
                message: "Insert KRITERIA Kkpt Successfully",
                data: actions.payload
            }
        case types.SAVE_KRITERIA_KKPT_FAILED:

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