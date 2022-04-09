import { connect } from "react-redux";
import { fetchAllTimAudit, updateForm } from "../../../../../../store/ducks/PATTimAudit/actions";
import { getForm } from "../../../../../../store/ducks/PATTimAudit/selectors";
import TimForm from "../../common/Modal/TimForm";

const mapStateToProps = state => ({ initialValues: { ...getForm(state) } })

const mapDispatchToProps = {
  onChange: (changed, all) => updateForm(all),
  fetchAllTimAudit: fetchAllTimAudit,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddendumTimForm)

function AddendumTimForm(props) {
  return <TimForm {...props} />
};