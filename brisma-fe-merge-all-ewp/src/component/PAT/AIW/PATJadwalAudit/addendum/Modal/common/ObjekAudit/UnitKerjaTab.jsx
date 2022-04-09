import { connect } from "react-redux";
import { getSelectedTipeAudit } from "../../../../../../../../store/ducks/AddendumPATAIWJadwalAudit/selectors";
import UnitKerjaTab from "../../../../common/Modal/common/ObjekAudit/UnitKerjaTab";
import ModalEditUnitKerjaReguler from "./Reguler/ModalEditUnitKerjaReguler";
import TableUnitKerjaReguler from "./Reguler/TableUnitKerjaReguler";
import ModalEditUnitKerjaSpecialTematik from "./SpecialTematik/ModalEditUnitKerjaSpecialTematik";
import TableUnitKerjaSpecialTematik from "./SpecialTematik/TableUnitKerjaSpecialTematik";

const UnitKerjaTabNormal = ({ selectedTipeAudit }) => {
  return (
    <UnitKerjaTab>
      {selectedTipeAudit === "REG" &&
        <>
          <TableUnitKerjaReguler />
          <ModalEditUnitKerjaReguler />
        </>
      }
      {(selectedTipeAudit === "SA" || selectedTipeAudit === "TMT") &&
        <>
          <TableUnitKerjaSpecialTematik />
          <ModalEditUnitKerjaSpecialTematik />
        </>
      }
    </UnitKerjaTab>
  )
};

const mapStateToProps = state => ({
  selectedTipeAudit: getSelectedTipeAudit(state)
})

export default connect(mapStateToProps)(UnitKerjaTabNormal)
