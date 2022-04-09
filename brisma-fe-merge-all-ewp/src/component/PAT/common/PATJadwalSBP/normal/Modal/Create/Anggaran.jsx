import { connect } from "react-redux";
import { closeCreateModal, fetchAllSbp, goPrevStep, submitForm } from "../../../../../../../store/ducks/PATJadwalSBP/actions";
import { getFormError, getFormLoading } from "../../../../../../../store/ducks/PATJadwalSBP/selectors";
import Anggaran from "../common/Anggaran";

export function CreateAnggaran(props) {
  return <Anggaran {...props} />
}

const mapDispatchToProps = {
  prev: goPrevStep,
  submitForm: submitForm,
  closeModal: closeCreateModal,
  fetchAllJadwalAudit: fetchAllSbp
}

const mapStateToProps = state => ({
  loading: getFormLoading(state),
  error: getFormError(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Anggaran)
