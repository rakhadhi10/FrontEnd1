import { connect } from "react-redux";
import { deleteJadwalAudit, openEditModal } from "../../../../../store/ducks/AddendumPATAIWJadwalAudit/actions";
import CardJadwalAudit from "../../../common/PATJadwalAudit/CardJadwalAudit";

const CardJadwalAuditAIW = (props) => {
  return <CardJadwalAudit {...props} />
}

const mapDispatchToProps = {
  deleteJadwalAudit: deleteJadwalAudit,
  openEditModal: openEditModal
}

const mapStateToProps = (state, ownProps) => {
  const objekAudit = Object.keys(ownProps.targetAudit.count_target_jenis_auditee.existing).map(k => {
    const existing = ownProps.targetAudit.count_target_jenis_auditee.existing[k] || 0
    const target = ownProps.targetAudit.count_target_jenis_auditee.target[k] || 0
    return {
      name: k,
      existing,
      target,
      percent: Math.round(target / existing * 100),
    }
  })
  return { objekAudit }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardJadwalAuditAIW)
