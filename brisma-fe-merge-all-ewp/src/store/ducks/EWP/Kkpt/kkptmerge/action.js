import { getToken } from "../../../auth/selectors";
import * as types from './types'

const getListKkpt = (idmapa) => async (dispatch, getState, api) => {

    dispatch({ type: types.FETCH_START_LIST })
    const response = await api.getKpptListApi(getToken(getState()), idmapa)
    let dataLIST = []
    if (response.status != "failed") {
        let dataListKkpt = response.data
        dataListKkpt.forEach((value, key) => {
            value.mapa_uker_aktivitas.forEach((valMapaUker, keyMapaUker) => {
                valMapaUker.sub_aktivitas.forEach((valSubAktivitas, keySubAktiv) => {
                    valSubAktivitas.mtd_manual_control.forEach((valMtdControl, keyMtdControl) => {
                        valMtdControl.mcr.forEach((valMcr, keyMcr) => {
                            valMcr.kkpa.forEach((valKkpa, keyKkpa) => {
                                valKkpa.kkpt.forEach((valKkpt, keyKkpt) => {
                                    dataLIST.push({
                                        uker: value.ref_auditee_branch_name,
                                        aktivitas: valMapaUker.mtd_aktivitas_name,
                                        subAktivitas: valSubAktivitas.nama,
                                        subMajor: valMtdControl.sub_major,
                                        riskIssue: valMcr.ris_ko,
                                        pnNama: valKkpt.status_persetujuan_kkpt.name,
                                        judulKKPT: valKkpt.judul_kkpt,
                                        key: valKkpt.id
                                    })
                                })
                            })
                        })
                    })
                })
            })
        });


        dispatch(dispatch({ type: types.FECTH_SUCCESS_LIST, payload: dataLIST }))
    } else {
        dispatch({ type: types.FETCH_FAILED_LIST })
    }
}


const mergeKkpt = (dataKkpt) => async (dispatch, getState, api) => {
    let payloadData = {
        kkpt_merge_id: dataKkpt
    }
    dispatch({ type: types.CREATE_MERGE_START })
    const response = await api.updateMergeKkptApi(getToken(getState()), payloadData)
    if (response.status != "failed") {
        dispatch({ type: types.CREATE_MERGE_SUCCESS })
        return "success"
    } else {
        dispatch({ type: types.CREATE_MERGE_FAILED })
    }
}

