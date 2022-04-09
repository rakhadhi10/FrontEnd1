import { FETCH_REF_CONTROL_START, FECTH_REF_CONTROL_SUCCESS, FETCH_KKPA_BY_ID_FAILED, FETCH_REF_CONTROL_FAILED } from './types'
import { getToken } from "../../../auth/selectors";
const getRefControl = () => {

    return { type: FETCH_REF_CONTROL_START }

}


const getRefControlSuccess = (data) => {
    return { type: FECTH_REF_CONTROL_SUCCESS, payload: data }
}


const getRefControlFailed = () => {
    return { type: FETCH_REF_CONTROL_FAILED }
}





const fetchAllDataRefControl = (akd) => async (dispatch, getState, api) => {
    const unefectiveControl = getState().kkpa_info.kkpa_info
    let control = unefectiveControl === null ? null : unefectiveControl.pengujian_control_unefective
    console.log(control)
    dispatch(getRefControl())
    const response = await api.fetchListControlApi(getToken(getState()), akd)
    if (response.status != "failed") {
        let dataTemp = []
        let dataRisk = response.data
        dataRisk.forEach((value, key) => {
            let keyData = value.mtd_stc_control_kritikalitas_kode.split('-')
            let isKey = keyData[1].trim()
            dataTemp.push(
                {
                    key,
                    kode: value.kode,
                    keya: isKey === "Key" ? "check" : "",
                    deskripsi: value.nama,
                    tidak_efektif: "check",
                    unefective: ""
                },
            )
        })
        if (control !== null) {
            dataTemp.forEach(item => item.unefective = control.includes(item.kode))
        }
        console.log(dataTemp)
        dispatch(getRefControlSuccess(dataTemp))
    } else {
        dispatch(getRefControlFailed())
    }

}





export {
    getRefControl,
    getRefControlFailed,
    getRefControlSuccess,
    fetchAllDataRefControl
}