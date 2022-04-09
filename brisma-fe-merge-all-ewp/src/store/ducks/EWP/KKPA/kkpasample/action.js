import { getToken } from "../../../auth/selectors";
import * as types from './types'

const getKkpaSampleStart = (data) => {
    return { type: types.GET_KKPA_SAMPLE_START, payload: data }
}
const getKkpaSampleSuccess = (data) => {
    return { type: types.GET_KKPA_SAMPLE_SUCCESS, payload: data }
}
const getKkpaSampleFailed = (data) => {
    return { type: types.GET_KKPA_SAMPLE_FAILED, payload: data }
}
const getSampleKkpa = (idkkpa) => async (dispatch, getState, api) => {

    dispatch(getKkpaSampleStart())

    const response = await api.getSampleKkpaApi(getToken(getState()), idkkpa)
    if (response.status !== "failed") {
        if (response.statusCode === 200) {
            dispatch(getKkpaSampleSuccess(response.data))
            return "success"
        }
    } else {
        dispatch(getKkpaSampleFailed())
    }
}
const updateKkpaSample = (payload) => async (dispatch, getState, api) => {
    if (payload.samples.length === 0) {
        dispatch({ type: types.SELECT_KKPA_SAMPLE_EMPTY_SAMPLE })
    } else {
        dispatch({ type: types.SELECT_KKPA_SAMPLE_START })
        const response = await api.updateSampleKkptApi(getToken(getState()), payload);
        console.log(response)
        if (response.status !== "failed") {
            if (response.statusCode === 200) {
                dispatch({ type: types.SELECT_KKPA_SAMPLE_SUCCESS })
                return "success"
            }
        } else {
            dispatch({ type: types.SELECT_KKPA_SAMPLE_FAILED })
        }
    }

}





export {
    getSampleKkpa,
    updateKkpaSample
}