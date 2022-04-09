import { connect } from "react-redux";
import { updateSortBy } from "../../../../../store/ducks/AddendumPATTimAudit/actions";
import SortBy from "../common/SortBy";

function SortByAddendum({ updateSortBy }) {
  return <SortBy updateSortBy={updateSortBy} />
}

const mapDispatchToProps = {
  updateSortBy: updateSortBy
}

export default connect(null, mapDispatchToProps)(SortByAddendum)