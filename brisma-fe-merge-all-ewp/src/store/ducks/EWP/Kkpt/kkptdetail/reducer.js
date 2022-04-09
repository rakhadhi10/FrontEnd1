import * as types from "./types";

const initialState = {
    loading: false,
    error: false,
    message: "",
    data: null
};


export default function kkptDetailReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.FETCH_DETAIL_KKPT_START:
            return {
                ...state,
                loading: true
            }
        case types.FECTH_DETAIL_KKPT_SUCCESS:

            return {
                ...state,
                loading: false,
                message: "berhasil mengambl data detail kkpt",
                data: actions.payload
            }
        case types.FETCH_DETAIL_KKPT_FAILED:

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