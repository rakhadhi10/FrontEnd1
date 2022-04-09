import { connect } from "react-redux";
import { fetchDocTargetAudit } from "../../../../../../../store/ducks/PATDocument/actions";
import { prepareData, target_audit_aikp } from "../../../../../../../templates/target_audit_aikp";
import BaseViewer from "../BaseViewer";

function RuangLingkupAuditAIKP({ fetchDocTargetAudit }) {
  return (
    <BaseViewer
      fetch={fetchDocTargetAudit}
      processData={(data) => data ? target_audit_aikp(prepareData(data)) : ""}
    />
  )
}

const mapDispatchToProps = {
  fetchDocTargetAudit: fetchDocTargetAudit
}

export default connect(null, mapDispatchToProps)(RuangLingkupAuditAIKP)