import { Button, Empty, message, Modal, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchContentPoolSampleCSV,
  submitUpdateMapaSampleCSV,
} from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleCSV/actions";
import {
  getDataContentPoolSampleCSV,
  getErrorContentPoolSampleCSV,
  getErrorUpdateSampleCSV,
  getLoadingContentPoolSampleCSV,
  getLoadingUpdateSampleCSV,
} from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleCSV/selectors";
import { EditTableSampleCSV } from "./EditTableSampleCSV";

function EditSelectedCSVModal({
  visible,
  onCancel,
  data,
  loading,
  error,
  loadingSubmit,
  errorSubmit,
  fetchContentPoolSampleCSV,
  submitUpdateMapaSampleCSV,
  body,
  mcr_id,
}) {
  const [files, setfiles] = useState();
  const [selectedDatas, setselectedDatas] = useState([]);

  useEffect(
    () => fetchContentPoolSampleCSV(mcr_id, body),
    [fetchContentPoolSampleCSV, mcr_id, body]
  );
  useEffect(() => setfiles(data), [data]);
  console.log(body);

  const handleOnChange = (values) => {
    values.map((item) => {
      const index = selectedDatas.findIndex(
        (e) =>
          e.value == item.value && e.objek_sample_id == item.objek_sample_id
      );
      if (index === -1) {
        setselectedDatas((prev) => [...prev, item]);
      }
    });
  };

  const onSave = async () => {
    console.log(selectedDatas);
    const failed = await submitUpdateMapaSampleCSV(mcr_id, selectedDatas);
    if (!failed) {
      message.success("Data berhasil disimpan");
    } else {
      message.error("Data Gagal disimpan. ERROR: " + failed);
    }
  };

  return (
    <Modal
      visible={visible}
      destroyOnClose={true}
      centered
      width={1000}
      maskClosable={false}
      footer={null}
      onCancel={onCancel}
      title={[
        <Typography.Title level={2} className="text-left">
          <span className={"text-gray-700"}>Pick Sample File</span>
        </Typography.Title>,
      ]}
      className="space-y-4"
    >
      {loading && (
        <div className="h-40 justify-center">
          {" "}
          <Spin size="large" />
        </div>
      )}
      {!files && <Empty />}
      {error && message.error(error)}
      {files &&
        data &&
        !loading &&
        files.map((item) => (
          <div className="my-4">
            <EditTableSampleCSV data={item} onChange={handleOnChange} />
          </div>
        ))}
      <div className="flex space-x-4 justify-end">
        <Button type="primary" onClick={onSave} loading={loadingSubmit}>
          Save Selected
        </Button>
      </div>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    data: getDataContentPoolSampleCSV(state),
    loading: getLoadingContentPoolSampleCSV(state),
    error: getErrorContentPoolSampleCSV(state),
    loadingSubmit: getLoadingUpdateSampleCSV(state),
    errorSubmit: getErrorUpdateSampleCSV(state),
  };
};

const mapDispatchToProps = {
  fetchContentPoolSampleCSV: fetchContentPoolSampleCSV,
  submitUpdateMapaSampleCSV: submitUpdateMapaSampleCSV,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSelectedCSVModal);
