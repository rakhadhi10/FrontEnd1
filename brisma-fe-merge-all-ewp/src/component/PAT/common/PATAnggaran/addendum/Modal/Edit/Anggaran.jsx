import { connect } from "react-redux";
import { closeEditModal, fetchAnggaran, goPrevStep, submitEditForm } from "../../../../../../../store/ducks/AddendumPATAnggaran/actions";
import { getEditFormError, getEditFormLoading } from "../../../../../../../store/ducks/AddendumPATAnggaran/selectors";
import Anggaran from "../common/Anggaran";

export function CreateAnggaran(props) {
  return <Anggaran {...props} />
}

const mapDispatchToProps = {
  prev: goPrevStep,
  submitForm: submitEditForm,
  closeModal: closeEditModal,
  fetchAllJadwalAudit: fetchAnggaran
}

const mapStateToProps = state => ({
  loading: getEditFormLoading(state),
  error: getEditFormError(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Anggaran)
