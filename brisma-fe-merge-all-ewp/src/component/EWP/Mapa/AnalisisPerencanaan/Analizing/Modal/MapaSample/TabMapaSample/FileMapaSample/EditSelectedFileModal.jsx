import React, { useState } from "react";
import { Modal, Typography, Button, message } from "antd";
import { connect } from "react-redux";
import { submitUpdateMapaSampleFile } from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleFile/actions";
import {
  getErrorUpdateSampleFILE,
  getLoadingUpdateSampleFILE,
} from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleFile/selectors";
import { FormEditSampleFile } from "./FormEditSampleFile";

function EditSelectedFileModal({
  datas,
  visible,
  onCancel,
  loading,
  error,
  submitUpdateMapaSampleFile,
}) {
  const [selectedDatas, setselectedDatas] = useState([]);

  const handleOnChange = (e, id) => {
    const index = selectedDatas.findIndex((item) => item.id == id);
    const dataTemp = [...selectedDatas];
    if (index > -1) {
      dataTemp[index] = {
        id: id,
        description: e.target.value,
      };
    } else {
      dataTemp.push({
        id: id,
        description: e.target.value,
      });
    }
    setselectedDatas(dataTemp);
  };

  const onSave = async () => {
    const failed = await submitUpdateMapaSampleFile(selectedDatas);
    if (!failed) {
      message.success("Behasil Menyimpan data");
    } else {
      message.error("gagal Menyampan Data. ERROR: " + failed);
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
          <span className={"text-gray-700"}>Edit Sample File</span>
        </Typography.Title>,
      ]}
    >
      <div className="space-y-4">
        {datas &&
          datas.map((item) => (
            <FormEditSampleFile
              deskripsi={item.description}
              filename={item.filename}
              id={item.id}
              onChange={handleOnChange}
            />
          ))}
        <div className="flex space-x-4 justify-end">
          <Button type="primary" onClick={onSave} loading={loading}>
            Save Selected
          </Button>
        </div>
      </div>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: getLoadingUpdateSampleFILE(state),
    error: getErrorUpdateSampleFILE(state),
  };
};

const mapDispatchToProps = {
  submitUpdateMapaSampleFile: submitUpdateMapaSampleFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSelectedFileModal);
