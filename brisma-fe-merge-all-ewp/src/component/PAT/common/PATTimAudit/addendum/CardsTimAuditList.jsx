import { connect } from "react-redux";
import { changePage, deleteTimAudit, fetchAllTimAudit, openEditModal } from "../../../../../store/ducks/AddendumPATTimAudit/actions";
import { getAllTimAudit, getCurrentPage, getError, getItemPerPage, getLoading, getTotalPage } from "../../../../../store/ducks/AddendumPATTimAudit/selectors";
import CardsTimAuditList from "../common/CardsTimAuditList";

function CardsTimAuditListAddendum(props) {
  return <CardsTimAuditList {...props} />
}

const mapDispatchToProps = {
  fetchAllTimAudit: fetchAllTimAudit,
  changePage: changePage,
  onClickEdit: openEditModal,
  onClickDelete: deleteTimAudit
}

const mapStateToProps = state => ({
  teams: getAllTimAudit(state),
  loading: getLoading(state),
  error: getError(state),
  currentPage: getCurrentPage(state),
  totalPage: getTotalPage(state),
  itemsPerPage: getItemPerPage(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(CardsTimAuditListAddendum)