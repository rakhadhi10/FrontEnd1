import * as types from "./types";
import { getToken } from "../../../auth/selectors";



const getKategoriList = (idkkpt) => async (dispatch, getState, api) => {
    dispatch({ type: types.GET_KKPT_KATEGORI_START })
    const response = await api.getKategoriKkptApi(getToken(getState()), idkkpt)

    if (response.status !== "failed") {
        if (response.statusCode === 200) {
            let skorlistDampak = response.data.mtd_stc_impacts
            let skorListLikelihood = response.data.mtd_stc_likelihood

            let dataTempDampak = []
            dataTempDampak.push({
                kode: "TAN",
                nama: "Tidak Ada Dampak",
                score: 0,
                color: "default"
            })
            skorlistDampak.forEach((dataImpact, keyImpact) => {
                let colorImpact;
                if (dataImpact.kode === "SR") {
                    colorImpact = "green"
                } else if (dataImpact.kode === "R") {
                    colorImpact = "blue"
                } else if (dataImpact.kode === "SD") {
                    colorImpact = "yellow"
                } else if (dataImpact.kode === "T") {
                    colorImpact = "orange"
                } else {
                    colorImpact = "red"
                }
                dataTempDampak.push({
                    ...dataImpact,
                    color: colorImpact
                })
            })

            let dataTempLikeLihood = []
            dataTempLikeLihood.push({
                kode: "TAN",
                nama: "Tidak Ada Dampak",
                score: 0,
                color: "default"
            })
            skorListLikelihood.forEach((dataLikelihood, keyLike) => {
                let colorLikelihood;
                if (dataLikelihood.kode === "SJ") {
                    colorLikelihood = "green"
                } else if (dataLikelihood.kode === "J") {
                    colorLikelihood = "blue"
                } else if (dataLikelihood.kode === "SD") {
                    colorLikelihood = "yellow"
                } else if (dataLikelihood.kode === "S") {
                    colorLikelihood = "orange"
                } else {
                    colorLikelihood = "red"
                }
                dataTempLikeLihood.push({
                    ...dataLikelihood,
                    color: colorLikelihood
                })
            })

            let dataKategori = {
                dataTempDampak,
                dataTempLikeLihood,
                dataAllKategori: response.data
            }

            dispatch({ type: types.GET_KKPT_KATEGORI_SUCCESS, payload: dataKategori })
            return "success"
        }
    } else {
        dispatch({ type: types.GET_KKPT_KATEGORI_FAILED })
    }
}


const updateKkptKategori = (payload) => async (dispatch, getState, api) => {
    console.log(payload)
    dispatch({ type: types.CREATE_KKPT_KATEGORI_START })
    const response = await api.updateKategoriKkptApi(getToken(getState()), payload)
    console.log(response)
    if (response.status !== "failed") {
        if (response.statusCode === 200) {
            dispatch({ type: types.CREATE_KKPT_KATEGORI_SUCCESS })
            return "success"
        }
    } else {
        dispatch({ type: types.CREATE_KKPT_KATEGORI_FAILED })
    }
}





export {
    updateKkptKategori,
    getKategoriList,

}