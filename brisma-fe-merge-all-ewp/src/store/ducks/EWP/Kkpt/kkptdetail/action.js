import { getToken } from "../../../auth/selectors";
import { FECTH_DETAIL_KKPT_SUCCESS, FETCH_DETAIL_KKPT_START, FETCH_DETAIL_KKPT_FAILED } from './types'

const getDetailKkpt = () => {
    return { type: FETCH_DETAIL_KKPT_START }
}


const getDetailSuccess = (data) => {
    return { type: FECTH_DETAIL_KKPT_SUCCESS, payload: data }
}


const getDetailFailed = () => {
    return { type: FETCH_DETAIL_KKPT_FAILED }
}

const fetchKkptDetail = (idkkpt) => async (dispatch, getState, api) => {
    dispatch(getDetailKkpt())
    localStorage.setItem("kkpt_id", JSON.stringify({ id_kkpt: idkkpt }))
    const response = await api.getDetailOfKkpt(getToken(getState()), idkkpt)
    if (response.status != "failed") {
        dispatch(getDetailSuccess(response.data))
    } else {
        dispatch(getDetailFailed())
    }
}





export {
    getDetailFailed,
    getDetailKkpt,
    getDetailSuccess,
    fetchKkptDetail
}