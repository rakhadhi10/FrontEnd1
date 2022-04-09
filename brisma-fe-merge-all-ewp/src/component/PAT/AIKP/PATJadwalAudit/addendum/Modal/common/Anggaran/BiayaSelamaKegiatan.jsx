import { connect } from "react-redux";
import { addBiayaKegiatan } from "../../../../../../../../store/ducks/AddendumPATAIKPJadwalAudit/actions";
import { getBiayaKegiatan } from "../../../../../../../../store/ducks/AddendumPATAIKPJadwalAudit/selectors";
import RincianBiayaSelamaKegiatan from "../../../../../../common/PATJadwalAudit/Modal/Anggaran/BiayaSelamaKegiatan/RincianBiayaSelamaKegiatan";
import BiayaSelamaKegiatanForm from "../../../../../../common/PATJadwalAudit/Modal/Anggaran/BiayaSelamaKegiatan/BiayaSelamaKegiatanForm";
import AnggaranLayout from "../../../../../../common/FormAnggaran/AnggaranLayout";

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
