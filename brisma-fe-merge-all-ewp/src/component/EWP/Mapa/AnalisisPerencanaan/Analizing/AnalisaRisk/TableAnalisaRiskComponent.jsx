import { EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useState } from "react";
import { CreateProgramAuditAddModal } from "../Modal/CreateProgramAuditAddModal";
import { CreateKriteriaAuditAddModal } from "../Modal/CreateKriteriaAuditAddModal";
import { CreateMapaSampleModal } from "../Modal/CreateMapaSampleModal";

export default function TableAnalisaRiskComponent({
  dataAnalisa,
  uker_id,
  loading,
  updateAnalisaRisk,
  onCloseModal,
}) {
  const [paModalVisible, setpaModalVisible] = useState({
    visible: false,
    mcrKode: "",
    mapa_uker_id: "",
    data: "",
  });
  const [kaModalVisible, setkaModalVisible] = useState({
    visible: false,
    mcrKode: "",
    data: "",
  });
  const [msModalVisible, setmsModalVisible] = useState({
    visible: false,
    mcrKode: "",
  });
  const [selectedRisk, setselectedRisk] = useState([]);
  const [isUpdated, setisUpdated] = useState(false);

  const showPAModal = (mcrKode, data) =>
    setpaModalVisible({
      visible: true,
      mcrKode: mcrKode,
      data: data,
    });
  const closePAModal = () =>
    setpaModalVisible({ visible: false, mcrKode: "", data: "" });

  const showKAModal = (mcrKode, data) =>
    setkaModalVisible({ visible: true, mcrKode: mcrKode, data: data });
  const closeKAModal = () => {
    setkaModalVisible({ visible: false, mcrKode: "", data: "" });
    onCloseModal();
  };

  const showMSModal = (mcrKode) =>
    setmsModalVisible({ visible: true, mcrKode: mcrKode });
  const closeMSModal = () => {
    setmsModalVisible({ visible: false, mcrKode: "" });
    onCloseModal();
  };

  const expandedRowRender = (data) => {
    const columns = [
      {
        title: "Kode Risk Issue",
        dataIndex: "risk_issue_kode",
        key: "risk_issue_kode",
      },
      {
        title: "Nama Risk Issue",
        dataIndex: "risk_issue_name",
        key: "risk_issue_name",
      },
      {
        title: "Jumlah Sample",
        dataIndex: "sample_jumlah_sample",
        key: "sample_jumlah_sample",
      },
      {
        title: "Program Audit",
        dataIndex: "program_audit",
        key: "program",
        render: (_, record) => {
          if (record.is_selected) {
            return (
              <Button
                icon={<EditOutlined />}
                onClick={() =>
                  showPAModal(record.mapa_uker_mcr_id, record.program_audit)
                }
              />
            );
          } else {
            return;
          }
        },
      },
      {
        title: "Kriteria Audit",
        dataIndex: "kriteria",
        key: "kriteria",
        render: (_, record) => {
          if (record.is_selected) {
            return (
              <Button
                icon={<EditOutlined />}
                onClick={() =>
                  showKAModal(record.mapa_uker_mcr_id, record.kriteria_audit)
                }
              />
            );
          } else {
            return;
          }
        },
      },
      {
        title: "Set Sample",
        key: "sample",
        render: (_, record) => {
          if (record.is_selected) {
            return (
              <Button
                icon={<EditOutlined />}
                onClick={() => showMSModal(record.mapa_uker_mcr_id)}
              />
            );
          } else {
            return;
          }
        },
      },
    ];

    return (
      <Table
        key={data.kode}
        columns={columns}
        rowSelection={{
          getCheckboxProps: (record) => {
            if (record.is_selected && !isUpdated) {
              const index = selectedRisk.findIndex(
                (e) => e.ref_mcr_kode === record.kode
              );
              console.log(index);
              if (index === -1) {
                setselectedRisk((prev) => [
                  ...prev,
                  {
                    ref_sub_aktivitas_kode: data.sub_aktivitas.kode,
                    ref_sub_aktivitas_name: data.sub_aktivitas.nama,
                    ref_sub_major_kode: data.sub_major_proses.kode,
                    ref_sub_major_name: data.sub_major_proses.nama,
                    ref_manual_control_kode: data.kode,
                    ref_mcr_kode: record.kode,
                    ref_risk_issue_kode: record.risk_issue_kode,
                    ref_risk_issue_name: record.risk_issue_name,
                  },
                ]);
              }
            }
          },
          defaultSelectedRowKeys: data.manual_control_risks
            .filter((item) => item.is_selected)
            .map((item) => item.kode),
          onSelect: (record, selected, selectedRows) => {
            if (selected) {
              selectedRows.map((item) => {
                const index = selectedRisk.findIndex(
                  (e) => e.ref_mcr_kode === item.kode
                );
                console.log(index + item.kode);
                if (index === -1) {
                  setselectedRisk((prev) => [
                    ...prev,
                    {
                      ref_sub_aktivitas_kode: data.sub_aktivitas.kode,
                      ref_sub_aktivitas_name: data.sub_aktivitas.nama,
                      ref_sub_major_kode: data.sub_major_proses.kode,
                      ref_sub_major_name: data.sub_major_proses.nama,
                      ref_manual_control_kode: data.kode,
                      ref_mcr_kode: item.kode,
                      ref_risk_issue_kode: item.risk_issue_kode,
                      ref_risk_issue_name: item.risk_issue_name,
                    },
                  ]);
                }
              });
            } else {
              const index = selectedRisk.findIndex(
                (e) => e.ref_mcr_kode === record.kode
              );
              console.log(index);
              if (index > -1) {
                setselectedRisk(
                  selectedRisk.filter((e) => e.ref_mcr_kode !== record.kode)
                );
              }
            }
          },
        }}
        dataSource={data.manual_control_risks}
        pagination={false}
        rowKey="kode"
      />
    );
  };

  const columns = [
    {
      title: "Kode Submajor",
      dataIndex: "sub_major_proses",
      key: "kode",
      render: (_, record) => {
        if (record.sub_major_proses !== null) {
          return <p className="text-xs">{record.sub_major_proses.kode}</p>;
        } else {
          return;
        }
      },
    },
    {
      title: "Nama Submajor",
      dataIndex: "sub_major_proses",
      key: "nama",
      render: (_, record) => {
        if (record.sub_major_proses !== null) {
          return <p className="text-xs">{record.sub_major_proses.nama}</p>;
        } else {
          return;
        }
      },
    },
    { title: "> 2 Years NA", dataIndex: "over_2_years", key: "na" },
    { title: "Temuan Fraud", dataIndex: "temuan_fraud", key: "fraud" },
    { title: "Temuan Major", dataIndex: "temuan_major", key: "major" },
    { title: "Temuan Moderate", dataIndex: "temuan_moderate", key: "moderate" },
    { title: "Prioritas", dataIndex: "proritas", key: "prioritas" },
  ];

  return (
    <div className="space-y-4">
      <CreateProgramAuditAddModal
        visible={paModalVisible.visible}
        onCancel={closePAModal}
        mcrKode={paModalVisible.mcrKode}
        data={paModalVisible.data}
      />
      <CreateKriteriaAuditAddModal
        visible={kaModalVisible.visible}
        onCancel={closeKAModal}
        mcrKode={kaModalVisible.mcrKode}
        data={kaModalVisible.data}
      />
      {msModalVisible.visible && (
        <CreateMapaSampleModal
          visible={msModalVisible.visible}
          onCancel={closeMSModal}
          mcrKode={msModalVisible.mcrKode}
        />
      )}
      <div className="border border-primary-blue rounded">
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataAnalisa}
          expandable={{
            defaultExpandAllRows: true,
            expandedRowRender: (record) => expandedRowRender(record),
          }}
          pagination={false}
          rowKey="kode"
        />
      </div>
      <div className="flex justify-between">
        <Button type="primary" danger>
          Reset
        </Button>
        <Button
          type="primary"
          onClick={() => {
            const dataTemp = {
              mapa_uker_id: uker_id,
              manual_control_risks: selectedRisk,
            };
            updateAnalisaRisk(dataTemp);
            setisUpdated(true);
          }}
        >
          Simpan
        </Button>
      </div>
    </div>
  );
}
