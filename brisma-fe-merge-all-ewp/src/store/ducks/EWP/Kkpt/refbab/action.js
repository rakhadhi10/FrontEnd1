import { getToken } from "../../../auth/selectors";
import { FECTH_SUCCESS_BAB_KKPT, FETCH_FAILED_BAB_KKPT, FETCH_START_BAB_KKPT } from './types'

const getBabKkpt = () => {

    return { type: FETCH_START_BAB_KKPT }

}


const getSuccess = (data) => {
    return { type: FECTH_SUCCESS_BAB_KKPT, payload: data }
}


const getFailed = () => {
    return { type: FETCH_FAILED_BAB_KKPT }
}





const fetchBabKkpt = () => async (dispatch, getState, api) => {

    dispatch(getBabKkpt())
    const response = await api.getKpptRefBab(getToken(getState()))
    if (response.status != "failed") {
        dispatch(getSuccess(response.data))
    } else {
        dispatch(getFailed())
    }
}





export {
    getFailed,
    getBabKkpt,
    getSuccess,
    fetchBabKkpt
}