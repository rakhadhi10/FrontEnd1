import { connect } from "react-redux";
import { closeCreateModal, fetchAnggaran, goPrevStep, submitForm } from "../../../../../../../store/ducks/AddendumPATAnggaran/actions";
import { getEditFormError, getFormLoading } from "../../../../../../../store/ducks/AddendumPATAnggaran/selectors";
import Anggaran from "../common/Anggaran";

export function CreateAnggaran(props) {
  return <Anggaran {...props} />
}

const mapDispatchToProps = {
  prev: goPrevStep,
  submitForm: submitForm,
  closeModal: closeCreateModal,
  fetchAllJadwalAudit: fetchAnggaran
}

const mapStateToProps = state => ({
  loading: getFormLoading(state),
  error: getEditFormError(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Anggaran)
