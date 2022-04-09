import { getToken } from "../../../auth/selectors";
import * as types from './types'


const getReferenceImpactNonFinancial = () => async (dispatch, getState, api) => {
    dispatch({ type: types.GET_REFERENCE_KKPT_DAMPAK_START })
    const response = await api.getReferenceImpactFinancialpi(getToken(getState()))
    if (response.status !== "failed") {
        if (response.statusCode === 200) {
            let reputasi = response.data[0].impact
            let regulasi = response.data[1].impact
            let pelayanan = response.data[2].impact
            let strategis = response.data[3].impact
            let hukum = response.data[4].impact


            let dataTempReputasi = []
            // dataTempReputasi.push({
            //     kode: "TAD",
            //     nama: "Tidak Ada Dampak",
            //     score: 0,
            //     color: "gray",
            //     kode_sample: response.data[0].kode
            // })
            reputasi.forEach((r, k) => {
                dataTempReputasi.push({
                    ...r,
                    kode_sample: response.data[0].kode
                })
            })
            let dataTempRegulasi = []
            // dataTempRegulasi.push({
            //     kode: "TAD",
            //     nama: "Tidak Ada Dampak",
            //     score: 0,
            //     color: "gray",
            //     kode_sample: response.data[1].kode
            // })
            regulasi.forEach((r, k) => {
                dataTempRegulasi.push({
                    ...r,
                    kode_sample: response.data[1].kode
                })
            })
            let dataTempPelayanan = []
            // dataTempPelayanan.push(
            //     {
            //         kode: "TAD",
            //         nama: "Tidak Ada Dampak",
            //         score: 0,
            //         color: "gray",
            //         kode_sample: response.data[2].kode
            //     }
            // )
            pelayanan.forEach((r, k) => {
                dataTempPelayanan.push({
                    ...r,
                    kode_sample: response.data[2].kode
                })
            })
            let dataTempStrategis = []
            // dataTempStrategis.push({
            //     kode: "TAD",
            //     nama: "Tidak Ada Dampak",
            //     score: 0,
            //     color: "gray",
            //     kode_sample: response.data[3].kode
            // })
            strategis.forEach((r, k) => {
                dataTempStrategis.push({
                    ...r,
                    kode_sample: response.data[3].kode
                })
            })
            let dataTemphukum = []
            // dataTemphukum.push({
            //     kode: "TAD",
            //     nama: "Tidak Ada Dampak",
            //     score: 0,
            //     color: "gray",
            //     kode_sample: response.data[4].kode
            // })
            hukum.forEach((r, k) => {
                dataTemphukum.push({
                    ...r,
                    kode_sample: response.data[4].kode
                })
            })

            let dataTemp = {
                dataTempReputasi,
                dataTempRegulasi,
                dataTempPelayanan,
                dataTempStrategis,
                dataTemphukum
            }

            dispatch({ type: types.GET_REFERENCE_KKPT_DAMPAK_SUCCESS, payload: dataTemp })
        }
    } else {
        dispatch({ type: types.GET_REFERENCE_KKPT_DAMPAK_FAILED })
    }
}

export {
    getReferenceImpactNonFinancial
}