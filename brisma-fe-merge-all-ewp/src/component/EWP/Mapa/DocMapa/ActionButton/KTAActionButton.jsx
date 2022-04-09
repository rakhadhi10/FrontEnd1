import { Button, message, Modal } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getPosisi } from "../../../../../store/ducks/EWP/Mapa/Dashboard/selectors";
import {
  fetchMapaDokumen,
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
import { CreateCatatanModal } from "./CreateCatatanModal";

const showSuccessNotif = createSuccessNotification(
  "Send Approval",
  "Berhasil mengirim approval"
);
const showErrorNotif = createErrorNotification(
  "Send Approval",
  "Gagal mengirim approval"
);
const showCatatanNotif = createErrorNotification(
  "Send Approval",
  "Gagal mengirim approval! Lengkapi MAPA terlebih dahulu!"
);

function KTAActionButton({
  posisi,
  loading,
  error,
  submitApprovalMapaDoc,
  fetchMapaDoc,
}) {
  const { project_id } = useParams();
  const [catatanModal, setcatatanModal] = useState(false);

  const onSubmit = () => {
    Modal.confirm({
      title: "Send Approval Mapa",
      content: "Apakah anda yakin ingin mengirim Mapa ini kepada MA?",
      onOk: async () => {
        const result = await submitApprovalMapaDoc(project_id);
        if (!result.error) {
          if (result.message === "failed to sent approval") {
            showCatatanNotif();
            setcatatanModal(true);
          } else {
            showSuccessNotif();
            fetchMapaDoc(project_id);
          }
        } else {
          showErrorNotif();
        }
      },
    });
  };

  return (
    <div className="flex justify-between col-span-3">
      {error && message.error(error)}
      <CreateCatatanModal
        handleCancel={() => setcatatanModal(false)}
        visible={catatanModal}
      />
      <Button type="secondary" disabled={!posisi}>
        Generate
      </Button>
      <Button
        type="primary"
        disabled={!posisi}
        onClick={onSubmit}
        loading={loading}
      >
        Send Approval
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: getLoadingApproval(state),
    error: getErrorApproval(state),
    posisi: getPosisi(state) == "kta",
  };
};

const mapDispatchToProps = {
  submitApprovalMapaDoc: submitApprovalMapaDoc,
  fetchMapaDoc: fetchMapaDokumen,
};

export default connect(mapStateToProps, mapDispatchToProps)(KTAActionButton);
