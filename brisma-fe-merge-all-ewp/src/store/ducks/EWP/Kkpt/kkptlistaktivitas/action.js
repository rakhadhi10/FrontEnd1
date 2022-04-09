import { getToken } from "../../../auth/selectors";
import { FECTH_SUCCESS, FETCH_START, FETCH_FAILED } from './types'

const getListKkpt = () => {

    return { type: FETCH_START }

}


const getListSuccess = (data) => {
    return { type: FECTH_SUCCESS, payload: data }
}


const getListFailed = () => {
    return { type: FETCH_FAILED }
}



const fetchKkptList = (idmapa) => async (dispatch, getState, api) => {

    dispatch(getListKkpt())
    const response = await api.getKpptListApi(getToken(getState()), idmapa)
    const dataTemp = []
    if (response.status != "failed") {

        let dataListKkpt = response.data

        dataListKkpt.forEach((value, key) => {
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
                                            <p className="text-xs">[{valKkpa.auditor.posisi.toUpperCase()}] {valKkpa.auditor.pn} - {valKkpa.auditor.name}</p>
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
                                                <p className="text-xs" >{valKkpt.judul_kkpt}</p>
                                                <span className="bg-secondary-light-green text-xs text-primary-green px-1 rounded">
                                                    {valKkpt.status_persetujuan_kkpt.name}
                                                </span>
                                            </div>
                                        ),
                                        data_kkpt: valKkpt
                                    })
                                })



                            })


                        })


                    })

                })

            })
        });



        dispatch(getListSuccess(dataTemp))



    } else {
        dispatch(getListFailed())
    }



}





export {
    getListFailed,
    getListKkpt,
    getListSuccess,
    fetchKkptList
}