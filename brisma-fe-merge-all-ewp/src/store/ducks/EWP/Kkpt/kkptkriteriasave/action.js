import { getToken } from "../../../auth/selectors";
import * as types from './types'

const trySaveKriteriaKkpt = () => {

    return { type: types.SAVE_KRITERIA_KKPT_START }

}


const saveKriteriaKkptSuccess = (data) => {
    return { type: types.SAVE_KRITERIA_KKPT_SUCCESS, payload: data }
}


const saveKriteriaKkptFailed = () => {
    return { type: types.SAVE_KRITERIA_KKPT_FAILED }
}





const saveKriteriaKkptTry = (payload) => async (dispatch, getState, api) => {
    dispatch(trySaveKriteriaKkpt())
    const response = await api.saveKriteriaKkptApi(getToken(getState()), payload)
    if (response.status !== "failed") {
        if (response.statusCode === 200) {
            dispatch(saveKriteriaKkptSuccess(response.data))
            return "success"
        }
    } else {
        dispatch(saveKriteriaKkptFailed())
    }
}





export {
    saveKriteriaKkptFailed,
    saveKriteriaKkptTry,
    saveKriteriaKkptSuccess,
    trySaveKriteriaKkpt
}