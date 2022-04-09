import { connect } from "react-redux";
import { getCheckersPusat, getLogs, getSignersPusat } from "../../../../../../store/ducks/AddendumPATDocument/selectors";
import StatusApprover from "../../common/StatusApprover";

function StatusApproverPusat(props) {
  return <StatusApprover title="Approver Pusat" {...props} />
}

const mapStateToProps = state => {
  const checkers = getCheckersPusat(state).map(c => ({
    pn: c.pn,
    nama: c.nama,
    status: c.is_checked ? "Approved" : null
  }))
  const signers = getSignersPusat(state).map(s => ({
    pn: s.pn,
    nama: s.nama,
    status: s.is_signed ? "Approved" : null
  }))
  return { checkers, signers, logs: getLogs(state) }
}

export default connect(mapStateToProps)(StatusApproverPusat)