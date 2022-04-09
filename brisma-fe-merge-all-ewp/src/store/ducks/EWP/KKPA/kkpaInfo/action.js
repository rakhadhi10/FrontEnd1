import { FETCH_KKPA_BY_ID_FAILED, FECTH_KKPA_BY_ID_SUCCESS, FETCH_KKPA_BY_ID_START } from './types'
import { getToken } from "../../../auth/selectors";
const getInfoKkpaById = () => {

    return { type: FETCH_KKPA_BY_ID_START }

}


const getInfoSuccessById = (data) => {
    return { type: FECTH_KKPA_BY_ID_SUCCESS, payload: data }
}


const getInfoFailedById = () => {
    return { type: FETCH_KKPA_BY_ID_FAILED }
}





const fetchKkpaInfoById = (idkkpa) => async (dispatch, getState, api) => {
    dispatch(getInfoKkpaById)
    localStorage.setItem("kkpa_id", JSON.stringify({ id_kkpa: idkkpa }))
    const response = await api.fetchKppaInfoApi(getToken(getState()), idkkpa)
    if (response.status != "failed") {
        dispatch(getInfoSuccessById(response.data))

    } else {
        dispatch(getInfoFailedById())
    }

}





export {
    getInfoFailedById,
    getInfoKkpaById,
    getInfoSuccessById,
    fetchKkpaInfoById
}