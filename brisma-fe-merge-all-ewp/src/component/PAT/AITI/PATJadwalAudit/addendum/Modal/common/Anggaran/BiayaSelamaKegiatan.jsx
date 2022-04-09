import { connect } from "react-redux";
import RincianBiayaSelamaKegiatan from "../../../../../../common/PATJadwalAudit/Modal/Anggaran/BiayaSelamaKegiatan/RincianBiayaSelamaKegiatan";
import BiayaSelamaKegiatanForm from "../../../../../../common/PATJadwalAudit/Modal/Anggaran/BiayaSelamaKegiatan/BiayaSelamaKegiatanForm";
import AnggaranLayout from "../../../../../../common/FormAnggaran/AnggaranLayout";
import { addBiayaKegiatan } from "../../../../../../../../store/ducks/AddendumPATAITIJadwalAudit/actions";
import { getBiayaKegiatan } from "../../../../../../../../store/ducks/AddendumPATAITIJadwalAudit/selectors";

function BiayaSelamaKegiatan({ addBiayaKegiatan }) {
  return (
    <AnggaranLayout>
      <BiayaSelamaKegiatanForm addBiayaKegiatan={addBiayaKegiatan} />
      <RincianBiayaSelamaKegiatan getBiayaKegiatan={getBiayaKegiatan} />
    </AnggaranLayout>
  );
}

const mapDispatchToProps = {
  addBiayaKegiatan: addBiayaKegiatan
}

export default connect(null, mapDispatchToProps)(BiayaSelamaKegiatan)
