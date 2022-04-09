import { connect } from "react-redux";
import { fetchDocTargetAudit } from "../../../../../../../store/ducks/PATDocument/actions";
import { prepareData, target_audit_aiw } from "../../../../../../../templates/target_audit_aiw";
import BaseViewer from "../BaseViewer";

function RuangLingkupAuditAIW({ fetchDocTargetAudit }) {
  return (
    <BaseViewer
      fetch={fetchDocTargetAudit}
      processData={(data) => data ? target_audit_aiw(prepareData(data)) : ""}
    />
  )
}

const mapDispatchToProps = {
  fetchDocTargetAudit: fetchDocTargetAudit
}

export default connect(null, mapDispatchToProps)(RuangLingkupAuditAIW)