import * as types from './types'
import { getToken } from "../../../auth/selectors";
const getDaftarIsi = () => {

    return { type: types.FETCH_DAFTAR_ISI_START }

}


const getDaftarIsiSuccess = (data) => {
    return { type: types.FECTH_DAFTAR_ISI_SUCCESS, payload: data }
}


const getDaftarIsiFailed = () => {
    return { type: types.FETCH_DAFTAR_ISI_FAILED }
}


const fetchDaftarIsi = (id) => async (dispatch, getState, api) => {

    dispatch(getDaftarIsi())
    const response = await api.fetchDaftarIsiApi(getToken(getState()));

    let dataTemp = []
    let alfa = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    if (response.status !== "failed") {

        Object.keys(response.data).forEach((value, key) => {
            dataTemp.push({
                title: `${alfa[key]}. ${value}`,
                subTitle: response.data[value]
            })
        });
        dispatch(getDaftarIsiSuccess(dataTemp))
    } else {
        dispatch(getDaftarIsiFailed())
    }
}





export {
    getDaftarIsi,
    getDaftarIsiSuccess,
    getDaftarIsiFailed,
    fetchDaftarIsi
}