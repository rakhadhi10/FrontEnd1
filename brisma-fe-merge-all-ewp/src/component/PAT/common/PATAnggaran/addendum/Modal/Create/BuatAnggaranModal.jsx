import { connect } from "react-redux";
import { closeCreateModal } from "../../../../../../../store/ducks/AddendumPATAnggaran/actions";
import { getCreateModal, getCurrentStep } from "../../../../../../../store/ducks/AddendumPATAnggaran/selectors";
import BuatAnggaranModal from "../../../common/Modal/Create/BuatAnggaranModal";
import InfoKegiatan from "../common/InfoKegiatan";
import Tim from "../common/Tim";
import Anggaran from "./Anggaran";

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

export function BuatAnggaranModalNormal(props) {
  return <BuatAnggaranModal {...props} />
}

const mapStateToProps = state => ({
  visible: getCreateModal(state),
  currentStep: getCurrentStep(state),
  steps: steps
})

const mapDispatchToProps = {
  handleCancel: closeCreateModal
}

export default connect(mapStateToProps, mapDispatchToProps)(BuatAnggaranModalNormal)
