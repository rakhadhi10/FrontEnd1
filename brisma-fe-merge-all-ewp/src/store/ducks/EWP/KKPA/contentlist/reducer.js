import * as types from "./types";

const initialState = {
    loading: false,
    error: false,
    message: "",
    data: ""
};


export default function contentReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.FETCH_CONTENT_START:
            return {
                ...state,
                loading: true
            }
        case types.FECTH_CONTENT_SUCCESS:
            return {
                ...state,
                loading: false,
                message: "Content Bab Kkpa",
                data: actions.payload
            }
        case types.FETCH_CONTENT_FAILED:
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