import React from "react";
import { connect } from "react-redux";
import { getCurrentStep, getEditModal } from "../../../../../../../store/ducks/PATAIKPJadwalAudit/selectors";
import { closeEditModal } from "../../../../../../../store/ducks/PATAIKPJadwalAudit/actions";
import InfoKegiatan from "../common/InfoKegiatan";
import ObjekAudit from "../common/ObjekAudit";
import Anggaran from "./Anggaran";
import EditJadwalAuditModalAIKP from "../../../common/Modal/Edit/EditJadwalAuditModalAIKP";

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

const EditJadwalAuditModalAIKPNormal = (props) => <EditJadwalAuditModalAIKP {...props} />

const mapStateToProps = state => ({
  visible: getEditModal(state),
  currentStep: getCurrentStep(state),
  steps: steps
})

const mapDispatchToProps = {
  onCancel: closeEditModal
}

export default connect(mapStateToProps, mapDispatchToProps)(EditJadwalAuditModalAIKPNormal)