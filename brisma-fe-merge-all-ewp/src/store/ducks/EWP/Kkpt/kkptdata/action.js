
import { getToken } from "../../../auth/selectors";
import { getHtmlKkptInfo } from "../../../../../component/EWP/EWPKKPT/template/kkptinfo"
import { getHtmlKondisiKkpt } from "../../../../../component/EWP/EWPKKPT/template/kkptkondisi"
import * as types from './types'
import { getHtmlWorkSheet } from "../../../../../component/EWP/EWPKKPT/template/kkptworksheet";
import { getHtmlKkptControl } from "../../../../../component/EWP/EWPKKPT/template/kkptcontrol";
import { getHtmlKkptKriteria } from "../../../../../component/EWP/EWPKKPT/template/kkptkriteria";
import { getHtmlKkptPenyebab } from "../../../../../component/EWP/EWPKKPT/template/kkptpenyebab";
import { getHtmlKkptDampak } from "../../../../../component/EWP/EWPKKPT/template/kkptdampak";
import { getHtmlKkptLikelihood } from "../../../../../component/EWP/EWPKKPT/template/kkptlikelihood";
import { getHtmlKkptKategori } from "../../../../../component/EWP/EWPKKPT/template/kkptkategori";
import { getHtmlKkptRekomendasi } from "../../../../../component/EWP/EWPKKPT/template/kkptrekomendasi";

const getDataDocKkpt = (id_kkpt) => async (dispatch, getState, api) => {
    dispatch({ type: types.GET_KKPT_DATA_START })
    const response = await api.getKkptDataApi(getToken(getState()), id_kkpt)
    if (response.status !== "failed") {
        if (response.statusCode === 200) {
            let dataDoc = response.data
            let kkpt_info = {
                judul_kkpt: dataDoc.judul_kkpt,
                temuan_berulang: dataDoc.is_temuan_berulang,
                mtd_stc_risk_type_kode: dataDoc.mtd_stc_risk_type_kode,
                mtd_stc_risk_type_name: dataDoc.mtd_stc_risk_type_name,
                audit_focus_kode: dataDoc.audit_focus_kode,
                audit_focus_name: dataDoc.audit_focus_name,
                products_kode: dataDoc.products_kode
            }
            let kondisi = {
                kondisi_data: dataDoc.kondisi,
                kpi: dataDoc.kpi
            }
            let worksheet = dataDoc.kkpt_sample_list
            let kontrol = dataDoc.kkpt_control_list
            let kriteria = dataDoc.kriteria
            let penyebab = dataDoc.kkpt_penyebab_list
            let kategori_temuan = {
                kategori: dataDoc.kkpt_kategori,
                likelihood: dataDoc.kkpt_likelihood,
                impact: dataDoc.kkpt_impact
            }
            let rekomendasi = dataDoc.kkpt_rekomendasi_list
            let data = {
                kkpt_info,
                kondisi,
                worksheet,
                kontrol,
                kriteria,
                penyebab,
                kategori_temuan,
                rekomendasi
            }
            dispatch({ type: types.GET_KKPT_DATA_SUCCESS, payload: data, defaultDocument: getHtmlKkptInfo(kkpt_info) })
            return "success"
        }
    } else {
        dispatch({ type: types.GET_KKPT_DATA_FAILED })
        return "failed"
    }
}

const setContentDoc = (type_bab) => async (dispatch, getState, api) => {
    const stateDocument = getState().kkpt_data
    if (type_bab === "Kkpt Info") {
        dispatch({ type: types.CONTENT_DATA_DOCUMENT, payload: getHtmlKkptInfo(stateDocument.kkpt_info), title: "KKPT INFO" })
    } else if (type_bab === "Kondisi") {
        dispatch({ type: types.CONTENT_DATA_DOCUMENT, payload: getHtmlKondisiKkpt(stateDocument.kondisi), title: "KONDISI" })
    } else if (type_bab === "Worksheet") {
        dispatch({ type: types.CONTENT_DATA_DOCUMENT, payload: getHtmlWorkSheet(stateDocument.worksheet), title: "Worksheet" })
    } else if (type_bab === "Kontrol") {
        dispatch({ type: types.CONTENT_DATA_DOCUMENT, payload: getHtmlKkptControl(stateDocument.kontrol), title: "Kontrol" })
    } else if (type_bab === "Kriteria") {
        dispatch({ type: types.CONTENT_DATA_DOCUMENT, payload: getHtmlKkptKriteria(stateDocument.kriteria), title: "Kriteria" })
    } else if (type_bab === "Penyebab") {
        dispatch({ type: types.CONTENT_DATA_DOCUMENT, payload: getHtmlKkptPenyebab(stateDocument.kriteria), title: "Penyebab" })
    } else if (type_bab === "Impact") {
        dispatch({ type: types.CONTENT_DATA_DOCUMENT, payload: getHtmlKkptDampak(stateDocument.kriteria), title: "Dampak" })
    } else if (type_bab === "Likelihood") {
        dispatch({ type: types.CONTENT_DATA_DOCUMENT, payload: getHtmlKkptLikelihood(stateDocument.kriteria), title: "Likelihood" })
    } else if (type_bab === "Kategori") {
        dispatch({ type: types.CONTENT_DATA_DOCUMENT, payload: getHtmlKkptKategori(stateDocument.kriteria), title: "Kategori Temuan" })
    } else if (type_bab === "Rekomendasi") {
        dispatch({ type: types.CONTENT_DATA_DOCUMENT, payload: getHtmlKkptRekomendasi(stateDocument.kriteria), title: "Rekomendasi" })
    }
}

export {
    getDataDocKkpt,
    setContentDoc
}