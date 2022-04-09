import * as types from "./types";

const initialState = {
    loading: false,
    error: false,
    message: "",
    messageUpdate: "",
    loadingUpdate: false,
    errorUpdate: "",
    data: null,
    dataDampak: [],
    dataLikelihood: [],
};


export default function kkptKategoriReducer(state = initialState, actions) {

    switch (actions.type) {

        case types.CREATE_KKPT_KATEGORI_START:
            return {
                ...state,
                loadingUpdate: true,
                messageUpdate: "waiting...",

            }
        case types.CREATE_KKPT_KATEGORI_SUCCESS:
            return {
                ...state,
                loadingUpdate: false,
                messageUpdate: "Updated Success",
            }
        case types.CREATE_KKPT_KATEGORI_FAILED:
            return {
                ...state,
                loadingUpdate: false,
                errorUpdate: true,
                messageUpdate: "Gagal update data kategori temuan",
            }
        case types.GET_KKPT_KATEGORI_START:
            return {
                ...state,
                loading: true,
                message: "Mohon menunggu sedang diproses",
            }
        case types.GET_KKPT_KATEGORI_SUCCESS:
            const { dataTempDampak,
                dataTempLikeLihood,
                dataAllKategori } = actions.payload
            return {
                ...state,
                loading: false,
                message: "berhasil menampilkan data KATEGORI Kkpt ",
                data: dataAllKategori,
                dataDampak: dataTempDampak,
                dataLikelihood: dataTempLikeLihood
            }
        case types.GET_KKPT_KATEGORI_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
                message: "Terjadi Kesalahan dalam proses menapilkan data KATEGORI",
            }


        default:
            return state;
    }

}