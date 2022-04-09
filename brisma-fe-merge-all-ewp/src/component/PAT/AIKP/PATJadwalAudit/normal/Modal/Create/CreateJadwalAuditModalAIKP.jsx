import React from "react";
import { connect } from "react-redux";
import { getCreateModal, getCurrentStep } from "../../../../../../../store/ducks/PATAIKPJadwalAudit/selectors";
import { closeCreateModal } from "../../../../../../../store/ducks/PATAIKPJadwalAudit/actions";
import InfoKegiatan from "../common/InfoKegiatan";
import ObjekAudit from "../common/ObjekAudit";
import Anggaran from "./Anggaran";
import CreateJadwalAuditModalAIKP from "../../../common/Modal/Create/CreateJadwalAuditModalAIKP";

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

const CreateJadwalAuditModalAIKPNormal = (props) => <CreateJadwalAuditModalAIKP {...props} />

const mapStateToProps = state => ({
  visible: getCreateModal(state),
  currentStep: getCurrentStep(state),
  steps: steps
})

const mapDispatchToProps = {
  onCancel: closeCreateModal
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateJadwalAuditModalAIKPNormal)