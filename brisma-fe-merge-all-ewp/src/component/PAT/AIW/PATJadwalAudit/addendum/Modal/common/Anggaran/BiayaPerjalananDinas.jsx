import { connect } from "react-redux";
import { addBiayaDinas } from "../../../../../../../../store/ducks/AddendumPATAIWJadwalAudit/actions";
import { getBiayaDinas, getSelectedTim } from "../../../../../../../../store/ducks/AddendumPATAIWJadwalAudit/selectors";
import { getRefTeamsAddendum } from "../../../../../../../../store/ducks/reference/selectors";
import AnggaranLayout from "../../../../../../common/FormAnggaran/AnggaranLayout";
import BiayaPerjalananDinasForm from "../../../../../../common/PATJadwalAudit/Modal/Anggaran/BiayaPerjalananDinas/BiayaPerjalananDinasForm";
import RincianBiayaPerjalananDinas from "../../../../../../common/PATJadwalAudit/Modal/Anggaran/BiayaPerjalananDinas/RincianBiayaPerjalananDinas";

function BiayaPerjalananDinas({ addBiayaDinas }) {
  return (
    <AnggaranLayout>
      <BiayaPerjalananDinasForm
        getSelectedTim={getSelectedTim}
        getRefTeams={getRefTeamsAddendum}
        addBiayaDinas={addBiayaDinas}
      />
      <RincianBiayaPerjalananDinas getBiayaDinas={getBiayaDinas} />
    </AnggaranLayout>
  );
}

const mapDispatchToProps = {
  addBiayaDinas: addBiayaDinas
}

export default connect(null, mapDispatchToProps)(BiayaPerjalananDinas)
