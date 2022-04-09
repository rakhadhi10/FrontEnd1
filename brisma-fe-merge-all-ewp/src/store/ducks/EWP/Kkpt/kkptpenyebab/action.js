import * as types from "./types";
import { getToken } from "../../../auth/selectors";





const getPenyebabList = (idkkpt) => async (dispatch, getState, api) => {
    dispatch({ type: types.GET_KKPT_PENYEBAB_START })
    const response = await api.getPenyebabKkptApi(getToken(getState()), idkkpt)

    if (response.status !== "failed") {
        if (response.statusCode === 200) {
            let dataPnTemp = []
            response.data.forEach((value, key) => {
                value.pn.forEach((valuePn, key) => {
                    dataPnTemp.push(valuePn)
                })
            });

            console.log(dataPnTemp)



            dispatch({ type: types.GET_KKPT_PENYEBAB_SUCCESS, payload: { dataAllGet: response.data, dataPn: dataPnTemp } })
            return "success"
        }
    } else {
        dispatch({ type: types.GET_KKPT_PENYEBAB_FAILED })
    }
}

const createPenyebabList = (payload) => async (dispatch, getState, api) => {

    dispatch({ type: types.CREATE_KKPT_PENYEBAB_START })
    const response = await api.savePenyebabKkptApi(getToken(getState()), payload)
    console.log(response)
    if (response.status !== "failed") {
        if (response.statusCode === 200) {
            dispatch({ type: types.CREATE_KKPT_PENYEBAB_SUCCESS })
            return "success"
        }
    } else {
        dispatch({ type: types.CREATE_KKPT_PENYEBAB_FAILED })
    }
}


const deletePenyebabList = (id) => async (dispatch, getState, api) => {

    dispatch({ type: types.DELETE_KKPT_PENYEBAB_START })
    const response = await api.deletePenyebabApi(getToken(getState()), id)
    console.log(response)
    if (response.status !== "failed") {
        if (response.statusCode === 200) {
            dispatch({ type: types.DELETE_KKPT_PENYEBAB_SUCCESS })

            return "success"
        }
    } else {
        dispatch({ type: types.DELETE_KKPT_PENYEBAB_FAILED })
    }
}

export {
    getPenyebabList,
    createPenyebabList,
    deletePenyebabList
}