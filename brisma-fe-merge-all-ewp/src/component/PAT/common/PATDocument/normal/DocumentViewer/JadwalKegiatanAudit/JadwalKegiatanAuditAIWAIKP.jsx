import { connect } from "react-redux";
import { fetchDocJadwalAudit } from "../../../../../../../store/ducks/PATDocument/actions";
import { jadwal_audit, prepareData } from "../../../../../../../templates/jadwal_audit";
import BaseViewer from "../BaseViewer";

function JadwalKegiatanAuditAIWAIKP({ fetchDocJadwalAudit }) {
  return (
    <BaseViewer
      fetch={fetchDocJadwalAudit}
      processData={(data) => data ? jadwal_audit(prepareData(data)) : ""}
    />
  )
}

const mapDispatchToProps = {
  fetchDocJadwalAudit: fetchDocJadwalAudit
}

export default connect(null, mapDispatchToProps)(JadwalKegiatanAuditAIWAIKP)