import { connect } from "react-redux";
import { updateFormUka } from "../../../../../../store/ducks/PATDocument/actions";
import { getFormUka } from "../../../../../../store/ducks/PATDocument/selectors";
import FormApprover from "../../common/FormApprover";

function FormApproverUKA(props) {
  return <FormApprover title="Approver UKA" {...props} />
}

const mapDispatchToProps = {
  updateForm: updateFormUka
}

const mapStateToProps = state => {
  const { checkers, signers } = getFormUka(state)
  return { checkers, signers }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormApproverUKA);