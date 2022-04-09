import { Button, message, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchMapaSampleCSV,
  removeMapaSampleCSV,
} from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleCSV/actions";
import {
  getDataMapaSampleCSV,
  getErrorDeleteMapaSampleCSV,
  getErrorMapaSampleCSV,
  getLoadingDeleteMapaSampleCSV,
  getLoadingMapaSampleCSV,
} from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleCSV/selectors";
import EditSelectedCSVModal from "./EditSelectedCSVModal";
import PickCSVSampleModal from "./PickCSVSampleModal";
import UploadCSVModal from "./UploadCSVModal";

function CSVMapaSample({
  dataMapaCSV,
  loadingMapaCSV,
  errorMapaCSV,
  loadingDeleteMapaCSV,
  errorDeleteMapaCSV,
  fetchMapaSampleCSV,
  removeMapaSampleCSV,
  mcr_id,
}) {
  const [dataCSV, setdataCSV] = useState([]);
  const [uploadModal, setuploadModal] = useState(false);
  const [pickSampleModal, setPickSampleModal] = useState(false);
  const [editSelectedModal, seteditSelectedModal] = useState(false);
  const [selectedData, setselectedData] = useState([]);
  const [selectedDataEdit, setselectedDataEdit] = useState([]);

  useEffect(() => fetchMapaSampleCSV(mcr_id), [fetchMapaSampleCSV, mcr_id]);
  useEffect(() => setdataCSV(dataMapaCSV), [dataMapaCSV]);

  const columns = [
    { title: "Nama File", dataIndex: "filename", key: "filename" },
    { title: "Jumlah Baris", dataIndex: "jumlah_baris", key: "jumlah_baris" },
    { title: "Jumlah Sample", dataIndex: "jumlah_sample", key: "jumlah_sample" },
  ];

  const showUploadModal = () => setuploadModal(true);
  const closeUploadModal = () => {
    setuploadModal(false);
    fetchMapaSampleCSV(mcr_id);
  };
  const showPickSampleModal = () => setPickSampleModal(true);
  const closePickSampleModal = () => {
    setPickSampleModal(false);
    fetchMapaSampleCSV(mcr_id);
  };
  const showEditSampleModal = () => seteditSelectedModal(true);
  const closeEditSampleModal = () => {
    seteditSelectedModal(false);
    fetchMapaSampleCSV(mcr_id);
  };

  const onDeleteMapaCSVData = () => {
    Modal.confirm({
      title: "Apa anda yakin iningin menghapus data ini?",
      okType: "danger",
      onOk: async () => {
        const failed = await removeMapaSampleCSV(mcr_id, selectedData);
        if (!failed) {
          message.success("Delete Success!");
          fetchMapaSampleCSV(mcr_id);
        } else {
          message.error("Delete Failed!" + failed);
        }
      },
      onCancel() {},
    });
  };

  return (
    <div className="space-y-6">
      {uploadModal && (
        <UploadCSVModal visible={uploadModal} onCancel={closeUploadModal} mcr_id={mcr_id} />
      )}
      {pickSampleModal && (
        <PickCSVSampleModal
          visible={pickSampleModal}
          onCancel={closePickSampleModal}
          mcr_id={mcr_id}
        />
      )}
      {editSelectedModal && (
        <EditSelectedCSVModal
          body={selectedDataEdit}
          mcr_id={mcr_id}
          onCancel={closeEditSampleModal}
          visible={editSelectedModal}
        />
      )}

      <Table
        columns={columns}
        dataSource={dataCSV}
        pagination={false}
        loading={loadingMapaCSV}
        rowSelection={{
          onSelect: (record, selected, selectedRows) => {
            const dataTemp = [];
            selectedRows.map((item) => dataTemp.push({ objek_sample_id: item.id }));
            setselectedData(dataTemp);
            const dataEdit = [];
            selectedRows.map((item) => dataEdit.push({ pool_sample_id: item.id }));
            setselectedDataEdit(dataEdit);
          },
        }}
        rowKey="id"
      />
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <Button type="primary" onClick={showUploadModal}>
            Upload
          </Button>
          <Button type="primary" onClick={showPickSampleModal}>
            Pick Sample
          </Button>
        </div>
        <div className="flex space-x-4">
          <Button type="primary" onClick={showEditSampleModal}>
            Edit Selected
          </Button>
          <Button
            type="primary"
            danger
            onClick={onDeleteMapaCSVData}
            loading={loadingDeleteMapaCSV}
          >
            Delete Selected
          </Button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataMapaCSV: getDataMapaSampleCSV(state),
    loadingMapaCSV: getLoadingMapaSampleCSV(state),
    errorMapaCSV: getErrorMapaSampleCSV(state),
    loadingDeleteMapaCSV: getLoadingDeleteMapaSampleCSV(state),
    errorDeleteMapaCSV: getErrorDeleteMapaSampleCSV(state),
  };
};

const mapDispatchToProps = {
  fetchMapaSampleCSV: fetchMapaSampleCSV,
  removeMapaSampleCSV: removeMapaSampleCSV,
};

export default connect(mapStateToProps, mapDispatchToProps)(CSVMapaSample);
