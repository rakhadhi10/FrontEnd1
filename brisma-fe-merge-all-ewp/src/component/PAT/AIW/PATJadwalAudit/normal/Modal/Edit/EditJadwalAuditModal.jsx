import React from "react";
import { connect } from "react-redux";
import { getCurrentStep, getEditModal } from "../../../../../../../store/ducks/PATAIWJadwalAudit/selectors";
import { closeEditModal } from "../../../../../../../store/ducks/PATAIWJadwalAudit/actions";
import InfoKegiatan from "../common/InfoKegiatan";
import ObjekAudit from "../common/ObjekAudit";
import Anggaran from "./Anggaran";
import EditJadwalAuditModal from "../../../common/Modal/Edit/EditJadwalAuditModal";

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

const EditJadwalAuditModalNormal = (props) => <EditJadwalAuditModal {...props} />

const mapStateToProps = state => ({
  visible: getEditModal(state),
  currentStep: getCurrentStep(state),
  steps: steps,
})

const mapDispatchToProps = {
  onCancel: closeEditModal
}

export default connect(mapStateToProps, mapDispatchToProps)(EditJadwalAuditModalNormal)
