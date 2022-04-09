import * as types from "./types";

const initialState = {
    loading: false,
    error: false,
    message: "",
    id_bab: "",
    data: []
};


export default function commentReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.FETCH_COMMENT_START:
            return {
                ...state,
                loading: true
            }
        case types.FECTH_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                message: "data comment",
                id_bab: actions.payload.bab,
                data: actions.payload.data
            }
        case types.FETCH_COMMENT_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
                message: "error",
            }

        default:
            return state;
    }

}