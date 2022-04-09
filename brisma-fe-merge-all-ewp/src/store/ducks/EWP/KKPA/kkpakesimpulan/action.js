import { fetchKkpaInfoById } from '../kkpaInfo/action'
import { getToken } from "../../../auth/selectors";
import * as types from "./types"


const checkKesimpulanKkpa = (id_kkpa) => async (dispatch, getState, api) => {
    const response = await api.updateKesimpulanKkpaApi(getToken(getState()), id_kkpa)
    if (response.status !== "failed") {
        dispatch(fetchKkpaInfoById(id_kkpa))
    }
}
const getKkptList = (id_kkpa) => async (dispatch, getState, api) => {

    dispatch({ type: types.GET_KKPT_START })
    const response = await api.getKkptListByKkpaApi(getToken(getState()), id_kkpa)
    console.log(response)
    if (response.status !== "failed") {
        dispatch({ type: types.GET_KKPT_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: types.GET_KKPT_FAILED })
    }
}
const createKkptList = (payload) => async (dispatch, getState, api) => {
    console.log(payload)
    dispatch({ type: types.CREATE_KKPT_START })
    const response = await api.createKkptListByKkpaApi(getToken(getState()), payload)
    console.log(response)
    if (response.status !== "failed") {
        dispatch({ type: types.CREATE_KKPT_SUCCESS })
        dispatch(getKkptList(payload.kkpa_id));
        return "success"
    } else {
        dispatch({ type: types.CREATE_KKPT_FAILED })
        return "failed"
    }
}

export {
    checkKesimpulanKkpa,
    getKkptList,
    createKkptList
}