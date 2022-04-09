import * as types from "./types";
import { getToken } from "../../../auth/selectors";



const getRekomendasiList = (idkkpt) => async (dispatch, getState, api) => {
    dispatch({ type: types.GET_KKPT_REKOMENDASI_START })
    const response = await api.getRekomendasiKkptApi(getToken(getState()), idkkpt)
    if (response.status !== "failed") {
        if (response.statusCode === 200) {
            dispatch({ type: types.GET_KKPT_REKOMENDASI_SUCCESS, payload: response.data })
            return "success"
        }
    } else {
        dispatch({ type: types.GET_KKPT_REKOMENDASI_FAILED })
    }
}


//sama dengar insert rekomendasi
const updateKkptRekomendasi = (payload, type, kkpt_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.CREATE_KKPT_REKOMENDASI_START })
    const response = type === "CREATE" ? await api.updateRekomendasiKkptApi(getToken(getState()), payload, kkpt_id) : await api.editRekomendasiKkptApi(getToken(getState()), payload, kkpt_id)
    console.log(response)
    if (response.status !== "failed") {
        if (response.statusCode === 200) {
            dispatch(getRekomendasiList(kkpt_id))
            dispatch({ type: types.CREATE_KKPT_REKOMENDASI_SUCCESS })
            return "success"
        }
    } else {
        dispatch({ type: types.CREATE_KKPT_REKOMENDASI_FAILED })
    }
}


const deleteKkptRekomendasi = (ID, kkpt_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.DELETE_KKPT_REKOMENDASI_START })
    const response = await api.deleteRekomendasiKkptApi(getToken(getState()), ID)
    console.log(response)
    if (response.status !== "failed") {
        if (response.statusCode === 200) {
            dispatch(getRekomendasiList(kkpt_id))
            dispatch({ type: types.DELETE_KKPT_REKOMENDASI_SUCCESS })
            return "success"
        }
    } else {
        dispatch({ type: types.DELETE_KKPT_REKOMENDASI_FAILED })
    }
}








export {
    updateKkptRekomendasi,
    getRekomendasiList,
    deleteKkptRekomendasi
}