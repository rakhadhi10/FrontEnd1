import * as types from "./types";

const initialState = {
    loading: false,
    error: false,
    message: "",
    data: []
};


export default function kkptBabInfoReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.FETCH_START_BAB_KKPT:
            return {
                ...state,
                loading: true
            }
        case types.FECTH_SUCCESS_BAB_KKPT:
            return {
                ...state,
                loading: false,
                message: "sssss",
                data: actions.payload
            }
        case types.FETCH_FAILED_BAB_KKPT:
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