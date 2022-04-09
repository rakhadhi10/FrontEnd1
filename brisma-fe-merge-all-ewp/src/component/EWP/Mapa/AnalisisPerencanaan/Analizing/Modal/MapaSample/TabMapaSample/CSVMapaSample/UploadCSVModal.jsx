import React, { useState } from "react";
import { Upload, Button, Modal, Typography, Select, Table, Empty, Spin, message } from "antd";
import Papa from "papaparse";
import { triggerFocus } from "antd/lib/input/Input";
import {
  getErrorUploadSampleCSV,
  getLoadingUploadSampleCSV,
} from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleCSV/selectors";
import { submitPoolMapaSampleCSV } from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleCSV/actions";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

function UploadCSVModal({ visible, onCancel, loading, submitPoolMapaSampleCSV, mcr_id }) {
  const [dataUpload, setdataUpload] = useState();
  const [objectDataUpload, setobjectDataUpload] = useState([]);
  const [columns, setcolumns] = useState();
  const [uniqueColomn, setuniqueColomn] = useState();
  const [selectedDatas, setselectedDatas] = useState([]);

  const { project_id } = useParams();

  const remapColumns = (column) => {
    let newColumns = [];
    column.map((value, index) =>
      newColumns.push({ title: value, key: index, dataIndex: value, width: 150 })
    );
    console.log(newColumns);
    setcolumns(newColumns);
  };

  const onSave = async () => {
    const values = selectedDatas.map((item) => item[uniqueColomn]);
    const body = {
      jumlah_baris: objectDataUpload.length,
      uniq_column: `${uniqueColomn}`,
      values: values,
    };
    const error = await submitPoolMapaSampleCSV(project_id, mcr_id, dataUpload, body);
    console.log(error);
    if (!error) {
      message.success("Data Berhasil disimpan");
      onCancel();
    } else {
      message.error("Data Gagal Disimpan, ERROR: " + error);
    }
  };

  const onChangeSelect = (value) => {
    setuniqueColomn(value);
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
          <span className={"text-gray-700"}>Sample</span>
        </Typography.Title>,
      ]}
    >
      <div className="space-y-4">
        <Upload
          accept=".csv"
          beforeUpload={(file) => {
            setdataUpload(file);
            message.info("Pilih Unique Column untuk mengaktifkan checkbox pada tabel!");
            Papa.parse(file, {
              complete: (result) => {
                setobjectDataUpload(result.data);
                remapColumns(result.meta.fields);
              },
              header: true,
              skipEmptyLines: true,
            });
            return false;
          }}
          maxCount={1}
          onRemove={() => {
            setdataUpload();
            setobjectDataUpload([]);
            setcolumns();
            setuniqueColomn();
            setselectedDatas([]);
          }}
        >
          <Button type="primary">Browse</Button>
        </Upload>
        <div className="flex space-x-3">
          <p>Set Unique Colomn</p>
          <Select style={{ width: "100px" }} onChange={onChangeSelect}>
            {objectDataUpload.length !== 0 &&
              Object.keys(objectDataUpload[0]).map((value, index) => (
                <Select.Option key={index} value={value}>
                  {value}
                </Select.Option>
              ))}
          </Select>
        </div>
        {objectDataUpload.length === 0 && <Empty />}
        {columns && objectDataUpload && (
          <Table
            dataSource={objectDataUpload}
            columns={columns}
            pagination
            rowKey={uniqueColomn}
            scroll={{ x: 800, y: 500 }}
            rowSelection={
              uniqueColomn && {
                onSelect: (record, selected, selectedRows) => {
                  setselectedDatas(selectedRows);
                },
              }
            }
          />
        )}

        <div className="flex space-x-4 justify-end">
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
    loading: getLoadingUploadSampleCSV(state),
    error: getErrorUploadSampleCSV(state),
  };
};

const mapDispatchToProps = {
  submitPoolMapaSampleCSV: submitPoolMapaSampleCSV,
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadCSVModal);
