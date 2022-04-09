import React from "react";
import { connect } from "react-redux";
import { getCreateModal, getCurrentStep } from "../../../../../../../store/ducks/PATAIWJadwalAudit/selectors";
import { closeCreateModal } from "../../../../../../../store/ducks/PATAIWJadwalAudit/actions";
import InfoKegiatan from "../common/InfoKegiatan";
import ObjekAudit from "../common/ObjekAudit";
import Anggaran from "./Anggaran";
import CreateJadwalAuditModal from "../../../common/Modal/Create/CreateJadwalAuditModal";

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

const CreateJadwalAuditModalNormal = (props) => <CreateJadwalAuditModal {...props} />

const mapStateToProps = state => ({
  visible: getCreateModal(state),
  currentStep: getCurrentStep(state),
  steps: steps
})

const mapDispatchToProps = {
  onCancel: closeCreateModal
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateJadwalAuditModalNormal)
