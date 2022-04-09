import { getToken } from "../../../auth/selectors";
import * as types from './types'

const getKkptSampleStart = (data) => {
    return { type: types.GET_KKPT_SAMPLE_START, payload: data }
}
const getKkptSampleSuccess = (data) => {
    return { type: types.GET_KKPT_SAMPLE_SUCCESS, payload: data }
}
const getKkptSampleFailed = (data) => {
    return { type: types.GET_KKPT_SAMPLE_FAILED, payload: data }
}
const getSampleKkpt = (idkkpt) => async (dispatch, getState, api) => {

    dispatch(getKkptSampleStart())

    const response = await api.getSampleKkptApi(getToken(getState()), idkkpt)
    if (response.status !== "failed") {
        if (response.statusCode === 200) {
            dispatch(getKkptSampleSuccess(response.data))
            return "success"
        }
    } else {
        dispatch(getKkptSampleFailed())
    }
}
const updateKkptSample = (payload) => async (dispatch, getState, api) => {
    if (payload.samples.length === 0) {
        dispatch({ type: types.SELECT_KKPT_SAMPLE_EMPTY_SAMPLE })
    } else {
        dispatch({ type: types.SELECT_KKPT_SAMPLE_START })
        const response = await api.updateSampleKkptApi(getToken(getState()), payload);
        console.log(response)
        if (response.status !== "failed") {
            if (response.statusCode === 200) {
                dispatch({ type: types.SELECT_KKPT_SAMPLE_SUCCESS })
                return "success"
            }
        } else {
            dispatch({ type: types.SELECT_KKPT_SAMPLE_FAILED })
        }
    }

}





export {
    getSampleKkpt,
    updateKkptSample
}