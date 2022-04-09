import { connect } from "react-redux";
import { getBiayaDinas, getSelectedTim } from "../../../../../../../../store/ducks/AddendumPATAIKPJadwalAudit/selectors";
import { addBiayaDinas } from "../../../../../../../../store/ducks/AddendumPATAIKPJadwalAudit/actions";
import { getRefTeamsAddendum } from "../../../../../../../../store/ducks/reference/selectors";
import BiayaPerjalananDinasForm from "../../../../../../common/PATJadwalAudit/Modal/Anggaran/BiayaPerjalananDinas/BiayaPerjalananDinasForm";
import RincianBiayaPerjalananDinas from "../../../../../../common/PATJadwalAudit/Modal/Anggaran/BiayaPerjalananDinas/RincianBiayaPerjalananDinas";
import AnggaranLayout from "../../../../../../common/FormAnggaran/AnggaranLayout";

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
  )
}

const mapDispatchToProps = {
  addBiayaDinas: addBiayaDinas,
}

export default connect(null, mapDispatchToProps)(BiayaPerjalananDinas)
