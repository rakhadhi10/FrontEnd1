import * as types from "./types";

const initialState = {
    loading: false,
    error: false,
    message: "",
    data: [],
};


export default function kkpaGetKkpt(state = initialState, actions) {

    switch (actions.type) {

        case types.GET_KKPT_START:
            return {
                ...state,
                loading: true,
                message: "Mohon menunggu sedang diproses"
            }
        case types.GET_KKPT_SUCCESS:

            return {
                ...state,
                loading: false,
                message: "GET Kkpt Successfully",
                data: actions.payload
            }
        case types.GET_KKPT_FAILED:

            return {
                ...state,
                loading: false,
                error: true,
                message: "Terjadi Kesalahan",
            }
        case types.CREATE_KKPT_START:
            return {
                ...state,
                loading: true,
                message: "Mohon menunggu sedang diproses"
            }
        case types.CREATE_KKPT_SUCCESS:

            return {
                ...state,
                loading: false,
                message: "CREATE Kkpt Successfully",
            }
        case types.CREATE_KKPT_FAILED:
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