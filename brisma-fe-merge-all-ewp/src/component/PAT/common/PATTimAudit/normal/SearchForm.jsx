import { connect } from "react-redux";
import { fetchAllTimAudit, updateFilterForm } from "../../../../../store/ducks/PATTimAudit/actions";
import { getCurrentPage } from "../../../../../store/ducks/PATTimAudit/selectors";
import SearchForm from "../common/SearchForm";

function SearchFormNormal(props) {
  return <SearchForm {...props} />
}

const mapStateToProps = state => ({
  currentPage: getCurrentPage(state)
})

const mapDispatchToProps = {
  fetchAllTimAudit: fetchAllTimAudit,
  updateFilterForm: updateFilterForm
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormNormal)
