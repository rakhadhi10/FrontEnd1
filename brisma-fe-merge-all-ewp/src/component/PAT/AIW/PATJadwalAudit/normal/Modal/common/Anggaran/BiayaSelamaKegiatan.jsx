import { connect } from "react-redux";
import RincianBiayaSelamaKegiatan from "../../../../../../common/PATJadwalAudit/Modal/Anggaran/BiayaSelamaKegiatan/RincianBiayaSelamaKegiatan";
import BiayaSelamaKegiatanForm from "../../../../../../common/PATJadwalAudit/Modal/Anggaran/BiayaSelamaKegiatan/BiayaSelamaKegiatanForm";
import { addBiayaKegiatan } from "../../../../../../../../store/ducks/PATAIWJadwalAudit/actions";
import { getBiayaKegiatan } from "../../../../../../../../store/ducks/PATAIWJadwalAudit/selectors";

function BiayaSelamaKegiatan({ addBiayaKegiatan }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <BiayaSelamaKegiatanForm addBiayaKegiatan={addBiayaKegiatan} />
      <RincianBiayaSelamaKegiatan getBiayaKegiatan={getBiayaKegiatan} />
    </div>
  );
}

const mapDispatchToProps = {
  addBiayaKegiatan: addBiayaKegiatan
}

export default connect(null, mapDispatchToProps)(BiayaSelamaKegiatan)
