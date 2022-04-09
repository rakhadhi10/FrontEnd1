import { connect } from "react-redux"
import { closeAssignModal, updateMCS } from "../../../../../store/ducks/RPMAuditor/actions"
import { getAssignMCS, getAssignModalOpen, getAssignLoading, getAssignUpdateLoading } from "../../../../../store/ducks/RPMAuditor/selectors"
import { ModalAssign } from "../../common/Modal/ModalAssign"

function ModalAssignAuditor(props) {
  return <ModalAssign {...props} type="auditor" />
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalAssignAuditor)