import { Button, Modal } from "antd";
import React, { useState, memo, useEffect } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { compose } from "redux";
import { connect } from "react-redux";
import { getReferenceImpactNonFinancial } from "../../../../store/ducks/EWP/Kkpt/refdampaknonfinancial/action"
import { createKkptDampak, getDampakList } from "../../../../store/ducks/EWP/Kkpt/kkptdampak/action"
import { notification } from "antd"
import {
  CardInfoKKPT,
  DampakFinansialCard,
  DampakNonFinansialCard,
  KesimpulanDampakCard,
  ModalDetailKerugian,
  KkptLayout
} from "../../../../component/EWP/EWPKKPT";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import { useParams } from "react-router-dom"
import { SmileOutlined } from '@ant-design/icons';


const { confirm } = Modal;

// ref_impact_nonfinancial

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
    title: "Dampak",
    link: "/ewp/project/kkpt/dampak",
  },
];

function KKPTDampak({ stateRefDampakNof, getReferenceImpactNonFinancial, createKkptDampak, stateDampak, getDampakList }) {
  const { project_id, kkpt_id } = useParams()
  const [test, setTest] = useState(1)
  const { dataImpact } = stateRefDampakNof
  const [modalVisible, setModalVisible] = useState(false);

  const handleOnCloseModal = () => setModalVisible(false);
  const handleOnClickButton = (e) => setModalVisible(true);

  const lengthKerugian = stateDampak.data.list_kerugian.length

  useEffect(() => {
    (async () => {

      let res = await getDampakList(kkpt_id)
      if (res === "success") {
        if (lengthKerugian !== 0) {
          let dataKerugian = stateDampak.data.list_kerugian
          let dataTemp = []
          dataKerugian.forEach((v, k) => {
            dataTemp.push({
              ...v,
              key: k + 1
            })
          })
          setdatadampakFinansial(state => ({
            ...state,
            listKerugian: dataTemp,
            totalKerugian: stateDampak.data.total_kerugian,
            financial_impact_kode: stateDampak.data.financial_impact_kode,
            financial_type_impact_kode: stateDampak.data.financial_type_impact_kode,
            grossProfit: stateDampak.data.gross
          }))
          setdataDampakNonFinansial(stateDampak.data.list_nonfinancial)
          setKeteranganKesimpulan(stateDampak.data.desc_impact)
          setSkorDampak(stateDampak.data.impact_kode)
        }
      }
    })()
    getReferenceImpactNonFinancial()
  }, [lengthKerugian])


  const [datadampakFinansial, setdatadampakFinansial] = useState({
    listKerugian: [],
    totalKerugian: 0,
    grossProfit: 1000000000000,
    financial_impact_kode: "",
    financial_type_impact_kode: ""
  });


  const [dataDampakNonFinansial, setdataDampakNonFinansial] = useState([]);
  const [keteranganKesimpulan, setKeteranganKesimpulan] = useState("");
  const [skorDampak, setSkorDampak] = useState("");

  const onSaveDampakKerugian = (value) => {
    const key = datadampakFinansial.listKerugian.length + 1;
    const newData = { key: key, ...value };
    const totalKerugian = Number(datadampakFinansial.totalKerugian) + Number(value.jumlah_kerugian);
    console.log(value.jumlah_kerugian)
    setdatadampakFinansial((prev) => ({
      ...prev,
      totalKerugian: totalKerugian,
      listKerugian: [...prev.listKerugian, newData],
    }));
  };

  const onChangeDampakNonFinansial = (tag, value) => {
    let dataChoice = value.split("-")
    let checkSame = dataDampakNonFinansial.filter(item => item.nonfinancial_type_impact_kode === dataChoice[0])

    if (checkSame.length !== 0) {
      let indexArr = dataDampakNonFinansial.findIndex(item => item.nonfinancial_type_impact_kode === dataChoice[0])
      delete dataDampakNonFinansial[indexArr]
      let reundefined = dataDampakNonFinansial.filter(item => item !== undefined)
      setdataDampakNonFinansial(state => (
        [...reundefined, {
          nonfinancial_type_impact_kode: dataChoice[0],
          mtd_stc_impact_kode: dataChoice[1]
        }]
      ));
    } else {
      setdataDampakNonFinansial(state => (
        [...state, {
          "nonfinancial_type_impact_kode": dataChoice[0],
          "mtd_stc_impact_kode": dataChoice[1]
        }]
      ));
    }

  };



  const onDeleteDampakKerugian = (key, jumlahKerugian) => {
    const totalKerugian = datadampakFinansial.totalKerugian - jumlahKerugian;
    confirm({
      title: "Apakah anda yakin ingin menghapus data kerugian ini?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setdatadampakFinansial((prev) => ({
          ...prev,
          totalKerugian: totalKerugian,
          listKerugian: datadampakFinansial.listKerugian.filter((item) => item.key !== key),
        }));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const getValueKeterangan = (text) => {
    console.log(text)
    setKeteranganKesimpulan(text)
  }

  const onSave = async () => {

    let kerugianArr = []
    datadampakFinansial.listKerugian.forEach((v, k) => {
      kerugianArr.push({
        "jumlah_kerugian": v.jumlah_kerugian,
        "jenis_kerugian": v.jenis_kerugian,
        "keterangan": v.keterangan
      })
    })

    const dataTempSave = {
      kkpt_id,
      desc_impact: keteranganKesimpulan,
      total_kerugian: datadampakFinansial.totalKerugian,
      list_kerugian: kerugianArr,
      list_nonfinancial: dataDampakNonFinansial
    }
    let res = await createKkptDampak(dataTempSave)
    console.log(res)
    if (res === "success") {
      notification.open({
        message: 'Success',
        description: 'Berhasil Memproses Kkpt Dampak',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      });
    }

  }

  return (
    <KkptLayout selectedKey="5" breadcrumb={breadcrumb} kkpt_id={kkpt_id}>
      <ModalDetailKerugian
        visible={modalVisible}
        onCancel={handleOnCloseModal}
        onSave={onSaveDampakKerugian}
      />
      <div className="flex gap-1 pb-5">
        <Button size="small">&lt;</Button>
        <Button size="small">&gt;</Button>
      </div>
      <div className="grid grid-cols-2 gap-6 px-6">
        <CardProjectEWP />
        <CardInfoKKPT />
      </div>
      <div className="flex items-center gap-4 mb-4 mt-8">
        <p className="text-secondary-light-black text-3xl font-mulish font-bold">Dampak</p>
        <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
      </div>
      <div className="w-full rounded-2xl bg-white border border-primary-blue py-5 px-5 mb-10">
        <div className="flex items-center gap-4 mb-4 ">
          <p className="text-secondary-light-black text-lg font-mulish font-bold">
            Dampak Finansial
          </p>
          <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
        </div>
        <DampakFinansialCard
          data={datadampakFinansial}
          showModal={handleOnClickButton}
          onDelete={onDeleteDampakKerugian}
        />
      </div>
      <div className="w-full rounded-2xl bg-white border border-primary-blue py-5 px-5 mb-10">
        <div className="flex items-center gap-4 mb-4 ">
          <p className="text-secondary-light-black text-lg font-mulish font-bold">
            Dampak Non Finansial
          </p>
          <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
        </div>
        <DampakNonFinansialCard
          data={dataImpact}
          dataDampak={stateDampak.data}
          onChange={onChangeDampakNonFinansial}
        />
      </div>
      <div className="w-full rounded-2xl bg-white border border-primary-blue py-5 px-5 mb-10">
        <div className="flex items-center gap-4 mb-4 ">
          <p className="text-secondary-light-black text-lg font-mulish font-bold">
            Kesimpulan Dampak
          </p>
          <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
        </div>
        <KesimpulanDampakCard skorDampak={skorDampak} kesimpulanValue={keteranganKesimpulan} getValueKeterangan={getValueKeterangan} onSave={onSave} />
      </div>
    </KkptLayout>
  );
}

const mapStateToProps = (state) => ({
  stateRefDampakNof: state.ref_impact_nonfinancial,
  stateDampak: state.kkpt_dampak

});

const mapDispatchToProps = {
  getReferenceImpactNonFinancial,
  createKkptDampak,
  getDampakList

};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(KKPTDampak);
