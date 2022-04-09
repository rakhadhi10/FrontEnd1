import * as types from "./types";

const initialState = {
    loading: false,
    error: false,
    message: null,
};


export default function programAuditReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.SAVE_PRO_AUDIT_LOADING:
            return {
                ...state,
                loading: true
            }
        case types.SAVE_PRO_AUDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                message: actions.payload,
            }
        case types.SAVE_PRO_AUDIT_FAILED:
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