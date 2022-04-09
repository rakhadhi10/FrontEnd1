import { getToken } from "../../../auth/selectors";
import * as types from './types'

const trySaveKelemahanKkpt = () => {

    return { type: types.SAVE_KELEMAHAN_KKPT_START }

}


const saveKelemahanKkptSuccess = (data) => {
    return { type: types.SAVE_KELEMAHAN_KKPT_SUCCESS, payload: data }
}


const saveKelemahanKkptFailed = () => {
    return { type: types.SAVE_KELEMAHAN_KKPT_FAILED }
}





const saveKelemahanKkptTry = (payload) => async (dispatch, getState, api) => {
    console.log(payload)
    dispatch(trySaveKelemahanKkpt())

    const response = await api.saveKelemahanKkptApi(getToken(getState()), payload)

    if (response.status !== "failed") {
        if (response.statusCode === 200) {
            dispatch(saveKelemahanKkptSuccess(response.data))
            return "success"
        }

    } else {
        dispatch(saveKelemahanKkptFailed())
    }



}





export {
    saveKelemahanKkptFailed,
    saveKelemahanKkptTry,
    saveKelemahanKkptSuccess,
    trySaveKelemahanKkpt
}