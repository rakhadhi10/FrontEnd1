import { connect } from "react-redux";
import { updateSortBy } from "../../../../../store/ducks/PATAnggaran/actions";
import SortBy from "../common/SortBy";

export function SortByNormal({ updateSortBy }) {
  return <SortBy updateSortBy={updateSortBy} />
}

const mapDispatchToProps = {
  updateSortBy: updateSortBy
}

export default connect(null, mapDispatchToProps)(SortByNormal)