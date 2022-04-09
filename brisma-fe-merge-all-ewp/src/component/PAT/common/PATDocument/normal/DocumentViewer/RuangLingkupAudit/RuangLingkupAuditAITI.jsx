import { connect } from "react-redux";
import { fetchDocTargetAudit } from "../../../../../../../store/ducks/PATDocument/actions";
import { prepareData, target_audit_aiti } from "../../../../../../../templates/target_audit_aiti";
import BaseViewer from "../BaseViewer";

function RuangLingkupAuditAITI({ fetchDocTargetAudit }) {
  return (
    <BaseViewer
      fetch={fetchDocTargetAudit}
      processData={(data) => data ? target_audit_aiti(prepareData(data)) : ""}
    />
  )
}

const mapDispatchToProps = {
  fetchDocTargetAudit: fetchDocTargetAudit
}

export default connect(null, mapDispatchToProps)(RuangLingkupAuditAITI)