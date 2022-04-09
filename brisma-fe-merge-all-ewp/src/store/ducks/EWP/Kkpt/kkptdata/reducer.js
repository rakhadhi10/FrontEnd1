import * as types from "./types";

const initialState = {
    loading: false,
    error: false,
    kkpt_info: undefined,
    kondisi: {
        kondisi_data: "",
        kpi: ""
    },
    worksheet: [],
    kontrol: [],
    kriteria: "",
    penyebab: [],
    kategori_temuan: {
        kategori: undefined,
        likelihood: undefined,
        impact: undefined
    },
    rekomendasi: [],
    data: "",
    title: ""
};


export default function kkptDataReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.GET_KKPT_DATA_START:
            return {
                ...state,
                loading: true,

            }
        case types.GET_KKPT_DATA_SUCCESS:
            const { kkpt_info,
                kondisi,
                worksheet,
                kontrol,
                kriteria,
                penyebab,
                kategori_temuan,
                rekomendasi } = actions.payload
            return {
                ...state,
                loading: false,
                kkpt_info,
                kondisi: {
                    kondisi_data: kondisi.kondisi_data,
                    kpi: kondisi.kpi
                },
                worksheet,
                kontrol,
                kriteria,
                penyebab,
                kategori_temuan: {
                    kategori: kategori_temuan.kategori,
                    likelihood: kategori_temuan.likelihood,
                    impact: kategori_temuan.impact
                },
                rekomendasi,
                data: actions.defaultDocument,
                title: "KKPT INFO"

            }
        case types.GET_KKPT_DATA_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
            }

        case types.CONTENT_DATA_DOCUMENT:
            return {
                ...state,
                data: actions.payload,
                title: actions.title
            }




        default:
            return state;
    }

}