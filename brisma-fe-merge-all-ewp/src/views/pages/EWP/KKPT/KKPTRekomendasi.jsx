import { Button, Modal } from "antd";
import React, { useState, memo } from "react";
import { useParams } from "react-router";
import { compose } from "redux";
import { connect } from "react-redux";
import { getRekomendasiList, updateKkptRekomendasi, deleteKkptRekomendasi } from "../../../../store/ducks/EWP/Kkpt/kkptrekomendasi/action"
import { FaQuestionCircle } from "react-icons/fa";
import {
  CardInfoKKPT,
  ModalCreateRekomendasi,
  TableRekomendasi,
  KkptLayout
} from "../../../../component/EWP/EWPKKPT";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import EWPLayout from "../../../../layouts/EwpLayout";

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
    title: "Rekomendasi",
    link: "/ewp/project/kkpt/rekomendasi",
  },
];

function KKPTRekomendasi({ stateKkptRekomendasi, getAllDataRekomendasi, updateDataRekomendasi, deleteKkptRekomendasi }) {
  const { project_id, kkpt_id } = useParams();
  const [dataRekomendasi, setdataRekomendasi] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editValue, seteditValue] = useState([]);
  const { loading, error, message, data } = stateKkptRekomendasi

  React.useEffect(() => {
    getAllDataRekomendasi(kkpt_id)
  }, [])


  const handleOnCloseModal = () => {
    setModalVisible(false);
    seteditValue(null);
  };
  const handleOnClickButton = (e) => setModalVisible(true);

  const saveRekomendasi = (values, TYPE) => {
    console.log(values)
    updateDataRekomendasi(values, TYPE, kkpt_id)
    seteditValue([]);
  };

  const handleEdit = (record) => {
    seteditValue(record);
    setModalVisible(true);
  };

  function showDeleteConfirm(record) {
    confirm({
      title: "Apakah anda yakin ingin menghapus rekomendasi ini?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteKkptRekomendasi(record.id, kkpt_id)
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  return (
    <KkptLayout selectedKey="5" breadcrumb={breadcrumb} kkpt_id={kkpt_id}>
      <ModalCreateRekomendasi
        visible={modalVisible}
        handleSave={saveRekomendasi}
        handleCancel={handleOnCloseModal}
        value={editValue}
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
        <p className="text-secondary-light-black text-3xl font-mulish font-bold">Rekomendasi</p>
        <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
      </div>
      <div className="w-full rounded-2xl bg-white border border-primary-blue py-5 px-5 mb-10">
        <Button type="primary" onClick={handleOnClickButton}>
          Tambah Rekomendasi
        </Button>
        <p className="text-gray-500 font-mulish pt-5 pb-3">List Rekomendasi</p>
        <p className="text-gray-500 font-mulish pt-5 pb-3">{message}</p>
        <TableRekomendasi
          dataRekomendasi={data}
          handleEdit={handleEdit}
          handleDelete={showDeleteConfirm}
        />
      </div>
    </KkptLayout>
  );
}


const mapStateToProps = (state) => ({
  stateKkptRekomendasi: state.kkpt_rekomendasi,
});

const mapDispatchToProps = {
  getAllDataRekomendasi: getRekomendasiList,
  updateDataRekomendasi: updateKkptRekomendasi,
  deleteKkptRekomendasi
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(KKPTRekomendasi);
