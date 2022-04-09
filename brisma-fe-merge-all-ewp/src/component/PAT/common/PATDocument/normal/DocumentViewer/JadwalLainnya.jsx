import { connect } from "react-redux";
import { fetchDocJadwalLainnya } from "../../../../../../store/ducks/PATDocument/actions";
import { jadwal_lain, prepareData } from "../../../../../../templates/jadwal_lain";
import BaseViewer from "./BaseViewer";

function JadwalLainnya({ fetchDocJadwalLainnya }) {
  return (
    <BaseViewer
      fetch={fetchDocJadwalLainnya}
      processData={(data) => data ? jadwal_lain(prepareData(data.kegiatan_lain)) : ""}
    />
  )
}

const mapDispatchToProps = {
  fetchDocJadwalLainnya: fetchDocJadwalLainnya
}

export default connect(null, mapDispatchToProps)(JadwalLainnya)