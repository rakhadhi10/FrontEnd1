import { Button, Form, Input, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSummaryMapaPenugasan } from "../../../../../store/ducks/EWP/Mapa/Penugasan/actions";
import {
  getDataSummary,
  getErrorSummary,
  getLoadingSummary,
} from "../../../../../store/ducks/EWP/Mapa/Penugasan/selectors";

function SummaryPenugasan({ data, loading, error, fetchSummaryMapaPenugasan }) {
  const [dataSummaryPenugasan, setdataSummaryPenugasan] = useState([]);
  const { project_id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => fetchSummaryMapaPenugasan(project_id), [fetchSummaryMapaPenugasan, project_id]);
  useEffect(() => setdataSummaryPenugasan(data), [data]);

  const columns = [
    {
      title: "Auditor",
      key: "auditor",
      render: (_, record) => record.pn_auditor + " - " + record.name_auditor,
    },
    { title: "Kode Uker", dataIndex: "kode_uker", key: "kode_uker" },
    { title: "Nama Uker", dataIndex: "nama_uker", key: "nama_uker" },
    { title: "Aktivitas", dataIndex: "name_aktivitas", key: "name_aktivitas" },
    { title: "Sub Aktivitas", dataIndex: "name_subaktivitas", key: "name_subaktivitas" },
    { title: "Sub Major", dataIndex: "name_submajor", key: "name_submajor" },
    { title: "Risk Issue", dataIndex: "name_risk_issue", key: "name_risk_issue" },
    { title: "Jumlah Sample", dataIndex: "sample_jumlah_sample", key: "sample_jumlah_sample" },
    { title: "Percentage", dataIndex: "sample_percentage", key: "sample_percentage" },
  ];

  return (
    <div className="items-center space-y-4 bg-white p-10 mb-20">
      <Form form={form}>
        <div className="border rounded grid grid-cols-12 gap-4 p-4">
          <div className="col-span-5">
            <div className="flex space-x-4">
              <p className="w-1/3">Kode Uker</p>
              <Form.Item name="id" className="w-2/3">
                <Input />
              </Form.Item>
            </div>
            <div className="flex space-x-4">
              <p className="w-1/3">Nama Uker</p>
              <Form.Item name="nama" className="w-2/3">
                <Input />
              </Form.Item>
            </div>
            <div className="flex space-x-4">
              <p className="w-1/3">Orgeh</p>
              <Form.Item name="orgeh" className="w-2/3">
                <Input />
              </Form.Item>
            </div>
            <div className="flex space-x-4">
              <p className="w-1/3">Aktivitas</p>
              <Form.Item name="aktivitas" className="w-2/3">
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="col-span-5">
            <div className="flex space-x-4">
              <p className="w-1/3">Sub Aktivitas</p>
              <Form.Item name="sub_aktivitas" className="w-2/3">
                <Input />
              </Form.Item>
            </div>
            <div className="flex space-x-4">
              <p className="w-1/3">Sub Major</p>
              <Form.Item name="sub_major" className="w-2/3">
                <Input />
              </Form.Item>
            </div>
            <div className="flex space-x-4">
              <p className="w-1/3">Risk Issue</p>
              <Form.Item name="risk" className="w-2/3">
                <Input />
              </Form.Item>
            </div>
            <div className="flex space-x-4">
              <p className="w-1/3">Auditor</p>
              <Form.Item name="auditor" className="w-2/3">
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="flex justify-end items-end col-span-2">
            <Button type="primary">Filter</Button>
          </div>
        </div>
      </Form>
      {error && message.error(error)}
      <Table
        columns={columns}
        dataSource={dataSummaryPenugasan}
        loading={loading}
        size="small"
        pagination={{ hideOnSinglePage: true }}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: getDataSummary(state),
    loading: getLoadingSummary(state),
    error: getErrorSummary(state),
  };
};

const mapDispatchToProps = {
  fetchSummaryMapaPenugasan: fetchSummaryMapaPenugasan,
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPenugasan);
