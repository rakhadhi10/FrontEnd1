import * as types from './types'
import { fetchKkpaInfoById } from '../kkpaInfo/action'
import { getToken } from "../../../auth/selectors";
const saveKriteriaLoading = (payload) => {

    return { type: types.SAVE_KRITERIA_LOADING, payload }

}


const saveKriteriaSuccess = (payload) => {
    return { type: types.SAVE_KRITERIA_SUCCESS, payload }
}


const saveKriteriaFailed = (payload) => {
    return { type: types.SAVE_KRITERIA_FAILED, payload }
}


const storeDataKriteria = (data) => async (dispatch, getState, api) => {

    const response = await api.storeDataKriteriaApi(getToken(getState()), data)
    if (response.status !== "failed") {
        dispatch(saveKriteriaSuccess(response.message))
        dispatch(fetchKkpaInfoById(data.kkpa_id))
    } else {
        dispatch(saveKriteriaFailed(response.error))
    }
}



export {
    saveKriteriaFailed,
    saveKriteriaSuccess,
    saveKriteriaLoading,
    storeDataKriteria
}