import { compose } from "redux";
import { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment"
import {
  CardInformation,
  CardInfoKkpa,
  ListSample,
  KkpaLayout,
} from "../../../../component/EWP/EwpKkpa";
import { Table, Menu, Checkbox, Empty } from "antd";
import { FaQuestionCircle } from "react-icons/fa";
import EWPLayout from "../../../../layouts/EwpLayout";
import withAuth from "../../../routes/hoc/withAuth";
import withRole from "../../../routes/hoc/withRole";
import { pat_content } from "../../../routes/allowedRoles";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import { useParams } from "react-router-dom";

import { getSampleKkpa, updateKkpaSample } from "../../../../store/ducks/EWP/KKPA/kkpasample/action"
const breadcrumb = [
  {
    title: "BRISMA",
    link: "/dashboard",
  },
  {
    title: "EWP",
    link: "/",
  },
  {
    title: "20210011",
    link: "/",
  },
  {
    title: "KKPA",
    link: "/",
  },
  {
    title: "RUANG LINGKUP",
    link: "/",
  },
];


export function EwpKkpaRuangLingkup({ state_kkpa_info, stateKkpaSample, getSampleKkpa, updateKkpaSample }) {
  const { project_id, kkpa_id } = useParams()
  const { data } = stateKkpaSample
  const kkpa_info = state_kkpa_info.kkpa_info;
  const [worksheetData, setworksheetData] = useState([]);
  const [sampleSelected, setSampleSelected] = useState([])
  const [checkedAll, setCheckedAll] = useState({})
  const dataFile = data.file.length

  useEffect(() => {
    (async () => {
      getSampleKkpa(kkpa_id)
    })();
    const setDataSampleFirst = (namaSample) => {
      let dataSample = data
      let sampleDipilih = dataSample[namaSample]
      const worksheetTemp = []
      if (namaSample === "file") {
        sampleDipilih.forEach((val, key) => {
          let dataContent = {
            ...val.content,
            id_sample: val.id,
            tipe_sample: namaSample,
            value: val.value,
            objek_sample_id: val.objek_sample_id,
          }

          worksheetTemp.push({
            id: `File ${key + 1}`,
            date: "",
            columns: [],
            data: [dataContent]
          })

          Object.keys(dataContent).forEach((valFile, keyFile) => {
            if (valFile === "action") {
              worksheetTemp[key].columns.push({
                title: valFile,
                dataIndex: valFile,

              })
            } else if (valFile !== "id_sample" && valFile !== "id" && valFile !== "tipe_sample" && valFile !== "objek_sample_id" && valFile !== "value") {
              worksheetTemp[key].columns.push({
                title: valFile,
                dataIndex: valFile,
              })
            }
          })
        })
      }
      setworksheetData(worksheetTemp)
    }
    if (dataFile !== 0) {
      setDataSampleFirst("file")
    }
  }, [kkpa_id, dataFile])

  const setDataSample = async (namaSample) => {
    let dataSample = data
    let sampleDipilih = dataSample[namaSample]
    const worksheetTemp = []
    if (namaSample === "file") {
      sampleDipilih.forEach((val, key) => {
        let dataContent = {
          ...val.content,
          id_sample: val.id,
          tipe_sample: namaSample,
          value: val.value,
          objek_sample_id: val.objek_sample_id,
        }

        worksheetTemp.push({
          id: `File ${key + 1}`,
          date: "",
          columns: [],
          data: [dataContent]
        })
        Object.keys(dataContent).forEach((valFile, keyFile) => {
          if (valFile === "action") {
            worksheetTemp[key].columns.push({
              title: valFile,
              dataIndex: valFile,

            })
          } else if (valFile !== "id_sample" && valFile !== "id" && valFile !== "tipe_sample" && valFile !== "objek_sample_id" && valFile !== "value") {
            worksheetTemp[key].columns.push({
              title: valFile,
              dataIndex: valFile,
            })
          }
        })
      })
    }

    if (namaSample === "csv") {
      let colTemp = []
      let col = sampleDipilih[0].data[0].headers
      let uniqArrCol = [...new Set(col)] // untuk menghilangkan value array yang duplicate
      for (let i = 0; i < uniqArrCol.length; i++) {
        uniqArrCol[i] === "action" ?
          colTemp.push({
            title: uniqArrCol[i],
            dataIndex: uniqArrCol[i],
          })
          :
          uniqArrCol[i] !== "id" && colTemp.push({
            title: uniqArrCol[i],
            dataIndex: uniqArrCol[i],
          })
      }
      sampleDipilih.forEach((value, key) => {
        worksheetTemp.push({
          id: `${value.title}`,
          date: "",
          columns: colTemp,
          data: []
        })
        value.data.forEach((valueCsv, keycsv) => {
          let dataContent = {
            ...valueCsv.content,
            id_sample: valueCsv.id,
            tipe_sample: namaSample,
            value: valueCsv.value,
            objek_sample_id: valueCsv.objek_sample_id,
            action: ""
          }
          worksheetTemp[key].data.push(dataContent)
        })
      })
    }
    setworksheetData(worksheetTemp)
  }


  function onChange(e, sample,) {

    let dataTempSample = {
      value: sample.value,
      tipe_sample: sample.tipe_sample,
      objek_sample_id: sample.objek_sample_id
    }

    if (e.target.checked) {
      setCheckedAll(state => ({ ...state, [`${sample.tipe_sample}-${sample.id_sample}`]: true }))
      setSampleSelected(state => [...state, dataTempSample])
    } else {
      setCheckedAll(state => ({ ...state, [`${sample.tipe_sample}-${sample.id_sample}`]: false }))
      setSampleSelected(state => state.filter(item => item.value !== sample.value))
    }


    // e.target.checked ? setSampleSelected(state => [...state, dataTempSample])
    //   : setSampleSelected(state => state.filter(item => item.value !== sample.value))

  }
  const listInformasi = [
    {
      title: "Sumber Informasi",
      ket: kkpa_info && kkpa_info.rl_sumber_informasi,
    },
    {
      title: "Teknik Sampling",
      ket: kkpa_info && kkpa_info.rl_teknik_sampling_desc,
    },
    {
      title: "Periode",
      ket: kkpa_info && `${moment(kkpa_info.rl_periode_start).format('LL')} sd ${moment(kkpa_info.rl_periode_end).format('LL')}`,
    },
    {
      title: "Uraian Sample",
      ket: kkpa_info && kkpa_info.rl_uraian_sample,
    },
    {
      title: "Jumlah Populasi",
      ket: kkpa_info && kkpa_info.rl_jumlah_populasi,
    },
    {
      title: "Jumlah Sample",
      ket: kkpa_info && kkpa_info.rl_jumlah_sample,
    },
  ];

  return (
    <KkpaLayout breadcrumb={breadcrumb} kkpa_id={kkpa_id}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <CardProjectEWP />
        </div>
        <div>
          <CardInfoKkpa />
        </div>
      </div>
      <div className="flex items-center gap-4 mt-6">
        <p className="text-secondary-light-black text-3xl font-mulish font-bold">Ruang Lingkup</p>
        <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
      </div>
      <div className="my-10">
        <CardInformation listDataSource={listInformasi} status="ruang-lingkup" />
        <div className="flex flex-col md:flex-row lg:flex-row justify-between space-x-7 mt-5">
          <div className="w-60">
            <div className=" border-primary-blue rounded-xl bg-white border py-3 h-56">
              <Menu defaultSelectedKeys="1">
                {Object.keys(data).map((valName, keyName) => {
                  return (
                    <Menu.Item onClick={() => setDataSample(valName)} key={keyName + 1}>Sample {valName.toUpperCase()}</Menu.Item>
                  )
                })}
              </Menu>
            </div>
          </div>
          <div className="w-4/5">
            <div className="bg-white border border-primary-blue rounded-xl p-10">
              {
                worksheetData.length !== 0 ?
                  worksheetData.map((item) => {
                    return (
                      <div key={item.id}>
                        <ListSample id={item.id} data={item.data} date={item.date} type="" columns={item.columns} />
                      </div>
                    )
                  }) :
                  <Empty description="tidak ada data sample" />
              }
            </div>
          </div>
        </div>
      </div>
    </KkpaLayout>
  );
}




const mapStateToProps = (state) => ({
  stateKkpaSample: state.kkpa_sample,
  state_kkpa_info: state.kkpa_info,
});
const mapDispatchToProps = {
  getSampleKkpa,
  updateKkpaSample
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withAuth, withRole(pat_content), withConnect, memo)(EwpKkpaRuangLingkup);
