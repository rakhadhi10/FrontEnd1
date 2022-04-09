import React, { useState, useEffect } from "react";
import { Button, Form, Input, message, Table } from "antd";
import {
  getDataSummary,
  getErrorSummary,
  getLoadingSummary,
} from "../../../../../store/ducks/EWP/Mapa/AnalisisPerencanaan/selectors";
import { fetchMapaAnalizingSummary } from "../../../../../store/ducks/EWP/Mapa/AnalisisPerencanaan/actions";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

function Step3({ data, loading, error, fetchMapaAnalizingSummary }) {
  const [form] = Form.useForm();
  const [dataSummary, setdataSummary] = useState([]);
  const { project_id } = useParams();

  useEffect(
    () => fetchMapaAnalizingSummary(project_id, {}),
    [project_id, fetchMapaAnalizingSummary]
  );

  useEffect(() => setdataSummary(data), [data]);

  const columnsSumarry = [
    {
      title: "Kode Uker",
      dataIndex: "ref_auditee_branch_kode",
      key: "kodeuker",
    },
    {
      title: "Nama Uker",
      dataIndex: "ref_auditee_branch_name",
      key: "sample",
    },
    {
      title: "Aktivitas",
      dataIndex: "mtd_aktivitas_name",
      key: "aktivitas",
    },
    {
      title: "Sub Aktivitas",
      dataIndex: "mtd_sub_aktivitas_name",
      key: "sub_aktivitas",
    },
    {
      title: "Sub Major",
      dataIndex: "ref_sub_major_name",
      key: "sub_major",
    },
    {
      title: "Risk Issue",
      dataIndex: "ref_risk_issue_name",
      key: "risk_issue",
    },
    {
      title: "Jumlah Sample",
      dataIndex: "sample_jumlah_sample",
      key: "jumlah_sample",
    },
  ];

  const makeID = () => {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      return result;
    }
  };

  const handleFilter = async () => {
    await fetchMapaAnalizingSummary(project_id, form.getFieldsValue());
  };

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
          </div>
          <div className="flex justify-end items-end col-span-2">
            <Button type="primary" onClick={handleFilter}>
              Filter
            </Button>
          </div>
        </div>
      </Form>
      {error && message.error("ERROR: " + error)}
      <Table
        className="border border-primary-blue"
        columns={columnsSumarry}
        dataSource={dataSummary}
        rowKey={makeID}
        loading={loading}
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
  fetchMapaAnalizingSummary: fetchMapaAnalizingSummary,
};

export default connect(mapStateToProps, mapDispatchToProps)(Step3);
