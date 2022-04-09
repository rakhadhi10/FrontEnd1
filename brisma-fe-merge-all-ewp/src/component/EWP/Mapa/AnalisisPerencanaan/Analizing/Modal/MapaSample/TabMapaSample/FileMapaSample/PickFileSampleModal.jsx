import { DeleteOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Modal, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUserPN } from "../../../../../../../../../store/ducks/auth/selectors";
import {
  fetchPoolSampleFile,
  removePoolSampleFile,
  submitSaveMapaSampleFile,
} from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleFile/actions";
import {
  getDataPoolSampleFILE,
  getErrorDeletePoolSampleFILE,
  getErrorPoolSampleFILE,
  getErrorSaveSampleMapaFILE,
  getLoadingDeletePoolSampleFILE,
  getLoadingPoolSampleFILE,
  getLoadingSaveSampleMapaFILE,
} from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleFile/selectors";

function PickFileSampleModal({
  visible,
  onCancel,
  mcr_id,
  data,
  loading,
  error,
  loadingDelete,
  errorDelete,
  loadingSubmit,
  errorSubmit,
  fetchPoolSampleFile,
  submitSaveMapaSampleFile,
  removePoolSampleFile,
  pn,
}) {
  const [form] = Form.useForm();
  const [dataSampleFile, setdataSampleFile] = useState();
  const [selectedDatas, setselectedDatas] = useState([]);

  useEffect(() => fetchPoolSampleFile(mcr_id), [mcr_id]);
  useEffect(() => setdataSampleFile(data), [data]);

  const columns = [
    { title: "Nama File", dataIndex: "filename", key: 1 },
    { title: "Original Uploader", dataIndex: "name_uploader", key: 2 },
    {
      title: "Original Risk Issue",
      key: 3,
      render: (record) =>
        record.original_mapa_uker_mcr ? record.original_mapa_uker_mcr.ref_risk_issue_kode : " - ",
    },
    {
      title: "Original Sub Aktivitas",
      key: 4,
      render: (record) =>
        record.original_mapa_uker_mcr
          ? record.original_mapa_uker_mcr.ref_sub_aktivitas_name
          : " - ",
    },
    {
      title: "Original Aktivitas",
      key: 5,
      render: (record) =>
        record.original_mapa_uker_mcr ? record.original_mapa_uker_mcr.ref_aktivitas_name : " - ",
    },
    {
      title: "Action",
      key: 6,
      render: (_, record) => (
        <div className="space-x-2">
          <Button type="link">Download</Button>
          {record.pn_uploader == pn && (
            <Button
              type="text"
              icon={<DeleteOutlined />}
              danger
              onClick={() => onDelete(record.id)}
            />
          )}
        </div>
      ),
    },
  ];

  const rowSelection = {
    renderCell: (value, record, index, originNode) => {
      const exist = dataSampleFile.existingSample.findIndex(
        (item) => item.objek_sample_id == record.id
      );
      if (exist > -1) {
        return;
      } else {
        return originNode;
      }
    },
    onSelect: (record, selected, selectedRows) => {
      let dataTemp = [];
      selectedRows.map((item) =>
        dataTemp.push({
          value: item.filename,
          objek_sample_id: item.id,
          pn_auditor: null,
          name_auditor: null,
        })
      );
      setselectedDatas(dataTemp);
    },
  };

  const columns2 = [
    {
      key: 1,
      title: "Pengguna",
      render: (record) =>
        record.pn_auditor == null ? " - " : record.pn_auditor + " - " + record.name_auditor,
    },
    { title: "Risk Issue", key: 3, render: (record) => record.mapa_uker_mcr.ref_risk_issue_kode },
    {
      title: "Sub Aktivitas",
      key: 4,
      render: (record) => record.mapa_uker_mcr.ref_sub_aktivitas_name,
    },
    { title: "Aktivitas", key: 5, render: (record) => record.mapa_uker_mcr.ref_aktivitas_name },
  ];

  const onDelete = (id) => {
    Modal.confirm({
      title: "Apakah anda yakin ingin menghapus data ini?",
      okType: "danger",
      onOk: async () => {
        const status = await removePoolSampleFile(id);
        if (!status.error) {
          message.success("Berhasil Menghapus Pool Sample File!");
          fetchPoolSampleFile(mcr_id);
        } else {
          console.log(status);
          Modal.error({
            width: 1000,
            title: status.error,
            content: (
              <div className="space-y-2">
                <div className="bg-primary-yellow bg-opacity-20 p-6 rounded text-xl">
                  Data {status.data.pool_sample_name} digunakan pada:
                </div>
                <p>Histories</p>
                <Table columns={columns2} dataSource={status.data.histories} />
              </div>
            ),
          });
        }
      },
      onCancel() {},
    });
  };

  const onSave = async () => {
    const body = selectedDatas;
    const failed = await submitSaveMapaSampleFile(mcr_id, body);
    if (!failed) {
      message.success("Data Berhasil disimpan!");
      fetchPoolSampleFile(mcr_id);
    } else {
      message.error(errorSubmit);
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
      destroyOnClose
      title={[
        <Typography.Title level={2} className="text-left">
          <span className={"text-gray-700"}>Pick Sample File</span>
        </Typography.Title>,
      ]}
    >
      <div className="space-y-4">
        <Form form={form}>
          <div className="border rounded grid grid-cols-2 p-4">
            <div>
              <div className="flex space-x-4">
                <p className="w-1/3">Nama File</p>
                <Form.Item name="nama_file" className="w-2/3">
                  <Input />
                </Form.Item>
              </div>
              <div className="flex space-x-4">
                <p className="w-1/3">Uploader</p>
                <Form.Item name="uploader" className="w-2/3">
                  <Input />
                </Form.Item>
              </div>
              <div className="flex space-x-4">
                <p className="w-1/3">Original Risk</p>
                <Form.Item name="original_risk" className="w-2/3">
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="flex justify-end items-end">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Filter
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
        <div className="border rounded">
          {error && message.error(error)}
          <Table
            dataSource={dataSampleFile ? dataSampleFile.filePoolList : []}
            columns={columns}
            loading={loading || loadingDelete}
            rowSelection={rowSelection}
            rowKey="id"
          />
        </div>
        <div className="flex space-x-4 justify-end">
          <Button type="primary" onClick={onSave} loading={loadingSubmit}>
            Save Selected
          </Button>
        </div>
      </div>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    data: getDataPoolSampleFILE(state),
    loading: getLoadingPoolSampleFILE(state),
    error: getErrorPoolSampleFILE(state),
    loadingSubmit: getLoadingSaveSampleMapaFILE(state),
    errorSubmit: getErrorSaveSampleMapaFILE(state),
    loadingDelete: getLoadingDeletePoolSampleFILE(state),
    errorDelete: getErrorDeletePoolSampleFILE(state),
    pn: getUserPN(state),
  };
};

const mapDispatchToProps = {
  fetchPoolSampleFile: fetchPoolSampleFile,
  removePoolSampleFile: removePoolSampleFile,
  submitSaveMapaSampleFile: submitSaveMapaSampleFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(PickFileSampleModal);
