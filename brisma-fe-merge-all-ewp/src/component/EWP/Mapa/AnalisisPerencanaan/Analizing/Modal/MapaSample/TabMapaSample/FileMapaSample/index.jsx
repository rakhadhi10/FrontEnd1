import { Button, Modal, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchMapaSampleFile,
  removeMapaSampleFile,
} from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleFile/actions";
import {
  getDataMapaSampleFILE,
  getErrorDeleteMapaSampleFILE,
  getErrorMapaSampleFILE,
  getLoadingDeleteMapaSampleFILE,
  getLoadingMapaSampleFILE,
} from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleFile/selectors";
import EditSelectedFileModal from "./EditSelectedFileModal";
import PickFileSampleModal from "./PickFileSampleModal";
import UploadFileModal from "./UploadFileModal";

function FileMapaSample({
  dataMapaFile,
  loadingMapaFile,
  errorMapaFile,
  loadingDeleteMapaFile,
  errorDeleteMapaFile,
  fetchMapaSampleFile,
  removeMapaSampleFile,
  mcr_id,
}) {
  const [dataFile, setdataFile] = useState();
  const [selectedData, setselectedData] = useState([]);
  const [uploadModal, setuploadModal] = useState(false);
  const [pickModal, setpickModal] = useState(false);
  const [editModal, seteditModal] = useState(false);

  const showUploadModal = () => setuploadModal(true);
  const closeUploadModal = () => {
    setuploadModal(false);
    fetchMapaSampleFile(mcr_id);
  };
  const showpickModal = () => setpickModal(true);
  const closepickModal = () => {
    setpickModal(false);
    fetchMapaSampleFile(mcr_id);
  };
  const showeditModal = () => seteditModal(true);
  const closeeditModal = () => {
    seteditModal(false);
    fetchMapaSampleFile(mcr_id);
  };

  useEffect(() => fetchMapaSampleFile(mcr_id), [mcr_id]);
  useEffect(() => setdataFile(dataMapaFile), [dataMapaFile]);

  const columns = [
    { title: "Nama File", dataIndex: "filename", key: "filename" },
    { title: "Deskripsi", dataIndex: "description", key: "description" },
  ];

  const onDeleteMapaFileData = () => {
    const body = [];
    selectedData.map((item) => body.push({ objek_sample_id: item.id }));
    Modal.confirm({
      title: "Apa anda yakin iningin menghapus data ini?",
      okType: "danger",
      onOk: async () => {
        const failed = await removeMapaSampleFile(mcr_id, body);
        console.log(failed);
        if (!failed) {
          message.success("Delete Success!");
          fetchMapaSampleFile(mcr_id);
        } else {
          message.error("Delete Failed!" + failed);
        }
      },
      onCancel() {},
    });
  };

  return (
    <div className="space-y-6">
      {pickModal && (
        <PickFileSampleModal
          mcr_id={mcr_id}
          onCancel={closepickModal}
          visible={pickModal}
          key="pickFileModal"
        />
      )}
      <EditSelectedFileModal
        datas={selectedData}
        onCancel={closeeditModal}
        visible={editModal}
        key="editSelected"
      />
      <UploadFileModal
        mcr_id={mcr_id}
        onCancel={closeUploadModal}
        visible={uploadModal}
        key="uploadFileModal"
      />
      <Table
        columns={columns}
        dataSource={dataFile}
        loading={loadingMapaFile}
        rowSelection={{
          onSelect: (record, selected, selectedRows) => {
            setselectedData(selectedRows);
          },
        }}
        rowKey="id"
      />
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <Button type="primary" onClick={showUploadModal}>
            Upload
          </Button>
          <Button type="primary" onClick={showpickModal}>
            Pick Sample
          </Button>
        </div>
        <div className="flex space-x-4">
          <Button type="primary" onClick={showeditModal}>
            Edit Selected
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => onDeleteMapaFileData()}
            loading={loadingDeleteMapaFile}
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
    dataMapaFile: getDataMapaSampleFILE(state),
    loadingMapaFile: getLoadingMapaSampleFILE(state),
    errorMapaFile: getErrorMapaSampleFILE(state),
    loadingDeleteMapaFile: getLoadingDeleteMapaSampleFILE(state),
    errorDeleteMapaFile: getErrorDeleteMapaSampleFILE(state),
  };
};

const mapDispatchToProps = {
  fetchMapaSampleFile: fetchMapaSampleFile,
  removeMapaSampleFile: removeMapaSampleFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileMapaSample);
