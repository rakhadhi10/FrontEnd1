import { connect } from "react-redux";
import { closeEditModal } from "../../../../../../../store/ducks/AddendumPATJadwalSBP/actions";
import { getCurrentStep, getEditModal } from "../../../../../../../store/ducks/AddendumPATJadwalSBP/selectors";
import EditSbpModal from "../../../common/Modal/Edit/EditSbpModal";
import InfoKegiatan from "../common/InfoKegiatan";
import TimSbp from "../common/TimSbp";
import Anggaran from "./Anggaran";

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

export function EditSbpModalNormal(props) {
  return <EditSbpModal {...props} />
}

const mapStateToProps = state => ({
  visible: getEditModal(state),
  currentStep: getCurrentStep(state),
  steps: steps
})
const mapDispatchToProps = {
  handleCancel: closeEditModal
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSbpModalNormal)
