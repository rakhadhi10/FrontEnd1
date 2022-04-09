import * as types from "./types";

const initialState = {
    loading: false,
    error: false,
    message: "",
    data: {
        likelihood: null,
        mtd_stc_likelihood: null
    }
};


export default function kkptLikehoodReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.GET_KKPT_LIKEHOOD_START:
            return {
                ...state,
                loading: true,
                message: "Mohon menunggu sedang diproses",

            }
        case types.GET_KKPT_LIKEHOOD_SUCCESS:

            return {
                ...state,
                loading: false,
                message: "berhasil menampilkan LIKEHOOD Kkpt ",
                data: actions.payload
            }
        case types.GET_KKPT_LIKEHOOD_FAILED:

            return {
                ...state,
                loading: false,
                error: true,
                message: "Terjadi Kesalahan dalam proses menapilkan LIKEHOOD",

            }

        default:
            return state;
    }

}