import { Button, message, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { compose } from "redux";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import { AnggaranModal } from "../../../../component/EWP/Mapa/Anggaran/Modal/AnggaranModal";
import { TableAnggaran } from "../../../../component/EWP/Mapa/Anggaran/TableAnggaran";
import {
  createErrorNotification,
  createSuccessNotification,
} from "../../../../component/utils/notifications";
import EWPLayout from "../../../../layouts/EwpLayout";
import {
  fetchAnggaran,
  submitAnggaran,
  deleteAnggaran,
  updateAnggaran,
} from "../../../../store/ducks/EWP/Mapa/Anggaran/actions";
import {
  getData,
  getError,
  getLoading,
  getSubmitError,
  getSubmitLoading,
  getDeleteError,
  getDeleteLoading,
  getUpdateError,
  getUpdateLoading,
} from "../../../../store/ducks/EWP/Mapa/Anggaran/selectors";
import { pat_content } from "../../../routes/allowedRoles";
import withAuth from "../../../routes/hoc/withAuth";
import withRole from "../../../routes/hoc/withRole";

const showSuccessNotif = createSuccessNotification(
  "Anggaran",
  "Berhasil menyimpan Anggaran"
);
const showErrorNotif = (error) =>
  createErrorNotification(
    "Anggaran",
    "Gagal menyimpan Anggaran || ERROR: " + error
  );

function MapaAnggaran({
  loading,
  data,
  error,
  submitLoading,
  submitError,
  updateError,
  updateLoading,
  deleteError,
  deleteLoading,
  fetchAnggaran,
  submitAnggaran,
  updateAnggaran,
  deleteAnggaran,
}) {
  const { project_id } = useParams();
  const [addAnggaranModal, setaddAnggaranModal] = useState({
    visible: false,
    dataAnggaran: {},
    isEdit: false,
  });
  const [isEditId, setisEditId] = useState("");
  const [dataAnggaran, setdataAnggaran] = useState([]);

  useEffect(() => {
    fetchAnggaran(project_id);
  }, [fetchAnggaran, project_id]);
  useEffect(() => setdataAnggaran(data), [data]);

  console.log(data);

  const showAddModal = (value = {}, edit = false, anggaran_id = "") => {
    setaddAnggaranModal({ visible: true, dataAnggaran: value, isEdit: edit });
    setisEditId(anggaran_id);
  };

  const closeAddModal = () => {
    setaddAnggaranModal({ visible: false, dataAnggaran: {}, isEdit: false });
    fetchAnggaran(project_id);
    setisEditId("");
  };

  const handleOnSave = async (body, isEdit) => {
    if (isEdit) {
      const status = await updateAnggaran(project_id, isEditId, body);
      if (status === "success") {
        showSuccessNotif();
      } else {
        showErrorNotif(updateError);
      }
    } else {
      const status = await submitAnggaran(project_id, body);
      if (status === "success") {
        showSuccessNotif();
        fetchAnggaran(project_id);
      } else {
        showErrorNotif(submitError);
      }
    }
  };

  const handleOnDelete = async (mapa_anggaran_id) => {
    const status = await deleteAnggaran(project_id, mapa_anggaran_id);
    if (status === "success") {
      showSuccessNotif();
      fetchAnggaran(project_id);
    } else {
      showErrorNotif(deleteError);
    }
  };

  const breadcrumb = [
    { title: "MAPA", link: "/ewp/mapa/dashboard/" + project_id },
    {
      title: "Anggaran",
      link: "/ewp/mapa/anggaran/" + project_id,
    },
  ];

  return (
    <EWPLayout selectedKey="2" breadcrumb={breadcrumb}>
      <AnggaranModal
        visible={addAnggaranModal.visible}
        data={addAnggaranModal.dataAnggaran}
        onCancel={closeAddModal}
        onSave={handleOnSave}
        key={project_id}
        isEdit={addAnggaranModal.isEdit}
        submitLoading={submitLoading}
        updateLoading={updateLoading}
      />
      <div className="flex gap-1 mb-5">
        <Button size="small">
          <Link to={"/ewp/mapa/jadwal/" + project_id}>&lt;</Link>
        </Button>
        <Button size="small">
          <Link to={"/ewp/mapa/doc/" + project_id}>&gt;</Link>
        </Button>
      </div>
      <div className="px-6">
        <CardProjectEWP />
      </div>
      <div className="mt-16">
        <Typography.Title level={3} className="font-mulish">
          Anggaran
        </Typography.Title>
      </div>
      <div className="w-full rounded-2xl bg-white border border-primary-blue py-5 px-5 mb-10">
        <Button type="primary" onClick={() => showAddModal()}>
          Tambah Anggaran
        </Button>
        <p className="text-gray-500 font-mulish pt-5 pb-3">List Anggaran</p>
        {error && message.error(error)}
        <TableAnggaran
          dataAnggaran={dataAnggaran}
          handleDelete={handleOnDelete}
          handleEdit={showAddModal}
          loading={loading || deleteLoading}
        />
      </div>
    </EWPLayout>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: getLoading(state),
    error: getError(state),
    data: getData(state),
    submitLoading: getSubmitLoading(state),
    submitError: getSubmitError(state),
    updateLoading: getUpdateLoading(state),
    updateError: getUpdateError(state),
    deleteLoading: getDeleteLoading(state),
    deleteError: getDeleteError(state),
  };
};

const mapDispachToProps = {
  fetchAnggaran: fetchAnggaran,
  updateAnggaran: updateAnggaran,
  deleteAnggaran: deleteAnggaran,
  submitAnggaran: submitAnggaran,
};

export default compose(
  withAuth,
  withRole(pat_content),
  connect(mapStateToProps, mapDispachToProps)
)(MapaAnggaran);
