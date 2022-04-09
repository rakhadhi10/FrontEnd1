import { connect } from "react-redux";
import { fetchDocTimAudit } from "../../../../../../store/ducks/PATDocument/actions";
import { tim_audit, prepareData } from "../../../../../../templates/tim_audit";
import BaseViewer from "./BaseViewer";

function SusunanTimAudit({ fetchDocTimAudit }) {
  return (
    <BaseViewer
      fetch={fetchDocTimAudit}
      processData={(data) => data ? tim_audit(prepareData(data.tim_audit)) : ""}
    />
  )
}

const mapDispatchToProps = {
  fetchDocTimAudit: fetchDocTimAudit
}

export default connect(null, mapDispatchToProps)(SusunanTimAudit)