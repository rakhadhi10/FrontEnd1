import { connect } from "react-redux";
import { fetchDocAnggaran } from "../../../../../../store/ducks/PATDocument/actions";
import { biaya_dinas, prepareData as prepareBiayaDinas } from "../../../../../../templates/biaya_dinas";
import { biaya_total, prepareData as prepareBiayaTotal } from "../../../../../../templates/biaya_total";
import { biaya_lainnya, prepareData as prepareBiayaLainnya } from "../../../../../../templates/biaya_lainnya";
import BaseViewer from "./BaseViewer";

function JadwalSBP({ fetchDocAnggaran }) {
  return (
    <BaseViewer
      fetch={fetchDocAnggaran}
      processData={(data) => {
        const view_biaya_total = data ? biaya_total(prepareBiayaTotal(data.tahun, data.totalAnggaran)) : ""
        const tabel_biaya_dinas = data ? biaya_dinas(prepareBiayaDinas(data.allAnggaranDinas)) : ""
        const tabel_biaya_lainnya = data ? biaya_lainnya(prepareBiayaLainnya(data.allAnggaranKegiatan)) : ""
        const content =
          view_biaya_total +
          "<p>&nbsp;</p>" +
          tabel_biaya_dinas +
          "<p>&nbsp;</p>" +
          tabel_biaya_lainnya

        return content
      }}
    />
  )
}

const mapDispatchToProps = {
  fetchDocAnggaran: fetchDocAnggaran
}

export default connect(null, mapDispatchToProps)(JadwalSBP)