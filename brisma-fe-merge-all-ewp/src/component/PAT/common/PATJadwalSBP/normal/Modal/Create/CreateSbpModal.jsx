import { connect } from "react-redux";
import { closeCreateModal } from "../../../../../../../store/ducks/PATJadwalSBP/actions";
import { getCreateModal, getCurrentStep } from "../../../../../../../store/ducks/PATJadwalSBP/selectors";
import InfoKegiatan from "../common/InfoKegiatan";
import TimSbp from "../common/TimSbp";
import Anggaran from "./Anggaran";
import CreateSbpModal from "../../../common/Modal/Create/CreateSbpModal";

const steps = [
  {
    title: "Info Kegiatan",
    content: InfoKegiatan,
  },
  {
    title: "Tim Consulting",
    content: TimSbp,
  },
  {
    title: "Anggaran",
    content: Anggaran,
  },
];

export function CreateSbpModalNormal(props) {
  return <CreateSbpModal {...props} />
}

const mapStateToProps = state => ({
  visible: getCreateModal(state),
  currentStep: getCurrentStep(state),
  steps: steps
})
const mapDispatchToProps = {
  handleCancel: closeCreateModal
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSbpModalNormal)
