import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { CreateSetAuditorModal } from "../../../../../component/EWP/Mapa/Penugasan/CreateSetAuditorModal";
import { remapMapapenugasan } from "../../../../../component/utils/mapData";
import { fetchMapaPenugasan } from "../../../../../store/ducks/EWP/Mapa/Penugasan/actions";
import {
  getData,
  getError,
  getLoading,
} from "../../../../../store/ducks/EWP/Mapa/Penugasan/selectors";

function SetAuditorPenugasan({ data, loading, error, fetchMapaPenugasan }) {
  const [dataPenugasan, setdataPenugasan] = useState();
  const [modalVisible, setmodalVisible] = useState({ visible: false, mcr_id: "" });
  const [form] = Form.useForm();
  const { project_id } = useParams();

  useEffect(() => fetchMapaPenugasan(project_id), [project_id, fetchMapaPenugasan]);
  useEffect(() => setdataPenugasan(data), [data]);

  const showModal = (mcr_id) => setmodalVisible({ visible: true, mcr_id: mcr_id });
  const closeModal = () => {
    setmodalVisible({ visible: false, mcr_id: "" });
    fetchMapaPenugasan(project_id);
  };

  console.log(remapMapapenugasan(data));

  const columns = [
    { title: "Uker Risk", dataIndex: "ukerRisk", key: "ukerRisk" },
    { title: "Jumlah Sample", dataIndex: "sample_jumlah_sample", key: "sample_jumlah_sample" },
    { title: "Percentage", dataIndex: "sample_percentage", key: "sample_percentage" },
    {
      title: "Actions",
      dataIndex: "type",
      key: "actions",
      render: (text, record) =>
        record.type == "risk" ? (
          <Button icon={<EditOutlined />} onClick={() => showModal(record.mcr_id)} />
        ) : (
          ""
        ),
    },
  ];

  return (
    <div className="items-center space-y-4 bg-white p-10 mb-20">
      {modalVisible.visible ? (
        <CreateSetAuditorModal
          mcr_id={modalVisible.mcr_id}
          visible={modalVisible.visible}
          onCancel={closeModal}
          key={modalVisible.mcr_id}
        />
      ) : null}
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
            <Button type="primary">Filter</Button>
          </div>
        </div>
      </Form>
      {error && message.error("ERROR: " + error)}
      <Table
        columns={columns}
        dataSource={remapMapapenugasan(dataPenugasan)}
        pagination={false}
        loading={loading}
        expandable
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: getData(state),
    loading: getLoading(state),
    error: getError(state),
  };
};

const mapDispatchToProps = {
  fetchMapaPenugasan: fetchMapaPenugasan,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetAuditorPenugasan);
