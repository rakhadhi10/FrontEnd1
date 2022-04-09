import { connect } from "react-redux"
import { closeAssignModal, updateMCS } from "../../../../../store/ducks/RPMAuditee/actions"
import { getAssignMCS, getAssignModalOpen, getAssignLoading, getAssignUpdateLoading } from "../../../../../store/ducks/RPMAuditee/selectors"
import { ModalAssign } from "../../common/Modal/ModalAssign"

function ModalAssignAuditee(props) {
  return <ModalAssign {...props} type="auditee" />
}

const mapStateToProps = state => ({
  visible: getAssignModalOpen(state),
  initialValues: getAssignMCS(state),
  loading: getAssignLoading(state),
  updateLoading: getAssignUpdateLoading(state)
})

const mapDispatchToProps = {
  updateMCS: updateMCS,
  onCancel: closeAssignModal
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalAssignAuditee)