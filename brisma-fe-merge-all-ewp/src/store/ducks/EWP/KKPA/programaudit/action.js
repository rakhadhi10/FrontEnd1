import * as types from './types'
import { fetchKkpaInfoById } from '../kkpaInfo/action'
const saveProgramAuditLoading = (payload) => {

    return { type: types.SAVE_PRO_AUDIT_LOADING, payload }

}


const saveProgramAuditSuccess = (payload) => {
    return { type: types.SAVE_PRO_AUDIT_SUCCESS, payload }
}


const saveProgramAuditFailed = (payload) => {
    return { type: types.SAVE_PRO_AUDIT_FAILED, payload }
}


const storeDataProgramAudit = (data) => async (dispatch, getState, api) => {

    const response = await api.storeDataProAuditApi(data)
    if (response.status !== "failed") {
        dispatch(saveProgramAuditSuccess(response.message))
        dispatch(fetchKkpaInfoById(data.kkpa_id))
    } else {
        dispatch(saveProgramAuditFailed(response.error))
    }
}



export {
    saveProgramAuditFailed,
    saveProgramAuditSuccess,
    saveProgramAuditLoading,
    storeDataProgramAudit
}