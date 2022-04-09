import { connect } from "react-redux";
import { changePage, fetchAllJadwalAudit } from "../../../../../store/ducks/PATAIKPJadwalAudit/actions";
import { getCurrentPage, getError, getItemPerPage, getJadwalAudit, getLoading, getTotalPage } from "../../../../../store/ducks/PATAIKPJadwalAudit/selectors";
import CardsJadwalAuditList from "../../../common/PATJadwalAudit/CardsJadwalAuditList";
import CardJadwalAuditAIKP from "./CardJadwalAuditAIKP";

export function CardsJadwalAuditListAIKP(props) {
  return <CardsJadwalAuditList {...props} card={CardJadwalAuditAIKP} />
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