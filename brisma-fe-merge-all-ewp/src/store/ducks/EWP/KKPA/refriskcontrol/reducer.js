import * as types from "./types";

const initialState = {
    loading: false,
    error: false,
    message: "",
    data: []
};


export default function refRiskControlReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.FETCH_REF_CONTROL_START:
            return {
                ...state,
                loading: true
            }
        case types.FECTH_REF_CONTROL_SUCCESS:
            return {
                ...state,
                loading: false,
                message: "mtd_risk_control_matrix",
                data: actions.payload
            }
        case types.FETCH_REF_CONTROL_FAILED:
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