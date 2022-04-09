import { connect } from "react-redux";
import { changePage, fetchAllJadwalAudit } from "../../../../../store/ducks/PATAITIJadwalAudit/actions";
import { getCurrentPage, getError, getItemPerPage, getJadwalAudit, getLoading, getTotalPage } from "../../../../../store/ducks/PATAITIJadwalAudit/selectors";
import CardsJadwalAuditList from "../../../common/PATJadwalAudit/CardsJadwalAuditList";
import CardJadwalAuditAITI from "./CardJadwalAuditAITI";

export function CardsJadwalAuditListAIKP(props) {
  return <CardsJadwalAuditList {...props} card={CardJadwalAuditAITI} />
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

export default connect(mapStateToProps, mapDispatchToProps)(CardsJadwalAuditListAIKP)