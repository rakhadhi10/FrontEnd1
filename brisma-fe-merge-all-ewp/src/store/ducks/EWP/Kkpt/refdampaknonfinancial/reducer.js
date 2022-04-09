import * as types from "./types";

const initialState = {
    loadingImpackNoF: false,
    errorImpackNof: false,
    messageImpackNof: "",
    dataImpact: {
        reputasi: [],
        regulasi: [],
        pelayanan: [],
        strategis: [],
        hukum: []
    }
};


export default function kkptReferenceDampakNonFinancialReducer(state = initialState, actions) {

    switch (actions.type) {
        case types.GET_REFERENCE_KKPT_DAMPAK_START:
            return {
                ...state,
                loadingImpackNoF: true
            }
        case types.GET_REFERENCE_KKPT_DAMPAK_SUCCESS:
            const { dataTempReputasi,
                dataTempRegulasi,
                dataTempPelayanan,
                dataTempStrategis,
                dataTemphukum } = actions.payload
            return {
                ...state,
                loadingImpactNoF: false,
                messageImpackNof: "Berhasil Menampilkan List Penyebab",
                dataImpact: {
                    reputasi: dataTempReputasi,
                    regulasi: dataTempRegulasi,
                    pelayanan: dataTempPelayanan,
                    strategis: dataTempStrategis,
                    hukum: dataTemphukum
                }
            }
        case types.GET_REFERENCE_KKPT_DAMPAK_FAILED:
            return {
                ...state,
                loadingImpackNoF: false,
                errorImpackNof: true,
                messageImpackNof: "Terjadi Kesalahan",
            }

        default:
            return state;
    }

}