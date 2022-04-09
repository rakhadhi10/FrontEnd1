import TableUnitKerja from "./TableUnitKerja";
import ModalEditUnitKerja from "./ModalEditUnitKerja";
import UnitKerjaTab from "../../../../../common/Modal/common/ObjekAudit/UnitKerja/UnitKerjaTab";

const UnitKerjaTabNormal = (props) => {
  return (
    <UnitKerjaTab>
      <TableUnitKerja />
      <ModalEditUnitKerja />
    </UnitKerjaTab>
  );
};

export default UnitKerjaTabNormal;
