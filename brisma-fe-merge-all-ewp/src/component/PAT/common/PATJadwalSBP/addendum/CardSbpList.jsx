import { connect } from "react-redux";
import { fetchAllSbp, changePage, openEditModal, deleteJadwalSbp } from "../../../../../store/ducks/AddendumPATJadwalSBP/actions";
import { getCurrentPage, getError, getItemPerPage, getJadwalSbp, getLoading, getTotalPage } from "../../../../../store/ducks/AddendumPATJadwalSBP/selectors";
import CardSbpList from "../common/CardSbpList";

export function CardSbpListNormal(props) {
  return <CardSbpList {...props} />
}

const mapStateToProps = state => ({
  loading: getLoading(state),
  error: getError(state),
  jadwal: getJadwalSbp(state),
  currentPage: getCurrentPage(state),
  totalPage: getTotalPage(state),
  itemsPerPage: getItemPerPage(state)
})

const mapDispatchToProps = {
  fetchAllSbp: fetchAllSbp,
  openEditModal: openEditModal,
  deleteJadwalSbp: deleteJadwalSbp,
  changePage: changePage
}

export default connect(mapStateToProps, mapDispatchToProps)(CardSbpListNormal)