import { getToken } from "../../../auth/selectors";
import { SAVE_KONDISI_KKPT_SUCCESS, SAVE_KONDISI_KKPT_START, SAVE_KONDISI_KKPT_FAILED } from './types'

const trySaveKondisiKkpt = () => {

    return { type: SAVE_KONDISI_KKPT_START }

}


const saveKondisiKkptSuccess = (data) => {
    return { type: SAVE_KONDISI_KKPT_SUCCESS, payload: data }
}


const saveKondisiKkptFailed = () => {
    return { type: SAVE_KONDISI_KKPT_FAILED }
}





const saveKondisiKkptTry = (payload) => async (dispatch, getState, api) => {

    dispatch(trySaveKondisiKkpt())

    const response = await api.saveKondisiKkptApi(getToken(getState()), payload)


    if (response.status !== "failed") {
        if (response.statusCode === 200) {
            dispatch(saveKondisiKkptSuccess(response.data))
            return "success"
        }


    } else {
        dispatch(saveKondisiKkptFailed())
    }



}





export {
    saveKondisiKkptFailed,
    saveKondisiKkptTry,
    saveKondisiKkptSuccess,
    trySaveKondisiKkpt
}