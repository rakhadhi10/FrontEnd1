import * as types from "./types";

const initialState = {
    loading: false,
    error: false,
    message: "",
    data: []
};


export default function kkptListReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.FETCH_START:
            return {
                ...state,
                loading: true
            }
        case types.FECTH_SUCCESS:
            return {
                ...state,
                loading: false,
                message: "sssss",
                data: actions.payload
            }
        case types.FETCH_FAILED:
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