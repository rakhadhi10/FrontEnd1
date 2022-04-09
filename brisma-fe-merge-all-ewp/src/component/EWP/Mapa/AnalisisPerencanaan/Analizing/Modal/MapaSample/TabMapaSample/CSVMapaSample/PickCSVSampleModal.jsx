import { Button, Form, Input, message, Modal, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import {
  getDataDeleteMapaSampleCSV,
  getDataPoolSampleCSV,
  getErrorDeletePoolSampleCSV,
  getErrorPoolSampleCSV,
  getLoadingDeletePoolSampleCSV,
  getLoadingPoolSampleCSV,
} from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleCSV/selectors";
import {
  fetchPoolSampleCSV,
  removePoolSampleCSV,
} from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleCSV/actions";
import { connect } from "react-redux";
import { getUserPN } from "../../../../../../../../../store/ducks/auth/selectors";
import DetailPickSampleCSVModal from "./DetailPickSampleCSVModal";

function PickCSVSampleModal({
  visible,
  onCancel,
  pn,
  data,
  loading,
  error,
  loadingDelete,
  errorDelete,
  fetchPoolSampleCSV,
  removePoolSampleCSV,
  mcr_id,
}) {
  const [form] = Form.useForm();
  const [modalPickData, setmodalPickData] = useState({
    visible: false,
    csv_pool_id: "",
  });

  const openModal = (csv_pool_id) =>
    setmodalPickData({
      visible: true,
      csv_pool_id: csv_pool_id,
    });

  const closeModal = () =>
    setmodalPickData({
      visible: false,
      csv_pool_id: "",
    });

  useEffect(() => fetchPoolSampleCSV(), [fetchPoolSampleCSV]);

  const columns2 = [
    {
      key: 1,
      title: "Pengguna",
      render: (record) =>
        record.pn_auditor == null
          ? " - "
          : record.pn_auditor + " - " + record.name_auditor,
    },
    {
      title: "Risk Issue",
      key: 3,
      render: (record) => record.mapa_uker_mcr.ref_risk_issue_kode,
    },
    {
      title: "Sub Aktivitas",
      key: 4,
      render: (record) => record.mapa_uker_mcr.ref_sub_aktivitas_name,
    },
    {
      title: "Aktivitas",
      key: 5,
      render: (record) => record.mapa_uker_mcr.ref_aktivitas_name,
    },
  ];

  const onDelete = (id) => {
    Modal.confirm({
      title: "Apakah anda yakin ingin menghapus data ini?",
      okType: "danger",
      onOk: async () => {
        const status = await removePoolSampleCSV(id);
        if (!status.error) {
          message.success("Berhasil Menghapus Pool Sample CSV!");
          fetchPoolSampleCSV();
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

  const columns = [
    { title: "Nama File", dataIndex: "filename", key: 1 },
    { title: "Original Uploader", dataIndex: "name_uploader", key: 2 },
    {
      title: "Original Risk Issue",
      key: 3,
      dataIndex: "original_risk_issue_kode",
    },
    {
      title: "Original Sub Aktivitas",
      key: 4,
      dataIndex: "original_sub_aktivitas_name",
    },
    {
      title: "Original Aktivitas",
      key: 5,
      dataIndex: "original_aktivitas_name",
    },
    {
      title: "Action",
      key: 6,
      render: (_, record) => (
        <div className="space-x-2">
          <Button type="link" onClick={() => openModal(record.id)}>
            Open
          </Button>
          {record.pn_uploader === pn && (
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
        <Typography.Title level={2} className="text-left">
          <span className={"text-gray-700"}>Pick Sample</span>
        </Typography.Title>,
      ]}
    >
      {modalPickData.visible && (
        <DetailPickSampleCSVModal
          mcr_id={mcr_id}
          visible={modalPickData.visible}
          csv_pool_id={modalPickData.csv_pool_id}
          onCancel={closeModal}
        />
      )}

      <div className="space-y-4">
        <p>Filter</p>
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
        <p>Pool Sample</p>
        {error && message.error("Error: " + error)}
        <div className="border rounded">
          <Table
            dataSource={data ? data : []}
            columns={columns}
            loading={loading || loadingDelete}
          />
        </div>
      </div>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    data: getDataPoolSampleCSV(state),
    loading: getLoadingPoolSampleCSV(state),
    error: getErrorPoolSampleCSV(state),
    loadingDelete: getLoadingDeletePoolSampleCSV(state),
    errorDelete: getErrorDeletePoolSampleCSV(state),
    pn: getUserPN(state),
  };
};

const mapDispatchToProps = {
  fetchPoolSampleCSV: fetchPoolSampleCSV,
  removePoolSampleCSV: removePoolSampleCSV,
};

export default connect(mapStateToProps, mapDispatchToProps)(PickCSVSampleModal);
