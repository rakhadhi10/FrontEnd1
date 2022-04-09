import { connect } from "react-redux";
import { fetchAllSbp, updateFilterForm } from "../../../../../store/ducks/PATJadwalSBP/actions";
import SearchForm from "../common/SearchForm";


function SearchFormNormal(props) {
  return <SearchForm {...props} />
}

const mapDispatchToProps = {
  updateFilterForm: updateFilterForm,
  fetchAllSbp: fetchAllSbp
}

export default connect(null, mapDispatchToProps)(SearchFormNormal)