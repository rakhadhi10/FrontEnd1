import * as types from "./types";

const initialState = {
    loadingApproval: false,
    errorApproval: false,
    messageApproval: "",
    loadingNa: false,
    errorNa: false,
    messageNa: "",
};


export default function kkptApprovalSaveReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.SAVE_APPROVAL_KKPT_START:
            return {
                ...state,
                loadingApproval: true,
                messageApproval: "Mohon menunggu sedang diproses"
            }
        case types.SAVE_APPROVAL_KKPT_SUCCESS:

            return {
                ...state,
                loadingApproval: false,
                messageApproval: "Berhasil approval kkpt"
            }
        case types.SAVE_APPROVAL_KKPT_FAILED:

            return {
                ...state,
                loadingApproval: false,
                errorApproval: true,
                messageApproval: "Terjadi Kesalahan dalam proses approval",
            }
        case types.SAVE_NA_KKPT_START:
            return {
                ...state,
                loadingNa: true,
                messageNa: "Mohon menunggu sedang diproses"
            }
        case types.SAVE_NA_KKPT_SUCCESS:

            return {
                ...state,
                loadingNa: false,
                messageNa: "Berhasil NA kkpt"
            }
        case types.SAVE_NA_KKPT_FAILED:

            return {
                ...state,
                loadingNa: false,
                errorNa: true,
                messageNa: "Terjadi Kesalahan dalam proses na",
            }

        default:
            return state;
    }

}