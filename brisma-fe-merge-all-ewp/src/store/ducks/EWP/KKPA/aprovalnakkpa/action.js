import * as types from './types'
import { fetchKkpaInfoById } from '../kkpaInfo/action'
import { getToken } from "../../../auth/selectors";

const succesApproval = () => {
    return {
        type: types.SEND_APPROVAL
    }
}

const loadingApproval = () => {
    return {
        type: types.LOADING_APPROVAL
    }
}
const failedApproval = () => {
    return {
        type: types.FAILED_APPROVAL
    }
}

const loadingNa = () => {
    return {
        type: types.LOADING_NA
    }
}

const failedNa = () => {
    return {
        type: types.FAILED_NA
    }
}

const succesNa = () => {
    return {
        type: types.SEND_NA
    }
}



const tryApproval = (id_kkpa) => async (dispatch, getState, api) => {
    dispatch(loadingApproval())
    const response = await api.updateApproval(getToken(getState()), id_kkpa)
    if (response.status !== "failed") {
        console.log(response)
        dispatch(succesApproval())
        dispatch(fetchKkpaInfoById(id_kkpa))
    } else {
        dispatch(failedApproval())
    }

}
const tryNa = (kkpa_id, is_na_desc) => async (dispatch, getState, api) => {
    const send = {
        kkpa_id,
        is_na_desc
    }
    dispatch(loadingNa())
    const response = await api.updateNa(getToken(getState()), send)
    if (response.status !== "failed") {
        console.log(response)
        dispatch(succesNa())
        dispatch(fetchKkpaInfoById(kkpa_id))
    } else {
        dispatch(failedNa())
    }

}

export {
    succesApproval,
    succesNa,
    failedApproval,
    failedNa,
    tryApproval,
    tryNa
}
