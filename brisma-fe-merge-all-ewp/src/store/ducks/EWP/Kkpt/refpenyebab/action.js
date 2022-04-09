import { getToken } from "../../../auth/selectors";
import * as types from './types'


const getReferencePenyebabList = () => async (dispatch, getState, api) => {
    dispatch({ type: types.GET_REFERENCE_KKPT_PENYEBAB_START })
    const response = await api.getReferencePenyebabListKkptApi(getToken(getState()))
    if (response.status !== "failed") {
        if (response.statusCode === 200) {
            dispatch({ type: types.GET_REFERENCE_KKPT_PENYEBAB_SUCCESS, payload: response.data })
        }
    } else {
        dispatch({ type: types.GET_REFERENCE_KKPT_PENYEBAB_FAILED })
    }
}

export {
    getReferencePenyebabList
}