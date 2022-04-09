import { connect } from "react-redux";
import { closeEditModal, fetchAllJadwalAudit, goPrevStep, submitEditForm } from "../../../../../../../store/ducks/AddendumPATAIWJadwalAudit/actions";
import { getFormError, getFormLoading } from "../../../../../../../store/ducks/AddendumPATAIWJadwalAudit/selectors";
import Anggaran from "../common/Anggaran";

export function EditAnggaran(props) {
  return <Anggaran {...props} />
}

const mapDispatchToProps = {
  prev: goPrevStep,
  submitForm: submitEditForm,
  closeModal: closeEditModal,
  fetchAllJadwalAudit: fetchAllJadwalAudit
}

const mapStateToProps = state => ({
  loading: getFormLoading(state),
  error: getFormError(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Anggaran)
