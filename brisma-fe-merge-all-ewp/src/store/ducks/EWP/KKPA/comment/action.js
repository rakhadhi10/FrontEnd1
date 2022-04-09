import * as types from './types'
import { getToken } from "../../../auth/selectors";
const getCommentStart = () => {

    return { type: types.FETCH_COMMENT_START }

}


const getCommentSuccess = (data) => {
    return { type: types.FECTH_COMMENT_SUCCESS, payload: data }
}


const getCommentFailed = () => {
    return { type: types.FETCH_COMMENT_FAILED }
}


const fetchAllDataComment = (id_kkpa, id_bab) => async (dispatch, getState, api) => {
    console.log(`eneee ${id_kkpa}`)
    const response = await api.fetchCommentApi(getToken(getState()), id_kkpa, id_bab)

    if (response.status !== "failed") {
        console.log(response)
        dispatch(getCommentSuccess({ data: response.data, bab: id_bab }))
    } else {
        dispatch(getCommentFailed())
    }

}


const saveComment = (data) => async (dispatch, getState, api) => {

    const { kkpa_id, ref_bab_kkpa_id } = data

    const response = await api.storeCommentApi(getToken(getState()), data)
    console.log(response.status)
    if (response.status !== "failed") {
        dispatch(fetchAllDataComment(kkpa_id, ref_bab_kkpa_id))
    } else {
        dispatch(getCommentFailed())
    }

}

const closeComment = (idchildcomment, kkpa_id, ref_bab_kkpa_id) => async (dispatch, getState, api) => {

    const response = await api.closeCommentApi(getToken(getState()), idchildcomment)

    if (response.status !== "failed") {
        dispatch(fetchAllDataComment(kkpa_id, ref_bab_kkpa_id))
    } else {
        dispatch(getCommentFailed())
    }

}





export {
    getCommentStart,
    getCommentSuccess,
    getCommentFailed,
    fetchAllDataComment,
    saveComment,
    closeComment
}