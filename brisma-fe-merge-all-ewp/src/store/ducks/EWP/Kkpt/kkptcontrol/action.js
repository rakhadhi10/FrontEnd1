import * as types from "./types";
import { getToken } from "../../../auth/selectors";



const getControlList = (idkkpt) => async (dispatch, getState, api) => {
    dispatch({ type: types.GET_KKPT_CONTROL_START })
    const response = await api.getControlKkptApi(getToken(getState()), idkkpt)
    console.log(response)
    if (response.status !== "failed") {
        if (response.statusCode === 200) {
            dispatch({ type: types.GET_KKPT_CONTROL_SUCCESS, payload: response })
            return "success"
        }
    } else {
        dispatch({ type: types.GET_KKPT_CONTROL_FAILED })
    }


}


const updateKkptControl = (payload) => async (dispatch, getState, api) => {
    dispatch({ type: types.CREATE_KKPT_CONTROL_START })
    const response = await api.updateControlKkptApi(getToken(getState()), payload)
    console.log(response)
    if (response.status !== "failed") {
        if (response.statusCode === 200) {
            dispatch({ type: types.CREATE_KKPT_CONTROL_SUCCESS })
            return "success"
        }
    } else {
        dispatch({ type: types.CREATE_KKPT_CONTROL_FAILED })
    }
}





export {
    updateKkptControl,
    getControlList,

}