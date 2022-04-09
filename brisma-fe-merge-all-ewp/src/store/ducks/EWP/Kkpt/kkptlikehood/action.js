import { getToken } from "../../../auth/selectors";
import * as types from './types'

export const getKkptLikehood = (idkkpt) => async (dispatch, getState, api) => {
    dispatch({ type: types.GET_KKPT_LIKEHOOD_START })
    const response = await api.getLikehoodKkptApi(getToken(getState()), idkkpt)
    if (response.status !== "failed") {
        if (response.statusCode === 200) {
            let dataLikelihood = response.data.likelihood
            let skorlistLikelihood = response.data.mtd_stc_likelihood
            let dataTempDampak = []
            dataTempDampak.push({
                kode: "TAN",
                nama: "Tidak Ada",
                score: 0,
                color: "default"
            })
            skorlistLikelihood.forEach((dataImpact, keyImpact) => {
                let colorImpact;
                if (dataImpact.kode === "SJ") {
                    colorImpact = "green"
                } else if (dataImpact.kode === "J") {
                    colorImpact = "blue"
                } else if (dataImpact.kode === "SD") {
                    colorImpact = "yellow"
                } else if (dataImpact.kode === "S") {
                    colorImpact = "orange"
                } else {
                    colorImpact = "red"
                }
                dataTempDampak.push({
                    ...dataImpact,
                    color: colorImpact
                })
            })

            let datapage = {
                likelihood: dataLikelihood,
                mtd_stc_likelihood: dataTempDampak
            }
            dispatch({ type: types.GET_KKPT_LIKEHOOD_SUCCESS, payload: datapage })
            return "success"
        }
    } else {
        dispatch({ type: types.GET_KKPT_LIKEHOOD_FAILED })
    }
}


