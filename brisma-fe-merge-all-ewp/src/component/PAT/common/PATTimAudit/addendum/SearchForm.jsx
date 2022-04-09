import { connect } from "react-redux";
import { fetchAllTimAudit, updateFilterForm } from "../../../../../store/ducks/AddendumPATTimAudit/actions";
import { getCurrentPage } from "../../../../../store/ducks/AddendumPATTimAudit/selectors";
import SearchForm from "../common/SearchForm";

function SearchFormAddendum(props) {
  return <SearchForm {...props} />
}

const mapStateToProps = state => ({
  currentPage: getCurrentPage(state)
})

const mapDispatchToProps = {
  fetchAllTimAudit: fetchAllTimAudit,
  updateFilterForm: updateFilterForm
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormAddendum)
