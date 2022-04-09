/* eslint-disable eqeqeq */
import { Button, Table, Spin, Modal, message, Space, Input } from "antd";
import React, { useEffect } from "react";
import { remapAnalizingMapa } from "../../../../utils/mapData";
import {
  EditOutlined,
  UserOutlined,
  AimOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { IoIosSend } from "react-icons/io";
import { useState } from "react";
import CreateAnalisaAktivitasModal from "./Modal/CreateAnalisaAktivitasModal";
import {
  getAnalyzingData,
  getAnalyzingError,
  getAnalyzingLoading,
  getNote,
} from "../../../../../store/ducks/EWP/Mapa/AnalisisPerencanaan/selectors";
import {
  fetchAnalyzing,
  setNote,
  submitApprovalAnalisa,
} from "../../../../../store/ducks/EWP/Mapa/AnalisisPerencanaan/actions";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserPN } from "../../../../../store/ducks/auth/selectors";
import { compose } from "redux";
import withMapaStatus from "../../../../../views/routes/hoc/withMapaStatus";
import { getPosisi } from "../../../../../store/ducks/EWP/Mapa/Dashboard/selectors";
import { CreateModalReasonApproval } from "./Modal/CreateModalReasonApproval";

function TreeTableComponent({
  moveToAnalisaRisk,
  loading,
  error,
  data,
  fetchAnalyzing,
  pn,
  posisi,
  submitApprovalAnalisa,
  dataComment,
  note,
  setNote,
}) {
  const [modalAAVisible, setmodalAAVisible] = useState(false);
  const [modalComment, setmodalComment] = useState({
    visible: false,
    params: {},
  });
  const [analisaAktivitasTemp, setanalisaAktivitasTemp] = useState({
    data: "",
    id: "",
  });
  const { project_id } = useParams();

  const showAAModal = (data, aktivitas_id) => {
    console.log(data + " " + aktivitas_id);
    setanalisaAktivitasTemp({ data: data, id: aktivitas_id });
    setmodalAAVisible(true);
  };
  const hideAAModal = () => {
    setmodalAAVisible(false);
    fetchAnalyzing(project_id);
  };

  useEffect(() => fetchAnalyzing(project_id), [fetchAnalyzing, project_id]);
  console.log(note);

  const showComments = (params) => {
    setmodalComment({ visible: true, params: params });
  };

  const sendApproval = async (body, status) => {
    Modal.confirm({
      title:
        status == "on ATA" ? (
          "Send Analisis?"
        ) : (
          <p className="pb-2 text-primary-red text-center border-b border-gray-500">
            Reject
          </p>
        ),
      icon: null,
      centered: true,
      content:
        status == "on ATA" ? (
          "Apa anda yakin ingin mengirim analisis?"
        ) : (
          <div className="mt-4">
            <Space direction="vertical" className="w-full">
              <p>Alasan Reject</p>
              <Input.TextArea
                rows={4}
                onChange={(e) => setNote(e.target.value)}
              />
            </Space>
          </div>
        ),
      cancelText: "No",
      okText: "Yes",
      onOk: async () => {
        const failed = await submitApprovalAnalisa(project_id, body);
        if (!failed) {
          message.success("Berhasil mengirim approval");
          fetchAnalyzing(project_id);
        } else {
          message.error(failed);
        }
      },
    });
  };

  console.log(pn);
  const columns = [
    {
      title: "Uker - PIC",
      dataIndex: "name",
      key: "ukerPIC",
      render: (_, record) => {
        if (record.level === 1) {
          return <p className="text-gray-700 text-xs">{record.name}</p>;
        } else if (record.level === 2 && record.analisa_aktivitas) {
          return (
            <span className="text-xs flex space-x-2">
              <p className="text-gray-700 w-36">{record.name}</p>
              <p className="text-primary-blue space-x-2">
                <UserOutlined />
                {record.pn_pic + " - " + record.pn_name}
              </p>
            </span>
          );
        } else if (record.level === 3 && record.analisa_risk) {
          return (
            <span className="text-xs flex space-x-2">
              <p className="text-gray-700 w-36">{record.name}</p>
              <p className="text-secondary-green space-x-2">
                <UserOutlined />
                {record.pn_pic + " - " + record.pn_name}
              </p>
            </span>
          );
        } else {
          return (
            <span className="text-xs flex space-x-2 text-gray-700">
              <p className="w-36">{record.name}</p>
              <UserOutlined />
              <p>{record.pn_pic + " - " + record.pn_name}</p>
            </span>
          );
        }
      },
    },
    {
      title: "Analisa Aktivitas",
      dataIndex: "analisa_aktivitas",
      key: "analisaAktivitas",
      render: (_, record) => {
        if (record.analisa_aktivitas) {
          return (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() =>
                showAAModal(
                  record.uraian_analisa,
                  record.mapa_uker_aktivitas_id
                )
              }
            />
          );
        } else {
          return;
        }
      },
    },
    {
      title: "Jumlah Risk",
      dataIndex: "jumlah_risk",
      key: "jumlahKey",
    },
    {
      title: "Analisa Risk",
      dataIndex: "analisa_risk",
      key: "analisaRisk",
      render: (_, record) => {
        if (record.analisa_risk) {
          return (
            <Button
              onClick={() =>
                moveToAnalisaRisk(
                  record.kode,
                  record.level,
                  record.mapa_uker_id,
                  record.mapa_uker_name
                )
              }
              type="primary"
              icon={<AimOutlined />}
            />
          );
        } else {
          return;
        }
      },
    },
    {
      title: "Status",
      dataIndex: "persetujuan_name",
      key: "status",
      render: (_, record) => {
        if (record.persetujuan_name === "on ATA") {
          return <p className="text-xs text-secondary-green">On ATA</p>;
        } else if (record.persetujuan_name === "on KTA") {
          return <p className="text-xs text-red-400">On KTA</p>;
        }
      },
    },
    {
      title: "Approval",
      dataIndex: "approval",
      key: "approval",
      render: (_, record) => {
        if (record.approval) {
          const body = {
            uker_id: record.mapa_uker_id,
            kode_aktivitas:
              record.level == 3 ? record.aktivitas_kode : record.kode,
            kode_subaktivitas: record.level == 3 ? record.kode : "",
          };
          return (
            <Button type="link">
              {posisi == "ata" ? (
                <IoIosSend
                  className="text-primary-blue text-xl cursor-pointer"
                  onClick={() => sendApproval(body, record.persetujuan_name)}
                />
              ) : (
                <IoIosSend
                  rotate={90}
                  className="text-red-500 text-xl cursor-pointer"
                  onClick={() => sendApproval(body, record.persetujuan_name)}
                />
              )}
            </Button>
          );
        }
      },
    },
    {
      title: "Comments",
      render: (_, record) => {
        if (record.level == 2) {
          return (
            <CommentOutlined
              className="cursor-pointer"
              onClick={() =>
                showComments({ aktivitas_id: record.mapa_uker_aktivitas_id })
              }
            />
          );
        } else if (record.level == 3) {
          return (
            <CommentOutlined
              className="cursor-pointer"
              onClick={() =>
                showComments({
                  subaktivitas_id: record.mapa_uker_pic_subaktivitas_id,
                })
              }
            />
          );
        }
      },
    },
  ];

  return (
    <>
      {loading && <Spin />}
      {!loading && error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          <CreateModalReasonApproval
            visible={modalComment.visible}
            onCancel={() => setmodalComment({ visible: false, params: {} })}
            params={modalComment.params}
          />
          <CreateAnalisaAktivitasModal
            visible={modalAAVisible}
            onCancel={hideAAModal}
            data={analisaAktivitasTemp}
          />
          <Table
            size="small"
            columns={columns}
            dataSource={remapAnalizingMapa(data, pn, posisi)}
            pagination={false}
          />
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: getAnalyzingLoading(state),
    error: getAnalyzingError(state),
    data: getAnalyzingData(state),
    pn: getUserPN(state),
    posisi: getPosisi(state),
    note: getNote(state),
  };
};

const mapDispachToProps = {
  fetchAnalyzing: fetchAnalyzing,
  submitApprovalAnalisa: submitApprovalAnalisa,
  setNote: setNote,
};

export default compose(
  withMapaStatus,
  connect(mapStateToProps, mapDispachToProps)
)(TreeTableComponent);
