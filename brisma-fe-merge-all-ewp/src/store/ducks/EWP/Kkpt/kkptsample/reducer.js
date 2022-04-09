import * as types from "./types";

const initialState = {
    loading: false,
    error: false,
    message: "",
    data: {
        file: [],
        csv: [],
        monber: [],
        frd: []
    },
    loadingUpdate: false,
    errorUpdate: false,
    messageUpdate: "",
};


export default function kkptSampleReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.GET_KKPT_SAMPLE_START:
            return {
                ...state,
                loading: true,
                message: "Mohon menunggu sedang diproses",

            }
        case types.GET_KKPT_SAMPLE_SUCCESS:

            return {
                ...state,
                loading: false,
                message: "berhasil menampilkan sample Kkpt ",
                data: actions.payload
            }
        case types.GET_KKPT_SAMPLE_FAILED:

            return {
                ...state,
                loading: false,
                error: true,
                message: "Terjadi Kesalahan dalam proses menapilkan sample",
            }
        case types.SELECT_KKPT_SAMPLE_START:

            return {
                ...state,
                loadingUpdate: true,
                messageUpdate: "Waiting....",
            }

        case types.SELECT_KKPT_SAMPLE_SUCCESS:
            return {
                ...state,
                loadingUpdate: false,
                messageUpdate: "sample saved",
            }
        case types.SELECT_KKPT_SAMPLE_FAILED:

            return {
                ...state,
                loadingUpdate: false,
                errorUpdate: true,
                messageUpdate: "Terjadi Kesalahan dalam penyimpanan sample",
            }
        case types.SELECT_KKPT_SAMPLE_EMPTY_SAMPLE:

            return {
                ...state,
                loadingUpdate: false,
                errorUpdate: true,
                messageUpdate: "Silahkan pilih sample",
            }
        default:
            return state;
    }

}