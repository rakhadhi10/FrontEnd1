import { Button, Input, Modal, Space } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getPosisi } from "../../../../../store/ducks/EWP/Mapa/Dashboard/selectors";
import {
  fetchMapaDokumen,
  setReason,
  submitApprovalMapaDoc,
} from "../../../../../store/ducks/EWP/Mapa/Dokumen/actions";
import {
  getErrorApproval,
  getLoadingApproval,
} from "../../../../../store/ducks/EWP/Mapa/Dokumen/selectors";
import {
  createErrorNotification,
  createSuccessNotification,
} from "../../../../utils/notifications";

const showApprovalSuccessNotif = createSuccessNotification(
  "Approval",
  "Berhasil mengirim approval"
);
const showApprovalErrorNotif = createErrorNotification(
  "Approval",
  "Gagal mengirim approval"
);

const showRejectionSuccessNotif = createSuccessNotification(
  "Rejection",
  "Berhasil mengirim rejection"
);
const showRejectionErrorNotif = createErrorNotification(
  "Rejection",
  "Gagal mengirim rejection"
);

function MAActionButton({
  posisi,
  loading,
  error,
  submitApprovalMapaDoc,
  fetchMapaDoc,
  setnote,
}) {
  const { project_id } = useParams();

  const onSubmitApprove = () => {
    Modal.confirm({
      title: (
        <p className="pb-2 text-primary-green text-center border-b border-gray-500">
          Approve
        </p>
      ),
      icon: null,
      centered: true,
      content: (
        <div className="mt-4">
          <Space direction="vertical" className="w-full">
            <p>Alasan Approve</p>
            <Input.TextArea
              rows={4}
              onChange={(e) => setnote(e.target.value)}
            />
          </Space>
        </div>
      ),
      okText: "Yes",
      async onOk() {
        const body = { is_approved: true };
        const failed = await submitApprovalMapaDoc(project_id, body);
        if (!failed) {
          showApprovalSuccessNotif();
          fetchMapaDoc(project_id);
        } else {
          showApprovalErrorNotif();
        }
      },
      cancelText: "No",
      cancelButtonProps: { type: "danger" },
    });
  };

  const onSubmitReject = () => {
    Modal.confirm({
      title: (
        <p className="pb-2 text-primary-red text-center border-b border-gray-500">
          Reject
        </p>
      ),
      icon: null,
      centered: true,
      content: (
        <div className="mt-4">
          <Space direction="vertical" className="w-full">
            <p>Alasan Reject</p>
            <Input.TextArea
              rows={4}
              onChange={(e) => setnote(e.target.value)}
            />
          </Space>
        </div>
      ),
      okText: "Yes",
      async onOk() {
        const body = { is_approved: false };
        const failed = await submitApprovalMapaDoc(project_id, body);
        if (!failed) {
          showRejectionSuccessNotif();
          fetchMapaDoc(project_id);
        } else {
          showRejectionErrorNotif();
        }
      },
      cancelText: "No",
      cancelButtonProps: { type: "danger" },
    });
  };

  return (
    <div className="flex justify-between col-span-3">
      <Button type="secondary" disabled={!posisi} onClick={onSubmitReject}>
        Reject
      </Button>
      <Button type="primary" disabled={!posisi} onClick={onSubmitApprove}>
        Approve
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: getLoadingApproval(state),
    error: getErrorApproval(state),
    posisi: getPosisi(state) == "ma" || getPosisi(state) == "kai",
  };
};

const mapDispatchToProps = {
  submitApprovalMapaDoc: submitApprovalMapaDoc,
  fetchMapaDoc: fetchMapaDokumen,
  setnote: setReason,
};

export default connect(mapStateToProps, mapDispatchToProps)(MAActionButton);
