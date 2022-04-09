import { connect } from "react-redux";
import BiayaPerjalananDinasForm from "../../../../../../common/PATJadwalAudit/Modal/Anggaran/BiayaPerjalananDinas/BiayaPerjalananDinasForm";
import RincianBiayaPerjalananDinas from "../../../../../../common/PATJadwalAudit/Modal/Anggaran/BiayaPerjalananDinas/RincianBiayaPerjalananDinas";
import AnggaranLayout from "../../../../../../common/FormAnggaran/AnggaranLayout";
import { getBiayaDinas, getSelectedTim } from "../../../../../../../../store/ducks/PATAITIJadwalAudit/selectors";
import { addBiayaDinas } from "../../../../../../../../store/ducks/PATAITIJadwalAudit/actions";
import { getRefTeams } from "../../../../../../../../store/ducks/reference/selectors";

function BiayaPerjalananDinas({ addBiayaDinas }) {
  return (
    <AnggaranLayout>
      <BiayaPerjalananDinasForm
        getSelectedTim={getSelectedTim}
        getRefTeams={getRefTeams}
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
