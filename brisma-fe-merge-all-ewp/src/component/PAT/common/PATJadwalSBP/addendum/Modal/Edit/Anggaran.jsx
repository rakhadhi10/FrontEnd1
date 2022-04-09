import { connect } from "react-redux";
import { closeEditModal, fetchAllSbp, goPrevStep, submitEditForm } from "../../../../../../../store/ducks/AddendumPATJadwalSBP/actions";
import { getFormError, getFormLoading } from "../../../../../../../store/ducks/AddendumPATJadwalSBP/selectors";
import Anggaran from "../common/Anggaran";

export function CreateAnggaran(props) {
  return <Anggaran {...props} />
}

const mapDispatchToProps = {
  prev: goPrevStep,
  submitForm: submitEditForm,
  closeModal: closeEditModal,
  fetchAllJadwalAudit: fetchAllSbp
}

const mapStateToProps = state => ({
  loading: getFormLoading(state),
  error: getFormError(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Anggaran)
