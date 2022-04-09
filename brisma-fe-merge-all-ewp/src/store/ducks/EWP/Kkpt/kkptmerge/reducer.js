import * as types from "./types";

const initialState = {
    loadingList: false,
    errorList: false,
    messageList: "",
    dataList: [],
    loadingHistory: false,
    errorHistory: false,
    messageHistory: "",
    dataHistory: [],
    loadingCreate: false,
    errorCreate: false,
    messageCreate: "",
    loadingHistory: false,
    errorHistory: false,
    messageHistory: "",
    dataHistory: []
};


export default function kkptMergeReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.FETCH_START_LIST:
            return {
                ...state,
                loadingList: true
            }
        case types.FECTH_SUCCESS_LIST:
            return {
                ...state,
                loadingList: false,
                messageList: "data list kkpt",
                dataList: actions.payload
            }
        case types.FETCH_FAILED_LIST:
            return {
                ...state,
                loadingList: false,
                errorList: true,
                messageList: "error ni",
            }
        case types.GET_MERGE_HISTORY_START:
            return {
                ...state,
                loadingHistory: true
            }
        case types.GET_MERGE_HISTORY_SUCCESS:
            return {
                ...state,
                loadingHistory: false,
                messageHistory: "data list kkpt",
                dataHistory: actions.payload
            }
        case types.GET_MERGE_HISTORY_FAILED:
            return {
                ...state,
                loadingHistory: false,
                errorHistory: true,
                messageHistory: "error ni",
            }
        case types.CREATE_MERGE_START:
            return {
                ...state,
                loadingCreate: true
            }
        case types.CREATE_MERGE_SUCCESS:
            return {
                ...state,
                loadingCreate: false,
                messageCreate: "Berhasil Merge Kkpt yang dipilih",
            }
        case types.CREATE_MERGE_FAILED:
            return {
                ...state,
                loadingCreate: false,
                errorCreate: true,
                messageCreate: "Terjadi kesalahan dalam proses merge",
            }

        default:
            return state;
    }

}