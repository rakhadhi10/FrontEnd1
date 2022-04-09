import { propTypes } from "qrcode.react";
import { getToken } from "../../../auth/selectors";
import { fetchKkptDetail } from "../kkptdetail/action"
import * as types from './types'

const trySaveInfoKkpt = () => {

    return { type: types.SAVE_INFO_KKPT_START }

}


const saveInfoKkptSuccess = (data) => {
    return { type: types.SAVE_INFO_KKPT_SUCCESS, payload: data }
}


const saveInfoKkptFailed = () => {
    return { type: types.SAVE_INFO_KKPT_FAILED }
}





const saveInfoKkptTry = (payload) => async (dispatch, getState, api) => {
    dispatch(trySaveInfoKkpt())
    const response = await api.saveInfoKkptApi(getToken(getState()), payload)
    if (response.status != "failed") {
        if (response.statusCode === 200) {
            dispatch(saveInfoKkptSuccess(response.data))
            dispatch(fetchKkptDetail(payload.id))
            return "success"
        }
    } else {
        dispatch(saveInfoKkptFailed())
    }
}

const getResikoType = () => async (dispatch, getState, api) => {
    dispatch({ type: types.GET_TIPE_RESIKO_START })
    const response = await api.getReferenceRiskTypeKkptDataApi(getToken(getState()))
    if (response.status != "failed") {
        if (response.statusCode === 200) {
            dispatch({ type: types.GET_TIPE_RESIKO_SUCCESS, payload: response.data })
            return "success"
        }
    } else {
        dispatch({ type: types.GET_TIPE_RESIKO_FAILED })
    }
}

const getFocusAudit = () => async (dispatch, getState, api) => {
    dispatch({ type: types.GET_FOCUS_AUDIT_START })
    const response = await api.getReferenceAuditFocusKkptDataApi(getToken(getState()))
    if (response.status != "failed") {
        if (response.statusCode === 200) {
            dispatch({ type: types.GET_FOCUS_AUDIT_SUCCESS, payload: response.data })
            return "success"
        }
    } else {
        dispatch({ type: types.GET_FOCUS_AUDIT_FAILED })
    }
}

const getProduk = () => async (dispatch, getState, api) => {

    dispatch({ type: types.GET_PRODUK_START })
    const response = await api.getReferenceProdukKkptDataApi(getToken(getState()))
    if (response.status != "failed") {
        if (response.statusCode === 200) {
            dispatch({ type: types.GET_PRODUK_SUCCESS, payload: response.data })
            return "success"
        }
    } else {
        dispatch({ type: types.GET_PRODUK_FAILED })
    }
}





export {
    getResikoType,
    saveInfoKkptTry,
    getFocusAudit,
    getProduk
}