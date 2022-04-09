import { connect } from "react-redux";
import { changePage, fetchAllJadwalAudit } from "../../../../../store/ducks/PATAIWJadwalAudit/actions";
import { getCurrentPage, getError, getItemPerPage, getJadwalAudit, getLoading, getTotalPage } from "../../../../../store/ducks/PATAIWJadwalAudit/selectors";
import CardsJadwalAuditList from "../../../common/PATJadwalAudit/CardsJadwalAuditList";
import CardJadwalAuditAIW from "./CardJadwalAuditAIW";

export function CardsJadwalAuditListAIW(props) {
  return <CardsJadwalAuditList {...props} card={CardJadwalAuditAIW} />
}

const mapStateToProps = state => {
  return {
    jadwals: getJadwalAudit(state),
    loading: getLoading(state),
    error: getError(state),
    currentPage: getCurrentPage(state),
    totalPage: getTotalPage(state),
    itemsPerPage: getItemPerPage(state)
  }
}

const mapDispatchToProps = {
  fetchAllJadwalAudit: fetchAllJadwalAudit,
  changePage: changePage
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsJadwalAuditListAIW)