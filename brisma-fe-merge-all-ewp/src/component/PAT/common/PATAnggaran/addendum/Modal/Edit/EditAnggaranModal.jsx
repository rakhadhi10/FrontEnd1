import { connect } from "react-redux";
import { closeEditModal } from "../../../../../../../store/ducks/AddendumPATAnggaran/actions";
import { getEditModal, getCurrentStep } from "../../../../../../../store/ducks/AddendumPATAnggaran/selectors";
import InfoKegiatan from "../common/InfoKegiatan";
import Tim from "../common/Tim";
import Anggaran from "./Anggaran";
import EditAnggaranModal from "../../../common/Modal/Edit/EditAnggaranModal";

const steps = [
  {
    title: "Info Kegiatan",
    content: InfoKegiatan,
  },
  {
    title: "Buat Tim",
    content: Tim,
  },
  {
    title: "Anggaran",
    content: Anggaran,
  },
];

function EditAnggaranModalNormal(props) {
  return <EditAnggaranModal {...props} />
}

const mapStateToProps = state => ({
  visible: getEditModal(state),
  currentStep: getCurrentStep(state),
  steps: steps
})

const mapDispatchToProps = {
  handleCancel: closeEditModal
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAnggaranModalNormal)
