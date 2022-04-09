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


const fetchAllDataComment = (id_kkpt, id_bab) => async (dispatch, getState, api) => {
    console.log(`eneee ${id_kkpt}`)
    const response = await api.getKkptCommentApi(getToken(getState()), id_kkpt, id_bab)

    if (response.status !== "failed") {
        console.log(response)
        dispatch(getCommentSuccess({ data: response.data, bab: id_bab }))
    } else {
        dispatch(getCommentFailed())
    }

}


const saveComment = (data) => async (dispatch, getState, api) => {

    const { kkpt_id, ref_bab_kkpt_id } = data
    console.log(data)
    const response = await api.saveCommentKkptApi(getToken(getState()), data)
    console.log(response.status)
    if (response.status !== "failed") {
        dispatch(fetchAllDataComment(kkpt_id, ref_bab_kkpt_id))
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