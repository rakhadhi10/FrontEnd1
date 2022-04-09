import * as types from "./types";

const initialState = {
    loading: false,
    error: false,
    message: "",
    info_kkpa: null,
    kkpa_info: null,
    unefective_control: null,
    kkpa_log_persetujuan: null
};


export default function kkpaInfoReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.FETCH_KKPA_BY_ID_START:
            return {
                ...state,
                loading: true
            }
        case types.FECTH_KKPA_BY_ID_SUCCESS:
            const datareal = actions.payload
            return {
                ...state,
                loading: false,
                message: "All Info Kkpa",
                info_kkpa: datareal.info_kkpa,
                kkpa_info: datareal.kkpa_info,
                unefective_control: datareal.unefective_control_sample,
                kkpa_log_persetujuan: datareal.kkpa_log_persetujuan
            }
        case types.FETCH_KKPA_BY_ID_FAILED:
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