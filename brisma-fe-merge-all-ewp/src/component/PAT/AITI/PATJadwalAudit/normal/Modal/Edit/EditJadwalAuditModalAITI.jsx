import React from "react";
import { connect } from "react-redux";
import { getCurrentStep, getEditModal } from "../../../../../../../store/ducks/PATAITIJadwalAudit/selectors";
import { closeEditModal } from "../../../../../../../store/ducks/PATAITIJadwalAudit/actions";
import InfoKegiatan from "../common/InfoKegiatan";
import ObjekAudit from "../common/ObjekAudit";
import Anggaran from "./Anggaran";
import EditJadwalAuditModalAITI from "../../../common/Modal/Edit/EditJadwalAuditModalAITI";

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

const EditJadwalAuditModalAITINormal = (props) => <EditJadwalAuditModalAITI {...props} />

const mapStateToProps = state => ({
  visible: getEditModal(state),
  currentStep: getCurrentStep(state),
  steps: steps
})

const mapDispatchToProps = {
  closeModal: closeEditModal
}

export default connect(mapStateToProps, mapDispatchToProps)(EditJadwalAuditModalAITINormal)
