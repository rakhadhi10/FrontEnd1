import * as types from "./types";

const initialState = {
    loading: false,
    error: false,
    message: null,
};


export default function kriteriaReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.SAVE_KRITERIA_LOADING:
            return {
                ...state,
                loading: true
            }
        case types.SAVE_KRITERIA_SUCCESS:
            return {
                ...state,
                loading: false,
                message: actions.payload,
            }
        case types.SAVE_KRITERIA_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
                message: actions.payload,
            }

        default:
            return state;
    }

}