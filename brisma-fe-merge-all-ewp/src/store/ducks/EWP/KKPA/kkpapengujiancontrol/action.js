import { getToken } from "../../../auth/selectors";
import { fetchAllDataRefControl } from "../refriskcontrol/action"
import { fetchKkpaInfoById } from "../kkpaInfo/action"
import * as types from './types'







const savePengujianControlKkpa = (payload) => async (dispatch, getState, api) => {
    const akd = getState().kkpa_info.info_kkpa.risk_issue.kode
    dispatch({ type: types.SAVE_PENGUJIAN_KKPA_START })
    const response = await api.storeDataPengujianKontrolApi(getToken(getState()), payload)
    if (response.status !== "failed") {
        if (response.statusCode === 200) {
            dispatch({ type: types.SAVE_PENGUJIAN_KKPA_SUCCESS })
            dispatch(fetchKkpaInfoById(payload.kkpa_id))
            return "success"
        }
    } else {
        dispatch({ type: types.SAVE_PENGUJIAN_KKPA_FAILED })
    }
}





export {
    savePengujianControlKkpa
}