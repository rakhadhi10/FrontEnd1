import { connect } from "react-redux";
import { addBiayaKegiatan } from "../../../../../../../../store/ducks/PATJadwalSBP/actions";
import { getBiayaKegiatan } from "../../../../../../../../store/ducks/PATJadwalSBP/selectors";
import AnggaranLayout from "../../../../../FormAnggaran/AnggaranLayout";
import FormBiayaKegiatan from "../../../../../FormAnggaran/FormBiayaKegiatan";
import RincianBiayaSelamaKegiatan from "../../../../../FormAnggaran/RincianBiayaSelamaKegiatan";

function BiayaSelamaKegiatan({ addBiayaKegiatan }) {
  return (
    <AnggaranLayout>
      <FormBiayaKegiatan addBiayaKegiatan={addBiayaKegiatan} />
      <RincianBiayaSelamaKegiatan getBiayaKegiatan={getBiayaKegiatan} />
    </AnggaranLayout>
  );
}

const mapDispatchToProps = {
  addBiayaKegiatan: addBiayaKegiatan
}

export default connect(null, mapDispatchToProps)(BiayaSelamaKegiatan)
