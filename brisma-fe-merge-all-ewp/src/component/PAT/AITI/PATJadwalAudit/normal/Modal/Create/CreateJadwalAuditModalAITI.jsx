import React from "react";
import { connect } from "react-redux";
import { getCreateModal, getCurrentStep } from "../../../../../../../store/ducks/PATAITIJadwalAudit/selectors";
import { closeCreateModal } from "../../../../../../../store/ducks/PATAITIJadwalAudit/actions";
import InfoKegiatan from "../common/InfoKegiatan";
import ObjekAudit from "../common/ObjekAudit";
import Anggaran from "./Anggaran";
import CreateJadwalAuditModalAITI from "../../../common/Modal/Create/CreateJadwalAuditModalAITI";

const steps = [
  {
    title: "Info Kegiatan",
    content: InfoKegiatan,
  },
  {
    title: "Objek Audit",
    content: ObjekAudit,
  },
  {
    title: "Anggaran",
    content: Anggaran,
  },
];

const CreateJadwalAuditModalAITINormal = (props) => <CreateJadwalAuditModalAITI {...props} />

const mapStateToProps = state => ({
  visible: getCreateModal(state),
  currentStep: getCurrentStep(state),
  steps: steps,
})

const mapDispatchToProps = {
  closeModal: closeCreateModal
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateJadwalAuditModalAITINormal)
