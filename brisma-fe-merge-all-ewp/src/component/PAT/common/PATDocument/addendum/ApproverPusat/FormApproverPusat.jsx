import { connect } from "react-redux";
import { updateFormPusat } from "../../../../../../store/ducks/AddendumPATDocument/actions";
import { getFormPusat } from "../../../../../../store/ducks/AddendumPATDocument/selectors";
import FormApprover from "../../common/FormApprover";

function FormApproverPusat(props) {
  return <FormApprover title="Approver Pusat" {...props} />
}

const mapDispatchToProps = {
  updateForm: updateFormPusat
}

const mapStateToProps = state => {
  const { checkers, signers } = getFormPusat(state)
  return { checkers, signers }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormApproverPusat);