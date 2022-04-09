import { connect } from "react-redux";
import { getCheckersUka, getLogs, getSignersUka } from "../../../../../../store/ducks/AddendumPATDocument/selectors";
import StatusApprover from "../../common/StatusApprover";

function StatusApproverUKA(props) {
  return <StatusApprover title="Approver UKA" {...props} />
}

const mapStateToProps = state => {
  const checkers = getCheckersUka(state).map(c => ({
    pn: c.pn,
    nama: c.nama,
    status: c.is_checked ? "Approved" : null
  }))
  const signers = getSignersUka(state).map(s => ({
    pn: s.pn,
    nama: s.nama,
    status: s.is_signed ? "Approved" : null
  }))
  return { checkers, signers, logs: getLogs(state) }
}

export default connect(mapStateToProps)(StatusApproverUKA)