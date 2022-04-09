import { connect } from "react-redux";
import { jadwal_audit_aiti, prepareData } from "../../../../../../../templates/jadwal_audit_aiti";
import { fetchDocJadwalAudit } from "../../../../../../../store/ducks/PATDocument/actions";
import BaseViewer from "../BaseViewer";

function JadwalKegiatanAuditAITI({ fetchDocJadwalAudit }) {
  return (
    <BaseViewer
      fetch={fetchDocJadwalAudit}
      processData={(data) => data ? jadwal_audit_aiti(prepareData(data)) : ""}
    />
  )
}

const mapDispatchToProps = {
  fetchDocJadwalAudit: fetchDocJadwalAudit
}

export default connect(null, mapDispatchToProps)(JadwalKegiatanAuditAITI)