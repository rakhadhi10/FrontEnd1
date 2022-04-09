import { connect } from "react-redux";
import { closeCreateModal, fetchAllJadwalAudit, goPrevStep, submitForm } from "../../../../../../../store/ducks/PATAIKPJadwalAudit/actions";
import { getFormError, getFormLoading } from "../../../../../../../store/ducks/PATAIKPJadwalAudit/selectors";
import Anggaran from "../common/Anggaran";

export function CreateAnggaran(props) {
  return <Anggaran {...props} />
}

const mapDispatchToProps = {
  prev: goPrevStep,
  submitForm: submitForm,
  closeModal: closeCreateModal,
  fetchAllJadwalAudit: fetchAllJadwalAudit
}

const mapStateToProps = state => ({
  loading: getFormLoading(state),
  error: getFormError(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Anggaran)