const getHistory = (id_project) => async (dispatch, getState, api) => {

    dispatch({ type: types.GET_MERGE_HISTORY_START })
    const response = await api.getKkptMergeHistoryApi(getToken(getState()), id_project)
    let dataTemp = []
    if (response.status != "failed") {
        let dataListHistory = response.data

        dataListHistory.forEach((value, key) => {
            dataTemp.push({
                key: key + 1,
                title: `${value.ref_auditee_branch_kode} - ${value.ref_auditee_branch_name}`,
                children: []
            })


            value.mapa_uker_aktivitas.forEach((valMapaUker, keyMapaUker) => {
                dataTemp[key].children.push({
                    key: `${key + 1}-${keyMapaUker + 1}`,
                    title: valMapaUker.mtd_aktivitas_name,
                    children: []
                })


                valMapaUker.sub_aktivitas.forEach((valSubAktivitas, keySubAktiv) => {
                    dataTemp[key].children[keyMapaUker].children.push({
                        key: `${key + 1}-${keyMapaUker + 1}-${keySubAktiv + 1}`,
                        title: valSubAktivitas.nama,
                        children: []
                    })


                    valSubAktivitas.mtd_manual_control.forEach((valMtdControl, keyMtdControl) => {
                        dataTemp[key].children[keyMapaUker].children[keySubAktiv].children.push({
                            key: `${key + 1}-${keyMapaUker + 1}-${keySubAktiv + 1}-${keyMtdControl + 1}`,
                            title: valMtdControl.sub_major,
                            children: []
                        })


                        valMtdControl.mcr.forEach((valMcr, keyMcr) => {
                            dataTemp[key].children[keyMapaUker].children[keySubAktiv].children[keyMtdControl].children.push({
                                key: `${key + 1}-${keyMapaUker + 1}-${keySubAktiv + 1}-${keyMtdControl + 1}-${keyMcr + 1}`,
                                title: valMcr.ris_ko,
                                children: []
                            })


                            valMcr.kkpa.forEach((valKkpa, keyKkpa) => {
                                dataTemp[key].children[keyMapaUker].children[keySubAktiv].children[keyMtdControl].children[keyMcr].children.push({
                                    key: `${key + 1}-${keyMapaUker + 1}-${keySubAktiv + 1}-${keyMtdControl + 1}-${keyMcr + 1}-${keyKkpa + 1}`,
                                    // title: `[${valKkpa.auditor.pn}] ${valKkpa.auditor.name} ${valKkpa.auditor.posisi}`,
                                    title: (
                                        <div className="flex space-x-5">
                                            <p className="text-xs">[{valKkpa.auditor.posisi.toUpperCase()}] {valKkpa.auditor.pn} - {valKkpa.auditor.nama}</p>
                                        </div>
                                    ),
                                    children: []
                                })



                                valKkpa.kkpt.forEach((valKkpt, keyKkpt) => {
                                    dataTemp[key].children[keyMapaUker].children[keySubAktiv].children[keyMtdControl].children[keyMcr].children[keyKkpa].children.push({
                                        id_kkpt: valKkpt.id,
                                        key: `${key + 1}-${keyMapaUker + 1}-${keySubAktiv + 1}-${keyMtdControl + 1}-${keyMcr + 1}-${keyKkpa + 1}-${keyKkpt + 1}`,
                                        title: (
                                            <div className="flex space-x-5">
                                                <p >{"KKPT-MERGE"}</p>
                                                <span className="">
                                                    {"Kkpt Merge"}
                                                </span>
                                            </div>
                                        ),
                                        data_kkpt: valKkpt,
                                        children: []
                                    })

                                    valKkpt.merged_children.forEach((v, k) => {
                                        dataTemp[key].children[keyMapaUker].children[keySubAktiv].children[keyMtdControl].children[keyMcr].children[keyKkpa].children[keyKkpt].children.push({
                                            id_kkpt_merge: v.id,
                                            key: `${key + 1}-${keyMapaUker + 1}-${keySubAktiv + 1}-${keyMtdControl + 1}-${keyMcr + 1}-${keyKkpa + 1}-${keyKkpt + 1}-${k + 1}`,
                                            title: (
                                                <div className="flex space-x-5">
                                                    <p >{`${valKkpa.auditor.pn}-${valKkpa.auditor.nama}`}</p>
                                                    <span >
                                                        {v.judul_kkpt}
                                                    </span>
                                                </div>
                                            ),
                                            info_kkpt: {
                                                examplar: v.exemplar_no,
                                                auditor: valKkpa.auditor,
                                                risk_issue: {
                                                    kode: valMcr.ris_ko,
                                                    nama: valMcr.ris_na
                                                },
                                                sub_major: {
                                                    kode: valMtdControl.sub_major
                                                },
                                                sub_aktivitas: valSubAktivitas.nama,
                                                aktivitas: valMapaUker.mtd_aktivitas_name,
                                                uker: value.ref_auditee_branch_name
                                            }
                                        })
                                    })


                                })



                            })


                        })


                    })

                })

            })
        });

        console.log(dataTemp)

        dispatch(dispatch({ type: types.GET_MERGE_HISTORY_SUCCESS, payload: dataTemp }))
    } else {
        dispatch({ type: types.GET_MERGE_HISTORY_FAILED })
    }

}




export {
    mergeKkpt,
    getListKkpt,
    getHistory
}