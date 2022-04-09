import * as types from "./types";

const initialState = {
    loadingCreate: false,
    errorCreate: false,
    messageCreate: "",
    loadingGet: false,
    errorGet: false,
    messageGet: "",
    data: {
        desc_impact: "",
        financial_impact_kode: "",
        financial_type_impact_kode: "",
        gross: "",
        id: 0,
        impact_kode: "",
        kkpt_id: 0,
        list_kerugian: [],
        list_nonfinancial: [],
        nonfinancial_impact_kode: "",
        total_kerugian: ""
    },
};


export default function kkptDampakReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.CREATE_KKPT_DAMPAK_START:
            return {
                ...state,
                loadingCreate: true,
                messageCreate: "waiting...",
            }
        case types.CREATE_KKPT_DAMPAK_SUCCESS:
            return {
                ...state,
                loadingCreate: false,
                messageCreate: "Created Success",
            }
        case types.CREATE_KKPT_DAMPAK_FAILED:
            return {
                ...state,
                loadingCreate: false,
                errorCreate: true,
                messageCreate: "Gagal Create Data DAMPAK",
            }
        case types.GET_KKPT_DAMPAK_START:
            return {
                ...state,
                loadingGet: true,
                messageGet: "Mohon menunggu sedang diproses",
            }
        case types.GET_KKPT_DAMPAK_SUCCESS:
            return {
                ...state,
                loadingGet: false,
                messageGet: "berhasil menampilkan data DAMPAK Kkpt ",
                data: actions.payload
            }
        case types.GET_KKPT_DAMPAK_FAILED:

            return {
                ...state,
                loadingGet: false,
                errorGet: true,
                messageGet: "Terjadi Kesalahan dalam proses menapilkan data dampak",
            }


        default:
            return state;
    }

}