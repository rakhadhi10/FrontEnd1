import { useState, memo, useEffect } from "react";

import { Button, Menu, Checkbox, Empty } from "antd";
import { CardInfoKKPT, TableWorksheet, KkptLayout } from "../../../../component/EWP/EWPKKPT";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import { FaQuestionCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { compose } from "redux";
import { connect } from "react-redux";
import { getSampleKkpt, updateKkptSample } from "../../../../store/ducks/EWP/Kkpt/kkptsample/action"
const breadcrumb = [
  {
    title: "BRISMA",
    link: "/",
  },
  {
    title: "EWP",
    link: "/dashboard",
  },
  {
    title: "20210011",
    link: "/ewp/project",
  },
  {
    title: "KKPT",
    link: "/ewp/project/kkpt",
  },
  {
    title: "Worksheet",
    link: "/ewp/project/kkpt/worksheet",
  },
];


function KKPTWorksheet({ stateKkptSample, getSampleKkpt, updateKkptSample }) {
  const { project_id, kkpt_id } = useParams();
  const { data, loading, message, error, loadingUpdate, errorUpdate, messageUpdate } = stateKkptSample
  const [worksheetData, setworksheetData] = useState([]);
  const [sampleSelected, setSampleSelected] = useState([])
  const [checkedAll, setCheckedAll] = useState({})
  const dataFile = data.file.length

  useEffect(() => {
    (async () => {
      getSampleKkpt(kkpt_id)
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
            action: ""
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
                render: (_, record) => {
                  // if (checkedAll[`${record.tipe_sample}-${record.id_sample}`] !== undefined) {


                  //   return <Checkbox checked={checkedAll[`${record.tipe_sample}-${record.id_sample}`]} onChange={(e) => onChange(e, record)} />

                  // } else {
                  //   return <Checkbox onChange={(e) => onChange(e, record)} />
                  // }
                  return <Checkbox onChange={(e) => onChange(e, record)} />
                },
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
  }, [kkpt_id, dataFile])




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
          action: ""
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
              render: (_, record) => {
                // if (checkedAll[`${record.tipe_sample}-${record.id_sample}`] !== undefined) {
                //   return (
                //     <>
                //       <p>{JSON.stringify(checkedAll[`${record.tipe_sample}-${record.id_sample}`])}</p>
                //       <Checkbox checked={checkedAll[`${record.tipe_sample}-${record.id_sample}`]} onChange={(e) => onChange(e, record)} />
                //     </>
                //   )

                // } else {
                //   return <Checkbox onChange={(e) => onChange(e, record)} />
                // }
                return <Checkbox onChange={(e) => onChange(e, record)} />
              },
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
      col.push("action")
      let uniqArrCol = [...new Set(col)] // untuk menghilangkan value array yang duplicate
      for (let i = 0; i < uniqArrCol.length; i++) {
        uniqArrCol[i] === "action" ?
          colTemp.push({
            title: uniqArrCol[i],
            dataIndex: uniqArrCol[i],
            render: (_, record) => {
              // if (checkedAll[`${record.tipe_sample}-${record.id_sample}`] !== undefined) {
              //   return <Checkbox checked={checkedAll[`${record.tipe_sample}-${record.id_sample}`]} onChange={(e) => onChange(e, record)} />

              // } else {
              //   return <Checkbox onChange={(e) => onChange(e, record)} />
              // }
              return <Checkbox onChange={(e) => onChange(e, record)} />
            },
          })
          :
          uniqArrCol[i] !== "id" && colTemp.push({
            title: uniqArrCol[i],
            dataIndex: uniqArrCol[i],
          })
      }
      sampleDipilih.forEach((value, key) => {
        worksheetTemp.push({
          id: `${value.file_name}`,
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


  const onSaveWorkSheet = async () => {
    let dataTempSave = {
      kkpt_id,
      samples: sampleSelected
    }
    let res = await updateKkptSample(dataTempSave)
    if (res === "success") {
      setSampleSelected([])
    }
  }


  return (
    <KkptLayout title={'KKPT WORKSHEET'} selectedKey="5" breadcrumb={breadcrumb} kkpt_id={kkpt_id}>
      {
        !loading ?
          <>

            <div className="flex gap-1 pb-5">
              <Button size="small">&lt;</Button>
              <Button size="small">&gt;</Button>
            </div>
            <div className="grid grid-cols-2 gap-6 px-6">
              <CardProjectEWP />
              <CardInfoKKPT />
            </div>
            <div className="flex items-center gap-4 mb-4 mt-8">
              <p className="text-secondary-light-black text-3xl font-mulish font-bold">Worksheet</p>
              <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
            </div>
            <div className="flex gap-x-5">
              <div className="w-1/6 border-primary-blue rounded-xl bg-white border py-3 h-56">
                <Menu defaultSelectedKeys="1">
                  {Object.keys(data).map((valName, keyName) => {
                    return (
                      <Menu.Item onClick={() => setDataSample(valName)} key={keyName + 1}>Sample {valName.toUpperCase()}</Menu.Item>
                    )
                  })}
                </Menu>
              </div>
              <div className="w-5/6 rounded-xl px-5 py-5 bg-white border border-primary-blue">
                {
                  worksheetData.length !== 0 ?
                    worksheetData.map((item) => {
                      return (
                        <div key={item.id}>
                          <TableWorksheet id={item.id} data={item.data} date={item.date} type="" columns={item.columns} />
                        </div>
                      )
                    }) :
                    <Empty description="tidak ada data sample" />
                }
                {messageUpdate}
                <div className="mt-8 flex justify-end">
                  <Button onClick={onSaveWorkSheet} type="primary">Save</Button>
                </div>
              </div>
            </div>
          </>
          :
          <p>waiting</p>
      }
    </KkptLayout>
  );
}

const mapStateToProps = (state) => ({
  stateKkptSample: state.kkpt_sample

});

const mapDispatchToProps = {
  getSampleKkpt,
  updateKkptSample
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(KKPTWorksheet);
