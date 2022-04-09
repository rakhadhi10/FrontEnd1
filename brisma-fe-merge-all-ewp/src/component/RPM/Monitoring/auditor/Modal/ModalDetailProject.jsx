import { connect } from "react-redux";
import ModalDetailProject from "../../common/Modal/ModalDetailProject";
import { closeDetailsModal } from "../../../../../store/ducks/RPMAuditor/actions";
import { getDetails, getDetailsError, getDetailsLoading, getDetailsModalOpen } from "../../../../../store/ducks/RPMAuditor/selectors";

const ModalDetailProjectAuditor = (props) => {
  return <ModalDetailProject {...props} />
};

const mapStateToProps = state => ({
  visible: getDetailsModalOpen(state),
  loading: getDetailsLoading(state),
  error: getDetailsError(state),
  details: getDetails(state)
})

const mapDispatchToProps = {
  onCancel: closeDetailsModal
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalDetailProjectAuditor)