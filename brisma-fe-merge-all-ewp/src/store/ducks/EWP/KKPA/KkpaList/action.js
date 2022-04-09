import { getToken } from "../../../auth/selectors";
import { FECTH_SUCCESS, FETCH_START, FETCH_FAILED } from './types'

const getListKkpa = () => {

    return { type: FETCH_START }

}


const getListSuccess = (data) => {
    return { type: FECTH_SUCCESS, payload: data }
}


const getListFailed = () => {
    return { type: FETCH_FAILED }
}


const data = [
    {
        title: '28374 - KC A',

        children: [{
            title: "AKD - Analisis Kredit",

            children: [
                {
                    title: "AKD1 - Permohonan Kredit",
                    children: [
                        {

                            title: "[ATA] 817283 - Messi"
                        }
                    ]
                }
            ]
        }],
    },
]


const fetchKkpaList = (idmapa) => async (dispatch, getState, api) => {
    dispatch(getListKkpa())

    const response = await api.fetchKppaListApi(getToken(getState()), idmapa)
    const dataTemp = []
    if (response.status != "failed") {
        let idkkpadefault = response.data[0].mcr_aktivitas[0].mcr_subaktivitas[0].mcr_submajor[0].mcr_risk_issue[0].kkpa_list.length !== 0 ? response.data[0].mcr_aktivitas[0].mcr_subaktivitas[0].mcr_submajor[0].mcr_risk_issue[0].kkpa_list[0].id : 0

        console.log(idkkpadefault)
        localStorage.setItem("kkpa_id", JSON.stringify({ id_kkpa: idkkpadefault }))
        let dataListKkpa = response.data

        dataListKkpa.forEach((value, key) => {
            dataTemp.push({
                key: key + 1,
                title: `${value.ref_auditee_branch_kode} - ${value.ref_auditee_branch_name}`,
                children: []
            })

            value.mcr_aktivitas.forEach((valueAktivitas, keyAktivitas) => {
                dataTemp[key].children.push({
                    key: `${key + 1}-${keyAktivitas + 1}`,
                    title: valueAktivitas.ref_aktivitas_name,
                    children: []
                })


                valueAktivitas.mcr_subaktivitas.forEach((valueSubAktivitas, keySubAktivitas) => {
                    dataTemp[key].children[keyAktivitas].children.push({
                        key: `${key + 1}-${keyAktivitas + 1}-${keySubAktivitas + 1}`,
                        title: valueSubAktivitas.ref_sub_aktivitas_name,
                        children: []
                    })


                    valueSubAktivitas.mcr_submajor.forEach((valueSubMajor, keySubMajor) => {
                        dataTemp[key].children[keyAktivitas].children[keySubAktivitas].children.push({
                            key: `${key + 1}-${keyAktivitas + 1}-${keySubAktivitas + 1}-${keySubMajor + 1}`,
                            title: `${valueSubMajor.ref_sub_major_kode} - ${valueSubMajor.ref_sub_major_name}`,
                            children: []
                        })

                        valueSubMajor.mcr_risk_issue.forEach((valueRiskIssue, keyRiskIssue) => {
                            dataTemp[key].children[keyAktivitas].children[keySubAktivitas].children[keySubMajor].children.push({
                                key: `${key + 1}-${keyAktivitas + 1}-${keySubAktivitas + 1}-${keySubMajor + 1}-${keyRiskIssue + 1}`,
                                title: `${valueRiskIssue.ref_risk_issue_kode} - ${valueRiskIssue.ref_risk_issue_name}`,
                                children: []
                            })

                            valueRiskIssue.kkpa_list.forEach((valueKkpaList, keyKkpaList) => {
                                dataTemp[key].children[keyAktivitas].children[keySubAktivitas].children[keySubMajor].children[keyRiskIssue].children.push({
                                    id_kkpa: valueKkpaList.id,
                                    key: `${key + 1}-${keyAktivitas + 1}-${keySubAktivitas + 1}-${keySubMajor + 1}-${keyRiskIssue + 1}-${keyKkpaList + 1}`,
                                    // title: `[${valueKkpaList.auditor.posisi.toUpperCase()}] ${valueKkpaList.auditor.pn} - ${valueKkpaList.auditor.name} ${valueKkpaList.status_persetujuan_kkpa.name}`,
                                    title: (
                                        <div className="flex space-x-5">
                                            <p >[{valueKkpaList.auditor.posisi.toUpperCase()}] {valueKkpaList.auditor.pn} - {valueKkpaList.auditor.name}</p>
                                            <span className="bg-secondary-light-green text-xs text-primary-green px-1 rounded">
                                                {valueKkpaList.status_persetujuan_kkpa.name}
                                            </span>
                                        </div>
                                    ),

                                })
                            })


                        })


                    });


                });


            });



        });


        console.log(dataTemp)
        dispatch(getListSuccess(dataTemp))
    } else {
        dispatch(getListFailed())
    }


}





export {
    getListFailed,
    getListKkpa,
    getListSuccess,
    fetchKkpaList
}