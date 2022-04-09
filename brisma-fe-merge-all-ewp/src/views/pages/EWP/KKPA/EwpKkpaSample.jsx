import { compose } from "redux";
import { memo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Radio, Table, Checkbox, Empty } from "antd";
import {
  CardInfoKkpa,
  CardInformation,
  TitleQuestion,
  KkpaLayout,
  ListSample
} from "../../../../component/EWP/EwpKkpa";
import { CheckOutlined } from "@ant-design/icons";
import { FaQuestionCircle } from "react-icons/fa";
import { fetchAllDataRefControl } from "../../../../store/ducks/EWP/KKPA/refriskcontrol/action";
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
    title: "PENGUJIAN SAMPLE",
    link: "/",
  },
];




function EwpKkpaSample({ state_ref_control, state_kkpa_info, fetchAllDataRefControl, stateKkpaSample, getSampleKkpa }) {
  const { project_id, kkpa_id } = useParams()
  const { data } = stateKkpaSample
  const [size, setSize] = useState({ size: "large" });
  const akd = state_kkpa_info.info_kkpa && state_kkpa_info.info_kkpa.risk_issue.kode;
  const [worksheetData, setworksheetData] = useState([]);
  const [keterangan, setKeterangan] = useState("")
  const dataFile = data.file.length

  const [dataSave, setDataSave] = useState([]);

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
            id_sample: val.id,
            ...val.content,
            key: Math.random(),
            tipe_sample: namaSample,
            value: val.value,
            objek_sample_id: val.objek_sample_id,
            bermasalah: val.is_problem
          }

          worksheetTemp.push({
            id: `File ${key + 1}`,
            date: "",
            columns: [],
            data: [dataContent]
          })

          Object.keys(dataContent).forEach((valFile, keyFile) => {
            if (valFile === "bermasalah") {
              worksheetTemp[key].columns.push({
                title: valFile,
                dataIndex: valFile,
                align: "center",
                render: (_, record) => {
                  if (record.bermasalah) {
                    return <CheckOutlined color="red" />
                  }
                  return ""
                },
              })
            } else if (valFile !== "id_sample" && valFile !== "id" && valFile !== "tipe_sample" && valFile !== "objek_sample_id" && valFile !== "value") {
              worksheetTemp[key].columns.push({
                title: valFile,
                dataIndex: valFile,
                align: "center",
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

    if (akd !== null) {
      fetchAllDataRefControl(akd);
    }
  }, [fetchAllDataRefControl, akd, dataFile]);




  const handleSizeChange = (e) => {
    console.log(e.target.value);
    setSize({ size: e.target.value });
  };

  function onChange(e, record) {
    console.log(record)
    console.log(`checked = ${e.target.checked}`);
  }

  const columnsControl = [
    {
      title: "Kode",
      dataIndex: "kode",
      key: "kode",
      align: "center",
    },
    {
      title: "Key",
      dataIndex: "keya",
      key: "keya",
      align: "center",
      render: (_, record) => {

        if (record.keya === "check") {
          return <CheckOutlined className="text-primary-green" />;
        }
        return "";
      },
    },
    {
      title: "Deskripsi",
      dataIndex: "deskripsi",
      key: "deskripsi",
      align: "center",
    },
    {
      title: "Tidak Efektif",
      dataIndex: "tidak_efektif",
      key: "tidak_efektif",
      align: "center",
      render: (_, record) => {
        return <Checkbox onChange={(e) => onChange(e, record)}></Checkbox>;
      },
    },
  ];

  const setDataSample = async (namaSample) => {
    let dataSample = data
    let sampleDipilih = dataSample[namaSample]
    const worksheetTemp = []
    if (namaSample === "file") {
      sampleDipilih.forEach((val, key) => {
        let dataContent = {
          id_sample: val.id,
          ...val.content,
          key: Math.random(),
          tipe_sample: namaSample,
          value: val.value,
          objek_sample_id: val.objek_sample_id,
          bermasalah: val.is_problem
        }

        worksheetTemp.push({
          id: `File ${key + 1}`,
          date: "",
          columns: [],
          data: [dataContent]
        })
        Object.keys(dataContent).forEach((valFile, keyFile) => {
          if (valFile === "bermasalah") {
            worksheetTemp[key].columns.push({
              title: valFile,
              dataIndex: valFile,
              align: "center",
              render: (_, record) => {
                if (record.bermasalah) {
                  return <CheckOutlined color="red" />
                }
                return ""
              },
            })
          } else if (valFile !== "id_sample" && valFile !== "id" && valFile !== "tipe_sample" && valFile !== "objek_sample_id" && valFile !== "value") {
            worksheetTemp[key].columns.push({
              title: valFile,
              align: "center",
              dataIndex: valFile,

            })
          }
        })
      })
    }

    if (namaSample === "csv") {
      let colTemp = []
      let col = sampleDipilih[0].data[0].headers
      col.push("bermasalah")
      let uniqArrCol = [...new Set(col)] // untuk menghilangkan value array yang duplicate
      for (let i = 0; i < uniqArrCol.length; i++) {
        uniqArrCol[i] === "bermasalah" ?
          colTemp.push({
            title: uniqArrCol[i],
            dataIndex: uniqArrCol[i],
            align: "center",
            render: (_, record) => {
              if (record.bermasalah) {
                return <CheckOutlined color="red" />
              }
              return ""
            },
          })
          :
          uniqArrCol[i] !== "id" && colTemp.push({
            title: uniqArrCol[i],
            align: "center",
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
            id_sample: valueCsv.id,
            ...valueCsv.content,
            key: Math.random(),
            tipe_sample: namaSample,
            value: valueCsv.value,
            objek_sample_id: valueCsv.objek_sample_id,
            bermasalah: value.is_problem
          }
          worksheetTemp[key].data.push(dataContent)
        })
      })
    }
    setworksheetData(worksheetTemp)
  }

  const onSelectRow = (record) => {

    if (dataSave.filter(item => item.id_sample === record.id_sample).length === 0) {
      let sample = { id: record.id_sample }
      setDataSave(state => [...state, sample])

    }

  }

  const onSetKeterangan = (e) => {
    setKeterangan(e.target.value)

    // setDataSave(state => [...state, { ...state[state.length - 1], pengujian_sample_desc: keterangan }])
  }

  console.log(dataSave)

  return (
    <KkpaLayout selectedKey="4" breadcrumb={breadcrumb} kkpa_id={kkpa_id}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <CardProjectEWP />
        </div>
        <div>
          <CardInfoKkpa />
        </div>
      </div>
      <div className="flex items-center gap-4 mt-6">
        <p className="text-secondary-light-black text-3xl font-mulish font-bold">
          Pengujian Sample
        </p>
        <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
      </div>
      <div className="my-10">
        <CardInformation title="Program Audit" status="sample" />
        <Radio.Group className="mt-5" value={size} onChange={handleSizeChange}>
          {Object.keys(data).map((valName, keyName) => {
            return <Radio.Button
              onClick={() => setDataSample(valName)}
              key={keyName + 1}
              className="h-10 text-lg  bg-primary-gray hover:bg-secondary-gray"
              value="small"
            >
              {valName.toUpperCase()}
            </Radio.Button>

          })
          }


        </Radio.Group>
        <div className="flex flex-col md:flex-row lg:flex-row justify-between space-x-3">
          <div className="w-4/5">
            <div className="bg-white border border-primary-blue rounded-xl p-10">
              {
                worksheetData.length !== 0 ?
                  worksheetData.map((item) => {
                    return (
                      <div key={item.id}>
                        <ListSample onSelect={onSelectRow} id={item.id} data={item.data} date={item.date} type="" columns={item.columns} />
                      </div>
                    )
                  }) :
                  <Empty description="tidak ada data sample" />
              }
            </div>
          </div>
          <div className="w-3/6">
            <div className="bg-white border border-primary-blue rounded-xl p-3 h-screen">
              <div className="space-y-5">
                <div>
                  <div className="space-y-1 mb-3">
                    <TitleQuestion title="Keterangan" />
                    <textarea
                      onChange={(e) => onSetKeterangan(e)}
                      className="w-full bg-secondary-gray text-secondary-light-black rounded-xl px-5 py-2 h-32  focus:outline-none"
                      placeholder="keterangan pengujian masing-masing sample"
                    />
                  </div>
                </div>
                <div>
                  <div className="space-y-3 mb-3 ">
                    <TitleQuestion title="Control" />
                    <div className="border border-primary-blue h-96 overflow-x-scroll">
                      <Table
                        pagination={false}
                        size="small"
                        dataSource={state_ref_control.data}
                        columns={columnsControl}
                      />
                    </div>
                  </div>
                </div>
              </div>
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
  state_ref_control: state.ref_risk_control,
});

const mapDispatchToProps = {
  fetchAllDataRefControl,
  getSampleKkpa,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withAuth, withRole(pat_content), withConnect, memo)(EwpKkpaSample);
