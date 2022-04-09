import * as types from './types'
import { getToken } from "../../../auth/selectors";
const getContent = () => {

    return { type: types.FETCH_CONTENT_START }

}


const getContentSuccess = (data) => {
    return { type: types.FECTH_CONTENT_SUCCESS, payload: data }
}


const getContentFailed = () => {
    return { type: types.FETCH_CONTENT_FAILED }
}


const fetchContent = (idkkpa, idbab) => async (dispatch, getState, api) => {

    dispatch(getContent)
    const response = await api.fetchContentApi(getToken(getState()), idkkpa, idbab);

    if (response.status !== "failed") {

        dispatch(getContentSuccess(response.data.content))
    } else {
        dispatch(getContentFailed())
    }
}





export {
    getContent,
    getContentSuccess,
    getContentFailed,
    fetchContent
}