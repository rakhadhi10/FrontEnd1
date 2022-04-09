import { useState, memo, useEffect } from "react";

import { FaQuestionCircle } from "react-icons/fa";
import { Button, Modal, notification } from "antd";
import { SmileOutlined } from '@ant-design/icons';
import {
  CardInfoKKPT,
  FormPenyebab,
  PnPenyebabModal,
  TableListPenyebab,
  KkptLayout
} from "../../../../component/EWP/EWPKKPT";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import { useParams } from "react-router";
import { compose } from "redux";
import { connect } from "react-redux";
import { createPenyebabList, getPenyebabList, deletePenyebabList } from "../../../../store/ducks/EWP/Kkpt/kkptpenyebab/action"
import { getReferencePenyebabList } from "../../../../store/ducks/EWP/Kkpt/refpenyebab/action"


const { confirm } = Modal;

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
    title: "Penyebab",
    link: "/ewp/project/kkpt/penyebab",
  },
];

function KKPTPenyebab({ stateKkptPenyebab, savePenyebabToServer, refListPenyebab, getDataPenyebab, deletePenyebab, getSelectListPenyebab }) {
  const { message, loading, data, dataPn } = stateKkptPenyebab
  const { messageRef, errorRef, loadingRef, dataRef } = refListPenyebab
  const { project_id, kkpt_id } = useParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [pnData, setpnData] = useState([]);


  const handleOnCloseModal = () => setModalVisible(false);
  const handleOnClickButton = (e) => setModalVisible(true);


  useEffect(() => {
    (async () => {
      getDataPenyebab(kkpt_id)
      getSelectListPenyebab()
    })();
  }, [kkpt_id])

  const onSavePn = (data) => {
    setpnData((prev) => [...prev, data]);
  };

  const onSavePenyebab = async (data) => {

    let dataTemp = {
      ...data,
      kkpt_id,
      pn: pnData
    }
    console.log(dataTemp)
    let res = await savePenyebabToServer(dataTemp)
    if (res === "success") {
      getDataPenyebab(kkpt_id)
      setpnData([]);
      notification.open({
        message: 'Notification Title',
        description:
          'Berhasil',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      });
    }
  };

  const handlePnDelete = (key) => {
    confirm({
      title: "Apakah anda yakin ingin menghapus Pn ini?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log(key)
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handlePenyebabDelete = (kodePenyebab) => {

    confirm({
      title: "Apakah anda yakin ingin menghapus penyebab ini?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        let res = await deletePenyebab(kodePenyebab)
        if (res === "success") {
          getDataPenyebab(kkpt_id)
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <KkptLayout selectedKey="5" breadcrumb={breadcrumb} kkpt_id={kkpt_id}>
      <PnPenyebabModal
        datapn={dataPn}
        visible={modalVisible}
        onSave={onSavePn}
        onCancel={handleOnCloseModal}
        value={pnData}
        onDelete={handlePnDelete}
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
        <p className="text-secondary-light-black text-3xl font-mulish font-bold">Penyebab</p>
        <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
      </div>
      <div className="w-full rounded-2xl bg-white border border-primary-blue py-5 px-5 mb-10">

        <FormPenyebab
          dataPenyebabList={dataRef}
          showModal={handleOnClickButton}
          onSave={onSavePenyebab}
          value={pnData.map((item) => item.pn)}
        />
        {message}
        <TableListPenyebab data={data} onDelete={handlePenyebabDelete} />
      </div>
    </KkptLayout>
  );
}

const mapStateToProps = (state) => ({
  stateKkptPenyebab: state.kkpt_penyebab,
  refListPenyebab: state.ref_penyebab_kkpt
});

const mapDispatchToProps = {
  savePenyebabToServer: createPenyebabList,
  getDataPenyebab: getPenyebabList,
  deletePenyebab: deletePenyebabList,
  getSelectListPenyebab: getReferencePenyebabList

};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(KKPTPenyebab);
