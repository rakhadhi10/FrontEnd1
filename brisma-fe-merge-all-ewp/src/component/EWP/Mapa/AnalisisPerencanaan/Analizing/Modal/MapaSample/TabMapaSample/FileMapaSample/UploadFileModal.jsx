import { Button, Input, message, Modal, Typography, Upload } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { submitUploadSampleFile } from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleFile/actions";
import {
  getErrorUploadSampleFILE,
  getLoadingUploadSampleFILE,
} from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleFile/selectors";

function UploadFileModal({ visible, onCancel, mcr_id, loading, submitUploadSampleFile }) {
  const [dataUpload, setdataUpload] = useState();
  const [deskripsi, setdeskripsi] = useState("");
  const { project_id } = useParams();

  const onSave = async () => {
    const error = await submitUploadSampleFile(project_id, mcr_id, dataUpload, deskripsi);
    if (!error) {
      message.success("Data Berhasil disimpan");
      onCancel();
    } else {
      message.error("Data Gagal Disimpan, ERROR: " + error);
    }
  };

  return (
    <Modal
      visible={visible}
      destroyOnClose
      centered
      width={1000}
      maskClosable={false}
      footer={null}
      onCancel={onCancel}
      title={[
        <Typography.Title level={2} className="text-center">
          <span className={"text-gray-700"}>Upload File Sample</span>
        </Typography.Title>,
      ]}
    >
      <div className="space-y-4">
        <Upload
          beforeUpload={(file) => {
            setdataUpload(file);
            return false;
          }}
          maxCount={1}
          onRemove={() => {
            setdataUpload();
            setdeskripsi("");
          }}
        >
          <Button type="primary">Browse</Button>
        </Upload>
        <div className="flex space-x-4">
          <p>Deskrpsi</p>
          <Input.TextArea rows={4} onChange={(e) => setdeskripsi(e.target.value)} />
        </div>
        <div className="flex justify-end">
          <Button type="primary" onClick={onSave} loading={loading}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: getLoadingUploadSampleFILE(state),
    error: getErrorUploadSampleFILE(state),
  };
};

const mapDispatchToProps = {
  submitUploadSampleFile: submitUploadSampleFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadFileModal);
