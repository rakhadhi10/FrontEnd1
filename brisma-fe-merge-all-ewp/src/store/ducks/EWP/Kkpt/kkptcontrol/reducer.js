import * as types from "./types";

const initialState = {
    loading: false,
    error: false,
    message: "",
    data: [],
    messageUpdate: "",
    loadingUpdate: "",
    errorUpdate: "",
};


export default function kkptControlReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.CREATE_KKPT_CONTROL_START:
            return {
                ...state,
                loadingUpdate: true,
                messageUpdate: "waiting...",

            }
        case types.CREATE_KKPT_CONTROL_SUCCESS:
            return {
                ...state,
                loadingUpdate: false,
                messageUpdate: "Created Success",
            }
        case types.CREATE_KKPT_CONTROL_FAILED:
            return {
                ...state,
                loadingUpdate: false,
                errorUpdate: true,
                messageUpdate: "Gagal Create Data CONTROL",
            }
        case types.GET_KKPT_CONTROL_START:
            return {
                ...state,
                loading: true,
                message: "Mohon menunggu sedang diproses",
            }
        case types.GET_KKPT_CONTROL_SUCCESS:
            const { data } = actions.payload
            return {
                ...state,
                loading: false,
                message: "berhasil menampilkan data CONTROL Kkpt ",
                data: data.mtd_controls
            }
        case types.GET_KKPT_CONTROL_FAILED:

            return {
                ...state,
                loading: false,
                error: true,
                message: "Terjadi Kesalahan dalam proses menapilkan data CONTROL",
            }


        default:
            return state;
    }

}