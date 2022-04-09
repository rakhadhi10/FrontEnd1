import { getToken } from "../../../auth/selectors";
import * as types from './types'

const approvalKkpt = (id_kkpt) => async (dispatch, getState, api) => {
    console.log(id_kkpt)
    dispatch({ type: types.SAVE_APPROVAL_KKPT_START })
    const response = await api.approvalKkptApi(getToken(getState()), id_kkpt)
    if (response.status !== "failed") {
        if (response.statusCode === 200) {
            dispatch({ type: types.SAVE_APPROVAL_KKPT_SUCCESS })
            return "success"
        }
    } else {
        dispatch({ type: types.SAVE_APPROVAL_KKPT_FAILED })
        return "failed"
    }
}
const naKkpt = (payload) => async (dispatch, getState, api) => {
    console.log(payload)
    dispatch({ type: types.SAVE_NA_KKPT_START })
    const response = await api.naKkptApi(getToken(getState()), payload)
    if (response.status !== "failed") {
        if (response.statusCode === 200) {
            dispatch({ type: types.SAVE_NA_KKPT_SUCCESS })
            return "success"
        }
    } else {
        dispatch({ type: types.SAVE_NA_KKPT_FAILED })
        return "failed"
    }
}


export {
    approvalKkpt,
    naKkpt
}