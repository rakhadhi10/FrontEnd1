import { connect } from "react-redux";
import { fetchDocJadwalSBP } from "../../../../../../store/ducks/PATDocument/actions";
import { jadwal_sbp, prepareData } from "../../../../../../templates/jadwal_sbp";
import BaseViewer from "./BaseViewer";

function JadwalSBP({ fetchDocJadwalSBP }) {
  return (
    <BaseViewer
      fetch={fetchDocJadwalSBP}
      processData={(data) => data ? jadwal_sbp(prepareData(data.jadwal_sbp)) : ""}
    />
  )
}

const mapDispatchToProps = {
  fetchDocJadwalSBP: fetchDocJadwalSBP
}

export default connect(null, mapDispatchToProps)(JadwalSBP)