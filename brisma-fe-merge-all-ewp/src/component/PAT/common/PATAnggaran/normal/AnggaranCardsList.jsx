import { connect } from "react-redux";
import { changePage, deleteKegiatanLain, fetchAnggaran, openEditModal } from "../../../../../store/ducks/PATAnggaran/actions";
import { getCurrentPage, getData, getError, getItemPerPage, getLoading, getTotalPage } from "../../../../../store/ducks/PATAnggaran/selectors";
import AnggaranCardsList from "../common/AnggaranCardsList";

export function AnggaranCardsListNormal(props) {
  return <AnggaranCardsList {...props} />
}

const mapDispatchToProps = {
  fetchAnggaran: fetchAnggaran,
  deleteKegiatan: deleteKegiatanLain,
  openEditModal: openEditModal,
  changePage: changePage,
}

const mapStateToProps = state => ({
  data: getData(state),
  error: getError(state),
  loading: getLoading(state),
  currentPage: getCurrentPage(state),
  totalPage: getTotalPage(state),
  itemsPerPage: getItemPerPage(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(AnggaranCardsListNormal)