import * as types from "./types";
import { getToken } from "../../../auth/selectors";

const getDampakList = (idkkpt) => async (dispatch, getState, api) => {
    dispatch({ type: types.GET_KKPT_DAMPAK_START })
    const response = await api.getKkptaDampakApi(getToken(getState()), idkkpt)
    console.log(response)
    if (response.status !== "failed") {
        if (response.statusCode === 200) {
            dispatch({ type: types.GET_KKPT_DAMPAK_SUCCESS, payload: response.data })
            return "success"
        }
    } else {
        dispatch({ type: types.GET_KKPT_DAMPAK_FAILED })
    }
}

const createKkptDampak = (payload) => async (dispatch, getState, api) => {
    dispatch({ type: types.CREATE_KKPT_DAMPAK_START })
    const response = await api.updateDampakKkptApi(getToken(getState()), payload)
    console.log(response)
    if (response.status !== "failed") {
        if (response.statusCode === 200) {
            dispatch(getDampakList(payload.kkpt_id))
            dispatch({ type: types.CREATE_KKPT_DAMPAK_SUCCESS })
            return "success"
        }
    } else {
        dispatch({ type: types.CREATE_KKPT_DAMPAK_FAILED })
    }
}




export {
    createKkptDampak,
    getDampakList
}